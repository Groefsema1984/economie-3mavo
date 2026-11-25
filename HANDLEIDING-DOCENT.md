# Handleiding docent · Economie 3 MAVO oefenapp

Versie 1.0 (25 november 2026). Gebouwd op de 4 mavo-app (versie 2.0): dezelfde functies, een eigen opslag en een eigen Sheet.

Nergens in de app staan cijfers. Leerlingen zien alleen hoeveel ze goed hebben en wat ze nog moeten oefenen.
Alle bedragen, rentes, koersen en munten in de vragen zijn fictief.

## Wat zit erin

**Hoofdstukken (methode Pincode, derde klas)**

| Hoofdstuk | Bron | Levels |
|---|---|---|
| H1 Hoe welvarend ben jij? | KADER mavo 3 H1 | Weet je het nog?, 1.1 t/m 1.4, Examenbegrippen, Rekenlab |
| H2 Geld genoeg | KADER H2 (volgens het H1-kader stof van klas 3) | Weet je het nog?, 2.1 t/m 2.4, Examenbegrippen, Rekenlab |
| H3 De bank en jouw geld | KADER mavo 3 H3 + alle vragen van de oude H3-game | Weet je het nog?, 3.1 t/m 3.4, Examenbegrippen, Expertwijk, Rekenlab |
| H4, H5, H6, H8 | volgen zodra de bronbestanden er zijn | staan op het startscherm als "Binnenkort" |
| H7 Wie heeft het voor het zeggen? | KADER mavo 3 H7 | Weet je het nog?, 7.1 t/m 7.4, Examenbegrippen, Rekenlab |

- Per paragraaf een level van 8 vragen (meerkeuze, waar/niet waar, koppelen, rekenen met steeds nieuwe getallen).
  Medailles: brons 6/8, zilver 7/8, goud 8/8. Het volgende level gaat open bij brons.
- Voor elk level eerst een korte uitleg met de belangrijkste begrippen.
- Elke vraag hoort bij een eindterm uit de syllabus economie vmbo GT (bijvoorbeeld 4A.4 geld en betalingsverkeer,
  4A.5 sparen en lenen, 6.1 t/m 6.3 overheid, V1.1 begroting). Die koppeling zie je terug in Vaardigheden en in het dashboard.
- **Examenbegrippen**: begrippen die in de eindexamens 2018-2026 vaak voorkomen (uit de examenanalyse van de 4 mavo-app),
  met een kaart, een meerkeuzevraag en een waar/niet waar-vraag.
- **H3 Expertwijk**: de examentraining uit de oude game: bankafschriften, rood staan, groeifactor, spaarrekeningen
  vergelijken, leningen vergelijken, koersentabellen, geld terugwisselen en twee beweringen. Steeds nieuwe getallen.
- **H3 Rekenlab**: de vijf rekenvaardigheden uit het kader: saldo, enkelvoudige rente, samengestelde rente
  (groeifactor, tot 3 jaar), kredietkosten en vreemd geld omrekenen (beide kanten op).
- **Eindtoets** per hoofdstuk (15 vragen): aantal goed en wat nog oefenen, foute vragen opnieuw tot alles goed is. Dan volgt het diploma.

**Leren**
- **Slim oefenen**: de app kiest vragen uit de zwakste onderwerpen. Na een fout volgt een extra oefenvraag over hetzelfde begrip.
- **Flitskaarten** met herhaling op slimme momenten, **foutenschrift** per onderwerp, **formulekaart met rekenhulp**
  (alleen de formules van de derde klas, waaronder saldo en vreemd geld), **grafiektraining** en een **proeftoets op tijd** per hoofdstuk.
- De grafiektraining (marktevenwicht, Lorenzcurve) is stof van klas 4. Leerlingen kunnen er alvast mee oefenen.

**Eindexamentrainer**
- Alle vragen uit de centrale examens economie GL/TL 2018-2026, met bronnen.
- Nieuw tabblad **Per hoofdstuk**: alleen de examenvragen over de eindtermen van H1, H2, H3 en H7. Dit is de standaard.
- Daarnaast per examen, per domein, examensprint, examen op tijd en printen, zoals in de 4 mavo-app.

**Kern, methode en verdieping**
- 🎯 kern (examenstof), 📘 methode (voor de schooltoets) of 🔭 verdieping (extra), per begrip in `src/lagen.txt`.
- **Toetsmodus** (standaard): kern en methode. **Examenmodus**: alleen kern. Per klas in te stellen op het tabblad Klassikaal.

**Collectie en ranglijst**
- Begrippenkaarten, badges, munten en kleurthema's. In het dashboard een ranglijst op geoefende tijd, met echte namen.

**Docentendashboard** (knop Docent, docentcode **1103**)
- Overzicht, Leerlingen (klik op een naam voor alles van die leerling), Klassikaal (zwakste onderwerpen, top 5 vaakst fout,
  proeftoetsen), Vragen (wat per vraag fout ging), Eindtermen (scores per eindterm) en Examentrainer.
- Leerlingen kiezen bij de start hun cluster (3m.ec1, 3m.ec2 of 3m.ec3) en hun klas (3ma t/m 3md). In het dashboard filter je op cluster,
  zodat elke docent alleen de eigen groep ziet, en eventueel ook op klas. De klas staat als kolom in de tabel en in de CSV.
  Een leerling kan de klas later zelf aanpassen bij Account. Vernieuwen, CSV voor Excel en afdrukken.

## Oude H3-game en voortgang van leerlingen

