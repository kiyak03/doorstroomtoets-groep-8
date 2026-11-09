// generators/taalverzorging.js - Uitgebreide Groep 8 Taalverzorging, Spelling & Grammatica Generator (Cito / Leerling in beeld)
// Oefenmodus ('practice') en Toetsmodus ('exam') hebben strikt gescheiden opgavenpoelen.

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleOptions(options, correctOption) {
  const uniqueOpts = Array.from(new Set(options.map(o => String(o))));
  const shuffled = [...uniqueOpts].sort(() => Math.random() - 0.5);
  return {
    options: shuffled,
    correctIndex: shuffled.indexOf(String(correctOption))
  };
}

// 1. Werkwoordspelling: Tegenwoordige tijd (d / t / dt)
function genWerkwoordTT(mode = 'practice') {
  const practiceItems = [
    { inf: 'worden', stam: 'word', onderwerp: 'Lars', context: '... later professioneel archeoloog.', correct: 'wordt', wrong: ['word', 'worddt', 'worden'], tip: 'Onderwerp is een ander (hij/zij). Gebruik stam + t: word + t = wordt.' },
    { inf: 'worden', stam: 'word', onderwerp: 'Word', context: '... jij dit jaar ook twaalf jaar?', correct: 'Word', wrong: ['Wordt', 'Worddt', 'Wordden'], tip: 'Als "je/jij" er direct ÁCHTER staat, schrijf je alleen de stam (zonder t): Word jij!' },
    { inf: 'vinden', stam: 'vind', onderwerp: 'Mijn zus', context: '... wiskunde het leukste schoolvak.', correct: 'vindt', wrong: ['vind', 'vint', 'vinddt'], tip: 'Mijn zus is een derde persoon (zij). Dus stam (vind) + t = vindt.' },
    { inf: 'gebeuren', stam: 'gebeur', onderwerp: 'Er', context: '... altijd iets onverwachts in deze serie.', correct: 'gebeurt', wrong: ['gebeurd', 'gebeuren', 'gebeurdt'], tip: 'Tegenwoordige tijd! Nooit een d aan het eind bij tegenwoordige tijd (stam + t = gebeurt).' },
    { inf: 'beantwoorden', stam: 'beantwoord', onderwerp: 'De minister', context: '... alle vragen van de journalisten.', correct: 'beantwoordt', wrong: ['beantwoord', 'beantwoort', 'beantwoorden'], tip: 'Stam is beantwoord (eindigt al op d). Het is hij/zij, dus stam + t = beantwoordt.' }
  ];

  const examItems = [
    { inf: 'vinden', stam: 'vind', onderwerp: 'Vind', context: '... je die spannende documentaire ook zo indrukwekkend?', correct: 'Vind', wrong: ['Vindt', 'Vint', 'Vinden'], tip: 'Het onderwerp "je" staat direct achter de persoonsvorm: geen t achter de stam: Vind je!' },
    { inf: 'verhuizen', stam: 'verhuis', onderwerp: 'De familie Jansen', context: '... volgende maand naar een nieuwbouwwoning in Utrecht.', correct: 'verhuist', wrong: ['verhuisd', 'verhuizen', 'verhuizt'], tip: 'De stam van verhuizen is verhuis (z verandert in s). Dan + t = verhuist.' },
    { inf: 'bereiden', stam: 'bereid', onderwerp: 'De chef-kok', context: '... een verrukkelijk driegangenmenu voor de eregasten.', correct: 'bereidt', wrong: ['bereid', 'bereitt', 'bereiden'], tip: 'Stam is bereid. De kok = hij, dus stam + t = bereidt.' },
    { inf: 'raden', stam: 'raad', onderwerp: 'Wie', context: '... het geheime codewoord van de middeleeuwse schatkist?', correct: 'raadt', wrong: ['raad', 'raat', 'raaden'], tip: 'Wie is enkelvoud (hij). Stam van raden is raad. Stam + t = raadt.' },
    { inf: 'bieden', stam: 'bied', onderwerp: 'Het Rijksmuseum', context: '... gratis toegang aan alle basisschoolleerlingen.', correct: 'biedt', wrong: ['bied', 'biet', 'bieden'], tip: 'Het museum = het (enkelvoud). Stam bied + t = biedt.' }
  ];

  const item = randomChoice(mode === 'exam' ? examItems : practiceItems);
  const zin = `${item.onderwerp} ${item.context}`;
  const qText = `Welke vorm van het werkwoord **${item.inf}** hoort op de plek van de puntjes in de tegenwoordige tijd?\n\n"${zin}"`;
  const { options, correctIndex } = shuffleOptions([item.correct, ...item.wrong], item.correct);

  return {
    domain: 'taalverzorging',
    subCategory: 'Werkwoordspelling (Tegenwoordige Tijd)',
    question: qText,
    options,
    correctIndex,
    hint1: `💡 **Denktip:** Gebruik de 'lopen'-regel (of smurfen-regel). Vervang het werkwoord in gedachten door 'lopen': hoor je een 't'? Dan schrijf je stam + t!`,
    hint2: `📝 **Regel & Uitleg:**\n1. Werkwoord is **${item.inf}**.\n2. ${item.tip}\n3. Het juiste woord is dus **${item.correct}**.`,
    explanation: `Het juiste antwoord is **${item.correct}**. ${item.tip}`
  };
}

// 2. Werkwoordspelling: Verleden tijd zwakke werkwoorden ('t kofschip-x)
function genWerkwoordVTZwak(mode = 'practice') {
  const practiceItems = [
    {
      zin: 'De brandweerlieden ... de uitslaande brand gelukkig snel.',
      inf: 'blussen',
      correct: 'blusten',
      wrong: ['blusden', 'bluste', 'geblust'],
      uitleg: 'De stam van blussen is blus. De s zit in \'t kofschip, dus er komt -ten achter (brandweerlieden is meervoud): blusten.'
    },
    {
      zin: 'Gisteren ... het vliegtuig veilig op Schiphol.',
      inf: 'landen',
      correct: 'landde',
      wrong: ['landte', 'landen', 'geland'],
      uitleg: 'De stam van landen is land (eindigt op d). De d zit NIET in \'t kofschip, dus er komt -de achter: land + de = landde.'
    },
    {
      zin: 'Vorige week ... mijn vader een heerlijke appeltaart.',
      inf: 'bakken',
      correct: 'bakte',
      wrong: ['bakde', 'bakten', 'gebakken'],
      uitleg: 'De stam van bakken is bak (k zit in \'t kofschip). Het is enkelvoud, dus bak + te = bakte.'
    }
  ];

  const examItems = [
    {
      zin: 'De verhuizers ... alle zware eikenhouten kasten naar zolder.',
      inf: 'sjouwen',
      correct: 'sjouwden',
      wrong: ['sjouwten', 'sjouwde', 'gesjouwd'],
      uitleg: 'De w zit niet in \'t kofschip. Omdat verhuizers meervoud is, schrijf je sjouw + den = sjouwden.'
    },
    {
      zin: 'De verpleegkundige ... de wond uiterst voorzichtig met gaas.',
      inf: 'omzwachtelen',
      correct: 'omzwachtelde',
      wrong: ['omzwachtelte', 'omzwachtelden', 'omgezwachteld'],
      uitleg: 'De l zit niet in \'t kofschip. Enkelvoud, dus er komt -de achter: omzwachtelde.'
    },
    {
      zin: 'De jonge golden retriever ... enthousiast achter de tennisbal aan.',
      inf: 'rennen',
      correct: 'rende',
      wrong: ['rente', 'renden', 'gerend'],
      uitleg: 'Stam is ren. De n zit niet in \'t kofschip, dus stam + de = rende.'
    }
  ];

  const item = randomChoice(mode === 'exam' ? examItems : practiceItems);
  const qText = `Welke vorm van het werkwoord **${item.inf}** hoort in de **verleden tijd (vt)** op de plek van de puntjes?\n\n"${item.zin}"`;
  const { options, correctIndex } = shuffleOptions([item.correct, ...item.wrong], item.correct);

  return {
    domain: 'taalverzorging',
    subCategory: 'Werkwoordspelling (Verleden Tijd Zwak)',
    question: qText,
    options,
    correctIndex,
    hint1: `💡 **Denktip:** Kijk naar de laatste letter van de ruwe stam van het hele werkwoord min -en. Zit die letter in **'t kofschip-x**?`,
    hint2: `📝 **Regel:**\n• Letter in 't kofschip (t, k, f, s, ch, p, x)? Dan **-te** of **-ten**.\n• Letter NIET in 't kofschip? Dan **-de** of **-den**.\n${item.uitleg}`,
    explanation: `Het juiste antwoord is **${item.correct}**. ${item.uitleg}`
  };
}

