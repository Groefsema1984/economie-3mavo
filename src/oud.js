// ===== Voortgang uit de oude H3-game (Economic Game 3 mavo, opslagsleutel 'economic-game-3-mavo-v2') =====
// De oude game blijft gewoon draaien. Leerlingen nemen hun voortgang één keer mee:
//  1. via het bestand dat ze in de oude game bewaren (Collectie > Bewaar voortgang), of
//  2. automatisch, als deze app op hetzelfde webadres staat als de oude game (dan is de oude opslag leesbaar).
// Opnieuw inlezen kan altijd: alles wordt samengevoegd met 'beste telt', er gaat nooit iets verloren en tijd telt maar één keer.
const OUD_KEY = 'economic-game-3-mavo-v2';
const OUD_MEDAIL = {brons:6, zilver:7, goud:8};            // oude medaille -> score in een level van 8 vragen
const OUD_PAR = {'3.1':'h3.1','3.2':'h3.2','3.3':'h3.3','3.4':'h3.4','E':'h3.e'};
const isOudeStaat = x => !!x && typeof x==='object' && !x.id && (x.m3!==undefined || x.munten!==undefined || x.stats!==undefined) && x.lv!==undefined;

function oudeOpslag(){ try{ const r=localStorage.getItem(OUD_KEY)||localStorage.getItem(OUD_KEY+'-vorig'); const o=r?JSON.parse(r):null; return isOudeStaat(o)?o:null }catch(e){ return null } }

// rekent een oude staat om naar velden van deze app en voegt ze samen met S (beste telt)
function oudInlezen(o){
  if(!isOudeStaat(o)) throw new Error('Dit is geen voortgangsbestand van de oude H3-game');
  const lv=o.lv||{}, toets=o.toets||{}, imp=S.oudImport||{sec:0,munten:0,goed:0};
  let levels=0;
  for(const [par,nieuw] of Object.entries(OUD_PAR)){
    const ok=[0,1,2].filter(i=>lv[par+'-'+i]&&lv[par+'-'+i].ok).length;
    const t=toets[par]||{}; const med=t.medal?OUD_MEDAIL[t.medal]:0;
    let best=Math.max(med, ok===3?6:ok>0?Math.round(ok/3*5):0);
    if(par==='E'){ const eb=(o.toets&&o.toets.E)||{}; best=Math.max(best, eb.medal?OUD_MEDAIL[eb.medal]:0) }
    if(!best) continue; levels++;
    const r=S.lv[nieuw]||{best:0,n:0}; r.best=Math.max(r.best||0,best); r.n=Math.max(r.n||0,1); r.oud=1; S.lv[nieuw]=r;
  }
  // wie in de oude game verder is gekomen dan de voorkennis, hoeft 'Weet je het nog?' niet opnieuw te halen
  if(levels){ const r=S.lv['h3.0']||{best:0,n:0}; r.best=Math.max(r.best||0,6); r.n=Math.max(r.n||0,1); r.oud=1; S.lv['h3.0']=r }
  // hoofdstuk-eindtoets (20 vragen) gehaald -> diploma H3
  if(o.m3&&o.m3.medal){ const t=S.toets.h3||{n:0}; t.klaar=1; t.n=Math.max(t.n||0,o.m3.pog||1); t.beste=Math.max(t.beste||0,TOETS_VRAGEN); t.oud=1; S.toets.h3=t }
  // oefentijd: alleen wat er sinds een vorige import bij is gekomen
  const sec=Math.round((o.stats&&o.stats.sec)||0), extraSec=Math.max(0,sec-(imp.sec||0));
  if(extraSec){ S.tijd=(S.tijd||0)+extraSec;
    const weken=o.weken||{}; let verdeeld=0;
    for(const [w,x] of Object.entries(weken)){ if(!/^\d{4}-W\d\d$/.test(w)||!x||!x.sec) continue; const nu=Math.min(x.sec,Math.max(0,extraSec-verdeeld)); if(!nu) continue; S.week[w]=(S.week[w]||0)+nu; verdeeld+=nu }
    const dagen=o.dag||{}; let dv=0;
    for(const [d,x] of Object.entries(dagen)){ if(!/^\d{4}-\d\d-\d\d$/.test(d)||!x||!x.sec) continue; const nu=Math.min(x.sec,Math.max(0,extraSec-dv)); if(!nu) continue; S.dag[d]=(S.dag[d]||0)+nu; dv+=nu }
    imp.sec=sec }
  // munten en goede antwoorden: oude munten worden 5 munten in deze app, goede antwoorden geven XP
  const nM=(o.munten||[]).length, extraM=Math.max(0,nM-(imp.munten||0)); if(extraM){ S.mVerd+=extraM*5; imp.munten=nM }
  const g=(o.stats&&o.stats.g)||0, extraG=Math.max(0,g-(imp.goed||0)); if(extraG){ S.xp+=extraG*10; imp.goed=g }
  imp.datum=vandaag(); imp.naam=[o.voornaam,o.achternaam].filter(Boolean).join(' ')||o.naam||''; S.oudImport=imp;
  checkBadges(); bewaar(); if(typeof sync==='function') planSync(500);
  return {levels, diploma:!!(o.m3&&o.m3.medal), minuten:Math.round(sec/60), munten:extraM*5};
}
function oudMelding(r){ return `Oude H3-voortgang ingelezen: ${r.levels} paragra${r.levels===1?'af':'fen'}${r.diploma?', diploma H3':''}, ${r.minuten} minuten oefentijd${r.munten?`, +${r.munten} munten`:''}.` }
function oudBestand(f){ if(!f) return; const rd=new FileReader(); rd.onload=()=>{ try{ const r=oudInlezen(JSON.parse(rd.result)); melding(oudMelding(r),5000); go('wereld','h3') }catch(e){ melding(e.message||'Dit bestand kan ik niet lezen',4000) } }; rd.readAsText(f) }
function oudVanApparaat(){ const o=oudeOpslag(); if(!o){ melding('Geen oude voortgang gevonden op dit apparaat'); return } try{ const r=oudInlezen(o); melding(oudMelding(r),5000); go('wereld','h3') }catch(e){ melding(e.message,4000) } }

