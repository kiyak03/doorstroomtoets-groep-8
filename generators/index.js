// generators/index.js - Centrale Doorstroomtoets Toets Generator (Cito / Leerling in beeld)
const { allRekenenGenerators, REKENEN_TOPICS, getRekenenGeneratorsForTopic } = require('./rekenen');
const { drawReadingQuestions } = require('./begrijpendLezen');
const {
  allTaalGenerators,
  level1TaalGenerators,
  level2TaalGenerators,
  level3TaalGenerators,
  generateTaalverzorgingQuestion
} = require('./taalverzorging');

// Zuivere Fisher-Yates shuffle voor uniforme willekeurigheid
function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Haal unieke rekenopgaven op (ondersteunt subTopic én 'growth' modus met Level 1/2/3 varianten)
function drawUniqueRekenenQuestions(count, mode = 'practice', subTopic = 'all') {
  const questions = [];
  const topicGenerators = getRekenenGeneratorsForTopic(subTopic);
  let availableGens = shuffle([...topicGenerators]);
  const seenQuestions = new Set();

  for (let i = 0; i < count; i++) {
    if (availableGens.length === 0) {
      availableGens = shuffle([...topicGenerators]);
    }
    const gen = availableGens.pop();

    if (mode === 'growth') {
      // Genereer voor deze vraagplek direct Level 1 (🌱), Level 2 (🌿) en Level 3 (🏆)
      let v1 = gen('practice', 1);
      let v2 = gen('practice', 2);
      let v3 = gen('practice', 3);
      for (let attempt = 0; attempt < 5; attempt++) {
        if (!seenQuestions.has(v1.question)) break;
        v1 = gen('practice', 1);
      }
      seenQuestions.add(v1.question);
      questions.push({
        ...v1,
        variants: {
          1: v1,
          2: v2,
          3: v3
        }
      });
    } else {
      let q = gen(mode);
      for (let attempt = 0; attempt < 5; attempt++) {
        if (!seenQuestions.has(q.question)) break;
        q = gen(mode);
      }
      seenQuestions.add(q.question);
      questions.push(q);
    }
  }
  return questions;
}

// Haal unieke taalverzorging opgaven op (ondersteunt 'growth' modus met Level 1/2/3 varianten)
function drawUniqueTaalQuestions(count, mode = 'practice') {
  const questions = [];

  if (mode === 'growth') {
    let avail1 = shuffle([...level1TaalGenerators]);
    let avail2 = shuffle([...level2TaalGenerators]);
    let avail3 = shuffle([...level3TaalGenerators]);
    const seen1 = new Set();
    const seen2 = new Set();
    const seen3 = new Set();

    const drawFromPool = (poolRef, fullPool, level, seenSet) => {
      if (poolRef.length === 0) {
        poolRef.push(...shuffle([...fullPool]));
      }
      const gen = poolRef.pop();
      let q = generateTaalverzorgingQuestion('practice', level);
      // Probeer eerst de gekozen generator met level metadata
      const raw = gen('practice');
      const labels = {
        1: '🌱 Level 1: Basis (1F)',
        2: '🌿 Level 2: Gemiddeld (1F+)',
        3: '🏆 Level 3: Pittig (2F Havo/Vwo)'
      };
      q = { ...raw, difficultyLevel: level, levelLabel: labels[level] };
      for (let attempt = 0; attempt < 5; attempt++) {
        if (!seenSet.has(q.question)) break;
        const altRaw = gen('practice');
        q = { ...altRaw, difficultyLevel: level, levelLabel: labels[level] };
      }
      seenSet.add(q.question);
      return q;
    };

    for (let i = 0; i < count; i++) {
      const v1 = drawFromPool(avail1, level1TaalGenerators, 1, seen1);
      const v2 = drawFromPool(avail2, level2TaalGenerators, 2, seen2);
      const v3 = drawFromPool(avail3, level3TaalGenerators, 3, seen3);
      questions.push({
        ...v1,
        variants: {
          1: v1,
          2: v2,
          3: v3
        }
      });
    }
    return questions;
  }

  let availableGens = shuffle([...allTaalGenerators]);
  for (let i = 0; i < count; i++) {
    if (availableGens.length === 0) {
      availableGens = shuffle([...allTaalGenerators]);
    }
    const gen = availableGens.pop();
    questions.push(gen(mode));
  }
  return questions;
}

// Haal unieke begrijpend lezen vragen op via het anti-herhalingsdeck (gescheiden per modus & per apparaat)
function drawUniqueReadingQuestions(targetCount, mode = 'practice', excludeTextIds = []) {
  return drawReadingQuestions(targetCount, mode, excludeTextIds);
}