// 3. Werkwoordspelling: Verleden tijd sterke werkwoorden (Klankverandering)
function genWerkwoordVTSterk(mode = 'practice') {
  const practiceItems = [
    { inf: 'vliegen', zin: 'De zwerm ganzen ... gisteren hoog over ons dorp naar het zuiden.', correct: 'vloog', wrong: ['vliegde', 'vloegen', 'gevlogen'] },
    { inf: 'zingen', zin: 'Het kinderkoor ... tijdens het kerstconcert prachtige liederen.', correct: 'zong', wrong: ['zingde', 'zongen', 'gezonge'] },
    { inf: 'brengen', zin: 'De pakketbezorger ... het zware pakketje keurig bij de buren.', correct: 'bracht', wrong: ['brengde', 'brocht', 'gebragt'] }
  ];

  const examItems = [
    { inf: 'kiezen', zin: 'De leerlingenraad ... unaniem voor een gezondere kantine.', correct: 'koos', wrong: ['kiesde', 'keusde', 'gekozen'] },
    { inf: 'rijden', zin: 'Vroeger ... er historische stoomtreinen over deze monumentale spoorlijn.', correct: 'reden', wrong: ['rijdden', 'reedden', 'gereden'] },
    { inf: 'krimpen', zin: 'Mijn nieuwe wollen trui ... enorm in de warme wasdroger.', correct: 'kromp', wrong: ['krimpte', 'kremp', 'gekrompen'] },
    { inf: 'duiken', zin: 'De waaghalzen ... van de hoge duikplank in het diepe zwembad.', correct: 'doken', wrong: ['duikten', 'dookten', 'gedoken'] }
  ];

  const item = randomChoice(mode === 'exam' ? examItems : practiceItems);
  const qText = `Welke vorm van het sterke werkwoord **${item.inf}** hoort in de **verleden tijd (vt)** op de plek van de puntjes?\n\n"${item.zin}"`;
  const { options, correctIndex } = shuffleOptions([item.correct, ...item.wrong], item.correct);

  return {
    domain: 'taalverzorging',
    subCategory: 'Werkwoordspelling (Sterke Werkwoorden)',
    question: qText,
    options,
    correctIndex,
    hint1: `💡 **Denktip:** Dit is een sterk werkwoord: de klank verandert in de verleden tijd! Let goed op of het onderwerp enkelvoud of meervoud is.`,
    hint2: `📝 **Uitleg:** Het hele werkwoord is **${item.inf}**. In de verleden tijd verandert de klinker: ${item.correct}.`,
    explanation: `Het juiste antwoord is **${item.correct}**. Het is een sterk werkwoord met klankverandering in de verleden tijd.`
  };
}

// 4. Werkwoordspelling: Voltooid deelwoord (d of t)
function genVoltooidDeelwoord(mode = 'practice') {
  const practiceItems = [
    {
      zin: 'De politie heeft de verdachte direct na de inbraak ...',
      inf: 'arresteren',
      correct: 'gearresteerd',
      wrong: ['gearresteert', 'arresteerde', 'gearesteerd'],
      uitleg: 'Kijk naar de stam van arresteren: arresteer (r zit niet in \'t kofschip). Het voltooid deelwoord eindigt dus op een d: gearresteerd.'
    },
    {
      zin: 'Heb jij dat moeilijke wiskunderaadsel al helemaal ...?',
      inf: 'oplossen',
      correct: 'opgelost',
      wrong: ['opgelosd', 'opgeloste', 'opgelossen'],
      uitleg: 'De stam is los (s zit in \'t kofschip). Dus het voltooid deelwoord eindigt op een t: opgelost.'
    },
    {
      zin: 'De leerlingen hebben het lokaal feestelijk ... voor het eindfeest.',
      inf: 'versieren',
      correct: 'versierd',
      wrong: ['versiert', 'versierde', 'geversierd'],
      uitleg: 'De r zit niet in \'t kofschip, dus het voltooid deelwoord eindigt op een d. Woorden met ver- krijgen bovendien geen extra ge-: versierd.'
    }
  ];

  const examItems = [
    {
      zin: 'De marathonloper heeft zijn persoonlijk record ruimschoots ...',
      inf: 'verbeteren',
      correct: 'verbeterd',
      wrong: ['verbetert', 'verbeterde', 'geverbeterd'],
      uitleg: 'Stam is verbeter (r zit niet in \'t kofschip). Het voltooid deelwoord eindigt daarom op een d: verbeterd.'
    },
    {
      zin: 'De bakker heeft het ambachtelijke meergranenbrood zorgvuldig ...',
      inf: 'snijden',
      correct: 'gesneden',
      wrong: ['gesneid', 'gesnijd', 'snijdde'],
      uitleg: 'Snijden is een sterk werkwoord: het voltooid deelwoord is gesneden (op -en).'
    },
    {
      zin: 'De astronoom heeft een nieuwe komeet aan de nachtelijke hemel ...',
      inf: 'ontdekken',
      correct: 'ontdekt',
      wrong: ['ontdekd', 'ontdekte', 'geontdekt'],
      uitleg: 'Stam is ontdek (k zit in \'t kofschip). Dus voltooid deelwoord op -t: ontdekt (geen ge- bij voorvoegsel ont-).'
    }
  ];

  const item = randomChoice(mode === 'exam' ? examItems : practiceItems);
  const qText = `Welke vorm van het werkwoord **${item.inf}** hoort als **voltooid deelwoord** op de plek van de puntjes?\n\n"${item.zin}"`;
  const { options, correctIndex } = shuffleOptions([item.correct, ...item.wrong], item.correct);

  return {
    domain: 'taalverzorging',
    subCategory: 'Werkwoordspelling (Voltooid Deelwoord)',
    question: qText,
    options,
    correctIndex,
    hint1: `💡 **Denktip:** Maak het voltooid deelwoord langer in je hoofd om te horen of het op een d of t eindigt (of gebruik 't kofschip-x).`,
    hint2: `📝 **Regel:**\n${item.uitleg}`,
    explanation: `Het juiste antwoord is **${item.correct}**. ${item.uitleg}`
  };
}

// 5. Spelling: Bijvoeglijk gebruikt voltooid deelwoord
function genBijvoeglijkNaamwoordVD(mode = 'practice') {
  const practiceItems = [
    {
      zin: 'De bakker gooide het ... brood direct weg.',
      woord: 'verbranden',
      correct: 'verbrande',
      wrong: ['verbrandde', 'verbrantte', 'verbrante'],
      uitleg: 'Een bijvoeglijk gebruikt voltooid deelwoord schrijf je zo kort mogelijk: verbrand + e = verbrande (nooit dubbel d als je het niet hoort!).'
    },
    {
      zin: 'De burgemeester opende het feestelijk ... plein.',
      woord: 'verlichten',
      correct: 'verlichte',
      wrong: ['verlichtte', 'verligte', 'verlighte'],
      uitleg: 'Schrijf het bijvoeglijk naamwoord zo kort mogelijk: verlicht + e = verlichte (nooit dubbel t).'
    }
  ];

  const examItems = [
    {
      zin: 'Mijn oma draagt altijd een zelf ... wollen sjaal.',
      woord: 'breien',
      correct: 'gebreide',
      wrong: ['gebreidde', 'gebreite', 'gebreit'],
      uitleg: 'Gebreid + e = gebreide. Je schrijft het met een enkele d.'
    },
    {
      zin: 'De politie waarschuwde voor de ... verdachte.',
      woord: 'vluchten',
      correct: 'gevluchte',
      wrong: ['gevluchtte', 'gevlugte', 'gevlugtte'],
      uitleg: 'Gevlucht + e = gevluchte. Altijd zo kort mogelijk spellen zonder dubbele medeklinkers.'
    },
    {
      zin: 'De timmerman monteerde het pas ... houten raamkozijn.',
      woord: 'verven',
      correct: 'geverfde',
      wrong: ['geverfte', 'geverfdde', 'geverftte'],
      uitleg: 'Geverfd + e = geverfde. Verfde heeft een d in de verleden tijd, dus geverfde met een d.'
    }
  ];

  const item = randomChoice(mode === 'exam' ? examItems : practiceItems);
  const qText = `Wat is de juiste spelling van het bijvoeglijk gebruikte woord in deze zin?\n\n"${item.zin}"`;
  const { options, correctIndex } = shuffleOptions([item.correct, ...item.wrong], item.correct);

  return {
    domain: 'taalverzorging',
    subCategory: 'Spelling (Bijvoeglijk Voltooid Deelwoord)',
    question: qText,
    options,
    correctIndex,
    hint1: `💡 **Denktip:** De hoofdregel voor bijvoeglijk gebruikte voltooide deelwoorden is: **zo kort mogelijk**! Nooit dubbel d of dubbel t, tenzij de klank anders verandert.`,
    hint2: `📝 **Regel:**\n${item.uitleg}`,
    explanation: `Het juiste antwoord is **${item.correct}**. ${item.uitleg}`
  };
}

