'use strict';
const STRINGS = {
  en: {
    navProducts:'Products',navAbout:'About',eyebrow:'INDEPENDENT AUDIO SOFTWARE · OPEN SOURCE',
    heroTitle:'Music tools designed to be <em>accessible.</em>',heroLead:'Explore synthesizers, a sampler, a drum machine and a native extension for REAPER. Designed for keyboard-driven workflows and screen reader accessibility.',explore:'Explore the software ↓',viewGithub:'View GitHub profile ↗',introNote:'Free downloads · Open-source repositories · Windows releases',collection:'THE COLLECTION',productsTitle:'Six projects. One home.',releaseInfo:'Each download is linked to the latest published GitHub release, with version information loaded automatically.',synth:'SYNTHESIZER',bassline:'BASSLINE SYNTH',drum:'DRUM MACHINE',sampler:'SAMPLER',extension:'REAPER EXTENSION',downloadNote:'Download buttons fetch the Windows file directly from the latest stable GitHub release when available. Otherwise, they open the official release page.',philosophy:'THE APPROACH',aboutTitle:'Accessibility is part of the instrument.',aboutText:'These projects focus on practical audio workflows in REAPER, with keyboard accessibility and screen reader use as essential design considerations. Each project has its own public repository, documentation and release history.',allRepos:'Browse all repositories ↗',footer:'Built for an accessible web.',latest:'Download for Windows ↓',releasePage:'View latest release ↗',source:'Source code ↗',checking:'Checking latest release…',unavailable:'Version currently unavailable; use the release link.',published:'Published',
    descriptions:{'LJuno-116':'An accessible polyphonic synthesizer inspired by classic analog instruments.','LB-303':'A monophonic acid-style synthesizer with step sequencing and parameter locks.','LR-608':'A drum machine for building rhythmic patterns and electronic percussion.','LSampler-24':'An accessible 24-slot sampler built for creative sound design and performance.','LReaParams':'A native REAPER extension for accessible FX and track parameter navigation and control.','Biscot1-Synth':'An accessible Commodore 64 SID-inspired synthesizer with 6581/8580-style filters and a built-in three-operator tracker.'}
  },
  it: {
    navProducts:'Strumenti',navAbout:'Il progetto',eyebrow:'SOFTWARE AUDIO INDIPENDENTE · CODICE APERTO',
    heroTitle:'Strumenti musicali progettati per essere <em>accessibili.</em>',heroLead:'Scopri sintetizzatori, un campionatore, una drum machine e un’estensione nativa per REAPER. Strumenti pensati per l’utilizzo da tastiera e con lettori di schermo.',explore:'Esplora gli strumenti ↓',viewGithub:'Vai al profilo GitHub ↗',introNote:'Download gratuiti · Repository pubblici · Versioni Windows',collection:'I PROGETTI',productsTitle:'Sei progetti. Un solo sito.',releaseInfo:'Ogni download rimanda all’ultima release pubblicata su GitHub, con le informazioni sulla versione caricate automaticamente.',synth:'SINTETIZZATORE',bassline:'SINTETIZZATORE BASSLINE',drum:'DRUM MACHINE',sampler:'CAMPIONATORE',extension:'ESTENSIONE REAPER',downloadNote:'I pulsanti scaricano direttamente il file Windows dell’ultima release stabile, quando disponibile. Altrimenti aprono la pagina ufficiale della release.',philosophy:'LA FILOSOFIA',aboutTitle:'L’accessibilità fa parte dello strumento.',aboutText:'Questi progetti sono dedicati al lavoro audio in REAPER, con particolare attenzione al controllo da tastiera e ai lettori di schermo. Ogni progetto dispone del proprio repository pubblico, della documentazione e dello storico delle versioni.',allRepos:'Esplora tutti i repository ↗',footer:'Progettato per un web accessibile.',latest:'Scarica per Windows ↓',releasePage:'Apri ultima release ↗',source:'Codice sorgente ↗',checking:'Controllo ultima release…',unavailable:'Versione non disponibile; utilizza il collegamento alle release.',published:'Pubblicata il',
    descriptions:{'LJuno-116':'Sintetizzatore polifonico accessibile ispirato ai classici strumenti analogici.','LB-303':'Sintetizzatore monofonico acid con sequencer a step e parameter lock.','LR-608':'Drum machine per creare pattern ritmici e percussioni elettroniche.','LSampler-24':'Campionatore accessibile a 24 slot per il sound design e l’esecuzione musicale.','LReaParams':'Estensione nativa per REAPER dedicata alla navigazione e al controllo accessibile dei parametri FX e delle tracce.','Biscot1-Synth':'Sintetizzatore accessibile ispirato al SID del Commodore 64, con filtri in stile 6581/8580 e tracker integrato a tre operatori.'}
  }
};
const releaseCache = new Map();
let language = 'en';
const cards = [...document.querySelectorAll('[data-repo]')];
const safeLanguage = v => v === 'it' ? 'it' : 'en';
try { language = safeLanguage(localStorage.getItem('lolo-language') || (navigator.language.toLowerCase().startsWith('it') ? 'it' : 'en')); } catch { language = navigator.language.toLowerCase().startsWith('it') ? 'it' : 'en'; }
function translate(lang){
  language = safeLanguage(lang); document.documentElement.lang = language;
  const d = STRINGS[language];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const value=d[el.dataset.i18n]; if(typeof value !== 'string') return;
    if(el.dataset.i18n==='heroTitle') { el.textContent=''; const parts=value.split('<em>'); el.append(document.createTextNode(parts[0])); if(parts[1]) { const e=document.createElement('em');e.textContent=parts[1].replace('</em>','');el.append(e); } }
    else el.textContent=value;
  });
  document.querySelectorAll('[data-desc]').forEach(el => {el.textContent=d.descriptions[el.dataset.desc] || '';});
  for (const card of cards) {
    card.querySelector('[data-download]').textContent=d.latest;
    card.querySelector('.source').textContent=d.source;
    updateRelease(card);
  }
  document.getElementById('en').setAttribute('aria-pressed',String(language==='en'));
  document.getElementById('it').setAttribute('aria-pressed',String(language==='it'));
  document.title= language==='it'?'Lo-lo Audio Software | Strumenti musicali accessibili':'Lo-lo Audio Software | Accessible music tools';
  try {localStorage.setItem('lolo-language',language);}catch{}
}
// Choose binary release assets, not GitHub's automatically generated source archives.
// All products currently target Windows; only select recognisable packages.
function chooseWindowsAsset(repo, assets) {
  if (!Array.isArray(assets)) return null;
  const files = assets.filter(a => a && typeof a.name === 'string' &&
    typeof a.browser_download_url === 'string');
  if (repo === 'Biscot1-Synth') {
    // Biscot1's published Windows VST3 archive is named
    // Biscot1.Synth-0.99.1-Windows-x64.zip (no 'vst3' in the filename).
    // Match later versions too, but never select the auto-generated source archives.
    return files.find(a => /biscot1[. _-]*synth/i.test(a.name) &&
      /windows[-_. ]?x64/i.test(a.name) && /\.zip$/i.test(a.name) &&
      !/source|src/i.test(a.name)) || null;
  }
  if (repo === 'LReaParams') {
    return files.find(a => /windows[-_. ]?x64/i.test(a.name) && /setup/i.test(a.name) && /\.zip$/i.test(a.name)) ||
      files.find(a => /windows[-_. ]?x64/i.test(a.name) && /\.(?:zip|exe)$/i.test(a.name) && !/source|src/i.test(a.name)) || null;
  }
  return files.find(a => /\.vst3\.zip$/i.test(a.name)) ||
    files.find(a => /vst3/i.test(a.name) && /\.zip$/i.test(a.name) && !/source|src/i.test(a.name)) || null;
}
function updateRelease(card){
  const repo=card.dataset.repo, element=card.querySelector('[data-release]');const release=releaseCache.get(repo), d=STRINGS[language];
  if(!release){ element.textContent=d.checking;return; }
  if(release.error){ element.textContent=d.unavailable;card.querySelector('[data-download]').textContent=d.releasePage;return; }
  const date=release.published_at ? new Date(release.published_at).toLocaleDateString(language==='it'?'it-IT':'en-GB',{year:'numeric',month:'short',day:'numeric'}):'';
  element.textContent=(release.name || release.tag_name || 'Release')+(date?' · '+d.published+' '+date:'');
  const link = card.querySelector('[data-download]');
  const asset = chooseWindowsAsset(repo, release.assets);
  if (asset && /^https:\/\/github\.com\/Lo-lo78\//i.test(asset.browser_download_url)) {
    link.href = asset.browser_download_url;
    link.textContent = d.latest;
    link.setAttribute('aria-label', `${d.latest.replace(' ↓','')} ${repo}: ${asset.name}`);
    link.removeAttribute('download'); // GitHub serves the attachment with its correct filename.
  } else {
    link.href = release.html_url && release.html_url.startsWith('https://github.com/Lo-lo78/')
      ? release.html_url : `https://github.com/Lo-lo78/${encodeURIComponent(repo)}/releases/latest`;
    link.textContent = d.releasePage;
    link.setAttribute('aria-label', `${d.releasePage.replace(' ↗','')} ${repo}`);
  }
}
async function loadRelease(card){
  const repo=card.dataset.repo;
  try {
    const response=await fetch(`https://api.github.com/repos/Lo-lo78/${encodeURIComponent(repo)}/releases/latest`,{headers:{Accept:'application/vnd.github+json'}});
    if(!response.ok) throw new Error(`GitHub status ${response.status}`);
    const data=await response.json();releaseCache.set(repo,data);
  } catch(e){releaseCache.set(repo,{error:true});}
  updateRelease(card);
}
document.getElementById('en').addEventListener('click',()=>translate('en'));
document.getElementById('it').addEventListener('click',()=>translate('it'));
document.getElementById('year').textContent=new Date().getFullYear();
translate(language);cards.forEach(loadRelease);
