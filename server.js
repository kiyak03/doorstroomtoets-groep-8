// server.js - Doorstroomtoets Oefenapp Server voor lokaal thuisnetwerk (Wi-Fi)
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const os = require('os');
const fs = require('fs');
const qrcode = require('qrcode');

const { generateTest, calculateSchooladvies } = require('./generators/index');
const { generateAITest } = require('./generators/aiGenerator');

const app = express();
const PORT = process.env.PORT || 3838;
const IS_VERCEL = Boolean(process.env.VERCEL);
const DATA_FILE = IS_VERCEL
  ? path.join(os.tmpdir(), 'doorstroomtoets_results.json')
  : path.join(__dirname, 'data', 'results.json');

// Middleware
app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// Ensure data folder and results.json exist (alleen voor lokale privé-server thuis; op Vercel slaan we niets op de gedeelde server op i.v.m. privacy)
if (!IS_VERCEL) {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), 'utf-8');
    }
  } catch (err) {
    // Negeren
  }
}

function readResults() {
  if (IS_VERCEL) return [];
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    return [];
  }
}

function saveResults(results) {
  if (IS_VERCEL) return;
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(results, null, 2), 'utf-8');
  } catch (err) {
    // Negeren
  }
}

// Function to get the preferred local Wi-Fi / LAN IP address
function getLocalNetworkIp() {
  const nets = os.networkInterfaces();
  const candidates = [];

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      // Pick IPv4 and non-internal
      if (net.family === 'IPv4' && !net.internal) {
        // Prioritize Wi-Fi or Ethernet
        const isWiFi = name.toLowerCase().includes('wi-fi') || name.toLowerCase().includes('wlan');
        candidates.push({ address: net.address, name, isWiFi });
      }
    }
  }

  // Find wifi first, then anything in 192.168 / 10.x / 172.x
  const wifi = candidates.find(c => c.isWiFi);
  if (wifi) return wifi.address;

  const privateNet = candidates.find(c => c.address.startsWith('192.168.') || c.address.startsWith('10.'));
  if (privateNet) return privateNet.address;

  return candidates.length > 0 ? candidates[0].address : 'localhost';
}

// API Routes

// 1. Netwerkinformatie & QR-code voor iPad
app.get('/api/network-info', async (req, res) => {
  try {
    const forwardedHost = req.headers['x-forwarded-host'] || req.headers.host;
    const forwardedProto = req.headers['x-forwarded-proto'] || 'http';
    const isCloud = IS_VERCEL || (forwardedHost && !forwardedHost.includes('localhost') && !forwardedHost.startsWith('127.') && !forwardedHost.startsWith('192.168.') && !forwardedHost.startsWith('10.'));

    const localIp = getLocalNetworkIp();
    const fullUrl = isCloud
      ? `${forwardedProto}://${forwardedHost}`
      : `http://${localIp}:${PORT}`;

    const qrCodeDataUrl = await qrcode.toDataURL(fullUrl, {
      margin: 2,
      width: 280,
      color: {
        dark: '#1e293b',
        light: '#ffffff'
      }
    });

    res.json({
      localIp: isCloud ? forwardedHost : localIp,
      port: isCloud ? '' : PORT,
      isCloud: Boolean(isCloud),
      fullUrl,
      qrCodeDataUrl
    });
  } catch (err) {
    res.status(500).json({ error: 'Kon netwerkinformatie niet laden: ' + err.message });
  }
});

// 2. Genereer een nieuwe procedurele toets
app.post('/api/generate-test', (req, res) => {
  try {
    const { domain = 'all', count = 10, mode = 'practice', subTopic = 'all', excludeTextIds = [] } = req.body;
    const test = generateTest({ domain, count, mode, subTopic, excludeTextIds });
    res.json(test);
  } catch (err) {
    console.error('Fout bij genereren toets:', err);
    res.status(500).json({ error: 'Fout bij genereren van de toets: ' + err.message });
  }
});

// 3. Genereer een AI-toets (met Gemini)
app.post('/api/generate-ai-test', async (req, res) => {
  try {
    const { apiKey, theme, domain = 'all', count = 10, mode = 'practice' } = req.body;
    const rawQuestions = await generateAITest({ apiKey, theme, domain, count });

    const test = {
      id: `ai-toets-${Date.now()}`,
      createdAt: new Date().toISOString(),
      domain,
      mode,
      theme: theme || 'Op maat gemaakt',
      totalQuestions: rawQuestions.length,
      questions: rawQuestions.map((q, idx) => ({
        ...q,
        number: idx + 1
      }))
    };

    res.json(test);
  } catch (err) {
    console.error('Fout bij genereren van AI-toets:', err);
    res.status(500).json({ error: err.message });
  }
});