// 6. Spelling: Tussenletter -n
function genTussenN(mode = 'practice') {
  const practiceItems = [
    { woord: 'pannenkoek', fouten: ['pannekoek', 'pannenkoeck', 'panenkoek'], regel: 'Pan heeft alleen een meervoud op -en (pannen). Daarom schrijf je een tussen-n: pannenkoek.' },
    { woord: 'zonnebloem', fouten: ['zonnenbloem', 'zonne-bloem', 'zonebloem'], regel: 'Er is maar één zon aan onze hemel (uniek hemellichaam). Woorden met zon krijgen daarom GEEN tussen-n: zonnebloem.' },
    { woord: 'apenkooi', fouten: ['apekooi', 'apen-kooi', 'appenkooi'], regel: 'Aap heeft meervoud apen (op -en). Dus schrijf je apenkooi met een tussen-n.' }
  ];

  const examItems = [
    { woord: 'paardenbloem', fouten: ['paardebloem', 'paarden-bloem', 'pardenbloem'], regel: 'Paard heeft als enige meervoud paarden (op -en). Dus wel een tussen-n: paardenbloem.' },
    { woord: 'maneschijn', fouten: ['manenschijn', 'maaneschijn', 'manen-schijn'], regel: 'Er is maar één maan aan onze hemel. Woorden met maan krijgen GEEN tussen-n: maneschijn.' },
    { woord: 'bessenjam', fouten: ['bessejam', 'bessen-jam', 'bessemjam'], regel: 'Bes heeft als meervoud bessen (op -en). Dus schrijf je een tussen-n: bessenjam.' },
    { woord: 'ruggengraat', fouten: ['ruggegraat', 'ruggengraad', 'rugge-graat'], regel: 'Rug heeft als meervoud ruggen (op -en). Dus schrijf je ruggengraat met een tussen-n.' }
  ];

  const item = randomChoice(mode === 'exam' ? examItems : practiceItems);
  const qText = mode === 'exam'
    ? `In welk van de onderstaande woorden is de **tussenletter -n** juist geschreven?`
    : `Kies het samengestelde woord dat **correct gespeld** is met of zonder tussen-n:`;
  const { options, correctIndex } = shuffleOptions([item.woord, ...item.fouten], item.woord);

  return {
    domain: 'taalverzorging',
    subCategory: 'Spelling (Tussen-n)',
    question: qText,
    options,
    correctIndex,
    hint1: `💡 **Denktip:** Heeft het eerste woorddeel alléén een meervoud op -en? Dan schrijf je meestal een tussen-n. Behalve bij unieke voorwerpen zoals de zon en de maan!`,
    hint2: `📝 **Regel:**\n${item.regel}`,
    explanation: `Het juiste antwoord is **${item.woord}**. ${item.regel}`
  };
}

// 7. Spelling: Tussenletter -s
function genTussenS(mode = 'practice') {
  const practiceItems = [
    { woord: 'stationsgebouw', fouten: ['stationgebouw', 'stations-gebouw', 'statiegebouw'], uitleg: 'Je hoort de tussen-s duidelijk als je het uitspreekt: station-s-gebouw.' },
    { woord: 'geluidshinder', fouten: ['geluidhinder', 'geluidenthinder', 'geluids-hinder'], uitleg: 'Tussen geluid en hinder hoor en schrijf je een tussen-s: geluidshinder.' }
  ];

  const examItems = [
    { woord: 'verkeersbord', fouten: ['verkeerbord', 'verkeerenbord', 'verkeers-bord'], uitleg: 'Je hoort de tussen-s: verkeer-s-bord.' },
    { woord: 'dorpsplein', fouten: ['dorpplein', 'dorpenplein', 'dorps-plein'], uitleg: 'Tussen dorp en plein hoor je een tussen-s: dorpsplein.' },
    { woord: 'moederskindje', fouten: ['moederkindje', 'moederenkindje', 'moeders-kindje'], uitleg: 'Je zegt en schrijft de tussen-s: moederskindje.' },
    { woord: 'levensmiddelen', fouten: ['levenmiddelen', 'levens-middelen', 'levenenmiddelen'], uitleg: 'Tussen leven en middelen hoor je de tussen-s: levensmiddelen.' }
  ];

  const item = randomChoice(mode === 'exam' ? examItems : practiceItems);
  const qText = mode === 'exam'
    ? `Kies de optie waarin de **tussenletter -s** op de juiste manier is toegevoegd:`
    : `Welk woord is **foutloos gespeld** met een tussen-s?`;
  const { options, correctIndex } = shuffleOptions([item.woord, ...item.fouten], item.woord);

  return {
    domain: 'taalverzorging',
    subCategory: 'Spelling (Tussen-s)',
    question: qText,
    options,
    correctIndex,
    hint1: `💡 **Denktip:** Spreek het woord rustig uit in je hoofd. Hoor je een duidelijke 's'-klank tussen de twee woorden?`,
    hint2: `📝 **Uitleg:** ${item.uitleg}`,
    explanation: `Het juiste antwoord is **${item.woord}**. ${item.uitleg}`
  };
}

// 8. Spelling: Trema's (Klinkerbotsing)
function genTremas(mode = 'practice') {
  const practiceItems = [
    {
      vraag: 'In welk van de volgende woorden staat het trema (¨) op de juiste plaats?',
      correct: 'kopiëren',
      wrong: ['kopieeren', 'kopie-eren', 'kopieëren'],
      uitleg: 'Bij kopiëren voorkomt het trema op de e dat je "ee" als één lange klank leest.'
    },
    {
      vraag: 'Welk getal is in letters correct gespeld met een trema?',
      correct: 'tweeëntwintig',
      wrong: ['tweeentwintig', 'tweëentwintig', 'twee-en-twintig'],
      uitleg: 'De botsende klinkers zijn de e van twee en de e van en. Het trema komt op de eerste letter van het nieuwe woorddeel: tweeëntwintig.'
    }
  ];

  const examItems = [
    {
      vraag: 'Wat is het juiste meervoud van "zee" met een trema?',
      correct: 'zeeën',
      wrong: ['zeeen', 'zeëen', 'zee-en'],
      uitleg: 'Het grondwoord is zee. In het meervoud komt er -en achter: zeeën met een trema op de eerste e van de uitgang.'
    },
    {
      vraag: 'Welk woord is volgens de spellingsregels voor klinkerbotsing juist gespeld?',
      correct: 'reëel',
      wrong: ['reeël', 'reeel', 're-eel'],
      uitleg: 'Het trema komt op de tweede e om de klinkers te scheiden: re-ëel.'
    },
    {
      vraag: 'Welk werkwoord is foutloos gespeld met een trema?',
      correct: 'beïnvloeden',
      wrong: ['beinvloeden', 'be-invloeden', 'beïnvloëden'],
      uitleg: 'Zonder trema zou je "ei" als één klank lezen. Het trema op de i voorkomt dit: be-ïnvloeden.'
    },
    {
      vraag: 'Wat is de juiste spelling van het meervoud van "kniesoor"?',
      correct: 'kniesoren',
      wrong: ['kniezoren', 'kniesoiren', 'kniesooren'],
      uitleg: 'Kniesoren schrijf je met een s en een enkele o: kniesoren.'
    }
  ];

  const item = randomChoice(mode === 'exam' ? examItems : practiceItems);
  const { options, correctIndex } = shuffleOptions([item.correct, ...item.wrong], item.correct);

  return {
    domain: 'taalverzorging',
    subCategory: 'Spelling (Trema)',
    question: item.vraag,
    options,
    correctIndex,
    hint1: `💡 **Denktip:** Een trema (¨) voorkomt dat twee klinkers samen als één verkeerde klank worden uitgesproken (klinkerbotsing). Het trema staat altijd op de eerste letter van de nieuwe lettergreep.`,
    hint2: `📝 **Uitleg:** ${item.uitleg}`,
    explanation: `Het juiste antwoord is **${item.correct}**. ${item.uitleg}`
  };
}

