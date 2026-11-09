// generators/rekenen.js - Uitgebreide Groep 8 Doorstroomtoets Rekenopgaven
// Ondersteunt:
// - Oefenmodus ('practice'): Gemixt verzwaard (50% 1F/1F+ basis, 50% 1S streefniveau met stapsgewijze hints)
// - Toetsmodus ('exam'): 100% 1S Streefniveau (HAVO/VWO Cito Doorstroomtoets niveau)
// - Opbouwende Groei-modus ('growth'): Drie expliciete niveaus (Level 1 🌱 Makkelijk 1F -> Level 2 🌿 Gemiddeld 1F+ -> Level 3 🏆 Pittig 1S)
// - Oefenen op Onderwerp (8 specifieke rekendomeinen)

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function gcd(a, b) {
  return b === 0 ? Math.abs(a) : gcd(b, a % b);
}

function shuffleOptions(options, correctOption) {
  const uniqueOpts = Array.from(new Set(options.map(o => String(o))));
  while (uniqueOpts.length < 4) {
    const fake = String(Number(correctOption) + (Math.random() > 0.5 ? 1 : -1) * randInt(1, 10));
    if (!uniqueOpts.includes(fake)) uniqueOpts.push(fake);
  }
  const shuffled = uniqueOpts.slice(0, 4);
  if (!shuffled.includes(String(correctOption))) {
    shuffled[randInt(0, 3)] = String(correctOption);
  }
  shuffled.sort(() => Math.random() - 0.5);
  return {
    options: shuffled,
    correctIndex: shuffled.indexOf(String(correctOption))
  };
}

// Bepaalt welk niveau (1 = Makkelijk 1F, 2 = Gemiddeld 1F+, 3 = Pittig 1S) gebruikt wordt
function resolveLevel(mode = 'practice', difficultyLevel = null) {
  if (difficultyLevel === 1 || difficultyLevel === 2 || difficultyLevel === 3) {
    return difficultyLevel;
  }
  if (mode === 'exam') return 3;
  // In vrije oefenmodus: 50% 1S (level 3), 25% 1F+ (level 2), 25% 1F (level 1)
  const r = Math.random();
  if (r < 0.5) return 3;
  if (r < 0.75) return 2;
  return 1;
}

function attachLevelMeta(q, level) {
  const labels = {
    1: '🌱 Level 1: Basis (1F)',
    2: '🌿 Level 2: Gemiddeld (1F+)',
    3: '🏆 Level 3: Pittig (1S Havo/Vwo)'
  };
  return {
    ...q,
    difficultyLevel: level,
    levelLabel: labels[level] || labels[1]
  };
}

// 1. Breuken: Optellen & Aftrekken
function genBreukenOptellenAftrekken(mode = 'practice', difficultyLevel = null) {
  const level = resolveLevel(mode, difficultyLevel);

  if (level === 3) {
    // Level 3 (1S): Gemengde breuken met ongelijknamige noemers (bijv. 2 1/3 + 1 3/4 of 3 1/4 - 1 2/3)
    const isPlus = Math.random() > 0.45;
    const [d1, d2] = randomChoice([[3, 4], [4, 5], [3, 5], [6, 8], [4, 6]]);
    const commonD = (d1 * d2) / gcd(d1, d2);

    let w1 = randInt(2, 4);
    let w2 = randInt(1, 2);
    let n1 = randInt(1, d1 - 1);
    let n2 = randInt(1, d2 - 1);

    const f1 = commonD / d1;
    const f2 = commonD / d2;
    const newN1 = n1 * f1;
    const newN2 = n2 * f2;

    let totWhole, totNum, totDen = commonD;
    let signStr = isPlus ? '+' : '-';

    if (isPlus) {
      totWhole = w1 + w2;
      const sumN = newN1 + newN2;
      if (sumN >= commonD) {
        totWhole += Math.floor(sumN / commonD);
        totNum = sumN % commonD;
      } else {
        totNum = sumN;
      }
    } else {
      if (w1 <= w2) w1 = w2 + 1;
      let diffWhole = w1 - w2;
      let diffNum = newN1 - newN2;
      if (diffNum < 0) {
        diffWhole -= 1;
        diffNum += commonD;
      }
      totWhole = diffWhole;
      totNum = diffNum;
    }

    const g = gcd(totNum, totDen);
    const simpNum = totNum / g;
    const simpDen = totDen / g;

    let correctStr;
    if (simpNum === 0) {
      correctStr = `${totWhole}`;
    } else if (totWhole === 0) {
      correctStr = `${simpNum}/${simpDen}`;
    } else {
      correctStr = `${totWhole} ${simpNum}/${simpDen}`;
    }

    const wrong1 = `${totWhole + 1} ${simpNum || 1}/${simpDen}`;
    const wrong2 = totWhole > 1 ? `${totWhole - 1} ${simpNum || 1}/${simpDen}` : `${totWhole} ${(simpNum + 1)}/${simpDen}`;
    const wrong3 = `${totWhole} ${n1 + n2}/${d1 + d2}`;

    const { options, correctIndex } = shuffleOptions([correctStr, wrong1, wrong2, wrong3], correctStr);

    const qText = isPlus
      ? `Voor een schoolproject heeft Lucas twee stukken hout nodig:\nHet eerste stuk is **${w1} ${n1}/${d1} meter** en het tweede stuk is **${w2} ${n2}/${d2} meter**.\n\nHoeveel meter hout heeft Lucas in totaal nodig?`
      : `In een kan zat **${w1} ${n1}/${d1} liter** vers sinaasappelsap.\nTijdens het ontbijt drinkt het gezin **${w2} ${n2}/${d2} liter** op.\n\nHoeveel liter sinaasappelsap is er nog over?`;

    return attachLevelMeta({
      domain: 'rekenen',
      subCategory: 'Breuken (Gemengde breuken optellen/aftrekken)',
      question: `${qText}\n\n**${w1} ${n1}/${d1} ${signStr} ${w2} ${n2}/${d2} = ?**`,
      options,
      correctIndex,
      hint1: `💡 **Denktip:** Maak eerst de breuken **gelijknamig** (gelijke noemer ${commonD}). Reken daarna de helen en de breukdelen apart uit.`,
      hint2: `📝 **Stap-voor-stap:**\n1. Gelijknamig maken met noemer ${commonD}:\n   • ${w1} ${n1}/${d1} = ${w1} ${newN1}/${commonD}\n   • ${w2} ${n2}/${d2} = ${w2} ${newN2}/${commonD}\n2. Reken uit: ${w1} ${newN1}/${commonD} ${signStr} ${w2} ${newN2}/${commonD} = **${correctStr}**.`,
      explanation: `Het juiste antwoord is **${correctStr}**. Maak de breuken gelijknamig met noemer ${commonD} en vereenvoudig het eindantwoord.`
    }, level);
  } else if (level === 2) {
    // Level 2 (1F+): Ongelijknamige breuken optellen en aftrekken
    const isPlus = Math.random() > 0.4;
    const [d1, d2] = randomChoice([[2, 3], [3, 4], [2, 5], [3, 5], [4, 5]]);
    let n1 = randInt(1, d1 - 1);
    let n2 = randInt(1, d2 - 1);

    const commonD = (d1 * d2) / gcd(d1, d2);
    const f1 = commonD / d1;
    const f2 = commonD / d2;
    let newN1 = n1 * f1;
    let newN2 = n2 * f2;

    let finalN, signStr;
    if (isPlus) {
      finalN = newN1 + newN2;
      signStr = '+';
    } else {
      if (newN1 <= newN2) {
        n1 = d1 - 1;
        n2 = 1;
        newN1 = n1 * f1;
        newN2 = n2 * f2;
      }
      finalN = Math.max(1, newN1 - newN2);
      signStr = '-';
    }

    const g = gcd(finalN, commonD);
    const simpN = finalN / g;
    const simpD = commonD / g;

    let correctStr = simpD === 1 ? `${simpN}` : `${simpN}/${simpD}`;
    if (simpN > simpD && simpD !== 1) {
      const whole = Math.floor(simpN / simpD);
      const rem = simpN % simpD;
      correctStr = `${whole} ${rem}/${simpD}`;
    }

    const wrong1 = `${n1 + n2}/${d1 + d2}`;
    const wrong2 = `${simpN + 1}/${simpD}`;
    const wrong3 = `${Math.max(1, simpN - 1)}/${simpD}`;

    const { options, correctIndex } = shuffleOptions([correctStr, wrong1, wrong2, wrong3], correctStr);

    return attachLevelMeta({
      domain: 'rekenen',
      subCategory: 'Breuken (Ongelijknamig optellen & aftrekken)',
      question: `Reken uit en vereenvoudig zo ver mogelijk:\n\n**${n1}/${d1} ${signStr} ${n2}/${d2} = ?**`,
      options,
      correctIndex,
      visual: {
        type: 'breukenstrook',
        n1, d1, n2, d2, sign: signStr,
        commonD, newN1, newN2, finalN, simpN, simpD, correctStr
      },
      hint1: `💡 **Denktip:** Maak beide breuken eerst gelijknamig (dezelfde noemer/onderkant: ${commonD}).`,
      hint2: `📝 **Stap-voor-stap:**\n1. Noemer wordt ${commonD}\n2. ${n1}/${d1} = ${newN1}/${commonD} en ${n2}/${d2} = ${newN2}/${commonD}\n3. Uitkomst: **${correctStr}**.`,
      explanation: `Het juiste antwoord is **${correctStr}**.`
    }, level);
  } else {
    // Level 1 (1F Basis): Gelijknamige of eenvoudige verwante breuken (bijv. noemer 4 en 8, of gelijke noemer)
    const d = randomChoice([4, 5, 6, 8, 10]);
    const isPlus = Math.random() > 0.35;
    let n1 = randInt(1, Math.max(1, d - 2));
    let n2 = isPlus ? randInt(1, Math.max(1, d - n1 - 1)) : randInt(1, Math.max(1, n1 - 1));
    if (!isPlus && n1 <= n2) {
      n1 = d - 1;
      n2 = randInt(1, Math.max(1, n1 - 1));
    }
    const signStr = isPlus ? '+' : '-';
    const finalN = isPlus ? (n1 + n2) : (n1 - n2);
    const g = gcd(finalN, d);
    const simpN = finalN / g;
    const simpD = d / g;
    const correctStr = simpD === 1 ? `${simpN}` : `${simpN}/${simpD}`;
    const wrong1 = `${finalN}/${d * 2}`;
    const wrong2 = `${simpN + 1}/${simpD}`;
    const wrong3 = `${Math.max(1, simpN - 1)}/${simpD + 1}`;

    const { options, correctIndex } = shuffleOptions([correctStr, wrong1, wrong2, wrong3], correctStr);
    return attachLevelMeta({
      domain: 'rekenen',
      subCategory: 'Breuken (Basis optellen & aftrekken)',
      question: `Reken uit en vereenvoudig als dat kan:\n\n**${n1}/${d} ${signStr} ${n2}/${d} = ?**`,
      options,
      correctIndex,
      visual: {
        type: 'breukenstrook',
        n1, d1: d, n2, d2: d, sign: signStr,
        commonD: d, newN1: n1, newN2: n2, finalN, simpN, simpD, correctStr
      },
      hint1: `💡 **Denktip:** De noemers (onderkanten) zijn al gelijk (${d})! Je hoeft alleen de tellers (${n1} ${signStr} ${n2}) bij elkaar op te tellen of af te trekken.`,
      hint2: `📝 **Stap-voor-stap:**\n1. ${n1}/${d} ${signStr} ${n2}/${d} = ${finalN}/${d}\n2. Vereenvoudigd: **${correctStr}**.`,
      explanation: `Het juiste antwoord is **${correctStr}**.`
    }, level);
  }
}

