// ===== Hoofdstuk 3: De bank en jouw geld (bron: 01_KADER_ECONOMIE_MAVO_3_PINCODE_H3 en de vragen van Economic Game 3 mavo, versie 4) =====
// De vraaggeneratoren van de oude game staan hieronder ongewijzigd in een eigen blok (H3OUD), zodat alle vraagsoorten blijven werken.
// Alle bedragen, rentes, koersen en namen zijn fictief.
const H3OUD = (function(){
/* ---------- hulpjes ---------- */
const $=s=>document.querySelector(s);
const rnd=n=>Math.floor(Math.random()*n);
const pick=a=>a[rnd(a.length)];
const shuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=rnd(i+1);[a[i],a[j]]=[a[j],a[i]]}return a};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const r2=x=>Math.round(x*100)/100;
const fmt=x=>Number.isInteger(x)?String(x):r2(x).toFixed(2).replace('.',',');
const eur=x=>(x<0?'−':'')+'€'+r2(Math.abs(x)).toFixed(2).replace('.',',');
const dstr=d=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
const vandaag=()=>dstr(new Date());
const DATUM=()=>new Date().toLocaleDateString('nl-NL',{day:'numeric',month:'long',year:'numeric'});
const BEG=[
 {t:'geld1',term:'Directe ruil',def:'Goederen ruilen tegen goederen, zonder geld.'},
 {t:'geld1',term:'Indirecte ruil',def:'Goederen ruilen tegen geld.'},
 {t:'geld1',term:'Ruilmiddel',def:'Geld gebruik je om dingen mee te kopen.'},
 {t:'geld1',term:'Rekenmiddel',def:'Met geld reken je uit hoeveel dingen waard zijn.'},
 {t:'geld1',term:'Spaarmiddel',def:'Met geld bewaar je waarde voor later.'},
 {t:'geld2',term:'Chartaal geld',def:'Munten en biljetten.'},
 {t:'geld2',term:'Giraal geld',def:'Geld op je bankrekening.'},
 {t:'geld2',term:'Elektronisch betalen',def:'Betalen met pinpas, app, internetbankieren of creditcard.'},
 {t:'geld2',term:'Creditsaldo',def:'Een positief saldo: je hebt geld op je rekening.'},
 {t:'geld2',term:'Debetsaldo',def:'Een negatief saldo: je staat rood.'},
 {t:'geld2',term:'Debetrente',def:'Rente die je betaalt als je rood staat.'},
 {t:'spaar',term:'Variabele rente',def:'Rente die tussentijds kan veranderen.'},
 {t:'spaar',term:'Vaste rente',def:'Rente die niet verandert.'},
 {t:'spaar',term:'Spaardeposito',def:'Geld staat voor een afgesproken periode vast tegen een vaste rente.'},
 {t:'spaar',term:'Enkelvoudige rente',def:'Rente die alleen over het begin­bedrag wordt berekend.'},
 {t:'spaar',term:'Samengestelde rente',def:'Rente op rente. In de stof: maximaal 3 jaar.'},
 {t:'lenen',term:'Persoonlijke lening',def:'Een lening voor een aankoop of uitgave.'},
 {t:'lenen',term:'Koop op afbetaling',def:'Iets kopen en het in termijnen betalen.'},
 {t:'lenen',term:'Salariskrediet',def:'Krediet dat je terugbetaalt uit je salaris.'},
 {t:'lenen',term:'Hypothecaire lening',def:'Een lening om een huis te kopen; de woning is het onderpand.'},
 {t:'bank',term:'Beleggen',def:'Geld inzetten voor rendement: meer risico, mogelijk meer opbrengst.'},
 {t:'bank',term:'Vreemde valuta',def:'Geld van een ander land.'},
 {t:'bank',term:'Wisselkoers',def:'De prijs van vreemd geld uitgedrukt in je eigen geld.'},
 {t:'bank',term:'Eurozone',def:'Landen die de euro als betaalmiddel gebruiken.'}
];
const TOPIC={geld1:'Ruilen en geldfuncties',geld2:'Betalen, chartaal en giraal geld',spaar:'Sparen en rente',lenen:'Lenen en krediet',bank:'Beleggen en vreemd geld'};
const MOT_SPAAR=[
 {s:'Je zet elke maand iets opzij voor een nieuwe telefoon.',a:'Sparen voor een doel'},
 {s:'Je spaart om over twee jaar op vakantie te kunnen.',a:'Sparen voor een doel'},
 {s:'Je houdt geld apart voor als je ineens ziek wordt.',a:'Sparen uit voorzorg'},
 {s:'Je zet geld weg voor als je je baan kwijtraakt.',a:'Sparen uit voorzorg'},
 {s:'Je zet geld weg om er via rente meer van te maken.',a:'Sparen voor de rente'},
 {s:'Je laat je geld staan omdat de bank er rente over geeft.',a:'Sparen voor de rente'}];
const MOT_LEEN=[
 {s:'Deze maand komt je geld te kort om de huur te betalen. Het is maar tijdelijk.',a:'Tijdelijk geldtekort'},
 {s:'Je fiets is kapot en je hebt nu meteen geld nodig.',a:'Onverwacht dringend geld nodig'},
 {s:'Je hebt ineens een reparatie in huis nodig en moet snel betalen.',a:'Onverwacht dringend geld nodig'},
 {s:'Je wilt nu al een dure aankoop doen, zonder te wachten.',a:'Een dure aankoop doen'},
 {s:'Je wilt een huis kopen.',a:'Een woning kopen'}];
const RENTESOORT=[
 {s:'Je krijgt elk jaar rente over je rente.',a:'Samengestelde rente'},
 {s:'Je krijgt elk jaar rente, alleen over je oorspronkelijke bedrag.',a:'Enkelvoudige rente'},
 {s:'De rente kan tussentijds veranderen.',a:'Variabele rente'},
 {s:'De rente blijft de hele looptijd hetzelfde.',a:'Vaste rente'}];

/* ---------- wereld: hoofdstuk 3 met vier wijken ---------- */
const WERELD={naam:'De Bank-stad',hoofdstuk:'Hoofdstuk 3 · De bank en jouw geld'};
const PAR=[
 {id:'3.1',naam:'Hoe betaal je?',k:'#2E94D6',wijk:'Betaalwijk',lv:[
   {naam:'Ruilen en geldfuncties',g:['begrip:geld1','koppel:geld1','waar:geld1','invul:geld1']},
   {naam:'Chartaal en giraal',g:['begrip:geld2','rood','situatie','waar:geld2','invul:geld2']},
   {naam:'Saldo berekenen',g:['saldo','zoek:saldo','rood']}]},
 {id:'3.2',naam:'Waarvoor zou je sparen?',k:'#D8336E',wijk:'Spaarwijk',lv:[
   {naam:'Spaarmotieven',g:['motief:spaar','begrip:spaar','inflatie','waar:spaar']},
   {naam:'Enkelvoudige rente',g:['rente','rentepct','rentesoort','zoek:rente','invul:spaar']},
   {naam:'Samengestelde rente',g:['samen','zoek:samen','rentesoort','koppel:spaar']}]},
 {id:'3.3',naam:'Geld lenen kost geld',k:'#E8922E',wijk:'Leenwijk',lv:[
   {naam:'Leenmotieven',g:['motief:leen','waar:lenen']},
   {naam:'Kredietvormen',g:['begrip:lenen','situatie','koppel:lenen','invul:lenen']},
   {naam:'Kredietkosten',g:['krediet','krediet','motief:leen']}]},
 {id:'3.4',naam:'Nog meer bankzaken',k:'#4BAA6B',wijk:'Beursbuurt',lv:[
   {naam:'Banken en beleggen',g:['begrip:bank','belegg','bankrol','waar:bank','invul:bank']},
   {naam:'Vreemd geld kopen',g:['koop','koop','aankoop2']},
   {naam:'Vreemd geld verkopen',g:['verkoop','koop','begrip:bank']}]}
];
const PAR_GENS=p=>[...new Set(p.lv.flatMap(l=>l.g))];
const ALLE_GENS=[...new Set(PAR.flatMap(PAR_GENS))];
/* Expertwijk: open na de hoofdstuk-eindtoets. Vragen op examenniveau. Telt niet mee in 'levels van 12'. */
const EXPERT={id:'E',naam:'Examentraining',k:'#7B4FD6',wijk:'Expertwijk',expert:true,lv:[
   {naam:'Betalen, sparen en rente',g:['x:afschrift','x:rood','x:groeifactor','x:verschil','x:bankkeus','x:inflatie','x:deposito','x:stelling:spaar']},
   {naam:'Lenen en krediet',g:['x:tweeleningen','x:afbetaling','x:termijn','x:debet','x:leencasus','x:stelling:lenen']},
   {naam:'Vreemd geld en bankzaken',g:['x:koerstabel','x:vakantie','x:wisselverlies','x:prijs','x:eurozone','x:bankcasus','x:stelling:bank']}]};
const ALLP=PAR.concat([EXPERT]);
const EMEDAL=[{n:'brons',e:'🥉',min:7,w:15},{n:'zilver',e:'🥈',min:9,w:25},{n:'goud',e:'🥇',min:10,w:40}];
const X_PER_LEVEL=5;

/* ---------- toetsregels ---------- */
const MEDAL=[{n:'brons',e:'🥉',min:8,w:5},{n:'zilver',e:'🥈',min:9,w:10},{n:'goud',e:'🥇',min:10,w:15}];
const HMEDAL=[{n:'brons',e:'🥉',min:16,w:20},{n:'zilver',e:'🥈',min:18,w:30},{n:'goud',e:'🥇',min:20,w:50}];
const medalRang=n=>n==='goud'?3:n==='zilver'?2:n==='brons'?1:0;
function medalVan(score,lijst){let m=null;lijst.forEach(x=>{if(score>=x.min)m=x});return m}