// 9. Spelling: Apostrofs ('s) bij meervoud en bezit
function genApostrofs(mode = 'practice') {
  const practiceItems = [
    {
      vraag: 'Welk woord is correct gespeld in het meervoud met een apostrof?',
      correct: 'baby\'s',
      wrong: ['babys', 'baby-s', 'baby\'es'],
      uitleg: 'Woorden die eindigen op een lange klinker (zoals de y die klinkt als ie, of a, o, u) krijgen een apostrof-s om de klank lang te houden: baby\'s.'
    },
    {
      vraag: 'Hoe schrijf je het bezit van "opa" correct?',
      correct: 'opa\'s fiets',
      wrong: ['opas fiets', 'opa-s fiets', 'opaas fiets'],
      uitleg: 'Bij bezitsvormen van woorden die eindigen op een lange klinker gebruik je een apostrof-s: opa\'s.'
    }
  ];

  const examItems = [
    {
      vraag: 'Wat is de juiste schrijfwijze van deze vaste tijduitdrukking?',
      correct: '\'s ochtends',
      wrong: ['s\'ochtends', '\'s-ochtends', 'sochtends'],
      uitleg: '\'s is een afkorting van het oude woord "des". De apostrof staat vóór de s, met een spatie naar het volgende woord: \'s ochtends.'
    },
    {
      vraag: 'Wat is het juiste meervoud van "paraplu"?',
      correct: 'paraplu\'s',
      wrong: ['paraplus', 'parapluus', 'paraplu-s'],
      uitleg: 'Paraplu eindigt op een lange u-klank. Zonder apostrof zou er "paraplus" staan met een korte u. Dus met apostrof-s: paraplu\'s.'
    },
    {
      vraag: 'Wat is de juiste schrijfwijze?',
      correct: '\'s winters',
      wrong: ['s\'winters', 'swinters', '\'s-winters'],
      uitleg: 'Net als bij \'s ochtends en \'s avonds staat de apostrof vóór de s: \'s winters.'
    },
    {
      vraag: 'Wat is het juiste meervoud van "hobby"?',
      correct: 'hobby\'s',
      wrong: ['hobbys', 'hobbies', 'hobby-s'],
      uitleg: 'Woorden op -y krijgen in het Nederlandse meervoud een apostrof-s: hobby\'s.'
    }
  ];

  const item = randomChoice(mode === 'exam' ? examItems : practiceItems);
  const { options, correctIndex } = shuffleOptions([item.correct, ...item.wrong], item.correct);

  return {
    domain: 'taalverzorging',
    subCategory: 'Spelling (Apostrof)',
    question: item.vraag,
    options,
    correctIndex,
    hint1: `💡 **Denktip:** Een apostrof (') bij meervoud gebruik je als het woord eindigt op een lange klinker (a, i, o, u, y) die anders verkeerd klinkt als je er direct een s aan vastplakt.`,
    hint2: `📝 **Uitleg:** ${item.uitleg}`,
    explanation: `Het juiste antwoord is **${item.correct}**. ${item.uitleg}`
  };
}

// 10. Spelling: Weetwoorden met ei of ij
function genEiOfIj(mode = 'practice') {
  const practiceItems = [
    {
      zin: 'De reizigers stapten in de trein om naar Rome te ...',
      correct: 'reizen',
      wrong: ['rijzen', 'reiszen', 'rijsen'],
      uitleg: 'Reizen (een tocht maken) schrijf je met een korte ei. Rijzen met een lange ij betekent omhooggaan (zoals deeg dat rijst).'
    },
    {
      zin: 'Robin Hood schoot met zijn boog een scherpe ... in de roos.',
      correct: 'pijl',
      wrong: ['peil', 'pyle', 'pijll'],
      uitleg: 'Een pijl en boog schrijf je met een lange ij. Peil met een korte ei betekent het waterniveau of meetniveau.'
    }
  ];

  const examItems = [
    {
      zin: 'De kapitein is de dappere ... van het expeditieschip.',
      correct: 'leider',
      wrong: ['lijder', 'leidder', 'lijdder'],
      uitleg: 'Leider (de baas / wie leiding geeft) schrijf je met korte ei. Een lijder met lange ij is iemand die pijn lijdt.'
    },
    {
      zin: 'Die berghelling is enorm ... en gevaarlijk om te beklimmen.',
      correct: 'steil',
      wrong: ['stijl', 'steijl', 'stijle'],
      uitleg: 'Steil (zeer schuin omhoog) is met een korte ei. Stijl met lange ij betekent een smaak of mode.'
    },
    {
      zin: 'Vandaag ... de kok een exclusief viergangendiner voor de jubilaris.',
      correct: 'bereidt',
      wrong: ['berijdt', 'bereid', 'berijd'],
      uitleg: 'Eten klaarmaken is bereiden (met korte ei). Een paard bestijgen is berijden (met lange ij).'
    },
    {
      zin: 'Het waterpeil van de rivier steeg tot ongekende ...',
      correct: 'hoogte',
      wrong: ['hoochte', 'hoogde', 'hochtte'],
      uitleg: 'Hoogte is afgeleid van hoog, met -te erachter: hoogte.'
    }
  ];

  const item = randomChoice(mode === 'exam' ? examItems : practiceItems);
  const qText = `Welk woord hoort op de plek van de puntjes?\n\n"${item.zin}"`;
  const { options, correctIndex } = shuffleOptions([item.correct, ...item.wrong], item.correct);

  return {
    domain: 'taalverzorging',
    subCategory: 'Spelling (ei of ij)',
    question: qText,
    options,
    correctIndex,
    hint1: `💡 **Denktip:** Dit zijn weetwoorden! Let goed op de betekenis van het woord in de zin.`,
    hint2: `📝 **Betekenisverschil:** ${item.uitleg}`,
    explanation: `Het juiste antwoord is **${item.correct}**. ${item.uitleg}`
  };
}

// 11. Spelling: Weetwoorden met ou of au
function genOuOfAu(mode = 'practice') {
  const practiceItems = [
    {
      zin: 'Het publiek gaf een luid ... na het geweldige optreden.',
      correct: 'applaus',
      wrong: ['applous', 'aplaus', 'applauws'],
      uitleg: 'Applaus is een weetwoord met een atje-au: a-p-p-l-a-u-s.'
    },
    {
      zin: 'De chirurg werkte uiterst ... tijdens de operatie.',
      correct: 'nauwkeurig',
      wrong: ['nouwkeurig', 'nauwkeurich', 'nawkeurig'],
      uitleg: 'Nauwkeurig (heel precies) schrijf je met een au.'
    }
  ];

  const examItems = [
    {
      zin: 'In het park zagen we een prachtige kleurrijke ... zijn veren spreiden.',
      correct: 'pauw',
      wrong: ['pouw', 'pauwe', 'paaw'],
      uitleg: 'Pauw is een weetwoord met au.'
    },
    {
      zin: 'Ik heb het volste ... in een succesvolle afronding van ons project.',
      correct: 'vertrouwen',
      wrong: ['vertrauwen', 'vertrouwwe', 'vertrouwe'],
      uitleg: 'Vertrouwen schrijf je met een otje-ou.'
    },
    {
      zin: 'Na het verlies van zijn trouwe viervoeter was hij diep in de ...',
      correct: 'rouw',
      wrong: ['rauw', 'rouwe', 'rauwheid'],
      uitleg: 'Rouw (verdriet na overlijden) is met ou. Rauw met au betekent ongebakken / ongekookt.'
    },
    {
      zin: 'De bezoeker at een heerlijke schaal met ... groenten.',
      correct: 'rauwe',
      wrong: ['rouwe', 'rauwt', 'rauwhe'],
      uitleg: 'Rauw (ongekookt voedsel) schrijf je met au: rauwe groenten.'
    }
  ];

  const item = randomChoice(mode === 'exam' ? examItems : practiceItems);
  const qText = `Wat is de juiste spelling van het woord in deze zin?\n\n"${item.zin}"`;
  const { options, correctIndex } = shuffleOptions([item.correct, ...item.wrong], item.correct);

  return {
    domain: 'taalverzorging',
    subCategory: 'Spelling (ou of au)',
    question: qText,
    options,
    correctIndex,
    hint1: `💡 **Denktip:** Denk aan de au-plaat of het au-verhaal dat je op school hebt geleerd.`,
    hint2: `📝 **Regel:** ${item.uitleg}`,
    explanation: `Het juiste antwoord is **${item.correct}**. ${item.uitleg}`
  };
}