// 2. Breuken: Vermenigvuldigen & Delen door breuken
function genBreukenVermenigvuldigen(mode = 'practice', difficultyLevel = null) {
  const level = resolveLevel(mode, difficultyLevel);

  if (level === 3) {
    const isDelen = Math.random() > 0.5;
    if (isDelen) {
      const whole = randomChoice([3, 4, 5, 6]);
      const denom = randomChoice([2, 4]);
      const fracPart = denom === 2 ? 1 : randomChoice([1, 3]);
      const portionDen = 4;
      const totalFourths = (whole * 4) + (fracPart * (portionDen / denom));
      const portions = totalFourths;

      const correctStr = `${portions} glazen`;
      const wrong1 = `${portions - 2} glazen`;
      const wrong2 = `${portions + 4} glazen`;
      const wrong3 = `${whole * 2} glazen`;

      const { options, correctIndex } = shuffleOptions([correctStr, wrong1, wrong2, wrong3], correctStr);
      const qText = `In een grote kan zit **${whole} ${fracPart}/${denom} liter** limonadesiroop.\nEen gastvrouw schenkt glazen in van elk **1/4 liter**.\n\nHoeveel volle glazen kan zij hiermee maximaal vullen?`;

      return attachLevelMeta({
        domain: 'rekenen',
        subCategory: 'Breuken (Delen door een breuk)',
        question: `${qText}\n\n**${whole} ${fracPart}/${denom} ÷ 1/4 = ?**`,
        options,
        correctIndex,
        hint1: `💡 **Denktip:** Hoeveel keer past 1/4 liter in 1 liter? (4 keer!). Hoe vaak past het dan in ${whole} ${fracPart}/${denom} liter?`,
        hint2: `📝 **Stap-voor-stap:**\n1. In 1 liter gaan 4 glazen van 1/4 liter.\n2. In ${whole} liter gaan: ${whole} × 4 = ${whole * 4} glazen.\n3. In ${fracPart}/${denom} liter gaan: ${(fracPart * portionDen) / denom} glazen.\n4. Totaal: ${whole * 4} + ${(fracPart * portionDen) / denom} = **${portions} glazen**.`,
        explanation: `Het juiste antwoord is **${correctStr}**. ${whole} ${fracPart}/${denom} ÷ 1/4 = ${portions}.`
      }, level);
    } else {
      const pairs = [
        { w1: 1, n1: 1, d1: 2, w2: 2, n2: 2, d2: 3, ans: 4 },
        { w1: 2, n1: 1, d1: 2, w2: 1, n2: 1, d2: 5, ans: 3 },
        { w1: 1, n1: 1, d1: 3, w2: 2, n2: 1, d2: 4, ans: 3 },
        { w1: 2, n1: 1, d1: 4, w2: 1, n2: 1, d2: 3, ans: 3 },
        { w1: 3, n1: 1, d1: 3, w2: 1, n2: 1, d2: 2, ans: 5 }
      ];
      const p = randomChoice(pairs);
      const correctStr = `${p.ans} meter`;
      const wrong1 = `${p.ans + 1} meter`;
      const wrong2 = `${p.ans - 1} meter`;
      const wrong3 = `${p.w1 * p.w2} meter`;

      const { options, correctIndex } = shuffleOptions([correctStr, wrong1, wrong2, wrong3], correctStr);
      const qText = `Een timmerman heeft **${p.w1} ${p.n1}/${p.d1} planken** nodig.\nElke plank heeft een lengte van **${p.w2} ${p.n2}/${p.d2} meter**.\n\nHoeveel meter hout heeft de timmerman in totaal nodig?`;

      return attachLevelMeta({
        domain: 'rekenen',
        subCategory: 'Breuken (Gemengde breuken vermenigvuldigen)',
        question: `${qText}\n\n**${p.w1} ${p.n1}/${p.d1} × ${p.w2} ${p.n2}/${p.d2} = ?**`,
        options,
        correctIndex,
        hint1: `💡 **Denktip:** Zet beide gemengde breuken eerst om in onechte breuken (helen in de breuk stoppen). Vermenigvuldig daarna teller × teller en noemer × noemer.`,
        hint2: `📝 **Stap-voor-stap:**\n1. ${p.w1} ${p.n1}/${p.d1} = ${(p.w1 * p.d1) + p.n1}/${p.d1}\n2. ${p.w2} ${p.n2}/${p.d2} = ${(p.w2 * p.d2) + p.n2}/${p.d2}\n3. Vermenigvuldigen en vereenvoudigen geeft: **${p.ans} meter**.`,
        explanation: `Het juiste antwoord is **${correctStr}**.`
      }, level);
    }
  } else if (level === 2) {
    // Level 2 (1F+): Breuk × Breuk of Heel getal × Breuk met helen eruit halen
    const whole = randInt(4, 8);
    const d = randomChoice([3, 4, 5, 6]);
    const n = randInt(2, d - 1);

    const totalN = whole * n;
    const g = gcd(totalN, d);
    const simpN = totalN / g;
    const simpD = d / g;

    const correctStr = simpD === 1 ? `${simpN}` : (simpN > simpD ? `${Math.floor(simpN / simpD)} ${simpN % simpD}/${simpD}` : `${simpN}/${simpD}`);
    const wrong1 = `${whole * n}/${whole * d}`;
    const wrong2 = `${Math.floor(simpN / simpD) + 1} 1/${simpD}`;
    const wrong3 = `${Math.max(1, Math.floor(simpN / simpD) - 1)} ${simpN % simpD || 1}/${simpD}`;

    const { options, correctIndex } = shuffleOptions([correctStr, wrong1, wrong2, wrong3], correctStr);
    return attachLevelMeta({
      domain: 'rekenen',
      subCategory: 'Breuken vermenigvuldigen (Helen eruit halen)',
      question: `Reken uit en haal de helen eruit:\n\n**${whole} × ${n}/${d} = ?**`,
      options,
      correctIndex,
      hint1: `💡 **Denktip:** Vermenigvuldig het hele getal (${whole}) met de teller (${n}). De noemer blijft ${d}. Haal daarna de helen eruit.`,
      hint2: `📝 **Stap-voor-stap:**\n${whole} × ${n}/${d} = ${totalN}/${d} = **${correctStr}**.`,
      explanation: `Het juiste antwoord is **${correctStr}**.`
    }, level);
  } else {
    // Level 1 (1F Basis): Eenvoudige vermenigvuldiging (bijv. 3 × 1/4 = 3/4 of 2 × 2/5 = 4/5)
    const d = randomChoice([4, 5, 7, 8, 9]);
    const whole = randInt(2, 3);
    const n = 1;
    const totalN = whole * n;
    const correctStr = `${totalN}/${d}`;
    const wrong1 = `${totalN}/${d * whole}`;
    const wrong2 = `${whole} 1/${d}`;
    const wrong3 = `${totalN + 1}/${d}`;

    const { options, correctIndex } = shuffleOptions([correctStr, wrong1, wrong2, wrong3], correctStr);
    return attachLevelMeta({
      domain: 'rekenen',
      subCategory: 'Breuken vermenigvuldigen (Basis)',
      question: `Reken uit:\n\n**${whole} × ${n}/${d} = ?**`,
      options,
      correctIndex,
      hint1: `💡 **Denktip:** ${whole} keer ${n}/${d} betekent: ${whole} × ${n} tiende/vierde/vijfde deel. Alleen de bovenkant (teller) verandert!`,
      hint2: `📝 **Stap-voor-stap:**\n${whole} × ${n}/${d} = **${correctStr}**.`,
      explanation: `Het juiste antwoord is **${correctStr}**.`
    }, level);
  }
}

// 3. Breuk van een hoeveelheid
function genBreukVanHoeveelheid(mode = 'practice', difficultyLevel = null) {
  const level = resolveLevel(mode, difficultyLevel);

  if (level === 3) {
    const total = randomChoice([240, 360, 480, 600, 720]);
    const d1 = randomChoice([5, 8]);
    const n1 = d1 === 5 ? 2 : 3;
    const countA = (total / d1) * n1;

    const d2 = randomChoice([3, 4]);
    const n2 = 1;
    const countB = (total / d2) * n2;

    const countC = total - countA - countB;
    const correctStr = `${countC} leerlingen`;
    const wrong1 = `${countA} leerlingen`;
    const wrong2 = `${countB} leerlingen`;
    const wrong3 = `${countC + 20} leerlingen`;

    const { options, correctIndex } = shuffleOptions([correctStr, wrong1, wrong2, wrong3], correctStr);
    const qText = `Op een basisschool zitten in totaal **${total} leerlingen**.\n• **${n1}/${d1} deel** komt op de fiets naar school.\n• **${n2}/${d2} deel** komt met de bus of auto.\n• De overige leerlingen komen lopend naar school.\n\nHoeveel leerlingen komen er **lopend** naar school?`;

    return attachLevelMeta({
      domain: 'rekenen',
      subCategory: 'Breuken (Meerstaps redactiesom)',
      question: qText,
      options,
      correctIndex,
      hint1: `💡 **Denktip:** Reken eerst uit hoeveel leerlingen met de fiets komen (${n1}/${d1} van ${total}), en hoeveel met de bus/auto (${n2}/${d2} van ${total}). Trek die twee groepen daarna af van het totaal.`,
      hint2: `📝 **Stap-voor-stap:**\n1. Fiets: (${total} ÷ ${d1}) × ${n1} = **${countA}**\n2. Bus/Auto: (${total} ÷ ${d2}) × ${n2} = **${countB}**\n3. Lopend: ${total} - ${countA} - ${countB} = **${countC} leerlingen**.`,
      explanation: `Het juiste antwoord is **${correctStr}**. Fiets = ${countA}, bus/auto = ${countB}. Overblijvend lopend: ${total} - ${countA + countB} = ${countC}.`
    }, level);
  } else if (level === 2) {
    const d = randomChoice([4, 5, 6, 8]);
    const factor = randomChoice([15, 20, 25, 30, 35]);
    const total = d * factor;
    const n = randInt(2, d - 1);
    const ans = n * factor;

    const correctStr = `${ans}`;
    const wrong1 = `${factor}`;
    const wrong2 = `${ans + factor}`;
    const wrong3 = `${Math.max(10, ans - 15)}`;

    const { options, correctIndex } = shuffleOptions([correctStr, wrong1, wrong2, wrong3], correctStr);
    return attachLevelMeta({
      domain: 'rekenen',
      subCategory: 'Breuk van een hoeveelheid',
      question: `Van de **${total} bezoekers** in een sporthal heeft **${n}/${d} deel** een seizoenskaart.\n\nHoeveel bezoekers hebben een seizoenskaart?`,
      options,
      correctIndex,
      hint1: `💡 **Denktip:** Deel eerst door de noemer (${total} ÷ ${d}) en doe dat keer de teller (${n}).`,
      hint2: `📝 **Stap-voor-stap:**\n1. 1/${d} deel = ${total} ÷ ${d} = ${factor}\n2. ${n}/${d} deel = ${factor} × ${n} = **${ans}**.`,
      explanation: `Het juiste antwoord is **${correctStr}**.`
    }, level);
  } else {
    // Level 1: Stambreuk (1/2, 1/3, 1/4, 1/5) van een rond getal
    const d = randomChoice([2, 3, 4, 5, 10]);
    const factor = randomChoice([10, 12, 15, 20, 30]);
    const total = d * factor;
    const ans = factor;
    const correctStr = `€${ans}`;
    const wrong1 = `€${ans + 5}`;
    const wrong2 = `€${ans * 2}`;
    const wrong3 = `€${Math.max(2, ans - 4)}`;

    const { options, correctIndex } = shuffleOptions([correctStr, wrong1, wrong2, wrong3], correctStr);
    return attachLevelMeta({
      domain: 'rekenen',
      subCategory: 'Breuk van een bedrag (Basis)',
      question: `Je krijgt **1/${d} deel** van **€${total}**.\n\nHoeveel euro krijg je?`,
      options,
      correctIndex,
      hint1: `💡 **Denktip:** 1/${d} deel nemen betekent: delen door **${d}**!`,
      hint2: `📝 **Stap-voor-stap:**\n€${total} ÷ ${d} = **€${ans}**.`,
      explanation: `Het juiste antwoord is **${correctStr}**.`
    }, level);
  }
}

// 4. Procenten: Korting & Terugrekenen
function genProcentenKorting(mode = 'practice', difficultyLevel = null) {
  const level = resolveLevel(mode, difficultyLevel);

  if (level === 3) {
    const items = [
      { perc: 20, paid: 96, orig: 120, artikel: 'een winterjas' },
      { perc: 25, paid: 75, orig: 100, artikel: 'een paar hardloopschoenen' },
      { perc: 30, paid: 140, orig: 200, artikel: 'een mountainbike' },
      { perc: 15, paid: 170, orig: 200, artikel: 'een tablet' },
      { perc: 40, paid: 120, orig: 200, artikel: 'een sporthorloge' },
      { perc: 20, paid: 64, orig: 80, artikel: 'een rugzak' },
      { perc: 25, paid: 120, orig: 160, artikel: 'een koptelefoon' }
    ];
    const item = randomChoice(items);
    const remainPerc = 100 - item.perc;

    const correctStr = `€${item.orig}`;
    const fopKorting = Math.round(item.paid * (item.perc / 100));
    const wrong1 = `€${item.paid + fopKorting}`;
    const wrong2 = `€${item.orig + 25}`;
    const wrong3 = `€${item.paid - 15}`;

    const { options, correctIndex } = shuffleOptions([correctStr, wrong1, wrong2, wrong3], correctStr);
    const qText = `Tijdens de zomersale geldt er **${item.perc}% korting** op ${item.artikel}.\nNa aftrek van deze korting betaalt Sophie **€${item.paid}** aan de kassa.\n\nWat was de **oorspronkelijke prijs** van ${item.artikel} vóór de korting?`;

    return attachLevelMeta({
      domain: 'rekenen',
      subCategory: 'Procenten (Terugrekenen naar 100%)',
      question: qText,
      options,
      correctIndex,
      hint1: `💡 **Let op (Grote Cito Instinker):** De €${item.paid} is NIET 100%, maar ${remainPerc}% (100% - ${item.perc}% korting). Reken via 1% terug naar 100%!`,
      hint2: `📝 **Stap-voor-stap:**\n1. De actieprijs is ${remainPerc}% van de oude prijs: €${item.paid} = ${remainPerc}%\n2. Bereken 1%: €${item.paid} ÷ ${remainPerc} = **€${item.paid / remainPerc}**\n3. Bereken 100%: €${item.paid / remainPerc} × 100 = **€${item.orig}**.`,
      explanation: `Het juiste antwoord is **${correctStr}**. De betaalde prijs van €${item.paid} is ${remainPerc}%. De oorspronkelijke prijs (100%) is dus €${item.paid} ÷ ${remainPerc / 100} = €${item.orig}.`
    }, level);
  } else if (level === 2) {
    // Level 2 (1F+): Korting met 15%, 30%, 35% of 40% en nieuwe prijs berekenen
    const origPrice = randomChoice([60, 80, 120, 140, 160, 200]);
    const perc = randomChoice([15, 30, 35, 40]);
    const korting = (origPrice * perc) / 100;
    const newPrice = origPrice - korting;

    const correctStr = `€${newPrice}`;
    const wrong1 = `€${newPrice + 10}`;
    const wrong2 = `€${korting}`;
    const wrong3 = `€${origPrice - perc}`;

    const { options, correctIndex } = shuffleOptions([correctStr, wrong1, wrong2, wrong3], correctStr);
    return attachLevelMeta({
      domain: 'rekenen',
      subCategory: 'Procenten & Korting (Nieuwe prijs)',
      question: `Een skateboard kost normaal **€${origPrice}**.\nJe krijgt **${perc}% korting**.\n\nWat is de nieuwe prijs die je moet betalen?`,
      options,
      correctIndex,
      hint1: `💡 **Denktip:** Vind eerst 10% van €${origPrice} (€${origPrice / 10}) en 5% (€${origPrice / 20}). Bereken zo ${perc}% korting en trek die af van €${origPrice}.`,
      hint2: `📝 **Stap-voor-stap:**\n1. Korting: ${perc}% van €${origPrice} = €${korting}\n2. Nieuwe prijs: €${origPrice} - €${korting} = **€${newPrice}**.`,
      explanation: `Het juiste antwoord is **${correctStr}**.`
    }, level);
  } else {
    // Level 1 (1F Basis): Hoeveel euro korting bij 10%, 20%, 25% of 50%
    const origPrice = randomChoice([40, 60, 80, 100, 120]);
    const perc = randomChoice([10, 20, 25, 50]);
    const korting = (origPrice * perc) / 100;
    const newPrice = origPrice - korting;

    const correctStr = `€${newPrice}`;
    const wrong1 = `€${korting}`;
    const wrong2 = `€${newPrice + 8}`;
    const wrong3 = `€${origPrice - perc}`;

    const { options, correctIndex } = shuffleOptions([correctStr, wrong1, wrong2, wrong3], correctStr);
    return attachLevelMeta({
      domain: 'rekenen',
      subCategory: 'Procenten & Korting (Basis)',
      question: `Een trui kost **€${origPrice}**.\nJe krijgt **${perc}% korting**.\n\nHoeveel euro moet je nog betalen?`,
      options,
      correctIndex,
      hint1: `💡 **Denktip:** ${perc}% van €${origPrice} is €${korting} korting. Trek dat bedrag af van €${origPrice}.`,
      hint2: `📝 **Stap-voor-stap:**\n1. Korting = €${korting}\n2. Te betalen: €${origPrice} - €${korting} = **€${newPrice}**.`,
      explanation: `Het juiste antwoord is **${correctStr}**.`
    }, level);
  }
}

