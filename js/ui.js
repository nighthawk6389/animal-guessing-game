/*
 * ui.js — shared rendering + helper functions used by every game mode.
 */
window.GAME = window.GAME || {};

window.GAME.ui = (function () {
  var audio = window.GAME.audio;

  // ----- random helpers -----
  function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  // Pick n random items from arr (without repeats).
  function sample(arr, n) {
    return shuffle(arr).slice(0, n);
  }

  // ----- small DOM helper -----
  function el(tag, opts) {
    opts = opts || {};
    var node = document.createElement(tag);
    if (opts.className) node.className = opts.className;
    if (opts.text != null) node.textContent = opts.text;
    if (opts.html != null) node.innerHTML = opts.html;
    if (opts.attrs) {
      Object.keys(opts.attrs).forEach(function (k) { node.setAttribute(k, opts.attrs[k]); });
    }
    if (opts.on) {
      Object.keys(opts.on).forEach(function (evt) { node.addEventListener(evt, opts.on[evt]); });
    }
    if (opts.children) {
      opts.children.forEach(function (c) { if (c) node.appendChild(c); });
    }
    return node;
  }

  // Show an animal's "picture": a real photo if one is provided, otherwise its emoji.
  function pictureFor(animal) {
    if (animal.image) {
      return el("img", { className: "animal-photo", attrs: { src: animal.image, alt: animal.name } });
    }
    return el("span", { className: "animal-emoji", text: animal.emoji, attrs: { "aria-label": animal.name } });
  }

  /*
   * choiceGrid(choices, correctId, onResult)
   * Renders a grid of big tappable animal "pictures".
   * Used by Single Player and Learn to Read.
   * onResult(isCorrect, chosenAnimal) is called on every tap.
   * Correct -> celebrate; wrong -> gentle shake + "try again" and the button is disabled.
   */
  function choiceGrid(choices, correctId, onResult) {
    var grid = el("div", { className: "choice-grid" });
    choices.forEach(function (animal) {
      var btn = el("button", {
        className: "choice-btn",
        attrs: { type: "button", "aria-label": "Choose " + animal.name },
        children: [pictureFor(animal)]
      });
      btn.addEventListener("click", function () {
        if (btn.classList.contains("is-correct") || grid.classList.contains("locked")) return;
        var isCorrect = animal.id === correctId;
        if (isCorrect) {
          grid.classList.add("locked");
          btn.classList.add("is-correct");
        } else {
          btn.classList.add("is-wrong");
          btn.disabled = true;
          audio.speak("Try again!");
          // remove the shake class after it plays so it can replay later if needed
          setTimeout(function () { btn.classList.remove("is-wrong"); }, 600);
        }
        if (onResult) onResult(isCorrect, animal);
      });
      grid.appendChild(btn);
    });
    return grid;
  }

  // A little round "speak this" button (🔊) that reads the given text aloud.
  function speakButton(getText, label) {
    return el("button", {
      className: "speak-btn",
      text: "🔊",
      attrs: { type: "button", "aria-label": label || "Hear it again", title: label || "Hear it again" },
      on: {
        click: function () {
          var t = typeof getText === "function" ? getText() : getText;
          audio.speak(t);
        }
      }
    });
  }

  /*
   * celebrate(animal, mountEl) — happy feedback on a correct answer.
   * Shows a banner with the animal, sprinkles confetti, and speaks praise.
   */
  var PRAISE = ["Great job!", "You got it!", "Well done!", "Awesome!", "Hooray!", "Wonderful!"];

  function celebrate(animal, mountEl) {
    var praise = pickRandom(PRAISE);
    audio.speak(praise + " It's a " + animal.name + "!");
    confetti(mountEl || document.body);

    var banner = el("div", {
      className: "celebrate-banner",
      children: [
        el("div", { className: "celebrate-emoji", children: [pictureFor(animal)] }),
        el("div", { className: "celebrate-text", text: praise }),
        el("div", { className: "celebrate-name", text: "It's a " + animal.name + "!" })
      ]
    });
    return banner;
  }

  function confetti(mount) {
    var colors = ["#ff595e", "#ffca3a", "#8ac926", "#1982c4", "#6a4c93", "#ff924c"];
    var layer = el("div", { className: "confetti-layer" });
    for (var i = 0; i < 40; i++) {
      var piece = el("div", { className: "confetti-piece" });
      piece.style.left = Math.random() * 100 + "%";
      piece.style.background = colors[i % colors.length];
      piece.style.animationDelay = (Math.random() * 0.3) + "s";
      piece.style.transform = "rotate(" + (Math.random() * 360) + "deg)";
      layer.appendChild(piece);
    }
    mount.appendChild(layer);
    setTimeout(function () { if (layer.parentNode) layer.parentNode.removeChild(layer); }, 2200);
  }

  // Clear a container's children.
  function clear(node) {
    while (node.firstChild) node.removeChild(node.firstChild);
  }

  // Nicely formatted category label.
  function categoryLabel(cat) {
    var labels = {
      pet: "🏠 Pets", farm: "🚜 Farm", wild: "🌳 Wild",
      bird: "🐦 Birds", bug: "🐛 Bugs", ocean: "🌊 Ocean"
    };
    return labels[cat] || cat;
  }

  return {
    pickRandom: pickRandom,
    shuffle: shuffle,
    sample: sample,
    el: el,
    clear: clear,
    pictureFor: pictureFor,
    choiceGrid: choiceGrid,
    speakButton: speakButton,
    celebrate: celebrate,
    confetti: confetti,
    categoryLabel: categoryLabel
  };
})();