// 12. Spelling: Leenwoorden met c, k of s
function genCEnKEnS(mode = 'practice') {
  const practiceItems = [
    {
      zin: 'In het laboratorium keken de onderzoekers door een sterke ...',
      correct: 'microscoop',
      wrong: ['mikroscoop', 'mikroskoop', 'microscop'],
      uitleg: 'Microscoop schrijf je met een c en een k: micro-scoop.'
    },
    {
      zin: 'In het weekend gaan we met de familie naar de ... om de nieuwe film te zien.',
      correct: 'bioscoop',
      wrong: ['bioskoop', 'biocscoop', 'byoscoop'],
      uitleg: 'Bioscoop schrijf je met een c: b-i-o-s-c-o-o-p.'
    }
  ];

  const examItems = [
    {
      zin: 'De acrobaten en clowns traden op in een groot overdekt ...',
      correct: 'circus',
      wrong: ['sirkus', 'cirkus', 'sircus'],
      uitleg: 'Circus schrijf je met twee c\'s: c-i-r-c-u-s.'
    },
    {
      zin: 'De politie startte direct een grote ... om de dader op te sporen.',
      correct: 'actie',
      wrong: ['aktie', 'aksie', 'actye'],
      uitleg: 'Actie schrijf je in het Nederlands met een c: a-c-t-i-e.'
    },
    {
      zin: 'De pianist gaf een schitterend ... in de uitverkochte concertzaal.',
      correct: 'concert',
      wrong: ['konsert', 'consert', 'koncert'],
      uitleg: 'Concert schrijf je met twee c\'s: c-o-n-c-e-r-t.'
    }
  ];

  const item = randomChoice(mode === 'exam' ? examItems : practiceItems);
  const qText = `Wat is de juiste spelling van het woord in deze zin?\n\n"${item.zin}"`;
  const { options, correctIndex } = shuffleOptions([item.correct, ...item.wrong], item.correct);

  return {
    domain: 'taalverzorging',
    subCategory: 'Spelling (c, k of s)',
    question: qText,
    options,
    correctIndex,
    hint1: `💡 **Denktip:** Veel van deze woorden zijn leenwoorden uit het Frans of Latijn die met een 'c' worden geschreven.`,
    hint2: `📝 **Uitleg:** ${item.uitleg}`,
    explanation: `Het juiste antwoord is **${item.correct}**. ${item.uitleg}`
  };
}

// 13. Grammatica: Persoonsvorm (pv)
function genPersoonsvorm(mode = 'practice') {
  const practiceItems = [
    {
      zin: 'Morgen geeft de meester een uitdagende rekentoets aan groep 8.',
      correct: 'geeft',
      wrong: ['de meester', 'een uitdagende rekentoets', 'aan groep 8'],
      stap: 'Maak de zin vragend: "Geeft de meester morgen...?". Het woord dat vooraan komt te staan is de persoonsvorm: geeft.'
    },
    {
      zin: 'Gisteren zagen de verbaasde wandelaars een zeldzame ree in het bos.',
      correct: 'zagen',
      wrong: ['de verbaasde wandelaars', 'een zeldzame ree', 'in het bos'],
      stap: 'Zet de zin in een andere tijd (tegenwoordige tijd): "Vandaag zien de verbaasde wandelaars...". Het werkwoord dat verandert is de persoonsvorm: zagen.'
    }
  ];

  const examItems = [
    {
      zin: 'Tijdens de spannende finale scoorde onze topspits in de allerlaatste minuut.',
      correct: 'scoorde',
      wrong: ['onze topspits', 'in de allerlaatste minuut', 'tijdens de spannende finale'],
      stap: 'Vraagproef: "Scoorde onze topspits tijdens de finale...?". Het woord dat vooraan komt is de persoonsvorm (scoorde).'
    },
    {
      zin: 'In de vroege ochtend floten tientallen vogels een vrolijk lentelied in de boom.',
      correct: 'floten',
      wrong: ['tientallen vogels', 'een vrolijk lentelied', 'in de vroege ochtend'],
      stap: 'Tijdproef: "fluiten" in tt -> "floten" verandert van vorm, dus floten is de persoonsvorm.'
    },
    {
      zin: 'Elke dinsdagmiddag traint het hockeyteam intensief voor het kampioenschap.',
      correct: 'traint',
      wrong: ['het hockeyteam', 'intensief', 'voor het kampioenschap'],
      stap: 'Vraagproef: "Traint het hockeyteam elke dinsdagmiddag...?". Traint komt vooraan en is de pv.'
    }
  ];

  const item = randomChoice(mode === 'exam' ? examItems : practiceItems);
  const qText = `Lees de zin:\n*"${item.zin}"*\n\n**Wat is de persoonsvorm (pv) in deze zin?**`;
  const { options, correctIndex } = shuffleOptions([item.correct, ...item.wrong], item.correct);

  return {
    domain: 'taalverzorging',
    subCategory: 'Grammatica (Persoonsvorm)',
    question: qText,
    options,
    correctIndex,
    hint1: `💡 **Denktip:** Gebruik de vraagproef (maak de zin vragend) of de tijdproef (verander de tijd van de zin). Het woord dat vooraan staat of verandert van vorm, is de persoonsvorm.`,
    hint2: `📝 **Stappenplan:** ${item.stap}`,
    explanation: `Het juiste antwoord is **${item.correct}**. ${item.stap}`
  };
}

// 14. Grammatica: Onderwerp (ow)
function genOnderwerp(mode = 'practice') {
  const practiceItems = [
    {
      zin: 'De nieuwsgierige kinderen ontdekten gisteren een geheime gang in het kasteel.',
      correct: 'De nieuwsgierige kinderen',
      wrong: ['ontdekten', 'een geheime gang', 'in het kasteel'],
      stap: 'Vraag: Wie of wat + persoonsvorm (ontdekten)? Antwoord: "De nieuwsgierige kinderen". Dat is het onderwerp.'
    },
    {
      zin: 'Na de hevige storm waaiden drie grote eikenbomen omver in het stadspark.',
      correct: 'drie grote eikenbomen',
      wrong: ['Na de hevige storm', 'waaiden', 'in het stadspark'],
      stap: 'Vraag: Wie of wat waaiden omver? Antwoord: "drie grote eikenbomen". Dat is het onderwerp.'
    }
  ];

  const examItems = [
    {
      zin: 'Vanochtend bakte de vriendelijke bakker verse croissants voor de hele buurt.',
      correct: 'de vriendelijke bakker',
      wrong: ['Vanochtend', 'bakte', 'verse croissants'],
      stap: 'Vraag: Wie of wat bakte? Antwoord: "de vriendelijke bakker". Dat is het onderwerp.'
    },
    {
      zin: 'Plotseling verscheen er een mysterieuze schaduw achter de dichte gordijnen.',
      correct: 'een mysterieuze schaduw',
      wrong: ['Plotseling', 'verscheen er', 'achter de dichte gordijnen'],
      stap: 'Vraag: Wie of wat verscheen? Antwoord: "een mysterieuze schaduw". Dat is het onderwerp.'
    },
    {
      zin: 'In het voorjaar bouwen de ijverige zwaluwen een nest onder de dakgoot.',
      correct: 'de ijverige zwaluwen',
      wrong: ['In het voorjaar', 'bouwen', 'een nest onder de dakgoot'],
      stap: 'Vraag: Wie bouwen? Antwoord: "de ijverige zwaluwen". Dat is het onderwerp.'
    }
  ];

  const item = randomChoice(mode === 'exam' ? examItems : practiceItems);
  const qText = `Lees de zin:\n*"${item.zin}"*\n\n**Wat is het onderwerp (ow) van deze zin?**`;
  const { options, correctIndex } = shuffleOptions([item.correct, ...item.wrong], item.correct);

  return {
    domain: 'taalverzorging',
    subCategory: 'Grammatica (Onderwerp)',
    question: qText,
    options,
    correctIndex,
    hint1: `💡 **Denktip:** Zoek eerst de persoonsvorm. Vraag dan: Wie of wat + persoonsvorm?`,
    hint2: `📝 **Stappenplan:** ${item.stap}`,
    explanation: `Het juiste antwoord is **${item.correct}**. ${item.stap}`
  };
}