// 5. Procenten: Percentage van totaal & Restpercentage
function genPercentageVanTotaal(mode = 'practice', difficultyLevel = null) {
  const level = resolveLevel(mode, difficultyLevel);

  if (level === 3) {
    const total = randomChoice([200, 250, 400, 500]);
    const percBezeten = randomChoice([64, 72, 76, 80, 84]);
    const bezet = (total * percBezeten) / 100;
    const vrij = total - bezet;
    const percVrij = 100 - percBezeten;

    const correctStr = `${percVrij}%`;
    const wrong1 = `${percBezeten}%`;
    const wrong2 = `${percVrij + 10}%`;
    const wrong3 = `${Math.round((vrij / total) * 50)}%`;

    const { options, correctIndex } = shuffleOptions([correctStr, wrong1, wrong2, wrong3], correctStr);
    const qText = `In een bioscoopzaal zijn **${total} zitplaatsen**.\nTijdens een filmvoorstelling zijn er **${bezet} stoelen bezet**.\n\nHoeveel procent van de zitplaatsen is nog **VRIJ**?`;

    return attachLevelMeta({
      domain: 'rekenen',
      subCategory: 'Procenten (Restpercentage berekenen)',
      question: qText,
      options,
      correctIndex,
      hint1: `💡 **Goed lezen!** De vraag vraagt hoeveel procent **vrij** is, niet hoeveel bezet is! Bereken eerst het aantal vrije stoelen (${total} - ${bezet}).`,
      hint2: `📝 **Stap-voor-stap:**\n1. Aantal vrije stoelen: ${total} - ${bezet} = **${vrij}**\n2. Percentage vrij: (${vrij} ÷ ${total}) × 100% = **${percVrij}%**.`,
      explanation: `Het juiste antwoord is **${correctStr}**. Er zijn ${vrij} stoelen vrij. ${vrij} van ${total} = ${percVrij}%.`
    }, level);
  } else if (level === 2) {
    const total = randomChoice([50, 80, 120, 200, 250]);
    const perc = randomChoice([15, 25, 30, 35, 45]);
    // Zorg dat part een geheel getal is
    const cleanTotal = (total * perc) % 100 === 0 ? total : 200;
    const part = (cleanTotal * perc) / 100;

    const correctStr = `${perc}%`;
    const wrong1 = `${perc + 10}%`;
    const wrong2 = `${Math.max(5, perc - 10)}%`;
    const wrong3 = `${part}%`;

    const { options, correctIndex } = shuffleOptions([correctStr, wrong1, wrong2, wrong3], correctStr);
    return attachLevelMeta({
      domain: 'rekenen',
      subCategory: 'Percentage van totaal berekenen',
      question: `In een sportclub zitten **${cleanTotal} leden**.\nDaarvan zijn er **${part} jeugdleden**.\n\nHoeveel procent van de leden is jeugdlid?`,
      options,
      correctIndex,
      hint1: `💡 **Denktip:** Deel ${part} door ${cleanTotal} en doe maal 100%.`,
      hint2: `📝 **Stap-voor-stap:**\n(${part} ÷ ${cleanTotal}) × 100% = **${perc}%**.`,
      explanation: `Het juiste antwoord is **${correctStr}**.`
    }, level);
  } else {
    // Level 1: Basis percentage van 100 of 50
    const total = randomChoice([50, 100]);
    const perc = randomChoice([10, 20, 30, 40, 50, 70]);
    const part = (total * perc) / 100;
    const correctStr = `${perc}%`;
    const wrong1 = `${perc + 15}%`;
    const wrong2 = `${100 - perc}%`;
    const wrong3 = `${part + 5}%`;

    const { options, correctIndex } = shuffleOptions([correctStr, wrong1, wrong2, wrong3], correctStr);
    return attachLevelMeta({
      domain: 'rekenen',
      subCategory: 'Procenten (Basis)',
      question: `Van de **${total} vragen** op een quiz heeft Daan er **${part} goed**.\n\nHoeveel procent van de vragen heeft Daan goed?`,
      options,
      correctIndex,
      hint1: `💡 **Denktip:** Procent betekent 'per honderd'. Reken om naar 100 vragen!`,
      hint2: `📝 **Stap-voor-stap:**\n${part} van de ${total} = **${perc}%**.`,
      explanation: `Het juiste antwoord is **${correctStr}**.`
    }, level);
  }
}

// 6. Verhoudingstabel: Recept omrekenen
function genVerhoudingstabelRecept(mode = 'practice', difficultyLevel = null) {
  const level = resolveLevel(mode, difficultyLevel);

  const ingredienten = ['pasta', 'rijst', 'bloem', 'aardappelen', 'havermout'];
  const ingNaam = randomChoice(ingredienten);

  let baseP, newP, perP;
  if (level === 3) {
    baseP = randomChoice([4, 6]);
    newP = randomChoice([7, 9, 11, 14, 15]);
    perP = randomChoice([45, 65, 75, 85]);
  } else if (level === 2) {
    baseP = randomChoice([4, 5]);
    newP = randomChoice([6, 7, 8, 10]);
    perP = randomChoice([50, 60, 75, 80]);
  } else {
    baseP = randomChoice([2, 4]);
    newP = baseP === 2 ? randomChoice([4, 6, 8]) : randomChoice([8, 12]);
    perP = randomChoice([50, 100]);
  }

  const baseAmount = baseP * perP;
  const newAmount = newP * perP;

  const correctStr = `${newAmount} gram`;
  const wrong1 = `${newAmount + 100} gram`;
  const wrong2 = `${baseAmount * 2 === newAmount ? newAmount + 50 : baseAmount * 2} gram`;
  const wrong3 = `${newAmount - perP} gram`;

  const { options, correctIndex } = shuffleOptions([correctStr, wrong1, wrong2, wrong3], correctStr);
  const qText = `Voor een recept voor **${baseP} personen** heb je **${baseAmount} gram ${ingNaam}** nodig.\nEen kok wil ditzelfde gerecht bereiden voor **${newP} personen**.\n\nHoeveel gram ${ingNaam} heeft de kok nodig?`;

  return attachLevelMeta({
    domain: 'rekenen',
    subCategory: 'Verhoudingstabel (Recept omrekenen)',
    question: qText,
    options,
    correctIndex,
    visual: {
      type: 'verhoudingstabel_recept',
      ingNaam, eenheid: 'gram',
      basisPersonen: baseP,
      nieuwPersonen: newP,
      basisHoeveelheid: baseAmount,
      perPersoon: perP,
      antwoord: newAmount
    },
    hint1: `💡 **Denktip:** Reken via **1 persoon**! Deel ${baseAmount} door ${baseP} om te weten wat 1 persoon nodig heeft. Doe dat getal daarna keer ${newP}.`,
    hint2: `📝 **Stap-voor-stap:**\n1. Voor 1 persoon: ${baseAmount} ÷ ${baseP} = **${perP} gram**\n2. Voor ${newP} personen: ${newP} × ${perP} = **${newAmount} gram**.`,
    explanation: `Het juiste antwoord is **${correctStr}**.`
  }, level);
}

// 7. Schaalberekening
function genSchaalBerekening(mode = 'practice', difficultyLevel = null) {
  const level = resolveLevel(mode, difficultyLevel);

  if (level === 3) {
    const isOmgekeerd = Math.random() > 0.5;
    if (isOmgekeerd) {
      const schaal = randomChoice([25000, 50000]);
      const werkelijkeKm = schaal === 25000 ? randomChoice([4, 5, 6, 8]) : randomChoice([8, 10, 12, 15]);
      const cmOpKaart = (werkelijkeKm * 100000) / schaal;

      const correctStr = `${cmOpKaart} cm`;
      const wrong1 = `${cmOpKaart / 2} cm`;
      const wrong2 = `${cmOpKaart * 2} cm`;
      const wrong3 = `${werkelijkeKm} cm`;

      const { options, correctIndex } = shuffleOptions([correctStr, wrong1, wrong2, wrong3], correctStr);
      const qText = `Twee dorpen liggen in werkelijkheid **${werkelijkeKm} km** van elkaar vandaan.\nOp een stafkaart geldt een schaal van **1 : ${schaal.toLocaleString('nl-NL')}**.\n\nHoeveel centimeter is de afstand tussen deze twee dorpen op de kaart?`;

      return attachLevelMeta({
        domain: 'rekenen',
        subCategory: 'Schaal (Omgekeerd: werkelijkheid naar kaart)',
        question: qText,
        options,
        correctIndex,
        hint1: `💡 **Denktip:** Zet ${werkelijkeKm} km eerst om naar centimeters (1 km = 100.000 cm). Deel dat grote aantal daarna door de schaal (${schaal.toLocaleString('nl-NL')}).`,
        hint2: `📝 **Stap-voor-stap:**\n1. ${werkelijkeKm} km = ${(werkelijkeKm * 100000).toLocaleString('nl-NL')} cm\n2. Kaartafstand: ${(werkelijkeKm * 100000).toLocaleString('nl-NL')} ÷ ${schaal.toLocaleString('nl-NL')} = **${cmOpKaart} cm**.`,
        explanation: `Het juiste antwoord is **${correctStr}**.`
      }, level);
    } else {
      const schaal = 50000;
      const cmOpKaart = randomChoice([3.6, 4.4, 5.2, 6.8, 7.4]);
      const werkelijkeKm = ((cmOpKaart * schaal) / 100000).toFixed(2).replace('.', ',');

      const correctStr = `${werkelijkeKm} km`;
      const wrong1 = `${(parseFloat(werkelijkeKm.replace(',', '.')) * 10).toFixed(1).replace('.', ',')} km`;
      const wrong2 = `${(parseFloat(werkelijkeKm.replace(',', '.')) + 1.5).toFixed(2).replace('.', ',')} km`;
      const wrong3 = `${String(cmOpKaart).replace('.', ',')} km`;

      const { options, correctIndex } = shuffleOptions([correctStr, wrong1, wrong2, wrong3], correctStr);
      const qText = `Op een wandelkaart met schaal **1 : 50.000** is een route **${String(cmOpKaart).replace('.', ',')} cm** lang.\n\nHoeveel kilometer is deze wandeltocht in werkelijkheid?`;

      return attachLevelMeta({
        domain: 'rekenen',
        subCategory: 'Schaal & Afstand op de kaart',
        question: qText,
        options,
        correctIndex,
        hint1: `💡 **Denktip:** Schaal 1 : 50.000 betekent: 1 cm op de kaart is 50.000 cm (0,5 km) in werkelijkheid. Vermenigvuldig ${String(cmOpKaart).replace('.', ',')} met 0,5 km.`,
        hint2: `📝 **Stap-voor-stap:**\n1. 1 cm = 50.000 cm = 0,5 km\n2. Werkelijke afstand: ${String(cmOpKaart).replace('.', ',')} × 0,5 = **${werkelijkeKm} km**.`,
        explanation: `Het juiste antwoord is **${correctStr}**.`
      }, level);
    }
  } else if (level === 2) {
    // Level 2: Schaal 1 : 25.000 of 1 : 50.000 met hele centimeters
    const schaal = randomChoice([25000, 50000]);
    const cmOpKaart = randomChoice([4, 6, 8, 10, 12]);
    const werkelijkeKm = (cmOpKaart * schaal) / 100000;
    const correctStr = `${String(werkelijkeKm).replace('.', ',')} km`;
    const wrong1 = `${String(werkelijkeKm * 10).replace('.', ',')} km`;
    const wrong2 = `${String(werkelijkeKm + 2).replace('.', ',')} km`;
    const wrong3 = `${cmOpKaart} km`;

    const { options, correctIndex } = shuffleOptions([correctStr, wrong1, wrong2, wrong3], correctStr);
    return attachLevelMeta({
      domain: 'rekenen',
      subCategory: 'Schaal & Afstand (1F+)',
      question: `Op een fietskaart met schaal **1 : ${schaal.toLocaleString('nl-NL')}** meet een fietspad **${cmOpKaart} cm**.\n\nHoeveel kilometer is het fietspad in het echt?`,
      options,
      correctIndex,
      hint1: `💡 **Denktip:** ${cmOpKaart} × ${schaal.toLocaleString('nl-NL')} cm = ${(cmOpKaart * schaal).toLocaleString('nl-NL')} cm. Deel door 100.000 om naar kilometers te gaan.`,
      hint2: `📝 **Stap-voor-stap:**\n${(cmOpKaart * schaal).toLocaleString('nl-NL')} cm ÷ 100.000 = **${correctStr}**.`,
      explanation: `Het juiste antwoord is **${correctStr}**.`
    }, level);
  } else {
    // Level 1: Schaal 1 : 100.000 (1 cm = 1 km)
    const schaal = 100000;
    const cmOpKaart = randInt(3, 9);
    const werkelijkeKm = cmOpKaart;
    const correctStr = `${werkelijkeKm} km`;
    const wrong1 = `${werkelijkeKm * 10} km`;
    const wrong2 = `${werkelijkeKm + 2} km`;
    const wrong3 = `${cmOpKaart * 100} km`;

    const { options, correctIndex } = shuffleOptions([correctStr, wrong1, wrong2, wrong3], correctStr);
    return attachLevelMeta({
      domain: 'rekenen',
      subCategory: 'Schaal & Afstand (Basis)',
      question: `Op een kaart met schaal **1 : 100.000** is de afstand tussen twee steden **${cmOpKaart} cm**.\nHoeveel km is dat in het echt?`,
      options,
      correctIndex,
      hint1: `💡 **Denktip:** 1 : 100.000 betekent 1 cm op de kaart = 100.000 cm = **1 km** in werkelijkheid!`,
      hint2: `📝 **Uitrekening:** ${cmOpKaart} × 1 km = **${werkelijkeKm} km**.`,
      explanation: `Het juiste antwoord is **${correctStr}**.`
    }, level);
  }
}

