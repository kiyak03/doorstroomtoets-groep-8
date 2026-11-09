// generators/aiGenerator.js - Optionele AI-gebaseerde toetsgenerator via Gemini API
const { GoogleGenAI } = require('@google/genai');

async function generateAITest({ apiKey, theme, domain = 'all', count = 10 }) {
  const effectiveApiKey = apiKey || process.env.GEMINI_API_KEY;
  if (!effectiveApiKey) {
    throw new Error('Geen Gemini API Key gevonden. Voer een geldige sleutel in om met AI op maat gemaakte toetsen te genereren.');
  }

  const ai = new GoogleGenAI({ apiKey: effectiveApiKey });

  const domainPrompt = domain === 'all'
    ? 'een mix van Rekenen (40%), Begrijpend Lezen (30%) en Taalverzorging/Spelling (30%)'
    : `alleen vragen voor het vakgebied: ${domain}`;

  const prompt = `Je bent een ervaren Nederlandse onderwijskundige en toetsontwikkelaar voor de officiële Doorstroomtoets voor leerlingen in Groep 8 van de basisschool (leeftijd 11-12 jaar).

Genereer een toets met precies ${count} vragen over ${domainPrompt}.
${theme ? `Thema of interesse van het kind: "${theme}". Verwerk dit thema speels in de verhaaltjessommen, teksten en voorbeelden.` : ''}

Elke vraag MOET aan de volgende eisen voldoen:
1. Niveau: Exact groep 8 niveau (Doorstroomtoets / Cito / Route8 / IEP niveau).
2. Meerkeuze: Precies 4 opties per vraag.
3. Hints (CRUCIAAL):
   - "hint1": Een pedagogische denktip of strategie (zonder het antwoord direct weg te geven).
   - "hint2": Een stap-voor-stap uitrekening of regeltoepassing waarmee het kind de som of vraag gegarandeerd kan oplossen.
4. Uitleg ("explanation"): Een heldere, vriendelijke toelichting waarom het juiste antwoord klopt.

Retourneer UITSLUITEND een geldig JSON-array van objecten, zonder markdown backticks, in het volgende formaat:
[
  {
    "domain": "rekenen" | "begrijpendLezen" | "taalverzorging",
    "subCategory": "Korte categorienaam",
    "passageTitle": "Optioneel: titel van leestekst als het begrijpend lezen is",
    "passage": "Optioneel: korte leestekst van 2-3 alinea's als het begrijpend lezen betreft",
    "question": "De vraagstelling in helder Nederlands",
    "options": ["Optie A", "Optie B", "Optie C", "Optie D"],
    "correctIndex": 0,
    "hint1": "Denktip",
    "hint2": "Stap-voor-stap uitrekening",
    "explanation": "Volledige uitleg"
  }
]`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      responseMimeType: 'application/json'
    }
  });

  const text = response.text;
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch (err) {
    // Strip possible markdown backticks
    const cleaned = text.replace(/```json/gi, '').replace(/```/g, '').trim();
    parsed = JSON.parse(cleaned);
  }

  // Ensure each question has an ID
  return parsed.map((q, idx) => ({
    id: `ai-q-${idx + 1}`,
    ...q
  }));
}

module.exports = {
  generateAITest
};
