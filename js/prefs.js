/* ============================================================
   Skore Party — prefs.js
   Per-DEVICE preferences + sound effects. Nothing here syncs:
   language display and sound are personal, stored in
   localStorage, and never touch the room state.

   Language model: each language is 'main' | 'up' | 'down' | 'none'.
   Exactly one language is 'main' at all times (big, centre);
   'up'/'down' render small above/below it on the clue card.
   ============================================================ */

export const LANGS = [
  { key: 'en', label: 'English' },
  { key: 'th', label: 'ไทย' },
  { key: 'ja', label: '日本語' }
];
export const LANG_MODES = [
  { value: 'main', label: 'Main' },
  { value: 'up',   label: 'Sub ▲' },
  { value: 'down', label: 'Sub ▼' },
  { value: 'none', label: 'None' }
];

const STORE_KEY = 'skore_prefs';
const DEFAULTS = { langs: { en: 'main', th: 'none', ja: 'none' }, sound: true };

function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORE_KEY));
    const langs = { ...DEFAULTS.langs, ...(raw && raw.langs) };
    // sanitize: unknown modes → none, then guarantee exactly one main
    for (const k of Object.keys(langs)) {
      if (!['main', 'up', 'down', 'none'].includes(langs[k])) langs[k] = 'none';
    }
    const mains = LANGS.filter(l => langs[l.key] === 'main');
    if (mains.length !== 1) {
      for (const l of LANGS) langs[l.key] = 'none';
      langs.en = 'main';
    }
    return { langs, sound: raw && typeof raw.sound === 'boolean' ? raw.sound : true };
  } catch {
    return JSON.parse(JSON.stringify(DEFAULTS));
  }
}
function save() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(prefs)); } catch { /* private mode */ }
}

export const prefs = load();

export const mainLang = () =>
  LANGS.find(l => prefs.langs[l.key] === 'main')?.key || 'en';

/* Returns true if the preference changed. Setting 'main' demotes the
   previous main to 'none'; the current main row cannot be demoted
   directly (pick a new main instead) — the UI disables those buttons. */
export function setLangPref(key, mode) {
  if (prefs.langs[key] === mode) return false;
  if (mode === 'main') {
    for (const l of LANGS) if (prefs.langs[l.key] === 'main') prefs.langs[l.key] = 'none';
    prefs.langs[key] = 'main';
  } else {
    if (prefs.langs[key] === 'main') return false;   // must keep one main
    prefs.langs[key] = mode;
  }
  save();
  return true;
}

export function setSoundPref(on) {
  const was = prefs.sound;
  prefs.sound = !!on;
  save();
  if (!was && prefs.sound) playSound('ping');   // off → on chime
}

/* ---------------- sound effects ---------------- */

const FILES = {
  reveal: 'reveal.mp3',      // scores revealed
  point:  'point.mp3',       // needle moved
  next:   'next.mp3',        // 🗘 new words
  gear:   'gear.mp3',        // target spinning
  ping:   'ping.mp3',        // sound switched on
  lock:   'lock.mp3',        // answer locked
  start:  'start.mp3',   // game starts (lobby → prep)
  deploy: 'deploy.mp3'     // host deploys (prep → aiming)
};
const audioCache = {};

export function playSound(name) {
  if (!prefs.sound || !FILES[name]) return;
  try {
    let a = audioCache[name];
    if (!a) { a = new Audio(`audio/${FILES[name]}`); audioCache[name] = a; }
    a.currentTime = 0;
    a.play().catch(() => { /* autoplay policy — ignore */ });
  } catch { /* no Audio support — ignore */ }
}