// 8. Metriek Stelsel
function genMetriekStelsel(mode = 'practice', difficultyLevel = null) {
  const level = resolveLevel(mode, difficultyLevel);

  if (level === 3) {
    const m3 = randomChoice([0.36, 0.48, 0.6, 0.75, 0.8]);
    const totalLiters = m3 * 1000;
    const deelGevuld = randomChoice([3 / 4, 2 / 3, 1 / 2]);
    const deelTekst = deelGevuld === 3 / 4 ? 'driekwart (3/4)' : (deelGevuld === 2 / 3 ? 'tweederde (2/3)' : 'de helft (1/2)');
    const litersAanwezig = Math.round(totalLiters * deelGevuld);
    const litersNodig = totalLiters - litersAanwezig;

    const correctStr = `${litersNodig} liter`;
    const wrong1 = `${litersAanwezig} liter`;
    const wrong2 = `${litersNodig + 50} liter`;
    const wrong3 = `${Math.round(m3 * 100)} liter`;

    const { options, correctIndex } = shuffleOptions([correctStr, wrong1, wrong2, wrong3], correctStr);
    const qText = `Een grote regenton heeft een totale inhoud van **${String(m3).replace('.', ',')} m³**.\nDe regenton is momenteel voor **${deelTekst} gevuld** met regenwater.\n\nHoeveel **liter** water moet er nog bij om de ton helemaal tot de rand te vullen?`;

    return attachLevelMeta({
      domain: 'rekenen',
      subCategory: 'Metriek stelsel (m³ naar liters & restvolume)',
      question: qText,
      options,
      correctIndex,
      hint1: `💡 **Denktip:** Weet dat **1 m³ = 1000 liter** (of 1 dm³ = 1 liter). Reken eerst de totale ton om naar liters, en bereken daarna hoeveel liter er nog ontbreekt.`,
      hint2: `📝 **Stap-voor-stap:**\n1. Totale inhoud: ${m3} m³ = ${totalLiters} liter.\n2. Al aanwezig: ${deelTekst} van ${totalLiters} = ${litersAanwezig} liter.\n3. Nog nodig om te vullen: ${totalLiters} - ${litersAanwezig} = **${litersNodig} liter**.`,
      explanation: `Het juiste antwoord is **${correctStr}**. De ton is ${totalLiters} liter. Er ontbreekt nog ${totalLiters} - ${litersAanwezig} = ${litersNodig} liter.`
    }, level);
  } else if (level === 2) {
    // Level 2: Km naar meter of liter naar ml / cl met kommagetallen
    const variant = randomChoice(['km_m', 'kg_g', 'l_ml']);
    if (variant === 'km_m') {
      const km = randomChoice([1.45, 2.35, 3.08, 4.6, 5.25]);
      const m = Math.round(km * 1000);
      const correctStr = `${m} meter`;
      const wrong1 = `${Math.round(km * 100)} meter`;
      const wrong2 = `${m + 100} meter`;
      const wrong3 = `${Math.round(km * 10000)} meter`;
      const { options, correctIndex } = shuffleOptions([correctStr, wrong1, wrong2, wrong3], correctStr);
      return attachLevelMeta({
        domain: 'rekenen',
        subCategory: 'Metriek stelsel (Kilometer naar meter)',
        question: `Reken om naar meters:\n\n**${String(km).replace('.', ',')} km = ... meter**`,
        options,
        correctIndex,
        hint1: `💡 **Denktip:** 1 kilometer = **1000 meter** (3 stappen van 10 op het trappetje).`,
        hint2: `📝 **Uitrekening:** ${String(km).replace('.', ',')} × 1000 = **${correctStr}**.`,
        explanation: `Het juiste antwoord is **${correctStr}**.`
      }, level);
    } else if (variant === 'kg_g') {
      const kg = randomChoice([1.2, 2.5, 3.75, 4.05]);
      const g = Math.round(kg * 1000);
      const correctStr = `${g} gram`;
      const wrong1 = `${Math.round(kg * 100)} gram`;
      const wrong2 = `${g + 250} gram`;
      const wrong3 = `${Math.round(kg * 10)} gram`;
      const { options, correctIndex } = shuffleOptions([correctStr, wrong1, wrong2, wrong3], correctStr);
      return attachLevelMeta({
        domain: 'rekenen',
        subCategory: 'Metriek stelsel (Kilogram naar gram)',
        question: `Reken om naar grammen:\n\n**${String(kg).replace('.', ',')} kg = ... gram**`,
        options,
        correctIndex,
        hint1: `💡 **Denktip:** 1 kilogram = **1000 gram**.`,
        hint2: `📝 **Uitrekening:** ${String(kg).replace('.', ',')} × 1000 = **${correctStr}**.`,
        explanation: `Het juiste antwoord is **${correctStr}**.`
      }, level);
    } else {
      const l = randomChoice([1.5, 2.25, 0.75, 3.4]);
      const ml = Math.round(l * 1000);
      const correctStr = `${ml} ml`;
      const wrong1 = `${Math.round(l * 100)} ml`;
      const wrong2 = `${ml + 100} ml`;
      const wrong3 = `${Math.round(l * 10)} ml`;
      const { options, correctIndex } = shuffleOptions([correctStr, wrong1, wrong2, wrong3], correctStr);
      return attachLevelMeta({
        domain: 'rekenen',
        subCategory: 'Metriek stelsel (Liter naar milliliter)',
        question: `In een fles zit **${String(l).replace('.', ',')} liter** sap.\nHoeveel **milliliter (ml)** is dat?`,
        options,
        correctIndex,
        hint1: `💡 **Denktip:** 1 liter = **1000 milliliter (ml)**.`,
        hint2: `📝 **Uitrekening:** ${String(l).replace('.', ',')} × 1000 = **${correctStr}**.`,
        explanation: `Het juiste antwoord is **${correctStr}**.`
      }, level);
    }
  } else {
    // Level 1: Meter naar cm
    const getal = randomChoice([2.5, 3.5, 4.2, 5.8, 6.4, 7.5]);
    const cm = Math.round(getal * 100);
    const correctStr = `${cm} cm`;
    const wrong1 = `${Math.round(getal * 10)} cm`;
    const wrong2 = `${Math.round(getal * 1000)} cm`;
    const wrong3 = `${cm + 50} cm`;

    const { options, correctIndex } = shuffleOptions([correctStr, wrong1, wrong2, wrong3], correctStr);
    return attachLevelMeta({
      domain: 'rekenen',
      subCategory: 'Metriek stelsel omrekenen (Basis)',
      question: `Reken om naar centimeters:\n\n**${String(getal).replace('.', ',')} meter = ... cm**`,
      options,
      correctIndex,
      hint1: `💡 **Denktip:** 1 meter = 100 centimeter (twee treden omlaag op het metriek trappetje).`,
      hint2: `📝 **Uitrekening:** ${String(getal).replace('.', ',')} × 100 = **${correctStr}**.`,
      explanation: `Het juiste antwoord is **${correctStr}**.`
    }, level);
  }
}

// 9. Oppervlakte: Rechthoek & Samengestelde figuren (L-vorm)
function genOppervlakteRechthoek(mode = 'practice', difficultyLevel = null) {
  const level = resolveLevel(mode, difficultyLevel);

  if (level === 3) {
    const wTotal = randomChoice([10, 12, 14]);
    const hTotal = randomChoice([8, 9, 10]);
    const w1 = randInt(4, wTotal - 4);
    const w2 = wTotal - w1;
    const h2 = randInt(3, hTotal - 3);
    const h1 = hTotal - h2;

    const opp1 = w1 * hTotal;
    const opp2 = w2 * h2;
    const totalOpp = opp1 + opp2;

    const correctStr = `${totalOpp} m²`;
    const wrong1 = `${wTotal * hTotal} m²`;
    const wrong2 = `${totalOpp + 8} m²`;
    const wrong3 = `${(wTotal + hTotal) * 2} m²`;

    const { options, correctIndex } = shuffleOptions([correctStr, wrong1, wrong2, wrong3], correctStr);
    const qText = `De plattegrond van een L-vormige woonkamer heeft de volgende afmetingen:\n• Totale breedte onderkant = **${wTotal} meter**\n• Totale hoogte linkerkant = **${hTotal} meter**\n• Breedte van het linkergedeelte = **${w1} meter**\n• Hoogte van het rechtergedeelte = **${h2} meter**\n\nWat is de **totale oppervlakte** van deze L-vormige woonkamer?`;

    return attachLevelMeta({
      domain: 'rekenen',
      subCategory: 'Meetkunde (Samengestelde L-vorm)',
      question: qText,
      options,
      correctIndex,
      visual: {
        type: 'l_vorm',
        wTotal, hTotal, w1, h1, w2, h2, opp1, opp2, totalOpp
      },
      hint1: `💡 **Denktip:** Je kunt de oppervlakte van een L-vorm niet in één keer uitrekenen. **Splits de figuur** met een denkbeeldige lijn in twee aparte rechthoeken (Deel A en Deel B) en tel de uitkomsten bij elkaar op.`,
      hint2: `📝 **Stap-voor-stap:**\n1. Deel A (links): ${w1} m × ${hTotal} m = **${opp1} m²**\n2. Deel B (rechts): (${wTotal} - ${w1}) m × ${h2} m = ${w2} m × ${h2} m = **${opp2} m²**\n3. Totale oppervlakte: ${opp1} + ${opp2} = **${totalOpp} m²**.`,
      explanation: `Het juiste antwoord is **${correctStr}**. Door de L-vorm op te delen in twee rechthoeken vind je: ${opp1} + ${opp2} = ${totalOpp} m².`
    }, level);
  } else if (level === 2) {
    // Level 2: Rechthoek met een halve meter (bijv. 6,5 m × 4 m) of grotere maten
    const l = randomChoice([5.5, 6.5, 7.5, 8.5]);
    const b = randomChoice([4, 6, 8]);
    const opp = l * b;
    const correctStr = `${opp} m²`;
    const wrong1 = `${(l + b) * 2} m²`;
    const wrong2 = `${opp + 4} m²`;
    const wrong3 = `${Math.floor(l) * b} m²`;

    const { options, correctIndex } = shuffleOptions([correctStr, wrong1, wrong2, wrong3], correctStr);
    return attachLevelMeta({
      domain: 'rekenen',
      subCategory: 'Meetkunde (Oppervlakte met kommagetal)',
      question: `Een tuinkamer is **${String(l).replace('.', ',')} meter lang** en **${b} meter breed**.\nWat is de oppervlakte in m²?`,
      options,
      correctIndex,
      visual: {
        type: 'rechthoek',
        l, b,
        mode: 'oppervlakte',
        value: opp,
        labelL: `${String(l).replace('.', ',')} m`,
        labelB: `${b} m`
      },
      hint1: `💡 **Denktip:** Oppervlakte = Lengte × Breedte (${String(l).replace('.', ',')} × ${b}). Doe eerst ${Math.floor(l)} × ${b} en tel daar de helft van ${b} bij op!`,
      hint2: `📝 **Uitrekening:** ${String(l).replace('.', ',')} × ${b} = **${opp} m²**.`,
      explanation: `Het juiste antwoord is **${correctStr}**.`
    }, level);
  } else {
    // Level 1: Rechthoek met hele meters
    const l = randInt(5, 10);
    const b = randInt(3, 7);
    const opp = l * b;
    const correctStr = `${opp} m²`;
    const wrong1 = `${(l + b) * 2} m²`;
    const wrong2 = `${opp + 6} m²`;
    const wrong3 = `${Math.max(4, opp - 5)} m²`;

    const { options, correctIndex } = shuffleOptions([correctStr, wrong1, wrong2, wrong3], correctStr);
    return attachLevelMeta({
      domain: 'rekenen',
      subCategory: 'Meetkunde (Oppervlakte rechthoek)',
      question: `Een rechthoekige kamer is **${l} meter lang** en **${b} meter breed**.\nWat is de oppervlakte in m²?`,
      options,
      correctIndex,
      visual: {
        type: 'rechthoek',
        l, b,
        mode: 'oppervlakte',
        value: opp,
        labelL: `${l} m`,
        labelB: `${b} m`
      },
      hint1: `💡 **Denktip:** Oppervlakte = Lengte × Breedte.`,
      hint2: `📝 **Uitrekening:** ${l} × ${b} = **${opp} m²**.`,
      explanation: `Het juiste antwoord is **${correctStr}**.`
    }, level);
  }
}