// 15. Grammatica: Lijdend voorwerp (lv)
function genLijdendVoorwerp(mode = 'practice') {
  const practiceItems = [
    {
      zin: 'Sanne kocht voor haar verjaardag een prachtige nieuwe fiets.',
      correct: 'een prachtige nieuwe fiets',
      wrong: ['Sanne', 'kocht', 'voor haar verjaardag'],
      stap: 'Vraag: Wie of wat + persoonsvorm (kocht) + onderwerp (Sanne)? "Wat kocht Sanne?" -> een prachtige nieuwe fiets.'
    },
    {
      zin: 'De rechercheur onderzocht urenlang de geheimzinnige vingerafdrukken.',
      correct: 'de geheimzinnige vingerafdrukken',
      wrong: ['De rechercheur', 'onderzocht', 'urenlang'],
      stap: 'Vraag: Wat onderzocht de rechercheur? -> de geheimzinnige vingerafdrukken.'
    }
  ];

  const examItems = [
    {
      zin: 'Mijn broer repareerde gistermiddag met veel geduld zijn oude computer.',
      correct: 'zijn oude computer',
      wrong: ['Mijn broer', 'repareerde', 'gistermiddag met veel geduld'],
      stap: 'Vraag: Wie of wat repareerde mijn broer? -> zijn oude computer.'
    },
    {
      zin: 'De kunstenaar schilderde met passie een schitterend heidelandschap.',
      correct: 'een schitterend heidelandschap',
      wrong: ['De kunstenaar', 'schilderde', 'met passie'],
      stap: 'Vraag: Wat schilderde de kunstenaar? -> een schitterend heidelandschap.'
    },
    {
      zin: 'Tijdens de vakantie fotografeerde Emma de indrukwekkende gletsjers.',
      correct: 'de indrukwekkende gletsjers',
      wrong: ['Tijdens de vakantie', 'fotografeerde', 'Emma'],
      stap: 'Vraag: Wat fotografeerde Emma? -> de indrukwekkende gletsjers.'
    }
  ];

  const item = randomChoice(mode === 'exam' ? examItems : practiceItems);
  const qText = `Lees de zin:\n*"${item.zin}"*\n\n**Wat is het lijdend voorwerp (lv) in deze zin?**`;
  const { options, correctIndex } = shuffleOptions([item.correct, ...item.wrong], item.correct);

  return {
    domain: 'taalverzorging',
    subCategory: 'Grammatica (Lijdend Voorwerp)',
    question: qText,
    options,
    correctIndex,
    hint1: `💡 **Denktip:** Vraag: Wie of wat + persoonsvorm + onderwerp?`,
    hint2: `📝 **Stappenplan:** ${item.stap}`,
    explanation: `Het juiste antwoord is **${item.correct}**. ${item.stap}`
  };
}

// 16. Grammatica: Meewerkend voorwerp (mv)
function genMeewerkendVoorwerp(mode = 'practice') {
  const practiceItems = [
    {
      zin: 'De gulle bakker schonk de arme zwerver een warm vers brood.',
      correct: 'de arme zwerver',
      wrong: ['De gulle bakker', 'schonk', 'een warm vers brood'],
      stap: 'Vraag: Aan wie of voor wie + pv + ow + lv? "Aan wie schonk de bakker een brood?" -> aan de arme zwerver.'
    },
    {
      zin: 'Oma gaf haar kleindochter een prachtig prentenboek cadeau.',
      correct: 'haar kleindochter',
      wrong: ['Oma', 'een prachtig prentenboek', 'cadeau'],
      stap: 'Vraag: Aan wie gaf oma een prentenboek? -> aan haar kleindochter.'
    }
  ];

  const examItems = [
    {
      zin: 'De meester vertelde de aandachtige leerlingen een spannend geschiedenisverhaal.',
      correct: 'de aandachtige leerlingen',
      wrong: ['De meester', 'vertelde', 'een spannend geschiedenisverhaal'],
      stap: 'Vraag: Aan wie vertelde de meester een verhaal? -> aan de aandachtige leerlingen.'
    },
    {
      zin: 'De postbode overhandigde de buurvrouw een aangetekende brief.',
      correct: 'de buurvrouw',
      wrong: ['De postbode', 'overhandigde', 'een aangetekende brief'],
      stap: 'Vraag: Aan wie overhandigde de postbode een brief? -> aan de buurvrouw.'
    },
    {
      zin: 'Tim leende zijn beste vriend een handige schroevendraaier.',
      correct: 'zijn beste vriend',
      wrong: ['Tim', 'leende', 'een handige schroevendraaier'],
      stap: 'Vraag: Aan wie leende Tim een schroevendraaier? -> aan zijn beste vriend.'
    }
  ];

  const item = randomChoice(mode === 'exam' ? examItems : practiceItems);
  const qText = `Lees de zin:\n*"${item.zin}"*\n\n**Wat is het meewerkend voorwerp (mv) in deze zin?**`;
  const { options, correctIndex } = shuffleOptions([item.correct, ...item.wrong], item.correct);

  return {
    domain: 'taalverzorging',
    subCategory: 'Grammatica (Meewerkend Voorwerp)',
    question: qText,
    options,
    correctIndex,
    hint1: `💡 **Denktip:** Vraag: **Aan wie** of **voor wie** + persoonsvorm + onderwerp + lijdend voorwerp? Je kunt er vaak 'aan' voor zetten als het er nog niet staat.`,
    hint2: `📝 **Stappenplan:** ${item.stap}`,
    explanation: `Het juiste antwoord is **${item.correct}**. ${item.stap}`
  };
}

// 17. Woordsoorten (Taalkundig ontleden)
function genWoordsoorten(mode = 'practice') {
  const practiceItems = [
    {
      zin: 'Tijdens de spannende voetbalwedstrijd juichten de trouwe supporters enthousiast.',
      vraag: 'Welk woord in de zin is een **bijvoeglijk naamwoord**?',
      correct: 'trouwe',
      wrong: ['voetbalwedstrijd', 'juichten', 'supporters'],
      uitleg: 'Een bijvoeglijk naamwoord vertelt een eigenschap van een zelfstandig naamwoord: "trouwe" zegt iets over "supporters".'
    },
    {
      zin: 'De nieuwsgierige kat sprong behendig op de houten keukentafel.',
      vraag: 'Welk woord in de zin is een **voorzetsel**?',
      correct: 'op',
      wrong: ['kat', 'behendig', 'houten'],
      uitleg: 'Voorzetsels zijn \'kastwoorden\' (in, op, onder, naast, voor de kast). "Op" geeft de plaats aan.'
    }
  ];

  const examItems = [
    {
      zin: 'Omdat het hevig onweerde, bleven alle wandelaars veilig binnen in de berghut.',
      vraag: 'Welk woord in de zin is een **voegwoord**?',
      correct: 'Omdat',
      wrong: ['hevig', 'bleven', 'veilig'],
      uitleg: '"Omdat" verbindt twee zinnen (een hoofdzin en een bijzin) en geeft een reden aan. Dat is een voegwoord.'
    },
    {
      zin: 'De getalenteerde schilder mengde behoedzaam de heldere kleuren op zijn palet.',
      vraag: 'Welk woord in de zin is het **zelfstandig naamwoord**?',
      correct: 'schilder',
      wrong: ['getalenteerde', 'mengde', 'behoedzaam'],
      uitleg: 'Een zelfstandig naamwoord is een mens, dier, plant of ding waar je de, het of een voor kunt zetten: de schilder.'
    },
    {
      zin: 'Gisteren zongen de vrolijke kinderen een prachtig afscheidslied voor de meester.',
      vraag: 'Welk woord in de zin is een **werkwoord**?',
      correct: 'zongen',
      wrong: ['vrolijke', 'kinderen', 'prachtig'],
      uitleg: 'Een werkwoord is een doe-woord dat je kunt vervoegen in tijden: zongen (van zingen).'
    }
  ];

  const item = randomChoice(mode === 'exam' ? examItems : practiceItems);
  const qText = `Lees de zin:\n*"${item.zin}"*\n\n**${item.vraag}**`;
  const { options, correctIndex } = shuffleOptions([item.correct, ...item.wrong], item.correct);

  return {
    domain: 'taalverzorging',
    subCategory: 'Woordsoorten (Taalkundig ontleden)',
    question: qText,
    options,
    correctIndex,
    hint1: `💡 **Denktip:** Denk aan de eigenschappen van woordsoorten: zelfstandig naamwoord (mens/dier/ding), bijvoeglijk naamwoord (eigenschap), werkwoord (doe-woord), voorzetsel (kastwoord).`,
    hint2: `📝 **Uitleg:** ${item.uitleg}`,
    explanation: `Het juiste antwoord is **${item.correct}**. ${item.uitleg}`
  };
}