/* ---------- vraaggeneratoren (elk antwoord is controleerbaar) ---------- */
function genBegrip(t,term){
 const pool=BEG.filter(b=>b.t===t);const it=term?pool.find(x=>x.term===term):pick(pool);
 const ander=shuf(pool.filter(x=>x!==it)).slice(0,2);
 const sig='begrip:'+t+'|'+it.term;
 if(!term&&Math.random()<.5){
  const opts=shuf([it.term].concat(ander.map(x=>x.term)));
  return{sig,type:'begrip',label:TOPIC[t],tekst:'Welk begrip hoort bij deze uitleg?\n“'+it.def+'”',kies:opts,ans:opts.indexOf(it.term),uitleg:it.term+': '+it.def,tip:'Let op de kernwoorden in de uitleg.'};
 }
 const opts=shuf([it.def].concat(ander.map(x=>x.def)));
 return{sig,type:'begrip',label:it.term,tekst:'Wat betekent “'+it.term+'”?',kies:opts,ans:opts.indexOf(it.def),uitleg:it.term+': '+it.def,tip:'Denk aan wat het woord zelf al zegt.'};
}
function genMotief(soort){
 const L=soort==='spaar'?MOT_SPAAR:MOT_LEEN;const it=pick(L);
 const ander=[];shuf(L.filter(x=>x.a!==it.a)).forEach(x=>{if(ander.length<2&&!ander.includes(x.a))ander.push(x.a)});
 const opts=shuf([it.a].concat(ander));
 return{sig:'motief:'+soort,type:'motief',label:soort==='spaar'?'Spaarmotieven':'Leenmotieven',tekst:'Welk motief past bij dit voorbeeld?\n“'+it.s+'”',kies:opts,ans:opts.indexOf(it.a),uitleg:'Dit motief is: '+it.a+'. (Het voorbeeld is fictief.)',tip:'Waarom doet iemand dit: om iets te kopen, om te overleven of om rente te krijgen?'};
}
function genRentesoort(){
 const it=pick(RENTESOORT);const ander=shuf(RENTESOORT.filter(x=>x.a!==it.a)).slice(0,2).map(x=>x.a);
 const opts=shuf([it.a].concat(ander));
 return{sig:'rentesoort',type:'rentesoort',label:'Soorten rente',tekst:'Welke soort rente past bij dit voorbeeld?\n“'+it.s+'”',kies:opts,ans:opts.indexOf(it.a),uitleg:it.a+'. Enkelvoudig is alleen over het begin­bedrag; samengesteld is rente op rente.',tip:'Let op: is de rente over het begin­bedrag, of ook over eerder bijgeschreven rente?'};
}
function genRood(){
 const neg=Math.random()<.5;const b=neg?-10*(1+rnd(40)):10*(1+rnd(60));
 const opts=shuf(['Ja, je staat rood','Nee, je saldo is positief']);
 return{sig:'rood',type:'rood',label:'Creditsaldo of debetsaldo',tekst:'Je betaalrekening heeft een saldo van '+eur(b)+'.\nStaat je rood?',kies:opts,ans:opts.indexOf(b<0?'Ja, je staat rood':'Nee, je saldo is positief'),uitleg:b<0?'Een negatief saldo is een debetsaldo: je staat rood. Je betaalt dan debetrente.':'Een positief saldo is een creditsaldo.',tip:'Kijk naar het teken voor het bedrag.'};
}
function genSaldo(){
 const b=100*(2+rnd(8))+50*rnd(2),ont=50*(1+rnd(8));let bet=50*(1+rnd(8));if(bet>=b+ont)bet=50;
 const ans=b+ont-bet;
 return{sig:'saldo',type:'saldo',label:'Saldo berekenen',tekst:'Je saldo is '+eur(b)+'. Je krijgt '+eur(ont)+' binnen en je betaalt '+eur(bet)+'.\nWat is je nieuwe saldo?',num:true,ans,tol:.005,eenheid:'euro',hint:'Nieuw saldo = oud saldo + ontvangsten − betalingen.',uitleg:'Nieuw saldo = '+b+' + '+ont+' − '+bet+' = '+ans+' euro.'};
}
function genRente(){
 const K=100*(5+rnd(46)),r=2+rnd(5),t=1+rnd(5),ans=r2(K*r/100*t);
 return{sig:'rente',type:'rente',label:'Enkelvoudige rente',tekst:'Je zet '+eur(K)+' op een spaarrekening met fictief '+r+'% enkelvoudige rente per jaar.\nHoeveel rente krijg je na '+t+' jaar?',num:true,ans,tol:.01,eenheid:'euro',hint:'Enkelvoudige rente = kapitaal × rente × tijd.',uitleg:'Rente = '+K+' × '+fmt(r/100)+' × '+t+' = '+fmt(ans)+' euro.'};
}
function genRentepct(){
 const K=100*(5+rnd(46)),r=2+rnd(5),R=K*r/100;
 return{sig:'rentepct',type:'rentepct',label:'Rentepercentage',tekst:'Je zet '+eur(K)+' op een spaarrekening. Na 1 jaar krijg je '+eur(R)+' rente (enkelvoudig).\nHoeveel procent rente is dat?',num:true,ans:r,tol:.05,eenheid:'%',hint:'Percentage = rente ÷ kapitaal × 100.',uitleg:'Percentage = '+R+' ÷ '+K+' × 100 = '+r+'%.'};
}
function genSamen(){
 const K=100*(5+rnd(46)),r=2+rnd(4),t=2+rnd(2),gf=1+r/100,ans=r2(K*Math.pow(gf,t));
 return{sig:'samen',type:'samen',label:'Samengestelde rente',tekst:'Je zet '+eur(K)+' op een spaarrekening met fictief '+r+'% samengestelde rente per jaar.\nWat is je spaarsaldo na '+t+' jaar?',num:true,ans,tol:.05,eenheid:'euro',hint:'Groeifactor = 1 + rente/100. Saldo = kapitaal × groeifactor^jaren.',uitleg:'Groeifactor = '+fmt(gf)+'. Saldo = '+K+' × '+fmt(gf)+'^'+t+' = '+fmt(ans)+' euro.'};
}
function genKrediet(){
 const n=pick([12,24]),termijn=100+10*rnd(16),tot=termijn*n,kosten=10*Math.round(tot*.08/10),kr=tot-kosten;
 return{sig:'krediet',type:'krediet',label:'Kredietkosten',tekst:'Je krijgt een krediet van '+eur(kr)+'. Je betaalt het terug in '+n+' maandtermijnen van '+eur(termijn)+'.\nHoeveel kredietkosten betaal je in totaal?',num:true,ans:kosten,tol:.5,eenheid:'euro',hint:'Kredietkosten = termijnbedrag × aantal termijnen − krediet.',uitleg:'Kredietkosten = '+termijn+' × '+n+' − '+kr+' = '+kosten+' euro.'};
}
const wk=()=>Math.floor(Date.now()/(7*864e5));
const koersF=w=>1+0.06*Math.sin(w*1.7)+0.02*Math.cos(w*0.9);
const AANK=(w)=>r2(1.20*koersF(w===undefined?wk():w));  // bank: je krijgt minder ZM per euro
const VERK=(w)=>r2(1.25*koersF(w===undefined?wk():w));  // bank: je krijgt minder euro per ZM
function genKoop(){
 const k=AANK(),e=10*(5+rnd(90)),ans=r2(e*k);
 return{sig:'koop',type:'valuta',label:'Vreemd geld kopen',tekst:'Je koopt voor '+eur(e)+' vreemd geld. De aankoopprijs van deze week is fictief '+fmt(k)+' Zonnemunt (ZM) per euro.\nHoeveel ZM krijg je?',num:true,ans,tol:.01,eenheid:'ZM',hint:'Vreemd geld = bedrag in euro\'s × aankoopprijs.',uitleg:'Vreemd geld = '+e+' × '+fmt(k)+' = '+fmt(ans)+' ZM.'};
}
function genVerkoop(){
 const k=VERK(),v=10*(5+rnd(90)),ans=r2(v/k);
 return{sig:'verkoop',type:'valuta',label:'Vreemd geld verkopen',tekst:'Je verkoopt '+fmt(v)+' ZM terug. De verkoopprijs van deze week is fictief '+fmt(k)+' ZM per euro.\nHoeveel euro krijg je? (Rond af op 2 decimalen.)',num:true,ans,tol:.01,eenheid:'euro',hint:'Bedrag in euro\'s = vreemd geld ÷ verkoopprijs.',uitleg:'Bedrag in euro\'s = '+fmt(v)+' ÷ '+fmt(k)+' = '+fmt(ans)+' euro.'};
}
const CRISIS=[
 {t:'Je fiets heeft een lekke band.',b:25},
 {t:'Je telefoon valt en het scherm is gebroken.',b:120},
 {t:'De tandarts vraagt een eigen bijdrage.',b:60},
 {t:'Je wasmachine gaat kapot.',b:250},
 {t:'Je moet onverwacht je kleding laten repareren.',b:40}];