function generateTest({ domain = 'all', count = 10, mode = 'practice', subTopic = 'all', excludeTextIds = [] }) {
  // Laat officiële aantallen toe (tot 65)
  const targetCount = Math.max(5, Math.min(65, parseInt(count) || 10));
  let questions = [];

  if (domain === 'rekenen') {
    questions = drawUniqueRekenenQuestions(targetCount, mode, subTopic);
  } else if (domain === 'taalverzorging') {
    questions = drawUniqueTaalQuestions(targetCount, mode);
  } else if (domain === 'begrijpendLezen') {
    questions = drawUniqueReadingQuestions(targetCount, mode, excludeTextIds);
  } else {
    // Gecombineerde Doorstroomtoets (Cito Mix)
    const rekenenCount = Math.round(targetCount * 0.38);
    const begrijpendCount = Math.round(targetCount * 0.33);
    const taalCount = targetCount - rekenenCount - begrijpendCount;

    const rQs = drawUniqueRekenenQuestions(rekenenCount, mode, 'all');
    const bQs = drawUniqueReadingQuestions(begrijpendCount, mode, excludeTextIds);
    const tQs = drawUniqueTaalQuestions(taalCount, mode);

    // Groepeer vragen ordelijk: eerst een blok rekenen, dan begrijpend lezen (teksten bij elkaar!), dan taalverzorging
    questions = [...rQs, ...bQs, ...tQs];
  }

  const subTopicInfo = domain === 'rekenen' && REKENEN_TOPICS[subTopic]
    ? { id: REKENEN_TOPICS[subTopic].id, label: REKENEN_TOPICS[subTopic].label, icon: REKENEN_TOPICS[subTopic].icon }
    : null;

  // Wijs opeenvolgende vraagnummers en ID's toe
  const mappedQuestions = questions.slice(0, targetCount).map((q, index) => ({
    id: `q-${index + 1}`,
    number: index + 1,
    ...q
  }));

  return {
    id: `toets-${Date.now()}`,
    createdAt: new Date().toISOString(),
    domain,
    subTopic: domain === 'rekenen' ? subTopic : 'all',
    subTopicInfo,
    mode, // 'practice', 'exam', of 'growth'
    totalQuestions: mappedQuestions.length,
    questions: mappedQuestions
  };
}

// Bereken indicatief schooladvies & Cito Referentieniveaus (1F / 1S / 2F)
function calculateSchooladvies(scorePercentage, domain = 'all') {
  // Cito Referentieniveaus
  // 1F: Fundamenteel niveau (minimaal 50% beheersing)
  // 1S (Rekenen) of 2F (Taal/Lezen): Streefniveau (minimaal 75% beheersing)
  const behaald1F = scorePercentage >= 50;
  const behaaldStreef = scorePercentage >= 75;

  let streefLabel = "1S / 2F";
  if (domain === 'rekenen') streefLabel = "1S (Streefniveau Rekenen)";
  else if (domain === 'taalverzorging' || domain === 'begrijpendLezen') streefLabel = "2F (Streefniveau Taal)";
  else streefLabel = "1S / 2F (Streefniveau Rekenen & Taal)";

  const referentieniveaus = {
    niveau1F: {
      behaald: behaald1F,
      label: "1F (Fundamenteel basisniveau)",
      omschrijving: behaald1F ? "Behaald ✅" : "Nog in ontwikkeling ⏳"
    },
    streefniveau: {
      behaald: behaaldStreef,
      label: streefLabel,
      omschrijving: behaaldStreef ? "Behaald ⭐" : "Nog in ontwikkeling ⏳"
    }
  };

  let advies;
  if (scorePercentage >= 90) {
    advies = {
      niveau: "VWO (Gymnasium / Atheneum)",
      badge: "vwo",
      beschrijving: "Geweldige prestatie! Je beheerst de lesstof van groep 8 op het allerhoogste niveau. Het streefniveau is ruimschoots behaald.",
      kleur: "#6366f1"
    };
  } else if (scorePercentage >= 80) {
    advies = {
      niveau: "HAVO / VWO",
      badge: "havo-vwo",
      beschrijving: "Heel knap gedaan! Je hebt een sterke basis voor havo of vwo en beheerst het streefniveau.",
      kleur: "#3b82f6"
    };
  } else if (scorePercentage >= 70) {
    advies = {
      niveau: "HAVO",
      badge: "havo",
      beschrijving: "Goed gedaan! Je zit stevig op havo-niveau en beheerst het fundamentele niveau 1F uitstekend.",
      kleur: "#06b6d4"
    };
  } else if (scorePercentage >= 60) {
    advies = {
      niveau: "VMBO-GL / TL (Mavo)",
      badge: "vmbo-tl",
      beschrijving: "Mooi resultaat! Je bent goed op weg voor de theoretische of gemengde leerweg. Fundamenteel niveau 1F is behaald.",
      kleur: "#10b981"
    };
  } else if (scorePercentage >= 45) {
    advies = {
      niveau: "VMBO-KB (Kaderberoepsgericht)",
      badge: "vmbo-kb",
      beschrijving: "Prima inzet! Met wat extra oefening op rekenen en begrijpend lezen kun je nog verder groeien.",
      kleur: "#f59e0b"
    };
  } else {
    advies = {
      niveau: "VMBO-BB (Basisberoepsgericht)",
      badge: "vmbo-bb",
      beschrijving: "Goed geoefend! Gebruik de oefenmodus met hints en tussenstappen om stap voor stap nog beter te worden.",
      kleur: "#ef4444"
    };
  }

  return {
    ...advies,
    referentieniveaus
  };
}

module.exports = {
  generateTest,
  calculateSchooladvies
};