// 10. Omtrek & Tegelpad rondom zwembad
function genOmtrekRechthoek(mode = 'practice', difficultyLevel = null) {
  const level = resolveLevel(mode, difficultyLevel);

  if (level === 3) {
    const poolL = randomChoice([6, 8, 10, 12]);
    const poolB = randomChoice([4, 5, 6]);
    const padW = 1;

    const outerL = poolL + (2 * padW);
    const outerB = poolB + (2 * padW);

    const poolOpp = poolL * poolB;
    const outerOpp = outerL * outerB;
    const padOpp = outerOpp - poolOpp;

    const correctStr = `${padOpp} m²`;
    const wrong1 = `${(poolL + poolB) * 2} m²`;
    const wrong2 = `${outerOpp} m²`;
    const wrong3 = `${padOpp + 8} m²`;

    const { options, correctIndex } = shuffleOptions([correctStr, wrong1, wrong2, wrong3], correctStr);
    const qText = `Een rechthoekig zwembad is **${poolL} meter lang** en **${poolB} meter breed**.\nRondom het zwembad wordt een tegelpad aangelegd van precies **${padW} meter breed**.\n\nWat is de oppervlakte van **ALLEEN het tegelpad** in m²?`;

    return attachLevelMeta({
      domain: 'rekenen',
      subCategory: 'Meetkunde (Tegelpad rondom zwembad)',
      question: qText,
      options,
      correctIndex,
      visual: {
        type: 'tegelpad_zwembad',
        poolL, poolB, padW, outerL, outerB, poolOpp, outerOpp, padOpp
      },
      hint1: `💡 **Denktip:** Bereken eerst de totale oppervlakte inclusief tegelrand (buitenmaten: ${poolL}+2 bij ${poolB}+2). Trek daar de oppervlakte van het zwembad zelf van af.`,
      hint2: `📝 **Stap-voor-stap:**\n1. Totale buitenmaten: ${outerL} m lang bij ${outerB} m breed\n2. Totale oppervlakte: ${outerL} × ${outerB} = **${outerOpp} m²**\n3. Oppervlakte zwembad: ${poolL} × ${poolB} = **${poolOpp} m²**\n4. Alleen tegelpad: ${outerOpp} - ${poolOpp} = **${padOpp} m²**.`,
      explanation: `Het juiste antwoord is **${correctStr}**. Totaal (${outerOpp} m²) min zwembad (${poolOpp} m²) = ${padOpp} m² tegelpad.`
    }, level);
  } else if (level === 2) {
    // Level 2: Hek rondom tuin MET een open poort van X meter
    const l = randInt(10, 18);
    const b = randInt(6, 12);
    const poort = randomChoice([2, 3]);
    const omtrek = (l + b) * 2;
    const hekNodig = omtrek - poort;

    const correctStr = `${hekNodig} meter`;
    const wrong1 = `${omtrek} meter`;
    const wrong2 = `${l * b} meter`;
    const wrong3 = `${hekNodig + 4} meter`;

    const { options, correctIndex } = shuffleOptions([correctStr, wrong1, wrong2, wrong3], correctStr);
    return attachLevelMeta({
      domain: 'rekenen',
      subCategory: 'Meetkunde (Omtrek met opening)',
      question: `Om een rechthoekige tuin van **${l} meter lang** en **${b} meter breed** komt een hek.\nAan de voorkant blijft een opening van **${poort} meter** vrij voor een tuinpoort.\n\nHoeveel meter hekwerk is er nodig?`,
      options,
      correctIndex,
      visual: {
        type: 'rechthoek',
        l, b,
        mode: 'omtrek',
        value: omtrek,
        labelL: `${l} m`,
        labelB: `${b} m`
      },
      hint1: `💡 **Denktip:** Bereken eerst de volledige omtrek van de tuin: (${l} + ${b}) × 2. Trek daar de ${poort} meter van de poort vanaf!`,
      hint2: `📝 **Stap-voor-stap:**\n1. Volledige omtrek: (${l} + ${b}) × 2 = ${omtrek} meter\n2. Hekwerk nodig: ${omtrek} - ${poort} = **${hekNodig} meter**.`,
      explanation: `Het juiste antwoord is **${correctStr}**.`
    }, level);
  } else {
    // Level 1: Gewone omtrek
    const l = randInt(7, 15);
    const b = randInt(4, 8);
    const omtrek = (l + b) * 2;

    const correctStr = `${omtrek} meter`;
    const wrong1 = `${l * b} meter`;
    const wrong2 = `${l + b} meter`;
    const wrong3 = `${omtrek + 6} meter`;

    const { options, correctIndex } = shuffleOptions([correctStr, wrong1, wrong2, wrong3], correctStr);
    return attachLevelMeta({
      domain: 'rekenen',
      subCategory: 'Meetkunde (Omtrek)',
      question: `Wat is de omtrek van een weiland van **${l} meter lang** en **${b} meter breed**?`,
      options,
      correctIndex,
      visual: {
        type: 'rechthoek',
        l, b,
        mode: 'omtrek',
        value: omtrek,
        labelL: `${l} m`,
        labelB: `${b} m`
      },
      hint1: `💡 **Denktip:** Tel alle vier de zijden bij elkaar op: (${l} + ${b}) × 2.`,
      hint2: `📝 **Uitrekening:** (${l} + ${b}) × 2 = **${omtrek} meter**.`,
      explanation: `Het juiste antwoord is **${correctStr}**.`
    }, level);
  }
}

// 11. Inhoud: Blok & Aquarium
function genInhoudBlok(mode = 'practice', difficultyLevel = null) {
  const level = resolveLevel(mode, difficultyLevel);

  if (level === 3) {
    const lCm = randomChoice([60, 80, 100]);
    const bCm = randomChoice([40, 50]);
    const hCm = randomChoice([40, 50, 60]);
    const randCm = randomChoice([5, 10]);
    const waterHCm = hCm - randCm;

    const lDm = lCm / 10;
    const bDm = bCm / 10;
    const waterHDm = waterHCm / 10;
    const waterLiters = Math.round(lDm * bDm * waterHDm);

    const correctStr = `${waterLiters} liter`;
    const fopVolleInhoud = Math.round(lDm * bDm * (hCm / 10));
    const wrong1 = `${fopVolleInhoud} liter`;
    const wrong2 = `${waterLiters + 20} liter`;
    const wrong3 = `${(lCm * bCm * hCm) / 100} liter`;

    const { options, correctIndex } = shuffleOptions([correctStr, wrong1, wrong2, wrong3], correctStr);
    const qText = `Een glazen aquarium heeft de volgende binnenmaten:\n• Lengte = **${lCm} cm**\n• Breedte = **${bCm} cm**\n• Hoogte = **${hCm} cm**\n\nHet aquarium wordt gevuld met water tot precies **${randCm} cm onder de bovenrand**.\nHoeveel **liter** water zit er in het aquarium? *(1 liter = 1 dm³)*`;

    return attachLevelMeta({
      domain: 'rekenen',
      subCategory: 'Inhoud & Volume (Aquarium in liters)',
      question: qText,
      options,
      correctIndex,
      visual: {
        type: 'aquarium_water',
        lCm, bCm, hCm, randCm, waterHCm, lDm, bDm, waterHDm, waterLiters
      },
      hint1: `💡 **Denktip:**\n1. Bereken eerst de waterhoogte: ${hCm} cm - ${randCm} cm = **${waterHCm} cm**.\n2. Reken alle maten direct om naar **decimeters (dm)**, want 1 dm³ = 1 liter!`,
      hint2: `📝 **Stap-voor-stap:**\n1. Lengte = ${lDm} dm, Breedte = ${bDm} dm, Waterhoogte = ${waterHDm} dm\n2. Inhoud = ${lDm} × ${bDm} × ${waterHDm} = **${waterLiters} liter**.`,
      explanation: `Het juiste antwoord is **${correctStr}**. Waterhoogte is ${waterHCm} cm (${waterHDm} dm). Inhoud: ${lDm} × ${bDm} × ${waterHDm} = ${waterLiters} liter.`
    }, level);
  } else if (level === 2) {
    // Level 2: Inhoud in dm³ / liters (zonder rand-aftrek)
    const lDm = randInt(4, 8);
    const bDm = randInt(3, 5);
    const hDm = randInt(3, 5);
    const inhoud = lDm * bDm * hDm;
    const correctStr = `${inhoud} liter`;
    const wrong1 = `${lDm * bDm + hDm} liter`;
    const wrong2 = `${inhoud + 15} liter`;
    const wrong3 = `${(lDm + bDm + hDm) * 2} liter`;

    const { options, correctIndex } = shuffleOptions([correctStr, wrong1, wrong2, wrong3], correctStr);
    return attachLevelMeta({
      domain: 'rekenen',
      subCategory: 'Inhoud in liters (1 dm³ = 1 liter)',
      question: `Een opbergbak is **${lDm} dm lang**, **${bDm} dm breed** en **${hDm} dm hoog**.\nHoeveel **liter** past er in deze bak? *(1 dm³ = 1 liter)*`,
      options,
      correctIndex,
      visual: {
        type: 'box3d',
        l: lDm, b: bDm, h: hDm, value: inhoud,
        labelL: `${lDm} dm`, labelB: `${bDm} dm`, labelH: `${hDm} dm`
      },
      hint1: `💡 **Denktip:** Inhoud = Lengte × Breedte × Hoogte. Omdat de maten al in dm staan, is de uitkomst in dm³ direct het aantal liters!`,
      hint2: `📝 **Uitrekening:** ${lDm} × ${bDm} × ${hDm} = **${inhoud} liter**.`,
      explanation: `Het juiste antwoord is **${correctStr}**.`
    }, level);
  } else {
    // Level 1: Gewone kubieke meters
    const l = randInt(3, 6);
    const b = randInt(2, 4);
    const h = randInt(2, 3);
    const inhoud = l * b * h;
    const correctStr = `${inhoud} m³`;
    const wrong1 = `${l * b + h} m³`;
    const wrong2 = `${(l + b + h) * 2} m³`;
    const wrong3 = `${inhoud + 4} m³`;

    const { options, correctIndex } = shuffleOptions([correctStr, wrong1, wrong2, wrong3], correctStr);
    return attachLevelMeta({
      domain: 'rekenen',
      subCategory: 'Inhoud van een blok (Basis)',
      question: `Wat is de inhoud van een container van **${l} m lang**, **${b} m breed** en **${h} m hoog** in m³?`,
      options,
      correctIndex,
      visual: {
        type: 'box3d',
        l, b, h, value: inhoud,
        labelL: `${l} m`, labelB: `${b} m`, labelH: `${h} m`
      },
      hint1: `💡 **Denktip:** Inhoud = Lengte × Breedte × Hoogte.`,
      hint2: `📝 **Uitrekening:** ${l} × ${b} × ${h} = **${inhoud} m³**.`,
      explanation: `Het juiste antwoord is **${correctStr}**.`
    }, level);
  }
}

// 12. Tuintegels & Verpakkingen
function genTuintegels(mode = 'practice', difficultyLevel = null) {
  const level = resolveLevel(mode, difficultyLevel);

  if (level === 3) {
    const tuinL = randomChoice([6, 7, 8, 9]);
    const tuinB = randomChoice([4, 5]);
    const oppTuin = tuinL * tuinB;
    const totaalTegels = oppTuin * 4;
    const tegelsPerPak = randomChoice([10, 12, 15]);
    const pakkenNodig = Math.ceil(totaalTegels / tegelsPerPak);

    const correctStr = `${pakkenNodig} pakken`;
    const fopZonderAfronding = Math.floor(totaalTegels / tegelsPerPak);
    const wrong1 = `${fopZonderAfronding === pakkenNodig ? pakkenNodig - 1 : fopZonderAfronding} pakken`;
    const wrong2 = `${pakkenNodig + 2} pakken`;
    const wrong3 = `${oppTuin} pakken`;

    const { options, correctIndex } = shuffleOptions([correctStr, wrong1, wrong2, wrong3], correctStr);
    const qText = `Meneer De Vries legt een terras aan van **${tuinL} meter lang** en **${tuinB} meter breed**.\nHij gebruikt tegels van **50 × 50 cm** (er passen precies 4 tegels in 1 m²).\nDe tegels worden uitsluitend verkocht in **pakken van ${tegelsPerPak} stuks**.\n\nHoeveel pakken tegels moet meneer De Vries minimaal kopen om het hele terras te kunnen leggen?`;

    return attachLevelMeta({
      domain: 'rekenen',
      subCategory: 'Tegels & Verpakkingen (Afronden naar boven)',
      question: qText,
      options,
      correctIndex,
      hint1: `💡 **Denktip:** Bereken eerst de totale oppervlakte (${tuinL} × ${tuinB}) en het aantal tegels dat nodig is (oppervlakte × 4). Deel dat door ${tegelsPerPak} en rond **naar boven** af, want je kunt geen losse tegels kopen!`,
      hint2: `📝 **Stap-voor-stap:**\n1. Oppervlakte terras: ${tuinL} × ${tuinB} = **${oppTuin} m²**\n2. Totaal aantal tegels: ${oppTuin} × 4 = **${totaalTegels} tegels**\n3. Aantal pakken: ${totaalTegels} ÷ ${tegelsPerPak} = ${(totaalTegels / tegelsPerPak).toFixed(1)} ➔ **${pakkenNodig} volle pakken**.`,
      explanation: `Het juiste antwoord is **${correctStr}**. Er zijn ${totaalTegels} tegels nodig. ${totaalTegels} ÷ ${tegelsPerPak} = ${(totaalTegels / tegelsPerPak).toFixed(1)}, dus je moet ${pakkenNodig} pakken kopen.`
    }, level);
  } else if (level === 2) {
    // Level 2: Tegels van 50x50 cm (4 per m²) of 25x25 cm (16 per m²) op groter terras
    const tuinL = randInt(5, 8);
    const tuinB = randInt(3, 6);
    const perM2 = randomChoice([4, 9]);
    const opp = tuinL * tuinB;
    const tegels = opp * perM2;

    const correctStr = `${tegels} tegels`;
    const wrong1 = `${opp} tegels`;
    const wrong2 = `${opp * 2} tegels`;
    const wrong3 = `${tegels + 12} tegels`;

    const { options, correctIndex } = shuffleOptions([correctStr, wrong1, wrong2, wrong3], correctStr);
    return attachLevelMeta({
      domain: 'rekenen',
      subCategory: 'Meetkunde (Terrastegels berekenen)',
      question: `Een terras is **${tuinL} m lang** en **${tuinB} m breed**.\nEr passen **${perM2} tegels** in 1 m².\nHoeveel tegels zijn er in totaal nodig?`,
      options,
      correctIndex,
      visual: {
        type: 'tuintegels',
        l: tuinL, b: tuinB, opp, tilesPerM2: perM2, totalTiles: tegels
      },
      hint1: `💡 **Denktip:** Bereken eerst de oppervlakte (${tuinL} × ${tuinB} = ${opp} m²) en doe dat keer ${perM2}.`,
      hint2: `📝 **Uitrekening:** ${opp} m² × ${perM2} = **${tegels} tegels**.`,
      explanation: `Het juiste antwoord is **${correctStr}**.`
    }, level);
  } else {
    // Level 1: Klein terras met 4 tegels per m²
    const tuinL = randInt(3, 5);
    const tuinB = randInt(2, 4);
    const opp = tuinL * tuinB;
    const tegels = opp * 4;

    const correctStr = `${tegels} tegels`;
    const wrong1 = `${opp} tegels`;
    const wrong2 = `${opp * 2} tegels`;
    const wrong3 = `${tegels + 8} tegels`;

    const { options, correctIndex } = shuffleOptions([correctStr, wrong1, wrong2, wrong3], correctStr);
    return attachLevelMeta({
      domain: 'rekenen',
      subCategory: 'Meetkunde (Tuintegels Basis)',
      question: `Een terras is **${tuinL} m lang** en **${tuinB} m breed**.\nEr passen 4 terrastegels in 1 m².\nHoeveel tegels zijn er nodig?`,
      options,
      correctIndex,
      visual: {
        type: 'tuintegels',
        l: tuinL, b: tuinB, opp, tilesPerM2: 4, totalTiles: tegels
      },
      hint1: `💡 **Denktip:** Oppervlakte = ${tuinL} × ${tuinB} = ${opp} m². Doe dat keer 4.`,
      hint2: `📝 **Uitrekening:** ${opp} × 4 = **${tegels} tegels**.`,
      explanation: `Het juiste antwoord is **${correctStr}**.`
    }, level);
  }
}

