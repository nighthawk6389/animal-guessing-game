/*
 * audio.js — read-aloud helper
 * Wraps the browser's free text-to-speech (SpeechSynthesis). It ranks the voices
 * the device offers and prefers the most natural-sounding one (e.g. Google /
 * Natural / Enhanced voices), lets the player pick a voice (remembered across
 * visits), and falls back silently if a browser can't speak.
 */
window.GAME = window.GAME || {};

window.GAME.audio = (function () {
  var supported = typeof window !== "undefined" && "speechSynthesis" in window;
  var enabled = true;          // user can mute with the speaker toggle
  var selectedVoice = null;    // the SpeechSynthesisVoice we currently speak with
  var voiceListeners = [];     // callbacks fired when the voice list (re)loads
  var STORE_KEY = "agg.voiceURI";
  var unlocked = false;

  // ---- localStorage (guarded for private mode / disabled storage) ----
  function readStored() {
    try { return window.localStorage.getItem(STORE_KEY); } catch (e) { return null; }
  }
  function writeStored(uri) {
    try { window.localStorage.setItem(STORE_KEY, uri); } catch (e) { /* ignore */ }
  }

  /*
   * Score a voice: higher = more natural / better for a kids' game.
   * The good Android Chrome voices are Google's (often network voices); the
   * robotic ones are eSpeak / "compact" style. We also nudge toward US/GB English
   * and a warm female-sounding default (the player can always override).
   */
  function scoreVoice(v) {
    var name = (v.name || "") + " " + (v.voiceURI || "");
    var lang = (v.lang || "").toLowerCase();
    var score = 0;

    // Natural / neural / network voices sound the most human.
    if (/natural|neural|enhanced|premium|wavenet|google/i.test(name)) score += 50;
    if (v.localService === false) score += 30;   // network voices > on-device on Android

    // Robotic engines — push these down.
    if (/espeak|compact|eloquence|pico|robot/i.test(name)) score -= 60;

    // Language preferences.
    if (lang === "en-us") score += 12;
    else if (lang === "en-gb") score += 9;
    else if (lang === "en-au" || lang === "en-ca") score += 5;
    else if (/^en/.test(lang)) score += 3;

    // A warm, friendly default for little kids (overridable in the picker).
    if (/female|samantha|karen|tessa|moira|fiona|google us english|salli|joanna/i.test(name)) score += 6;

    return score;
  }

  // All English voices, best → worst.
  function listVoices() {
    if (!supported) return [];
    var voices = window.speechSynthesis.getVoices() || [];
    return voices
      .filter(function (v) { return /^en/i.test(v.lang || ""); })
      .sort(function (a, b) { return scoreVoice(b) - scoreVoice(a); });
  }

  function findByURI(uri) {
    if (!uri) return null;
    var all = window.speechSynthesis.getVoices() || [];
    for (var i = 0; i < all.length; i++) {
      if (all[i].voiceURI === uri) return all[i];
    }
    return null;
  }

  // (Re)resolve which voice we speak with: saved choice if still present, else best ranked.
  function resolveVoice() {
    if (!supported) return;
    var saved = findByURI(readStored());
    if (saved) { selectedVoice = saved; return; }
    var ranked = listVoices();
    if (ranked.length) selectedVoice = ranked[0];
  }

  function notifyVoiceListeners() {
    voiceListeners.forEach(function (cb) { try { cb(); } catch (e) {} });
  }

  if (supported) {
    resolveVoice();
    // Voices load asynchronously in most browsers (and late on Android).
    window.speechSynthesis.onvoiceschanged = function () {
      resolveVoice();
      notifyVoiceListeners();
    };
  }

  /*
   * Mobile browsers (esp. Android Chrome) block speech until the first user
   * gesture. Prime it once so the very first clue isn't silent.
   */
  function installGestureUnlock() {
    if (!supported) return;
    function unlock() {
      if (unlocked) return;
      unlocked = true;
      try { window.speechSynthesis.resume(); } catch (e) {}
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    }
    window.addEventListener("pointerdown", unlock, { once: false });
    window.addEventListener("keydown", unlock, { once: false });
  }
  if (supported && typeof window.addEventListener === "function") installGestureUnlock();

  /*
   * speak(text, opts)
   *   opts.rate / opts.pitch — delivery tweaks (Learn to Read passes a slower rate)
   *   opts.voiceURI          — speak with a specific voice WITHOUT changing the
   *                            saved selection (used by the picker's "Try it")
   */
  function speak(text, opts) {
    if (!supported || !enabled || !text) return;
    opts = opts || {};
    window.speechSynthesis.cancel(); // don't let clues pile up
    var u = new SpeechSynthesisUtterance(String(text));
    var voice = opts.voiceURI ? (findByURI(opts.voiceURI) || selectedVoice) : selectedVoice;
    if (voice) {
      // Guard the assignment: a stale/invalid voice should never break read-aloud.
      try { u.voice = voice; if (voice.lang) u.lang = voice.lang; } catch (e) {}
    }
    u.rate = opts.rate || 0.95;   // a touch slower for little ears
    u.pitch = opts.pitch != null ? opts.pitch : 1.0; // natural pitch = less synthetic
    u.volume = 1;
    window.speechSynthesis.speak(u);
  }

  function cancel() {
    if (supported) window.speechSynthesis.cancel();
  }

  function setEnabled(on) {
    enabled = !!on;
    if (!enabled) cancel();
  }

  // ---- voice selection API (used by the voice picker) ----
  function selectVoice(uri) {
    var v = findByURI(uri);
    if (v) {
      selectedVoice = v;
      writeStored(uri);
    }
  }
  function getSelectedVoiceURI() { return selectedVoice ? selectedVoice.voiceURI : null; }
  function onVoicesChanged(cb) { if (typeof cb === "function") voiceListeners.push(cb); }

  return {
    speak: speak,
    cancel: cancel,
    setEnabled: setEnabled,
    isEnabled: function () { return enabled; },
    isSupported: function () { return supported; },
    listVoices: listVoices,
    selectVoice: selectVoice,
    getSelectedVoiceURI: getSelectedVoiceURI,
    onVoicesChanged: onVoicesChanged
  };
})();
