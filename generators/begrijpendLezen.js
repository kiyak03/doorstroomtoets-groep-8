// generators/begrijpendLezen.js - Groep 8 Begrijpend Lezen op HAVO/VWO (Cito 2F) Niveau
// Met 40 unieke leesteksten (20 Oefenteksten + 20 Toetsteksten = 200 vragen)
// Inclusief slimme anti-herhalingsrotatie (Persistent Deck) zodat teksten niet steeds terugkomen.

const fs = require('fs');
const os = require('os');
const path = require('path');
const { oefenTekstenDeel1 } = require('./begrijpendLezen_oefen_1');
const { oefenTekstenDeel2 } = require('./begrijpendLezen_oefen_2');
const { toetsTekstenDeel1 } = require('./begrijpendLezen_toets_1');
const { toetsTekstenDeel2 } = require('./begrijpendLezen_toets_2');

const oefenTeksten = [...oefenTekstenDeel1, ...oefenTekstenDeel2];
const toetsTeksten = [...toetsTekstenDeel1, ...toetsTekstenDeel2];

const DECK_FILE = process.env.VERCEL
  ? path.join(os.tmpdir(), 'doorstroomtoets_reading_deck.json')
  : path.join(__dirname, '..', 'data', 'reading_deck.json');

// Zuivere Fisher-Yates shuffle (voorkomt de bekende bias van Array.sort met Math.random)
function fisherYatesShuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function shuffleOptions(options, correctOption) {
  const uniqueOpts = Array.from(new Set(options.map(o => String(o))));
  const canonicalCorrect = uniqueOpts.includes(String(correctOption))
    ? String(correctOption)
    : uniqueOpts[0];
  const shuffled = fisherYatesShuffle(uniqueOpts);
  return {
    options: shuffled,
    correctIndex: shuffled.indexOf(canonicalCorrect)
  };
}

// Lees of initialiseer het rotatie-deck van leesteksten op schijf (alleen lokaal; op Vercel per apparaat via excludeTextIds)
function loadDeckState() {
  if (process.env.VERCEL) {
    return {
      practiceQueue: [],
      examQueue: [],
      recentPractice: [],
      recentExam: []
    };
  }
  try {
    if (fs.existsSync(DECK_FILE)) {
      const raw = fs.readFileSync(DECK_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.practiceQueue) && Array.isArray(parsed.examQueue)) {
        return parsed;
      }
    }
  } catch (err) {
    // Negeer en maak nieuw deck aan
  }
  return {
    practiceQueue: [],
    examQueue: [],
    recentPractice: [],
    recentExam: []
  };
}

function saveDeckState(state) {
  if (process.env.VERCEL) return;
  try {
    const dir = path.dirname(DECK_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DECK_FILE, JSON.stringify(state, null, 2), 'utf-8');
  } catch (err) {
    // Niet fataal als schijf niet schrijfbaar is
  }
}

// Haal het volgende aantal unieke teksten op uit het rotatie-deck voor de gekozen modus
function getNextRotatedTexts(neededTextsCount, mode = 'practice', excludeTextIds = []) {
  const pool = mode === 'exam' ? toetsTeksten : oefenTeksten;
  const clientExcluded = new Set(Array.isArray(excludeTextIds) ? excludeTextIds : []);

  // Als de browser zelf bijhoudt welke teksten dit kind al gezien heeft (of op Vercel):
  if (process.env.VERCEL || clientExcluded.size > 0) {
    const unseen = fisherYatesShuffle(
      pool.filter(t => !clientExcluded.has(t.id) && !clientExcluded.has(t.titel))
    );
    const seen = fisherYatesShuffle(
      pool.filter(t => clientExcluded.has(t.id) || clientExcluded.has(t.titel))
    );
    return [...unseen, ...seen].slice(0, neededTextsCount);
  }

  const state = loadDeckState();
  const queueKey = mode === 'exam' ? 'examQueue' : 'practiceQueue';
  const recentKey = mode === 'exam' ? 'recentExam' : 'recentPractice';

  const validIds = new Set(pool.map(t => t.id || t.titel));
  let queue = (state[queueKey] || []).filter(id => validIds.has(id));
  const recent = state[recentKey] || [];

  // Vul de wachtrij aan met een vers geschud deck zodra er te weinig teksten over zijn
  while (queue.length < neededTextsCount) {
    const allIds = pool.map(t => t.id || t.titel);
    const avoidSet = new Set([...queue, ...recent.slice(-4)]);
    const freshMain = fisherYatesShuffle(allIds.filter(id => !avoidSet.has(id)));
    const freshTail = fisherYatesShuffle(allIds.filter(id => avoidSet.has(id) && !queue.includes(id)));
    queue.push(...freshMain, ...freshTail);
  }

  const chosenIds = queue.slice(0, neededTextsCount);
  state[queueKey] = queue.slice(neededTextsCount);
  state[recentKey] = [...recent, ...chosenIds].slice(-8);
  saveDeckState(state);

  const textMap = new Map(pool.map(t => [t.id || t.titel, t]));
  return chosenIds.map(id => textMap.get(id)).filter(Boolean);
}