// 18. Interpunctie en Hoofdletters
function genInterpunctieEnHoofdletters(mode = 'practice') {
  const practiceItems = [
    {
      zin: 'Welke zin is grammaticaal correct geschreven met de juiste leestekens?',
      correct: '"Kom je morgen ook naar mijn feestje?" vroeg Daan.',
      wrong: [
        '"Kom je morgen ook naar mijn feestje?", vroeg Daan.',
        'Kom je morgen ook naar mijn feestje? vroeg Daan.',
        '"Kom je morgen ook naar mijn feestje"? vroeg Daan.'
      ],
      uitleg: 'Het vraagteken hoort binnen de aanhalingstekens. Na het aanhalingsteken komt bij een vraagteken géén extra komma: "Kom je...?" vroeg Daan.'
    },
    {
      zin: 'In welke zin staan de hoofdletters en komma\'s helemaal juist?',
      correct: 'Tijdens onze vakantie in Frankrijk bezochten we Parijs, Lyon en Marseille.',
      wrong: [
        'Tijdens onze vakantie in frankrijk bezochten we Parijs Lyon en Marseille.',
        'Tijdens onze vakantie in Frankrijk bezochten we Parijs, Lyon, en Marseille.',
        'Tijdens onze vakantie in Frankrijk, bezochten we parijs, lyon en marseille.'
      ],
      uitleg: 'Landen en steden (Frankrijk, Parijs, Lyon, Marseille) krijgen altijd een hoofdletter. Bij een opsomming zet je komma\'s, maar geen komma voor \'en\'.'
    }
  ];

  const examItems = [
    {
      zin: 'Welke zin heeft de juiste interpunctie bij een directe rede?',
      correct: 'De scheidsrechter riep: "Let allemaal goed op!"',
      wrong: [
        'De scheidsrechter riep "Let allemaal goed op!":',
        'De scheidsrechter riep: "Let allemaal goed op"! ',
        'De scheidsrechter riep; "Let allemaal goed op!"'
      ],
      uitleg: 'Voor de directe rede staat een dubbele punt (:). De uitroep en het uitroepteken staan binnen de aanhalingstekens.'
    },
    {
      zin: 'In welke zin is het gebruik van aanhalingstekens en komma\'s correct?',
      correct: '"Vergeet niet je gymspullen in te pakken," zei moeder.',
      wrong: [
        '"Vergeet niet je gymspullen in te pakken", zei moeder.',
        '"Vergeet niet je gymspullen in te pakken.", zei moeder.',
        'Vergeet niet je gymspullen in te pakken, zei moeder.'
      ],
      uitleg: 'Bij een gewone mededeling binnen aanhalingstekens staat de komma vóór het sluitende aanhalingsteken: "...," zei moeder.'
    },
    {
      zin: 'Welke zin bevat uitsluitend correcte hoofdletters?',
      correct: 'In augustus vliegen we vanaf Schiphol rechtstreeks naar Spanje.',
      wrong: [
        'In Augustus vliegen we vanaf schiphol rechtstreeks naar Spanje.',
        'In augustus vliegen we vanaf Schiphol rechtstreeks naar spanje.',
        'In Augustus vliegen we vanaf Schiphol rechtstreeks naar Spanje.'
      ],
      uitleg: 'Maanden van het jaar (augustus) schrijf je in het Nederlands met een kleine letter. Namen van luchthavens (Schiphol) en landen (Spanje) met een hoofdletter.'
    }
  ];

  const item = randomChoice(mode === 'exam' ? examItems : practiceItems);
  const { options, correctIndex } = shuffleOptions([item.correct, ...item.wrong], item.correct);

  return {
    domain: 'taalverzorging',
    subCategory: 'Leestekens & Hoofdletters',
    question: item.zin,
    options,
    correctIndex,
    hint1: `💡 **Denktip:** Let goed op de plaats van de aanhalingstekens, de dubbele punt, en welke woorden hoofdletters moeten krijgen (zoals namen van steden en landen).`,
    hint2: `📝 **Regel:** ${item.uitleg}`,
    explanation: `Het juiste antwoord is **${item.correct}**. ${item.uitleg}`
  };
}