// 4. Toets inleveren en resultaten opslaan
app.post('/api/submit-test', (req, res) => {
  try {
    const {
      testId,
      studentName = 'Leerling',
      domain = 'all',
      subTopic = 'all',
      subTopicInfo = null,
      mode = 'practice',
      growthStats = null,
      timeSpentSeconds = 0,
      questions = [],
      userAnswers = {},
      hintsUsed = {}
    } = req.body;

    let score = 0;
    const totalQuestions = questions.length;
    const reviewDetails = [];
    const domainBreakdown = {
      rekenen: { correct: 0, total: 0 },
      begrijpendLezen: { correct: 0, total: 0 },
      taalverzorging: { correct: 0, total: 0 }
    };

    questions.forEach((q) => {
      const selectedIndex = userAnswers[q.id];
      const isCorrect = selectedIndex !== undefined && Number(selectedIndex) === Number(q.correctIndex);
      const usedHint = Boolean(hintsUsed[q.id]);

      if (isCorrect) score++;

      // Track domain stats
      const qDomain = q.domain || 'rekenen';
      if (domainBreakdown[qDomain]) {
        domainBreakdown[qDomain].total++;
        if (isCorrect) domainBreakdown[qDomain].correct++;
      }

      reviewDetails.push({
        id: q.id,
        number: q.number,
        domain: q.domain,
        subCategory: q.subCategory,
        difficultyLevel: q.difficultyLevel || null,
        levelLabel: q.levelLabel || null,
        question: q.question,
        passageTitle: q.passageTitle,
        passage: q.passage,
        options: q.options,
        correctIndex: q.correctIndex,
        userSelectedIndex: selectedIndex,
        isCorrect,
        usedHint,
        visual: q.visual,
        explanation: q.explanation
      });
    });

    const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
    const advies = calculateSchooladvies(percentage, domain);

    const resultRecord = {
      id: `result-${Date.now()}`,
      testId,
      studentName,
      date: new Date().toISOString(),
      domain,
      subTopic,
      subTopicInfo,
      mode,
      growthStats,
      score,
      totalQuestions,
      percentage,
      timeSpentSeconds,
      schooladvies: advies,
      domainBreakdown,
      reviewDetails
    };

    const results = readResults();
    results.unshift(resultRecord);
    // Keep max 100 recent results
    saveResults(results.slice(0, 100));

    res.json(resultRecord);
  } catch (err) {
    console.error('Fout bij verwerken toetsresultaten:', err);
    res.status(500).json({ error: 'Fout bij verwerken van resultaten: ' + err.message });
  }
});

// 5. Historie van gemaakte toetsen (overzicht)
app.get('/api/history', (req, res) => {
  try {
    const results = readResults();
    // Return summary with correct and wrong counts
    const summaries = results.map(r => ({
      id: r.id,
      studentName: r.studentName,
      date: r.date,
      domain: r.domain,
      subTopic: r.subTopic || 'all',
      subTopicInfo: r.subTopicInfo || null,
      mode: r.mode,
      growthStats: r.growthStats || null,
      score: r.score,
      totalQuestions: r.totalQuestions,
      percentage: r.percentage,
      correctCount: r.score || 0,
      wrongCount: Math.max(0, (r.totalQuestions || 0) - (r.score || 0)),
      timeSpentSeconds: r.timeSpentSeconds,
      schooladvies: r.schooladvies,
      domainBreakdown: r.domainBreakdown
    }));
    res.json(summaries);
  } catch (err) {
    res.status(500).json({ error: 'Fout bij ophalen geschiedenis: ' + err.message });
  }
});

// 5b. Specifieke eerdere toets met alle vragen, antwoorden en uitwerkingen ophalen
app.get('/api/history/:id', (req, res) => {
  try {
    const results = readResults();
    const found = results.find(r => r.id === req.params.id);
    if (!found) {
      return res.status(404).json({ error: 'Toetsresultaat niet gevonden' });
    }
    res.json(found);
  } catch (err) {
    res.status(500).json({ error: 'Fout bij ophalen toetsdetails: ' + err.message });
  }
});

// 6. Leerstatistieken
app.get('/api/stats', (req, res) => {
  try {
    const results = readResults();
    let totalTests = results.length;
    let totalQuestions = 0;
    let totalCorrect = 0;
    const domainTotals = {
      rekenen: { correct: 0, total: 0 },
      begrijpendLezen: { correct: 0, total: 0 },
      taalverzorging: { correct: 0, total: 0 }
    };

    results.forEach(r => {
      totalQuestions += r.totalQuestions || 0;
      totalCorrect += r.score || 0;
      if (r.domainBreakdown) {
        for (const d of ['rekenen', 'begrijpendLezen', 'taalverzorging']) {
          if (r.domainBreakdown[d]) {
            domainTotals[d].correct += r.domainBreakdown[d].correct || 0;
            domainTotals[d].total += r.domainBreakdown[d].total || 0;
          }
        }
      }
    });

    const averagePercentage = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

    res.json({
      totalTests,
      totalQuestions,
      totalCorrect,
      averagePercentage,
      domainTotals
    });
  } catch (err) {
    res.status(500).json({ error: 'Fout bij berekenen statistieken: ' + err.message });
  }
});

// Start de server lokaal op 0.0.0.0 zodat hij bereikbaar is vanaf de iPad via Wi-Fi
// Op Vercel wordt `app` geëxporteerd als Serverless Function.
if (require.main === module) {
  app.listen(PORT, '0.0.0.0', async () => {
    const localIp = getLocalNetworkIp();
    const wifiUrl = `http://${localIp}:${PORT}`;
    const localUrl = `http://localhost:${PORT}`;

    console.log('\n================================================================');
    console.log('   🎓 DOORSTROOMTOETS OEFENAPP (GROEP 8) GESTART!');
    console.log('================================================================');
    console.log(`💻 Op deze computer:`);
    console.log(`   ${localUrl}`);
    console.log(`\n📱 Op de iPad van je kind (verbonden met dezelfde Wi-Fi):`);
    console.log(`   👉 ${wifiUrl} 👈`);
    console.log('================================================================');
    console.log('Scan onderstaande QR-code met de iPad camera om direct te openen:');

    try {
      const terminalQr = await qrcode.toString(wifiUrl, { type: 'terminal', small: true });
      console.log(terminalQr);
    } catch (e) {
      // ignore
    }

    console.log('Klaar voor gebruik! Laat deze command-prompt openstaan terwijl je oefent.');
    console.log('================================================================\n');
  });
}

module.exports = app;