// Hulpfunctie om een leesvraag om te zetten naar een specifiek moeilijkheidsniveau (1, 2 of 3) voor de Groei-modus
function buildReadingQuestionForLevel(tekst, v, level = 1) {
  const canonicalCorrect = v.correct;
  const wrongOpts = (v.opties || []).filter(o => o !== canonicalCorrect);

  if (level === 1) {
    // Level 1 (🌱 Basis 1F):
    // - Geeft direct een 'Opstap-leeswijzer' mee in de vraagstelling zodat het kind weet waar in de tekst het antwoord staat
    // - Vervangt twee complexe academische afleiders door eenvoudigere 1F-afleiders zodat het onderscheid makkelijker te maken is
    const cleanTip = (v.hint1 || 'Lees de genoemde alinea rustig terug.')
      .replace(/^💡\s*\*\*Denktip:\*\*\s*/i, '');
    const easyFop1 = 'Dit onderwerp wordt in de tekst helemaal niet besproken door de schrijver.';
    const easyFop2 = 'De schrijver vindt dat hierover nog nooit wetenschappelijk onderzoek is gedaan.';
    const level1Pool = [
      canonicalCorrect,
      wrongOpts[0] || easyFop1,
      easyFop1,
      easyFop2
    ];
    const { options, correctIndex } = shuffleOptions(level1Pool, canonicalCorrect);

    return {
      domain: 'begrijpendLezen',
      subCategory: `${tekst.thema} (Basis 1F)`,
      passageTitle: tekst.titel,
      passage: tekst.tekst,
      question: `**${v.vraag}**\n\n🌱 *Opstap-leeswijzer (Level 1): ${cleanTip}*`,
      options,
      correctIndex,
      difficultyLevel: 1,
      levelLabel: '🌱 Level 1: Basis (1F)',
      hint1: v.hint1 || '💡 **Denktip:** Lees de alinea waarnaar verwezen wordt zorgvuldig terug.',
      hint2: v.hint2 || `📝 **Uitleg:** ${v.explanation || ''}`,
      explanation: v.explanation
    };
  }

  if (level === 2) {
    // Level 2 (🌿 Gemiddeld 1F+):
    // - Alle 4 de originele opties, met een korte zoekfocus-aanwijzing
    const { options, correctIndex } = shuffleOptions(v.opties, canonicalCorrect);
    return {
      domain: 'begrijpendLezen',
      subCategory: `${tekst.thema} (Gemiddeld 1F+)`,
      passageTitle: tekst.titel,
      passage: tekst.tekst,
      question: `**${v.vraag}**\n\n🔎 *Zoekfocus (Level 2): Let bij het teruglezen extra goed op de kernzin en signaalwoorden in de alinea.*`,
      options,
      correctIndex,
      difficultyLevel: 2,
      levelLabel: '🌿 Level 2: Gemiddeld (1F+)',
      hint1: v.hint1 || '💡 **Denktip:** Lees de alinea waarnaar verwezen wordt zorgvuldig terug en let op signaalwoorden.',
      hint2: v.hint2 || `📝 **Uitleg:** ${v.explanation || ''}`,
      explanation: v.explanation
    };
  }

  // Level 3 (🏆 Pittig 2F Havo/Vwo): Volledige, onbegeleide 2F Cito-vraag met alle scherpe afleiders
  const { options, correctIndex } = shuffleOptions(v.opties, canonicalCorrect);
  return {
    domain: 'begrijpendLezen',
    subCategory: `${tekst.thema} (Streefniveau 2F)`,
    passageTitle: tekst.titel,
    passage: tekst.tekst,
    question: `**${v.vraag}**`,
    options,
    correctIndex,
    difficultyLevel: 3,
    levelLabel: '🏆 Level 3: Pittig (2F Havo/Vwo)',
    hint1: v.hint1 || '💡 **Denktip:** Lees de alinea waarnaar verwezen wordt zorgvuldig terug en let op signaalwoorden.',
    hint2: v.hint2 || `📝 **Uitleg:** ${v.explanation || 'Zoek het verband tussen de zinnen in de genoemde alinea.'}`,
    explanation: v.explanation
  };
}

