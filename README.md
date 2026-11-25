# Economie 3 MAVO · oefenapp

Interactieve oefenapp voor economie 3 MAVO (methode Pincode) van het Vellesan College. Zelfde opzet en functies als de 4 mavo-app (versie 2.0): levels per paragraaf, slim oefenen, Leren-menu, eindexamentrainer, kern/methode/verdieping en een docentendashboard via een Google Sheet.

- Hoofdstukken nu: H1 Hoe welvarend ben jij?, H2 Geld genoeg, H3 De bank en jouw geld (met alle vragen van de oude H3-game) en H7 Wie heeft het voor het zeggen?. H4, H5, H6 en H8 staan klaar als "binnenkort".
- App: `index.html` (één bestand, gebouwd uit `src/` met `python3 src/build.py`)
- Server: `server/Code.gs` (Google Apps Script + Google Sheet)
- Lagen per begrip: `src/lagen.txt` (k = kern, m = methode, v = verdieping)
- Oude H3-voortgang overnemen: `src/oud.js`
- Uitleg voor de docent: [HANDLEIDING-DOCENT.md](HANDLEIDING-DOCENT.md)