De oude game (Economic Game 3 mavo, versie 4 op Netlify) blijft gewoon draaien. Daar is niets aan veranderd.
De opslag van de oude game (`economic-game-3-mavo-v2`) wordt niet aangeraakt.

Leerlingen nemen hun voortgang één keer mee naar de nieuwe app:
1. In de oude game: **Collectie › Bewaar voortgang (bestand)**.
2. In de nieuwe app: **Account › Voortgang uit de oude H3-game › Kies bestand uit de oude game**.
   Het gewone knopje "Zet bestand terug" herkent een oud bestand ook.
3. Wat er meekomt: de behaalde paragrafen (oude medaille of alle drie de levels gehaald = brons of beter in het nieuwe level),
   de Expertwijk, het diploma H3 als de hoofdstuk-eindtoets gehaald was, de oefentijd (telt mee in de ranglijst),
   munten (1 oude munt = 5 nieuwe munten) en XP voor elk goed antwoord.
4. Opnieuw inlezen mag altijd: alles wordt samengevoegd met "beste telt" en tijd en munten tellen maar één keer.

Staat de nieuwe app op hetzelfde webadres als de oude game (bijvoorbeeld in een map op dezelfde Netlify-site), dan ziet
de app de oude voortgang zelf en krijgt de leerling op de startpagina de knop **Neem mijn voortgang mee**. Een bestand is dan niet nodig.

## Zo raakt er niets kwijt

1. Elke tik wordt direct op de iPad bewaard (opslagsleutel `eco3m-v1`, met een reservekopie).
2. Na een paar seconden gaat de voortgang naar jouw Google Sheet. Zonder internet probeert de app het later opnieuw.
3. Elke leerling krijgt een **speler-ID** en een **herstelcode** (6 cijfers). Nieuwe iPad of Safari gewist: "Ik heb al een account".
4. De server neemt nooit een oudere stand over een nieuwere heen.

Na 10 foute herstelpogingen wordt een account geblokkeerd. Vrijgeven: zet in het tabblad *Spelers* de kolom
"Mislukte herstelpogingen" op 0.

## Nieuwe servercode zetten (na een update van `server/Code.gs`)

1. Open je spreadsheet "Economie 3M – server" en kies **Extensies › Apps Script**.
2. Vervang alle code door de nieuwe `server/Code.gs` en klik op Opslaan.
3. Kies de functie **setup** en klik op **Uitvoeren** (zet nieuwe kolomkoppen neer; er gaat niets verloren).
4. **Implementeren › Implementaties beheren › potlood › Versie: Nieuwe versie › Implementeren.** De URL blijft gelijk.

## Server installeren op je schoolaccount (eenmalig, ongeveer 10 minuten, gratis)

Gebruik een **eigen, nieuwe** spreadsheet, niet die van de 4 mavo-app.

1. Log in met je schoolaccount op sheets.google.com en maak een lege spreadsheet "Economie 3M – server". Deel hem met niemand.
2. Kies **Extensies › Apps Script**. Verwijder de voorbeeldcode en plak de inhoud van `server/Code.gs`. Klik op Opslaan.
3. Controleer bovenaan `CFG`: `DOCENT_CODE: '1103'` `KLASSEN: ['3m.ec1', '3m.ec2', '3m.ec3']` (de clusters) en `STAMKLASSEN: ['3ma', '3mb', '3mc', '3md']`. Pas de clusters aan als ze veranderen
   (dezelfde namen moeten in `src/core.js` bij `KLASSEN` staan; Claude past dat aan).
4. Kies de functie **setup** en klik op **Uitvoeren**. Geef toestemming (Geavanceerd › Ga naar … › Toestaan).
   Er verschijnen de tabbladen Spelers, Data en Logboek.
5. **Implementeren › Nieuwe implementatie › Web-app**. Uitvoeren als: *Ikzelf*. Toegang: *Iedereen*. Kopieer de URL (eindigt op `/exec`).
6. Stuur de URL naar Claude. Die zet hem in de app en zet de nieuwe versie online.

Werkt "Toegang: Iedereen" niet op je schoolaccount (sommige scholen blokkeren dat), kies dan *Iedereen binnen [school]*
alleen als alle leerlingen met hun schoolaccount ingelogd zijn op de iPad, of gebruik een privé Google-account.

Zonder server-URL draait de app in testmodus: alles staat dan alleen op het apparaat.

## Online zetten (gratis, GitHub Pages)

1. Repository `economie-3mavo` op GitHub (public).
2. **Settings › Pages › Source: Deploy from a branch › main / (root)**. Na een minuut staat de app op
   `https://groefsema1984.github.io/economie-3mavo/`.

## Op de iPad (voor leerlingen)

1. Open de link in **Safari**.
2. Tik op het deel-icoon en kies **Zet op beginscherm**.
3. Open de app vanaf het beginscherm en maak daar pas je account aan. Maak een screenshot van je speler-ID en herstelcode.
4. Heb je in de oude H3-game gespeeld? Lees je voortgang in via Account.

## Nieuwe hoofdstukken toevoegen (H4, H5, H6, H8)

Zet het KADER-bestand in Drive en vraag Claude het hoofdstuk te bouwen. Er komt dan een `src/data-hX.js` bij met levels per
paragraaf, de titel komt in `src/data-basis.js`, de examenbegrippen in `src/data-nieuw.js` en de lagen in `src/lagen.txt`.
De voortgang van leerlingen blijft staan.

## Privacy

In de Sheet staan voor- en achternaam, klas en oefenresultaten. Geen e-mail of leerlingnummer. Stem dit kort af met
de privacyfunctionaris van school.
