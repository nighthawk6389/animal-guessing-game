/*
 * app.js — home screen + simple view router.
 * Shows the three mode tiles on the home screen and swaps in a mode when picked.
 */
(function () {
  var ui = window.GAME.ui;
  var audio = window.GAME.audio;

  var MODES = [
    {
      id: "singlePlayer",
      title: "Play & Guess",
      emoji: "🦁",
      blurb: "Hear the clues and tap the right animal!",
      mode: window.GAME.modes.singlePlayer
    },
    {
      id: "clueHelper",
      title: "Clue Helper",
      emoji: "👨‍👦",
      blurb: "Grown-ups: get clues to read aloud.",
      mode: window.GAME.modes.clueHelper
    },
    {
      id: "learnToRead",
      title: "Learn to Read",
      emoji: "🔤",
      blurb: "Read the little words, then pick the animal.",
      mode: window.GAME.modes.learnToRead
    }
  ];

  var homeEl, stageEl, stageMountEl, stageTitleEl, current = null;

  function showHome() {
    if (current && current.mode.stop) current.mode.stop();
    current = null;
    audio.cancel();
    stageEl.classList.add("hidden");
    homeEl.classList.remove("hidden");
  }

  function openMode(def) {
    current = def;
    homeEl.classList.add("hidden");
    stageEl.classList.remove("hidden");
    stageTitleEl.textContent = def.emoji + "  " + def.title;
    ui.clear(stageMountEl);
    def.mode.start(stageMountEl);
  }

  function buildHome() {
    var tiles = MODES.map(function (def) {
      return ui.el("button", {
        className: "mode-tile mode-" + def.id,
        attrs: { type: "button" },
        on: { click: function () { openMode(def); } },
        children: [
          ui.el("span", { className: "tile-emoji", text: def.emoji }),
          ui.el("span", { className: "tile-title", text: def.title }),
          ui.el("span", { className: "tile-blurb", text: def.blurb })
        ]
      });
    });
    var grid = ui.el("div", { className: "mode-grid", children: tiles });
    homeEl.appendChild(grid);
  }

  // Speaker on/off toggle (top corner) — persists nothing, just this session.
  function buildSoundToggle() {
    var btn = document.getElementById("sound-toggle");
    if (!btn) return;
    if (!audio.isSupported()) {
      btn.style.display = "none";
      return;
    }
    function refresh() {
      var on = audio.isEnabled();
      btn.textContent = on ? "🔊" : "🔇";
      btn.setAttribute("aria-label", on ? "Sound is on" : "Sound is off");
    }
    btn.addEventListener("click", function () {
      audio.setEnabled(!audio.isEnabled());
      refresh();
    });
    refresh();
  }

  document.addEventListener("DOMContentLoaded", function () {
    homeEl = document.getElementById("home");
    stageEl = document.getElementById("stage");
    stageMountEl = document.getElementById("stage-mount");
    stageTitleEl = document.getElementById("stage-title");

    buildHome();
    buildSoundToggle();

    document.getElementById("home-btn").addEventListener("click", showHome);
  });
})();