/* sig = herkenningsteken van een vraagsoort; begrip-sigs bevatten ook het begrip zelf */
function genInflatie(){
 let r,i;do{r=1+rnd(5);i=1+rnd(6)}while(r===i);
 const opts=shuf(['De koopkracht stijgt','De koopkracht daalt']);
 const ans=opts.indexOf(i>r?'De koopkracht daalt':'De koopkracht stijgt');
 return{sig:'inflatie',type:'inflatie',label:'Inflatie en spaargeld',tekst:'Je spaargeld staat op een spaarrekening met fictief '+r+'% rente per jaar. De inflatie (prijsstijging) is fictief '+i+'% per jaar.\nWat gebeurt er met de koopkracht van je spaargeld na een jaar?',kies:opts,ans,uitleg:'Rente '+r+'%, inflatie '+i+'%. Als de inflatie hoger is dan de rente, kun je minder kopen met je geld: de koopkracht daalt.',tip:'Vergelijk de rente met de inflatie.'};
}
function genBankrol(){
 const L=[
  {s:'Een huishouden zet geld op een spaarrekening.',a:'Aanbod van geld'},
  {s:'Een huishouden neemt een hypotheek om een huis te kopen.',a:'Vraag naar geld'},
  {s:'Een bedrijf leent geld bij de bank om te investeren.',a:'Vraag naar geld'},
  {s:'Een huishouden zet spaargeld op de bank.',a:'Aanbod van geld'}];
 const it=pick(L);const opts=shuf(['Aanbod van geld','Vraag naar geld']);
 return{sig:'bankrol',type:'bank',label:'Vraag en aanbod van geld',tekst:'Wat is dit: vraag of aanbod van geld?\n“'+it.s+'”',kies:opts,ans:opts.indexOf(it.a),uitleg:it.a+'. Aanbod komt van huishoudens (spaargeld). Vraag komt van huishoudens (leningen, hypotheek) en bedrijven.',tip:'Wie stelt het geld beschikbaar, en wie vraagt het?'};
}
function genAankoop2(){
 const k=AANK(),v=10*(5+rnd(90)),ans=r2(v/k);
 return{sig:'aankoop2',type:'valuta',label:'Vreemd geld terug naar euro\'s',tekst:'Je hebt '+fmt(v)+' Zonnemunt (ZM). De aankoopprijs van deze week is fictief '+fmt(k)+' ZM per euro.\nHoeveel euro\'s is dat waard? (Rond af op 2 decimalen.)',num:true,ans,tol:.01,eenheid:'euro',hint:'Bedrag in euro\'s = bedrag in vreemd geld ÷ aankoopprijs.',uitleg:'Bedrag in euro\'s = '+fmt(v)+' ÷ '+fmt(k)+' = '+fmt(ans)+' euro.'};
}
function genBelegg(){
 const L=[
  {v:'Beleggen kan meer opleveren dan sparen, maar het risico is groter.',ok:true},
  {v:'Beleggen is altijd veilig en levert altijd meer op dan sparen.',ok:false},
  {v:'Bij sparen is het risico groter dan bij beleggen.',ok:false},
  {v:'Beleggen heeft geen kans op verlies.',ok:false}];
 const goed=L[0];const ander=shuf(L.slice(1)).slice(0,2);
 const opts=shuf([goed.v].concat(ander.map(x=>x.v)));
 return{sig:'belegg',type:'bank',label:'Beleggen of sparen',tekst:'Wat is waar over beleggen ten opzichte van sparen?',kies:opts,ans:opts.indexOf(goed.v),uitleg:'Beleggen: meer risico, mogelijk meer rendement. Sparen is veiliger, maar levert meestal minder op.',tip:'Denk aan het woord risico.'};
}
function genSituatie(){
 const L=[
  {s:'Je betaalt met je pinpas bij de bakker.',a:'Elektronisch betalen'},
  {s:'Je ruilt je oude fiets direct tegen een skateboard, zonder geld.',a:'Directe ruil'},
  {s:'Je koopt nu een tv en betaalt hem in 12 maandelijkse termijnen.',a:'Koop op afbetaling'},
  {s:'Je staat op je rekening rood en betaalt daarom extra rente.',a:'Debetrente'},
  {s:'Je krijgt elk jaar rente over je spaargeld én over eerder bijgeschreven rente.',a:'Samengestelde rente'},
  {s:'Je koopt een huis met een lening. Het huis dient als onderpand.',a:'Hypothecaire lening'}];
 const it=pick(L);const ander=shuf(L.filter(x=>x.a!==it.a)).slice(0,2).map(x=>x.a);
 const opts=shuf([it.a].concat(ander));
 return{sig:'situatie',type:'begrip',label:'Situaties herkennen',tekst:'Welk begrip past bij deze situatie?\n“'+it.s+'”',kies:opts,ans:opts.indexOf(it.a),uitleg:it.a+' past hier. Let op het kernwoord in de situatie.',tip:'Zoek het kernwoord: pinpas, ruilen, termijnen, rood, rente over rente, huis.'};
}
/* invulzin */
const INVUL=[
 {t:'geld1',z:'Goederen ruilen tegen goederen, zonder geld, heet ___ ruil.',o:['directe','indirecte','giraal'],u:'Directe ruil: je ruilt goederen direct tegen goederen.'},
 {t:'geld1',z:'Geld dat je gebruikt om dingen mee te kopen, heeft de functie van ___.',o:['ruilmiddel','rekenmiddel','verzekeringsmiddel'],u:'Ruilmiddel: je betaalt ermee voor goederen en diensten.'},
 {t:'geld2',z:'Bankbiljetten en munten zijn ___ geld.',o:['chartaal','giraal','elektronisch'],u:'Chartaal geld: geld in de vorm van bankbiljetten en munten.'},
 {t:'geld2',z:'Een betaling die via je bankrekening loopt, is ___ geld.',o:['giraal','chartaal'],u:'Giraal geld staat op een bankrekening.'},
 {t:'spaar',z:'Rente over eerder bijgeschreven rente heet ___ rente.',o:['samengestelde','enkelvoudige','vaste'],u:'Samengestelde rente: rente op rente.'},
 {t:'spaar',z:'Bij ___ rente blijft de rente de hele looptijd gelijk.',o:['vaste','variabele','samengestelde'],u:'Bij een vaste rente verandert de rente niet tijdens de looptijd.'},
 {t:'lenen',z:'Een lening met je huis als zekerheid heet een ___ lening.',o:['hypothecaire','persoonlijke','doorlopende'],u:'Bij een hypothecaire lening dient het huis als zekerheid.'},
 {t:'lenen',z:'Het bedrag dat je bovenop je lening betaalt, heten de ___.',o:['kredietkosten','spaarrente','inflatie'],u:'Kredietkosten zijn wat lenen je extra kost.'},
 {t:'bank',z:'Bij beleggen is het ___ groter dan bij sparen.',o:['risico','zekerheid'],u:'Beleggen kan meer opleveren, maar het risico is groter.'},
 {t:'bank',z:'Een bank brengt spaarders en leners bij elkaar: zij is een ___.',o:['tussenpersoon','werkgever','producent'],u:'Een bank is een tussenpersoon tussen spaarders en leners.'}];
function genInvul(t){
 const pool=INVUL.filter(x=>x.t===t);const it=pick(pool.length?pool:INVUL);
 const opts=shuf(it.o);
 return{sig:'invul:'+t,type:'invul',label:'Invulzin',tekst:'Vul het juiste woord in:\n“'+it.z+'”',kies:opts,ans:opts.indexOf(it.o[0]),fmt:'invul',uitleg:it.u,tip:'Lees de zin nog eens: welk woord past bij de betekenis?'};
}
/* nieuwe vraagvormen: waar/onwaar, zoek de fout, koppelen */
const WAAR=[
 {t:'geld1',v:'Geld heeft onder andere de functie van ruilmiddel: je kunt er goederen en diensten mee kopen.',w:true,u:'Waar. Ruilmiddel is een van de geldfuncties.'},
 {t:'geld1',v:'Bij directe ruil wordt altijd met geld betaald.',w:false,u:'Onwaar. Bij directe ruil ruil je goederen tegen goederen, zonder geld.'},
 {t:'geld1',v:'Een van de geldfuncties is waardebewaarmiddel: je kunt geld bewaren om het later te gebruiken.',w:true,u:'Waar. Geld kun je bewaren om het later te gebruiken.'},
 {t:'geld2',v:'Bankbiljetten en munten noemen we chartaal geld.',w:true,u:'Waar. Chartaal geld is geld in de vorm van bankbiljetten en munten.'},
 {t:'geld2',v:'Een betaling met je pinpas is een vorm van chartaal geld.',w:false,u:'Onwaar. Een pinbetaling is giraal: het geld wordt van je bankrekening afgeschreven.'},
 {t:'geld2',v:'Giraal geld is geld op een bankrekening, dat je via de bank overmaakt.',w:true,u:'Waar. Giraal geld staat op een rekening bij de bank.'},
 {t:'spaar',v:'Bij enkelvoudige rente krijg je ook rente over eerder bijgeschreven rente.',w:false,u:'Onwaar. Enkelvoudige rente is alleen over het oorspronkelijke bedrag. Rente over eerder bijgeschreven rente is samengestelde rente.'},
 {t:'spaar',v:'Bij samengestelde rente krijg je rente over eerder bijgeschreven rente.',w:true,u:'Waar. Dat is rente op rente.'},
 {t:'spaar',v:'Bij een vaste rente kan de rente tijdens de looptijd veranderen.',w:false,u:'Onwaar. Bij een vaste rente blijft de rente de hele looptijd hetzelfde.'},
 {t:'lenen',v:'Een debetsaldo betekent dat je op je rekening rood staat.',w:true,u:'Waar. Een negatief saldo is een debetsaldo: je staat rood.'},
 {t:'lenen',v:'Een creditsaldo betekent dat je op je rekening rood staat.',w:false,u:'Onwaar. Een creditsaldo is positief: je staat dan niet rood.'},
 {t:'lenen',v:'Een hoge rente maakt een lening duurder.',w:true,u:'Waar. Hoe hoger de rente, hoe meer je bovenop het geleende bedrag terugbetaalt.'},
 {t:'bank',v:'Beleggen heeft altijd risico: je kunt geld verliezen.',w:true,u:'Waar. Beleggen kan meer opleveren dan sparen, maar het risico is groter.'},
 {t:'bank',v:'Beleggen heeft geen risico.',w:false,u:'Onwaar. Beleggen heeft altijd risico.'},
 {t:'bank',v:'Een bank brengt spaarders en leners bij elkaar.',w:true,u:'Waar. Een bank is een tussenpersoon tussen spaarders en leners.'}];
function genWaar(t){
 const pool=WAAR.filter(x=>x.t===t);const it=pick(pool.length?pool:WAAR);
 return{sig:'waar:'+t,type:'waar',label:'Waar of onwaar',tekst:'Waar of onwaar?\n“'+it.v+'”',kies:['Waar','Onwaar'],ans:it.w?0:1,fmt:'waar',uitleg:it.u,tip:'Let op één woord in de zin: ook als dat ene woord fout is, is de zin onwaar.'};
}
function genZoek(kind){
 let K,steps,tekst,type;
 if(kind==='rente'){
  const k=100*(5+rnd(46)),r=2+rnd(5),t=2+rnd(4),jr=r2(k*r/100),R=r2(jr*t),T=r2(k+R);
  steps=[['Rente per jaar: '+k+' × '+r+'% = '+fmt(jr),'Rente per jaar: '+k+' × '+r+'% = '+fmt(r2(jr+5))],
         ['Rente over '+t+' jaar: '+fmt(jr)+' × '+t+' = '+fmt(R),'Rente over '+t+' jaar: '+fmt(jr)+' × '+t+' = '+fmt(r2(R+10))],
         ['Totaal: '+k+' + '+fmt(R)+' = '+fmt(T),'Totaal: '+k+' + '+fmt(R)+' = '+fmt(r2(T+7))]];
  tekst='Je zet '+eur(k)+' op een spaarrekening met fictief '+r+'% enkelvoudige rente per jaar, '+t+' jaar lang. Iemand rekent het totaal uit. Eén stap bevat een fout. Welke stap is fout?';type='rente';
 }else if(kind==='saldo'){
  const b=100*(2+rnd(8))+50*rnd(2),ont=50*(1+rnd(8));let bet=50*(1+rnd(8));if(bet>=b+ont)bet=50;
  const s1=b+ont,s2=s1-bet;
  steps=[['Ontvangsten erbij: '+b+' + '+ont+' = '+s1,'Ontvangsten erbij: '+b+' + '+ont+' = '+(s1+10)],
         ['Betalingen eraf: '+s1+' − '+bet+' = '+s2,'Betalingen eraf: '+s1+' − '+bet+' = '+(s2+20)],
         ['Nieuw saldo: '+eur(s2)+'. Je staat '+(s2>=0?'in de plus':'rood')+'.','Nieuw saldo: '+eur(s2)+'. Je staat '+(s2>=0?'rood':'in de plus')+'.']];
  tekst='Je saldo is '+eur(b)+'. Je krijgt '+eur(ont)+' binnen en je betaalt '+eur(bet)+'. Iemand rekent het nieuwe saldo stap voor stap uit. Eén stap bevat een fout. Welke stap is fout?';type='saldo';
 }else{
  const k=100*(5+rnd(46)),r=2+rnd(4),gf=1+r/100,y1=r2(k*gf),y2=r2(y1*gf);
  steps=[['Groeifactor: 1 + '+r+'/100 = '+fmt(gf),'Groeifactor: 1 + '+r+'/100 = '+fmt(r2(gf+0.1))],
         ['Saldo na 1 jaar: '+k+' × '+fmt(gf)+' = '+fmt(y1),'Saldo na 1 jaar: '+k+' × '+fmt(gf)+' = '+fmt(r2(y1+3))],
         ['Saldo na 2 jaar: '+fmt(y1)+' × '+fmt(gf)+' = '+fmt(y2),'Saldo na 2 jaar: '+fmt(y1)+' × '+fmt(gf)+' = '+fmt(r2(y2+4))]];
  tekst='Je zet '+eur(k)+' op een spaarrekening met fictief '+r+'% samengestelde rente per jaar. Na 2 jaar wil je het saldo weten. Iemand rekent het stap voor stap uit. Eén stap bevat een fout. Welke stap is fout?';type='samen';
 }
 const w=rnd(3);
 const opts=steps.map((st,i)=>i===w?st[1]:st[0]);
 return{sig:'zoek:'+kind,type:type,label:'Zoek de fout',tekst:tekst,kies:opts,ans:w,fmt:'zoek',uitleg:'De fout zit in stap '+(w+1)+'. Juist is: '+steps[w][0]+'.',tip:'Reken elke stap zelf na, één voor één.'};
}
function genKoppel(t){
 const pool=shuf(BEG.filter(b=>b.t===t)).slice(0,3);
 const termen=pool.map(b=>b.term);const defs=shuf(pool.map(b=>b.def));
 const ans=pool.map(b=>defs.indexOf(b.def));
 return{sig:'koppel:'+t,type:'begrip',label:'Koppelen: '+TOPIC[t],tekst:'Koppel elk begrip aan de juiste uitleg: '+termen.join(', ')+'.',koppel:{termen,defs,ans},uitleg:pool.map(b=>b.term+': '+b.def).join(' '),tip:'Koppel eerst het begrip dat je het zekerst weet.'};
}
/* ---------- EXPERTWIJK: examentraining (versie 3, november 2026) ----------
   Vragen op examenniveau (vmbo-gt): een casus, soms een bron (tabel), en rekenen in meer stappen.
   Alle namen, bedragen, rentes en koersen zijn fictief. Lesstof: kader H3 mavo 3. */