// 13. Snelheid, Tijd & Afstand
function genSnelheidTijdAfstand(mode = 'practice', difficultyLevel = null) {
  const level = resolveLevel(mode, difficultyLevel);

  if (level === 3) {
    const rijtijdMinuten = randomChoice([90, 120, 150]);
    const pauzeMinuten = randomChoice([15, 30]);
    const totaleMinuten = rijtijdMinuten + pauzeMinuten;

    const rijtijdUren = rijtijdMinuten / 60;
    const snelheid = randomChoice([80, 90, 100, 110]);
    const afstand = Math.round(snelheid * rijtijdUren);

    const startH = randInt(9, 13);
    const eindTotaalMin = (startH * 60) + totaleMinuten;
    const eindH = Math.floor(eindTotaalMin / 60);
    const eindM = eindTotaalMin % 60;

    const startStr = `${startH}:00`;
    const eindStr = `${eindH}:${eindM < 10 ? '0' : ''}${eindM}`;

    const correctStr = `${snelheid} km/u`;
    const fopZonderPauze = Math.round(afstand / (totaleMinuten / 60));
    const wrong1 = `${fopZonderPauze} km/u`;
    const wrong2 = `${snelheid + 15} km/u`;
    const wrong3 = `${snelheid - 10} km/u`;

    const { options, correctIndex } = shuffleOptions([correctStr, wrong1, wrong2, wrong3], correctStr);
    const qText = `Familie Bakker vertrekt met de auto om **${startStr} uur** en komt om **${eindStr} uur** aan op de camping.\nDe totale rit was **${afstand} km** lang.\nOnderweg hebben zij een koffiepauze gehouden van precies **${pauzeMinuten} minuten**.\n\nWat was hun gemiddelde **RIJsnelheid** (zonder de pauze mee te tellen) in km/u?`;

    return attachLevelMeta({
      domain: 'rekenen',
      subCategory: 'Snelheid, Tijd & Afstand (Met tussenstop)',
      question: qText,
      options,
      correctIndex,
      hint1: `💡 **Denktip:** Bereken eerst de totale reistijd van ${startStr} tot ${eindStr} (${totaleMinuten} minuten). Trek de ${pauzeMinuten} minuten pauze eraf om de echte **rijtijd** te vinden.`,
      hint2: `📝 **Stap-voor-stap:**\n1. Totale reistijd: ${totaleMinuten} minuten\n2. Zuivere rijtijd: ${totaleMinuten} - ${pauzeMinuten} = **${rijtijdMinuten} minuten** (${rijtijdUren} uur)\n3. Gemiddelde snelheid: ${afstand} km ÷ ${rijtijdUren} uur = **${snelheid} km/u**.`,
      explanation: `Het juiste antwoord is **${correctStr}**. De rijtijd was ${rijtijdUren} uur. Snelheid = ${afstand} ÷ ${rijtijdUren} = ${snelheid} km/u.`
    }, level);
  } else if (level === 2) {
    // Level 2: Snelheid bij 15 min (kwartier) of 20 min of 45 min
    const minuten = randomChoice([15, 20, 45]);
    const snelheid = minuten === 45 ? randomChoice([16, 20, 24, 80]) : randomChoice([18, 24, 30, 60, 90]);
    const km = (snelheid * minuten) / 60;

    const correctStr = `${snelheid} km/u`;
    const wrong1 = `${km * 2} km/u`;
    const wrong2 = `${snelheid + 12} km/u`;
    const wrong3 = `${Math.max(8, snelheid - 10)} km/u`;

    const { options, correctIndex } = shuffleOptions([correctStr, wrong1, wrong2, wrong3], correctStr);
    return attachLevelMeta({
      domain: 'rekenen',
      subCategory: 'Snelheid, Tijd & Afstand (1F+)',
      question: `Een wielrenner legt in **${minuten} minuten** een afstand van **${km} km** af.\n\nWat is zijn gemiddelde snelheid in kilometer per uur (km/u)?`,
      options,
      correctIndex,
      hint1: `💡 **Denktip:** Gebruik een verhoudingstabel met minuten en kilometers. Reken van ${minuten} minuten naar **60 minuten** (1 uur)!`,
      hint2: `📝 **Stap-voor-stap:**\nIn ${minuten} min = ${km} km ➔ In 60 min = **${snelheid} km/u**.`,
      explanation: `Het juiste antwoord is **${correctStr}**.`
    }, level);
  } else {
    // Level 1: Snelheid met 30 minuten
    const km = randomChoice([15, 20, 30, 40, 50]);
    const snelheid = km * 2;

    const correctStr = `${snelheid} km/u`;
    const wrong1 = `${km} km/u`;
    const wrong2 = `${snelheid + 15} km/u`;
    const wrong3 = `${Math.max(10, snelheid - 10)} km/u`;

    const { options, correctIndex } = shuffleOptions([correctStr, wrong1, wrong2, wrong3], correctStr);
    return attachLevelMeta({
      domain: 'rekenen',
      subCategory: 'Snelheid berekenen (Basis)',
      question: `Een voertuig rijdt in **30 minuten** (een half uur) een afstand van **${km} km**.\nWat is de gemiddelde snelheid in kilometer per uur (km/u)?`,
      options,
      correctIndex,
      hint1: `💡 **Denktip:** In 60 minuten (een heel uur) rijdt het voertuig 2 keer zo ver als in 30 minuten.`,
      hint2: `📝 **Uitrekening:** ${km} × 2 = **${snelheid} km/u**.`,
      explanation: `Het juiste antwoord is **${correctStr}**.`
    }, level);
  }
}

// 14. Gemiddelden
function genGemiddelden(mode = 'practice', difficultyLevel = null) {
  const level = resolveLevel(mode, difficultyLevel);

  if (level === 3) {
    const targetGem = randomChoice([7.0, 7.5, 8.0]);
    const c1 = randomChoice([6.5, 7.0, 7.5]);
    const c2 = randomChoice([6.8, 7.2, 7.6]);
    const c3 = randomChoice([7.4, 7.8, 8.2]);
    const c4 = randomChoice([6.9, 7.1, 7.7]);

    const totalNeeded = targetGem * 5;
    const currentSum = parseFloat((c1 + c2 + c3 + c4).toFixed(1));
    const neededGrade = parseFloat((totalNeeded - currentSum).toFixed(1));

    const correctStr = `${String(neededGrade).replace('.', ',')}`;
    const wrong1 = `${String((neededGrade + 0.5).toFixed(1)).replace('.', ',')}`;
    const wrong2 = `${String((neededGrade - 0.5).toFixed(1)).replace('.', ',')}`;
    const wrong3 = `${String(targetGem).replace('.', ',')}`;

    const { options, correctIndex } = shuffleOptions([correctStr, wrong1, wrong2, wrong3], correctStr);
    const qText = `Lisa heeft voor haar eerste vier wiskundetoetsen de volgende cijfers gehaald:\n**${c1.toFixed(1)} &nbsp;|&nbsp; ${c2.toFixed(1)} &nbsp;|&nbsp; ${c3.toFixed(1)} &nbsp;|&nbsp; ${c4.toFixed(1)}**\n\nWelk cijfer moet Lisa voor haar **vijfde toets** halen om gemiddeld precies een **${targetGem.toFixed(1)}** te staan?`;

    return attachLevelMeta({
      domain: 'rekenen',
      subCategory: 'Gemiddelden (Terugrekenen naar gewenst cijfer)',
      question: qText,
      options,
      correctIndex,
      hint1: `💡 **Denktip:** Om over 5 toetsen gemiddeld een ${targetGem} te halen, moet de som van alle 5 cijfers gelijk zijn aan 5 × ${targetGem} = **${totalNeeded} punten**. Bereken wat de eerste 4 toetsen samen zijn en trek dat ervan af.`,
      hint2: `📝 **Stap-voor-stap:**\n1. Totaal aantal punten nodig: 5 × ${targetGem} = **${totalNeeded}**\n2. Huidige som (toets 1 t/m 4): ${c1} + ${c2} + ${c3} + ${c4} = **${currentSum}**\n3. Cijfer voor de 5e toets: ${totalNeeded} - ${currentSum} = **${correctStr}**.`,
      explanation: `Het juiste antwoord is **${correctStr}**. Totaal nodig = ${totalNeeded}. Huidige som = ${currentSum}. Het vijfde cijfer moet ${totalNeeded} - ${currentSum} = ${correctStr} zijn.`
    }, level);
  } else if (level === 2) {
    // Level 2: Gemiddelde van 5 getallen met kommagetal als uitkomst
    const sets = [
      [6, 7, 8, 7, 9],   // som 37 / 5 = 7,4
      [7, 8, 6, 9, 8],   // som 38 / 5 = 7,6
      [5, 7, 8, 6, 8],   // som 34 / 5 = 6,8
      [8, 9, 7, 8, 9],   // som 41 / 5 = 8,2
      [6, 6, 7, 8, 9]    // som 36 / 5 = 7,2
    ];
    const cijfers = randomChoice(sets);
    const som = cijfers.reduce((a, b) => a + b, 0);
    const gem = (som / cijfers.length).toFixed(1).replace('.', ',');
    const correctStr = `${gem}`;
    const wrong1 = `${((som / cijfers.length) + 0.4).toFixed(1).replace('.', ',')}`;
    const wrong2 = `${((som / cijfers.length) - 0.4).toFixed(1).replace('.', ',')}`;
    const wrong3 = `${Math.round(som / cijfers.length)}`;

    const { options, correctIndex } = shuffleOptions([correctStr, wrong1, wrong2, wrong3], correctStr);
    return attachLevelMeta({
      domain: 'rekenen',
      subCategory: 'Gemiddelden berekenen (5 getallen)',
      question: `Wat is het gemiddelde van deze vijf rapportcijfers?\n**${cijfers.join('  -  ')}**`,
      options,
      correctIndex,
      hint1: `💡 **Denktip:** Tel alle vijf de cijfers bij elkaar op en deel de uitkomst door **5**.`,
      hint2: `📝 **Uitrekening:** (${cijfers.join(' + ')}) ÷ 5 = ${som} ÷ 5 = **${gem}**.`,
      explanation: `Het juiste antwoord is **${correctStr}**.`
    }, level);
  } else {
    // Level 1: Gemiddelde van 4 getallen met heel of .5 getal
    const sets = [
      [6, 8, 7, 7], // 28/4 = 7
      [7, 9, 8, 8], // 32/4 = 8
      [5, 7, 6, 6], // 24/4 = 6
      [6, 7, 8, 9], // 30/4 = 7,5
      [7, 8, 9, 10] // 34/4 = 8,5
    ];
    const cijfers = randomChoice(sets);
    const som = cijfers.reduce((a, b) => a + b, 0);
    const gemVal = som / cijfers.length;
    const gem = Number.isInteger(gemVal) ? `${gemVal}` : gemVal.toFixed(1).replace('.', ',');
    const correctStr = `${gem}`;
    const wrong1 = `${(gemVal + 1).toString().replace('.', ',')}`;
    const wrong2 = `${(gemVal - 0.5).toFixed(1).replace('.0', '').replace('.', ',')}`;
    const wrong3 = `${som}`;

    const { options, correctIndex } = shuffleOptions([correctStr, wrong1, wrong2, wrong3], correctStr);
    return attachLevelMeta({
      domain: 'rekenen',
      subCategory: 'Gemiddelden berekenen (Basis)',
      question: `Wat is het gemiddelde van deze vier cijfers?\n**${cijfers.join('  -  ')}**`,
      options,
      correctIndex,
      hint1: `💡 **Denktip:** Tel de vier cijfers bij elkaar op en deel door 4.`,
      hint2: `📝 **Uitrekening:** (${cijfers.join(' + ')}) ÷ 4 = ${som} ÷ 4 = **${gem}**.`,
      explanation: `Het juiste antwoord is **${correctStr}**.`
    }, level);
  }
}

// 15. Kommagetallen & Geld
function genKommagetallenEnGeld(mode = 'practice', difficultyLevel = null) {
  const level = resolveLevel(mode, difficultyLevel);

  if (level === 3) {
    const totaalRekening = randomChoice([64.80, 72.40, 85.50, 96.20, 78.60]);
    const b1 = randomChoice([18.00, 20.00, 22.00]);
    const b2 = randomChoice([14.50, 16.80, 18.20]);
    const b3 = randomChoice([15.20, 17.50, 19.40]);
    const alBetaald = b1 + b2 + b3;
    const b4 = (totaalRekening - alBetaald).toFixed(2);

    const correctStr = `€${b4.replace('.', ',')}`;
    const wrong1 = `€${(parseFloat(b4) + 2.50).toFixed(2).replace('.', ',')}`;
    const wrong2 = `€${(parseFloat(b4) - 1.20).toFixed(2).replace('.', ',')}`;
    const wrong3 = `€${(totaalRekening / 4).toFixed(2).replace('.', ',')}`;

    const { options, correctIndex } = shuffleOptions([correctStr, wrong1, wrong2, wrong3], correctStr);
    const qText = `Vier vrienden gaan samen uit eten. De totale rekening bedraagt **€${totaalRekening.toFixed(2).replace('.', ',')}**.\n• Thijs legt **€${b1.toFixed(2).replace('.', ',')}** in\n• Lars legt **€${b2.toFixed(2).replace('.', ',')}** in\n• Bram legt **€${b3.toFixed(2).replace('.', ',')}** in\n\nHoeveel euro moet Stijn nog betalen om de rekening precies te voldoen?`;

    return attachLevelMeta({
      domain: 'rekenen',
      subCategory: 'Geld & Kommagetallen (Rekening verdelen)',
      question: qText,
      options,
      correctIndex,
      hint1: `💡 **Denktip:** Tel eerst de bedragen van Thijs, Lars en Bram bij elkaar op. Trek dat totaal daarna af van de totale rekening.`,
      hint2: `📝 **Stap-voor-stap:**\n1. Al betaald: €${b1.toFixed(2)} + €${b2.toFixed(2)} + €${b3.toFixed(2)} = **€${alBetaald.toFixed(2).replace('.', ',')}**\n2. Restant voor Stijn: €${totaalRekening.toFixed(2)} - €${alBetaald.toFixed(2)} = **€${b4.replace('.', ',')}**.`,
      explanation: `Het juiste antwoord is **${correctStr}**.`
    }, level);
  } else if (level === 2) {
    // Level 2: Meerdere artikelen kopen en wisselgeld van €50
    const budget = 50;
    const p1 = randomChoice([12.45, 14.50, 16.75, 18.25]);
    const p2 = randomChoice([13.25, 15.80, 17.50, 19.40]);
    const tot = p1 + p2;
    const wisselgeld = (budget - tot).toFixed(2).replace('.', ',');

    const correctStr = `€${wisselgeld}`;
    const wrong1 = `€${(budget - tot + 1).toFixed(2).replace('.', ',')}`;
    const wrong2 = `€${tot.toFixed(2).replace('.', ',')}`;
    const wrong3 = `€${(budget - tot - 1).toFixed(2).replace('.', ',')}`;

    const { options, correctIndex } = shuffleOptions([correctStr, wrong1, wrong2, wrong3], correctStr);
    return attachLevelMeta({
      domain: 'rekenen',
      subCategory: 'Geld & Wisselgeld (Kommagetallen)',
      question: `Je koopt twee artikelen van **€${p1.toFixed(2).replace('.', ',')}** en **€${p2.toFixed(2).replace('.', ',')}**.\nJe betaalt met een briefje van **€50**.\nHoeveel wisselgeld krijg je terug?`,
      options,
      correctIndex,
      hint1: `💡 **Denktip:** Tel de twee artikelen op en trek het bedrag af van €50.`,
      hint2: `📝 **Uitrekening:** €50 - €${tot.toFixed(2).replace('.', ',')} = **€${wisselgeld}**.`,
      explanation: `Het juiste antwoord is **${correctStr}**.`
    }, level);
  } else {
    // Level 1: Eenvoudig wisselgeld van €20
    const budget = 20;
    const prijs = randomChoice([6.50, 7.25, 8.50, 11.75, 12.50, 14.25]);
    const wissel = (budget - prijs).toFixed(2).replace('.', ',');
    const correctStr = `€${wissel}`;
    const wrong1 = `€${(budget - prijs + 1).toFixed(2).replace('.', ',')}`;
    const wrong2 = `€${(budget - prijs - 0.5).toFixed(2).replace('.', ',')}`;
    const wrong3 = `€${prijs.toFixed(2).replace('.', ',')}`;

    const { options, correctIndex } = shuffleOptions([correctStr, wrong1, wrong2, wrong3], correctStr);
    return attachLevelMeta({
      domain: 'rekenen',
      subCategory: 'Geld & Wisselgeld (Basis)',
      question: `Je koopt een boek van **€${prijs.toFixed(2).replace('.', ',')}** en betaalt met een briefje van **€${budget}**.\nHoeveel euro krijg je terug?`,
      options,
      correctIndex,
      hint1: `💡 **Denktip:** Tel vanaf €${prijs.toFixed(2).replace('.', ',')} eerst aan tot het volgende hele eurobedrag, en dan tot €${budget}.`,
      hint2: `📝 **Uitrekening:** €${budget} - €${prijs.toFixed(2).replace('.', ',')} = **€${wissel}**.`,
      explanation: `Het juiste antwoord is **${correctStr}**.`
    }, level);
  }
}