// blok voor het Account-scherm en een melding op de startpagina
function oudBlok(){ const auto=oudeOpslag(); const al=S.oudImport;
  return `<div class="sectie">Voortgang uit de oude H3-game</div><div class="kaart"><p class="zacht" style="margin-top:0">Heb je in de oude game (De Bank-stad) al levels gehaald? Neem ze mee naar H3. Bewaar in de oude game eerst je voortgang: Collectie › Bewaar voortgang (bestand). Kies dat bestand hier.${al?` <br>Laatst ingelezen op ${esc(al.datum)}. Opnieuw inlezen mag: je raakt niets kwijt.`:''}</p>
   <div class="voet" style="justify-content:flex-start">${auto?`<button class="knop" onclick="oudVanApparaat()">Neem over van dit apparaat</button>`:''}<label class="knop ${auto?'zacht':''}">Kies bestand uit de oude game<input type="file" style="display:none" onchange="oudBestand(this.files[0])"></label></div></div>` }

// Account-scherm uitbreiden en bestand terugzetten slim maken (een oud bestand gaat via de import)
{ const _acc=SCHERMEN.account; SCHERMEN.account=function(){ return _acc().replace(/<p class="zacht" style="font-size:13px">Versie/,oudBlok()+'<p class="zacht" style="font-size:13px">Versie') } }
{ const _imp=importBestand; importBestand=function(f){ if(!f) return; const rd=new FileReader(); rd.onload=()=>{ let x=null; try{ x=JSON.parse(rd.result) }catch(e){} if(isOudeStaat(x)){ try{ const r=oudInlezen(x); melding(oudMelding(r),5000); go('wereld','h3') }catch(e){ melding(e.message,4000) } } else _imp(f) }; rd.readAsText(f) } }

// melding op de startpagina zolang de oude voortgang op dit apparaat nog niet is overgenomen
{ const _home=SCHERMEN.home; SCHERMEN.home=function(){ const h=_home(); if(S.oudImport||!oudeOpslag()) return h;
  return h.replace('<div class="wrap">',`<div class="wrap"><div class="kaart" style="margin-bottom:14px;border:2px solid var(--oranje,#f08a09)"><b>Je hebt al gespeeld in de oude H3-game.</b><p class="zacht" style="margin:6px 0 10px">Neem je levels, oefentijd en munten mee naar hoofdstuk 3.</p><button class="knop" onclick="oudVanApparaat()">Neem mijn voortgang mee</button></div>`) } }