const NAMEN=['Noor','Daan','Sem','Lina','Milan','Yara','Finn','Sara','Ayoub','Emma','Jesse','Zoë'];
function xTabel(kop,rijen){
 return '<table><tr>'+kop.map(k=>'<th>'+esc(k)+'</th>').join('')+'</tr>'+rijen.map(r=>'<tr>'+r.map(c=>'<td>'+esc(c)+'</td>').join('')+'</tr>').join('')+'</table>';
}
const dec=x=>String(Math.round(x*10000)/10000).replace('.',',');
const pct=x=>dec(x)+'%';
const geld=x=>r2(x).toFixed(2).replace('.',',');
function xNum(o){return Object.assign({type:'examen',num:true,tol:.02,eenheid:'euro'},o)}
function xKies(o,opts,goed){const k=shuf(opts);return Object.assign({type:'examen',kies:k,ans:k.indexOf(goed)},o)}

/* ===== level 1: betalen, sparen en rente ===== */
const MUT_BIJ=[['Loon bijbaan',95,260],['Zakgeld',20,45],['Verjaardagsgeld',25,60],['Terugbetaling vriend',10,35]];
const MUT_AF=[['Pinbetaling supermarkt',12,48],['Telefoonabonnement',15,25],['Online bestelling',35,140],['Sportclub',18,32],['Bioscoop',11,24],['Pinbetaling kledingwinkel',30,90]];
const MAAND=['jan','feb','mrt','apr','mei','jun','sep','okt','nov'];
const centen=(lo,hi)=>r2(lo+rnd(hi-lo)+rnd(100)/100);
function xMutaties(nBij,nAf){
 const m=shuf(MUT_BIJ).slice(0,nBij).map(x=>({o:x[0],b:centen(x[1],x[2])})).concat(shuf(MUT_AF).slice(0,nAf).map(x=>({o:x[0],b:-centen(x[1],x[2])})));
 const L=shuf(m),mnd=pick(MAAND);let d=1+rnd(3);
 L.forEach(x=>{x.d=d+' '+mnd;d+=2+rnd(5)});
 return L;
}
function xAfschrift(){
 const nm=pick(NAMEN);let L,begin,eind,g=0;
 do{begin=centen(40,260);L=xMutaties(2,3);eind=r2(begin+L.reduce((s,x)=>s+x.b,0))}while(eind<5&&g++<50);
 const bron=xTabel(['Datum','Omschrijving','Bij / af','Bedrag'],[['','Beginsaldo','','€'+geld(begin)]].concat(L.map(x=>[x.d,x.o,x.b>0?'Bij':'Af','€'+geld(Math.abs(x.b))])));
 const bij=r2(L.filter(x=>x.b>0).reduce((s,x)=>s+x.b,0)),af=r2(-L.filter(x=>x.b<0).reduce((s,x)=>s+x.b,0));
 return xNum({sig:'x:afschrift',label:'Examen: bankafschrift',casus:nm+' bekijkt het afschrift van de betaalrekening (bron, fictief).',bron,tekst:'Bereken het saldo na de laatste mutatie.',ans:eind,tol:.01,hint:'Nieuw saldo = oud saldo + ontvangsten − betalingen. Tel eerst alles bij elkaar wat erbij komt, dan alles wat eraf gaat.',
  uitleg:'Stap 1: ontvangsten = €'+geld(bij)+'.\nStap 2: betalingen = €'+geld(af)+'.\nStap 3: nieuw saldo = '+geld(begin)+' + '+geld(bij)+' − '+geld(af)+' = €'+geld(eind)+'.'});
}
function xRood(){
 const nm=pick(NAMEN);let L,begin,eerste=-1,g=0;
 do{begin=centen(20,120);L=xMutaties(2,3);let s=begin;eerste=-1;L.forEach((x,i)=>{s=r2(s+x.b);if(s<0&&eerste<0)eerste=i})}while((eerste<1)&&g++<200);
 if(eerste<1)return null;
 const bron=xTabel(['Datum','Omschrijving','Bij / af','Bedrag'],[['','Beginsaldo','','€'+geld(begin)]].concat(L.map(x=>[x.d,x.o,x.b>0?'Bij':'Af','€'+geld(Math.abs(x.b))])));
 let s=begin;const loop=L.map(x=>{s=r2(s+x.b);return x.d+': '+(s<0?'−':'')+'€'+geld(Math.abs(s))});
 const opts=L.map(x=>x.d).filter((d,i)=>i!==eerste);
 const goed=L[eerste].d;const keuze=[goed].concat(shuf(opts).slice(0,2)).concat(['Het saldo wordt nergens negatief']);
 return xKies({sig:'x:rood',label:'Examen: rood staan',casus:nm+' bekijkt het afschrift van de betaalrekening (bron). Als het saldo negatief is, staat '+nm+' rood en betaalt '+nm+' debetrente.',bron,tekst:'Op welke datum komt het saldo voor het eerst onder nul (debetsaldo)?',tip:'Reken het saldo na elke mutatie uit, regel voor regel.',
  uitleg:'Saldo na elke mutatie:\n'+loop.join('\n')+'\nOp '+goed+' is het saldo voor het eerst negatief: een debetsaldo.'},keuze,goed);
}
function xGroeifactor(){
 const nm=pick(NAMEN),r=pick([1.5,2.5,3.5,4.5,2.8,3.2,1.8]),t=pick([3,4,5]),K=100*(5+rnd(40));
 const G=dec(1+r/100);
 const goed=K+' × '+G+'^'+t,o=[goed,K+' × '+G+' × '+t,K+' × '+dec(r/100)+'^'+t,K+' + '+K+' × '+dec(r/100)+' × '+t];
 return xKies({sig:'x:groeifactor',label:'Examen: groeifactor',casus:nm+' zet €'+K+' op een spaarrekening met fictief '+pct(r)+' samengestelde rente per jaar. '+nm+' laat het geld '+t+' jaar staan en haalt er niets af.',tekst:'Met welke berekening vind je het saldo na '+t+' jaar?',tip:'Groeifactor = 1 + rente/100. Bij rente op rente gebruik je een macht.',
  uitleg:'Groeifactor = 1 + '+dec(r)+'/100 = '+G+'. Rente op rente over '+t+' jaar: '+goed+'. ('+K+' + '+K+' × '+dec(r/100)+' × '+t+' is enkelvoudige rente.)'},o,goed);
}
function xVerschil(){
 const nm=pick(NAMEN),K=100*(10+rnd(41)),r=pick([2,2.5,3,3.5,4,5]),gf=1+r/100;
 const enk=r2(K*r/100*3),sam=r2(K*Math.pow(gf,3)-K),ans=r2(sam-enk);
 return xNum({ans,sig:'x:verschil',label:'Examen: enkelvoudig of samengesteld',casus:nm+' wil €'+K+' 3 jaar laten staan tegen fictief '+pct(r)+' rente per jaar. Bank A geeft enkelvoudige rente. Bank B geeft samengestelde rente (rente op rente).',tekst:'Hoeveel euro rente krijgt '+nm+' bij Bank B méér dan bij Bank A na 3 jaar? Rond af op 2 decimalen.',
  hint:'Reken beide uit. Enkelvoudig: kapitaal × rente × tijd. Samengesteld: kapitaal × groeifactor^3 − kapitaal.',
  uitleg:'Stap 1: enkelvoudig = '+K+' × '+dec(r/100)+' × 3 = €'+geld(enk)+'.\nStap 2: samengesteld = '+K+' × '+dec(gf)+'^3 − '+K+' = €'+geld(sam)+'.\nStap 3: verschil = '+geld(sam)+' − '+geld(enk)+' = €'+geld(ans)+'.'});
}
function xBankkeus(){
 const nm=pick(NAMEN);let K,a,b,A,B,g=0;
 do{K=500*(1+rnd(8));a=pick([3,3.5,4,4.5]);b=r2(a-pick([.2,.3,.4,.5]));A=r2(K+K*a/100*3);B=r2(K*Math.pow(1+b/100,3))}while(Math.abs(A-B)<1&&g++<60);
 const bron=xTabel(['Bank','Soort rente','Rente per jaar'],[['Bank Noord','enkelvoudig',pct(a)],['Bank Zuid','samengesteld (rente op rente)',pct(b)]]);
 const goed=A>B?'Bank Noord':'Bank Zuid';
 return xKies({sig:'x:bankkeus',label:'Examen: spaarrekeningen vergelijken',casus:nm+' wil €'+K+' 3 jaar sparen en haalt er tussendoor niets af. Twee banken doen een aanbod (bron, fictief).',bron,tekst:'Bij welke bank heeft '+nm+' na 3 jaar het hoogste spaarsaldo?',tip:'Een hoger percentage is niet altijd beter: reken allebei uit.',
  uitleg:'Bank Noord: '+K+' + '+K+' × '+dec(a/100)+' × 3 = €'+geld(A)+'.\nBank Zuid: '+K+' × '+dec(1+b/100)+'^3 = €'+geld(B)+'.\nDus '+goed+' geeft het meeste.'},['Bank Noord','Bank Zuid','Ze geven precies evenveel'],goed);
}
function xInflatie(){
 const nm=pick(NAMEN),dingen=[['een e-bike',900,1600],['een laptop',500,900],['een scooter',1200,2200],['een gitaarversterker',300,600]];
 const [d,lo,hi]=pick(dingen),P=10*Math.round((lo+rnd(hi-lo))/10);let r,i;do{r=pick([1,1.5,2,2.5]);i=pick([3,3.5,4,5])}while(i<=r);
 const nieuwP=r2(P*(1+i/100)),saldo=r2(P*(1+r/100)),ans=r2(nieuwP-saldo);
 return xNum({ans,sig:'x:inflatie',label:'Examen: inflatie en koopkracht',casus:nm+' heeft precies €'+P+' gespaard voor '+d+'. '+nm+' wacht nog een jaar. De spaarrente is fictief '+pct(r)+' per jaar. De prijs van '+d+' stijgt in dat jaar met '+pct(i)+' (inflatie).',tekst:'Hoeveel euro komt '+nm+' na een jaar tekort om '+d+' te kopen? Rond af op 2 decimalen.',
  hint:'Reken uit: de nieuwe prijs en het nieuwe spaarsaldo. Het verschil is het tekort.',
  uitleg:'Stap 1: nieuwe prijs = '+P+' × '+dec(1+i/100)+' = €'+geld(nieuwP)+'.\nStap 2: spaarsaldo = '+P+' × '+dec(1+r/100)+' = €'+geld(saldo)+'.\nStap 3: tekort = €'+geld(ans)+'. De inflatie is hoger dan de rente, dus de koopkracht van het spaargeld daalt.'});
}
function xDeposito(){
 const nm=pick(NAMEN),v=pick([0.8,1,1.2,1.5]),d1=r2(v+pick([0.8,1,1.2])),d3=r2(d1+pick([0.5,0.8,1])),K=500*(2+rnd(9));
 const bron=xTabel(['Spaarvorm','Rente','Soort rente'],[['Vrij opneembare spaarrekening',pct(v)+' per jaar','variabel'],['Spaardeposito 1 jaar',pct(d1)+' per jaar','vast'],['Spaardeposito 3 jaar',pct(d3)+' per jaar','vast']]);
 const gf=1+d3/100,ans=r2(K*Math.pow(gf,3));
 return xNum({ans,sig:'x:deposito',label:'Examen: spaardeposito',casus:nm+' erft €'+K+' en heeft het de komende 3 jaar niet nodig. '+nm+' kiest het spaardeposito van 3 jaar. De rente wordt elk jaar bijgeschreven (samengestelde rente). Zie de bron (fictief).',bron,tekst:'Hoeveel euro staat er na 3 jaar op het deposito? Rond af op 2 decimalen.',
  hint:'Zoek in de bron de juiste rente. Groeifactor = 1 + rente/100. Saldo = kapitaal × groeifactor^3.',
  uitleg:'Stap 1: de juiste regel is het deposito van 3 jaar: '+pct(d3)+'.\nStap 2: groeifactor = '+dec(gf)+'.\nStap 3: '+K+' × '+dec(gf)+'^3 = €'+geld(ans)+'.'});
}