// 16. Grote Getallen Afronden
function genGroteGetallenAfronden(mode = 'practice', difficultyLevel = null) {
  const level = resolveLevel(mode, difficultyLevel);

  if (level === 3) {
    const startInw = randInt(16800000, 17200000);
    const groei = randInt(450000, 850000);
    const eindInw = startInw + groei;
    const exactVerschil = eindInw - startInw;
    const afgerond = Math.round(exactVerschil / 100000) * 100000;

    const correctStr = afgerond.toLocaleString('nl-NL');
    const wrong1 = (afgerond + 100000).toLocaleString('nl-NL');
    const wrong2 = (afgerond - 100000).toLocaleString('nl-NL');
    const wrong3 = (Math.round(eindInw / 100000) * 100000).toLocaleString('nl-NL');

    const { options, correctIndex } = shuffleOptions([correctStr, wrong1, wrong2, wrong3], correctStr);
    const qText = `In een land groeide het bevolkingsaantal van **${startInw.toLocaleString('nl-NL')}** naar **${eindInw.toLocaleString('nl-NL')}** inwoners.\n\nHoeveel inwoners zijn erbij gekomen, afgerond op hele **honderdduizendtallen**?`;

    return attachLevelMeta({
      domain: 'rekenen',
      subCategory: 'Grote getallen (Verschil & Afronden op 100.000)',
      question: qText,
      options,
      correctIndex,
      hint1: `💡 **Denktip:** Bereken eerst het exacte verschil (${eindInw.toLocaleString('nl-NL')} - ${startInw.toLocaleString('nl-NL')} = ${exactVerschil.toLocaleString('nl-NL')}). Kijk daarna naar het tienduizendtal om af te ronden op 100.000-tallen.`,
      hint2: `📝 **Stap-voor-stap:**\n1. Verschil: ${exactVerschil.toLocaleString('nl-NL')}\n2. Afgerond op 100.000-tallen: **${correctStr}**.`,
      explanation: `Het juiste antwoord is **${correctStr}**.`
    }, level);
  } else if (level === 2) {
    // Level 2: Afronden op tienduizendtallen
    const getal = randInt(125000, 885000);
    const afgerond = Math.round(getal / 10000) * 10000;
    const correctStr = afgerond.toLocaleString('nl-NL');
    const wrong1 = (afgerond + 10000).toLocaleString('nl-NL');
    const wrong2 = (afgerond - 10000).toLocaleString('nl-NL');
    const wrong3 = (Math.round(getal / 1000) * 1000).toLocaleString('nl-NL');

    const { options, correctIndex } = shuffleOptions([correctStr, wrong1, wrong2, wrong3], correctStr);
    return attachLevelMeta({
      domain: 'rekenen',
      subCategory: 'Grote getallen afronden (Tienduizendtallen)',
      question: `Rond het getal **${getal.toLocaleString('nl-NL')}** af op hele **tienduizendtallen**.`,
      options,
      correctIndex,
      hint1: `💡 **Denktip:** Kijk naar het duizendtal. Is dat cijfer een 5 of hoger? Rond dan naar boven af op 10.000-tallen!`,
      hint2: `📝 **Uitrekening:** ${getal.toLocaleString('nl-NL')} afgerond op tienduizendtallen = **${correctStr}**.`,
      explanation: `Het juiste antwoord is **${correctStr}**.`
    }, level);
  } else {
    // Level 1: Afronden op duizendtallen
    const getal = randInt(12000, 88000);
    const afgerond = Math.round(getal / 1000) * 1000;
    const correctStr = afgerond.toLocaleString('nl-NL');
    const wrong1 = (afgerond + 1000).toLocaleString('nl-NL');
    const wrong2 = (afgerond - 1000).toLocaleString('nl-NL');
    const wrong3 = `${getal.toLocaleString('nl-NL')}`;

    const { options, correctIndex } = shuffleOptions([correctStr, wrong1, wrong2, wrong3], correctStr);
    return attachLevelMeta({
      domain: 'rekenen',
      subCategory: 'Grote getallen afronden (Basis)',
      question: `Rond het getal **${getal.toLocaleString('nl-NL')}** af op hele **duizendtallen**.`,
      options,
      correctIndex,
      hint1: `💡 **Denktip:** Kijk naar het honderdtal. Is dat 5 of hoger? Rond naar boven af!`,
      hint2: `📝 **Uitrekening:** ${getal.toLocaleString('nl-NL')} afgerond op duizendtallen = **${correctStr}**.`,
      explanation: `Het juiste antwoord is **${correctStr}**.`
    }, level);
  }
}

// 17. Tijdverschil
function genTijdVerschil(mode = 'practice', difficultyLevel = null) {
  const level = resolveLevel(mode, difficultyLevel);

  if (level === 3) {
    const startH = randomChoice([21, 22, 23]);
    const startM = randomChoice([15, 30, 45]);
    const duurMinTotMiddernacht = (24 * 60) - (startH * 60 + startM);

    const eindH = randomChoice([6, 7]);
    const eindM = randomChoice([15, 30]);
    const duurMinNaMiddernacht = eindH * 60 + eindM;

    const totaleTijdMin = duurMinTotMiddernacht + duurMinNaMiddernacht;
    const pauzeMin = randomChoice([30, 45]);
    const gewerkteMin = totaleTijdMin - pauzeMin;

    const gewerkteUren = Math.floor(gewerkteMin / 60);
    const gewerkteRestMin = gewerkteMin % 60;
    const tijdTekst = gewerkteRestMin === 0 ? `${gewerkteUren} uur` : `${gewerkteUren} uur en ${gewerkteRestMin} minuten`;

    const startStr = `${startH}:${startM < 10 ? '0' : ''}${startM}`;
    const eindStr = `0${eindH}:${eindM < 10 ? '0' : ''}${eindM}`;

    const correctStr = tijdTekst;
    const fopZonderPauze = `${Math.floor(totaleTijdMin / 60)} uur en ${totaleTijdMin % 60} minuten`;
    const wrong1 = fopZonderPauze;
    const wrong2 = `${gewerkteUren + 1} uur`;
    const wrong3 = `${gewerkteUren} uur en ${(gewerkteRestMin + 15) % 60} minuten`;

    const { options, correctIndex } = shuffleOptions([correctStr, wrong1, wrong2, wrong3], correctStr);
    const qText = `Een beveiliger begint zijn nachtdienst om **${startStr} uur** 's avonds en stopt om **${eindStr} uur** de volgende ochtend.\nTijdens de nacht heeft hij **${pauzeMin} minuten pauze** gehad.\n\nHoeveel uur en minuten heeft de beveiliger daadwerkelijk **gewerkt**?`;

    return attachLevelMeta({
      domain: 'rekenen',
      subCategory: 'Tijd & Klokkijken (Over middernacht)',
      question: qText,
      options,
      correctIndex,
      hint1: `💡 **Denktip:** Splits de tijd bij middernacht (24:00 uur):\n1. Hoeveel tijd zit er tussen ${startStr} en 24:00?\n2. Hoeveel tijd tussen 00:00 en ${eindStr}?\n3. Tel bij elkaar op en trek de ${pauzeMin} minuten pauze eraf.`,
      hint2: `📝 **Stap-voor-stap:**\n1. Tot middernacht: ${duurMinTotMiddernacht} minuten\n2. Na middernacht: ${duurMinNaMiddernacht} minuten\n3. Totaal aanwezig: ${totaleTijdMin} minuten\n4. Werkelijke werktijd: ${totaleTijdMin} - ${pauzeMin} = ${gewerkteMin} minuten = **${tijdTekst}**.`,
      explanation: `Het juiste antwoord is **${correctStr}**.`
    }, level);
  } else if (level === 2) {
    // Level 2: Tijdverschil overdag met lastigere minuten (bijv. 09:40 tot 13:15)
    const startH = randInt(9, 12);
    const startM = randomChoice([35, 40, 45, 50]);
    const eindH = startH + randInt(2, 4);
    const eindM = randomChoice([10, 15, 20, 25]);
    const duurMin = (eindH * 60 + eindM) - (startH * 60 + startM);
    const uren = Math.floor(duurMin / 60);
    const min = duurMin % 60;

    const startStr = `${startH < 10 ? '0' : ''}${startH}:${startM}`;
    const eindStr = `${eindH}:${eindM}`;
    const correctStr = `${uren} uur en ${min} minuten`;
    const wrong1 = `${uren + 1} uur en ${min} minuten`;
    const wrong2 = `${uren} uur en ${(min + 20) % 60} minuten`;
    const wrong3 = `${uren + 1} uur en ${Math.abs(startM - eindM)} minuten`;

    const { options, correctIndex } = shuffleOptions([correctStr, wrong1, wrong2, wrong3], correctStr);
    return attachLevelMeta({
      domain: 'rekenen',
      subCategory: 'Tijdverschil berekenen (1F+)',
      question: `Een treinreis begint om **${startStr} uur** en eindigt om **${eindStr} uur**.\nHoelang duurde de treinreis?`,
      options,
      correctIndex,
      hint1: `💡 **Denktip:** Tel eerst vanaf ${startStr} naar het volgende hele uur (${startH + 1}:00 = ${60 - startM} min), tel dan de hele uren tot ${eindH}:00, en tel ten slotte de ${eindM} minuten erbij op.`,
      hint2: `📝 **Uitrekening:** ${60 - startM} min + ${eindH - (startH + 1)} uur + ${eindM} min = **${correctStr}**.`,
      explanation: `Het juiste antwoord is **${correctStr}**.`
    }, level);
  } else {
    // Level 1: Eenvoudig tijdverschil
    const startH = randInt(12, 15);
    const startM = randomChoice([0, 15, 30]);
    const urenErbij = randInt(1, 3);
    const minErbij = randomChoice([15, 30]);
    const eindTot = startH * 60 + startM + urenErbij * 60 + minErbij;
    const eindH = Math.floor(eindTot / 60);
    const eindM = eindTot % 60;

    const startStr = `${startH}:${startM === 0 ? '00' : startM}`;
    const eindStr = `${eindH}:${eindM === 0 ? '00' : eindM}`;
    const correctStr = `${urenErbij} uur en ${minErbij} minuten`;
    const wrong1 = `${urenErbij + 1} uur`;
    const wrong2 = `${urenErbij} uur en ${(minErbij + 15) % 60 || 45} minuten`;
    const wrong3 = `${urenErbij + 1} uur en ${minErbij} minuten`;

    const { options, correctIndex } = shuffleOptions([correctStr, wrong1, wrong2, wrong3], correctStr);
    return attachLevelMeta({
      domain: 'rekenen',
      subCategory: 'Tijdverschil berekenen (Basis)',
      question: `Een film begint om **${startStr} uur** en is afgelopen om **${eindStr} uur**.\nHoelang duurde de film?`,
      options,
      correctIndex,
      hint1: `💡 **Denktip:** Tel eerst de hele uren vanaf ${startStr} en daarna de losse minuten.`,
      hint2: `📝 **Uitrekening:** Van ${startStr} naar ${eindStr} is **${correctStr}**.`,
      explanation: `Het juiste antwoord is **${correctStr}**.`
    }, level);
  }
}

