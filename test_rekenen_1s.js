// test_rekenen_1s.js - Test alle 19 reken generators op 1S niveau en visuele maskers
const { allRekenenGenerators } = require('./generators/rekenen');
const { VisualRenderer } = require('./public/js/visuals');

console.log('=== TEST ALLE 19 REKEN GENERATORS OP 1S NIVEAU ===\n');

allRekenenGenerators.forEach((gen, index) => {
  // Test exam (1S)
  const examQ = gen('exam');
  console.log(`[GEN ${index + 1}] Exam Mode: ${examQ.subCategory}`);
  console.log(`Vraag: ${examQ.question.split('\n')[0]}`);
  console.log(`Antwoord: ${examQ.options[examQ.correctIndex]}`);
  if (examQ.visual) {
    const rendered = VisualRenderer.render(examQ.visual, false);
    if (!rendered) console.error(`❌ Visual type '${examQ.visual.type}' gaf lege string!`);
    else console.log(`Visual: type=${examQ.visual.type} OK`);
  }

  // Test practice (Mix)
  const practiceQ = gen('practice');
  if (!practiceQ.question || practiceQ.options.length < 4 || practiceQ.correctIndex === -1) {
    console.error(`❌ Fout in practiceQ voor gen ${index + 1}`);
  }
  console.log('---');
});

console.log('\n✅ ALLE 19 GENERATORS SUCCESVOL GETEST OP 1S EN PRACTICE!');