/* ===== level 2: lenen ===== */
function xTweeLeningen(){
 const nm=pick(NAMEN),K=500*(4+rnd(9));let tA,tB,cA,cB,g=0;
 do{tA=Math.ceil(K*(1+pick([.05,.06,.07,.08]))/24);tB=Math.ceil(K*(1+pick([.08,.09,.1,.11,.12]))/36);cA=tA*24-K;cB=tB*36-K}while(cA===cB&&g++<50);
 const bron=xTabel(['Aanbieder','Aantal maandtermijnen','Termijnbedrag'],[['Lening A',24,'€'+tA],['Lening B',36,'€'+tB]]);
 const ans=Math.abs(cA-cB),beste=cA<cB?'A':'B';
 return xNum({ans,sig:'x:tweeleningen',label:'Examen: leningen vergelijken',casus:nm+' wil een persoonlijke lening van €'+K+' voor een auto. '+nm+' vergelijkt twee aanbiedingen (bron, fictief).',bron,tekst:'Hoeveel euro kredietkosten bespaart '+nm+' met de goedkoopste lening?',tol:.5,
  hint:'Kredietkosten = termijnbedrag × aantal termijnen − krediet. Reken dit voor A en B uit.',
  uitleg:'Lening A: '+tA+' × 24 − '+K+' = €'+cA+'.\nLening B: '+tB+' × 36 − '+K+' = €'+cB+'.\nLening '+beste+' is goedkoper. Verschil: €'+ans+'.'});
}
function xAfbetaling(){
 const nm=pick(NAMEN),[d,lo,hi]=pick([['een scooter',1200,2400],['een laptop',700,1300],['een wasmachine',500,900],['een tv',600,1200]]);
 const P=10*Math.round((lo+rnd(hi-lo))/10),a=10*Math.round(P*.1/10),n=pick([12,18,24]),t=Math.ceil((P-a)*pick([1.08,1.1,1.12])/n),tot=a+n*t,ans=tot-P;
 return xNum({ans,sig:'x:afbetaling',label:'Examen: koop op afbetaling',casus:'In de winkel kost '+d+' contant €'+P+'. '+nm+' koopt '+d+' op afbetaling: €'+a+' aanbetaling en daarna '+n+' maandtermijnen van €'+t+'.',tekst:'Hoeveel euro betaalt '+nm+' in totaal méér dan bij contant betalen?',tol:.5,
  hint:'Totaal op afbetaling = aanbetaling + termijnbedrag × aantal termijnen. Trek de contante prijs eraf.',
  uitleg:'Stap 1: totaal = '+a+' + '+t+' × '+n+' = €'+tot+'.\nStap 2: kredietkosten = '+tot+' − '+P+' = €'+ans+'.'});
}
function xTermijn(){
 const nm=pick(NAMEN),n=pick([12,24,36,48]),t=5*(10+rnd(40)),C=10*Math.round(t*n*pick([.06,.08,.1])/10),K=t*n-C;
 return xNum({ans:t,sig:'x:termijn',label:'Examen: termijnbedrag',casus:nm+' leent €'+K+'. De bank zegt: „U betaalt in totaal €'+C+' kredietkosten. U lost af in '+n+' gelijke maandtermijnen.”',tekst:'Hoe hoog is het termijnbedrag per maand?',tol:.01,
  hint:'Totaal terugbetalen = krediet + kredietkosten. Deel dat door het aantal termijnen.',
  uitleg:'Stap 1: totaal = '+K+' + '+C+' = €'+(K+C)+'.\nStap 2: termijnbedrag = '+(K+C)+' ÷ '+n+' = €'+geld(t)+'.'});
}
function xDebet(){
 const nm=pick(NAMEN),B=50*(4+rnd(13)),r=pick([.8,1,1.2,1.5]),m=2+rnd(3),ans=r2(B*r/100*m);
 return xNum({ans,sig:'x:debet',label:'Examen: debetrente',casus:nm+' staat '+m+' maanden lang €'+B+' rood. De bank rekent fictief '+pct(r)+' debetrente per maand over het negatieve saldo (enkelvoudig).',tekst:'Hoeveel euro debetrente betaalt '+nm+' in totaal? Rond af op 2 decimalen.',
  hint:'Debetrente = bedrag rood × rente per maand × aantal maanden.',
  uitleg:'Debetrente = '+B+' × '+dec(r/100)+' × '+m+' = €'+geld(ans)+'.'});
}
const LEENCASUS=[
 {s:'De koelkast van %n gaat kapot. Er moet meteen een nieuwe komen, maar %n heeft er het geld niet voor.',a:'Onverwacht dringend geld nodig',k:'motief'},
 {s:'%n krijgt het salaris elke maand op de 25e. De huur moet al op de 20e betaald worden. Vijf dagen later is er weer genoeg geld.',a:'Tijdelijk geldtekort',k:'motief'},
 {s:'%n wil nu een nieuwe keuken. Sparen duurt %n te lang, dus %n leent het geld.',a:'Een dure aankoop doen',k:'motief'},
 {s:'%n heeft een auto-ongeluk zonder schuld van een ander. De reparatie moet direct betaald worden.',a:'Onverwacht dringend geld nodig',k:'motief'},
 {s:'Aan het eind van de maand is het geld van %n even op. Begin volgende maand komt het loon binnen.',a:'Tijdelijk geldtekort',k:'motief'},
 {s:'%n en een vriend kopen samen een appartement en sluiten een lening af bij de bank.',a:'Een woning kopen',k:'motief'},
 {s:'%n koopt in de winkel een laptop en betaalt die in 10 maandtermijnen. Pas als alles betaald is, is de laptop echt van %n.',a:'Koop op afbetaling',k:'vorm'},
 {s:'%n leent €6000 bij de bank voor een auto en betaalt dat terug in vaste maandtermijnen.',a:'Persoonlijke lening',k:'vorm'},
 {s:'De werkgever van %n leent %n geld. Elke maand gaat er een vast bedrag af van het loon van %n.',a:'Salariskrediet',k:'vorm'},
 {s:'%n leent €250.000 om een huis te kopen. Als %n niet betaalt, mag de bank het huis verkopen.',a:'Hypothecaire lening',k:'vorm'}];
