/*
 * Single Player mode 🦁
 * The child gets clues (revealed one at a time and spoken aloud) and taps the
 * matching animal from 4 emoji choices.
 */
window.GAME = window.GAME || {};
window.GAME.modes = window.GAME.modes || {};

window.GAME.modes.singlePlayer = (function () {
  var ui = window.GAME.ui;
  var audio = window.GAME.audio;
  var CHOICES = 4;

  var root, target, cluesShown;

  function newRound() {
    var animals = window.GAME.animals;
    target = ui.pickRandom(animals);
    cluesShown = 1;

    var distractors = ui.sample(
      animals.filter(function (a) { return a.id !== target.id; }),
      CHOICES - 1
    );
    var choices = ui.shuffle([target].concat(distractors));

    render(choices);
    // speak the first clue after a tiny beat so it doesn't get cut off on load
    setTimeout(function () { audio.speak(target.clues[0]); }, 350);
  }

  function render(choices) {
    ui.clear(root);

    var clueBox = ui.el("div", { className: "clue-box" });
    var clueText = ui.el("p", { className: "clue-text", text: target.clues[0] });
    var clueControls = ui.el("div", {
      className: "clue-controls",
      children: [
        ui.speakButton(function () { return clueText.textContent; }, "Hear the clue again"),
        ui.el("button", {
          className: "next-clue-btn",
          text: "Next clue 👂",
          attrs: { type: "button" },
          on: { click: function () { showNextClue(clueText, this); } }
        })
      ]
    });
    clueBox.appendChild(clueText);
    clueBox.appendChild(clueControls);

    var prompt = ui.el("p", { className: "mode-prompt", text: "Which animal am I?" });

    var grid = ui.choiceGrid(choices, target.id, function (isCorrect) {
      if (isCorrect) onCorrect();
    });

    root.appendChild(clueBox);
    root.appendChild(prompt);
    root.appendChild(grid);
  }

  function showNextClue(clueText, btn) {
    if (cluesShown < target.clues.length) {
      var next = target.clues[cluesShown];
      cluesShown++;
      clueText.textContent = next;
      audio.speak(next);
      if (cluesShown >= target.clues.length) {
        btn.disabled = true;
        btn.textContent = "That's all the clues!";
      }
    }
  }

  function onCorrect() {
    var banner = ui.celebrate(target, root);
    var again = ui.el("button", {
      className: "play-again-btn",
      text: "Play again ▶",
      attrs: { type: "button" },
      on: { click: newRound }
    });
    var overlay = ui.el("div", {
      className: "result-overlay",
      children: [banner, again]
    });
    root.appendChild(overlay);
  }

  function start(mountEl) {
    root = mountEl;
    newRound();
  }

  function stop() {
    audio.cancel();
  }

  return { start: start, stop: stop };
})();
