/*
 * voiceSettings.js — the 🗣️ voice picker.
 * Lets the grown-up choose which of the device's voices reads the clues, hear a
 * sample, and have the choice remembered. Opened from the header 🗣️ button.
 */
(function () {
  var ui = window.GAME.ui;
  var audio = window.GAME.audio;
  var SAMPLE = "Hi! I'm a friendly animal. Can you guess me?";

  var overlay = null;

  function close() {
    audio.cancel();
    if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
    overlay = null;
  }

  function buildBody(panel) {
    ui.clear(panel);

    panel.appendChild(ui.el("h2", { className: "voice-title", text: "🗣️ Choose a voice" }));

    var voices = audio.listVoices();

    if (!voices.length) {
      panel.appendChild(ui.el("p", {
        className: "voice-empty",
        text: "No extra voices found on this device yet. Try installing more voices in your device's Text-to-speech settings, then reopen this."
      }));
      panel.appendChild(ui.el("button", {
        className: "play-again-btn voice-close", text: "Close",
        attrs: { type: "button" }, on: { click: close }
      }));
      return;
    }

    var selectedURI = audio.getSelectedVoiceURI();
    var select = ui.el("select", { className: "voice-select", attrs: { "aria-label": "Pick a voice" } });
    voices.forEach(function (v) {
      var opt = ui.el("option", { text: v.name + " (" + v.lang + ")", attrs: { value: v.voiceURI } });
      if (v.voiceURI === selectedURI) opt.selected = true;
      select.appendChild(opt);
    });

    // Preview the highlighted voice without committing to it.
    function preview() { audio.speak(SAMPLE, { voiceURI: select.value }); }

    // Picking a voice saves it and reads the sample so the change is audible.
    select.addEventListener("change", function () {
      audio.selectVoice(select.value);
      preview();
    });

    var tryBtn = ui.el("button", {
      className: "voice-try-btn", text: "Try it 🔊",
      attrs: { type: "button" }, on: { click: preview }
    });

    var doneBtn = ui.el("button", {
      className: "play-again-btn voice-close", text: "Done",
      attrs: { type: "button" }, on: { click: close }
    });

    panel.appendChild(ui.el("p", { className: "voice-help", text: "Pick a voice, then tap “Try it” to hear it." }));
    panel.appendChild(select);
    panel.appendChild(tryBtn);
    panel.appendChild(doneBtn);
  }

  function open() {
    if (!audio.isSupported()) return;
    if (overlay) return;

    var panel = ui.el("div", { className: "voice-panel", attrs: { role: "dialog", "aria-modal": "true" } });
    buildBody(panel);

    overlay = ui.el("div", {
      className: "voice-overlay",
      on: {
        click: function (e) { if (e.target === overlay) close(); }
      },
      children: [panel]
    });
    document.body.appendChild(overlay);

    // If voices arrive late (common on Android), rebuild the list in place.
    audio.onVoicesChanged(function () { if (overlay) buildBody(panel); });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.getElementById("voice-settings");
    if (!btn) return;
    if (!audio.isSupported()) { btn.style.display = "none"; return; }
    btn.addEventListener("click", open);
  });
})();