function xLeencasus(){
 const nm=pick(NAMEN),it=pick(LEENCASUS),s=it.s.replace(/%n/g,nm);
 const opts=it.k==='motief'?['Tijdelijk geldtekort','Onverwacht dringend geld nodig','Een dure aankoop doen','Een woning kopen']:['Persoonlijke lening','Koop op afbetaling','Salariskrediet','Hypothecaire lening'];
 const VU={'Persoonlijke lening':' Je leent een vast bedrag bij een bank en lost af in vaste termijnen.','Koop op afbetaling':' Je koopt bij de winkel en betaalt in termijnen. Het product is pas van jou als alles betaald is.','Salariskrediet':' Je leent bij je werkgever en betaalt terug uit je loon.','Hypothecaire lening':' Een lening voor een huis. Het huis is het onderpand.'};
 const extra=it.k==='vorm'?VU[it.a]:it.k==='motief'?(it.a==='Tijdelijk geldtekort'?' Het geld komt straks vanzelf weer binnen: het tekort is tijdelijk.':it.a==='Onverwacht dringend geld nodig'?' Er gebeurt iets wat je niet had verwacht en je moet meteen betalen.':''):'';
 return xKies({sig:'x:leencasus',label:it.k==='motief'?'Examen: leenmotieven':'Examen: kredietvormen',casus:s,tekst:it.k==='motief'?'Welk leenmotief past het best bij deze situatie?':'Welke kredietvorm is dit?',tip:it.k==='motief'?'Let op: komt het geld straks vanzelf terug (tijdelijk), of gebeurt er iets onverwachts dat meteen betaald moet worden?':'Wie leent het geld uit, en hoe wordt het terugbetaald?',
  uitleg:it.a+'.'+extra},opts,it.a);
}
const STELLING=[
 {t:'lenen',I:['Hoe meer termijnen je kiest, hoe lager het termijnbedrag meestal is.',true],II:['Hoe meer termijnen je kiest, hoe lager de kredietkosten altijd zijn.',false],u:'I klopt: je verdeelt het bedrag over meer maanden. II klopt niet: langer lenen kost meestal juist meer rente.'},
 {t:'lenen',I:['Bij een hypothecaire lening is het huis het onderpand.',true],II:['Een hypothecaire lening is een vorm van consumptief krediet.',false],u:'I klopt. II klopt niet: consumptief krediet is persoonlijke lening, koop op afbetaling en salariskrediet.'},
 {t:'lenen',I:['Kredietkosten = termijnbedrag × aantal termijnen − krediet.',true],II:['Debetrente betaal je als je een creditsaldo hebt.',false],u:'I klopt. II klopt niet: debetrente betaal je bij een debetsaldo (rood staan).'},
 {t:'lenen',I:['Bij koop op afbetaling betaal je meestal meer dan de contante prijs.',true],II:['Een salariskrediet betaal je terug uit je loon.',true],u:'Allebei juist.'},
 {t:'lenen',I:['Lenen is gratis als je het geld binnen een jaar terugbetaalt.',false],II:['Een lening voor een huis heet een persoonlijke lening.',false],u:'Allebei onjuist. Lenen kost bijna altijd rente. Een lening voor een huis is een hypothecaire lening.'},
 {t:'spaar',I:['Bij een spaardeposito kun je je geld niet zomaar opnemen.',true],II:['Een spaardeposito heeft meestal een variabele rente.',false],u:'I klopt: het geld staat vast. II klopt niet: een deposito heeft een vaste rente.'},
 {t:'spaar',I:['Als de inflatie hoger is dan de spaarrente, daalt de koopkracht van je spaargeld.',true],II:['Bij samengestelde rente krijg je na 3 jaar meer dan bij enkelvoudige rente met hetzelfde percentage.',true],u:'Allebei juist.'},
 {t:'spaar',I:['De groeifactor bij 4% rente is 1,4.',false],II:['Sparen uit voorzorg is sparen voor onverwachte uitgaven.',true],u:'I klopt niet: de groeifactor is 1 + 4/100 = 1,04. II klopt.'},
 {t:'spaar',I:['Bij enkelvoudige rente krijg je ook rente over de rente.',false],II:['Een variabele rente kan tussentijds veranderen.',true],u:'I klopt niet: dat is samengestelde rente. II klopt.'},
 {t:'bank',I:['Huishoudens die sparen, zorgen voor het aanbod van geld bij de bank.',true],II:['Bedrijven die lenen, zorgen voor het aanbod van geld bij de bank.',false],u:'I klopt. II klopt niet: bedrijven die lenen, vragen geld. Dat is de vraag naar geld.'},
 {t:'bank',I:['Beleggen kan meer opleveren dan sparen.',true],II:['Bij beleggen is het risico kleiner dan bij sparen.',false],u:'I klopt. II klopt niet: bij beleggen is het risico juist groter.'},
 {t:'bank',I:['In België betaal je met dezelfde munt als in Nederland.',true],II:['Voor een reis naar Zwitserland heb je vreemde valuta nodig.',true],u:'Allebei juist. België hoort bij de eurozone; Zwitserland niet (Zwitserse frank).'},
 {t:'bank',I:['Een bank is een tussenpersoon tussen spaarders en leners.',true],II:['Een bank geeft spaarders meestal meer rente dan ze aan leners vraagt.',false],u:'I klopt. II klopt niet: de bank vraagt leners meer rente dan ze spaarders geeft. Van dat verschil verdient de bank.'},
 {t:'geld',I:['Een pinbetaling is een betaling met giraal geld.',true],II:['Als geld laat zien hoeveel iets waard is, is het een rekenmiddel.',true],u:'Allebei juist.'},
 {t:'geld',I:['Bij indirecte ruil ruil je goederen tegen goederen.',false],II:['Munten en bankbiljetten zijn chartaal geld.',true],u:'I klopt niet: dat is directe ruil. Bij indirecte ruil gebruik je geld. II klopt.'}];
const STELL_OPT=['Alleen I is juist','Alleen II is juist','I en II zijn allebei juist','I en II zijn allebei onjuist'];
function xStelling(t){
 const pool=STELLING.filter(x=>!t||x.t===t||(t==='spaar'&&x.t==='geld'));const it=pick(pool.length?pool:STELLING);
 const goed=it.I[1]&&it.II[1]?STELL_OPT[2]:it.I[1]?STELL_OPT[0]:it.II[1]?STELL_OPT[1]:STELL_OPT[3];
 return {sig:'x:stelling:'+(t||''),type:'examen',label:'Examen: twee beweringen',casus:'Bewering I: '+it.I[0]+'\nBewering II: '+it.II[0],tekst:'Welke van deze beweringen is of zijn juist?',kies:STELL_OPT.slice(),ans:STELL_OPT.indexOf(goed),tip:'Beoordeel elke bewering apart. Eén fout woord maakt een bewering onjuist.',uitleg:it.u};
}

/* ===== level 3: vreemd geld, bank en bronnen ===== */
const VAL=[{n:'Zonnemunt',c:'ZM',a:[1.12,1.30],l:'Zonneland'},{n:'Maandaalder',c:'MD',a:[6.80,7.60],l:'Maanland'},{n:'Sterkroon',c:'SK',a:[10.20,11.40],l:'Sterreneiland'},{n:'Golfpeso',c:'GP',a:[17.50,19.50],l:'Golfrijk'}];
function xKoersen(){
 return VAL.map(v=>{const a=r2(v.a[0]+rnd(Math.round((v.a[1]-v.a[0])*100))/100);return Object.assign({},v,{ak:a,vk:r2(a*1.06)})});
}
const koersBron=K=>xTabel(['Munt','Aankoopprijs (per euro)','Verkoopprijs (per euro)'],K.map(k=>[k.n+' ('+k.c+')',fmt(k.ak),fmt(k.vk)]));
const KOERS_UITLEG='Aankoopprijs: zoveel vreemd geld krijg je voor 1 euro als je vreemd geld koopt. Verkoopprijs: zoveel vreemd geld moet je inleveren voor 1 euro als je het terugverkoopt.';
function xKoerstabel(){
 const K=xKoersen(),v=pick(K),nm=pick(NAMEN),E=10*(10+rnd(50)),ans=r2(E*v.ak);
 return xNum({ans,sig:'x:koerstabel',label:'Examen: koersentabel',casus:nm+' gaat op vakantie naar '+v.l+'. Daar betaal je met de '+v.n+' ('+v.c+'). '+nm+' wisselt €'+E+' bij de bank. De bank gebruikt de koersen uit de bron (fictief).\n'+KOERS_UITLEG,bron:koersBron(K),tekst:'Hoeveel '+v.c+' krijgt '+nm+'? Rond af op 2 decimalen.',eenheid:v.c,
  hint:'Je koopt vreemd geld, dus gebruik je de aankoopprijs. Vreemd geld = bedrag in euro\'s × aankoopprijs.',
  uitleg:'Stap 1: je koopt '+v.c+', dus de aankoopprijs: '+fmt(v.ak)+'.\nStap 2: '+E+' × '+fmt(v.ak)+' = '+geld(ans)+' '+v.c+'.'});
}
function xVakantie(){
 const K=xKoersen(),v=pick(K),nm=pick(NAMEN),E=50*(4+rnd(9)),kreeg=r2(E*v.ak),uit=Math.round(kreeg*pick([.6,.7,.75,.8])),rest=r2(kreeg-uit),ans=r2(rest/v.vk);
 return xNum({ans,sig:'x:vakantie',label:'Examen: geld terugwisselen',casus:nm+' wisselt voor de vakantie naar '+v.l+' €'+E+' om in '+v.n+' ('+v.c+'). Op vakantie geeft '+nm+' '+uit+' '+v.c+' uit. Thuis wisselt '+nm+' de rest terug naar euro\'s. De bank gebruikt de koersen uit de bron (fictief).\n'+KOERS_UITLEG,bron:koersBron(K),tekst:'Hoeveel euro krijgt '+nm+' terug? Rond af op 2 decimalen.',
  hint:'Stap 1: hoeveel '+v.c+' kreeg '+nm+'? (× aankoopprijs). Stap 2: hoeveel is er over? Stap 3: terug naar euro\'s: ÷ verkoopprijs.',
  uitleg:'Stap 1: '+E+' × '+fmt(v.ak)+' = '+geld(kreeg)+' '+v.c+'.\nStap 2: over = '+geld(kreeg)+' − '+uit+' = '+geld(rest)+' '+v.c+'.\nStap 3: '+geld(rest)+' ÷ '+fmt(v.vk)+' = €'+geld(ans)+'.'});
}
function xWisselverlies(){
 const K=xKoersen(),v=pick(K),nm=pick(NAMEN),E=50*(4+rnd(13)),kreeg=r2(E*v.ak),terug=r2(kreeg/v.vk),ans=r2(E-terug);
 return xNum({ans,sig:'x:wisselverlies',label:'Examen: wisselverlies',casus:nm+' wisselt €'+E+' om in '+v.n+' ('+v.c+'). De reis gaat niet door. '+nm+' wisselt alles meteen weer terug naar euro\'s. De bank gebruikt de koersen uit de bron (fictief).\n'+KOERS_UITLEG,bron:koersBron(K),tekst:'Hoeveel euro is '+nm+' kwijt door het heen en weer wisselen? Rond af op 2 decimalen.',
  hint:'Reken eerst uit hoeveel '+v.c+' '+nm+' kreeg, en daarna hoeveel euro dat bij terugverkopen oplevert.',
  uitleg:'Stap 1: '+E+' × '+fmt(v.ak)+' = '+geld(kreeg)+' '+v.c+'.\nStap 2: '+geld(kreeg)+' ÷ '+fmt(v.vk)+' = €'+geld(terug)+'.\nStap 3: kwijt = '+E+' − '+geld(terug)+' = €'+geld(ans)+'. Dat verschil verdient de bank.'});
}
function xPrijs(){
 const K=xKoersen(),v=pick(K),nm=pick(NAMEN),[d,lo,hi]=pick([['een jas',60,140],['sneakers',50,120],['een koptelefoon',80,180],['een spelcomputer',250,400]]);
 const eurBuit=10*Math.round((lo+rnd(hi-lo))/10),vreemd=Math.round(eurBuit*v.ak),buitE=r2(vreemd/v.ak),NL=Math.ceil(buitE+5+rnd(25)),ans=r2(NL-buitE);
 return xNum({ans,sig:'x:prijs',label:'Examen: prijzen vergelijken',casus:nm+' ziet in '+v.l+' '+d+' voor '+vreemd+' '+v.c+'. In Nederland kost hetzelfde product €'+NL+'. '+nm+' heeft vreemd geld gekocht tegen de aankoopprijs uit de bron (fictief).\n'+KOERS_UITLEG,bron:koersBron(K),tekst:'Hoeveel euro is het product in '+v.l+' goedkoper dan in Nederland? Rond af op 2 decimalen.',
  hint:'Bedrag in euro\'s = bedrag in vreemd geld ÷ aankoopprijs. Vergelijk dat met de Nederlandse prijs.',
  uitleg:'Stap 1: '+vreemd+' ÷ '+fmt(v.ak)+' = €'+geld(buitE)+'.\nStap 2: '+NL+' − '+geld(buitE)+' = €'+geld(ans)+' goedkoper.'});
}
const EUROLAND=['Duitsland','België','Frankrijk','Spanje','Italië','Oostenrijk','Portugal','Griekenland','Ierland','Finland'];
const GEEN_EURO=[['Zwitserland','Zwitserse frank'],['het Verenigd Koninkrijk','Britse pond'],['Zweden','Zweedse kroon'],['Polen','Poolse zloty'],['Denemarken','Deense kroon'],['Noorwegen','Noorse kroon'],['Tsjechië','Tsjechische kroon'],['Hongarije','Hongaarse forint']];
function xEurozone(){
 const nm=pick(NAMEN),g=pick(GEEN_EURO),opts=[g[0]].concat(shuf(EUROLAND).slice(0,3));
 return xKies({sig:'x:eurozone',label:'Examen: eurozone',casus:nm+' maakt deze zomer een rondreis door Europa met de trein en wil zo weinig mogelijk geld wisselen.',tekst:'In welk land moet '+nm+' vreemde valuta kopen?',tip:'De eurozone: landen die de euro gebruiken.',
  uitleg:g[0].charAt(0).toUpperCase()+g[0].slice(1)+' hoort niet bij de eurozone. Daar betaal je met de '+g[1]+'. De andere landen gebruiken de euro.'},opts,g[0]);
}
const BANKCASUS=[
 {s:'Bank Groen geeft fictief 1,5% rente op spaargeld. Voor een lening vraagt dezelfde bank 7% rente.',v:'Waarom is de leenrente hoger dan de spaarrente?',o:['De bank verdient aan het verschil tussen de twee rentes.','De overheid verplicht banken om weinig spaarrente te geven.','Spaarders lopen meer risico dan leners.','Zo krijgen leners meer geld terug.'],a:0,u:'De bank is een tussenpersoon. Ze geeft spaarders een lage rente en vraagt leners een hogere rente. Van dat verschil betaalt de bank haar kosten en maakt ze winst.'},
 {s:'%n heeft €2000. Over een half jaar is dat geld nodig voor schoolkosten. Een vriend zegt: „Ga beleggen, dan krijg je veel meer.”',v:'Wat is het beste advies voor %n?',o:['Sparen, want %n heeft het geld snel nodig en wil geen risico lopen.','Beleggen, want beleggen levert altijd meer op.','Beleggen, want dan is het geld veiliger.','Lenen, want dan heeft %n nog meer geld.'],a:0,u:'Beleggen heeft meer risico: over een half jaar kan het geld minder waard zijn. Geld dat je snel nodig hebt, zet je op een spaarrekening.'},
 {s:'Een bank krijgt veel spaargeld van huishoudens binnen. Een bedrijf wil geld lenen voor een nieuwe machine.',v:'Welke rol heeft de bank hier?',o:['De bank brengt aanbod van geld (spaarders) en vraag naar geld (leners) bij elkaar.','De bank maakt het spaargeld van de huishoudens zelf op.','Het bedrijf zorgt voor het aanbod van geld.','De huishoudens zorgen voor de vraag naar geld.'],a:0,u:'Spaarders (huishoudens) zorgen voor het aanbod van geld. Leners (huishoudens en bedrijven) zorgen voor de vraag. De bank brengt die twee bij elkaar.'},
 {s:'%n spaart al jaren op een spaarrekening met een variabele rente. De bank verlaagt de rente van 2% naar 1,5%.',v:'Wat betekent dit voor %n?',o:['%n krijgt voortaan minder rente over het spaargeld.','%n moet nu rente betalen aan de bank.','Het spaargeld van %n wordt minder.','De rente verandert pas als %n een nieuwe rekening opent.'],a:0,u:'Een variabele rente kan tussentijds veranderen. Het spaargeld blijft staan, maar %n krijgt er voortaan minder rente over.'},
 {s:'%n zet geld vast in een spaardeposito van 5 jaar met een vaste rente. Na 2 jaar stijgt de rente op gewone spaarrekeningen flink.',v:'Wat is een nadeel van het deposito voor %n?',o:['%n houdt de lagere vaste rente en kan het geld niet zomaar opnemen.','%n krijgt geen rente meer.','De rente van het deposito daalt nu ook.','%n moet het geld meteen opnemen.'],a:0,u:'Bij een deposito staat het geld vast tegen een vaste rente. Stijgt de rente ergens anders, dan kan %n niet overstappen.'}];
