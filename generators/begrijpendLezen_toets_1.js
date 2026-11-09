// generators/begrijpendLezen_toets_1.js
// Toetsteksten 1 t/m 10 voor Toetsmodus (Puur Cito 2F Streefniveau - HAVO/VWO)
// Elke tekst telt 4 rijke alinea's en 5 diepgaande 2F-analysevragen.

const toetsTekstenDeel1 = [
  // ==========================================================================
  // TOETSTEKST 1: Toetanchamon - Wetenschap versus Sensatiezucht
  // ==========================================================================
  {
    id: "toets-1",
    titel: "Het Graf van Toetanchamon: Wetenschap versus Sensatiezucht",
    thema: "Geschiedenis & Media",
    tekst: `[1] Toen de Britse archeoloog Howard Carter in november 1922 in de Egyptische Vallei der Koningen op een verzegelde toegangsdeur onder het puin stuitte, verwachtte vrijwel niemand een wereldnieuwsfeit. Toetanchamon was immers een historisch onbeduidende farao die al rond zijn negentiende levensjaar stierf en slechts negen jaar regeerde. Juist die relatieve onbekendheid bleek achteraf zijn redding: terwijl de praalgraven van machtige farao's als Ramses II al in de oudheid systematisch door grafrovers waren leeggeplunderd, raakte de bescheiden rotsgraftombe van Toetanchamon al snel bedolven onder het steengruis van latere bouwwerkzaamheden.\n\n[2] Wat Carter achter de verzegelde muren aantrof, tartte elke beschrijving. Meer dan vijfduizend voorwerpen – van vergulde strijdwagens en ivoren bordspellen tot het tien kilo zware gouden dodenmasker – lagen nog exact zoals de priesters ze ruim drieëndertig eeuwen eerder hadden achtergelaten. Voor het eerst kregen egyptologen geen verminkte restanten te zien, maar een compleet en ongeschonden beeld van het koninklijke hofleven. Carter besloot dan ook om geen enkel voorwerp haastig naar buiten te dragen; het documenteren, fotograferen en conserveren van de inventaris zou hem uiteindelijk tien volle jaren kosten.\n\n[3] De internationale pers had voor die wetenschappelijke geduldigheid echter weinig begrip. Toen Carters geldschieter, Lord Carnarvon, enkele maanden na de opening van de grafkamer onverwacht overleed aan bloedvergiftiging na een ontstoken muggenbeet, grepen kranten dit gretig aan. Om de verkoopcijfers op te stuwen, verzonnen journalisten 'De Vloek van de Farao': een vermeende magische wraak op eenieder die de eeuwige rust van de koning verstoorde.\n\n[4] [ ... ] hield dat spannende verhaal bij nader onderzoek geen enkele stand. Uit statistisch onderzoek bleek dat de zeventwintig personen die bij het openen van de sarcofaag aanwezig waren gemiddeld ruim zeventig jaar oud werden – een destijds uitzonderlijk hoge leeftijd. Het contrast kon nauwelijks groter zijn: waar de kranten kozen voor vluchtige sensatie en bijgeloof, leverde Carters jarenlange precisiewerk een onschatbare bijdrage aan de geschiedschrijving.`,
    vragen: [
      {
        vraag: "Welke paradox (schijnbare tegenstrijdigheid) beschrijft de auteur in alinea [1]?",
        opties: [
          "Juist doordat Toetanchamon tijdens zijn leven een onbelangrijke vorst met een klein graf was, bleef zijn graf als enige gespaard en werd hij na zijn dood wereldberoemd.",
          "Hoewel Howard Carter jarenlang naar het graf van Ramses II zocht, vond hij bij toeval het graf van een nog machtigere farao.",
          "Grafrovers wisten precies waar het graf van Toetanchamon lag, maar lieten de gouden schatten uit eerbied voor de jonge koning liggen.",
          "De Egyptische arbeiders die latere graven bouwden, vernietigden per ongeluk de mooiste schatten van Toetanchamon."
        ],
        correct: "Juist doordat Toetanchamon tijdens zijn leven een onbelangrijke vorst met een klein graf was, bleef zijn graf als enige gespaard en werd hij na zijn dood wereldberoemd.",
        explanation: "De paradox in alinea 1 is dat zijn historische onbeduidendheid en bescheiden tombe ervoor zorgden dat het graf onder gruis verdween en aan grafrovers ontsnapte."
      },
      {
        vraag: "Waarom nam het leeghalen van het graf door Howard Carter volgens alinea [2] maar liefst tien jaar in beslag?",
        opties: [
          "Omdat Carter elk van de ruim vijfduizend voorwerpen eerst zorgvuldig wilde registreren, fotograferen en beschermen tegen verval.",
          "Omdat de Egyptische regering het graf na de dood van Lord Carnarvon negen jaar lang op slot liet zetten.",
          "Omdat de toegangsdeur van de grafkamer zo zwaar verzegeld was dat men slechts enkele centimeters per week kon graven.",
          "Omdat er voortdurend ruzie was met de internationale pers over wie de gouden strijdwagens mocht kopen."
        ],
        correct: "Omdat Carter elk van de ruim vijfduizend voorwerpen eerst zorgvuldig wilde registreren, fotograferen en beschermen tegen verval.",
        explanation: "Carter koos voor uiterste wetenschappelijke zorgvuldigheid (documenteren, fotograferen en conserveren) boven snelheid."
      },
      {
        vraag: "Op de plek van `[ ... ]` aan het begin van alinea [4] is een woordgroep of signaalwoord weggelaten. Welke optie past daar het best?",
        opties: [
          "Wetenschappelijk gezien",
          "Daarom",
          "Net zoals verwacht",
          "Bovendien"
        ],
        correct: "Wetenschappelijk gezien",
        explanation: "Alinea 4 ontkracht de krantenmythe uit alinea 3 aan de hand van statistisch onderzoek; 'Wetenschappelijk gezien' markeert deze tegenstelling tussen persmythe en feiten."
      },
      {
        vraag: "Met welk argument wordt het bestaan van 'De Vloek van de Farao' in alinea [4] definitief weerlegd?",
        opties: [
          "De mensen die daadwerkelijk bij de opening van de grafkist aanwezig waren, bereikten gemiddeld een voor die tijd zeer hoge leeftijd.",
          "Er werd op de muren van de grafkamer een hiërogliefentekst gevonden waarin stond dat de farao iedereen vergaf.",
          "Lord Carnarvon bleek nog helemaal nooit in Egypte of in de Vallei der Koningen te zijn geweest.",
          "De muggen in de Vallei der Koningen bleken geen ziektes te kunnen overbrengen op archeologen."
        ],
        correct: "De mensen die daadwerkelijk bij de opening van de grafkist aanwezig waren, bereikten gemiddeld een voor die tijd zeer hoge leeftijd.",
        explanation: "Het statistische gegeven dat de 27 aanwezigen gemiddeld ruim 70 jaar oud werden, haalt het idee van een dodelijke vloek volledig onderuit."
      },
      {
        vraag: "Hoe verhoudt de titel (*'Wetenschap versus Sensatiezucht'*) zich tot de opbouw van de tekst?",
        opties: [
          "Alinea 1 en 2 belichten de wetenschappelijke waarde en werkwijze van Carter, terwijl alinea 3 en 4 de sensatiezucht van de pers daartegenover zetten.",
          "De hele tekst laat zien dat archeologen net zo belust zijn op sensatie en roem als krantenjournalisten.",
          "Alinea 1 t/m 3 gaan uitsluitend over krantenartikelen en pas in de laatste zin komt de wetenschap ter sprake.",
          "De titel is ironisch bedoeld, omdat achteraf bleek dat de journalisten gelijk hadden over de vloek."
        ],
        correct: "Alinea 1 en 2 belichten de wetenschappelijke waarde en werkwijze van Carter, terwijl alinea 3 en 4 de sensatiezucht van de pers daartegenover zetten.",
        explanation: "De tekst is opgebouwd rond het contrast tussen Carters nauwgezette archeologie (alinea 1-2) en de door verkoopcijfers gedreven krantenmythe (alinea 3-4)."
      }
    ]
  },

  // ==========================================================================
  // TOETSTEKST 2: Zwermintelligentie bij Honingbijen
  // ==========================================================================
  {
    id: "toets-2",
    titel: "De Wiskunde van de Bijenkorf: Collectieve Intelligentie in de Natuur",
    thema: "Biologie & Systeemdenken",
    tekst: `[1] Wie één enkele honingbij afzonderlijk bestudeert, ziet een insect met een herseninhoud ter grootte van een sesamzaadje. Op zichzelf kan zo'n individuele bij geen ingewikkelde problemen oplossen of vooruitplannen. Maar zodra vijftigduizend bijen samenleven in één korf, ontstaat er iets opmerkelijks dat biologen *zwermintelligentie* noemen: het volk als geheel neemt beslissingen die vele malen slimmer zijn dan waartoe elk los individu in staat is.\n\n[2] Het bekendste voorbeeld van die samenwerking ontrafelde de Oostenrijkse Nobelprijswinnaar Karl von Frisch. Hij ontdekte dat speurbijen die een rijk bloemenveld hebben gevonden bij terugkomst in de pikdonkere kast een nauwkeurige 'kwispeldans' uitvoeren op de verticale honingraat. De hoek waaronder de bij omhoog of omlaag danst ten opzichte van de zwaartekracht, komt exact overeen met de vlieghoek ten opzichte van de zon buiten. Tegelijkertijd geeft de duur van het trillen met het achterlijf de vliegafstand aan. Zonder één geluid te maken, vertaalt de bij dus driedimensionale ruimte en afstand naar een wiskundige code.\n\n[3] Nog indrukwekkender wordt het wanneer een bijenvolk in het voorjaar op zoek moet naar een nieuwe woonplek. Tientallen verkenners vliegen dan in alle windrichtingen uit om geschikte boomholtes te inspecteren. Bij terugkomst danst elke verkenner voor haar eigen ontdekte plek: hoe ruimer, droger en veiliger de holte is, des te enthousiaster en langer zij danst. Andere bijen gaan vervolgens een kijkje nemen bij de meest aangeprezen locaties. Op die manier ontstaat een volstrekt democratisch debat zonder leider, waarbij na enkele uren vanzelf de allerbeste nestplek met algemene stemmen wint.\n\n[4] Juist omdat een bijenvolk zo sterk afhankelijk is van deze verfijnde communicatie, is het systeem uiterst kwetsbaar voor moderne landbouwgifstoffen zoals *neonicotinoïden*. Zelfs wanneer deze bestrijdingsmiddelen een bij niet direct doden, tasten ze het zenuwstelsel en het richtingsgevoel aan. Een verwarde speurbij die een onnauwkeurige dans uitvoert of de weg naar de korf niet meer terugvindt, brengt daarmee de voedselvoorziening van de hele kolonie in gevaar.`,
    vragen: [
      {
        vraag: "Wat wordt in alinea [1] bedoeld met het begrip *'zwermintelligentie'*?",
        opties: [
          "Het verschijnsel dat een grote groep samenwerkende dieren collectief tot slimme oplossingen komt die het denkvermogen van het enkele dier ver overstijgen.",
          "Het feit dat de koningin van een bijenvolk als enige grotere hersenen heeft en alle andere bijen bevelen geeft.",
          "De eigenschap dat insecten naarmate ze ouder worden steeds grotere hersenen ontwikkelen.",
          "Het vermogen van bijen om van andere insectensoorten zoals mieren en wespen te leren."
        ],
        correct: "Het verschijnsel dat een grote groep samenwerkende dieren collectief tot slimme oplossingen komt die het denkvermogen van het enkele dier ver overstijgen.",
        explanation: "Zwermintelligentie houdt in dat uit de interactie van vele simpele individuen een hoogwaardig, intelligent groepsgedrag ontstaat."
      },
      {
        vraag: "Hoe weet een bij die in de donkere korf de kwispeldans voelt in welke richting én hoe ver zij moet vliegen (alinea 2)?",
        opties: [
          "De danshoek op de verticale raat wijst de richting ten opzichte van de zon aan, en de tijdsduur van het kwispelen geeft de afstand weer.",
          "De dansende bij wijst met haar voelsprieten naar de uitgang en zoemt harder naarmate het veld dichterbij ligt.",
          "De geur van het stuifmeel op de poten geeft de afstand aan en de snelheid van het rondcirkelen bepaalt de vliegrichting.",
          "De bijen wachten tot de zon op de honingraat schijnt en volgen dan de schaduw van de speurbij."
        ],
        correct: "De danshoek op de verticale raat wijst de richting ten opzichte van de zon aan, en de tijdsduur van het kwispelen geeft de afstand weer.",
        explanation: "Volgens alinea 2 codeert de hoek ten opzichte van de zwaartekracht voor de richting t.o.v. de zon, en de duur van de trilling voor de afstand."
      },
      {
        vraag: "Waarom vergelijkt de schrijver het kiezen van een nieuwe woonplek in alinea [3] met *'een volstrekt democratisch debat zonder leider'*?",
        opties: [
          "Omdat verschillende verkenners met hun dans 'pleiten' voor hun voorstel en de meerderheid uiteindelijk op basis van kwaliteit de beste plek kiest.",
          "Omdat de mannetjesbijen (darren) om de beurt mogen stemmen over wat de koningin heeft besloten.",
          "Omdat alle vijftigduizend bijen eerst tegelijk alle boomholtes in het bos moeten bezoeken voordat ze verhuizen.",
          "Omdat bijen die het niet eens zijn met de gekozen boomholte zich afsplitsen en een eigen volk beginnen."
        ],
        correct: "Omdat verschillende verkenners met hun dans 'pleiten' voor hun voorstel en de meerderheid uiteindelijk op basis van kwaliteit de beste plek kiest.",
        explanation: "De metafoor verwijst naar het proces waarbij meerdere opties worden voorgedragen, gecontroleerd door soortgenoten en op basis van kwaliteit een meerderheid verwerven zonder centrale leider."
      },
      {
        vraag: "Waarom zijn lage doses *neonicotinoïden* volgens alinea [4] zelfs gevaarlijk als de bijen er niet direct aan doodgaan?",
        opties: [
          "Omdat het gif het oriëntatievermogen en zenuwstelsel verstoort, waardoor de communicatie en voedselvoorziening van het hele volk spaak lopen.",
          "Omdat de bloemen door het gif geen nectar en stuifmeel meer kunnen aanmaken.",
          "Omdat de bijen door het middel agressief worden en elkaar in de korf aanvallen.",
          "Omdat de honingraat door het bestrijdingsmiddel smelt en naar beneden valt."
        ],
        correct: "Omdat het gif het oriëntatievermogen en zenuwstelsel verstoort, waardoor de communicatie en voedselvoorziening van het hele volk spaak lopen.",
        explanation: "Omdat het bijenvolk leunt op uiterst precieze navigatie en danscommunicatie, ondermijnt aantasting van het zenuwstelsel het voortbestaan van de gehele kolonie."
      },
      {
        vraag: "Welk verband bestaat er tussen alinea [2] en [3] enerzijds en alinea [4] anderzijds?",
        opties: [
          "Alinea 2 en 3 tonen hoe nauwkeurig het communicatiesysteem van bijen werkt; alinea 4 laat zien waarom juist die afhankelijkheid hen zo kwetsbaar maakt voor zenuwgif.",
          "Alinea 2 en 3 beschrijven het gedrag van wilde bijen in Oostenrijk; alinea 4 gaat over tamme bijen in Nederland.",
          "Alinea 2 en 3 geven de mening van biologen weer; alinea 4 weerlegt die mening met argumenten van boeren.",
          "Alinea 2 en 3 beschrijven een probleem in de natuur; alinea 4 presenteert een chemische oplossing."
        ],
        correct: "Alinea 2 en 3 tonen hoe nauwkeurig het communicatiesysteem van bijen werkt; alinea 4 laat zien waarom juist die afhankelijkheid hen zo kwetsbaar maakt voor zenuwgif.",
        explanation: "De eerste zin van alinea 4 ('Juist omdat een bijenvolk zo sterk afhankelijk is van deze verfijnde communicatie...') legt de causale schakel tussen de werking (2-3) en de kwetsbaarheid (4)."
      }
    ]
  },

  // ==========================================================================
  // TOETSTEKST 3: De Antieke Olympische Spelen: Mythe vs. Werkelijkheid
  // ==========================================================================
  {
    id: "toets-3",
    titel: "De Antieke Olympische Spelen: Politiek en Prestige Onder het Mom van Vrede",
    thema: "Geschiedenis & Maatschappij",
    tekst: `[1] Bij de opening van de moderne Olympische Spelen wordt steevast een romantisch beeld opgeroepen van de Griekse oudheid: edelmoedige amateursportlieden die vanaf 776 voor Christus in broederlijke harmonie hun krachten maten, gedreven door de gedachte dat meedoen belangrijker is dan winnen. Historici die de antieke bronnen bestuderen, schetsen echter een aanzienlijk rauwer en politieker portret. Voor de oude Grieken draaide het in Olympia maar om één ding: winnen en de eer van de eigen stadstaat (*polis*) vergroten.\n\n[2] Weliswaar werd voorafgaand aan het toernooi de 'heilige wapenstilstand' (*ekecheiria*) afgekondigd, maar dat betekende geenszins dat alle oorlogen in de Griekse wereld stopten. De afspraak hield uitsluitend in dat het heiligdom van Olympia neutraal terrein bleef en dat reizende atleten en pelgrims onderweg niet mochten worden aangevallen. Zodra de Spelen voorbij waren, zetten rivaliserende stadstaten als Athene, Sparta en Korinthe hun gewapende conflicten op het slagveld onverminderd voort; het stadion fungeerde in vredestijd simpelweg als een vervangend strijdperk.\n\n[3] Ook in het stadion zelf was van ons moderne begrip *fair play* of gelijke behandeling weinig sprake. Gehuwde vrouwen mochten op straffe van de dood niet eens op de tribunes plaatsnemen. En hoewel het beroemde olympische motto *'Meedoen is belangrijker dan winnen'* vaak aan de oude Grieken wordt toegeschreven, is het in werkelijkheid pas eind negentiende eeuw bedacht bij de oprichting van de moderne Spelen. In het antieke Griekenland bestond er geen zilveren of bronzen prijs: alleen de winnaar kreeg de heilige olijfkrans. Verliezers slopen na afloop vaak via achterafstraatjes hun geboortestad binnen om aan de hoon van hun stadsgenoten te ontkomen.\n\n[4] Bovendien waren de antieke topatleten allesbehalve onbetaalde liefhebbers. Hoewel zij in Olympia zelf slechts een bladerkrans ontvingen, wachtten hen in hun vaderstad vorstelijke beloningen: van vrijstelling van belastingen en levenslange gratis maaltijden op kosten van de staat tot geldbedragen die overeenkwamen met meerdere jaarsalarissen van een soldaat. De oude Spelen vormen daarmee geen tegenpool van de hedendaagse topsport, maar juist haar spiegelbeeld.`,
    vragen: [
      {
        vraag: "Welk tekstdoel heeft de schrijver met deze tekst?",
        opties: [
          "Het ontkrachten van een aantal hardnekkige, geïdealiseerde mythes over de antieke Olympische Spelen aan de hand van historische feiten.",
          "Het bewijzen dat de moderne Olympische Spelen moeten worden afgeschaft omdat er te veel geld in omgaat.",
          "Het geven van een overzicht van alle sportonderdelen die tussen 776 voor Christus en de negentiende eeuw zijn beoefend.",
          "Het overtuigen van de lezer dat de oude Grieken veel eerlijker en vredelievender waren dan moderne topsporters."
        ],
        correct: "Het ontkrachten van een aantal hardnekkige, geïdealiseerde mythes over de antieke Olympische Spelen aan de hand van historische feiten.",
        explanation: "In elke alinea plaatst de auteur een populair, romantisch idee over de antieke Spelen tegenover de veel hardere historische realiteit."
      },
      {
        vraag: "Hoe nuanceert de schrijver in alinea [2] het populaire beeld van de 'Olympische vrede' (*ekecheiria*)?",
        opties: [
          "De wapenstilstand gold niet als algehele wereldvrede, maar bood alleen een vrije doortocht voor reizigers naar en van het neutrale Olympia.",
          "De Griekse stadstaten hielden zich nooit aan de afspraak en vochten tijdens de wedstrijden gewoon in het stadion door.",
          "Alleen de stadstaten Athene en Sparta deden mee aan de wapenstilstand, terwijl Korinthe bleef aanvallen.",
          "De wapenstilstand duurde maar één middag en gold alleen voor de scheidsrechters."
        ],
        correct: "De wapenstilstand gold niet als algehele wereldvrede, maar bood alleen een vrije doortocht voor reizigers naar en van het neutrale Olympia.",
        explanation: "Alinea 2 legt uit dat oorlogen niet stopten, maar dat slechts de reisroute van atleten/pelgrims en het terrein van Olympia tijdelijk onschendbaar waren."
      },
      {
        vraag: "Wat bedoelt de schrijver aan het einde van alinea [2] met de uitspraak dat het stadion fungeerde als *'een vervangend strijdperk'*?",
        opties: [
          "De vijandige stadstaten zetten hun onderlinge rivaliteit en machtsstrijd tijdens de Spelen voort via de sportwedstrijden.",
          "De atleten moesten tijdens het hardlopen en worstelen hun volledige militaire wapenuitrusting dragen.",
          "Het publiek op de tribunes ging regelmatig met elkaar op de vuist over de beslissingen van de jury.",
          "Na afloop van de sportwedstrijden werd het stadion gebruikt om het leger te laten oefenen."
        ],
        correct: "De vijandige stadstaten zetten hun onderlinge rivaliteit en machtsstrijd tijdens de Spelen voort via de sportwedstrijden.",
        explanation: "Politiek prestige en rivaliteit tussen de stadstaten verplaatsten zich van het oorlogsslagveld naar de sportarena."
      },
      {
        vraag: "Waarom noemt de schrijver in alinea [3] het feit dat verliezers na afloop *'via achterafstraatjes hun geboortestad binnen slopen'*?",
        opties: [
          "Om te onderbouwen dat de gedachte 'meedoen is belangrijker dan winnen' totaal niet gold voor de oude Grieken.",
          "Om te laten zien dat de wegen in Griekse steden na de zomerse Spelen te druk waren voor strijdwagens.",
          "Om uit te leggen waarom atleten bang waren voor dieven die hun zilveren en bronzen prijzen wilden stelen.",
          "Om aan te tonen dat sporters uit bescheidenheid geen aandacht van hun stadsgenoten wilden."
        ],
        correct: "Om te onderbouwen dat de gedachte 'meedoen is belangrijker dan winnen' totaal niet gold voor de oude Grieken.",
        explanation: "De schaamte van de verliezers en de hoon van stadsgenoten vormen het bewijs dat alleen de overwinning telde."
      },
      {
        vraag: "Waarom concludeert de schrijver aan het slot van alinea [4] dat de antieke Spelen *'geen tegenpool van de hedendaagse topsport, maar juist haar spiegelbeeld'* vormen?",
        opties: [
          "Omdat de antieke Spelen net als de moderne topsport draaiden om nationale trots, felle winstdrang en grote financiële beloningen.",
          "Omdat de oude Grieken precies dezelfde sportregels en gelijke rechten voor mannen en vrouwen hanteerden als wij nu.",
          "Omdat moderne sporters tegenwoordig ook geen medailles meer krijgen, maar alleen een olijfkrans.",
          "Omdat zowel vroeger als nu alle oorlogen in de wereld tijdens de Olympische Spelen worden stilgelegd."
        ],
        correct: "Omdat de antieke Spelen net als de moderne topsport draaiden om nationale trots, felle winstdrang en grote financiële beloningen.",
        explanation: "Wie door de romantische mythe heen prikt, ziet dat antieke atleten net als moderne profs streden om prestige, roem en enorme geldelijke beloningen."
      }
    ]
  },

  // ==========================================================================
  // TOETSTEKST 4: De Architectuur van de Slaap & Het Glymfatisch Systeem
  // ==========================================================================
  {
    id: "toets-4",
    titel: "De Nachtelijke Schoonmaakdienst: Waarom Ons Brein Niet Kan Zonder Slaap",
    thema: "Neurowetenschap & Gezondheid",
    tekst: `[1] Vanuit evolutionair oogpunt lijkt slaap op het eerste gezicht een onbegrijpelijke vergissing van de natuur. Een slapend dier kan immers geen voedsel zoeken, geen soortgenoten beschermen en is urenlang een weerloze prooi voor roofdieren. Als slaap louter bedoeld was om onze spieren even te laten uitrusten, had een uurtje stil op een tak of in een hol liggen ook volstaan. Het feit dat vrijwel elk dier op aarde – van fruitvliegjes en octopussen tot walvissen en mensen – desondanks een derde van zijn leven slapend doorbrengt, bewijst dat er tijdens de slaap onmisbare processen plaatsvinden die niet kunnen plaatsvinden terwijl we wakker zijn.\n\n[2] Een van die cruciale functies werd pas in 2013 ontdekt door de Deense neurowetenschapper Maiken Nedergaard. Overdag verbruiken onze miljarden hersencellen gigantische hoeveelheden energie, waarbij microscopische afvalstoffen – waaronder beschadigde eiwitten – achterblijven tussen de cellen. In de rest van ons lichaam voert het lymfestelsel dergelijk celafval voortdurend af, maar de hersenen zijn daar uit veiligheidsoverwegingen van afgesloten. Nedergaard ontdekte dat het brein een eigen, nachtelijk spoelsysteem bezit: het *glymfatische systeem*.\n\n[3] Zodra we in een diepe slaap vallen, krimpen de steuncellen in onze hersenen tijdelijk met zo'n zestig procent. Daardoor ontstaan er bredere kanaaltjes tussen de hersencellen, waar hersenvocht als een soort vaatwasser met hoge snelheid doorheen spoelt om alle opgehoopte afvalstoffen van de dag weg te wassen. Dit proces kan niet overdag plaatsvinden, simpelweg omdat een brein niet tegelijkertijd op volle toeren informatie kan verwerken én zichzelf grondig kan schoonspoelen.\n\n[4] Naast deze fysieke reiniging tijdens de diepe slaap zorgt de daaropvolgende *REM-slaap* (de droomslaap) voor het mentale onderhoud. In die fase legt de hippocampus nieuwe verbindingen aan tussen wat je die dag op school hebt geleerd en de kennis die je al bezat. Wie structureel te laat gaat slapen en zichzelf een uur slaap ontzegt, levert dus niet zomaar wat rust in, maar onderbreekt zowel de vuilnisdienst als de bibliothecaris van zijn eigen hersenen.`,
    vragen: [
      {
        vraag: "Waarom noemt de schrijver slaap in de eerste zin van alinea [1] *'op het eerste gezicht een onbegrijpelijke vergissing van de natuur'*?",
        opties: [
          "Omdat slapen een dier urenlang kwetsbaar en inactief maakt, wat in de natuur alleen verklaarbaar is als het een nog veel groter voordeel oplevert.",
          "Omdat de meeste wilde dieren in de natuur door stress helemaal nooit in slaap kunnen vallen.",
          "Omdat wetenschappers hebben aangetoond dat mensen ook prima zonder slaap kunnen overleven als ze stil blijven liggen.",
          "Omdat fruitvliegjes en walvissen hun hersenen tijdens het slapen definitief beschadigen."
        ],
        correct: "Omdat slapen een dier urenlang kwetsbaar en inactief maakt, wat in de natuur alleen verklaarbaar is als het een nog veel groter voordeel oplevert.",
        explanation: "De auteur gebruikt deze schijnbare tegenstrijdigheid (evolutionair risico van weerloosheid) om te bewijzen hoe vitaal de functies van slaap moeten zijn."
      },
      {
        vraag: "Hoe werkt het door Maiken Nedergaard ontdekte *glymfatische systeem* (alinea 2 en 3)?",
        opties: [
          "Tijdens de diepe slaap krimpen steuncellen in het brein, zodat hersenvocht door de vrijgekomen ruimte de opgehoopte afvalstoffen kan wegspoelen.",
          "Overdag tijdens het sporten pompt het hart extra bloed door de hersenen om beschadigde eiwitten te verbranden.",
          "Tijdens het dromen geven de hersencellen elektrische schokjes af die het afval vernietigen.",
          "Het gewone lymfestelsel van het lichaam neemt 's nachts de taak van de hersenen over."
        ],
        correct: "Tijdens de diepe slaap krimpen steuncellen in het brein, zodat hersenvocht door de vrijgekomen ruimte de opgehoopte afvalstoffen kan wegspoelen.",
        explanation: "In alinea 3 wordt uitgelegd dat het krimpen van steuncellen met 60% ruimte creëert waardoor hersenvocht afvalstoffen wegspoelt."
      },
      {
        vraag: "Waarom kan deze 'nachtelijke schoonmaak' volgens alinea [3] niet gewoon overdag plaatsvinden terwijl we wakker zijn?",
        opties: [
          "Omdat de hersenen niet tegelijkertijd actief prikkels en informatie kunnen verwerken én hun celstructuur kunnen laten krimpen voor het doorspoelen.",
          "Omdat het lichaam overdag al het beschikbare vocht nodig heeft voor de spijsvertering en de spieren.",
          "Omdat zonlicht ervoor zorgt dat de aanmaak van hersenvocht volledig wordt stilgelegd.",
          "Omdat we overdag rechtop lopen, waardoor het hersenvocht door de zwaartekracht naar beneden zakt."
        ],
        correct: "Omdat de hersenen niet tegelijkertijd actief prikkels en informatie kunnen verwerken én hun celstructuur kunnen laten krimpen voor het doorspoelen.",
        explanation: "Alinea 3 stelt expliciet dat actieve informatieverwerking en het fysieke spoelproces elkaar uitsluiten."
      },
      {
        vraag: "Waarin verschilt de functie van de *diepe slaap* van de functie van de *REM-slaap* volgens alinea [3] en [4]?",
        opties: [
          "De diepe slaap zorgt voor het fysiek wegspoelen van chemische afvalstoffen, terwijl de REM-slaap zorgt voor het ordenen en opslaan van kennis in het geheugen.",
          "De diepe slaap vindt alleen aan het einde van de ochtend plaats, terwijl de REM-slaap meteen na het inslapen begint.",
          "Tijdens de diepe slaap leert het brein nieuwe schoolvakken, terwijl tijdens de REM-slaap de spieren in de benen worden hersteld.",
          "De diepe slaap komt alleen voor bij mensen, terwijl de REM-slaap alleen voorkomt bij zoogdieren in de oceaan."
        ],
        correct: "De diepe slaap zorgt voor het fysiek wegspoelen van chemische afvalstoffen, terwijl de REM-slaap zorgt voor het ordenen en opslaan van kennis in het geheugen.",
        explanation: "Alinea 3 en 4 maken onderscheid tussen de fysieke reiniging (diepe slaap) en het mentale geheugenonderhoud door de hippocampus (REM-slaap)."
      },
      {
        vraag: "Waar verwijzen de twee metaforen *'de vuilnisdienst'* en *'de bibliothecaris'* in de slotzin van alinea [4] respectievelijk naar?",
        opties: [
          "'De vuilnisdienst' verwijst naar het glymfatische spoelsysteem (diepe slaap) en 'de bibliothecaris' naar het ordenen van herinneringen door de hippocampus (REM-slaap).",
          "'De vuilnisdienst' verwijst naar het vergeten van nare dromen en 'de bibliothecaris' naar het lezen van een boek voor het slapengaan.",
          "'De vuilnisdienst' verwijst naar het lymfestelsel in de armen en benen en 'de bibliothecaris' naar de leraar op school.",
          "Beide woorden verwijzen naar de ontdekking van Maiken Nedergaard uit 2013."
        ],
        correct: "'De vuilnisdienst' verwijst naar het glymfatische spoelsysteem (diepe slaap) en 'de bibliothecaris' naar het ordenen van herinneringen door de hippocampus (REM-slaap).",
        explanation: "De slotzin vat beide hoofdfuncties beeldend samen: de vuilnisdienst = afvalstoffen opruimen (alinea 2-3); de bibliothecaris = kennis archiveren en koppelen (alinea 4)."
      }
    ]
  },

  // ==========================================================================
  // TOETSTEKST 5: De Zuiderzeewerken: Ingenieurskunst met een Keerzijde
  // ==========================================================================
  {
    id: "toets-5",
    titel: "De Zuiderzeewerken: Een Triomf van Ingenieurskunst met een Keerzijde",
    thema: "Geschiedenis & Waterbouwkunde",
    tekst: `[1] Wie vandaag over de tweeëndertig kilometer lange Afsluitdijk van Noord-Holland naar Friesland rijdt, ziet aan de ene kant de zoute Waddenzee en aan de andere kant het zoete IJsselmeer. Dit monumentale bouwwerk vormt het sluitstuk van een eeuwenlange strijd tegen de 'waterwolf'. Tot in het begin van de twintigste eeuw drong de grillige Zuiderzee bij elke zware noordwesterstorm diep het hart van Nederland binnen. Pas toen bij de watersnoodramp van 1916 grote delen van Noord-Holland onderliepen en tegelijkertijd tijdens de Eerste Wereldoorlog voedselschaarste dreigde, gaf het parlement groen licht voor het gedurfde ontwerp van ingenieur en minister Cornelis Lely.\n\n[2] Lely's plan sloeg twee vliegen in één klap. Door de zeearm met een machtige dam af te sluiten, werd de kustlijn van Nederland met honderden kilometers verkort, waardoor het overstromingsgevaar voor het achterland drastisch afnam. Tegelijkertijd kon een groot deel van de afgesloten binnenzee worden drooggelegd tot vruchtbare polders – de Wieringermeer, de Noordoostpolder en Flevoland – die honderdduizenden hectaren nieuwe landbouwgrond en woonruimte opleverden.\n\n[3] Toch ging deze wereldberoemde triomf van de Nederlandse waterbouwkunde gepaard met een hoge menselijke en ecologische prijs die in de geschiedenisboeken lange tijd onderbelicht bleef. Met het dichten van het laatste sluitgat in mei 1932 veranderde het brakke en zoute ecosysteem binnen enkele jaren in een zoetwaterbak. De rijke populaties Zuiderzeeharing en ansjovis stierven uit, waarmee ook het eeuwenoude bestaan van duizenden vissersgezinnen in plaatsen als Urk, Volendam en Spakenburg van de ene op de andere dag werd weggevaagd.\n\n[4] Bovendien vormde de dichte dijk decennialang een onneembare muur voor trekvissen zoals de steur, de zalm en de paling, die voor hun voortplanting tussen zee en rivier moeten kunnen zwemmen. Om die historische weeffout te herstellen, is bij Kornwerderzand onlangs de *Vismigratierivier* aangelegd: een vernuftige, kronkelende opening dwars door de Afsluitdijk waarmee vissen op het ritme van eb en vloed weer naar binnen kunnen zwemmen, zonder dat het achterland zijn veiligheid verliest. Waar de twintigste eeuw de natuur met beton bedwong, zoekt de eenentwintigste eeuw naar verbinding.`,
    vragen: [
      {
        vraag: "Welke twee historische gebeurtenissen gaven in 1916 de doorslag om het plan van Cornelis Lely eindelijk goed te keuren (alinea 1)?",
        opties: [
          "Een zware overstromingsramp rond de Zuiderzee in combinatie met dreigende voedseltekorten tijdens de Eerste Wereldoorlog.",
          "De uitvinding van gewapend beton en de komst van de eerste vrachtauto's in Nederland.",
          "Het uitsterven van de haring in de Noordzee en de werkloosheid onder vissers op Urk.",
          "Een oorlog tussen Friesland en Noord-Holland over de scheepvaartroutes op de Waddenzee."
        ],
        correct: "Een zware overstromingsramp rond de Zuiderzee in combinatie met dreigende voedseltekorten tijdens de Eerste Wereldoorlog.",
        explanation: "Alinea 1 noemt expliciet de combinatie van de watersnoodramp van 1916 (veiligheid) en de dreigende voedselschaarste tijdens WO I (behoefte aan landbouwgrond)."
      },
      {
        vraag: "Hoe sloot de uitspraak *'Lely's plan sloeg twee vliegen in één klap'* (alinea 2) precies aan bij de twee problemen uit alinea [1]?",
        opties: [
          "De Afsluitdijk bood bescherming tegen stormvloeden, en het inpolderen leverde grote oppervlakten vruchtbare landbouwgrond op voor voedselproductie.",
          "De dijk zorgde voor zowel een spoorlijn als een autosnelweg tussen Noord-Holland en Friesland.",
          "Het project gaf werk aan zowel dijkbouwers uit het noorden als vissers uit Volendam.",
          "Het IJsselmeer leverde zowel zoet drinkwater als zout zeewater voor de industrie."
        ],
        correct: "De Afsluitdijk bood bescherming tegen stormvloeden, en het inpolderen leverde grote oppervlakten vruchtbare landbouwgrond op voor voedselproductie.",
        explanation: "De twee doelen uit alinea 2 (kortere, veilige kustlijn + nieuwe landbouwpolders) beantwoorden exact aan de twee crisissen uit alinea 1 (watersnood + voedselschaarste)."
      },
      {
        vraag: "Welke functie hebben alinea [3] en het begin van alinea [4] binnen de tekst?",
        opties: [
          "Ze belichten de keerzijde van het project door de maatschappelijke schade voor de vissers en de ecologische schade voor het waterleven te beschrijven.",
          "Ze bewijzen dat het bouwen van de Afsluitdijk achteraf gezien een zinloze vergissing was die geen enkele veiligheid opleverde.",
          "Ze leggen uit waarom Flevoland de jongste en vruchtbaarste provincie van Nederland is geworden.",
          "Ze beschrijven hoe stoombaggermolens in 1932 het laatste gat in de dijk hebben gedicht."
        ],
        correct: "Ze belichten de keerzijde van het project door de maatschappelijke schade voor de vissers en de ecologische schade voor het waterleven te beschrijven.",
        explanation: "Na de lof voor het ingenieurswerk in alinea 2 presenteren alinea 3 en 4 de schaduwzijde: de ondergang van de zoutwatervisserij en de blokkade voor trekvissen."
      },
      {
        vraag: "Wat bedoelt de schrijver in alinea [4] met *'die historische weeffout'*?",
        opties: [
          "Het feit dat de ontwerpers van de Afsluitdijk destijds geen rekening hielden met de noodzakelijke doorgang voor trekvissen tussen zee en rivier.",
          "Een bouwfout in de sluizen bij Kornwerderzand waardoor er bij storm te veel zout water naar binnen lekte.",
          "Het besluit om de provincie Flevoland in drie losse polders op te delen in plaats van één grote polder.",
          "Het gebruik van basaltstenen die niet bestand bleken tegen de golven van de Waddenzee."
        ],
        correct: "Het feit dat de ontwerpers van de Afsluitdijk destijds geen rekening hielden met de noodzakelijke doorgang voor trekvissen tussen zee en rivier.",
        explanation: "'Die historische weeffout' verwijst terug naar de eerste zin van alinea 4: de volledige ecologische afsluiting voor trekvissen zoals zalm, steur en paling."
      },
      {
        vraag: "Welke ontwikkeling vat de schrijver samen in de slotzin: *'Waar de twintigste eeuw de natuur met beton bedwong, zoekt de eenentwintigste eeuw naar verbinding'*?",
        opties: [
          "Een verschuiving in het denken over waterbeheer: van het hard buitensluiten van de natuur naar het slim combineren van waterveiligheid en natuurherstel.",
          "Het vervangen van alle betonnen dijken in Nederland door houten bruggen.",
          "Het voornemen om de Afsluitdijk in de eenentwintigste eeuw volledig af te breken zodat de Zuiderzee terugkeert.",
          "De overgang van scheepvaart over het water naar autoverkeer over de dijk."
        ],
        correct: "Een verschuiving in het denken over waterbeheer: van het hard buitensluiten van de natuur naar het slim combineren van waterveiligheid en natuurherstel.",
        explanation: "De slotzin contrasteert het 20e-eeuwse ingenieursdenken (de natuur dwingen/afsluiten) met het 21e-eeuwse streven naar harmonie tussen veiligheid en ecologie (zoals de Vismigratierivier)."
      }
    ]
  },

  // ==========================================================================
  // TOETSTEKST 6: De Fermi-paradox & Exoplaneten
  // ==========================================================================
  {
    id: "toets-6",
    titel: "De Fermi-paradox: Als het Heelal Zo Groot Is, Waar Is Iedereen Dan?",
    thema: "Sterrenkunde & Wetenschapsfilosofie",
    tekst: `[1] Alleen al ons eigen sterrenstelsel, de Melkweg, telt naar schatting tweehonderd tot vierhonderd miljard sterren. Dankzij ruimtetelescopen zoals Kepler en James Webb weten astronomen inmiddels dat vrijwel elke ster wordt omringd door planeten, en dat miljarden van die zogeheten *exoplaneten* zich in de 'bewoonbare zone' bevinden waar vloeibaar water mogelijk is. Bovendien is ons heelal ruim dertienenhalf miljard jaar oud, terwijl onze aarde pas viereneenhalf miljard jaar bestaat. Statistisch gezien hadden talloze buitenaardse beschavingen dus miljoenen jaren voorsprong moeten hebben om ruimtevaart en radiocommunicatie te ontwikkelen.\n\n[2] Toch heerst er in de kosmos een oorverdovende stilte. Ondanks decennia van luisteren met gigantische radiotelescopen hebben we nog nooit één buitenaards signaal, ruimtesonde of ander spoor van intelligent leven opgevangen. Toen de Italiaans-Amerikaanse natuurkundige Enrico Fermi zich in 1950 tijdens een lunchgesprek met collega's over deze tegenstrijdigheid boog, stelde hij de beroemde vraag: *"Waar is iedereen dan?"* Dit raadsel tussen de enorme statistische waarschijnlijkheid van buitenaards leven en het totale gebrek aan bewijs ervoor staat sindsdien bekend als de *Fermi-paradox*.\n\n[3] Wetenschappers hebben uiteenlopende verklaringen voor deze paradox bedacht. Een eerste groep onderzoekers denkt dat intelligent leven veel zeldzamer is dan we aannemen. Volgens hun theorie van het *'Grote Filter'* is de stap van eencellige bacteriën naar complexe, intelligente wezens een biologische loterij met een bijna onmogelijk kleine winkans. Een andere, somberdere variant van het Grote Filter stelt dat technologische beschavingen wél ontstaan, maar zichzelf vrijwel altijd vernietigen – bijvoorbeeld door kernwapens of uitputting van hun planeet – voordat zij in staat zijn om naar andere sterren te reizen.\n\n[4] Er bestaan echter ook minder dramatische verklaringen. De kosmische afstanden zijn zo onvoorstelbaar groot dat een radiosignaal er duizenden jaren over doet om een klein deel van de Melkweg te doorkruisen. Misschien zoeken wij wel met totaal verouderde techniek: luisteren naar radiogolven terwijl geavanceerde beschavingen op een heel andere manier communiceren, is zoiets als midden in een moderne stad speuren naar rooksignalen. Zolang de stilte voortduurt, dwingt de Fermi-paradox ons in elk geval om zuinig te zijn op de enige bewoonde oase die we met zekerheid kennen: onze eigen aarde.`,
    vragen: [
      {
        vraag: "Waarom noemt de schrijver in alinea [1] dat het heelal dertienenhalf miljard jaar oud is en de aarde pas viereneenhalf miljard jaar?",
        opties: [
          "Om te onderbouwen dat op oudere planeten beschavingen al veel eerder hadden kunnen ontstaan en dus technisch veel verder ontwikkeld zouden moeten zijn dan wij.",
          "Om te bewijzen dat de aarde de allereerste planeet in de Melkweg was waarop vloeibaar water voorkwam.",
          "Om uit te leggen waarom de ruimtetelescopen Kepler en James Webb niet voorbij ons eigen zonnestelsel kunnen kijken.",
          "Om te laten zien dat sterren gemiddeld na viereneenhalf miljard jaar uitdoven."
        ],
        correct: "Om te onderbouwen dat op oudere planeten beschavingen al veel eerder hadden kunnen ontstaan en dus technisch veel verder ontwikkeld zouden moeten zijn dan wij.",
        explanation: "Het leeftijdsverschil van 9 miljard jaar ondersteunt het argument dat eventuele andere beschavingen miljoenen jaren voorsprong gehad zouden hebben."
      },
      {
        vraag: "Wat houdt de *Fermi-paradox* volgens alinea [1] en [2] precies in?",
        opties: [
          "De spanning tussen de enorme rekenkundige kans op het bestaan van buitenaardse beschavingen enerzijds en het volledige ontbreken van elk waarneembaar spoor daarvan anderzijds.",
          "Het verschijnsel dat radiogolven in de ruimte sneller reizen dan het licht van verre sterren.",
          "De onenigheid tussen Enrico Fermi en andere natuurkundigen over de bouw van de James Webb-telescoop.",
          "Het feit dat vloeibaar water op exoplaneten alleen voorkomt als een planeet heel dicht bij haar ster staat."
        ],
        correct: "De spanning tussen de enorme rekenkundige kans op het bestaan van buitenaardse beschavingen enerzijds en het volledige ontbreken van elk waarneembaar spoor daarvan anderzijds.",
        explanation: "De laatste zin van alinea 2 definieert de Fermi-paradox als de botsing tussen de hoge statistische waarschijnlijkheid en het totale gebrek aan waargenomen bewijs."
      },
      {
        vraag: "Waarin verschillen de twee varianten van de theorie van het *'Grote Filter'* die in alinea [3] worden besproken?",
        opties: [
          "De eerste variant legt de drempel in het verleden (intelligent leven ontstaat bijna nooit), terwijl de tweede variant de drempel in de toekomst legt (beschavingen vernietigen zichzelf).",
          "De eerste variant gaat ervan uit dat buitenaardse wezens vreedzaam zijn, terwijl de tweede variant denkt dat ze de aarde willen veroveren.",
          "De eerste variant is bedacht door astronomen en de tweede variant door de makers van radiotelescopen.",
          "De eerste variant geldt alleen voor ons zonnestelsel en de tweede variant voor het hele heelal."
        ],
        correct: "De eerste variant legt de drempel in het verleden (intelligent leven ontstaat bijna nooit), terwijl de tweede variant de drempel in de toekomst legt (beschavingen vernietigen zichzelf).",
        explanation: "Alinea 3 onderscheidt een biologisch filter vóór het ontstaan van intelligentie en een technologisch filter ná het ontstaan van beschavingen (zelfvernietiging)."
      },
      {
        vraag: "Wat wil de schrijver duidelijk maken met de vergelijking in alinea [4]: *'zoiets als midden in een moderne stad speuren naar rooksignalen'*?",
        opties: [
          "Dat onze huidige zoekmethode met radiogolven mogelijk zo primitief is dat we de communicatie van veel geavanceerdere beschavingen simpelweg niet opmerken.",
          "Dat er in grote steden te veel luchtvervuiling en rook hangt om goed door een telescoop naar de sterren te kunnen kijken.",
          "Dat de oude volkeren op aarde met rooksignalen probeerden te communiceren met de maan.",
          "Dat radiotelescopen alleen werken als ze ver buiten de bebouwde kom in de natuur worden geplaatst."
        ],
        correct: "Dat onze huidige zoekmethode met radiogolven mogelijk zo primitief is dat we de communicatie van veel geavanceerdere beschavingen simpelweg niet opmerken.",
        explanation: "Wie in een moderne stad (vol wifi en 5G) zoekt naar rooksignalen, ziet geen communicatie omdat hij naar een achterhaald medium kijkt; zo kan radio voor geavanceerde wezens achterhaald zijn."
      },
      {
        vraag: "Hoe zijn de alinea's van deze tekst opgebouwd?",
        opties: [
          "Aanleiding tot de verwachting (1) → Formulering van het raadsel (2) → Biologische en maatschappelijke verklaringen (3) → Technologische verklaringen en slotgedachte (4).",
          "Historische inleiding (1) → Bewijs voor buitenaards leven (2) → Voordelen van ruimtevaart (3) → Samenvatting van alle ontdekkingen (4).",
          "Stelling van de auteur (1) → Tegenargumenten van Fermi (2) → Weerlegging van de telescopen (3) → Oproep om te stoppen met sterrenkunde (4).",
          "Beschrijving van de Melkweg (1) → Uitleg over de werking van radio's (2) → Gevaren van kernwapens (3) → Geschiedenis van rooksignalen (4)."
        ],
        correct: "Aanleiding tot de verwachting (1) → Formulering van het raadsel (2) → Biologische en maatschappelijke verklaringen (3) → Technologische verklaringen en slotgedachte (4).",
        explanation: "Deze structuur geeft exact de logische opbouw van het artikel weer."
      }
    ]
  },

  // ==========================================================================
  // TOETSTEKST 7: Het Wood Wide Web: Samenwerking of Concurrentie?
  // ==========================================================================
  {
    id: "toets-7",
    titel: "Het 'Wood Wide Web': Zorgzame Moederbomen of Ondergrondse Handel?",
    thema: "Biologie & Wetenschapsfilosofie",
    tekst: `[1] Het klinkt als een sprookje waarin de natuur het goede voorbeeld geeft aan de mens: een bos waarin oude, wijze 'moederbomen' via een ondergronds netwerk van schimmeldraden voedsel sturen naar hun noodlijdende nakomelingen en elkaar tijdig waarschuwen voor naderend onheil. Sinds dit beeld van het zogeheten *'Wood Wide Web'* in populaire natuurboeken en documentaires werd geïntroduceerd, omarmde het grote publiek het idee dat bomen niet met elkaar concurreren, maar een harmonieuze, onbaatzuchtige familie vormen.\n\n[2] Dat ondergrondse netwerk bestaat wel degelijk. Vrijwel alle bomen leven in *symbiose* (wederzijds voordelige samenwerking) met *mycorrhiza-schimmels*. Omdat schimmels zelf geen bladgroen bezitten, kunnen zij geen zonlicht omzetten in suikers; andersom kunnen hun flinterdunne draden veel efficiënter water en mineralen zoals fosfor en stikstof uit de bodem opnemen dan dikke boomwortels. Bij de wortelpunten vindt daarom een levendige ruilhandel plaats: de boom levert koolstof en suikers aan de schimmel, en krijgt daar schaarse voedingsstoffen uit de aarde voor terug.\n\n[3] Waar veel hedendaagse plantenbiologen echter bezwaar tegen maken, is de menselijke interpretatie die aan dit netwerk is gegeven. Uit recente vervolgonderzoeken blijkt dat er veel minder bewijs is voor het idee dat bomen bewust en liefdevol cadeautjes uitdelen aan zwakke buurbomen. Wanneer koolstof via een schimmel van de ene naar de andere boom stroomt, gebeurt dat meestal op initiatief van de schimmel zelf. De schimmel gedraagt zich niet als een liefdadigheidsinstelling, maar als een slimme beurshandelaar die zijn eigen overlevingskansen spreidt door meerdere handelspartners in leven te houden.\n\n[4] Bovendien gebruiken sommige planten het schimmelnetwerk zelfs voor ondergrondse oorlogsvoering: walnootbomen en bepaalde bloemensoorten sturen via dezelfde draden groeiremmende gifstoffen naar concurrenten in hun buurt. Door bomen voor te stellen als zorgzame mensen doen we de natuur volgens biologen tekort. Een bos is al fascinerend genoeg zonder dat we het een menselijk gezicht hoeven te geven.`,
    vragen: [
      {
        vraag: "Welke ontwikkeling in het denken over bossen staat in deze tekst centraal?",
        opties: [
          "Wetenschappers corrigeren het te romantische, vermenselijkte beeld van 'zorgzame bomen' en laten zien dat het netwerk vooral draait om biologische ruilhandel en eigenbelang.",
          "Biologen hebben ontdekt dat mycorrhiza-schimmels eigenlijk helemaal niet bestaan onder de bosbodem.",
          "Onderzoekers tonen aan dat bomen alleen boven de grond met elkaar communiceren en nooit via hun wortels.",
          "De schrijver betoogt dat populaire natuurboeken verboden moeten worden omdat ze schadelijk zijn voor het bosbeheer."
        ],
        correct: "Wetenschappers corrigeren het te romantische, vermenselijkte beeld van 'zorgzame bomen' en laten zien dat het netwerk vooral draait om biologische ruilhandel en eigenbelang.",
        explanation: "De tekst zet het geromantiseerde beeld uit alinea 1 (onbaatzuchtige familie) af tegen het nuchtere biologische inzicht uit alinea 2-4 (symbiose, ruilhandel van de schimmel en concurrentie)."
      },
      {
        vraag: "Waarom hebben bomen en *mycorrhiza-schimmels* elkaar volgens alinea [2] zo hard nodig?",
        opties: [
          "De schimmel kan zelf geen suikers maken met zonlicht, terwijl de boom met de fijne schimmeldraden veel makkelijker water en mineralen uit de bodem haalt.",
          "De schimmel beschermt de schors van de boom tegen vorst, terwijl de boom schaduw geeft aan de paddenstoelen.",
          "Zonder schimmels kunnen bomen geen zaden of vruchten laten vallen op de bosbodem.",
          "De boom levert stikstof en fosfor aan de schimmel in ruil voor zuurstof en zonlicht."
        ],
        correct: "De schimmel kan zelf geen suikers maken met zonlicht, terwijl de boom met de fijne schimmeldraden veel makkelijker water en mineralen uit de bodem haalt.",
        explanation: "De symbiose berust op wederzijdse aanvulling: de boom levert via fotosynthese suikers/koolstof; de schimmel levert water en bodemmineralen."
      },
      {
        vraag: "Waarom vergelijkt de schrijver de schimmel in alinea [3] met *'een slimme beurshandelaar'* in plaats van *'een liefdadigheidsinstelling'*?",
        opties: [
          "Omdat de schimmel voedingsstoffen niet uit medelijden verplaatst, maar uit eigenbelang om zijn verschillende voedselleveranciers (de bomen) in stand te houden.",
          "Omdat paddenstoelen en truffels uit het bos voor veel geld op de markt worden verkocht.",
          "Omdat de schimmel alleen suikers geeft aan de allerhoogste en sterkste bomen die toch al genoeg hebben.",
          "Omdat wetenschappers geld moeten betalen om onderzoek te mogen doen in Europese bossen."
        ],
        correct: "Omdat de schimmel voedingsstoffen niet uit medelijden verplaatst, maar uit eigenbelang om zijn verschillende voedselleveranciers (de bomen) in stand te houden.",
        explanation: "De schimmel handelt vanuit evolutionair eigenbelang (risicospreiding door meerdere bomen gezond te houden) en niet vanuit menselijke naastenliefde."
      },
      {
        vraag: "Welke functie heeft het voorbeeld van de walnootbomen in alinea [4]?",
        opties: [
          "Het levert een extra argument tegen het romantische beeld uit alinea 1 door te tonen dat het netwerk zelfs gebruikt wordt om rivalen te verzwakken.",
          "Het bewijst dat walnootbomen geen mycorrhiza-schimmels bij hun wortels verdragen.",
          "Het legt uit waarom walnoten veel gezonder zijn voor de mens dan andere notensoorten.",
          "Het laat zien hoe moederbomen hun eigen jonge zaailingen beschermen tegen insecten."
        ],
        correct: "Het levert een extra argument tegen het romantische beeld uit alinea 1 door te tonen dat het netwerk zelfs gebruikt wordt om rivalen te verzwakken.",
        explanation: "Het verspreiden van groeiremmende gifstoffen via het schimmelnetwerk weerlegt het idee dat het netwerk uitsluitend voor harmonieuze hulp dient."
      },
      {
        vraag: "Wat betekent het woord *'onbaatzuchtige'* in de laatste zin van alinea [1] (*'een harmonieuze, onbaatzuchtige familie'*)?",
        opties: [
          "Zonder aan eigen voordeel te denken; puur om de ander te helpen.",
          "Voortdurend op zoek naar winst en eigenbelang.",
          "Ondergronds verborgen voor het menselijk oog.",
          "Oeroud en bestand tegen alle ziektes."
        ],
        correct: "Zonder aan eigen voordeel te denken; puur om de ander te helpen.",
        explanation: "'Baat' betekent voordeel/winst; 'onbaatzuchtig' (altruïstisch) betekent dus handelen zonder eigenbelang."
      }
    ]
  },

  // ==========================================================================
  // TOETSTEKST 8: Het Uitsterven van Kleine Talen (Taalkunde & Cultuur)
  // ==========================================================================
  {
    id: "toets-8",
    titel: "Het Verdwijnen van Stemmen: Waarom het Uitsterven van Talen Ons Allemaal Raakt",
    thema: "Taalkunde & Cultuur",
    tekst: `[1] Op dit moment worden er op onze planeet ruim zevenduizend verschillende talen gesproken. Die rijkdom is echter uiterst ongelijk verdeeld: meer dan de helft van de wereldbevolking spreekt slechts één van de twintig grootste wereld- en handelstalen, zoals het Mandarijn, Engels, Spaans of Hindi. Aan de andere kant van het spectrum bevinden zich duizenden kleine, vaak inheemse talen die nog maar door enkele honderden of tientallen ouderen worden beheerst. Taalkundigen schatten dat er momenteel elke twee weken ergens ter wereld een taal voorgoed verstomt.\n\n[2] Waarom geven gemeenschappen hun eeuwenoude moedertaal eigenlijk op? Zelden gebeurt dat volledig vrijwillig. Door verstedelijking, globalisering en het internet zien jongeren zich vaak gedwongen om over te schakelen op een dominante landstaal of het Engels om kans te maken op een studie of een baan. Ouders voeden hun kinderen vervolgens bewust op in de grote meerderheidstaal om hen een maatschappelijke voorsprong te geven, waardoor de oorspronkelijke taal binnen twee generaties uit het dagelijks leven verdwijnt.\n\n[3] Sommige nuchtere waarnemers halen daar hun schouders over op. Zou de wereld immers niet veel overzichtelijker en vreedzamer zijn als iedereen op aarde gewoon dezelfde taal sprak, zodat misverstanden verleden tijd zijn? Volgens taalwetenschappers en antropologen berust die gedachte op een grote vergissing. Een taal is namelijk niet zomaar een neutraal lijstje met andere woorden voor dezelfde dingen; elke taal vormt een unieke bril waarmee een cultuur naar de werkelijkheid kijkt en kennis opslaat.\n\n[4] Wanneer een inheemse taal in het Amazonegebied of Australië uitsterft, gaat er vaak een onvervangbare bibliotheek aan mondeling overgeleverde kennis verloren over geneeskrachtige planten, lokale dieren en subtiele weersveranderingen waar de westerse wetenschap nog geen weet van heeft. Sommige talen kennen bijvoorbeeld geen woorden voor 'links' of 'rechts', maar duiden alles aan met de windrichtingen noord, oost, zuid en west – waardoor de sprekers een feilloos richtingsgevoel bezitten. Het redden en vastleggen van bedreigde talen is dan ook geen sentimentele hobby, maar het beschermen van het menselijk vernuft.`,
    vragen: [
      {
        vraag: "Wat wordt in de laatste zin van alinea [1] bedoeld met de uitspraak dat er elke twee weken *'een taal voorgoed verstomt'*?",
        opties: [
          "Dat de allerlaatste spreker van een kleine taal overlijdt, waardoor niemand die taal nog als levende taal spreekt.",
          "Dat regeringen elke twee weken een kleine taal bij wet verbieden op scholen.",
          "Dat sprekers van kleine talen uit protest weigeren om nog langer in het openbaar te praten.",
          "Dat de woordenboeken van oude talen na verloop van tijd onleesbaar worden."
        ],
        correct: "Dat de allerlaatste spreker van een kleine taal overlijdt, waardoor niemand die taal nog als levende taal spreekt.",
        explanation: "Een taal 'verstomt voorgoed' (sterft uit) op het moment dat de laatste oudere die de taal nog machtig was overlijdt zonder het doorgegeven te hebben."
      },
      {
        vraag: "Wat is volgens alinea [2] de voornaamste reden waarom ouders hun kinderen niet meer in hun oorspronkelijke kleine taal opvoeden?",
        opties: [
          "Zij hopen dat hun kinderen met een grote wereld- of landstaal betere kansen krijgen op onderwijs en werk.",
          "Zij vinden de grammatica van hun eigen moedertaal te ingewikkeld voor jonge kinderen.",
          "Zij zijn door het gebruik van internet zelf vergeten hoe hun eigen moedertaal gesproken moet worden.",
          "Zij willen voorkomen dat buitenstaanders kunnen meeluisteren met hun gesprekken."
        ],
        correct: "Zij hopen dat hun kinderen met een grote wereld- of landstaal betere kansen krijgen op onderwijs en werk.",
        explanation: "Sociale en economische druk (studie- en baankansen in de dominante taal) beweegt ouders ertoe om over te stappen op de meerderheidstaal."
      },
      {
        vraag: "Welke functie hebben de eerste twee zinnen van alinea [3]?",
        opties: [
          "Ze verwoorden een veelgehoord tegenargument (één wereldtaal is toch veel makkelijker?), dat de schrijver direct daarna weerlegt.",
          "Ze vatten het eigen hoofdstandpunt van de schrijver en de taalwetenschappers alvast samen.",
          "Ze leggen uit waarom er in de wereld zoveel oorlogen ontstaan door taalfouten.",
          "Ze geven een voorbeeld van een taal die al in de negentiende eeuw is uitgestorven."
        ],
        correct: "Ze verwoorden een veelgehoord tegenargument (één wereldtaal is toch veel makkelijker?), dat de schrijver direct daarna weerlegt.",
        explanation: "De schrijver voert eerst een schijnbaar logische tegenwerping op ('Sommige nuchtere waarnemers...'), om die meteen te ontkrachten ('berust op een grote vergissing')."
      },
      {
        vraag: "Waarom vergelijkt de schrijver een taal in alinea [3] met *'een unieke bril waarmee een cultuur naar de werkelijkheid kijkt'*?",
        opties: [
          "Omdat een taal bepaalt hoe sprekers de wereld om hen heen indelen, ervaren en welke bijzondere kennis zij opmerken.",
          "Omdat mensen pas goed een taal kunnen leren als zij de letters scherp kunnen lezen.",
          "Omdat elke taal een eigen alfabet heeft dat er op papier anders uitziet.",
          "Omdat je een vreemde taal net zo makkelijk kunt op- en afzetten als een bril."
        ],
        correct: "Omdat een taal bepaalt hoe sprekers de wereld om hen heen indelen, ervaren en welke bijzondere kennis zij opmerken.",
        explanation: "De metafoor van de bril verduidelijkt dat taal ons denken en onze waarneming stuurt (zoals blijkt uit de voorbeelden over plantkennis en windrichtingen in alinea 4)."
      },
      {
        vraag: "Waarom noemt de schrijver in alinea [4] het voorbeeld van talen die geen woorden hebben voor 'links' en 'rechts', maar alleen windrichtingen gebruiken?",
        opties: [
          "Om te bewijzen dat de structuur van een taal daadwerkelijk invloed heeft op de mentale vaardigheden (zoals het richtingsgevoel) van de sprekers.",
          "Om aan te tonen dat sprekers van kleine talen minder woorden kennen dan sprekers van het Engels of Spaans.",
          "Om uit te leggen waarom ontdekkingsreizigers in het Amazonegebied en Australië vaak verdwaalden.",
          "Om te laten zien dat we in het Nederlands de woorden 'links' en 'rechts' beter kunnen afschaffen."
        ],
        correct: "Om te bewijzen dat de structuur van een taal daadwerkelijk invloed heeft op de mentale vaardigheden (zoals het richtingsgevoel) van de sprekers.",
        explanation: "Dit voorbeeld bewijst concreet de stelling uit alinea 3 dat verschillende talen leiden tot unieke manieren van waarnemen en denken."
      }
    ]
  },

  // ==========================================================================
  // TOETSTEKST 9: De Paradox van Keuze (Psychologie & Consumentisme)
  // ==========================================================================
  {
    id: "toets-9",
    titel: "De Paradox van Keuze: Waarom Meer Opties Ons Niet Gelukkiger Maken",
    thema: "Psychologie & Samenleving",
    tekst: `[1] Wie vijftig jaar geleden een spijkerbroek of een pot pindakaas wilde kopen, was binnen vijf minuten klaar: er waren hooguit twee of drie varianten beschikbaar. Wie tegenwoordig een grote supermarkt of webwinkel binnenstapt, wordt geconfronteerd met tientallen soorten pindakaas – van biologisch en zoutarm tot varianten met karamel-zeezout of chilipeper – en honderden modellen spijkerbroeken. In onze moderne maatschappij geldt keuzevrijheid als het hoogste goed: hoe meer opties we hebben, des te groter de kans dat iedereen precies vindt wat bij hem past, zo luidt de gedachte.\n\n[2] De Amerikaanse psycholoog Barry Schwartz toonde met een reeks beroemde experimenten echter aan dat deze redenering slechts tot op zekere hoogte klopt. In een supermarkt plaatste zijn onderzoeksteam een proefkraampje met jam. Op de ene dag stonden er vierentwintig verschillende smaken jam op tafel; op de andere dag slechts zes. Hoewel het grote aanbod van vierentwintig potten meer nieuwsgierige voorbijgangers liet stilstaan, gebeurde er bij de kassa iets verrassends: van de mensen bij het kleine kraampje (zes smaken) kocht dertig procent daadwerkelijk een pot jam, tegenover slechts drie procent bij het grote kraampje.\n\n[3] Hoe valt die *keuzeverlamming* te verklaren? Zodra het aantal mogelijkheden te groot wordt, raken onze hersenen overbelast met het afwegen van alle voor- en nadelen. Bovendien treedt er achteraf een tweede psychologisch mechanisme in werking: *keuzespijt*. Als je uit honderd spijkerbroeken er één kiest die uiteindelijk toch een beetje knelt, geef je jezelf de schuld; er zat tussen die negenennegentig andere immers vast een broek die wél perfect was geweest. Waren er maar twee modellen in de winkel, dan leg je je veel makkelijker en tevredener bij je aankoop neer.\n\n[4] Schwartz verdeelt mensen daarom in twee typen beslissers: *maximizers* (mensen die altijd het allerbeste willen en elke recensie uitpluizen) en *satisficers* (mensen die kiezen zodra een optie 'goed genoeg' is aan hun eisen). Uit onderzoek blijkt keer op keer dat de tweede groep aanzienlijk gelukkiger en minder gestrest door het leven gaat. Een beetje keuze maakt vrij, maar een overdaad aan keuze maakt ons gevangenen van onze eigen twijfel.`,
    vragen: [
      {
        vraag: "Wat was het meest verrassende resultaat van het jam-experiment dat in alinea [2] wordt beschreven?",
        opties: [
          "Het kraampje met vierentwintig smaken trok weliswaar meer kijkers, maar het kraampje met zes smaken leidde verhoudingsgewijs tot tien keer zoveel verkopen.",
          "Klanten vonden de jam bij het kraampje met zes smaken veel lekkerder smaken dan bij het kraampje met vierentwintig smaken.",
          "Niemand wilde nog jam kopen zodra er meer dan zes verschillende potten op de tafel stonden.",
          "Het supermarktpersoneel kon de vierentwintig verschillende prijzen bij de kassa niet onthouden."
        ],
        correct: "Het kraampje met vierentwintig smaken trok weliswaar meer kijkers, maar het kraampje met zes smaken leidde verhoudingsgewijs tot tien keer zoveel verkopen.",
        explanation: "Bij 6 smaken kocht 30% van de klanten een pot, tegenover slechts 3% bij 24 smaken – tien keer zoveel verkopen bij het kleinere aanbod."
      },
      {
        vraag: "Welke twee verschillende nadelen van een te groot aanbod worden in alinea [3] uitgelegd?",
        opties: [
          "Vooraf raakt het brein verlamd door het vergelijken (keuzeverlamming), en achteraf ben je minder tevreden omdat je denkt dat een andere optie beter was geweest (keuzespijt).",
          "De producten in grote winkels zijn vaak duurder én van slechtere kwaliteit dan in kleine winkels.",
          "Je bent veel meer tijd kwijt met zoeken én de kans is groter dat je lievelingssmaak is uitverkocht.",
          "Winkeliers moeten te veel voorraad inkopen én consumenten kopen uiteindelijk dingen die ze helemaal niet nodig hebben."
        ],
        correct: "Vooraf raakt het brein verlamd door het vergelijken (keuzeverlamming), en achteraf ben je minder tevreden omdat je denkt dat een andere optie beter was geweest (keuzespijt).",
        explanation: "Alinea 3 behandelt eerst het probleem vóór de keuze (keuzeverlamming door informatie-overbelasting) en daarna ná de keuze (keuzespijt en zelfverwijt)."
      },
      {
        vraag: "Waarom ben je volgens alinea [3] vaak *tevredener* met een net niet perfecte spijkerbroek als de winkel maar twee modellen had in plaats van honderd?",
        opties: [
          "Omdat je bij twee modellen weet dat er nauwelijks iets beters te kiezen viel, terwijl je bij honderd modellen jezelf verwijt dat je niet goed genoeg hebt gezocht.",
          "Omdat spijkerbroeken in een kleine winkel altijd door een kleermaker op maat worden gemaakt.",
          "Omdat je bij een klein aanbod veel minder geld voor de broek hebt hoeven te betalen.",
          "Omdat niemand op straat kan zien welk model spijkerbroek je hebt gekozen."
        ],
        correct: "Omdat je bij twee modellen weet dat er nauwelijks iets beters te kiezen viel, terwijl je bij honderd modellen jezelf verwijt dat je niet goed genoeg hebt gezocht.",
        explanation: "Bij een enorm aanbod verschuift de verantwoordelijkheid voor een teleurstellend resultaat naar de koper zelf ('ik had beter moeten zoeken'), wat de tevredenheid verlaagt."
      },
      {
        vraag: "Waarin verschilt een *'satisficer'* van een *'maximizer'* volgens alinea [4]?",
        opties: [
          "Een satisficer hakt de knoop door zodra een product aan zijn basiseisen voldoet, terwijl een maximizer eindeloos blijft vergelijken op zoek naar de perfecte keuze.",
          "Een satisficer koopt alleen dure merkproducten, terwijl een maximizer altijd kiest voor de goedkoopste aanbieding.",
          "Een satisficer vraagt altijd advies aan vrienden, terwijl een maximizer nooit recensies op internet leest.",
          "Een satisficer doet zijn boodschappen het liefst online, terwijl een maximizer naar kleine buurtwinkels gaat."
        ],
        correct: "Een satisficer hakt de knoop door zodra een product aan zijn basiseisen voldoet, terwijl een maximizer eindeloos blijft vergelijken op zoek naar de perfecte keuze.",
        explanation: "Satisficers nemen genoegen met 'goed genoeg', waardoor zij minder stress en keuzespijt ervaren dan perfectionistische maximizers."
      },
      {
        vraag: "Welke stijlfiguur gebruikt de schrijver in de allerlaatste zin van de tekst (*'Een beetje keuze maakt vrij, maar een overdaad aan keuze maakt ons gevangenen van onze eigen twijfel'*)?",
        opties: [
          "Een tegenstelling (antithese) tussen 'vrij maken' en 'gevangenen maken'.",
          "Een overdrijving om te bewijzen dat winkelen strafbaar zou moeten zijn.",
          "Een letterlijke beschrijving van de regels in een supermarkt.",
          "Een opsomming van drie voordelen van webwinkels."
        ],
        correct: "Een tegenstelling (antithese) tussen 'vrij maken' en 'gevangenen maken'.",
        explanation: "De auteur zet 'een beetje keuze → maakt vrij' lijnrecht tegenover 'een overdaad aan keuze → maakt gevangenen', een krachtige tegenstelling die de kernparadox samenvat."
      }
    ]
  },

  // ==========================================================================
  // TOETSTEKST 10: CRISPR-Cas: Sleutelen aan het DNA
  // ==========================================================================
  {
    id: "toets-10",
    titel: "Knippen en Plakken in het DNA: De Belofte en het Gevaar van CRISPR-Cas",
    thema: "Genetica & Ethiek",
    tekst: `[1] In vrijwel elke cel van je lichaam ligt een bouwtekening opgeslagen die bepaalt of je bruine of blauwe ogen hebt, hoe lang je wordt en hoe je organen functioneren: het DNA. Dit erfelijk materiaal kun je vergelijken met een gigantisch kookboek dat is geschreven met een alfabet van slechts vier chemische letters (A, C, G en T). Soms sluipt er bij het kopiëren van die miljarden letters één enkel tikfoutje in de tekst, met ingrijpende gevolgen: zo'n genetische mutatie kan leiden tot ernstige erfelijke aandoeningen zoals taaislijmziekte of sikkelcelziekte.\n\n[2] Decennialang konden artsen de gevolgen van zulke erfelijke ziektes hooguit verzachten met medicijnen, zonder de spelfout in het DNA zelf te kunnen herstellen. Daar kwam in 2012 verandering in toen de onderzoeksters Emmanuelle Charpentier en Jennifer Doudna een revolutionaire techniek ontwikkelden: *CRISPR-Cas9*. Zij ontdekten dat bacteriën een vernuftig afweersysteem bezitten waarmee zij het DNA van binnendringende virussen op een exacte plek kunnen doorknippen. Door dit 'moleculaire schaartje' na te bouwen en van een soort genetische postcode te voorzien, kunnen wetenschappers nu gericht naar een foutje in het menselijk DNA navigeren, de foute letter wegknippen en vervangen door de juiste.\n\n[3] Inmiddels zijn de eerste patiënten met ernstige bloedziektes dankzij deze techniek succesvol genezen. Wanneer artsen het DNA in de bloedcellen van een volwassen patiënt repareren, blijft die verandering beperkt tot die ene persoon. De ethische discussie laait echter hoog op zodra wetenschappers sleutelen aan het DNA van menselijke embryo's. Aanpassingen in een pril embryo worden namelijk doorgegeven aan alle toekomstige kinderen en kleinkinderen. Bovendien kan het moleculaire schaartje soms per ongeluk op een verkeerde plek in het DNA knippen, met onvoorspelbare gevolgen voor latere generaties.\n\n[4] En waar trekken we de grens tussen *genezen* en *verbeteren*? Vrijwel iedereen juicht het toe als een dodelijke spierziekte uit een familie wordt gewist. Maar wat als welgestelde ouders in de toekomst tegen betaling ook genen willen laten aanpassen om hun kind een beter geheugen, grotere spierkracht of een hogere weerstand te geven? Om te voorkomen dat de samenleving uiteenvalt in 'genetisch verbeterde' rijken en gewone burgers, is het aanpassen van embryo's voorlopig in vrijwel de hele wereld streng bij wet verboden.`,
    vragen: [
      {
        vraag: "Waarom vergelijkt de schrijver het DNA in alinea [1] met een *'gigantisch kookboek'* waarin een *'tikfoutje'* zit?",
        opties: [
          "Om begrijpelijk te maken hoe één verkeerde letter in de genetische code er al voor kan zorgen dat een cel niet goed werkt en er een ziekte ontstaat.",
          "Om uit te leggen dat erfelijke ziektes altijd worden veroorzaakt door het eten van verkeerd bereid voedsel.",
          "Om te laten zien dat artsen een leesbril nodig hebben om de letters A, C, G en T onder een microscoop te zien.",
          "Om aan te tonen dat het menselijk lichaam uit slechts vier verschillende soorten cellen bestaat."
        ],
        correct: "Om begrijpelijk te maken hoe één verkeerde letter in de genetische code er al voor kan zorgen dat een cel niet goed werkt en er een ziekte ontstaat.",
        explanation: "De beeldspraak van het kookboek en het tikfoutje maakt een abstract moleculair proces (een puntmutatie in de basevolgorde) concreet en voorstelbaar."
      },
      {
        vraag: "Wat hebben de onderzoeksters Charpentier en Doudna in 2012 gedaan om *CRISPR-Cas9* te ontwikkelen (alinea 2)?",
        opties: [
          "Zij vormden een natuurlijk verdedigingsmechanisme van bacteriën om tot een precisiegereedschap dat gericht fouten in menselijk DNA kan knippen en herstellen.",
          "Zij vonden een chemisch medicijn uit dat alle bacteriën en virussen in het menselijk bloed vernietigt.",
          "Zij ontwierpen een metalen microschaartje waarmee chirurgen tijdens een operatie cellen kunnen openknippen.",
          "Zij schreven op de computer een compleet nieuw DNA-alfabet met acht letters in plaats van vier."
        ],
        correct: "Zij vormden een natuurlijk verdedigingsmechanisme van bacteriën om tot een precisiegereedschap dat gericht fouten in menselijk DNA kan knippen en herstellen.",
        explanation: "Zij baseerden CRISPR-Cas9 op het bestaande virale afweersysteem van bacteriën en koppelden er een zoekmechanisme ('postcode') aan."
      },
      {
        vraag: "Waarom is het aanpassen van het DNA bij een *embryo* volgens alinea [3] ethisch veel omstredener dan bij een *volwassen patiënt*?",
        opties: [
          "Omdat veranderingen én eventuele knipfouten bij een embryo erfelijk zijn en dus onomkeerbaar worden doorgegeven aan alle volgende generaties.",
          "Omdat de CRISPR-Cas9-techniek bij volwassen patiënten nooit werkt en alleen bij embryo's resultaat oplevert.",
          "Omdat volwassen patiënten geen toestemming hoeven te geven voor een genetische behandeling in het ziekenhuis.",
          "Omdat een behandeling bij een volwassene veel duurder is dan het aanpassen van een embryo."
        ],
        correct: "Omdat veranderingen én eventuele knipfouten bij een embryo erfelijk zijn en dus onomkeerbaar worden doorgegeven aan alle volgende generaties.",
        explanation: "Bij somatische gentherapie (volwassene) blijft de wijziging bij één persoon; bij kiembauraanpassing (embryo) erven alle nakomelingen de wijziging en eventuele fouten."
      },
      {
        vraag: "Welk maatschappelijk gevaar schetst de schrijver in alinea [4] als we de grens tussen *genezen* en *verbeteren* overschrijden?",
        opties: [
          "Er zou een oneerlijke tweedeling kunnen ontstaan waarbij rijke ouders hun kinderen genetische voordelen kunnen kopen die voor anderen onbereikbaar zijn.",
          "Artsen zouden dan geen tijd meer hebben om gewone ziektes zoals griep of botbreuken te behandelen.",
          "Alle kinderen op de wereld zouden er dan precies hetzelfde uit gaan zien en dezelfde ogen krijgen.",
          "Er zouden geen medicijnen meer verkocht worden door apotheken."
        ],
        correct: "Er zou een oneerlijke tweedeling kunnen ontstaan waarbij rijke ouders hun kinderen genetische voordelen kunnen kopen die voor anderen onbereikbaar zijn.",
        explanation: "Alinea 4 waarschuwt voor sociale en biologische ongelijkheid als genetische 'verbetering' (intelligentie, kracht) te koop wordt voor welgestelden."
      },
      {
        vraag: "Welke omschrijving past het best bij de strekking van de gehele tekst?",
        opties: [
          "CRISPR-Cas9 is een medische doorbraak voor het genezen van erfelijke ziektes, maar vereist strenge ethische grenzen zodra het gaat om erfelijke aanpassing van embryo's.",
          "Omdat het moleculaire schaartje soms op de verkeerde plek knipt, moeten ziekenhuizen direct stoppen met alle vormen van DNA-onderzoek.",
          "Wetenschappers verwachten dat binnen tien jaar alle menselijke ziektes en ouderdom volledig uitgebannen zullen zijn.",
          "Bacteriën en virussen zijn veel slimmer dan menselijke artsen en kunnen niet verslagen worden."
        ],
        correct: "CRISPR-Cas9 is een medische doorbraak voor het genezen van erfelijke ziektes, maar vereist strenge ethische grenzen zodra het gaat om erfelijke aanpassing van embryo's.",
        explanation: "Dit vat zowel de medische belofte (alinea 1-2) als de ethische en maatschappelijke grenzen (alinea 3-4) evenwichtig samen."
      }
    ]
  }
];

module.exports = { toetsTekstenDeel1 };
