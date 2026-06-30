/*
 * Learn to Read mode 🔤
 * Every clue is a short 3-4 letter word shown on a big card. The child reads the
 * words (tap a card to hear it) and taps the matching animal from the choices.
 * Only animals that have a `readingClues` array appear here.
 */
window.GAME = window.GAME || {};
window.GAME.modes = window.GAME.modes || {};

window.GAME.modes.learnToRead = (function () {
  var ui = window.GAME.ui;
  var audio = window.GAME.audio;
  var CHOICES = 4;
  var WORDS_SHOWN = 3;

  var root, target;

  function readers() {
    return window.GAME.animals.filter(function (a) {
      return Array.isArray(a.readingClues) && a.readingClues.length >= WORDS_SHOWN;
    });
  }

  function newRound() {
    var pool = readers();
    target = ui.pickRandom(pool);

    var words = ui.sample(target.readingClues, WORDS_SHOWN);

    var distractors = ui.sample(
      window.GAME.animals.filter(function (a) { return a.id !== target.id; }),
      CHOICES - 1
    );
    var choices = ui.shuffle([target].concat(distractors));

    render(words, choices);
  }

  function render(words, choices) {
    ui.clear(root);

    var prompt = ui.el("p", { className: "mode-prompt", text: "Read the words. Which animal is it?" });

    // Big tap-to-hear word cards.
    var wordRow = ui.el("div", { className: "word-row" });
    words.forEach(function (w) {
      var card = ui.el("button", {
        className: "word-card",
        text: w,
        attrs: { type: "button", "aria-label": "Read the word " + w },
        on: {
          click: function () {
            audio.speak(w, { rate: 0.8 }); // extra slow so they can sound it out
            card.classList.add("tapped");
            setTimeout(function () { card.classList.remove("tapped"); }, 300);
          }
        }
      });
      wordRow.appendChild(card);
    });

    var hint = ui.el("button", {
      className: "speak-btn read-all-btn",
      text: "🔊 Read all",
      attrs: { type: "button", "aria-label": "Read all the words" },
      on: {
        click: function () {
          // read the words one after another, slowly
          var i = 0;
          (function next() {
            if (i >= words.length) return;
            audio.speak(words[i], { rate: 0.8 });
            i++;
            setTimeout(next, 1100);
          })();
        }
      }
    });

    var grid = ui.choiceGrid(choices, target.id, function (isCorrect) {
      if (isCorrect) onCorrect();
    });

    root.appendChild(prompt);
    root.appendChild(wordRow);
    root.appendChild(hint);
    root.appendChild(grid);
  }

  function onCorrect() {
    var banner = ui.celebrate(target, root);
    var again = ui.el("button", {
      className: "play-again-btn",
      text: "Next word ▶",
      attrs: { type: "button" },
      on: { click: newRound }
    });
    var overlay = ui.el("div", { className: "result-overlay", children: [banner, again] });
    root.appendChild(overlay);
  }

  function start(mountEl) {
    root = mountEl;
    newRound();
  }

  function stop() { audio.cancel(); }

  return { start: start, stop: stop };
})();