// 18. Deelsommen met Rest
function genDeelsommenMetRest(mode = 'practice', difficultyLevel = null) {
  const level = resolveLevel(mode, difficultyLevel);

  if (level === 3) {
    const perGroep = randomChoice([6, 8, 48]);
    const isBus = perGroep === 48;
    const eenheid = isBus ? 'touringcarbussen' : 'slaaptenten';
    const enkelvoud = isBus ? 'bus' : 'tent';

    const volle = isBus ? randInt(2, 5) : randInt(16, 26);
    const rest = randInt(3, isBus ? 35 : 5);
    const totaalPersonen = (volle * perGroep) + rest;
    const nodig = volle + 1;

    const correctStr = `${nodig} ${eenheid}`;
    const wrong1 = `${volle} ${eenheid}`;
    const wrong2 = `${nodig + 2} ${eenheid}`;
    const wrong3 = `${Math.round(totaalPersonen / 10)} ${eenheid}`;

    const { options, correctIndex } = shuffleOptions([correctStr, wrong1, wrong2, wrong3], correctStr);
    const qText = isBus
      ? `Een basisschool gaat met **${totaalPersonen} leerlingen en leerkrachten** op schoolreisje.\nIn elke touringcar passen maximaal **${perGroep} passagiers**.\n\nHoeveel touringcarbussen moeten er **minimaal** gehuurd worden zodat iedereen meekan?`
      : `Voor een zomerkamp gaan **${totaalPersonen} kinderen** overnachten.\nIn één grote slaaptent kunnen maximaal **${perGroep} kinderen** slapen.\n\nHoeveel tenten zijn er **minimaal** nodig zodat alle kinderen een slaapplek hebben?`;

    return attachLevelMeta({
      domain: 'rekenen',
      subCategory: 'Delen met rest (Praktische afronding naar boven)',
      question: qText,
      options,
      correctIndex,
      hint1: `💡 **Denktip:** Als je deelt, blijft er een rest over (${rest} personen). Die ${rest} personen kunnen niet thuisblijven of buiten slapen! Je hebt dus **1 extra ${enkelvoud}** nodig.`,
      hint2: `📝 **Stap-voor-stap:**\n1. ${totaalPersonen} ÷ ${perGroep} = ${volle} rest ${rest}\n2. Omdat ${rest} personen ook een plek nodig hebben, zijn er ${volle} + 1 = **${nodig} ${eenheid}** nodig.`,
      explanation: `Het juiste antwoord is **${correctStr}**. ${totaalPersonen} ÷ ${perGroep} = ${volle} rest ${rest}. Voor de resterende ${rest} personen is een extra ${enkelvoud} nodig, dus ${nodig} in totaal.`
    }, level);
  } else if (level === 2) {
    // Level 2: Delen met rest bij grotere aantallen (dozen vullen)
    const deler = randomChoice([6, 8, 12]);
    const dozen = randInt(11, 18);
    const rest = randInt(2, deler - 1);
    const totaal = dozen * deler + rest;

    const correctStr = `${dozen} volle dozen (en ${rest} over)`;
    const wrong1 = `${dozen + 1} volle dozen (en 0 over)`;
    const wrong2 = `${dozen - 1} volle dozen (en ${deler - 1} over)`;
    const wrong3 = `${dozen} volle dozen (en ${rest === 2 ? 4 : 2} over)`;

    const { options, correctIndex } = shuffleOptions([correctStr, wrong1, wrong2, wrong3], correctStr);
    return attachLevelMeta({
      domain: 'rekenen',
      subCategory: 'Delen met rest (1F+)',
      question: `Een bakker heeft **${totaal} verse koeken** gebakken.\nEr gaan precies **${deler} koeken** in één doos.\n\nHoeveel volle dozen kan de bakker vullen en hoeveel koeken blijven er over?`,
      options,
      correctIndex,
      hint1: `💡 **Denktip:** Deel ${totaal} door ${deler} (gebruik eventueel een hapjessom: eerst ${10 * deler} eraf).`,
      hint2: `📝 **Uitrekening:** ${totaal} ÷ ${deler} = **${dozen} rest ${rest}**.`,
      explanation: `Het juiste antwoord is **${correctStr}**.`
    }, level);
  } else {
    // Level 1: Eenvoudige deelsom met rest
    const deler = randomChoice([4, 5, 6]);
    const dozen = randInt(5, 9);
    const rest = randInt(1, deler - 1);
    const totaal = dozen * deler + rest;

    const correctStr = `${dozen} doosjes (en ${rest} over)`;
    const wrong1 = `${dozen + 1} doosjes (en 0 over)`;
    const wrong2 = `${dozen - 1} doosjes (en ${rest} over)`;
    const wrong3 = `${dozen} doosjes (en 0 over)`;

    const { options, correctIndex } = shuffleOptions([correctStr, wrong1, wrong2, wrong3], correctStr);
    return attachLevelMeta({
      domain: 'rekenen',
      subCategory: 'Delen met rest (Basis)',
      question: `Er zijn **${totaal} muffins**.\nEr passen **${deler} muffins** in een doosje.\nHoeveel volle doosjes kun je maken en hoeveel blijven er over?`,
      options,
      correctIndex,
      hint1: `💡 **Denktip:** Denk aan de tafel van ${deler}: welk getal vlak onder ${totaal} zit in de tafel van ${deler}?`,
      hint2: `📝 **Uitrekening:** ${dozen} × ${deler} = ${dozen * deler}. Er blijven er ${totaal} - ${dozen * deler} = **${rest} over**.`,
      explanation: `Het juiste antwoord is **${correctStr}**.`
    }, level);
  }
}

// 19. Procentuele Stijging
function genProcentueleStijging(mode = 'practice', difficultyLevel = null) {
  const level = resolveLevel(mode, difficultyLevel);

  if (level === 3) {
    const isBTW = Math.random() > 0.4;
    if (isBTW) {
      const exBTW = randomChoice([200, 300, 400, 500, 600, 800]);
      const btw = (exBTW * 21) / 100;
      const incBTW = exBTW + btw;

      const correctStr = `€${incBTW}`;
      const wrong1 = `€${exBTW + 21}`;
      const wrong2 = `€${incBTW + 19}`;
      const wrong3 = `€${exBTW + (exBTW * 0.1)}`;

      const { options, correctIndex } = shuffleOptions([correctStr, wrong1, wrong2, wrong3], correctStr);
      const qText = `Een nieuwe computer kost in de groothandel **€${exBTW} exclusief 21% BTW**.\nEen consument moet in de winkel de prijs **inclusief 21% BTW** betalen.\n\nHoeveel euro kost deze computer inclusief BTW?`;

      return attachLevelMeta({
        domain: 'rekenen',
        subCategory: 'Procenten (21% BTW berekenen)',
        question: qText,
        options,
        correctIndex,
        hint1: `💡 **Denktip:** Bereken eerst 21% van €${exBTW}. (Handig: 10% = €${exBTW / 10}, 20% = €${(exBTW / 10) * 2}, 1% = €${exBTW / 100}). Tel de BTW daarna op bij het bedrag.`,
        hint2: `📝 **Stap-voor-stap:**\n1. 20% van €${exBTW} = €${(exBTW * 0.2)}\n2. 1% van €${exBTW} = €${(exBTW * 0.01)}\n3. 21% BTW = €${btw}\n4. Prijs inclusief BTW: €${exBTW} + €${btw} = **€${incBTW}**.`,
        explanation: `Het juiste antwoord is **${correctStr}**. De 21% BTW is €${btw}. De prijs inclusief BTW wordt €${exBTW} + €${btw} = €${incBTW}.`
      }, level);
    } else {
      const p1 = randomChoice([10, 20]);
      const p2 = p1 === 10 ? 10 : 10;
      const after1 = 100 + p1;
      const extra2 = (after1 * p2) / 100;
      const totalIncrease = p1 + extra2;

      const correctStr = `${totalIncrease}%`;
      const wrong1 = `${p1 + p2}%`;
      const wrong2 = `${totalIncrease - 2}%`;
      const wrong3 = `${totalIncrease + 1}%`;

      const { options, correctIndex } = shuffleOptions([correctStr, wrong1, wrong2, wrong3], correctStr);
      const qText = `De prijs van een aandeel stijgt in week 1 met **${p1}%**.\nIn week 2 stijgt de prijs van dat aandeel opnieuw met **${p2}%** over de nieuwe waarde.\n\nMet hoeveel procent is het aandeel in totaal gestegen ten opzichte van het begin?`;

      return attachLevelMeta({
        domain: 'rekenen',
        subCategory: 'Procenten (Opeenvolgende stijging)',
        question: qText,
        options,
        correctIndex,
        hint1: `💡 **Denktip:** Begin denkbeeldig met een startbedrag van **€ 100**!\n1. Na week 1 (+${p1}%): € 100 + € ${p1} = € ${after1}.\n2. In week 2 stijgt het met ${p2}% over € ${after1}!`,
        hint2: `📝 **Stap-voor-stap:**\n1. Startwaarde = 100\n2. Na eerste ${p1}% stijging: 100 + ${p1} = ${after1}\n3. Tweede stijging: ${p2}% van ${after1} = ${extra2}\n4. Nieuwe waarde: ${after1} + ${extra2} = ${100 + totalIncrease}\n5. Totale stijging ten opzichte van 100 is: **${totalIncrease}%**.`,
        explanation: `Het juiste antwoord is **${correctStr}**. Omdat de tweede ${p2}% stijging berekend wordt over ${after1}, komt er ${extra2} bij. De totale toename is ${totalIncrease}%.`
      }, level);
    }
  } else if (level === 2) {
    // Level 2: Stijging met 15% of 25%
    const prijs = randomChoice([80, 120, 160, 200]);
    const stijging = randomChoice([15, 20, 25]);
    const extra = (prijs * stijging) / 100;
    const nieuw = prijs + extra;

    const correctStr = `€${nieuw}`;
    const wrong1 = `€${prijs + stijging}`;
    const wrong2 = `€${nieuw + 10}`;
    const wrong3 = `€${prijs - extra}`;

    const { options, correctIndex } = shuffleOptions([correctStr, wrong1, wrong2, wrong3], correctStr);
    return attachLevelMeta({
      domain: 'rekenen',
      subCategory: 'Procentuele toename (1F+)',
      question: `Een abonnement op een pretpark kost **€${prijs}** per jaar.\nVolgend jaar stijgt de prijs met **${stijging}%**.\nWat wordt de nieuwe prijs?`,
      options,
      correctIndex,
      hint1: `💡 **Denktip:** Bereken ${stijging}% van €${prijs} en tel dat bedrag erbij op.`,
      hint2: `📝 **Uitrekening:** €${prijs} + €${extra} = **€${nieuw}**.`,
      explanation: `Het juiste antwoord is **${correctStr}**.`
    }, level);
  } else {
    // Level 1: Stijging met 10%
    const prijs = randomChoice([50, 60, 70, 80, 90, 100]);
    const stijging = 10;
    const extra = (prijs * stijging) / 100;
    const nieuw = prijs + extra;

    const correctStr = `€${nieuw}`;
    const wrong1 = `€${prijs + stijging}`;
    const wrong2 = `€${nieuw + 5}`;
    const wrong3 = `€${prijs - extra}`;

    const { options, correctIndex } = shuffleOptions([correctStr, wrong1, wrong2, wrong3], correctStr);
    return attachLevelMeta({
      domain: 'rekenen',
      subCategory: 'Procentuele toename (Basis)',
      question: `De contributie van een sportclub is **€${prijs}** per jaar.\nVolgend jaar stijgt de prijs met **${stijging}%**.\nWat wordt de nieuwe prijs?`,
      options,
      correctIndex,
      hint1: `💡 **Denktip:** Bereken 10% van €${prijs} (delen door 10) en tel dat erbij op.`,
      hint2: `📝 **Uitrekening:** €${prijs} + €${extra} = **€${nieuw}**.`,
      explanation: `Het juiste antwoord is **${correctStr}**.`
    }, level);
  }
}

// Alle 19 unieke reken generators
const allRekenenGenerators = [
  genBreukenOptellenAftrekken,
  genBreukenVermenigvuldigen,
  genBreukVanHoeveelheid,
  genProcentenKorting,
  genPercentageVanTotaal,
  genVerhoudingstabelRecept,
  genSchaalBerekening,
  genMetriekStelsel,
  genOppervlakteRechthoek,
  genOmtrekRechthoek,
  genInhoudBlok,
  genTuintegels,
  genSnelheidTijdAfstand,
  genGemiddelden,
  genKommagetallenEnGeld,
  genGroteGetallenAfronden,
  genTijdVerschil,
  genDeelsommenMetRest,
  genProcentueleStijging
];

// Indeling in 8 overzichtelijke Rekenen Onderwerpen (voor Oefenen op Onderwerp)
const REKENEN_TOPICS = {
  all: {
    id: 'all',
    label: 'Alle Onderwerpen (Mix)',
    icon: '🌟',
    generators: allRekenenGenerators
  },
  breuken: {
    id: 'breuken',
    label: 'Breuken',
    icon: '🍕',
    generators: [genBreukenOptellenAftrekken, genBreukenVermenigvuldigen, genBreukVanHoeveelheid]
  },
  procenten: {
    id: 'procenten',
    label: 'Procenten & Korting',
    icon: '💯',
    generators: [genProcentenKorting, genPercentageVanTotaal, genProcentueleStijging]
  },
  verhoudingen: {
    id: 'verhoudingen',
    label: 'Verhoudingen & Schaal',
    icon: '⚖️',
    generators: [genVerhoudingstabelRecept, genSchaalBerekening]
  },
  metriek: {
    id: 'metriek',
    label: 'Metriek Stelsel & Maten',
    icon: '📏',
    generators: [genMetriekStelsel, genInhoudBlok]
  },
  meetkunde: {
    id: 'meetkunde',
    label: 'Oppervlakte, Omtrek & Inhoud',
    icon: '📐',
    generators: [genOppervlakteRechthoek, genOmtrekRechthoek, genInhoudBlok, genTuintegels]
  },
  tijdSnelheid: {
    id: 'tijdSnelheid',
    label: 'Tijd, Snelheid & Afstand',
    icon: '⏱️',
    generators: [genSnelheidTijdAfstand, genTijdVerschil]
  },
  gemiddeldeGetallen: {
    id: 'gemiddeldeGetallen',
    label: 'Gemiddelde & Grote Getallen',
    icon: '📊',
    generators: [genGemiddelden, genGroteGetallenAfronden]
  },
  geldVerhaaltjes: {
    id: 'geldVerhaaltjes',
    label: 'Geld, Kommagetallen & Rest',
    icon: '💶',
    generators: [genKommagetallenEnGeld, genDeelsommenMetRest]
  }
};

function getRekenenGeneratorsForTopic(subTopic = 'all') {
  if (subTopic && REKENEN_TOPICS[subTopic]) {
    return REKENEN_TOPICS[subTopic].generators;
  }
  return allRekenenGenerators;
}

module.exports = {
  allRekenenGenerators,
  REKENEN_TOPICS,
  getRekenenGeneratorsForTopic,
  generateRekenenQuestion: (mode = 'practice', difficultyLevel = null, subTopic = 'all') => {
    const pool = getRekenenGeneratorsForTopic(subTopic);
    return randomChoice(pool)(mode, difficultyLevel);
  }
};