function xBankcasus(){
 const nm=pick(NAMEN),it=pick(BANKCASUS),f=s=>s.replace(/%n/g,nm),goed=f(it.o[it.a]);
 return xKies({sig:'x:bankcasus',label:'Examen: bankzaken',casus:f(it.s),tekst:f(it.v),tip:'Denk aan risico, vraag en aanbod van geld, en vaste of variabele rente.',uitleg:goed+' '+f(it.u)},it.o.map(f),goed);
}

/* register en wijk */
const XGEN={afschrift:xAfschrift,rood:xRood,groeifactor:xGroeifactor,verschil:xVerschil,bankkeus:xBankkeus,inflatie:xInflatie,deposito:xDeposito,
 tweeleningen:xTweeLeningen,afbetaling:xAfbetaling,termijn:xTermijn,debet:xDebet,leencasus:xLeencasus,
 koerstabel:xKoerstabel,vakantie:xVakantie,wisselverlies:xWisselverlies,prijs:xPrijs,eurozone:xEurozone,bankcasus:xBankcasus};
function genX(s){
 if(s.startsWith('stelling:'))return xStelling(s.slice(9));
 const g=XGEN[s];return g?g():null;
}

 // ---- uitvoer van het oude vragenmodel ----
 return {BEG,TOPIC,MOT_SPAAR,MOT_LEEN,RENTESOORT,INVUL,WAAR,LEENCASUS,STELLING,STELL_OPT,BANKCASUS,EUROLAND,GEEN_EURO,NAMEN,
  gen:{saldo:genSaldo,rood:genRood,rente:genRente,rentepct:genRentepct,samen:genSamen,krediet:genKrediet,koop:genKoop,verkoop:genVerkoop,
       aankoop2:genAankoop2,inflatie:genInflatie,zoekSaldo:()=>genZoek('saldo'),zoekRente:()=>genZoek('rente'),zoekSamen:()=>genZoek('samen')},
  x:XGEN, stelling:xStelling};
})();

// ---- omzetten van een oude vraag naar het formaat van deze app ----
function h3Tabel(html){ if(!html) return ''; const un=s=>s.replace(/<[^>]+>/g,'').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').trim()||'–';
  return [...html.matchAll(/<tr>(.*?)<\/tr>/g)].map(r=>[...r[1].matchAll(/<t[hd]>(.*?)<\/t[hd]>/g)].map(c=>un(c[1])).join(' | ')).join('\n') }
function h3Om(q,e,b){ if(!q) return null;
  const ctx=[q.casus,h3Tabel(q.bron)].filter(Boolean).join('\n')||undefined;
  const u=q.uitleg+(q.hint?'\nTip: '+q.hint:q.tip&&!q.num?'':'');
  let v;
  if(q.koppel) v={t:'koppel', q:q.tekst, p:q.koppel.termen.map((t,i)=>[t,q.koppel.defs[q.koppel.ans[i]]])};
  else if(q.num) v={t:'reken', q:q.tekst, a:q.ans, eh:q.eenheid==='euro'?'€':q.eenheid==='%'?'%':(q.eenheid||'€'), tol:q.tol!=null?Math.max(q.tol,q.eenheid==='%'?0.051:0.011):undefined};
  else if(q.fmt==='waar') v={t:'wo', q:q.tekst.replace(/^Waar of onwaar\?\n/,'').replace(/^“|”$/g,''), a:q.ans===0};
  else v={t:'mc', q:q.tekst, o:q.kies, a:q.ans};
  return Object.assign(v,{e,b,u,ctx});
}
const h3G=(f,e,b)=>()=>h3Om(f(),e,b);
const h3X=(k,e)=>()=>{ let q=null,n=0; while(!q&&n++<10) q=H3OUD.x[k](); return h3Om(q,e) };
Object.assign(GENS_EXTRA,{
  h3Saldo:h3G(H3OUD.gen.saldo,'4A.4','Saldo'), h3Rood:h3G(H3OUD.gen.rood,'4A.4','Debetsaldo'), h3ZoekSaldo:h3G(H3OUD.gen.zoekSaldo,'4A.4','Saldo'),
  h3Rente:h3G(H3OUD.gen.rente,'4A.5','Enkelvoudige rente'), h3Rentepct:h3G(H3OUD.gen.rentepct,'4A.5','Enkelvoudige rente'),
  h3Samen:h3G(H3OUD.gen.samen,'4A.5','Samengestelde rente'), h3ZoekRente:h3G(H3OUD.gen.zoekRente,'4A.5','Enkelvoudige rente'), h3ZoekSamen:h3G(H3OUD.gen.zoekSamen,'4A.5','Groeifactor'),
  h3Inflatie:h3G(H3OUD.gen.inflatie,'V1.5','Inflatie'), h3Krediet:h3G(H3OUD.gen.krediet,'4A.5','Kredietkosten'),
  h3Koop:h3G(H3OUD.gen.koop,'7.2','Wisselkoers'), h3Aankoop2:h3G(H3OUD.gen.aankoop2,'7.2','Wisselkoers'), h3Verkoop:h3G(H3OUD.gen.verkoop,'7.2','Wisselkoers'),
  h3xAfschrift:h3X('afschrift','4A.4'), h3xRood:h3X('rood','4A.4'), h3xGroeifactor:h3X('groeifactor','4A.5'), h3xVerschil:h3X('verschil','4A.5'),
  h3xBankkeus:h3X('bankkeus','4A.5'), h3xInflatie:h3X('inflatie','V1.5'), h3xDeposito:h3X('deposito','4A.5'), h3xTweeleningen:h3X('tweeleningen','4A.5'),
  h3xAfbetaling:h3X('afbetaling','4A.5'), h3xTermijn:h3X('termijn','4A.5'), h3xDebet:h3X('debet','4A.5'), h3xKoerstabel:h3X('koerstabel','7.2'),
  h3xVakantie:h3X('vakantie','7.2'), h3xWisselverlies:h3X('wisselverlies','7.2'), h3xPrijs:h3X('prijs','7.2'), h3xEurozone:h3X('eurozone','7.2'), h3xLeencasus:h3X('leencasus','4A.5'), h3xBankcasus:h3X('bankcasus','4A.5'),
  h3xStelling:()=>h3Om(H3OUD.stelling(pick(['spaar','lenen','bank'])),'4A.5')
});

