/*
 * Clue Helper mode 👨‍👦 (for grown-ups / multiplayer)
 * A tool for the PARENT: pick a category (or any), get a random animal with its
 * clues listed easy -> hard to read aloud. The answer stays hidden behind a
 * "Reveal" button so you can hold up the screen without spoiling it.
 */
window.GAME = window.GAME || {};
window.GAME.modes = window.GAME.modes || {};

window.GAME.modes.clueHelper = (function () {
  var ui = window.GAME.ui;
  var audio = window.GAME.audio;

  var root, current, category = "all";

  function categories() {
    var seen = {};
    window.GAME.animals.forEach(function (a) { seen[a.category] = true; });
    return Object.keys(seen);
  }

  function pool() {
    var all = window.GAME.animals;
    return category === "all" ? all : all.filter(function (a) { return a.category === category; });
  }

  function newAnimal() {
    var list = pool();
    // avoid repeating the same animal twice in a row when possible
    var pick = ui.pickRandom(list);
    if (list.length > 1 && current && pick.id === current.id) {
      pick = ui.pickRandom(list.filter(function (a) { return a.id !== current.id; }));
    }
    current = pick;
    render();
  }

  function render() {
    ui.clear(root);

    // --- category filter ---
    var filterRow = ui.el("div", { className: "filter-row" });
    var cats = ["all"].concat(categories());
    cats.forEach(function (cat) {
      var btn = ui.el("button", {
        className: "filter-chip" + (cat === category ? " active" : ""),
        text: cat === "all" ? "🎲 All" : ui.categoryLabel(cat),
        attrs: { type: "button" },
        on: {
          click: function () {
            category = cat;
            newAnimal();
          }
        }
      });
      filterRow.appendChild(btn);
    });

    // --- clue card (easy -> hard, the order a parent should read them) ---
    var cluesEasyFirst = current.clues.slice().reverse();
    var clueList = ui.el("ol", { className: "clue-list" });
    cluesEasyFirst.forEach(function (clue) {
      var li = ui.el("li", {
        className: "clue-list-item",
        children: [
          ui.el("span", { className: "clue-list-text", text: clue }),
          ui.speakButton(clue, "Read this clue aloud")
        ]
      });
      clueList.appendChild(li);
    });

    var facts = null;
    if (current.facts && current.facts.length) {
      var factItems = current.facts.map(function (f) {
        return ui.el("li", { className: "fact-item", text: "✨ " + f });
      });
      facts = ui.el("div", {
        className: "facts-box",
        children: [ui.el("h3", { text: "Fun facts" }), ui.el("ul", { children: factItems })]
      });
    }

    // --- hidden answer ---
    var answer = ui.el("div", {
      className: "answer-reveal hidden",
      children: [
        ui.el("div", { className: "answer-emoji", children: [ui.pictureFor(current)] }),
        ui.el("div", { className: "answer-name", text: current.name })
      ]
    });
    var revealBtn = ui.el("button", {
      className: "reveal-btn",
      text: "Reveal answer 👀",
      attrs: { type: "button" },
      on: {
        click: function () {
          answer.classList.remove("hidden");
          revealBtn.style.display = "none";
          audio.speak("It's a " + current.name + "!");
        }
      }
    });

    var newBtn = ui.el("button", {
      className: "play-again-btn",
      text: "New animal 🎲",
      attrs: { type: "button" },
      on: { click: newAnimal }
    });

    var card = ui.el("div", {
      className: "clue-card",
      children: [
        ui.el("p", { className: "helper-tip", text: "Read these clues aloud, easy ones first. Let them guess!" }),
        clueList,
        facts,
        revealBtn,
        answer
      ]
    });

    root.appendChild(filterRow);
    root.appendChild(card);
    root.appendChild(newBtn);
  }

  function start(mountEl) {
    root = mountEl;
    category = "all";
    current = null;
    newAnimal();
  }

  function stop() { audio.cancel(); }

  return { start: start, stop: stop };
})();
