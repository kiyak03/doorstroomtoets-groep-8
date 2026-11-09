# 🎓 Doorstroomtoets Groep 8 Oefenapp

Een interactieve webapplicatie speciaal ontwikkeld voor leerlingen in groep 8 van de basisschool om te oefenen voor de **Doorstroomtoets** (Cito / Route 8 / IEP / Dia / AMN).

De app draait lokaal op je computer en is via het thuisnetwerk (Wi-Fi) direct toegankelijk in de browser van bijvoorbeeld een **iPad**, **tablet** of **telefoon**.

---

## 🌟 Belangrijkste Functies

1. **Alle Vakgebieden van Groep 8:**
   - 🧮 **Rekenen:** Breuken (optellen, aftrekken, delen), procenten & korting, verhoudingstabellen, schaalberekeningen, metriek stelsel (lengte, inhoud, oppervlakte, gewicht), meetkunde (omtrek, oppervlakte, volume/inhoud), snelheid/tijd/afstand en realistische verhaaltjessommen.
   - 📖 **Begrijpend Lezen:** Korte en langere verhalende en informatieve teksten over wetenschap, natuur, geschiedenis en technologie met vragen over hoofdgedachte, signaalwoorden, tekstdoelen, verwijswoorden en feiten vs. meningen.
   - ✍️ **Taalverzorging:** Werkwoordspelling (tegenwoordige tijd d/t/dt, 't kofschip-x in verleden tijd en voltooid deelwoord), niet-werkwoordspelling (tussen-n, tussen-s, trema's, apostrof) en ontleden (persoonsvorm, onderwerp, lijdend voorwerp).

2. **💡 Slimme Tweetraps Hint-knop:**
   - **Stap 1: Denktip / Strategie:** Helpt het kind op weg door een aanpak te suggereren zonder het antwoord te verklappen.
   - **Stap 2: Stap-voor-stap Uitrekening:** Toont de berekening of de regel stap voor stap als het kind er toch niet uitkomt.

3. **✏️ Digitaal Kladblok (voor iPad Touch & Apple Pencil):**
   - Kinderen hoeven niet te zoeken naar papier en potlood: met één tik op het scherm opent een digitaal kladblok waarop direct met de vinger of stylus sommen kunnen worden uitgerekend of gekrabbeld.

4. **🔊 Voorleesfunctie (Web Speech API):**
   - Leesvaardigheid of concentratie ondersteunen? Met de voorleesknop wordt de tekst of de som in duidelijk Nederlands voorgelezen.

5. **Twee Oefenmodi:**
   - 🟢 **Oefenmodus (Directe Feedback):** Direct zien of het antwoord klopt, met volledige uitwerking en onbeperkt hints.
   - 🔵 **Toetsmodus (Simulatie):** Pas aan het einde van de toets de score, een indicatief schooladvies (VMBO-BB t/m VWO) en een uitgebreid nakijkoverzicht.

6. **📱 Automatische Wi-Fi Detectie & QR-Code:**
   - De app detecteert automatisch het IP-adres van je computer op het thuisnetwerk en toont een QR-code op het scherm. Richt de camera van de iPad erop en je opent meteen de app!

7. **✨ Optionele AI-Generator (Google Gemini):**
   - Wil je kind oefenen met sommen over een favoriet thema (bv. *Minecraft*, *Formule 1*, *Ruimtevaart* of *Dieren*)? Voer een Gemini API-sleutel in en genereer een unieke toets op maat! De standaard toetsen werken altijd 100% offline zonder API-sleutel.

---

## 🚀 Snelle Start

### 1. Starten op de computer
Dubbelklik op:
```bat
start.bat
```
Of open een PowerShell venster in deze map en voer uit:
```powershell
npm start
```

### 2. Openen op de iPad
1. Zorg dat de iPad verbonden is met **dezelfde Wi-Fi** als de computer.
2. Open de **Camera-app** op de iPad en richt op de QR-code op je computerscherm, **OF**
3. Typ in Safari op de iPad het getoonde adres in:
   ```
   http://192.168.2.30:3838
   ```
4. **Tip voor iPad:** Tik in Safari op het 'Deel'-icoon en kies **"Zet op beginscherm"**. De app opent dan net als een echte iPad-app op volledig scherm!