// ---- vaste vragen, gemaakt uit de lijsten van de oude game (ids blijven gelijk zolang de lijsten gelijk blijven) ----
const H3_ET={geld1:'4A.4',geld2:'4A.4',spaar:'4A.5',lenen:'4A.5',bank:'4A.5'};
const h3EtBegrip=b=>['Vreemde valuta','Wisselkoers','Eurozone'].includes(b.term)?'7.2':H3_ET[b.t];
function h3Vast(par){ const O=H3OUD, out=[]; let n=0; const id=()=>`h3.${par}.${String(++n).padStart(2,'0')}`;
  const topics={1:['geld1','geld2'],2:['spaar'],3:['lenen'],4:['bank']}[par];
  topics.forEach(t=>{ const pool=O.BEG.filter(b=>b.t===t);
    pool.forEach((b,i)=>{ const and=[1,2,3].map(k=>pool[(i+k)%pool.length]).filter(x=>x!==b).slice(0,3);
      out.push({id:id(),t:'mc',e:h3EtBegrip(b),b:b.term,q:`Wat betekent “${b.term}”?`,o:[b.def].concat(and.map(x=>x.def)),a:0,u:`${b.term}: ${b.def}`});
      out.push({id:id(),t:'mc',e:h3EtBegrip(b),b:b.term,q:`Welk begrip hoort bij deze uitleg?\n“${b.def}”`,o:[b.term].concat(and.map(x=>x.term)),a:0,u:`${b.term}: ${b.def}`}); });
    if(pool.length>=3) out.push({id:id(),t:'koppel',e:H3_ET[t],q:'Koppel elk begrip aan de juiste uitleg.',p:pool.slice(0,4).map(b=>[b.term,b.def]),u:pool.slice(0,4).map(b=>b.term+': '+b.def).join(' ')});
    O.WAAR.filter(x=>x.t===t).forEach(x=>out.push({id:id(),t:'wo',e:H3_ET[t],q:x.v,a:x.w,u:x.u}));
    O.INVUL.filter(x=>x.t===t).forEach(x=>out.push({id:id(),t:'mc',e:H3_ET[t],q:`Vul het juiste woord in:\n“${x.z}”`,o:x.o,a:0,u:x.u}));
  });
  const motief=(L,b,vraag)=>{ const opts=[...new Set(L.map(x=>x.a))]; L.forEach(x=>out.push({id:id(),t:'mc',e:'4A.5',b,q:`${vraag}\n“${x.s}”`,o:[x.a].concat(opts.filter(o=>o!==x.a)),a:0,u:`Dit motief is: ${x.a}.`})) };
  if(par===2){ motief(O.MOT_SPAAR,'Spaarmotieven','Welk spaarmotief past bij dit voorbeeld?');
    const rs=O.RENTESOORT.map(x=>x.a); O.RENTESOORT.forEach(x=>out.push({id:id(),t:'mc',e:'4A.5',b:x.a,q:`Welke soort rente past bij dit voorbeeld?\n“${x.s}”`,o:[x.a].concat(rs.filter(o=>o!==x.a)),a:0,u:`${x.a}. Enkelvoudig is alleen over het beginbedrag; samengesteld is rente op rente.`})) }
  if(par===3){ motief(O.MOT_LEEN,'Leenmotieven','Welk leenmotief past bij dit voorbeeld?');
    const M=['Tijdelijk geldtekort','Onverwacht dringend geld nodig','Een dure aankoop doen','Een woning kopen'], V=['Persoonlijke lening','Koop op afbetaling','Salariskrediet','Hypothecaire lening'];
    O.LEENCASUS.forEach((x,i)=>{ const nm=O.NAMEN[i%O.NAMEN.length], L=x.k==='motief'?M:V;
      out.push({id:id(),t:'mc',e:'4A.5',b:x.k==='motief'?'Leenmotieven':x.a,q:x.s.replace(/%n/g,nm)+'\n'+(x.k==='motief'?'Welk leenmotief past het best bij deze situatie?':'Welke kredietvorm is dit?'),o:[x.a].concat(L.filter(o=>o!==x.a)),a:0,u:x.a+'.'+(x.k==='motief'?' Let op: komt het geld straks vanzelf terug (tijdelijk), of gebeurt er iets onverwachts dat meteen betaald moet worden?':'')}) }) }
  if(par===4){
    [['Een huishouden zet geld op een spaarrekening.','Aanbod van geld'],['Een huishouden neemt een hypotheek om een huis te kopen.','Vraag naar geld'],['Een bedrijf leent geld bij de bank om te investeren.','Vraag naar geld'],['Een huishouden zet spaargeld op de bank.','Aanbod van geld']]
      .forEach(([s,a])=>out.push({id:id(),t:'mc',e:'4A.5',q:`Is dit vraag naar geld of aanbod van geld?\n“${s}”`,o:[a,a==='Vraag naar geld'?'Aanbod van geld':'Vraag naar geld'],a:0,u:a+'. Aanbod komt van huishoudens (spaargeld). Vraag komt van huishoudens (leningen, hypotheek) en bedrijven.'}));
    out.push({id:id(),t:'mc',e:'4A.5',b:'Beleggen',q:'Wat is waar over beleggen ten opzichte van sparen?',o:['Beleggen kan meer opleveren dan sparen, maar het risico is groter.','Beleggen is altijd veilig en levert altijd meer op dan sparen.','Bij sparen is het risico groter dan bij beleggen.','Beleggen heeft geen kans op verlies.'],a:0,u:'Beleggen: meer risico, mogelijk meer rendement. Sparen is veiliger, maar levert meestal minder op.'});
    O.GEEN_EURO.forEach(([land,munt],i)=>out.push({id:id(),t:'mc',e:'7.2',b:'Eurozone',q:'In welk land betaal je niet met de euro?',o:[land].concat([0,1,2].map(k=>O.EUROLAND[(i*3+k)%O.EUROLAND.length])),a:0,u:`${land[0].toUpperCase()+land.slice(1)} hoort niet bij de eurozone. Daar betaal je met de ${munt}.`}));
  }
  return out;
}
const BEGRIPPEN_H3 = Object.assign(Object.fromEntries(H3OUD.BEG.map(b=>[b.term,b.def])),{
  'Geldfuncties':'Geld is ruilmiddel, rekenmiddel en spaarmiddel.',
  'Saldo':'Het bedrag op je rekening. Nieuw saldo = oud saldo + ontvangsten − betalingen.',
  'Spaarmotieven':'Sparen voor een doel, sparen uit voorzorg en sparen voor de rente.',
  'Groeifactor':'1 + (rentepercentage / 100). Bij 3% rente is de groeifactor 1,03.',
  'Inflatie':'Een algemene stijging van de prijzen. Is de inflatie hoger dan de spaarrente, dan daalt de koopkracht van je spaargeld.',
  'Leenmotieven':'Tijdelijk geldtekort, een dure aankoop doen, onverwacht dringend geld nodig, een woning kopen.',
  'Kredietkosten':'(termijnbedrag × aantal termijnen) − krediet.',
  'Onderpand':'Bezit dat de bank mag verkopen als je de lening niet terugbetaalt, bijvoorbeeld het huis bij een hypotheek.',
  'Aankoopprijs':'Zoveel vreemd geld krijg je voor 1 euro als je vreemd geld koopt. Vreemd geld = euro\'s × aankoopprijs.',
  'Verkoopprijs':'Zoveel vreemd geld lever je in voor 1 euro als je het terugverkoopt. Euro\'s = vreemd geld ÷ verkoopprijs.'
});

LEVELS.h3 = [
 {id:'h3.0', naam:'Weet je het nog?', kort:'Voorkennis geld', vragen:[
  {id:'h3.0.01', t:'mc', e:'4A.4', b:'Chartaal geld', q:'Wat is chartaal geld?', o:['Munten en bankbiljetten','Geld op je betaalrekening','Geld dat je hebt geleend','Een cadeaubon'], a:0, u:'Chartaal geld is contant geld: munten en biljetten.'},
  {id:'h3.0.02', t:'mc', e:'4A.4', b:'Giraal geld', q:'Wat is giraal geld?', o:['Geld op je bankrekening','Munten en biljetten','Geld in je spaarpot','Buitenlands geld'], a:0, u:'Giraal geld staat op een rekening bij de bank.'},
  {id:'h3.0.03', t:'mc', e:'4A.4', b:'Directe ruil', q:'Je ruilt je oude spelcomputer tegen een fiets van je buurjongen. Wat voor ruil is dat?', o:['Directe ruil','Indirecte ruil','Elektronisch betalen','Koop op afbetaling'], a:0, u:'Goederen tegen goederen, zonder geld: directe ruil.'},
  {id:'h3.0.04', t:'wo', e:'4A.4', b:'Elektronisch betalen', q:'Betalen met je pinpas of met een app is elektronisch betalen.', a:true, u:'Klopt. Het geld gaat van je rekening af zonder dat je contant geld gebruikt.'},
  {id:'h3.0.05', t:'mc', e:'4A.5', q:'Wat betekent aflossen?', o:['Een lening terugbetalen','Geld op je spaarrekening zetten','Rente ontvangen','Geld wisselen'], a:0, u:'Aflossen is het terugbetalen van een lening.'},
  {id:'h3.0.06', t:'mc', e:'4A.5', q:'Je leent € 1.200 en betaalt in 12 maanden terug. Hoe heet het bedrag dat je elke maand betaalt?', o:['De maandtermijn','De rente','Het saldo','Het spaardoel'], a:0, u:'Het vaste bedrag per maand is de maandtermijn (of het termijnbedrag).'},
  {id:'h3.0.07', t:'wo', e:'4A.5', q:'Als je spaart, krijg je rente van de bank. Als je leent, betaal je rente aan de bank.', a:true, u:'Klopt. Rente is de vergoeding voor het gebruik van geld.'},
  {id:'h3.0.08', t:'mc', e:'4A.4', b:'Saldo', q:'Wat is het saldo van je rekening?', o:['Het bedrag dat er nu op staat','Het bedrag dat je deze maand hebt uitgegeven','De rente die je krijgt','Je maandloon'], a:0, u:'Het saldo is het bedrag dat op dit moment op je rekening staat.'},
  {id:'h3.0.09', t:'mc', e:'4A.4', b:'Ruilmiddel', q:'Je koopt een broodje en betaalt met geld. Welke geldfunctie gebruik je?', o:['Ruilmiddel','Rekenmiddel','Spaarmiddel','Leenmiddel'], a:0, u:'Je ruilt geld tegen een product: geld als ruilmiddel.'}
 ], gens:[]},
 {id:'h3.1', naam:'3.1 Hoe betaal je?', kort:'Ruilen, geldfuncties, betalen en saldo', vragen:h3Vast(1), gens:['h3Saldo','h3Rood','h3ZoekSaldo']},
 {id:'h3.2', naam:'3.2 Waarvoor zou je sparen?', kort:'Spaarmotieven, rente en inflatie', vragen:h3Vast(2), gens:['h3Rente','h3Rentepct','h3Samen','h3Inflatie','h3ZoekRente','h3ZoekSamen']},
 {id:'h3.3', naam:'3.3 Geld lenen kost geld', kort:'Leenmotieven, kredietvormen en kredietkosten', vragen:h3Vast(3), gens:['h3Krediet']},
 {id:'h3.4', naam:'3.4 Nog meer bankzaken', kort:'Banken, beleggen en vreemd geld', vragen:h3Vast(4), gens:['h3Koop','h3Aankoop2','h3Verkoop']},
 {id:'h3.e', naam:'Expertwijk: examentraining', kort:'Casussen en bronnen op examenniveau', vragen:[],
  gens:['h3xStelling','h3xLeencasus','h3xBankcasus','h3xAfschrift','h3xRood','h3xGroeifactor','h3xVerschil','h3xBankkeus','h3xInflatie','h3xDeposito','h3xTweeleningen','h3xAfbetaling','h3xTermijn','h3xDebet','h3xKoerstabel','h3xVakantie','h3xWisselverlies','h3xPrijs','h3xEurozone']},
 {id:'h3.r', naam:'Rekenlab H3', kort:'De vijf rekenvaardigheden', vragen:[], gens:['h3Saldo','h3xAfschrift','h3Rente','h3Rentepct','h3Samen','h3xVerschil','h3Krediet','h3xTermijn','h3Koop','h3Aankoop2','h3Verkoop','h3xVakantie']}
];
LEVELS.h3.begrippen = BEGRIPPEN_H3;
