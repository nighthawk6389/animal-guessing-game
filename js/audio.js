/*
 * audio.js — read-aloud helper
 * Wraps the browser's free text-to-speech (SpeechSynthesis) so the whole game
 * can speak clues and words. Falls back silently if a browser can't speak.
 */
window.GAME = window.GAME || {};

window.GAME.audio = (function () {
  var supported = typeof window !== "undefined" && "speechSynthesis" in window;
  var enabled = true;        // user can mute with the speaker toggle
  var preferredVoice = null;

  // Voices load asynchronously in most browsers — grab a nice clear one when ready.
  function pickVoice() {
    if (!supported) return;
    var voices = window.speechSynthesis.getVoices() || [];
    if (!voices.length) return;
    // Prefer a natural English voice; gently favor ones that tend to sound friendly.
    var english = voices.filter(function (v) { return /^en(-|_|$)/i.test(v.lang); });
    var pool = english.length ? english : voices;
    var nice = pool.find(function (v) { return /(samantha|female|google|zira|natural|kid)/i.test(v.name); });
    preferredVoice = nice || pool[0];
  }

  if (supported) {
    pickVoice();
    window.speechSynthesis.onvoiceschanged = pickVoice;
  }

  function speak(text, opts) {
    if (!supported || !enabled || !text) return;
    opts = opts || {};
    // Stop whatever is currently being said so clues don't pile up.
    window.speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(String(text));
    if (preferredVoice) u.voice = preferredVoice;
    u.rate = opts.rate || 0.92;   // a touch slower for little ears
    u.pitch = opts.pitch || 1.08; // a touch higher = friendlier
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

  function isEnabled() { return enabled; }
  function isSupported() { return supported; }

  return {
    speak: speak,
    cancel: cancel,
    setEnabled: setEnabled,
    isEnabled: isEnabled,
    isSupported: isSupported
  };
})();