// Hoofdfunctie voor het trekken van Begrijpend Lezen vragen verdeeld over gevarieerde teksten
function drawReadingQuestions(targetCount = 10, mode = 'practice', excludeTextIds = []) {
  const questions = [];
  // Elke tekst heeft 5 vragen; bereken hoeveel teksten nodig zijn
  const questionsPerText = 5;
  const neededTextsCount = Math.max(1, Math.ceil(targetCount / questionsPerText));
  const deckMode = mode === 'exam' ? 'exam' : 'practice';
  const selectedTexts = getNextRotatedTexts(neededTextsCount, deckMode, excludeTextIds);

  for (let tIdx = 0; tIdx < selectedTexts.length; tIdx++) {
    const tekst = selectedTexts[tIdx];
    const remainingNeeded = targetCount - questions.length;
    if (remainingNeeded <= 0) break;

    const allVragen = tekst.vragen || [];
    let chosenVragen;

    if (remainingNeeded >= allVragen.length) {
      // Houd de natuurlijke alineavolgorde (1 -> 2 -> 3 -> 4 -> hele tekst) aan!
      chosenVragen = [...allVragen];
    } else {
      // Kies een gevarieerde deelverzameling maar behoud de logische tekstvolgorde
      const indices = fisherYatesShuffle(allVragen.map((_, idx) => idx))
        .slice(0, remainingNeeded)
        .sort((a, b) => a - b);
      chosenVragen = indices.map(i => allVragen[i]);
    }

    for (const v of chosenVragen) {
      if (questions.length >= targetCount) break;

      if (mode === 'growth') {
        const v1 = buildReadingQuestionForLevel(tekst, v, 1);
        const v2 = buildReadingQuestionForLevel(tekst, v, 2);
        const v3 = buildReadingQuestionForLevel(tekst, v, 3);
        questions.push({
          ...v1,
          variants: {
            1: v1,
            2: v2,
            3: v3
          }
        });
      } else {
        const { options, correctIndex } = shuffleOptions(v.opties, v.correct);
        questions.push({
          domain: 'begrijpendLezen',
          subCategory: tekst.thema,
          passageTitle: tekst.titel,
          passage: tekst.tekst,
          question: `**${v.vraag}**`,
          options,
          correctIndex,
          hint1: v.hint1 || '💡 **Denktip:** Lees de alinea waarnaar verwezen wordt zorgvuldig terug en let op signaalwoorden.',
          hint2: v.hint2 || `📝 **Uitleg:** ${v.explanation || 'Zoek het verband tussen de zinnen in de genoemde alinea.'}`,
          explanation: v.explanation
        });
      }
    }
  }

  return questions;
}

// Compatibiliteitsfunctie voor losse aanroepen
function generateBegrijpendLezenQuestions(count = 5, mode = 'practice') {
  return drawReadingQuestions(count, mode);
}

function getReadingTextsForMode(mode = 'practice') {
  return mode === 'exam' ? toetsTeksten : oefenTeksten;
}

module.exports = {
  generateBegrijpendLezenQuestions,
  drawReadingQuestions,
  getReadingTextsForMode,
  oefenTeksten,
  toetsTeksten,
  leesteksten: [...oefenTeksten, ...toetsTeksten]
};