// Extra uitdagende Level 3 (2F Havo/Vwo) opgaven speciaal voor de Opbouwende Groei-modus
const level3GrowthTaalItems = [
  {
    subCategory: 'Werkwoordspelling 2F (Inversie & dt-instinker)',
    question: `Welke vorm van het werkwoord **houden** hoort op de plek van de puntjes in de tegenwoordige tijd?\n\n"Waarom ... jij je nooit aan de afgesproken tijden?"`,
    correct: 'houd',
    wrong: ['houdt', 'houwt', 'houden'],
    hint1: `💡 **Denktip:** Let op! Het onderwerp "jij" staat direct ACHTER de persoonsvorm. Wat gebeurt er dan met de -t?`,
    hint2: `📝 **Regel:** Als "je/jij" direct achter de persoonsvorm staat, schrijf je alléén de stam (zonder t): **houd** jij.`,
    explanation: `Het juiste antwoord is **houd**. Omdat 'jij' achter de persoonsvorm staat, vervalt de -t achter de stam.`
  },
  {
    subCategory: 'Werkwoordspelling 2F (Gebiedende wijs vs. Persoonsvorm)',
    question: `Welke vorm van het werkwoord **aanraden** is juist in deze zin?\n\n"De huisarts ... de vermoeide patiënt gisteren dringend aan om meer rust te nemen."`,
    correct: 'raadde',
    wrong: ['raade', 'raadt', 'raden'],
    hint1: `💡 **Denktip:** Het woord 'gisteren' geeft aan dat de zin in de **verleden tijd** staat! Wat is de stam van (aan)raden?`,
    hint2: `📝 **Regel:** Stam is **raad** (met één a en een d). In de verleden tijd enkelvoud komt daar **-de** achter: raad + de = **raadde**.`,
    explanation: `Het juiste antwoord is **raadde**. Het staat in de verleden tijd ('gisteren'): stam (raad) + de = raadde.`
  },
  {
    subCategory: 'Spelling 2F (Bijvoeglijk gebruikt voltooid deelwoord)',
    question: `Wat is de juiste spelling van het bijvoeglijk gebruikte voltooid deelwoord in deze zin?\n\n"De archeologen onderzochten de pas ... Romeinse munten." (van *opgraven* / *vergroten*)`,
    correct: 'vergrote',
    wrong: ['vergrootte', 'vergroote', 'vergrotende'],
    hint1: `💡 **Denktip:** Het voltooid deelwoord van vergroten is 'vergroot'. Als je er een -e achter plakt als bijvoeglijk naamwoord, gelden de gewone klankregels (open lettergreep)!`,
    hint2: `📝 **Regel:** Vergroot + e wordt **vergrote** (met één o en één t, want de o staat in een open lettergreep: ver-gro-te).`,
    explanation: `Het juiste antwoord is **vergrote**. Bijvoeglijk gebruikte voltooide deelwoorden schrijf je zo kort mogelijk volgens de uitspraakregel.`
  },
  {
    subCategory: 'Spelling 2F (Bijvoeglijk gebruikt voltooid deelwoord)',
    question: `Welke vorm hoort op de plek van de puntjes?\n\n"De reizigers wachtten op het perron op de ... intercity." (van *vertragen*)`,
    correct: 'vertraagde',
    wrong: ['vertraagdde', 'vertraagte', 'vertragde'],
    hint1: `💡 **Denktip:** Voltooid deelwoord is 'vertraagd'. Plak er -e achter, maar schrijf nooit dubbel d!`,
    hint2: `📝 **Regel:** Vertraagd + e = **vertraagde** (met dubbel a in gesloten lettergreep, maar één d).`,
    explanation: `Het juiste antwoord is **vertraagde**.`
  },
  {
    subCategory: 'Grammatica 2F (Samengestelde zin & Onderwerp)',
    question: `Lees de samengestelde zin:\n*"Hoewel het pijpenstelen regende, fietsten de dappere scholieren zonder klagen naar het sportveld."*\n\n**Wat is het onderwerp van de hoofdzin?**`,
    correct: 'de dappere scholieren',
    wrong: ['het', 'pijpenstelen', 'naar het sportveld'],
    hint1: `💡 **Denktip:** Zoek eerst de persoonsvorm van de hoofdzin (*fietsten*). Vraag dan: Wie of wat fietsten?`,
    hint2: `📝 **Stappenplan:** Wie fietsten zonder klagen? **de dappere scholieren**.`,
    explanation: `Het juiste antwoord is **de dappere scholieren**.`
  },
  {
    subCategory: 'Grammatica 2F (Meewerkend voorwerp zonder voorzetsel)',
    question: `Lees de zin:\n*"De burgemeester overhandigde de trotse winnares na afloop de gouden medaille."*\n\n**Welk zinsdeel is het meewerkend voorwerp (mv)?**`,
    correct: 'de trotse winnares',
    wrong: ['De burgemeester', 'de gouden medaille', 'na afloop'],
    hint1: `💡 **Denktip:** Voor welk zinsdeel kun je het woordje **'aan'** plaatsen zonder dat de betekenis verandert?`,
    hint2: `📝 **Stappenplan:** Aan wie overhandigde de burgemeester de gouden medaille? Aan **de trotse winnares**.`,
    explanation: `Het juiste antwoord is **de trotse winnares** (meewerkend voorwerp). 'de gouden medaille' is het lijdend voorwerp.`
  },
  {
    subCategory: 'Woordsoorten 2F (Bijwoord vs. Bijvoeglijk naamwoord)',
    question: `Lees de zin:\n*"De buitengewoon talentvolle violiste speelde een ontroerend muziekstuk."*\n\n**Tot welke woordsoort behoort het woord 'buitengewoon' in deze zin?**`,
    correct: 'Bijwoord',
    wrong: ['Bijvoeglijk naamwoord', 'Zelfstandig naamwoord', 'Voegwoord'],
    hint1: `💡 **Denktip:** Zegt 'buitengewoon' iets over het zelfstandig naamwoord (violiste) of zegt het hoe 'talentvol' (bijvoeglijk naamwoord) zij is?`,
    hint2: `📝 **Regel:** Een woord dat iets zegt over een bijvoeglijk naamwoord ('hoe talentvol? buitengewoon talentvol!') heet een **bijwoord**.`,
    explanation: `Het juiste antwoord is **Bijwoord**, omdat 'buitengewoon' een bepaling is bij het bijvoeglijk naamwoord 'talentvolle'.`
  },
  {
    subCategory: 'Spelling 2F (Koppelteken & Klinkerbotsing)',
    question: `Welke samenstelling is volgens de officiële spellingsregels **foutloos** geschreven?`,
    correct: 'auto-ongeluk',
    wrong: ['autoongeluk', 'autoöngeluk', 'auto ongeluk'],
    hint1: `💡 **Denktip:** Bij samenstellingen van twee losse woorden waarbij twee klinkers botsen (o + o), gebruik je géén trema maar een ander teken!`,
    hint2: `📝 **Regel:** Bij klinkerbotsing in een **samenstelling** van twee woorden gebruik je een **koppelteken (-)**: **auto-ongeluk** (en dus geen trema of spatie).`,
    explanation: `Het juiste antwoord is **auto-ongeluk**. In samenstellingen gebruik je bij klinkerbotsing een koppelteken.`
  }
];

function genLevel3ExtraTaal() {
  const item = randomChoice(level3GrowthTaalItems);
  const { options, correctIndex } = shuffleOptions([item.correct, ...item.wrong], item.correct);
  return {
    domain: 'taalverzorging',
    subCategory: item.subCategory,
    question: item.question,
    options,
    correctIndex,
    hint1: item.hint1,
    hint2: item.hint2,
    explanation: item.explanation
  };
}

// Alle 18 unieke taalverzorging generators
const allTaalGenerators = [
  genWerkwoordTT,
  genWerkwoordVTZwak,
  genWerkwoordVTSterk,
  genVoltooidDeelwoord,
  genBijvoeglijkNaamwoordVD,
  genTussenN,
  genTussenS,
  genTremas,
  genApostrofs,
  genEiOfIj,
  genOuOfAu,
  genCEnKEnS,
  genPersoonsvorm,
  genOnderwerp,
  genLijdendVoorwerp,
  genMeewerkendVoorwerp,
  genWoordsoorten,
  genInterpunctieEnHoofdletters
];

// Indeling per moeilijkheidsgraad voor de Opbouwende Groei-modus:
// Level 1 (🌱 Basis 1F): Basis werkwoordspelling, weetwoorden, tussen-n, persoonsvorm & onderwerp
const level1TaalGenerators = [
  genWerkwoordTT,
  genWerkwoordVTZwak,
  genEiOfIj,
  genOuOfAu,
  genTussenN,
  genApostrofs,
  genPersoonsvorm,
  genOnderwerp
];

// Level 2 (🌿 Gemiddeld 1F+): Voltooid deelwoord, sterke werkwoorden, trema, c/k/s, lijdend voorwerp, woordsoorten
const level2TaalGenerators = [
  genVoltooidDeelwoord,
  genWerkwoordVTSterk,
  genTussenS,
  genTremas,
  genCEnKEnS,
  genLijdendVoorwerp,
  genWoordsoorten,
  genInterpunctieEnHoofdletters
];

// Level 3 (🏆 Pittig 2F Havo/Vwo): Bijvoeglijk VD, meewerkend voorwerp, interpunctie en speciale 2F-instinkers
const level3TaalGenerators = [
  genBijvoeglijkNaamwoordVD,
  genMeewerkendVoorwerp,
  genInterpunctieEnHoofdletters,
  genLevel3ExtraTaal,
  genLevel3ExtraTaal,
  genVoltooidDeelwoord,
  genWoordsoorten
];

function attachTaalLevelMeta(q, level) {
  const labels = {
    1: '🌱 Level 1: Basis (1F)',
    2: '🌿 Level 2: Gemiddeld (1F+)',
    3: '🏆 Level 3: Pittig (2F Havo/Vwo)'
  };
  return {
    ...q,
    difficultyLevel: level,
    levelLabel: labels[level] || labels[1]
  };
}

function generateTaalverzorgingQuestion(mode = 'practice', difficultyLevel = null) {
  if (difficultyLevel === 1) {
    const gen = randomChoice(level1TaalGenerators);
    return attachTaalLevelMeta(gen('practice'), 1);
  }
  if (difficultyLevel === 2) {
    const gen = randomChoice(level2TaalGenerators);
    return attachTaalLevelMeta(gen('practice'), 2);
  }
  if (difficultyLevel === 3) {
    const gen = randomChoice(level3TaalGenerators);
    return attachTaalLevelMeta(gen('practice'), 3);
  }
  const gen = randomChoice(allTaalGenerators);
  return gen(mode);
}

module.exports = {
  allTaalGenerators,
  level1TaalGenerators,
  level2TaalGenerators,
  level3TaalGenerators,
  generateTaalverzorgingQuestion
};
