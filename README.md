# 🦁 Guess the Animal! 🐧

A friendly little website for playing "guess the animal" with young children.
You give clues — features, where it lives, how it behaves, fun facts — and they
guess the animal. Built as a plain static site (HTML/CSS/JavaScript), so there's
**nothing to install and no build step**.

## 🎮 Three ways to play

| Mode | Who it's for | What happens |
| --- | --- | --- |
| 🦁 **Play & Guess** | The child, solo | Clues appear one at a time and are **read aloud**. They tap the matching animal from 4 pictures. Right answer = confetti! Wrong = a gentle "try again." |
| 👨‍👦 **Clue Helper** | The grown-up | Pick a category (or any animal at random) and get its clues listed easy → hard for you to read aloud during a real-life guessing game. The answer stays hidden until you tap **Reveal**. |
| 🔤 **Learn to Read** | Early readers | Each clue is a short **3–4 letter word** on a big card. Tap a card to hear it sounded out, read the words, then tap the matching animal. |

Everything is read aloud using the browser's built-in text-to-speech, so a child
who can't read yet can play **Play & Guess** on their own. There's a 🔊/🔇 button
in the top corner to mute the voice.

## ▶️ How to run it

**Easiest:** double-click `index.html` to open it in your web browser. That's it.

**Or serve it locally** (recommended — guarantees audio and everything works the same as when hosted):

```bash
cd animal-guessing-game
python3 -m http.server 8000
# then open http://localhost:8000 in your browser
```

> Tip: it works great on a tablet — big buttons, made for little fingers.

## 🌐 Putting it online (free, optional)

Because it's just static files, you can host it free on **GitHub Pages**:
push this repo to GitHub, then in the repo's **Settings → Pages**, set the
source to your branch's root folder. Your game will be live at
`https://<your-username>.github.io/animal-guessing-game/`.

## 🐾 Adding your own animals

All animals live in one file: [`js/data/animals.js`](js/data/animals.js).
Copy an existing entry and edit it:

```js
{
  id: "cat",                    // unique id, lowercase, no spaces
  name: "Cat",                 // shown & spoken when revealed
  emoji: "🐱",                 // the picture — keep it UNIQUE so choices look different
  category: "pet",             // pet | farm | wild | bird | bug | ocean
  clues: [                      // full sentences, ordered HARD → EASY
    "I have soft fur and long whiskers.",
    "I love to nap in sunny spots.",
    "I chase mice and wiggly string.",
    "I purr when happy and say 'meow'."
  ],
  facts: ["A group of cats is a clowder."],   // optional, used by Clue Helper
  readingClues: ["pet", "fur", "paw", "cute"]  // optional — ONLY 3–4 letter words.
                                               // Adding this puts the animal in Learn to Read mode.
}
```

A few rules of thumb:
- **`clues` go hard → easy.** The first clue should be tricky; the last almost gives it away.
- **`readingClues` must be 3–4 letters each.** Leave the field out if the animal
  doesn't have good short words — it just won't appear in Learn to Read mode.
- **Keep emoji unique** so the 4 picture choices never look the same.

### Animals without a good emoji (platypus, anteater, narwhal…)

Some great animals don't have a matching emoji. Add a real **photo** instead —
drop an image in an `assets/` folder and point to it with an `image` field; the
game shows the photo instead of the emoji. There's a ready-to-use template at
the bottom of `js/data/animals.js`.

## 🗂️ Project layout

```
index.html              # the page (loads everything below)
css/styles.css          # kid-friendly styling
js/data/animals.js      # ← THE animal database (edit this to add animals)
js/audio.js             # text-to-speech (read-aloud) helper
js/ui.js                # shared helpers: picture grid, celebration, shuffling
js/app.js               # home screen + switching between modes
js/modes/
  singlePlayer.js       # 🦁 Play & Guess
  clueHelper.js         # 👨‍👦 Clue Helper
  learnToRead.js        # 🔤 Learn to Read
```

Have fun playing! 🐢🐝🦒🐙
