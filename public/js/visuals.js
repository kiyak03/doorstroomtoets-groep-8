// public/js/visuals.js - Visuele Diagrammen en Plaatjes voor Rekenopgaven & Hints
(function () {
  const VisualRenderer = {
    render(visualData, isSolution = false) {
      if (!visualData) return '';
      const { type } = visualData;

      switch (type) {
        case 'rechthoek':
          return this.renderRechthoek(visualData, isSolution);
        case 'box3d':
          return this.renderBox3D(visualData, isSolution);
        case 'tuintegels':
          return this.renderTuintegels(visualData, isSolution);
        case 'verhoudingstabel_recept':
          return this.renderVerhoudingstabelRecept(visualData, isSolution);
        case 'verhoudingstabel_procent':
          return this.renderVerhoudingstabelProcent(visualData, isSolution);
        case 'schaallijn':
          return this.renderSchaallijn(visualData, isSolution);
        case 'metriek_trap':
          return this.renderMetriekTrap(visualData, isSolution);
        case 'breukenstrook':
          return this.renderBreukenstrook(visualData, isSolution);
        case 'breuk_verdeling':
          return this.renderBreukVerdeling(visualData, isSolution);
        case 'snelheid_route':
          return this.renderSnelheidRoute(visualData, isSolution);
        case 'gemiddelde_grafiek':
          return this.renderGemiddeldeGrafiek(visualData, isSolution);
        case 'l_vorm':
          return this.renderLVorm(visualData, isSolution);
        case 'tegelpad_zwembad':
          return this.renderTegelpadZwembad(visualData, isSolution);
        case 'aquarium_water':
          return this.renderAquariumWater(visualData, isSolution);
        default:
          return '';
      }
    },

    // 1. Rechthoek (Oppervlakte of Omtrek)
    renderRechthoek(data, isSolution) {
      const { l, b, mode, value, labelL, labelB } = data;
      const isOmtrek = mode === 'omtrek';
      const isOppervlakte = mode === 'oppervlakte';

      return `
        <div class="visual-wrapper">
          <div class="visual-badge">${isOmtrek ? '📏 Omtrek berekenen' : '📐 Oppervlakte berekenen'}</div>
          <svg viewBox="0 0 380 210" class="visual-svg" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="gridPattern" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e0e7ff" stroke-width="1"/>
              </pattern>
            </defs>

            <!-- Dimensiepijl boven (Lengte) -->
            <line x1="50" y1="25" x2="330" y2="25" stroke="#4f46e5" stroke-width="2" />
            <text x="190" y="18" font-size="14" font-weight="700" fill="#4f46e5" text-anchor="middle">Lengte = ${labelL || l + ' m'}</text>

            <!-- Dimensiepijl links (Breedte) -->
            <line x1="30" y1="45" x2="30" y2="185" stroke="#4f46e5" stroke-width="2" />
            <text x="22" y="120" font-size="14" font-weight="700" fill="#4f46e5" text-anchor="middle" transform="rotate(-90 22, 120)">Breedte = ${labelB || b + ' m'}</text>

            <!-- Rechthoek zelf -->
            <rect x="50" y="45" width="280" height="140" rx="8" 
                  fill="${isOmtrek ? '#f8fafc' : '#eef2ff'}" 
                  stroke="${isOmtrek ? '#f59e0b' : '#6366f1'}" 
                  stroke-width="${isOmtrek ? 4 : 2}" 
                  stroke-dasharray="${isOmtrek ? '8,4' : 'none'}" />
            
            ${isOppervlakte ? `
              <rect x="50" y="45" width="280" height="140" fill="url(#gridPattern)" rx="8"/>
              <text x="190" y="115" font-size="15" font-weight="800" fill="#312e81" text-anchor="middle">
                ${isSolution ? `Oppervlakte = ${l} × ${b} = ${value} m²` : 'Oppervlakte = ? m²'}
              </text>
              <text x="190" y="138" font-size="13" font-weight="600" fill="#6366f1" text-anchor="middle">
                ${isSolution ? 'Lengte × Breedte' : 'Hoeveel m² is de oppervlakte?'}
              </text>
            ` : `
              <text x="190" y="110" font-size="14" font-weight="800" fill="#b45309" text-anchor="middle">
                ${isSolution ? `Omtrek = (${l} + ${b}) × 2 = ${value} m` : 'Omtrek rondom = ? meter'}
              </text>
              <text x="190" y="132" font-size="13" font-weight="600" fill="#d97706" text-anchor="middle">
                ${isSolution ? 'Tel alle 4 de zijden bij elkaar op' : 'Wat is de lengte van het hekwerk rondom?'}
              </text>
            `}
          </svg>
        </div>
      `;
    },

    // 2. 3D Blok / Zwembad / Ruimte
    renderBox3D(data, isSolution) {
      const { l, b, h, value, labelL, labelB, labelH } = data;
      return `
        <div class="visual-wrapper">
          <div class="visual-badge">🧊 Inhoud (Volume) van het blok</div>
          <svg viewBox="0 0 380 200" class="visual-svg" xmlns="http://www.w3.org/2000/svg">
            <!-- Front Face -->
            <polygon points="50,90 270,90 270,180 50,180" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/>
            <!-- Top Face -->
            <polygon points="50,90 120,40 340,40 270,90" fill="#bfdbfe" stroke="#1d4ed8" stroke-width="2"/>
            <!-- Right Face -->
            <polygon points="270,90 340,40 340,130 270,180" fill="#93c5fd" stroke="#1e40af" stroke-width="2"/>

            <!-- Labels -->
            <!-- Lengte -->
            <text x="160" y="196" font-size="13" font-weight="700" fill="#1e3a8a" text-anchor="middle">Lengte = ${labelL || l + ' m'}</text>
            <!-- Hoogte/Diepte -->
            <text x="360" y="88" font-size="13" font-weight="700" fill="#1e3a8a" text-anchor="middle" transform="rotate(90 360, 88)">Diepte = ${labelH || h + ' m'}</text>
            <!-- Breedte (schuin) -->
            <text x="75" y="58" font-size="12" font-weight="700" fill="#1e3a8a" text-anchor="middle" transform="rotate(-35 75, 58)">Breedte = ${labelB || b + ' m'}</text>

            <rect x="90" y="115" width="140" height="34" rx="6" fill="white" opacity="0.95"/>
            <text x="160" y="137" font-size="13" font-weight="800" fill="#1e40af" text-anchor="middle">
              ${isSolution ? `${l} × ${b} × ${h} = ${value} m³` : 'Inhoud = ? m³'}
            </text>
          </svg>
        </div>
      `;
    },

    // 3. Tuintegels (50x50 cm in 1m2)
    renderTuintegels(data, isSolution) {
      const { l, b, opp, totalTiles } = data;
      return `
        <div class="visual-wrapper">
          <div class="visual-badge">🧱 Terras van ${l} m bij ${b} m</div>
          <svg viewBox="0 0 380 180" class="visual-svg" xmlns="http://www.w3.org/2000/svg">
            <rect x="30" y="20" width="320" height="110" fill="#f1f5f9" stroke="#64748b" stroke-width="2" rx="4"/>
            <!-- Subdivisions simulating 1m2 blocks with 4 tiles each -->
            <line x1="110" y1="20" x2="110" y2="130" stroke="#cbd5e1" stroke-width="1.5" stroke-dasharray="4,2"/>
            <line x1="190" y1="20" x2="190" y2="130" stroke="#cbd5e1" stroke-width="1.5" stroke-dasharray="4,2"/>
            <line x1="270" y1="20" x2="270" y2="130" stroke="#cbd5e1" stroke-width="1.5" stroke-dasharray="4,2"/>
            <line x1="30" y1="75" x2="350" y2="75" stroke="#cbd5e1" stroke-width="1.5" stroke-dasharray="4,2"/>

            <!-- Ingelaste detail tegel unit in de hoek -->
            <rect x="40" y="30" width="40" height="40" fill="#fed7aa" stroke="#ea580c" stroke-width="1.5"/>
            <line x1="60" y1="30" x2="60" y2="70" stroke="#c2410c" stroke-width="1"/>
            <line x1="40" y1="50" x2="80" y2="50" stroke="#c2410c" stroke-width="1"/>
            <text x="60" y="93" font-size="11" font-weight="700" fill="#ea580c" text-anchor="middle">1 m² = 4 tegels</text>

            <text x="190" y="155" font-size="13" font-weight="700" fill="#1e293b" text-anchor="middle">
              ${isSolution 
                ? `Oppervlakte = ${opp} m²  ➔  ${opp} × 4 = ${totalTiles} tegels` 
                : `Afmetingen: ${l} m lang, ${b} m breed  ➔  Hoeveel tegels?`}
            </text>
          </svg>
        </div>
      `;
    },

    // 4. Verhoudingstabel Recept
    renderVerhoudingstabelRecept(data, isSolution) {
      const { ingNaam, eenheid, basisPersonen, nieuwPersonen, basisHoeveelheid, perPersoon, antwoord } = data;

      if (!isSolution) {
        // VRAAG WEERGAVE: Toont alleen Gegeven (Basis) en Gevraagd (Doel) met een vraagteken ?
        return `
          <div class="visual-wrapper">
            <div class="visual-badge">📊 Verhoudingstabel (Vul de gegevens in)</div>
            <div class="table-responsive">
              <table class="verhoudings-tabel">
                <thead>
                  <tr>
                    <th></th>
                    <th>Basis (Recept)</th>
                    <th class="col-result">Nieuw (Gevraagd)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="row-label">Aantal personen</td>
                    <td><strong>${basisPersonen}</strong></td>
                    <td class="col-result"><strong>${nieuwPersonen}</strong></td>
                  </tr>
                  <tr>
                    <td class="row-label">${ingNaam} (${eenheid})</td>
                    <td><strong>${basisHoeveelheid}</strong></td>
                    <td class="col-result" style="background: #fef9c3; color: #854d0e; font-size: 1.2rem; font-weight: 800;">?</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div style="text-align: center; font-size: 0.85rem; color: var(--text-muted); margin-top: 6px;">
              💡 <em>Tip: Reken eerst via 1 persoon om het ontbrekende getal te vinden.</em>
            </div>
          </div>
        `;
      }

      // HINT / OPLOSSING WEERGAVE: Toont de volledige tussenstappen en het antwoord
      return `
        <div class="visual-wrapper">
          <div class="visual-badge">📊 Verhoudingstabel: Volledige Berekening</div>
          <div class="table-responsive">
            <table class="verhoudings-tabel">
              <thead>
                <tr>
                  <th></th>
                  <th>Basis</th>
                  <th class="col-step">Stap 1: Naar 1</th>
                  <th class="col-result">Stap 2: Doel</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="row-label">Aantal personen</td>
                  <td><strong>${basisPersonen}</strong></td>
                  <td class="col-step">1</td>
                  <td class="col-result"><strong>${nieuwPersonen}</strong></td>
                </tr>
                <tr class="arrow-row">
                  <td></td>
                  <td colspan="2" class="arrow-cell">÷ ${basisPersonen} ➔</td>
                  <td class="arrow-cell">× ${nieuwPersonen} ➔</td>
                </tr>
                <tr>
                  <td class="row-label">${ingNaam} (${eenheid})</td>
                  <td><strong>${basisHoeveelheid}</strong></td>
                  <td class="col-step">${perPersoon}</td>
                  <td class="col-result highlight"><strong>${antwoord} ${eenheid}</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      `;
    },

    // 5. Verhoudingstabel Procenten & Korting
    renderVerhoudingstabelProcent(data, isSolution) {
      const { origPrice, perc, korting, newPrice, askNewPrice } = data;
      const factor = perc / 10;

      if (!isSolution) {
        // VRAAG WEERGAVE: Alleen het vraagstuk in tabelvorm met ?
        return `
          <div class="visual-wrapper">
            <div class="visual-badge">📊 Procenten & Korting</div>
            <div class="table-responsive">
              <table class="verhoudings-tabel">
                <thead>
                  <tr>
                    <th></th>
                    <th>Originele Prijs (100%)</th>
                    <th class="col-result">Korting (${perc}%)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="row-label">Percentage</td>
                    <td>100%</td>
                    <td class="col-result"><strong>${perc}%</strong></td>
                  </tr>
                  <tr>
                    <td class="row-label">Eurobedrag</td>
                    <td>€${origPrice}</td>
                    <td class="col-result" style="background: #fef9c3; color: #854d0e; font-size: 1.2rem; font-weight: 800;">?</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div style="text-align: center; font-size: 0.85rem; color: var(--text-muted); margin-top: 6px;">
              💡 <em>Reken eerst uit hoeveel 10% is door te delen door 10.</em>
            </div>
          </div>
        `;
      }

      // HINT / OPLOSSING WEERGAVE: Met tussenstap 10% en antwoord
      return `
        <div class="visual-wrapper">
          <div class="visual-badge">📊 Verhoudingstabel: Stap-voor-stap Uitrekening</div>
          <div class="table-responsive">
            <table class="verhoudings-tabel">
              <thead>
                <tr>
                  <th></th>
                  <th>100% (Alles)</th>
                  <th class="col-step">10% (Tussenstap)</th>
                  <th class="col-result">${perc}% (Korting)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="row-label">Percentage</td>
                  <td>100%</td>
                  <td class="col-step">10%</td>
                  <td class="col-result"><strong>${perc}%</strong></td>
                </tr>
                <tr class="arrow-row">
                  <td></td>
                  <td colspan="2" class="arrow-cell">÷ 10 ➔</td>
                  <td class="arrow-cell">× ${factor} ➔</td>
                </tr>
                <tr>
                  <td class="row-label">Eurobedrag</td>
                  <td>€${origPrice}</td>
                  <td class="col-step">€${(origPrice / 10).toFixed(2).replace('.', ',')}</td>
                  <td class="col-result highlight"><strong>€${korting.toFixed(2).replace('.', ',')}</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
          ${askNewPrice ? `
            <div style="margin-top: 8px; font-size: 0.95rem; font-weight: 700; color: #1e3a8a; text-align: center;">
              Nieuwe prijs = €${origPrice} - €${korting} = <span style="color: #16a34a; font-size: 1.1rem;">€${newPrice}</span>
            </div>
          ` : ''}
        </div>
      `;
    },

    // 6. Schaal op de kaart
    renderSchaallijn(data, isSolution) {
      const { schaal, cmOpKaart, werkelijkeKm, kmPerCm } = data;
      return `
        <div class="visual-wrapper">
          <div class="visual-badge">🗺️ Schaal 1 : ${schaal.toLocaleString('nl-NL')}</div>
          <svg viewBox="0 0 380 130" class="visual-svg" xmlns="http://www.w3.org/2000/svg">
            <!-- Kaartlijn -->
            <text x="20" y="35" font-size="13" font-weight="700" fill="#475569">Op de kaart:</text>
            <rect x="120" y="22" width="220" height="18" fill="#e2e8f0" rx="4"/>
            <rect x="120" y="22" width="60" height="18" fill="#3b82f6" rx="4"/>
            <text x="150" y="36" font-size="11" font-weight="700" fill="white" text-anchor="middle">1 cm</text>
            <text x="230" y="36" font-size="12" font-weight="700" fill="#1e293b" text-anchor="middle">gemeten: ${cmOpKaart} cm</text>

            <!-- Pijl naar werkelijkheid -->
            <path d="M 150 48 L 150 72" stroke="#6366f1" stroke-width="2" />
            <text x="175" y="64" font-size="11" font-weight="600" fill="#6366f1">1 cm = ${kmPerCm} km</text>

            <!-- Werkelijkheid -->
            <text x="20" y="105" font-size="13" font-weight="700" fill="#475569">In werkelijkheid:</text>
            <rect x="120" y="90" width="220" height="24" fill="${isSolution ? '#dcfce7' : '#f8fafc'}" stroke="${isSolution ? '#16a34a' : '#cbd5e1'}" rx="6"/>
            <text x="230" y="107" font-size="13" font-weight="800" fill="${isSolution ? '#15803d' : '#64748b'}" text-anchor="middle">
              ${isSolution ? `${cmOpKaart} cm × ${kmPerCm} km = ${werkelijkeKm} km` : 'Afstand = ? km'}
            </text>
          </svg>
        </div>
      `;
    },

    // 7. Metriek Trappetje
    renderMetriekTrap(data, isSolution) {
      const { van, naar, factor, getal, antwoord } = data;
      const eenheden = ['km', 'hm', 'dam', 'm', 'dm', 'cm', 'mm'];
      let trap = eenheden;
      if (['kg', 'gram', 'ton'].includes(van) || ['kg', 'gram', 'ton'].includes(naar)) {
        trap = ['ton', '100 kg', '10 kg', 'kg', 'ons', 'lood', 'gram'];
      } else if (['liter', 'dl', 'cl', 'ml'].includes(van) || ['liter', 'dl', 'cl', 'ml'].includes(naar)) {
        trap = ['kl (m³)', 'hl', 'dal', 'liter (dm³)', 'dl', 'cl', 'ml'];
      }

      return `
        <div class="visual-wrapper">
          <div class="visual-badge">🪜 Het Metriek Trappetje (${van} ➔ ${naar})</div>
          <div class="metric-stairs-container">
            ${trap.map(e => `
              <div class="metric-step ${e === van ? 'step-start' : ''} ${e === naar ? 'step-end' : ''}">
                <div class="step-name">${e}</div>
                ${e === van ? '<span class="step-tag">Start</span>' : ''}
                ${e === naar ? '<span class="step-tag end">Doel</span>' : ''}
              </div>
            `).join('<div class="step-arrow">➔<br><span style="font-size:0.7rem; color:#6366f1;">×10</span></div>')}
          </div>
          <div style="text-align: center; margin-top: 10px; font-weight: 700; color: #1e293b; font-size: 0.95rem;">
            ${isSolution 
              ? `${getal} ${van} × ${factor.toLocaleString('nl-NL')} = <span style="color:#16a34a;">${antwoord}</span>` 
              : `${getal} ${van} = ... ? ... ${naar}`}
          </div>
        </div>
      `;
    },

    // 8. Breukenstrook
    renderBreukenstrook(data, isSolution) {
      const { n1, d1, n2, d2, sign, commonD, newN1, newN2, correctStr } = data;

      if (!isSolution) {
        // VRAAG WEERGAVE: Toont alleen de twee oorspronkelijke breuken in stroken, met vraagteken voor het resultaat!
        return `
          <div class="visual-wrapper">
            <div class="visual-badge">🍫 Breukenstroken (Visuele weergave)</div>
            <div class="fraction-strip-block">
              <div class="fraction-strip-label">
                Breuk 1: <strong>${n1}/${d1}</strong> (${n1} van de ${d1} delen gekleurd)
              </div>
              <div class="fraction-bar-flex" style="margin-bottom: 12px;">
                ${Array.from({ length: d1 }).map((_, i) => `
                  <div class="fraction-cell ${i < n1 ? 'cell-filled-1' : ''}">${i + 1}</div>
                `).join('')}
              </div>

              <div class="fraction-strip-label">
                Breuk 2: <strong>${n2}/${d2}</strong> (${n2} van de ${d2} delen gekleurd)
              </div>
              <div class="fraction-bar-flex">
                ${Array.from({ length: d2 }).map((_, i) => `
                  <div class="fraction-cell ${i < n2 ? 'cell-filled-2' : ''}">${i + 1}</div>
                `).join('')}
              </div>

              <div style="text-align: center; margin-top: 12px; font-weight: 700; color: #1e3a8a;">
                ${n1}/${d1} ${sign} ${n2}/${d2} = <span style="color: #d97706; font-size: 1.15rem;">?</span>
              </div>
            </div>
          </div>
        `;
      }

      // HINT / OPLOSSING WEERGAVE: Toont gelijknamig maken met commonD en resultaat
      return `
        <div class="visual-wrapper">
          <div class="visual-badge">🍫 Breuken Gelijknamig Maken (Noemer ${commonD})</div>
          <div class="fraction-strip-block">
            <div class="fraction-strip-label">
              <strong>${n1}/${d1}</strong> wordt <strong>${newN1}/${commonD}</strong>:
            </div>
            <div class="fraction-bar-flex">
              ${Array.from({ length: commonD }).map((_, i) => `
                <div class="fraction-cell ${i < newN1 ? 'cell-filled-1' : ''}">${i + 1}</div>
              `).join('')}
            </div>

            <div class="fraction-strip-label" style="margin-top: 8px;">
              <strong>${n2}/${d2}</strong> wordt <strong>${newN2}/${commonD}</strong>:
            </div>
            <div class="fraction-bar-flex">
              ${Array.from({ length: commonD }).map((_, i) => `
                <div class="fraction-cell ${i < newN2 ? 'cell-filled-2' : ''}">${i + 1}</div>
              `).join('')}
            </div>

            <div class="fraction-result-badge">
              Resultaat: ${newN1}/${commonD} ${sign} ${newN2}/${commonD} = <strong>${correctStr}</strong>
            </div>
          </div>
        </div>
      `;
    },

    // 9. Breuk van een hoeveelheid
    renderBreukVerdeling(data, isSolution) {
      const { total, n, d, factor, correctStr, unit } = data;

      if (!isSolution) {
        // VRAAG WEERGAVE: Toont de verdeling in d vakjes zonder het antwoord weg te geven
        return `
          <div class="visual-wrapper">
            <div class="visual-badge">➗ ${n}/${d} deel van ${total} ${unit || ''}</div>
            <div class="fraction-partition-bar">
              ${Array.from({ length: d }).map((_, i) => `
                <div class="partition-block ${i < n ? 'block-selected' : ''}">
                  <div class="block-num" style="color: ${i < n ? '#1d4ed8' : '#94a3b8'};">?</div>
                  <div class="block-label">1/${d} deel</div>
                </div>
              `).join('')}
            </div>
            <div style="text-align: center; margin-top: 8px; font-size: 0.95rem; font-weight: 700; color: #1e3a8a;">
              Totaal = ${total} ${unit || ''}  ➔  Hoeveel is ${n}/${d} deel? (<span style="color:#d97706;">?</span>)
            </div>
          </div>
        `;
      }

      // HINT / OPLOSSING WEERGAVE: Toont factor per blokje en het antwoord
      return `
        <div class="visual-wrapper">
          <div class="visual-badge">➗ ${n}/${d} deel van ${total} ${unit || ''}</div>
          <div class="fraction-partition-bar">
            ${Array.from({ length: d }).map((_, i) => `
              <div class="partition-block ${i < n ? 'block-selected' : ''}">
                <div class="block-num">${factor}</div>
                <div class="block-label">1/${d}</div>
              </div>
            `).join('')}
          </div>
          <div style="text-align: center; margin-top: 8px; font-size: 0.95rem; font-weight: 700; color: #1e3a8a;">
            Stap 1: ${total} ÷ ${d} = ${factor} &nbsp;|&nbsp; Stap 2: ${n} × ${factor} = <span style="color:#16a34a;">${correctStr}</span>
          </div>
        </div>
      `;
    },

    // 10. Snelheid Route Lijn
    renderSnelheidRoute(data, isSolution) {
      const { snelheid, tijdTekst, afstand, mode } = data;

      let carBadgeText;
      let labelText;

      if (!isSolution) {
        if (mode === 'snelheid') {
          carBadgeText = '? km/u';
          labelText = `Afstand: ${data.km || afstand} km in ${data.minuten} min &nbsp;➔&nbsp; Snelheid: <strong style="color:#d97706;">? km/u</strong>`;
        } else if (mode === 'afstand') {
          carBadgeText = `${snelheid} km/u`;
          labelText = `Snelheid: ${snelheid} km/u &nbsp;|&nbsp; Tijd: ${tijdTekst} &nbsp;➔&nbsp; Afstand: <strong style="color:#d97706;">? km</strong>`;
        } else {
          // mode === 'tijd'
          carBadgeText = `${snelheid} km/u`;
          labelText = `Snelheid: ${snelheid} km/u &nbsp;|&nbsp; Afstand: ${afstand} km &nbsp;➔&nbsp; Tijd: <strong style="color:#d97706;">? uur</strong>`;
        }
      } else {
        carBadgeText = `${snelheid} km/u`;
        if (mode === 'snelheid') {
          labelText = `Afstand: ${data.km || afstand} km in ${data.minuten} min &nbsp;➔&nbsp; Snelheid: <strong style="color:#16a34a;">${snelheid} km/u</strong>`;
        } else if (mode === 'tijd') {
          labelText = `Snelheid: ${snelheid} km/u &nbsp;|&nbsp; Afstand: ${afstand} km &nbsp;➔&nbsp; Tijd: <strong style="color:#16a34a;">${tijdTekst}</strong>`;
        } else {
          labelText = `Snelheid: ${snelheid} km/u &nbsp;|&nbsp; Tijd: ${tijdTekst} &nbsp;➔&nbsp; Afstand: <strong style="color:#16a34a;">${afstand} km</strong>`;
        }
      }

      return `
        <div class="visual-wrapper">
          <div class="visual-badge">🚗 Snelheid, Tijd & Afstand</div>
          <svg viewBox="0 0 380 120" class="visual-svg" xmlns="http://www.w3.org/2000/svg">
            <line x1="40" y1="60" x2="340" y2="60" stroke="#94a3b8" stroke-width="4" stroke-dasharray="8,4"/>
            <!-- Start point -->
            <circle cx="40" cy="60" r="8" fill="#4f46e5"/>
            <text x="40" y="85" font-size="12" font-weight="700" fill="#475569" text-anchor="middle">Vertrek</text>

            <!-- Auto -->
            <text x="180" y="45" font-size="28" text-anchor="middle">🚗</text>
            <rect x="135" y="4" width="90" height="20" rx="4" fill="${!isSolution && mode === 'snelheid' ? '#d97706' : '#4f46e5'}"/>
            <text x="180" y="18" font-size="11" font-weight="700" fill="white" text-anchor="middle">${carBadgeText}</text>

            <!-- End point -->
            <circle cx="340" cy="60" r="8" fill="#16a34a"/>
            <text x="340" y="85" font-size="12" font-weight="700" fill="#475569" text-anchor="middle">Aankomst</text>

            <!-- Bottom bracket -->
            <text x="190" y="108" font-size="13" font-weight="800" fill="#1e293b" text-anchor="middle">
              ${labelText}
            </text>
          </svg>
        </div>
      `;
    },

    // 11. Gemiddelde Grafiek
    renderGemiddeldeGrafiek(data, isSolution) {
      const { cijfers, gem, som, naam } = data;
      const maxCijfer = 10;

      return `
        <div class="visual-wrapper">
          <div class="visual-badge">📊 Cijfers van ${naam}</div>
          <svg viewBox="0 0 380 160" class="visual-svg" xmlns="http://www.w3.org/2000/svg">
            <!-- Y-axis line -->
            <line x1="40" y1="20" x2="40" y2="130" stroke="#cbd5e1" stroke-width="2"/>
            <line x1="40" y1="130" x2="340" y2="130" stroke="#cbd5e1" stroke-width="2"/>

            ${cijfers.map((c, i) => {
              const barHeight = (c / maxCijfer) * 90;
              const x = 70 + i * 65;
              const y = 130 - barHeight;
              return `
                <rect x="${x}" y="${y}" width="40" height="${barHeight}" rx="4" fill="#818cf8"/>
                <text x="${x + 20}" y="${y - 6}" font-size="13" font-weight="800" fill="#312e81" text-anchor="middle">${c}</text>
                <text x="${x + 20}" y="146" font-size="12" font-weight="600" fill="#64748b" text-anchor="middle">Toets ${i + 1}</text>
              `;
            }).join('')}

            <!-- Average Line: ALLEEN tonen als isSolution === true! -->
            ${isSolution ? (() => {
              const numGem = parseFloat(String(gem).replace(',', '.'));
              const avgY = 130 - (numGem / maxCijfer) * 90;
              return `
                <line x1="40" y1="${avgY}" x2="340" y2="${avgY}" stroke="#ef4444" stroke-width="2" stroke-dasharray="6,4"/>
                <rect x="235" y="${avgY - 18}" width="105" height="18" rx="4" fill="#fee2e2"/>
                <text x="287" y="${avgY - 5}" font-size="11" font-weight="800" fill="#dc2626" text-anchor="middle">Gemiddeld: ${gem}</text>
              `;
            })() : ''}
          </svg>
          <div style="text-align: center; font-size: 0.9rem; color: #475569; margin-top: 4px;">
            ${isSolution 
              ? `Som: ${cijfers.join(' + ')} = ${som} &nbsp;|&nbsp; ${som} ÷ ${cijfers.length} = <strong style="color:#16a34a;">${gem}</strong>` 
              : `Bereken het gemiddelde cijfer over de 4 toetsen (T1 t/m T4)`}
          </div>
        </div>
      `;
    },

    // 12. Samengestelde L-vorm (Oppervlakte Cito 1S)
    renderLVorm(data, isSolution) {
      const { wTotal, hTotal, w1, h1, w2, h2, opp1, opp2, totalOpp } = data;
      return `
        <div class="visual-wrapper">
          <div class="visual-badge">📐 Samengestelde L-vorm (Oppervlakte)</div>
          <svg viewBox="0 0 380 230" class="visual-svg" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="lGrid" width="15" height="15" patternUnits="userSpaceOnUse">
                <path d="M 15 0 L 0 0 0 15" fill="none" stroke="#e0e7ff" stroke-width="1"/>
              </pattern>
            </defs>

            <!-- Dimensie Boven: w1 -->
            <line x1="70" y1="25" x2="180" y2="25" stroke="#4f46e5" stroke-width="2"/>
            <text x="125" y="18" font-size="12" font-weight="700" fill="#4f46e5" text-anchor="middle">${w1} m</text>

            <!-- Dimensie Links totaal: hTotal -->
            <line x1="45" y1="35" x2="45" y2="195" stroke="#4f46e5" stroke-width="2"/>
            <text x="35" y="115" font-size="13" font-weight="700" fill="#4f46e5" text-anchor="middle" transform="rotate(-90 35, 115)">${hTotal} m</text>

            <!-- Dimensie Onder totaal: wTotal -->
            <line x1="70" y1="210" x2="330" y2="210" stroke="#4f46e5" stroke-width="2"/>
            <text x="200" y="224" font-size="13" font-weight="700" fill="#4f46e5" text-anchor="middle">${wTotal} m</text>

            <!-- Dimensie Rechts: h2 -->
            <line x1="350" y1="120" x2="350" y2="195" stroke="#4f46e5" stroke-width="2"/>
            <text x="362" y="158" font-size="12" font-weight="700" fill="#4f46e5" text-anchor="middle" transform="rotate(90 362, 158)">${h2} m</text>

            <!-- L-vorm polygoon -->
            <polygon points="70,35 180,35 180,120 330,120 330,195 70,195" 
                     fill="#eef2ff" stroke="#4338ca" stroke-width="3"/>
            <polygon points="70,35 180,35 180,120 330,120 330,195 70,195" 
                     fill="url(#lGrid)" />

            ${isSolution ? `
              <!-- Stippellijn opdeling -->
              <line x1="180" y1="35" x2="180" y2="195" stroke="#dc2626" stroke-width="2" stroke-dasharray="5,4"/>
              
              <rect x="85" y="90" width="80" height="35" rx="4" fill="white" opacity="0.95"/>
              <text x="125" y="106" font-size="12" font-weight="800" fill="#1e3a8a" text-anchor="middle">Deel A</text>
              <text x="125" y="120" font-size="11" font-weight="700" fill="#16a34a" text-anchor="middle">${opp1} m²</text>

              <rect x="220" y="145" width="80" height="35" rx="4" fill="white" opacity="0.95"/>
              <text x="260" y="161" font-size="12" font-weight="800" fill="#1e3a8a" text-anchor="middle">Deel B</text>
              <text x="260" y="175" font-size="11" font-weight="700" fill="#16a34a" text-anchor="middle">${opp2} m²</text>
            ` : `
              <rect x="140" y="95" width="140" height="34" rx="6" fill="white" opacity="0.92"/>
              <text x="210" y="117" font-size="13" font-weight="800" fill="#4338ca" text-anchor="middle">
                Oppervlakte = ? m²
              </text>
            `}
          </svg>
          <div style="text-align: center; font-size: 0.88rem; color: #475569; margin-top: 4px;">
            ${isSolution 
              ? `Opsplitsen in 2 rechthoeken: Deel A (${w1} × ${hTotal} = ${opp1} m²) + Deel B (${w2} × ${h2} = ${opp2} m²) = <strong style="color:#16a34a;">${totalOpp} m²</strong>`
              : `Tip: Splits de L-vorm in twee aparte rechthoeken om de oppervlakte te berekenen.`}
          </div>
        </div>
      `;
    },

    // 13. Tegelpad rondom Zwembad (Cito 1S)
    renderTegelpadZwembad(data, isSolution) {
      const { poolL, poolB, padW, outerL, outerB, poolOpp, outerOpp, padOpp } = data;
      return `
        <div class="visual-wrapper">
          <div class="visual-badge">🏊 Tegelpad rondom zwembad</div>
          <svg viewBox="0 0 380 220" class="visual-svg" xmlns="http://www.w3.org/2000/svg">
            <!-- Buitenste rechthoek (Tegelpad) -->
            <rect x="50" y="30" width="280" height="150" rx="6" 
                  fill="#fef3c7" stroke="#d97706" stroke-width="3" />

            <!-- Binnenste rechthoek (Zwembad) -->
            <rect x="95" y="55" width="190" height="100" rx="4" 
                  fill="#60a5fa" stroke="#1d4ed8" stroke-width="2" />

            <!-- Labels afmetingen -->
            <text x="190" y="20" font-size="13" font-weight="700" fill="#b45309" text-anchor="middle">Totale lengte met pad = ${outerL} m</text>
            <text x="25" y="105" font-size="12" font-weight="700" fill="#b45309" text-anchor="middle" transform="rotate(-90 25, 105)">Totaal = ${outerB} m</text>

            <!-- Zwembad label -->
            <text x="190" y="105" font-size="14" font-weight="800" fill="white" text-anchor="middle">Zwembad (${poolL} m × ${poolB} m)</text>
            <text x="190" y="125" font-size="12" font-weight="700" fill="#dbeafe" text-anchor="middle">${poolOpp} m²</text>

            <!-- Pad breedte aanduiding -->
            <text x="190" y="172" font-size="11" font-weight="700" fill="#92400e" text-anchor="middle">Tegelrand = ${padW} meter breed</text>
          </svg>
          <div style="text-align: center; font-size: 0.88rem; color: #475569; margin-top: 4px;">
            ${isSolution 
              ? `Totaal (${outerL} × ${outerB} = ${outerOpp} m²) minus Zwembad (${poolOpp} m²) = Tegelpad <strong style="color:#16a34a;">${padOpp} m²</strong>`
              : `Bereken de oppervlakte van ALLEEN het tegelpad rondom het zwembad`}
          </div>
        </div>
      `;
    },

    // 14. Aquarium met Waterhoogte (Cito 1S)
    renderAquariumWater(data, isSolution) {
      const { lCm, bCm, hCm, randCm, waterHCm, lDm, bDm, waterHDm, waterLiters } = data;
      return `
        <div class="visual-wrapper">
          <div class="visual-badge">🐟 Aquarium (Inhoud in Liters)</div>
          <svg viewBox="0 0 380 210" class="visual-svg" xmlns="http://www.w3.org/2000/svg">
            <!-- Aquarium Glas (Outer) -->
            <polygon points="60,85 260,85 260,185 60,185" fill="#f8fafc" stroke="#64748b" stroke-width="2"/>
            <polygon points="60,85 130,35 330,35 260,85" fill="#f1f5f9" stroke="#64748b" stroke-width="2"/>
            <polygon points="260,85 330,35 330,135 260,185" fill="#e2e8f0" stroke="#64748b" stroke-width="2"/>

            <!-- Water (Inner blue up to water height) -->
            <polygon points="60,110 260,110 260,185 60,185" fill="#60a5fa" opacity="0.65"/>
            <polygon points="60,110 130,60 330,60 260,110" fill="#93c5fd" opacity="0.65"/>
            <polygon points="260,110 330,60 330,135 260,185" fill="#3b82f6" opacity="0.65"/>

            <!-- Pijltje 5 cm onder de rand -->
            <line x1="45" y1="85" x2="45" y2="110" stroke="#dc2626" stroke-width="2"/>
            <text x="35" y="100" font-size="11" font-weight="700" fill="#dc2626" text-anchor="end">${randCm} cm</text>

            <!-- Afmetingen -->
            <text x="160" y="202" font-size="12" font-weight="700" fill="#334155" text-anchor="middle">Lengte = ${lCm} cm (${lDm} dm)</text>
            <text x="350" y="85" font-size="11" font-weight="700" fill="#334155" text-anchor="middle" transform="rotate(90 350, 85)">Hoogte = ${hCm} cm</text>
            <text x="80" y="55" font-size="11" font-weight="700" fill="#334155" text-anchor="middle" transform="rotate(-35 80, 55)">Breedte = ${bCm} cm (${bDm} dm)</text>

            <!-- Resultaat box -->
            <rect x="100" y="130" width="140" height="34" rx="6" fill="white" opacity="0.95"/>
            <text x="170" y="152" font-size="13" font-weight="800" fill="#1d4ed8" text-anchor="middle">
              ${isSolution ? `${waterLiters} liter water` : 'Inhoud water = ? liter'}
            </text>
          </svg>
          <div style="text-align: center; font-size: 0.88rem; color: #475569; margin-top: 4px;">
            ${isSolution 
              ? `Waterhoogte = ${hCm} - ${randCm} = ${waterHCm} cm (${waterHDm} dm). Inhoud: ${lDm} × ${bDm} × ${waterHDm} = <strong style="color:#16a34a;">${waterLiters} liter</strong>`
              : `Let op: Het water staat ${randCm} cm onder de rand. Reken om naar decimeters (1 dm³ = 1 liter)!`}
          </div>
        </div>
      `;
    }
  };

  if (typeof window !== 'undefined') {
    window.VisualRenderer = VisualRenderer;
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { VisualRenderer };
  }
})();
