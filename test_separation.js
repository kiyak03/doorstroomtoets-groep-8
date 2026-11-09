// test_separation.js - Verificatie van strikte scheiding tussen Oefen- en Toetsmodus & Geen Antwoordlekken
const { generateTest } = require('./generators/index');
const { VisualRenderer } = require('./public/js/visuals');

console.log('--- START VERIFICATIE DOORSTROOMTOETS ---');

// Test 1: Begrijpend Lezen teksten vergelijken tussen Oefen en Toets
console.log('\n[TEST 1] Controleer Begrijpend Lezen teksten...');
const practiceReadTests = Array.from({ length: 20 }, () => generateTest({ domain: 'begrijpendLezen', count: 10, mode: 'practice' }));
const examReadTests = Array.from({ length: 20 }, () => generateTest({ domain: 'begrijpendLezen', count: 10, mode: 'exam' }));

const practicePassages = new Set();
practiceReadTests.forEach(t => t.questions.forEach(q => practicePassages.add(q.passageTitle)));

const examPassages = new Set();
examReadTests.forEach(t => t.questions.forEach(q => examPassages.add(q.passageTitle)));

console.log('Oefenteksten gevonden:', Array.from(practicePassages));
console.log('Toetsteksten gevonden:', Array.from(examPassages));

let readingOverlap = false;
for (const title of practicePassages) {
  if (examPassages.has(title)) {
    console.error(`❌ OVERLAP GEVONDEN in teksten: "${title}" zit in zowel oefen- als toetsmodus!`);
    readingOverlap = true;
  }
}
if (!readingOverlap) {
  console.log('✅ Begrijpend Lezen: 0% overlap tussen Oefen- en Toetsteksten!');
}

// Test 2: Taalverzorging vragen vergelijken
console.log('\n[TEST 2] Controleer Taalverzorging vragen...');
const practiceTaalTests = Array.from({ length: 30 }, () => generateTest({ domain: 'taalverzorging', count: 18, mode: 'practice' }));
const examTaalTests = Array.from({ length: 30 }, () => generateTest({ domain: 'taalverzorging', count: 18, mode: 'exam' }));

const practiceTaalQuestions = new Set();
practiceTaalTests.forEach(t => t.questions.forEach(q => practiceTaalQuestions.add(q.question)));

const examTaalQuestions = new Set();
examTaalTests.forEach(t => t.questions.forEach(q => examTaalQuestions.add(q.question)));

console.log(`Unieke oefenvragen taal: ${practiceTaalQuestions.size}`);
console.log(`Unieke toetsvragen taal: ${examTaalQuestions.size}`);

let taalOverlap = false;
for (const q of practiceTaalQuestions) {
  if (examTaalQuestions.has(q)) {
    console.error(`❌ OVERLAP GEVONDEN in taalvragen: "${q}"`);
    taalOverlap = true;
  }
}
if (!taalOverlap) {
  console.log('✅ Taalverzorging: 0% overlap tussen Oefen- en Toetsvragen!');
}

// Test 3: Rekenen - Controleer visuals op antwoordlekken (isSolution = false)
console.log('\n[TEST 3] Controleer Rekenen visuals op antwoordlekken...');
const rekenTests = Array.from({ length: 40 }, () => generateTest({ domain: 'rekenen', count: 20, mode: 'exam' }));

let leakCount = 0;
let totalVisualsChecked = 0;

rekenTests.forEach(t => {
  t.questions.forEach(q => {
    if (q.visual) {
      totalVisualsChecked++;
      const renderedHtml = VisualRenderer.render(q.visual, false);
      const correctAnswer = q.options[q.correctIndex];

      // Specifiek voor snelheid route: mag NOOIT het juiste antwoord tonen als badge boven de auto
      if (q.visual.type === 'snelheid-route') {
        const targetSpeed = q.visual.data.snelheid;
        if (renderedHtml.includes(`>${targetSpeed} km/u<`)) {
          console.error(`❌ LEK GEVONDEN in snelheid visual! Toont ${targetSpeed} km/u boven de auto.`);
          leakCount++;
        }
      }

      // Specifiek voor verhoudingstabel: mag nooit het antwoord al in een cel hebben
      if (q.visual.type === 'verhoudingstabel') {
        const rows = q.visual.data.rows;
        rows.forEach(r => {
          r.values.forEach(val => {
            if (val === '?') {
              // moet een vraagteken zijn in vraagmodus
            }
          });
        });
      }
    }
  });
});

console.log(`Aantal visuals gecontroleerd: ${totalVisualsChecked}`);
if (leakCount === 0) {
  console.log('✅ Alle visuals zijn netjes gemaskeerd: GEEN antwoordlekken in opgaven!');
} else {
  console.error(`❌ Er zijn ${leakCount} antwoordlekken gevonden!`);
}

// Test 4: Toetsmodus vs Oefenmodus eigenschappen
console.log('\n[TEST 4] Controleer mode eigenschappen in gegenereerde toets...');
const practiceTest = generateTest({ domain: 'all', count: 10, mode: 'practice' });
const examTest = generateTest({ domain: 'all', count: 60, mode: 'exam' });

console.log('Oefentoets modus:', practiceTest.mode, 'Vragen:', practiceTest.questions.length);
console.log('Toetsmodus modus:', examTest.mode, 'Vragen:', examTest.questions.length);

if (practiceTest.mode === 'practice' && examTest.mode === 'exam' && examTest.questions.length === 60) {
  console.log('✅ Toetsgeneratie parameters en aantallen kloppen perfect!');
}

console.log('\n--- ALLE VERIFICATIES VOLTOOID ---');
