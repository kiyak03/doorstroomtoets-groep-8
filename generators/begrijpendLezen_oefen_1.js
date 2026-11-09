// generators/begrijpendLezen_oefen.js
// 20 Uitgebreide Oefenteksten voor Begrijpend Lezen Groep 8 (Mix van 1F en 2F HAVO/VWO Streefniveau)
// Elke tekst bevat 4 genummerde alinea's, rijke signaalwoorden en 5 diepgaande Cito-vragen met hints.

const oefenTekstenDeel1 = [
  // ==========================================================================
  // OEFENTEKST 1: Diepzee & Chemosynthese (Natuur & Wetenschap)
  // ==========================================================================
  {
    id: "oefen-1",
    titel: "Het Mysterie van de Diepzee: Leven zonder Zonlicht",
    thema: "Natuur & Wetenschap",
    tekst: `[1] Diep onder het oppervlak van de oceaan, op meer dan drie kilometer diepte, heerst een wereld van permanente duisternis. Zonlicht dringt slechts tot ongeveer tweehonderd meter diep door in het zeewater; daaronder begint een ijskoude zone waar de druk driehonderd keer hoger is dan aan het wateroppervlak. Lange tijd gingen oceanografen ervan uit dat deze diepzeebodem een uitgestorven woestijn moest zijn. Zonder zonlicht is fotosynthese immers onmogelijk, en zonder planten leek een voedselketen uitgesloten.\n\n[2] Die eeuwenoude aanname werd in 1977 in één klap onderuitgehaald toen onderzoekers met de duikboot *Alvin* de zeebodem bij de Galapagoseilanden verkenden. Tot hun verbazing stuitten zij op hydrothermale bronnen, ook wel 'zwarte rokers' genoemd: vulkanische schoorstenen op de oceaanbodem die mineraalrijk water van wel 400 graden Celsius uitstoten. Ondanks de giftige stoffen en de verzengende hitte krioelde het rondom deze bronnen van het leven.\n\n[3] Hoe kunnen organismen zoals twee meter lange kokerwormen, blinde krabben en spookachtige vissen daar overleven? Het geheim schuilt in microscopisch kleine bacteriën. In plaats van zonlicht gebruiken deze micro-organismen chemische verbindingen – met name zwavelwaterstof uit de bronnen – om energie en voedingsstoffen te produceren. Dit proces wordt *chemosynthese* genoemd en vormt het fundament van een compleet onafhankelijk ecosysteem.\n\n[4] Deze ontdekking heeft niet alleen de biologie op haar kop gezet, maar prikkelt ook de verbeelding van ruimteonderzoekers. Onder de dikke ijskorst van Jupiters maan Europa en Saturnusmaan Enceladus bevinden zich namelijk vloeibare oceanen waar geen enkele zonnestraal doordringt. Als op de zeebodem van die verre manen eveneens hydrothermale bronnen actief zijn, sluiten astrobiologen niet uit dat zich daar vergelijkbare levensvormen hebben ontwikkeld.`,
    vragen: [
      {
        vraag: "Welk tekstverband bestaat er tussen alinea [1] en alinea [2]?",
        opties: [
          "In alinea 1 wordt een vroegere wetenschappelijke opvatting beschreven, die in alinea 2 door een ontdekking wordt weerlegd.",
          "In alinea 1 wordt een milieuprobleem in de diepzee genoemd, waarvoor in alinea 2 een oplossing wordt gepresenteerd.",
          "In alinea 1 staat een algemene conclusie, die in alinea 2 met drie historische voorbeelden wordt onderbouwd.",
          "In alinea 1 wordt de werking van onderzeeërs uitgelegd, waarna alinea 2 de nadelen daarvan bespreekt."
        ],
        correct: "In alinea 1 wordt een vroegere wetenschappelijke opvatting beschreven, die in alinea 2 door een ontdekking wordt weerlegd.",
        hint1: "💡 **Denktip:** Kijk naar de eerste zin van alinea 2: *'Die eeuwenoude aanname werd in 1977 in één klap onderuitgehaald'*. Wat doet alinea 2 dus met het idee uit alinea 1?",
        hint2: "📝 **Uitleg:** Alinea 1 legt uit dat men dacht dat de diepzee leeg was (aanname). Alinea 2 bewijst met de ontdekking van zwarte rokers het tegendeel (weerlegging).",
        explanation: "Alinea 1 schetst de oude veronderstelling dat leven zonder zonlicht onmogelijk was; alinea 2 weerlegt deze aanname met de ontdekking uit 1977."
      },
      {
        vraag: "Waarom gebruikt de schrijver het woord *'immers'* in de laatste zin van alinea [1]?",
        opties: [
          "Om een verklaring of reden te geven voor de gedachte dat de diepzeebodem uitgestorven moest zijn.",
          "Om een tegenstelling aan te geven tussen de temperatuur boven en onder in de oceaan.",
          "Om aan te kondigen dat er een opsomming van diepzeedieren volgt.",
          "Om te laten zien dat oceanografen twijfelden aan het bestaan van fotosynthese."
        ],
        correct: "Om een verklaring of reden te geven voor de gedachte dat de diepzeebodem uitgestorven moest zijn.",
        hint1: "💡 **Denktip:** Vervang het woord *'immers'* eens door *'want'* of *'namelijk'*. Welk verband geeft dat aan?",
        hint2: "📝 **Uitleg:** *'Immers'* is een signaalwoord voor een **redengevend verband**: het legt uit *waarom* wetenschappers dachten dat er geen leven kon zijn.",
        explanation: "Het signaalwoord 'immers' (net als 'namelijk' en 'want') leidt een reden of verklaring in voor de voorafgaande bewering."
      },
      {
        vraag: "Wat betekent het dat de bacteriën in alinea [3] *'het fundament van een compleet onafhankelijk ecosysteem'* vormen?",
        opties: [
          "Zij vormen de onmisbare eerste schakel in een voedselketen die niet van het zonlicht aan het oppervlak afhankelijk is.",
          "Zij bouwen van mineralen de harde stenen schoorstenen waarop de kokerwormen groeien.",
          "Zij kunnen alleen overleven als ze af en toe dode plantenresten uit de bovenste zeelaag opeten.",
          "Zij beschermen de blinde krabben tegen de hoge waterdruk op drie kilometer diepte."
        ],
        correct: "Zij vormen de onmisbare eerste schakel in een voedselketen die niet van het zonlicht aan het oppervlak afhankelijk is.",
        hint1: "💡 **Denktip:** Het 'fundament' van een huis is de basis waarop alles rust. Wat is de basis van een voedselketen?",
        hint2: "📝 **Uitleg:** Op het land vormen planten de basis (via zonlicht). In de diepzee vormen deze bacteriën (via chemosynthese) de basis van de voedselketen.",
        explanation: "'Fundament' is hier figuurlijk gebruikt voor de basis van de voedselketen, die geheel losstaat van fotosynthese en zonlicht."
      },
      {
        vraag: "Welke functie heeft alinea [4] binnen het geheel van de tekst?",
        opties: [
          "De alinea laat zien welke bredere betekenis de ontdekking uit de diepzee heeft voor het zoeken naar buitenaards leven.",
          "De alinea waarschuwt voor het gevaar van ruimtevaartuigen die de oceanen op de maan Europa vervuilen.",
          "De alinea vat de verschillen tussen kokerwormen en krabben nog een keer kort samen.",
          "De alinea bewijst dat er op de manen Europa en Enceladus al levende bacteriën zijn gevonden."
        ],
        correct: "De alinea laat zien welke bredere betekenis de ontdekking uit de diepzee heeft voor het zoeken naar buitenaards leven.",
        hint1: "💡 **Denktip:** Let op hoe alinea 4 een brug slaat van onze eigen oceaan naar de ruimtevaart (Europa en Enceladus).",
        hint2: "📝 **Uitleg:** De auteur trekt het onderwerp breder (toekomstperspectief/toepassing): kennis over aardse extremofielen helpt astrobiologen in het heelal.",
        explanation: "Alinea 4 plaatst de aardse diepzee-ontdekking in een breder wetenschappelijk perspectief, namelijk de zoektocht naar leven op ijsmanen."
      },
      {
        vraag: "Welke bewering klopt op basis van de tekst?",
        opties: [
          "Zowel op de zeebodem bij de Galapagoseilanden als onder het ijs van de maan Europa dringt geen zonlicht door.",
          "Chemosynthese kan uitsluitend plaatsvinden in ijskoud water rond het vriespunt.",
          "De duikboot Alvin werd in 1977 oorspronkelijk gebouwd om naar Jupiter te reizen.",
          "Op twee kilometer diepte is nog net genoeg zonlicht voor kleine waterplantjes."
        ],
        correct: "Zowel op de zeebodem bij de Galapagoseilanden als onder het ijs van de maan Europa dringt geen zonlicht door.",
        hint1: "💡 **Denktip:** Controleer elke uitspraak nauwkeurig met alinea 1 en alinea 4. Let op woorden als *'uitsluitend'* en getallen.",
        hint2: "📝 **Uitleg:** Zonlicht stopt al bij 200 meter (dus niet 2 kilometer), en onder de ijskorst van Europa dringt 'geen enkele zonnestraal' door.",
        explanation: "Uit alinea 1 (meer dan 3 km diep = duisternis) en alinea 4 (geen enkele zonnestraal onder het ijs van Europa) volgt dat op beide plekken geen zonlicht is."
      }
    ]
  },

  // ==========================================================================
  // OEFENTEKST 2: Cognitie van Kraaiachtigen (Dieren & Gedrag)
  // ==========================================================================
  {
    id: "oefen-2",
    titel: "De Paradox van de Kraai: Hoe Slim Zijn Vogels Echt?",
    thema: "Dieren & Cognitie",
    tekst: `[1] Eeuwenlang gold de uitdrukking 'vogelbrein' als een weinig vleiende benaming voor iemand die niet al te snugger is. Dat vooroordeel leek biologisch verklaarbaar: het brein van een kraai is immers nauwelijks groter dan een walnoot en mist de geplooide hersenschors die bij zoogdieren zorgt voor logisch redeneren. Toch hebben gedragsbiologen hun oordeel de afgelopen decennia radicaal moeten herzien. Kraaiachtigen – zoals raven, kauwen en eksters – blijken qua denkvermogen namelijk niet onder te doen voor chimpansees.\n\n[2] De verklaring voor deze schijnbare tegenstrijdigheid vonden neurobiologen toen zij vogelhersenen onder de microscoop legden. Hoewel een vogelbrein klein van stuk is, zitten de zenuwcellen (neuronen) er veel dichter op elkaar gepakt dan bij zoogdieren. Een kraai bezit in zijn voorhersenen daardoor zelfs méér informatieverwerkende cellen dan menig aap. Het is dus niet het formaat van de hersenen dat de intelligentie bepaalt, maar de dichtheid van het netwerk.\n\n[3] Dat denkvermogen vertaalt zich in indrukwekkend gedrag. Zo lossen Nieuw-Caledonische kraaien meervoudige puzzels op waarbij zij verschillende hulpmiddelen in een vaste volgorde moeten combineren: ze gebruiken eerst een kort stokje om een langer stokje uit een kooitje te peuteren, waarmee ze vervolgens voedsel uit een diepe buis vissen. Dit bewijst dat de vogels niet zomaar wat uitproberen, maar vooraf een mentaal stappenplan maken.\n\n[4] Bovendien reikt hun intelligentie verder dan technische handigheid. Onderzoekers van de Universiteit van Washington droegen opvallende maskers terwijl ze kraaien vingen om ze te ringen. Jaren later sloegen niet alleen de gevangen vogels alarm bij het zien van dat specifieke masker, maar ook jonge kraaien die destijds nog niet eens uit het ei waren gekropen. De vogels geven informatie over specifieke gevaren dus actief door aan volgende generaties – een eigenschap die lange tijd uitsluitend aan de mens werd toegeschreven.`,
    vragen: [
      {
        vraag: "Waar verwijst *'deze schijnbare tegenstrijdigheid'* in de eerste zin van alinea [2] precies naar?",
        opties: [
          "Het feit dat kraaien erg kleine hersenen zonder hersenschors hebben, maar toch net zo slim zijn als mensapen.",
          "Het verschil in grootte tussen het brein van een raaf en het brein van een ekster.",
          "Het feit dat mensen elkaar soms 'vogelbrein' noemen terwijl vogels kunnen vliegen.",
          "De ruzie tussen gedragsbiologen en neurobiologen over het gebruik van microscopen."
        ],
        correct: "Het feit dat kraaien erg kleine hersenen zonder hersenschors hebben, maar toch net zo slim zijn als mensapen.",
        hint1: "💡 **Denktip:** Een verwijswoord aan het begin van een alinea verwijst bijna altijd terug naar de kern van de vorige alinea (alinea 1).",
        hint2: "📝 **Uitleg:** In alinea 1 staat een tegenstelling: hun brein is zo klein als een walnoot en mist een hersenschors, *toch* doen ze niet onder voor chimpansees.",
        explanation: "De schijnbare tegenstrijdigheid (paradox) uit alinea 1 is dat een walnootklein brein zonder hersenschors toch tot topintelligentie in staat is."
      },
      {
        vraag: "Wat toont het experiment met het korte en het lange stokje in alinea [3] volgens de schrijver aan?",
        opties: [
          "Dat kraaien oorzaak en gevolg kunnen overzien en meerdere stappen vooruit kunnen plannen.",
          "Dat kraaien pas met stokjes leren werken nadat ze dit gedrag bij chimpansees hebben afgekeken.",
          "Dat een kort stokje in de natuur veel makkelijker te vinden is dan een lang stokje.",
          "Dat kraaien alleen door toeval en eindeloos proberen bij het eten terechtkomen."
        ],
        correct: "Dat kraaien oorzaak en gevolg kunnen overzien en meerdere stappen vooruit kunnen plannen.",
        hint1: "💡 **Denktip:** Kijk naar de slotzin van alinea 3, die begint met *'Dit bewijst dat...'*.",
        hint2: "📝 **Uitleg:** Omdat het eerste stokje nog geen eten oplevert maar alleen een tweede hulpmiddel, moet de kraai vooraf een mentaal stappenplan maken.",
        explanation: "Het gebruik van een hulpmiddel om een ander hulpmiddel te bemachtigen bewijst dat de vogel vooruitplant en niet op de bonnefooi handelt."
      },
      {
        vraag: "Welk tekstverband geeft het woord *'Bovendien'* aan het begin van alinea [4] aan?",
        opties: [
          "Een opsommend verband: na de technische slimheid uit alinea 3 wordt nu ook hun sociale geheugen genoemd.",
          "Een tegenstellend verband: alinea 4 laat zien dat kraaien minder slim zijn dan in alinea 3 werd beweerd.",
          "Een voorwaardelijk verband: kraaien kunnen alleen puzzelen als ze eerst een masker hebben gezien.",
          "Een samenvattend verband: alinea 4 herhaalt kort hoe de neuronen in het vogelbrein werken."
        ],
        correct: "Een opsommend verband: na de technische slimheid uit alinea 3 wordt nu ook hun sociale geheugen genoemd.",
        hint1: "💡 **Denktip:** Woorden als *'ook'*, *'daarnaast'* en *'bovendien'* voegen een extra argument of kenmerk toe.",
        hint2: "📝 **Uitleg:** Alinea 3 ging over technische intelligentie (gereedschap); alinea 4 voegt daar met *'Bovendien'* sociale intelligentie aan toe.",
        explanation: "'Bovendien' markeert een opsomming van argumenten die de veelzijdige intelligentie van kraaien onderbouwen."
      },
      {
        vraag: "Wat was de belangrijkste conclusie uit het masker-experiment van de Universiteit van Washington (alinea 4)?",
        opties: [
          "Kraaien kunnen kennis over een specifiek gevaar sociaal overdragen aan jongere generaties.",
          "Jonge kraaien zijn van nature banger voor mensen dan volwassen kraaien.",
          "Kraaien herkennen mensen uitsluitend aan hun kleding en niet aan hun gezicht.",
          "Het ringen van wilde vogels zorgt ervoor dat ze hun geheugen verliezen."
        ],
        correct: "Kraaien kunnen kennis over een specifiek gevaar sociaal overdragen aan jongere generaties.",
        hint1: "💡 **Denktip:** Waarom was het zo bijzonder dat juist de *jonge* kraaien alarm sloegen?",
        hint2: "📝 **Uitleg:** De jonge vogels waren destijds nog niet geboren, dus moesten de oudere kraaien de informatie aan hen hebben doorgegeven.",
        explanation: "Doordat ook nakomelingen zonder eigen ervaring op het specifieke masker reageerden, bleek dat kraaien informatie overdragen aan volgende generaties."
      },
      {
        vraag: "Wat is de hoofdgedachte van de gehele tekst?",
        opties: [
          "Ondanks hun kleine hersenen beschikken kraaiachtigen door een hoge cel-dichtheid over een uitzonderlijk technisch en sociaal denkvermogen.",
          "De Universiteit van Washington heeft ontdekt dat kraaien gevaarlijk kunnen zijn voor onderzoekers op de campus.",
          "Zoogdieren zoals mensapen zijn uiteindelijk veel minder intelligent dan wetenschappers vroeger dachten.",
          "De Nederlandse taal moet het scheldwoord 'vogelbrein' officieel uit het woordenboek schrappen."
        ],
        correct: "Ondanks hun kleine hersenen beschikken kraaiachtigen door een hoge cel-dichtheid over een uitzonderlijk technisch en sociaal denkvermogen.",
        hint1: "💡 **Denktip:** De hoofdgedachte moet alle belangrijke onderdelen omvatten: het kleine maar dichtgepakte brein (alinea 1-2) én de technische en sociale slimheid (alinea 3-4).",
        hint2: "📝 **Uitleg:** De andere keuzes gaan slechts over één los detail of trekken een onjuiste conclusie over apen of woordenboeken.",
        explanation: "De tekst verklaart hoe het kleine kraaienbrein werkt en illustreert zowel hun probleemoplossend als hun sociaal-communicatief vermogen."
      }
    ]
  },

  // ==========================================================================
  // OEFENTEKST 3: Pompeï & Archeologie (Geschiedenis & Wetenschap)
  // ==========================================================================
  {
    id: "oefen-3",
    titel: "Pompeï: Een Bevroren Ogenblik in de Geschiedenis",
    thema: "Geschiedenis & Archeologie",
    tekst: `[1] Toen de aarde rond de Baai van Napels in het najaar van 79 na Christus begon te trillen, maakten de inwoners van de welvarende Romeinse handelsstad Pompeï zich aanvankelijk weinig zorgen. Lichte aardschokken waren in dit gebied schering en inslag. Bovendien zagen de bewoners de nabijgelegen Vesuvius niet als een tijdbom, maar als een vruchtbare, met wijngaarden begroeide berg. Doordat de vulkaan al eeuwenlang niet meer was uitgebarsten, was het collectieve geheugen aan eerdere rampen volledig vervaagd.\n\n[2] Die valse gerustheid werd de stad fataal. Toen de krater van de Vesuvius met een oorverdovende explosie openscheurde, spuwde de vulkaan een dertig kilometer hoge kolom van as, puimsteen en giftige gassen de stratosfeer in. Terwijl veel inwoners nog probeerden hun kostbaarheden in veiligheid te brengen, stortten de eerste daken al in onder het gewicht van het neerdwarrelende puimsteen. Het definitieve doodvonnis volgde de ochtend erna in de vorm van pyroclastische stromen: gloeiend hete gas- en aslawines die met meer dan driehonderd kilometer per uur over de stad raasden.\n\n[3] Paradoxaal genoeg zorgde juist deze totale vernietiging ervoor dat Pompeï voor de geschiedenis bewaard bleef. De zes meter dikke aslaag sloot de stad namelijk luchtdicht af van zuurstof en vocht, waardoor het normale verrottingsproces werd stilgezet. Toen archeologen de stad vanaf de achttiende eeuw blootlegden, troffen zij geen verweerde ruïnes aan, maar een tijdcapsule: van kleurrijke fresco's en politieke verkiezingsleuzen op muren tot verkoolde broden die nog in de bakkersovens lagen.\n\n[4] Tegenwoordig staan archeologen in Pompeï echter voor een nieuw dilemma. Zodra eeuwenoude muurschilderingen en mozaïeken worden opgegraven, worden ze blootgesteld aan zonlicht, zure regen en miljoenen toeristen. Daarom laten wetenschappers tegenwoordig bewust een derde van de stad onder de as rusten. Op die manier blijft dit onvervangbare erfgoed beschermd tot toekomstige generaties beschikken over nog betere conserveringstechnieken.`,
    vragen: [
      {
        vraag: "Wat betekent de uitdrukking *'schering en inslag'* in alinea [1]?",
        opties: [
          "Iets wat heel vaak voorkomt en daardoor als heel gewoon wordt beschouwd.",
          "Iets wat grote paniek veroorzaakt onder de bevolking.",
          "Een natuurverschijnsel dat alleen tijdens zware onweersbuien optreedt.",
          "Schade aan de muren van oude Romeinse huizen."
        ],
        correct: "Iets wat heel vaak voorkomt en daardoor als heel gewoon wordt beschouwd.",
        hint1: "💡 **Denktip:** Kijk naar de zin ervoor: de inwoners maakten zich 'weinig zorgen' over de lichte aardschokken. Waarom deden ze dat niet?",
        hint2: "📝 **Uitleg:** Als iets 'schering en inslag' is, gebeurt het aan de lopende band, waardoor mensen eraan gewend raken.",
        explanation: "'Schering en inslag zijn' (oorspronkelijk uit de weverij) betekent dat iets zeer regelmatig gebeurt en dus heel gebruikelijk is."
      },
      {
        vraag: "Waarom begint alinea [3] met de woorden *'Paradoxaal genoeg'*?",
        opties: [
          "Omdat het tegenstrijdig lijkt dat de ramp die de stad verwoestte er tegelijkertijd voor zorgde dat de stad zo goed bewaard bleef.",
          "Omdat archeologen het nog steeds oneens zijn over het exacte jaartal van de vulkaanuitbarsting.",
          "Omdat de Romeinen veel moderner leefden dan de mensen in de achttiende eeuw.",
          "Omdat het vreemd is dat een vulkaan zowel hete as als koude stenen kan uitstoten."
        ],
        correct: "Omdat het tegenstrijdig lijkt dat de ramp die de stad verwoestte er tegelijkertijd voor zorgde dat de stad zo goed bewaard bleef.",
        hint1: "💡 **Denktip:** Een *paradox* is een schijnbare tegenstrijdigheid. Welke twee tegengestelde woorden zie je in de eerste zin van alinea 3?",
        hint2: "📝 **Uitleg:** Normaal gesproken zorgt 'totale vernietiging' ervoor dat iets verdwijnt, maar hier zorgde het er juist voor dat Pompeï 'bewaard bleef'.",
        explanation: "De paradox zit in het feit dat de verwoestende aslaag tegelijkertijd als conserverend beschermmiddel werkte."
      },
      {
        vraag: "Waarom wordt Pompeï in alinea [3] vergeleken met een *'tijdcapsule'*?",
        opties: [
          "Omdat het alledaagse Romeinse leven op het moment van de uitbarsting tot in de kleinste details bewaard is gebleven.",
          "Omdat archeologen een metalen kist met Romeinse klokken en kalenders onder de grond hebben gevonden.",
          "Omdat een bezoek aan de stad tegenwoordig precies één dagdeel in beslag neemt.",
          "Omdat de gebouwen in Pompeï van veel sterker steen waren gemaakt dan in andere steden."
        ],
        correct: "Omdat het alledaagse Romeinse leven op het moment van de uitbarsting tot in de kleinste details bewaard is gebleven.",
        hint1: "💡 **Denktip:** Lees de voorbeelden achter de dubbele punt in alinea 3: fresco's, verkiezingsleuzen, broden in de oven.",
        hint2: "📝 **Uitleg:** De tijd leek in 79 n.Chr. plotseling stilgezet, waardoor we een intacte momentopname van het dagelijks leven zien.",
        explanation: "Door de luchtdichte afsluiting geeft Pompeï een ongeschonden momentopname van het Romeinse dagelijks leven, net als een tijdcapsule."
      },
      {
        vraag: "Wat is het *'nieuwe dilemma'* waar archeologen volgens alinea [4] mee te maken hebben?",
        opties: [
          "Door op te graven krijgen we nu meer kennis, maar stellen we de kwetsbare resten direct bloot aan bederf en verval.",
          "Er is te weinig geld om alle toeristen van veilige helmen te voorzien bij de vulkaan.",
          "De Italiaanse regering wil op de plek van de ruïnes nieuwe woonwijken bouwen.",
          "Wetenschappers weten niet of de Vesuvius morgen opnieuw zal uitbarsten."
        ],
        correct: "Door op te graven krijgen we nu meer kennis, maar stellen we de kwetsbare resten direct bloot aan bederf en verval.",
        hint1: "💡 **Denktip:** Wat gebeurt er volgens alinea 4 zodra muurschilderingen en mozaïeken onder de beschermende as vandaan komen?",
        hint2: "📝 **Uitleg:** Zolang het onder de as ligt, is het veilig maar onzichtbaar; zodra je het opgraaft, tasten weer, wind en toeristen het aan.",
        explanation: "Het dilemma is de afweging tussen nu opgraven (en blootstellen aan aantasting door weer en toerisme) of onder de as laten ter bescherming."
      },
      {
        vraag: "Welke samenvatting geeft de opbouw van de hele tekst (alinea 1 t/m 4) het best weer?",
        opties: [
          "Onderschatting van het gevaar → het verloop van de ramp → de conserverende werking van de as → hedendaagse bescherming van de ruïnes.",
          "De geschiedenis van Rome → het ontstaan van vulkanen → het leven van bakkers in Pompeï → de gevaren van zure regen.",
          "Waarschuwingen van geleerden → de succesvolle evacuatie van Pompeï → de herbouw in de 18e eeuw → het toerisme van nu.",
          "De landbouw op de Vesuvius → de uitvinding van fresco's → de ontdekking van broden → het sluiten van het museum."
        ],
        correct: "Onderschatting van het gevaar → het verloop van de ramp → de conserverende werking van de as → hedendaagse bescherming van de ruïnes.",
        hint1: "💡 **Denktip:** Kijk per alinea (1, 2, 3 en 4) naar het kernonderwerp en controleer welke reeks precies klopt.",
        hint2: "📝 **Uitleg:** Alinea 1 = geen zorgen; Alinea 2 = de dodelijke uitbarsting; Alinea 3 = bewaard onder as; Alinea 4 = modern behoud.",
        explanation: "Deze reeks volgt exact de chronologische en inhoudelijke structuur van de vier alinea's."
      }
    ]
  },

  // ==========================================================================
  // OEFENTEKST 4: De Schaduwzijde van Recycling (Milieu & Maatschappij - 2F)
  // ==========================================================================
  {
    id: "oefen-4",
    titel: "De Schaduwzijde van Recycling: Dweilen met de Kraan Open?",
    thema: "Milieu & Maatschappij",
    tekst: `[1] Wie netjes zijn lege drankkartons en plastic verpakkingen in de juiste afvalbak gooit, houdt daar vaak een goed gevoel aan over. In spotjes op televisie wordt afvalscheiding immers gepresenteerd als hét medicijn tegen de wereldwijde vervuiling. Hoewel het hergebruiken van materialen ontegenzeggelijk beter is dan verbranden of storten, waarschuwen milieuwetenschappers voor een gevaarlijke denkfout: we overschatten wat recycling daadwerkelijk oplost.\n\n[2] In de praktijk blijkt het recyclen van kunststof namelijk veel lastiger dan dat van glas of aluminium. Terwijl een glazen pot vrijwel oneindig kan worden omgesmolten zonder kwaliteitsverlies, worden de molecuulketens van plastic bij elke verwerkingsronde korter en zwakker. Hierdoor is gerecycled plastic zelden geschikt om opnieuw als voedselverpakking te dienen; het eindigt meestal als laagwaardig materiaal zoals bermpaaltjes, bloempotten of vuilniszakken. Wetenschappers noemen dit proces dan ook geen *recycling*, maar *downcycling*.\n\n[3] Daar komt nog een psychologisch neveneffect bij. Onderzoek toont aan dat consumenten die weten dat een flesje recyclebaar is, makkelijker geneigd zijn om nóg meer wegwerpproducten te kopen. Het groene keurmerk op het etiket neemt het schuldgevoel weg, waardoor de totale berg plastic afval jaarlijks blijft groeien in plaats van krimpen.\n\n[4] Moeten we dan maar stoppen met het scheiden van ons afval? Integendeel: elke kilo plastic die niet in de verbrandingsoven of de natuur belandt, is winst. Maar we moeten stoppen met doen alsof afvalscheiding aan het einde van de keten voldoende is. Zolang fabrikanten miljarden nieuwe wegwerpverpakkingen blijven produceren, is louter inzetten op recycling niets anders dan symptoombestrijding. De werkelijke oplossing begint bij minder produceren en herbruikbare verpakkingen.`,
    vragen: [
      {
        vraag: "Wat is het belangrijkste verschil tussen *recycling* en *downcycling* volgens alinea [2]?",
        opties: [
          "Bij downcycling neemt de kwaliteit van het materiaal tijdens de verwerking af, zodat het alleen nog voor mindere toepassingen bruikbaar is.",
          "Bij downcycling wordt het afval diep onder de grond begraven in plaats van omgesmolten.",
          "Recycling wordt gedaan door consumenten thuis, terwijl downcycling in grote fabrieken plaatsvindt.",
          "Downcycling kost veel minder energie en geld dan het omsmelten van glas of aluminium."
        ],
        correct: "Bij downcycling neemt de kwaliteit van het materiaal tijdens de verwerking af, zodat het alleen nog voor mindere toepassingen bruikbaar is.",
        hint1: "💡 **Denktip:** Kijk in alinea 2 naar wat er met de molecuulketens van plastic gebeurt vergeleken met glas.",
        hint2: "📝 **Uitleg:** Doordat het plastic zwakker wordt, kun je er geen gelijkwaardige voedselverpakking meer van maken, maar alleen nog 'laagwaardig materiaal'.",
        explanation: "Downcycling betekent dat een grondstof wel hergebruikt wordt, maar door kwaliteitsverlies alleen voor een laagwaardiger product kan dienen."
      },
      {
        vraag: "Welk onbedoeld psychologisch effect wordt in alinea [3] beschreven?",
        opties: [
          "De wetenschap dat iets gerecycled kan worden, neemt het schuldgevoel weg en leidt juist tot méér verbruik van wegwerpplastic.",
          "Mensen raken zo in de war van alle verschillende afvalbakken dat ze alles weer bij het restafval gooien.",
          "Consumenten kopen liever glazen flessen omdat die duurder en mooier zijn dan plastic flesjes.",
          "Fabrikanten durven geen groene keurmerken meer op hun verpakkingen te zetten uit angst voor kritiek."
        ],
        correct: "De wetenschap dat iets gerecycled kan worden, neemt het schuldgevoel weg en leidt juist tot méér verbruik van wegwerpplastic.",
        hint1: "💡 **Denktip:** Lees de tweede en derde zin van alinea 3 over hoe consumenten reageren op een recyclebaar flesje.",
        hint2: "📝 **Uitleg:** Omdat mensen denken dat het toch wel gerecycled wordt, voelen ze zich niet schuldig en kopen ze juist méér wegwerpproducten.",
        explanation: "Het geruststellende idee van recycling sust het geweten van de koper, wat paradoxaal genoeg leidt tot een hogere consumptie."
      },
      {
        vraag: "Waarom stelt de schrijver aan het begin van alinea [4] de vraag: *'Moeten we dan maar stoppen met het scheiden van ons afval?'*?",
        opties: [
          "Om een verkeerde conclusie die de lezer uit alinea 2 en 3 zou kunnen trekken direct te voorkomen en zijn standpunt te nuanceren.",
          "Omdat de schrijver zelf twijfelt of afvalscheiding überhaupt wel enig nut heeft voor het milieu.",
          "Om de lezer op te roepen voortaan al het plastic bij het gewone restafval te gooien.",
          "Omdat hij het oneens is met de milieuwetenschappers die in alinea 1 aan het woord kwamen."
        ],
        correct: "Om een verkeerde conclusie die de lezer uit alinea 2 en 3 zou kunnen trekken direct te voorkomen en zijn standpunt te nuanceren.",
        hint1: "💡 **Denktip:** Let op het woord dat direct na de vraag volgt: *'Integendeel'*. Waarom roept de schrijver deze vraag eerst op?",
        hint2: "📝 **Uitleg:** Na de kritiek op recycling in alinea 2 en 3 zou een lezer kunnen denken: 'Dan stop ik ermee!'. Met deze retorische vraag corrigeert de schrijver dat meteen.",
        explanation: "De schrijver gebruikt dit vraag-en-antwoordpatroon om te voorkomen dat zijn kritiek op de beperkingen van recycling wordt opgevat als een pleidooi tégen afvalscheiding."
      },
      {
        vraag: "Wat betekent het woord *'symptoombestrijding'* in de voorlaatste zin van alinea [4]?",
        opties: [
          "Alleen de zichtbare gevolgen van een probleem aanpakken, zonder de werkelijke oorzaak bij de bron weg te nemen.",
          "Het op tijd genezen van een gevaarlijke ziekte voordat deze zich verder kan verspreiden.",
          "Het streng bestraffen van bedrijven die zich niet aan de milieuregels houden.",
          "Het volledig vervangen van plastic door glas en karton in alle supermarkten."
        ],
        correct: "Alleen de zichtbare gevolgen van een probleem aanpakken, zonder de werkelijke oorzaak bij de bron weg te nemen.",
        hint1: "💡 **Denktip:** Denk aan de geneeskunde: een paracetamol nemen tegen koorts zonder de ontsteking te genezen is symptoombestrijding. Wat is hier de oorzaak en wat het gevolg?",
        hint2: "📝 **Uitleg:** De oorzaak is de massaproductie van wegwerpplastic; het achteraf opruimen/recyclen pakt alleen het gevolg (symptoom) aan.",
        explanation: "Symptoombestrijding houdt in dat men slechts de uiterlijke gevolgen verzacht (het afval achteraf verwerken) in plaats van de bron (overproductie) aan te pakken."
      },
      {
        vraag: "Hoe is de toon en houding van de schrijver in deze tekst het best te omschrijven?",
        opties: [
          "Kritisch en genuanceerd",
          "Spottend en onverschillig",
          "Onvoorwaardelijk enthousiast",
          "Pessimistisch en moedeloos"
        ],
        correct: "Kritisch en genuanceerd",
        hint1: "💡 **Denktip:** Wijst de schrijver recycling helemaal af, of laat hij zowel de waarde als de tekortkomingen zien?",
        hint2: "📝 **Uitleg:** Hij is *kritisch* op overschatting en downcycling, maar *genuanceerd* omdat hij benadrukt dat elke gescheiden kilo wél winst blijft.",
        explanation: "De auteur kijkt kritisch naar de mythes rond recycling, maar blijft genuanceerd door het nut van afvalscheiding naast bronreductie te erkennen."
      }
    ]
  },

  // ==========================================================================
  // OEFENTEKST 5: Kunstmatige Intelligentie & Ons Denken (Technologie & Ethiek)
  // ==========================================================================
  {
    id: "oefen-5",
    titel: "Kunstmatige Intelligentie: Hulpmiddel of Bedreiging voor ons Denken?",
    thema: "Technologie & Ethiek",
    tekst: `[1] Binnen enkele seconden een boekverslag genereren, een wiskundige vergelijking oplossen of een levensechte foto ontwerpen: hedendaagse Kunstmatige Intelligentie (AI) draait haar hand er niet voor om. Waar computers vroeger uitsluitend strikte opdrachten van menselijke programmeurs uitvoerden, trainen moderne taalmodellen zichzelf op miljarden teksten van het internet. Deze technologische sprong roept in het onderwijs een prangende vraag op: maakt AI ons slimmer, of maakt het onze hersenen juist lui?\n\n[2] Voorstanders wijzen erop dat de mensheid bij elke grote uitvinding bang was voor achteruitgang. Toen in de jaren zeventig de zakrekenmachine op scholen werd geïntroduceerd, vreesden critici dat leerlingen nooit meer zouden leren rekenen. In werkelijkheid maakte de rekenmachine juist tijd vrij om diepere wiskundige vraagstukken te doorgronden. Volgens deze optimisten fungeert AI op dezelfde manier als een persoonlijke bijlesdocent die altijd geduldig uitleg geeft op het niveau van het kind.\n\n[3] [ ... ] gaat die vergelijking met de rekenmachine volgens cognitief psychologen op een cruciaal punt mank. Schrijven en samenvatten zijn namelijk niet slechts handige trucjes om een eindproduct te maken; het zijn de processen waarmee je brein informatie ordent en begrijpt. Wie het denkwerk volledig uitbesteedt aan een chatbot, slaat die mentale training over. Bovendien presenteren taalmodellen hun antwoorden altijd op een vloeiende, overtuigende toon, zelfs wanneer zij feiten compleet verzinnen – een verschijnsel dat 'hallucineren' wordt genoemd.\n\n[4] De sleutel ligt daarom niet in een totaalverbod op AI, maar in de volgorde waarin we haar gebruiken. Wie eerst zelf nadenkt, een eigen opzet schrijft en AI vervolgens inzet om kritische tegenvragen te stellen of spelfouten te bespreken, scherpt zijn geest. Pas wanneer we de techniek gebruiken als sparringspartner in plaats van als vervanger, blijft de mens aan het roer staan.`,
    vragen: [
      {
        vraag: "Op de plek van `[ ... ]` aan het begin van alinea [3] is een signaalwoord weggelaten. Welk woord past daar het best?",
        opties: [
          "Toch",
          "Daarom",
          "Bovendien",
          "Kortom"
        ],
        correct: "Toch",
        hint1: "💡 **Denktip:** Vergelijk de inhoud van alinea 2 (de optimisten die AI vergelijken met de rekenmachine) met de eerste zin van alinea 3 (*'gaat die vergelijking ... mank'*).",
        hint2: "📝 **Uitleg:** Alinea 3 brengt een tegenargument in tegen alinea 2. Daar hoort een tegenstellend signaalwoord bij, zoals *'Toch'* of *'Echter'*.",
        explanation: "Alinea 3 weerlegt de vergelijking uit alinea 2; het tegenstellende signaalwoord 'Toch' verbindt deze twee alinea's logisch."
      },
      {
        vraag: "Waarom gebruiken de voorstanders in alinea [2] het voorbeeld van de zakrekenmachine?",
        opties: [
          "Om aan te tonen dat eerdere angst voor nieuwe technologie in het onderwijs achteraf onterecht bleek.",
          "Om te bewijzen dat kinderen in de jaren zeventig veel beter konden hoofdrekenen dan nu.",
          "Om uit te leggen dat een AI-chatbot van binnen precies hetzelfde werkt als een rekenmachine.",
          "Om te laten zien dat scholen alle elektronische hulpmiddelen uit de klas zouden moeten weren."
        ],
        correct: "Om aan te tonen dat eerdere angst voor nieuwe technologie in het onderwijs achteraf onterecht bleek.",
        hint1: "💡 **Denktip:** Lees de eerste zin van alinea 2: welk punt willen de voorstanders met dit historische voorbeeld ondersteunen?",
        hint2: "📝 **Uitleg:** De zakrekenmachine leidde destijds ook tot angst, maar hielp leerlingen uiteindelijk verder. Voorstanders verwachten hetzelfde van AI.",
        explanation: "De historische parallel met de zakrekenmachine dient als argument dat nieuwe hulpmiddelen het onderwijs niet verarmen maar verrijken."
      },
      {
        vraag: "Wat bedoelt de schrijver in alinea [3] met de uitdrukking dat de vergelijking *'op een cruciaal punt mank gaat'*?",
        opties: [
          "Dat de vergelijking op een heel belangrijk onderdeel niet klopt.",
          "Dat de vergelijking alleen geldt voor oudere computers die traag werken.",
          "Dat cognitief psychologen de vergelijking volledig onderschrijven.",
          "Dat het erg moeilijk is om de vergelijking aan jonge kinderen uit te leggen."
        ],
        correct: "Dat de vergelijking op een heel belangrijk onderdeel niet klopt.",
        hint1: "💡 **Denktip:** Als een vergelijking 'mank loopt' of 'mank gaat', is er iets mis mee. En wat betekent *'cruciaal'*?",
        hint2: "📝 **Uitleg:** *Cruciaal* betekent doorslaggevend/zeer belangrijk; *mank gaan* betekent niet opgaan of tekortschieten.",
        explanation: "Wanneer een vergelijking op een cruciaal punt mank gaat, vertoont zij op een essentieel onderdeel een denkfout."
      },
      {
        vraag: "Waarom maakt het 'hallucineren' van taalmodellen (alinea 3) het extra gevaarlijk als leerlingen zelf niet meer nadenken?",
        opties: [
          "Omdat de chatbot verzonnen onzin zo overtuigend formuleert dat een onkritische gebruiker niet merkt dat het antwoord fout is.",
          "Omdat de computer bij overbelasting plotseling alle opgeslagen documenten van de leerling kan wissen.",
          "Omdat taalmodellen expres moeilijke woorden gebruiken die geen enkele leerling uit groep 8 kent.",
          "Omdat het scherm van de computer gaat flikkeren wanneer er een rekenfout wordt gemaakt."
        ],
        correct: "Omdat de chatbot verzonnen onzin zo overtuigend formuleert dat een onkritische gebruiker niet merkt dat het antwoord fout is.",
        hint1: "💡 **Denktip:** Kijk naar de laatste zin van alinea 3: op welke toon presenteert een taalmodel zijn antwoorden?",
        hint2: "📝 **Uitleg:** Omdat de AI altijd op een 'vloeiende, overtuigende toon' schrijft, prik je alleen door fouten heen als je zelf kennis hebt en kritisch blijft.",
        explanation: "De combinatie van zelf niet nadenken én een AI die onjuistheden op overtuigende toon presenteert, zorgt ervoor dat fouten onopgemerkt blijven."
      },
      {
        vraag: "Met welke uitspraak vat je het hoofdstandpunt van de schrijver (alinea 4) het best samen?",
        opties: [
          "AI is pas waardevol voor het leren wanneer je eerst zelf nadenkt en de technologie gebruikt om je eigen werk te verfijnen.",
          "Scholen moeten het gebruik van AI voorlopig verbieden totdat computers geen feitelijke fouten meer maken.",
          "Het schrijven van samenvattingen en boekverslagen is in het digitale tijdperk overbodig geworden.",
          "Leerlingen kunnen het beste al hun schoolwerk door AI laten nakijken zonder tussenkomst van een leraar."
        ],
        correct: "AI is pas waardevol voor het leren wanneer je eerst zelf nadenkt en de technologie gebruikt om je eigen werk te verfijnen.",
        hint1: "💡 **Denktip:** Lees de laatste twee zinnen van alinea 4: wat is het verschil tussen een 'sparringspartner' en een 'vervanger'?",
        hint2: "📝 **Uitleg:** De auteur pleit niet voor een verbod, maar voor een bewuste volgorde: eerst zelf denken en schrijven, daarna AI als sparringspartner inzetten.",
        explanation: "In de slotconclusie neemt de auteur het genuanceerde standpunt in dat AI het denken versterkt mits de leerling eerst zelf het denkwerk verricht."
      }
    ]
  },

  // ==========================================================================
  // OEFENTEKST 6: De Biologische Klok & Schooltijden (Gezondheid & Brein)
  // ==========================================================================
  {
    id: "oefen-6",
    titel: "De Biologische Klok: Waarom Tieners Geen Ochtendmensen Zijn",
    thema: "Gezondheid & Hersenwetenschap",
    tekst: `[1] Het is een bekend tafereel in talloze huishoudens: terwijl jonge kinderen in het weekend al om zeven uur 's ochtends klaarwakker naast het bed van hun ouders staan, zijn oudere basisschoolleerlingen en tieners met geen mogelijkheid uit hun kussen te krijgen. Volwassenen doen dit gedrag vaak af als luiheid of een gebrek aan discipline. Slaapwetenschappers wijzen echter naar een heel andere boosdoener diep in onze hersenen: een verschuiving van de biologische klok.\n\n[2] Ieder mens beschikt over een intern uurwerk, de zogeheten *suprachiasmatische kern*, die precies regelt wanneer we slaperig worden en wanneer we alert zijn. Zodra het 's avonds begint te schemeren, geeft dit hersengebiedje het startsein voor de aanmaak van melatonine – het slaaphormoon dat ons lichaam voorbereidt op de nacht. Rond het elfde of twaalfde levensjaar verandert er echter iets fundamenteels in de hormoonhuishouding: de afgifte van melatonine verschuift met één tot twee uur naar achteren.\n\n[3] Het gevolg van die verschuiving laat zich gemakkelijk raden. Een twaalfjarige die om negen uur 's avonds naar het plafond ligt te staren, is niet dwars, maar biologisch gezien simpelweg nog klaarwakker. Wanneer de wekker de volgende ochtend om zeven uur gaat, verkeert het tienerbrein eigenlijk nog midden in zijn biologische nacht. Daardoor bouwen veel jongeren doordeweeks een chronisch slaaptekort op, wat hun concentratie, geheugen en stemming op school aantoonbaar schaadt.\n\n[4] Verschillende middelbare scholen experimenteren daarom met een later aanvangstijdstip van de eerste les, bijvoorbeeld om half tien in plaats van half negen. De eerste onderzoeksresultaten zijn veelbelovend: leerlingen zijn minder vaak ziek en halen hogere cijfers. Critici werpen tegen dat latere schooltijden lastig te combineren zijn met de werktijden van ouders en sportclubs in de middag. Toch rijst de vraag of het rooster van de samenleving niet vaker zou moeten meebewegen met de biologie van het opgroeiende kind.`,
    vragen: [
      {
        vraag: "Welke misvatting van volwassenen wordt in alinea [1] door slaapwetenschappers ontkracht?",
        opties: [
          "Het idee dat laat wakker worden bij oudere kinderen en tieners te maken heeft met luiheid of onwil.",
          "Het idee dat jonge kinderen minder uren slaap nodig hebben dan volwassenen.",
          "De gedachte dat uitslapen in het weekend slecht is voor het langetermijngeheugen.",
          "De opvatting dat een wekker schadelijk is voor het gehoor van opgroeiende kinderen."
        ],
        correct: "Het idee dat laat wakker worden bij oudere kinderen en tieners te maken heeft met luiheid of onwil.",
        hint1: "💡 **Denktip:** Kijk naar de voorlaatste en laatste zin van alinea 1, verbonden door het tegenstellende woord *'echter'*.",
        hint2: "📝 **Uitleg:** Volwassenen zien het vaak als 'luiheid of een gebrek aan discipline', terwijl wetenschappers aantonen dat het door de biologische klok komt.",
        explanation: "Wetenschappers weerleggen het vooroordeel dat moeizaam opstaan voortkomt uit luiheid; de oorzaak is fysiologisch van aard."
      },
      {
        vraag: "Wat verandert er volgens alinea [2] rond het elfde of twaalfde levensjaar in het lichaam?",
        opties: [
          "Het lichaam begint 's avonds pas één tot twee uur later met het aanmaken van het slaaphormoon melatonine.",
          "De hersenen stoppen helemaal met het produceren van melatonine zodra het buiten donker wordt.",
          "Het interne uurwerk in de hersenen gaat twee keer zo snel tikken als bij jonge kinderen.",
          "Kinderen hebben vanaf hun twaalfde jaar nog maar vijf uur slaap per nacht nodig."
        ],
        correct: "Het lichaam begint 's avonds pas één tot twee uur later met het aanmaken van het slaaphormoon melatonine.",
        hint1: "💡 **Denktip:** Lees de laatste zin van alinea 2 zorgvuldig.",
        hint2: "📝 **Uitleg:** De afgifte van het slaaphormoon melatonine verschuift met één tot twee uur naar achteren, waardoor slaperigheid later optreedt.",
        explanation: "Bij het begin van de puberteit komt de melatonineproductie later op de avond op gang, waardoor het slaapritme opschuift."
      },
      {
        vraag: "Hoe verhouden alinea [2] en alinea [3] zich inhoudelijk tot elkaar?",
        opties: [
          "Alinea 2 legt de biologische oorzaak uit, en alinea 3 beschrijft de nadelige gevolgen daarvan in het dagelijks leven.",
          "Alinea 2 noemt een voordeel van melatonine, en alinea 3 noemt een nadeel van dit hormoon.",
          "Alinea 2 beschrijft een probleem, en alinea 3 geeft direct de oplossing van de middelbare scholen.",
          "Alinea 2 geeft de mening van ouders weer, en alinea 3 de mening van leerlingen."
        ],
        correct: "Alinea 2 legt de biologische oorzaak uit, en alinea 3 beschrijft de nadelige gevolgen daarvan in het dagelijks leven.",
        hint1: "💡 **Denktip:** Let op de eerste woorden van alinea 3: *'Het gevolg van die verschuiving...'*.",
        hint2: "📝 **Uitleg:** Alinea 2 behandelt de oorzaak (latere melatonine-aanmaak); alinea 3 behandelt het gevolg (laat inslapen, chronisch slaaptekort en minder concentratie).",
        explanation: "Er is sprake van een duidelijk oorzaak-gevolgverband tussen alinea 2 en alinea 3."
      },
      {
        vraag: "Welk tegenargument gebruiken critici in alinea [4] tegen het later laten beginnen van de schooldag?",
        opties: [
          "Dat latere schooltijden praktisch onhandig zijn vanwege de werktijden van ouders en middagactiviteiten zoals sport.",
          "Dat leerlingen bij een later begin van de schooldag juist vaker ziek worden en lagere cijfers halen.",
          "Dat docenten weigeren om na vier uur 's middags nog les te geven op school.",
          "Dat het verschuiven van de schooltijden geen enkele invloed heeft op de hoeveelheid slaap."
        ],
        correct: "Dat latere schooltijden praktisch onhandig zijn vanwege de werktijden van ouders en middagactiviteiten zoals sport.",
        hint1: "💡 **Denktip:** Zoek in alinea 4 naar de zin die begint met *'Critici werpen tegen dat...'*.",
        hint2: "📝 **Uitleg:** De critici betwisten niet de gezondheidswinst, maar wijzen op praktische bezwaren rondom werk van ouders en sportclubs.",
        explanation: "Het tegenargument van de critici is organisatorisch van aard: het botst met bestaande maatschappelijke tijden van werk en sport."
      },
      {
        vraag: "Aan welke kant staat de schrijver zelf, gelet op de laatste zin van alinea [4]?",
        opties: [
          "De schrijver staat sympathiek tegenover het aanpassen van schooltijden aan het biologische ritme van jongeren.",
          "De schrijver vindt dat sportclubs belangrijker zijn dan een extra uurtje slaap in de ochtend.",
          "De schrijver vindt dat tieners gewoon eerder naar bed moeten gaan en hun telefoon moeten inleveren.",
          "De schrijver neemt geen enkel standpunt in en vindt dat slaaponderzoek onbetrouwbaar is."
        ],
        correct: "De schrijver staat sympathiek tegenover het aanpassen van schooltijden aan het biologische ritme van jongeren.",
        hint1: "💡 **Denktip:** Lees de laatste zin: *'Toch rijst de vraag of het rooster van de samenleving niet vaker zou moeten meebewegen met de biologie van het opgroeiende kind.'*",
        hint2: "📝 **Uitleg:** Door na het tegenargument met *'Toch'* deze retorische slotvraag te stellen, laat de auteur blijken dat hij aanpassing van het rooster steunt.",
        explanation: "Met de sturende slotvraag na het woord 'Toch' laat de auteur subtiel blijken dat hij vindt dat schoolroosters rekening horen te houden met de biologie."
      }
    ]
  },

  // ==========================================================================
  // OEFENTEKST 7: De Illusie van Gratis & Aandachtseconomie (Media & Economie)
  // ==========================================================================
  {
    id: "oefen-7",
    titel: "De Illusie van Gratis: Hoe Sociale Media Onze Aandacht Verkopen",
    thema: "Media & Economie",
    tekst: `[1] Of je nu korte filmpjes bekijkt, berichten stuurt naar vrienden of online spelletjes speelt: voor de populairste apps op je telefoon of tablet hoef je meestal geen cent te betalen. Dat lijkt op het eerste gezicht bijzonder vrijgevig van de grote technologiebedrijven. Toch maken deze bedrijven miljarden euro's winst per jaar. In de digitale economie geldt namelijk een ijzeren vuistregel: *als een product gratis is, ben jij niet de klant, maar het product*.\n\n[2] Hoe werkt dat verdienmodel precies? De echte klanten van gratis platforms zijn adverteerders die hun schoenen, games of frisdrank willen verkopen. Om zoveel mogelijk reclame-inkomsten binnen te halen, moeten app-makers ervoor zorgen dat gebruikers hun scherm zo lang mogelijk blijven vasthouden. Elke minuut dat jij kijkt, levert immers kostbare gegevens op over jouw interesses én ruimte om nieuwe advertenties te tonen. Jouw schaarse tijd en aandacht vormen dus de werkelijke handelswaar.\n\n[3] Om die aandacht vast te houden, laten techbedrijven niets aan het toeval over. Achter de schermen werken honderden gedragspsychologen en programmeurs aan slimme ontwerpkeuzes. Denk aan het *'oneindig scrollen'*, waarbij er nooit een laatste pagina is, en het *'autoplay'*-systeem dat na het einde van een video direct de volgende start. Het brein krijgt zo geen natuurlijk stopmoment aangeboden – vergelijkbaar met een zak chips die zichzelf van onderaf telkens weer bijvult.\n\n[4] Steeds meer landen overwegen daarom strengere regels om vooral jonge gebruikers te beschermen tegen deze verslavende ontwerpmechanieken. Zo pleiten sommige Europarlementariërs voor een verbod op automatisch afspelende video's en misleidende meldingen. Totdat zulke wetten er zijn, helpt het al enorm als je doorziet hoe het spel gespeeld wordt: wie begrijpt dat een app ontworpen is om je tijd te stelen, legt zijn scherm net iets makkelijker op tijd weg.`,
    vragen: [
      {
        vraag: "Wat wordt in alinea [1] bedoeld met de uitspraak: *'als een product gratis is, ben jij niet de klant, maar het product'*?",
        opties: [
          "De app-makers verdienen hun geld door de aandacht en gegevens van de gebruikers te verkopen aan adverteerders.",
          "Gebruikers moeten uiteindelijk zelf filmpjes en reclames gaan maken om de app te mogen blijven gebruiken.",
          "Gratis apps bevatten verborgen kosten die aan het einde van het jaar van je bankrekening worden afgeschreven.",
          "Technologiebedrijven verkopen gebruikte telefoons en tablets door aan winkels."
        ],
        correct: "De app-makers verdienen hun geld door de aandacht en gegevens van de gebruikers te verkopen aan adverteerders.",
        hint1: "💡 **Denktip:** Lees alinea 2 om te zien wie de *echte klanten* zijn en wat er aan hen verkocht wordt.",
        hint2: "📝 **Uitleg:** Adverteerders zijn de betalende klanten; wat zij kopen is jouw kijktijd, aandacht en profielgegevens.",
        explanation: "De gebruiker betaalt niet met geld, maar zijn aandacht en data worden door het platform verhandeld aan betalende adverteerders."
      },
      {
        vraag: "Waarom vergelijkt de schrijver het ontbreken van een stopmoment in alinea [3] met *'een zak chips die zichzelf van onderaf telkens weer bijvult'*?",
        opties: [
          "Om duidelijk te maken hoe moeilijk het is om uit jezelf te stoppen wanneer er geen natuurlijk einde aan het aanbod komt.",
          "Om aan te tonen dat kinderen tijdens het kijken van filmpjes te veel ongezonde snacks eten.",
          "Om uit te leggen dat makers van chips de belangrijkste adverteerders zijn op sociale media.",
          "Om te laten zien dat het maken van korte video's net zo goedkoop is als het bakken van aardappelschijfjes."
        ],
        correct: "Om duidelijk te maken hoe moeilijk het is om uit jezelf te stoppen wanneer er geen natuurlijk einde aan het aanbod komt.",
        hint1: "💡 **Denktip:** Wanneer stop je normaal met eten uit een zak of lezen van een hoofdstuk? Als de bodem of de laatste bladzijde bereikt is!",
        hint2: "📝 **Uitleg:** Door 'oneindig scrollen' en 'autoplay' verdwijnt het natuurlijke eindsignaal, waardoor je ongemerkt blijft doorgaan.",
        explanation: "De beeldspraak verduidelijkt hoe het wegnemen van een natuurlijk eindpunt (de bodem van de zak / het einde van een pagina) zelfbeheersing bemoeilijkt."
      },
      {
        vraag: "Wat betekent het woord *'schaarse'* in de laatste zin van alinea [2] (*'Jouw schaarse tijd en aandacht'* )?",
        opties: [
          "Beperkt beschikbaar en daardoor kostbaar.",
          "Oneindig groot en gemakkelijk te vervangen.",
          "Geheel gratis en voor iedereen toegankelijk.",
          "Onbelangrijk voor grote bedrijven."
        ],
        correct: "Beperkt beschikbaar en daardoor kostbaar.",
        hint1: "💡 **Denktip:** Een dag heeft maar 24 uur; je kunt je tijd en aandacht maar één keer uitgeven. Wat betekent 'schaars' in de economie?",
        hint2: "📝 **Uitleg:** *Schaars* betekent dat er maar een beperkte hoeveelheid van is, waardoor bedrijven er fel om concurreren.",
        explanation: "'Schaars' betekent niet in overvloed aanwezig / beperkt beschikbaar, wat het economisch waardevol maakt."
      },
      {
        vraag: "Welke functie heeft alinea [3] ten opzichte van alinea [2]?",
        opties: [
          "Alinea 3 legt uit *op welke manier* (met welke middelen) bedrijven het doel uit alinea 2 (zoveel mogelijk schermtijd) bereiken.",
          "Alinea 3 weerlegt de bewering uit alinea 2 dat adverteerders veel geld betalen voor reclameruimte.",
          "Alinea 3 laat zien dat alleen volwassenen gevoelig zijn voor reclames in gratis apps.",
          "Alinea 3 vat de wetsvoorstellen van het Europees Parlement alvast kort samen."
        ],
        correct: "Alinea 3 legt uit *op welke manier* (met welke middelen) bedrijven het doel uit alinea 2 (zoveel mogelijk schermtijd) bereiken.",
        hint1: "💡 **Denktip:** Kijk naar de eerste zin van alinea 3: *'Om die aandacht vast te houden...'*. Welk tekstverband is 'Om ... te'?",
        hint2: "📝 **Uitleg:** In alinea 2 staat het doel (gebruikers zo lang mogelijk laten kijken); in alinea 3 staan de middelen (oneindig scrollen en autoplay).",
        explanation: "Er is sprake van een doel-middelverband: alinea 3 concretiseert de psychologische en technische middelen waarmee de aandacht wordt vastgehouden."
      },
      {
        vraag: "Welk advies geeft de schrijver de lezer aan het einde van de tekst mee?",
        opties: [
          "Wees je bewust van de slimme trucs achter apps, zodat je zelf de regie over je schermtijd kunt houden.",
          "Verwijder onmiddellijk alle gratis apps van je telefoon en koop alleen nog betaalde spellen.",
          "Wacht met het minderen van je schermtijd tot het Europees Parlement nieuwe wetten heeft aangenomen.",
          "Klik zo vaak mogelijk op advertenties zodat je favoriete app gratis kan blijven bestaan."
        ],
        correct: "Wees je bewust van de slimme trucs achter apps, zodat je zelf de regie over je schermtijd kunt houden.",
        hint1: "💡 **Denktip:** Lees de allerlaatste zin van alinea 4.",
        hint2: "📝 **Uitleg:** De auteur benadrukt dat kennis macht geeft: *'wie begrijpt dat een app ontworpen is om je tijd te stelen, legt zijn scherm net iets makkelijker op tijd weg'*.",
        explanation: "De schrijver pleit voor mediawijsheid: inzicht in de verleidingstechnieken helpt de gebruiker om zelfstandig grenzen te stellen."
      }
    ]
  },

  // ==========================================================================
  // OEFENTEKST 8: Rewilding & De Terugkeer van de Wolf (Natuur & Debat)
  // ==========================================================================
  {
    id: "oefen-8",
    titel: "Rewilding: Hoe Wild Mag de Nederlandse Natuur Zijn?",
    thema: "Natuurbeheer & Maatschappelijk Debat",
    tekst: `[1] Meer dan anderhalve eeuw lang was de wolf in Nederland volledig uitgestorven, tot er in 2015 plotseling weer een exemplaar vanuit Duitsland de grens overstak. Inmiddels hebben zich meerdere roedels op de Veluwe en in Drenthe gevestigd. Die terugkeer past in een bredere Europese beweging die ecologen *'rewilding'* noemen: het teruggeven van strak aangeharkte cultuurlandschappen aan de spontane krachten van de natuur, inclusief grote grazers en top-roofdieren.\n\n[2] Natuurbeschermers wijzen op het beroemde voorbeeld van het Amerikaanse nationale park Yellowstone. Toen daar in 1995 wolven werden geherintroduceerd, ontstond een positieve kettingreactie. Doordat edelherten niet langer ongestoord langs de rivieroevers durfden te grazen, kregen jonge wilgen en populieren weer de kans om uit te groeien tot bossen. Die bomen verstevigden met hun wortels de oevers en trokken bevers en zangvogels aan. Een top-roofdier houdt kortom het hele ecosysteem in balans.\n\n[3] Toch vragen critici en boerenorganisaties zich hardop af of zo'n Amerikaans succesverhaal zomaar te kopiëren valt naar het dichtbevolkte Nederland. Waar Yellowstone uitgestrekte wildernis zonder dorpen of snelwegen omvat, is de Nederlandse natuur versnipperd in relatief kleine snippers groen, direct grenzend aan weilanden vol schapen. Veehouders worden ondanks wolfwerende hekken regelmatig geconfronteerd met gedode dieren en hoge kosten.\n\n[4] Het debat over de wolf legt daarmee een dieper spanningsveld bloot. Enerzijds verlangen veel Nederlanders naar echte, ongetemde natuur in eigen land; anderzijds zijn we gewend geraakt aan een volledig maakbare en veilige leefomgeving waarin elk risico wordt uitgebannen. Samenleven met wilde roofdieren vraagt niet alleen om stevige rasters en eerlijke schadevergoedingen voor boeren, maar ook om het besef dat wilde natuur zich niet altijd aan onze menselijke grenzen houdt.`,
    vragen: [
      {
        vraag: "Wat houdt het begrip *'rewilding'* volgens alinea [1] precies in?",
        opties: [
          "De natuur meer haar eigen gang laten gaan door menselijk ingrijpen te verminderen en oorspronkelijke diersoorten de ruimte te geven.",
          "Het bouwen van grote dierentuinen aan de rand van steden zodat mensen wilde dieren van dichtbij kunnen bekijken.",
          "Het kappen van bossen om meer weilanden aan te leggen voor schapen en koeien.",
          "Het vangen van wolven in Duitsland om ze met vrachtwagens naar Amerikaanse natuurparken te brengen."
        ],
        correct: "De natuur meer haar eigen gang laten gaan door menselijk ingrijpen te verminderen en oorspronkelijke diersoorten de ruimte te geven.",
        hint1: "💡 **Denktip:** Kijk in alinea 1 naar de uitleg direct achter de dubbele punt bij het woord *'rewilding'*.",
        hint2: "📝 **Uitleg:** Rewilding betekent het teruggeven van strak ingerichte landschappen aan spontane natuurlijke processen, inclusief grote grazers en roofdieren.",
        explanation: "Rewilding staat voor een vorm van natuurbeheer waarbij ecosystemen zichzelf reguleren met natuurlijke grazers en roofdieren."
      },
      {
        vraag: "Waarom noemen voorstanders het voorbeeld van Yellowstone in alinea [2]?",
        opties: [
          "Om te illustreren hoe de aanwezigheid van een roofdier via een kettingreactie de hele biodiversiteit van een gebied kan herstellen.",
          "Om te laten zien dat wolven in Amerika alleen vissen en bevers eten en nooit op herten jagen.",
          "Om te bewijzen dat bomen alleen kunnen groeien als boswachters hekken langs rivieren plaatsen.",
          "Om aan te tonen dat er in Nederland veel meer edelherten leven dan in de Verenigde Staten."
        ],
        correct: "Om te illustreren hoe de aanwezigheid van een roofdier via een kettingreactie de hele biodiversiteit van een gebied kan herstellen.",
        hint1: "💡 **Denktip:** Volg de kettingreactie in alinea 2: wolven → herten mijden oevers → jonge bomen groeien → bevers en vogels keren terug.",
        hint2: "📝 **Uitleg:** De laatste zin van alinea 2 vat dit argument samen: *'Een top-roofdier houdt kortom het hele ecosysteem in balans.'*",
        explanation: "Het voorbeeld van Yellowstone dient als wetenschappelijk bewijs dat wolven via gedragsverandering bij prooidieren het gehele landschap verrijken."
      },
      {
        vraag: "Met welk argument betoogt men in alinea [3] dat de situatie in Nederland niet goed te vergelijken is met Yellowstone?",
        opties: [
          "Nederland is dichtbevolkt en de natuurgebieden zijn klein en liggen direct naast landbouwgrond met vee.",
          "Het klimaat in Nederland is veel te nat en te koud voor wolven om op eigen kracht te overleven.",
          "Er groeien op de Veluwe en in Drenthe geen wilgen of populieren langs de rivieren.",
          "Nederlandse wolven jagen alleen overdag, terwijl Amerikaanse wolven 's nachts jagen."
        ],
        correct: "Nederland is dichtbevolkt en de natuurgebieden zijn klein en liggen direct naast landbouwgrond met vee.",
        hint1: "💡 **Denktip:** Let op de tegenstelling in de tweede zin van alinea 3 (*'Waar Yellowstone..., is de Nederlandse natuur...'*).",
        hint2: "📝 **Uitleg:** Yellowstone is een enorme, onbewoonde wildernis, terwijl Nederland versnipperd is en natuur direct grenst aan weilanden vol schapen.",
        explanation: "De tegenwerping in alinea 3 draait om het grote verschil in schaal, bevolkingsdichtheid en de directe nabijheid van veehouderij."
      },
      {
        vraag: "Welk tekstverband geven de woorden *'Enerzijds ... anderzijds'* in alinea [4] aan?",
        opties: [
          "Een tegenstelling tussen twee botsende wensen of belangen.",
          "Een oorzaak en het onvermijdelijke gevolg daarvan.",
          "Een tijdsvolgorde van gebeurtenissen in het verleden en de toekomst.",
          "Een algemene regel gevolgd door een specifiek rekenvoorbeeld."
        ],
        correct: "Een tegenstelling tussen twee botsende wensen of belangen.",
        hint1: "💡 **Denktip:** Wat staat er achter *enerzijds* (verlangen naar ongetemde natuur) en wat achter *anderzijds* (behoefte aan een volledig veilige, maakbare omgeving)?",
        hint2: "📝 **Uitleg:** *'Enerzijds ... anderzijds'* weegt twee tegengestelde kanten van een dilemma tegen elkaar af.",
        explanation: "Het signaalwoordenpaar 'enerzijds ... anderzijds' markeert een tegenstellend of afwegend verband tussen twee botsende verlangens."
      },
      {
        vraag: "Tot welke tekstsoort behoort deze tekst het meest?",
        opties: [
          "Een beschouwing, omdat het vraagstuk van meerdere kanten wordt belicht met aandacht voor zowel ecologen als veehouders.",
          "Een reclamefolder om toeristen naar het nationale park op de Veluwe te lokken.",
          "Een felle aanklacht waarin geëist wordt dat alle wolven onmiddellijk uit Nederland worden verwijderd.",
          "Een handleiding voor schapenhouders over het bouwen van elektrische hekken."
        ],
        correct: "Een beschouwing, omdat het vraagstuk van meerdere kanten wordt belicht met aandacht voor zowel ecologen als veehouders.",
        hint1: "💡 **Denktip:** Kijk of de schrijver slechts één kant gelijk geeft (betoog), of dat hij de argumenten van voor- én tegenstanders weegt om de lezer aan het denken te zetten (beschouwing).",
        hint2: "📝 **Uitleg:** De auteur bespreekt zowel het ecologische belang (alinea 2) als de terechte zorgen van boeren (alinea 3) en duidt het achterliggende dilemma (alinea 4).",
        explanation: "Een tekst die een maatschappelijk vraagstuk van verschillende kanten onderzoekt en weegt zonder eenzijdig partij te kiezen, is een beschouwing."
      }
    ]
  },

  // ==========================================================================
  // OEFENTEKST 9: De Steen van Rosetta (Taalwetenschap & Geschiedenis)
  // ==========================================================================
  {
    id: "oefen-9",
    titel: "Het Geheim van de Rosetta-steen: Hoe Hiërogliefen Hun Stem Terugkregen",
    thema: "Taalwetenschap & Geschiedenis",
    tekst: `[1] Meer dan veertienhonderd jaar lang vormden de Egyptische hiërogliefen een onoplosbaar raadsel. Op tempelmuren en obelisken stonden duizenden prachtige tekens van valken, ogen, kronkelende slangen en rietstengels gebeiteld, maar na de ondergang van het oude Egyptische rijk was er niemand meer die het schrift kon lezen. Eeuwenlang dachten Europese geleerden dat elk plaatje een compleet denkbeeld voorstelde: een tekening van een vogel zou simpelweg 'vogel' of 'vliegen' betekenen. Die hardnekkige misvatting hield elke succesvolle ontcijfering tegen.\n\n[2] De doorbraak begon in 1799, toen Franse soldaten tijdens een veldtocht van Napoleon bij het Egyptische havenstadje رشيد (Rosetta) op een zware plaat zwart graniet stuitten. Op deze 'Steen van Rosetta' stond één en hetzelfde koninklijke besluit uit het jaar 196 voor Christus in drie verschillende schriften gebeiteld: bovenaan in heilige hiërogliefen, in het midden in het demotisch (het Egyptische dagelijkse snelschrift) en onderaan in het Oudgrieks.\n\n[3] Omdat wetenschappers het Oudgrieks uitstekend beheersten, beschikten ze plotseling over een spiekbriefje. Toch duurde het nog ruim twintig jaar voordat de jonge Franse taalkundige Jean-François Champollion in 1822 de code definitief kraakte. Door de Griekse koningsnamen *Ptolemaeus* en *Cleopatra* te vergelijken met de hiërogliefen die in een ovale ring (een *cartouche*) stonden, deed hij een revolutionaire ontdekking: hiërogliefen zijn geen loutere beeldplaatjes, maar vormen grotendeels een klankschrift, gecombineerd met enkele betekenistekens.\n\n[4] Toen Champollion dit inzicht eenmaal had, vielen alle puzzelstukjes op hun plaats. Omdat hij daarnaast het Koptisch had bestudeerd – een taal die rechtstreeks afstamde van het oude Egyptisch – wist hij niet alleen hoe de tekens klonken, maar ook wat de woorden betekenden. Dankzij zijn speurwerk veranderden de zwijgende stenen monumenten langs de Nijl in één klap in sprekende getuigen van drieduizend jaar geschiedenis.`,
    vragen: [
      {
        vraag: "Wat was volgens alinea [1] de reden dat geleerden er eeuwenlang niet in slaagden om hiërogliefen te ontcijferen?",
        opties: [
          "Zij gingen ten onrechte uit van de gedachte dat elk symbool alleen een letterlijk plaatje of begrip voorstelde en geen klank.",
          "Alle kleitabletten en papyrusrollen waren tijdens overstromingen van de Nijl verloren gegaan.",
          "Zij konden het Oudgriekse alfabet nog niet lezen en hadden geen enkel woordenboek.",
          "De Egyptische priesters hadden opzettelijk spelfouten in de tempelmuren gebeiteld om vreemdelingen te misleiden."
        ],
        correct: "Zij gingen ten onrechte uit van de gedachte dat elk symbool alleen een letterlijk plaatje of begrip voorstelde en geen klank.",
        hint1: "💡 **Denktip:** Kijk naar de laatste twee zinnen van alinea 1: wat wordt daar *'Die hardnekkige misvatting'* genoemd?",
        hint2: "📝 **Uitleg:** Men dacht dat elk plaatje alleen een heel begrip uitbeeldde (beeldschrift), terwijl in alinea 3 blijkt dat het grotendeels een klankschrift is.",
        explanation: "De vooronderstelling dat hiërogliefen louter ideogrammen (beeldtekens) waren in plaats van klanktekens blokkeerde eeuwenlang de juiste oplossing."
      },
      {
        vraag: "Waarom was juist de Steen van Rosetta zo waardevol voor het onderzoek (alinea 2 en 3)?",
        opties: [
          "Omdat dezelfde tekst er in drie schriften op stond, waaronder het Oudgrieks dat geleerden al wél konden lezen.",
          "Omdat Champollion op de achterkant van de steen een compleet alfabet met uitleg aantrof.",
          "Omdat het de allereerste steen was waarop ooit hiërogliefen waren geschreven.",
          "Omdat Napoleon zelf de vertaling op de steen had laten aanbrengen voor zijn soldaten."
        ],
        correct: "Omdat dezelfde tekst er in drie schriften op stond, waaronder het Oudgrieks dat geleerden al wél konden lezen.",
        hint1: "💡 **Denktip:** Waarom noemt de schrijver het Oudgrieks in alinea 3 een *'spiekbriefje'*?",
        hint2: "📝 **Uitleg:** Doordat een bekende taal (Oudgrieks) dezelfde boodschap weergaf als het onbekende hiërogliefenschrift, kon men tekens en namen één op één vergelijken.",
        explanation: "De drietalige inscriptie maakte het mogelijk om vanuit het bekende Oudgrieks terug te redeneren naar het onbekende hiërogliefenschrift."
      },
      {
        vraag: "Welke rol speelden de zogenaamde *'cartouches'* (ovale ringen) bij de doorbraak van Champollion in alinea [3]?",
        opties: [
          "Daarin stonden koningsnamen zoals Ptolemaeus en Cleopatra, waardoor hij de klankwaarde van de losse tekens kon afleiden.",
          "Daarin stonden jaartallen vermeld waarmee de ouderdom van de steen kon worden berekend.",
          "De ovale ringen gaven aan welke zinnen in het Koptisch waren geschreven en welke in het Grieks.",
          "Het waren versieringen die lieten zien waar een nieuwe alinea in de tekst begon."
        ],
        correct: "Daarin stonden koningsnamen zoals Ptolemaeus en Cleopatra, waardoor hij de klankwaarde van de losse tekens kon afleiden.",
        hint1: "💡 **Denktip:** Eigennamen zoals *Cleopatra* klinken in elke taal bijna hetzelfde. Hoe hielp dat Champollion?",
        hint2: "📝 **Uitleg:** Door de Griekse letters van *Ptolemaeus* en *Cleopatra* te leggen naast de tekens in de ovale ringen, ontdekte hij welke klank bij welk symbool hoorde.",
        explanation: "De omringde koningsnamen vormden de sleutel om de klanken (zoals P, T, O, L) aan specifieke hiërogliefen te koppelen."
      },
      {
        vraag: "Waarom was Champollions kennis van de Koptische taal zo belangrijk (alinea 4)?",
        opties: [
          "Omdat het Koptisch voortkwam uit de oude Egyptische taal, waardoor hij na het verklanken ook de betekenis van de woorden kon begrijpen.",
          "Omdat de onderste helft van de Steen van Rosetta volledig in het Koptisch was opgesteld.",
          "Omdat alle Franse wetenschappers in de negentiende eeuw verplicht in het Koptisch met elkaar spraken.",
          "Omdat het Koptisch precies dezelfde beeldtekens van vogels en slangen gebruikte."
        ],
        correct: "Omdat het Koptisch voortkwam uit de oude Egyptische taal, waardoor hij na het verklanken ook de betekenis van de woorden kon begrijpen.",
        hint1: "💡 **Denktip:** Als je een vreemde taal alleen hardop kunt voorlezen (verklanken), weet je nog niet wat de woorden *betekenen*. Hoe loste het Koptisch dat op?",
        hint2: "📝 **Uitleg:** Koptisch stamde rechtstreeks af van het oude Egyptisch; zo kon hij de uitgesproken klanken koppelen aan hun woordbetekenis.",
        explanation: "Dankzij het verwante Koptisch kon Champollion de gereconstrueerde Egyptische klanken ook daadwerkelijk vertalen naar hun betekenis."
      },
      {
        vraag: "Wat wordt bedoeld met de beeldspraak in de laatste zin: *'veranderden de zwijgende stenen monumenten ... in sprekende getuigen'*?",
        opties: [
          "Doordat de teksten op de tempels en beelden eindelijk gelezen konden worden, gaven ze hun historische informatie prijs.",
          "In musea werden geluidsinstallaties geplaatst die de bezoekers toespraken.",
          "De stenen beelden bleken van binnen hol te zijn waardoor de wind er geluid in maakte.",
          "Egyptenaren begonnen na 1822 weer dagelijks hiërogliefen te gebruiken in kranten."
        ],
        correct: "Doordat de teksten op de tempels en beelden eindelijk gelezen konden worden, gaven ze hun historische informatie prijs.",
        hint1: "💡 **Denktip:** Stenen kunnen niet letterlijk praten. Waarom waren ze eerst 'zwijgend' en daarna 'sprekend'?",
        hint2: "📝 **Uitleg:** Zolang niemand het schrift kon lezen, 'zweeg' de geschiedenis op de muren; na de ontcijfering 'vertelden' de inscripties hun verhaal.",
        explanation: "De metafoor drukt uit dat de voorheen onbegrijpelijke inscripties door de ontcijfering weer leesbaar werden en inzicht gaven in het verleden."
      }
    ]
  },

  // ==========================================================================
  // OEFENTEKST 10: De Prijs van Fast Fashion (Economie & Duurzaamheid)
  // ==========================================================================
  {
    id: "oefen-10",
    titel: "De Prijs van Snelle Mode: Waarom een Goedkoop T-shirt Duur Betaald Wordt",
    thema: "Economie & Duurzaamheid",
    tekst: `[1] Vroeger brachten kledingmerken twee collecties per jaar uit: één voor de lente en zomer, en één voor de herfst en winter. Tegenwoordig liggen er in veel winkelketens en webshops vrijwel wekelijks compleet nieuwe kledingstukken in de schappen voor prijzen die soms lager zijn dan die van een broodje bij de bakker. Dit fenomeen heet *fast fashion* (snelle mode): razendsnel geproduceerde kleding die inspeelt op de allernieuwste trends op sociale media, maar na een paar keer dragen alweer uit de mode – of versleten – is.\n\n[2] Dat een T-shirt voor vijf euro over de toonbank kan gaan, lijkt een voordeel voor de portemonnee van de koper. Toch wordt de werkelijke prijs van dat shirt elders op de wereld betaald. Voor de productie van één enkel katoenen T-shirt is namelijk zo'n 2.700 liter zoet water nodig – evenveel als een mens in tweeënhalf jaar drinkt. Daarnaast worden er bij het verven van de stoffen vaak giftige chemicaliën gebruikt die in productielanden ongezuiverd in rivieren belanden, terwijl textielarbeiders onder zware omstandigheden werken voor een minimaal loon.\n\n[3] Bovendien kampt de wereld met een groeiende textielberg. Doordat goedkope kleding vaak wordt gemaakt van een mengsel van katoen en synthetische vezels zoals polyester (een soort plastic), is het achteraf uiterst lastig om de draden weer van elkaar te scheiden voor nieuwe kleding. Slechts minder dan één procent van alle afgedankte kleding wordt daadwerkelijk verwerkt tot een nieuw kledingstuk; het overgrote deel wordt verbrand of belandt op gigantische stortplaatsen in de Atacama-woestijn of in Afrika.\n\n[4] Sommige grote modeketens proberen hun imago op te poetsen door in de winkel een inleverbox te plaatsen en een 'bewuste collectie' aan te prijzen. Critici noemen dit echter vaak *greenwashing*: jezelf duurzamer voordoen dan je bent, terwijl de fabrieken ondertussen op volle toeren miljoenen wegwerp-kledingstukken blijven uitspuwen. De duurzaamste jas of broek is uiteindelijk niet degene met een groen reclamelabel, maar het kledingstuk dat van goede kwaliteit is en jarenlang met plezier wordt gedragen.`,
    vragen: [
      {
        vraag: "Wat bedoelt de schrijver in de titel en alinea [2] met de bewering dat een goedkoop T-shirt *'duur betaald wordt'*?",
        opties: [
          "De winkelprijs is weliswaar laag, maar de schade voor het milieu en de slechte werkomstandigheden van arbeiders zijn enorm hoog.",
          "De klant moet bij de kassa altijd nog hoge verborgen belastingen en verzendkosten bovenop de winkelprijs betalen.",
          "Goedkope T-shirts krimpen in de wasmachine, waardoor je elke week een nieuwe wasmachine moet kopen.",
          "Katoenboeren verdienen tegenwoordig veel meer geld dan de directeuren van grote modewinkels."
        ],
        correct: "De winkelprijs is weliswaar laag, maar de schade voor het milieu en de slechte werkomstandigheden van arbeiders zijn enorm hoog.",
        hint1: "💡 **Denktip:** Het woord 'prijs' wordt hier zowel letterlijk (vijf euro) als figuurlijk (de gevolgen voor mens en natuur) gebruikt.",
        hint2: "📝 **Uitleg:** In alinea 2 legt de auteur uit dat de *werkelijke prijs* bestaat uit 2.700 liter waterverbruik, vervuilde rivieren en onderbetaalde arbeid.",
        explanation: "De auteur speelt met de dubbele betekenis van 'prijs': financieel spotgoedkoop in de winkel, maar maatschappelijk en ecologisch zeer kostbaar."
      },
      {
        vraag: "Waarom noemt de schrijver in alinea [2] dat een mens in tweeënhalf jaar tijd 2.700 liter water drinkt?",
        opties: [
          "Om een abstract en groot getal voor de lezer voorstelbaar en indrukwekkend te maken.",
          "Om de lezer te waarschuwen dat mensen tijdens het winkelen veel meer water moeten drinken.",
          "Om te bewijzen dat katoenplanten alleen kunnen groeien in landen waar mensen weinig drinken.",
          "Om te laten zien dat het wassen van een T-shirt thuis 2.700 liter water per wasbeurt kost."
        ],
        correct: "Om een abstract en groot getal voor de lezer voorstelbaar en indrukwekkend te maken.",
        hint1: "💡 **Denktip:** Het getal '2.700 liter' zegt op zichzelf niet zoveel. Wat gebeurt er in je hoofd als je hoort dat je daar 2,5 jaar van kunt drinken?",
        hint2: "📝 **Uitleg:** Door de hoeveelheid te vergelijken met iets herkenbaars uit het dagelijks leven, beseft de lezer pas echt hoe gigantisch het waterverbruik is.",
        explanation: "De vergelijking met de menselijke drinkwaterbehoefte concretiseert het getal 2.700 liter en versterkt de overtuigingskracht."
      },
      {
        vraag: "Waardoor is het volgens alinea [3] zo moeilijk om van oude fast-fashionkleding weer nieuwe kleding te maken?",
        opties: [
          "Omdat de stoffen vaak bestaan uit een mix van natuurlijke katoen en synthetisch polyester die moeilijk te scheiden zijn.",
          "Omdat er in Europa geen machines bestaan die oude katoenen draden kunnen wassen.",
          "Omdat de giftige verfstoffen ervoor zorgen dat recyclingmachines direct vastlopen.",
          "Omdat mensen hun oude kleding bijna nooit inleveren maar op zolder laten liggen."
        ],
        correct: "Omdat de stoffen vaak bestaan uit een mix van natuurlijke katoen en synthetisch polyester die moeilijk te scheiden zijn.",
        hint1: "💡 **Denktip:** Lees de tweede zin van alinea 3 die begint met het redengevende woord *'Doordat'*.",
        hint2: "📝 **Uitleg:** Juist het mengsel van katoen en polyester maakt het technisch uiterst lastig om de vezels weer netjes uit elkaar te halen.",
        explanation: "De combinatie van verschillende vezelsoorten (katoen en kunststof) in één weefsel vormt een grote technische barrière voor hoogwaardige recycling."
      },
      {
        vraag: "Wat houdt het begrip *'greenwashing'* in alinea [4] precies in?",
        opties: [
          "Een bedrijf geeft zichzelf met kleine symbolische acties een milieuvriendelijk imago, terwijl de vervuilende kernactiviteit gewoon doorgaat.",
          "Het wassen van nieuwe kleding met milieuvriendelijke groene zeep voordat het in de winkel wordt gehangen.",
          "Het verven van kleding met natuurlijke plantenextracten in plaats van chemische verf.",
          "Het verplichten van klanten om hun oude kleding te ruilen voordat ze iets nieuws mogen kopen."
        ],
        correct: "Een bedrijf geeft zichzelf met kleine symbolische acties een milieuvriendelijk imago, terwijl de vervuilende kernactiviteit gewoon doorgaat.",
        hint1: "💡 **Denktip:** Lees de uitleg achter de dubbele punt na *'greenwashing'* in alinea 4.",
        hint2: "📝 **Uitleg:** Een inleverbox neerzetten lijkt groen, maar zolang het bedrijf op volle toeren wegwerpkleding blijft maken, is het slechts uiterlijke schijn.",
        explanation: "Greenwashing is het wekken van een misleidend duurzaam imago door marketing, terwijl de bedrijfsvoering in de kern vervuilend blijft."
      },
      {
        vraag: "Welke conclusie trekt de schrijver in de laatste zin van de tekst?",
        opties: [
          "Minder kopen en kiezen voor kwalitatieve kleding die lang meegaat is veel duurzamer dan het kopen van 'groene' fast fashion.",
          "Consumenten moeten alleen nog kleding kopen waar een groen reclamelabel aan hangt.",
          "Winkelketens moeten weer precies twee keer per jaar open zijn: in de lente en in de herfst.",
          "Kleding van 100% polyester is uiteindelijk het beste voor de natuur."
        ],
        correct: "Minder kopen en kiezen voor kwalitatieve kleding die lang meegaat is veel duurzamer dan het kopen van 'groene' fast fashion.",
        hint1: "💡 **Denktip:** Kijk naar de tegenstelling in de slotzin tussen 'een groen reclamelabel' en 'goede kwaliteit die jarenlang wordt gedragen'.",
        hint2: "📝 **Uitleg:** Echte duurzaamheid zit in een lange levensduur van kleding (*slow fashion*), niet in snelle wegwerpmode met een groen randje.",
        explanation: "De slotzin vat de boodschap krachtig samen: kwaliteit en langdurig gebruik winnen het altijd van marketinglabels."
      }
    ]
  }
];

module.exports = { oefenTekstenDeel1 };
