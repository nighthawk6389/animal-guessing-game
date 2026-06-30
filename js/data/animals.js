/*
 * THE ANIMAL DATABASE
 * ===================
 * This is the single source of animals for the whole game. Add as many as you like!
 *
 * Each animal looks like this:
 * {
 *   id:       "cat",              // unique lowercase id, no spaces
 *   name:     "Cat",             // shown/spoken when revealed
 *   emoji:    "🐱",              // the "picture" the child taps — keep it UNIQUE so choices look different
 *   category: "pet",             // pet | farm | wild | bird | bug | ocean
 *   clues:    [ ... ],            // full-sentence clues written in the animal's "voice", ordered HARD -> EASY
 *                                 //   (first clue is tricky, last clue almost gives it away)
 *   facts:    [ ... ],            // optional fun facts, read aloud in Clue Helper mode
 *   readingClues: [ ... ]         // OPTIONAL. Only include if EVERY word is 3-4 letters long.
 *                                 //   Having this array makes the animal show up in "Learn to Read" mode.
 * }
 *
 * Tip: animals with hard-to-emoji shapes (platypus, anteater, narwhal...) work best once you
 * pair them with a real photo. The game already reads an optional `image` field if you add one
 * later (e.g. image: "assets/platypus.jpg"); see the template at the bottom of this file.
 */

window.GAME = window.GAME || {};

window.GAME.animals = [
  // ---------- PETS ----------
  {
    id: "cat", name: "Cat", emoji: "🐱", category: "pet",
    clues: [
      "I have soft fur and long whiskers that help me feel my way.",
      "I love to nap in warm, sunny spots all day long.",
      "I chase mice and pounce on wiggly string.",
      "I purr when I am happy and I say 'meow'."
    ],
    facts: ["A group of cats is called a clowder.", "Cats sleep up to 16 hours a day!"],
    readingClues: ["pet", "fur", "paw", "cute"]
  },
  {
    id: "dog", name: "Dog", emoji: "🐶", category: "pet",
    clues: [
      "I am a loyal friend who loves to play fetch.",
      "I wag my tail when I am excited to see you.",
      "I like to dig holes and bury my bones.",
      "I am a person's best friend and I say 'woof'."
    ],
    facts: ["Dogs can learn over 100 words.", "A dog's nose print is unique, like a fingerprint."],
    readingClues: ["pet", "fur", "run", "dig"]
  },
  {
    id: "mouse", name: "Mouse", emoji: "🐭", category: "pet",
    clues: [
      "I am very tiny with a long, thin tail.",
      "I like to nibble on cheese and seeds.",
      "I can squeeze through teeny-tiny holes.",
      "I am small and grey and I say 'squeak'."
    ],
    facts: ["Mice can have over 100 babies in a year.", "Their front teeth never stop growing."]
  },
  {
    id: "rabbit", name: "Rabbit", emoji: "🐰", category: "pet",
    clues: [
      "I have a fluffy little tail like a cotton ball.",
      "I have long ears that hear sounds far away.",
      "I love to munch on crunchy carrots and lettuce.",
      "I hop, hop, hop everywhere I go."
    ],
    facts: ["Rabbits can jump nearly 3 feet high.", "A baby rabbit is called a kit."],
    readingClues: ["hop", "ear", "soft", "fast"]
  },
  {
    id: "hamster", name: "Hamster", emoji: "🐹", category: "pet",
    clues: [
      "I am a tiny furball who loves to run on a wheel.",
      "I stuff my cheeks full of food to save for later.",
      "I sleep in the day and wake up at night.",
      "I am a small, round pet who lives in a cage."
    ],
    facts: ["Hamster cheeks can stretch all the way to their hips!"]
  },

  // ---------- FARM ----------
  {
    id: "cow", name: "Cow", emoji: "🐮", category: "farm",
    clues: [
      "I have spots and chew grass all day in the field.",
      "I have four tummies to help me digest my food.",
      "Farmers milk me to make cheese and ice cream.",
      "I am big and I say 'moo'."
    ],
    facts: ["Cows have best friends and get sad when apart.", "A cow drinks a bathtub of water a day."],
    readingClues: ["moo", "big", "milk", "farm"]
  },
  {
    id: "pig", name: "Pig", emoji: "🐷", category: "farm",
    clues: [
      "I have a curly tail and a flat, round snout.",
      "I love to roll in cool, squishy mud.",
      "I am very smart and can learn tricks.",
      "I am pink and I say 'oink'."
    ],
    facts: ["Pigs are as smart as a 3-year-old child.", "Pigs cannot sweat, so they roll in mud to cool down."],
    readingClues: ["mud", "pink", "oink", "farm"]
  },
  {
    id: "hen", name: "Hen", emoji: "🐔", category: "farm",
    clues: [
      "I have feathers, a beak, and a wobbly red comb.",
      "I peck at seeds and bugs on the ground.",
      "I lay eggs in a cozy nest.",
      "I live on the farm and I say 'cluck'."
    ],
    facts: ["Hens talk to their chicks before they even hatch."],
    readingClues: ["egg", "hop", "farm", "peck"]
  },
  {
    id: "horse", name: "Horse", emoji: "🐴", category: "farm",
    clues: [
      "I have a long, flowing mane and a swishy tail.",
      "I can run very fast and let people ride on my back.",
      "I sleep standing up and eat hay and oats.",
      "I gallop across the field and I say 'neigh'."
    ],
    facts: ["Horses can sleep both lying down and standing up.", "Horses can run almost right after they are born."]
  },
  {
    id: "goat", name: "Goat", emoji: "🐐", category: "farm",
    clues: [
      "I have horns and a little beard on my chin.",
      "I love to climb on rocks and high places.",
      "I will nibble on almost anything, even tin cans!",
      "I live on the farm and I say 'maaa'."
    ],
    facts: ["Goats have rectangular pupils to see all around them.", "Goats can climb trees!"],
    readingClues: ["hop", "farm", "milk", "horn"]
  },
  {
    id: "duck", name: "Duck", emoji: "🦆", category: "farm",
    clues: [
      "I have webbed feet that work like little paddles.",
      "My feathers are waterproof, so I never get soggy.",
      "I love to swim and dunk my head for food.",
      "I splash in the pond and I say 'quack'."
    ],
    facts: ["Ducks' feathers are so waterproof they stay dry underwater."],
    readingClues: ["pond", "swim", "wet", "egg"]
  },
  {
    id: "sheep", name: "Sheep", emoji: "🐑", category: "farm",
    clues: [
      "I am covered in thick, curly, woolly fluff.",
      "People shave my wool to make warm sweaters.",
      "I like to stay together with my flock.",
      "I graze in the field and I say 'baa'."
    ],
    facts: ["Sheep can recognize up to 50 other sheep faces."]
  },

  // ---------- WILD ----------
  {
    id: "fox", name: "Fox", emoji: "🦊", category: "wild",
    clues: [
      "I have a bushy tail and pointy, listening ears.",
      "I am clever and sneaky when I hunt at night.",
      "My fur is a beautiful reddish-orange color.",
      "I look like a small dog and I am very sly."
    ],
    facts: ["Foxes use the Earth's magnetic field to hunt.", "A baby fox is called a kit."],
    readingClues: ["red", "fur", "sly", "run"]
  },
  {
    id: "bear", name: "Bear", emoji: "🐻", category: "wild",
    clues: [
      "I am big and strong with thick, warm fur.",
      "I love to eat honey and catch fish in rivers.",
      "I sleep all winter long in a cozy den.",
      "I am big and furry and I give great big hugs."
    ],
    facts: ["Bears can smell food from miles away.", "Bears sleep for months during winter."],
    readingClues: ["big", "fur", "cave", "paws"]
  },
  {
    id: "lion", name: "Lion", emoji: "🦁", category: "wild",
    clues: [
      "I live in the grasslands of Africa with my family.",
      "The boys in my family have a big, fuzzy mane.",
      "I am called the king of the jungle.",
      "I am a giant cat and I let out a mighty 'roar'."
    ],
    facts: ["A lion's roar can be heard from 5 miles away.", "Lions sleep up to 20 hours a day."],
    readingClues: ["big", "mane", "roar", "cat"]
  },
  {
    id: "tiger", name: "Tiger", emoji: "🐯", category: "wild",
    clues: [
      "I have orange fur with black stripes, and no two of us look alike.",
      "I am a great swimmer and love to cool off in water.",
      "I sneak quietly through the jungle to hunt.",
      "I am the biggest cat in the world and I 'roar'."
    ],
    facts: ["Every tiger's stripes are unique, like fingerprints.", "Tigers actually love water and swimming."]
  },
  {
    id: "wolf", name: "Wolf", emoji: "🐺", category: "wild",
    clues: [
      "I live and hunt together with my family group.",
      "I have sharp teeth and a great sense of smell.",
      "I look like a big, wild grey dog.",
      "When the moon is out, I 'howl' at the sky."
    ],
    facts: ["A group of wolves is called a pack.", "Wolves howl to talk to their pack."],
    readingClues: ["howl", "pack", "fur", "fast"]
  },
  {
    id: "deer", name: "Deer", emoji: "🦌", category: "wild",
    clues: [
      "I have long, thin legs and a short, fluffy tail.",
      "Some of us grow branchy antlers on our heads.",
      "I leap gracefully through the forest.",
      "I am gentle and shy, and my baby is called a fawn."
    ],
    facts: ["Deer antlers can grow up to an inch a day.", "Baby deer have no scent to hide from predators."],
    readingClues: ["run", "leap", "fawn", "fast"]
  },
  {
    id: "frog", name: "Frog", emoji: "🐸", category: "wild",
    clues: [
      "I am smooth and slimy and I love the water.",
      "I catch flies with my long, sticky tongue.",
      "I started life as a tiny tadpole.",
      "I hop near the pond and I say 'ribbit'."
    ],
    facts: ["Frogs drink water through their skin.", "Some frogs can freeze solid and hop away in spring."],
    readingClues: ["hop", "wet", "pond", "jump"]
  },
  {
    id: "monkey", name: "Monkey", emoji: "🐵", category: "wild",
    clues: [
      "I have clever hands and a long tail to help me balance.",
      "I swing from tree to tree in the jungle.",
      "I love to peel and eat bananas.",
      "I am playful and silly and I say 'ooh ooh aah aah'."
    ],
    facts: ["Some monkeys use their tails like an extra hand.", "Monkeys can learn to use tools."]
  },
  {
    id: "koala", name: "Koala", emoji: "🐨", category: "wild",
    clues: [
      "I live in trees in faraway Australia.",
      "I only eat the leaves of one special tree.",
      "I sleep almost the whole day, up to 20 hours!",
      "I am grey and fluffy and look like a little bear."
    ],
    facts: ["Koalas sleep up to 22 hours a day.", "Koalas have fingerprints almost like humans."]
  },
  {
    id: "kangaroo", name: "Kangaroo", emoji: "🦘", category: "wild",
    clues: [
      "I live in Australia and I have a strong, thick tail.",
      "I carry my baby in a cozy pouch on my tummy.",
      "I have huge back legs and big feet.",
      "I cannot walk backwards — I can only hop forward!"
    ],
    facts: ["Baby kangaroos are called joeys.", "Kangaroos can hop 30 feet in a single leap."]
  },
  {
    id: "sloth", name: "Sloth", emoji: "🦥", category: "wild",
    clues: [
      "I live in the rainforest and hang upside down in trees.",
      "I move so very, very slowly all the time.",
      "I am so slow that green algae grows on my fur!",
      "I am the slowest, sleepiest animal in the jungle."
    ],
    facts: ["Sloths are so slow that algae grows on them.", "It takes a sloth a whole month to digest one meal."]
  },
  {
    id: "otter", name: "Otter", emoji: "🦦", category: "wild",
    clues: [
      "I have sleek fur and love to splash and swim.",
      "I crack open shells using a rock on my tummy.",
      "I hold hands with my friends while I sleep so we don't drift apart.",
      "I am a playful river animal who loves to slide."
    ],
    facts: ["Otters hold hands while sleeping so they don't float away.", "Otters keep a favorite rock in a pocket of skin."]
  },
  {
    id: "hedgehog", name: "Hedgehog", emoji: "🦔", category: "wild",
    clues: [
      "I am a tiny animal who comes out at night.",
      "My back is covered in lots of pointy spines.",
      "When I am scared, I roll up into a prickly ball.",
      "I am small and spiky and I snuffle for bugs."
    ],
    facts: ["A hedgehog has around 5,000 spines.", "Hedgehogs roll into a ball to stay safe."]
  },
  {
    id: "skunk", name: "Skunk", emoji: "🦨", category: "wild",
    clues: [
      "I am black with a bold white stripe down my back.",
      "I come out at night to look for food.",
      "When I feel scared, I make a very stinky smell!",
      "Everyone runs away when I lift my fluffy tail."
    ],
    facts: ["A skunk's spray can be smelled over a mile away.", "Skunks do a little handstand to warn you first."]
  },
  {
    id: "raccoon", name: "Raccoon", emoji: "🦝", category: "wild",
    clues: [
      "I have a black mask of fur around my eyes.",
      "My tail has stripey rings all the way down.",
      "I use my clever little hands to open things.",
      "I sneak out at night and dig through trash for snacks."
    ],
    facts: ["Raccoons wash their food before eating it.", "Raccoons can remember how to solve puzzles for years."]
  },
  {
    id: "beaver", name: "Beaver", emoji: "🦫", category: "wild",
    clues: [
      "I have big front teeth and a flat, paddle tail.",
      "I chew down trees to build my home.",
      "I build dams across rivers and streams.",
      "I am nature's busiest little builder."
    ],
    facts: ["Beaver teeth never stop growing.", "Beaver dams can be seen from space."]
  },
  {
    id: "gorilla", name: "Gorilla", emoji: "🦍", category: "wild",
    clues: [
      "I live in the forests of Africa.",
      "I am big and strong with long, powerful arms.",
      "I beat my chest with my fists to say hello.",
      "I am the biggest, gentlest ape of all."
    ],
    facts: ["Gorillas can learn sign language.", "Gorillas share almost all their DNA with humans."]
  },
  {
    id: "orangutan", name: "Orangutan", emoji: "🦧", category: "wild",
    clues: [
      "I have long, shaggy orange-red hair.",
      "I have extra-long arms for swinging through trees.",
      "I am a very clever ape who uses tools.",
      "I make a leafy umbrella when it rains in the jungle."
    ],
    facts: ["Orangutan arms are longer than their whole body.", "They build a fresh leafy nest to sleep in every night."]
  },
  {
    id: "elephant", name: "Elephant", emoji: "🐘", category: "wild",
    clues: [
      "I am the biggest animal that walks on land.",
      "I have huge, flappy ears and white tusks.",
      "I use my long trunk to drink, smell, and hug.",
      "I am giant and grey and I 'trumpet' through my nose."
    ],
    facts: ["Elephants can hear with their feet.", "Elephants are scared of bees!"],
    readingClues: ["big", "grey", "ears", "tusk"]
  },
  {
    id: "giraffe", name: "Giraffe", emoji: "🦒", category: "wild",
    clues: [
      "I live on the grassy plains of Africa.",
      "I have a coat of brown patches all over.",
      "I am so tall I can eat leaves at the top of trees.",
      "I have the longest neck of any animal."
    ],
    facts: ["A giraffe's tongue is purple-blue and almost 2 feet long.", "Giraffes only need 30 minutes of sleep a day."],
    readingClues: ["tall", "neck", "legs", "eat"]
  },
  {
    id: "zebra", name: "Zebra", emoji: "🦓", category: "wild",
    clues: [
      "I live on the African plains and look like a wild horse.",
      "No two of us have exactly the same pattern.",
      "I stay in a big group called a herd to stay safe.",
      "I am covered in black and white stripes."
    ],
    facts: ["Every zebra has a unique stripe pattern.", "Zebras are black with white stripes, not the other way around."]
  },
  {
    id: "rhino", name: "Rhino", emoji: "🦏", category: "wild",
    clues: [
      "I am big and grey with thick, tough skin.",
      "I have one or two horns on my nose.",
      "I love to wallow in cool mud to stay comfy.",
      "I am huge and heavy and I charge when I'm grumpy."
    ],
    facts: ["A rhino's horn is made of the same stuff as your hair.", "Rhinos and tiny birds are best friends."]
  },
  {
    id: "hippo", name: "Hippo", emoji: "🦛", category: "wild",
    clues: [
      "I live in rivers in Africa and love the water.",
      "I have a giant mouth and can open it super wide.",
      "I spend my whole day soaking to stay cool.",
      "I am big and round and surprisingly fast!"
    ],
    facts: ["Hippos make their own pink sunscreen.", "Hippos can hold their breath for 5 minutes underwater."]
  },
  {
    id: "camel", name: "Camel", emoji: "🐫", category: "wild",
    clues: [
      "I live in the hot, sandy desert.",
      "I have humps on my back that store fat for energy.",
      "I can go a long, long time without drinking water.",
      "People ride me across the dunes like a ship of the desert."
    ],
    facts: ["Camels can drink 30 gallons of water in 13 minutes.", "Their humps store fat, not water."]
  },
  {
    id: "bison", name: "Bison", emoji: "🦬", category: "wild",
    clues: [
      "I am a huge, shaggy animal of the grassy plains.",
      "I have a big hump of muscle on my shoulders.",
      "Even though I am enormous, I can run very fast.",
      "I roam in giant herds, like a big woolly cow."
    ],
    facts: ["Bison can run up to 35 miles per hour.", "Bison are the largest land animal in North America."]
  },
  {
    id: "panda", name: "Panda", emoji: "🐼", category: "wild",
    clues: [
      "I live in the bamboo forests of China.",
      "I have black patches around my eyes and ears.",
      "I spend almost all day eating bamboo.",
      "I am a black-and-white bear, cuddly and round."
    ],
    facts: ["Pandas eat bamboo for 12 hours every day.", "Newborn pandas are smaller than a stick of butter."]
  },
  {
    id: "bat", name: "Bat", emoji: "🦇", category: "wild",
    clues: [
      "I sleep all day hanging upside down.",
      "I come out at night to fly and find food.",
      "I 'see' in the dark by listening to echoes.",
      "I am the only mammal that can really fly."
    ],
    facts: ["Bats are the only mammals that can truly fly.", "A tiny bat can eat 1,000 bugs in an hour."],
    readingClues: ["fly", "dark", "cave", "wing"]
  },
  {
    id: "chameleon", name: "Chameleon", emoji: "🦎", category: "wild",
    clues: [
      "I am a lizard that lives in the warm forest.",
      "My eyes can look in two directions at once.",
      "I catch bugs with my super long, sticky tongue.",
      "I can change my color to blend in or show my mood!"
    ],
    facts: ["Chameleons change color to talk, not just to hide.", "Their eyes move in two directions at the same time."]
  },
  {
    id: "snake", name: "Snake", emoji: "🐍", category: "wild",
    clues: [
      "I have no arms and no legs at all.",
      "I taste the air by flicking my forked tongue.",
      "I slither and slide along the ground.",
      "I am long and bendy and I say 'hiss'."
    ],
    facts: ["Snakes smell with their tongues.", "Some snakes can go months without eating."],
    readingClues: ["long", "hiss", "skin", "cold"]
  },
  {
    id: "crocodile", name: "Crocodile", emoji: "🐊", category: "wild",
    clues: [
      "I have bumpy, armored skin and a long snout.",
      "I float quietly in the water like a sneaky log.",
      "I have a huge mouth full of pointy teeth.",
      "I am a giant reptile with a super strong bite."
    ],
    facts: ["Crocodiles have been around since the dinosaurs.", "A crocodile can hold its breath for an hour."]
  },

  // ---------- BIRDS ----------
  {
    id: "penguin", name: "Penguin", emoji: "🐧", category: "bird",
    clues: [
      "I am a bird, but I cannot fly in the air.",
      "I live where it is cold and snowy and icy.",
      "I waddle on land and slide on my belly.",
      "I wear a black-and-white tuxedo and I love to swim."
    ],
    facts: ["Penguins can leap 6 feet out of the water.", "Daddy penguins keep the egg warm on their feet."],
    readingClues: ["bird", "cold", "ice", "swim"]
  },
  {
    id: "owl", name: "Owl", emoji: "🦉", category: "bird",
    clues: [
      "I am a bird that is awake at night.",
      "I can turn my head almost all the way around.",
      "I have big round eyes to see in the dark.",
      "I sit in the tree and I say 'hoot hoot'."
    ],
    facts: ["Owls can turn their heads almost all the way around.", "Owls fly silently to surprise their dinner."],
    readingClues: ["owl", "fly", "hoot", "wise"]
  },
  {
    id: "condor", name: "Condor", emoji: "🦅", category: "bird",
    clues: [
      "I am one of the biggest flying birds in the world.",
      "I have huge wings as wide as a car.",
      "I glide high over the mountains without flapping.",
      "I am a giant bird that soars in the sky like a king."
    ],
    facts: ["A condor's wings can spread over 10 feet wide!", "Condors can glide for hours without flapping."]
  },
  {
    id: "parrot", name: "Parrot", emoji: "🦜", category: "bird",
    clues: [
      "I am a bird with bright, colorful feathers.",
      "I live in warm, leafy rainforests.",
      "I use my curved beak to crack open nuts.",
      "I am clever and I can copy words that people say!"
    ],
    facts: ["Some parrots can learn over 100 words.", "Parrots can live to be 80 years old."]
  },
  {
    id: "flamingo", name: "Flamingo", emoji: "🦩", category: "bird",
    clues: [
      "I am a tall bird with very long, skinny legs.",
      "I often stand on just one leg for a long time.",
      "I scoop up tiny shrimp from the water to eat.",
      "I am bright pink from head to toe!"
    ],
    facts: ["Flamingos are pink because of the shrimp they eat.", "A group of flamingos is called a flamboyance."],
    readingClues: ["pink", "tall", "legs", "bird"]
  },
  {
    id: "peacock", name: "Peacock", emoji: "🦚", category: "bird",
    clues: [
      "I am a fancy bird with a little crown on my head.",
      "My feathers are a shiny blue and green.",
      "I have eye-shaped spots on my long tail.",
      "I spread my tail into a giant, beautiful fan."
    ],
    facts: ["A peacock's tail can be 5 feet long.", "They shake their feathers to make a rattling sound."]
  },
  {
    id: "swan", name: "Swan", emoji: "🦢", category: "bird",
    clues: [
      "I am a large, graceful bird who glides on the water.",
      "I have a long, curvy neck shaped like an 'S'.",
      "My feathers are usually snowy white.",
      "I float on the lake looking calm and elegant."
    ],
    facts: ["Swans can sleep while floating on the water.", "Two swans' necks can make a heart shape."]
  },
  {
    id: "dodo", name: "Dodo", emoji: "🦤", category: "bird",
    clues: [
      "I am a chubby bird who could not fly.",
      "I had a big hooked beak and little wings.",
      "I lived on an island all by myself long ago.",
      "I am a famous bird that does not exist anymore."
    ],
    facts: ["The dodo went extinct over 300 years ago.", "Dodos had no fear of people because they had no predators."]
  },

  // ---------- BUGS ----------
  {
    id: "bee", name: "Bee", emoji: "🐝", category: "bug",
    clues: [
      "I am a tiny insect with black and yellow stripes.",
      "I fly from flower to flower collecting pollen.",
      "I live in a hive with my queen and helpers.",
      "I make sweet, sticky honey and I say 'buzz'."
    ],
    facts: ["Bees do a little dance to tell each other where flowers are.", "A bee visits hundreds of flowers in one trip."],
    readingClues: ["buzz", "fly", "hive", "bug"]
  },
  {
    id: "butterfly", name: "Butterfly", emoji: "🦋", category: "bug",
    clues: [
      "I have big, colorful wings that flutter.",
      "I sip sweet nectar from flowers with a curly straw.",
      "I started life as a crawling caterpillar.",
      "I float gently through the air on pretty wings."
    ],
    facts: ["Butterflies taste with their feet.", "A caterpillar turns to soup before becoming a butterfly!"],
    readingClues: ["fly", "wing", "bug", "pink"]
  },
  {
    id: "ladybug", name: "Ladybug", emoji: "🐞", category: "bug",
    clues: [
      "I am a tiny, round little beetle.",
      "I am bright red with little black spots.",
      "I am a helper who eats bugs off of plants.",
      "Farmers love me, and I bring good luck!"
    ],
    facts: ["A ladybug can eat 5,000 bugs in its life.", "Ladybugs play dead to trick predators."],
    readingClues: ["red", "bug", "spot", "fly"]
  },
  {
    id: "snail", name: "Snail", emoji: "🐌", category: "bug",
    clues: [
      "I carry my house on my back wherever I go.",
      "I move very, very slowly and leave a slimy trail.",
      "I have little eyes on the tips of my feelers.",
      "I am a soft, squishy creature in a spiral shell."
    ],
    facts: ["Snails can sleep for up to 3 years.", "A snail can slide over a sharp blade and not get hurt."],
    readingClues: ["slow", "wet", "bug", "slim"]
  },
  {
    id: "scorpion", name: "Scorpion", emoji: "🦂", category: "bug",
    clues: [
      "I live in the hot, dry desert.",
      "I have eight legs and two big pinching claws.",
      "I have a curved tail with a stinger on the end.",
      "I glow in the dark under a special blue light!"
    ],
    facts: ["Scorpions glow bright blue under UV light.", "Scorpions can hold their breath for days."]
  },
  {
    id: "ant", name: "Ant", emoji: "🐜", category: "bug",
    clues: [
      "I am a teeny-tiny insect with six legs.",
      "I can lift things much bigger than myself.",
      "I work together with thousands of my friends.",
      "I live in a hill and march in a long line."
    ],
    facts: ["Ants can lift 50 times their own weight.", "Some ant colonies have millions of ants."],
    readingClues: ["tiny", "dig", "bug", "hill"]
  },
  {
    id: "spider", name: "Spider", emoji: "🕷️", category: "bug",
    clues: [
      "I have eight legs and lots of little eyes.",
      "I spin silk threads to make my home.",
      "I catch bugs in my sticky, stringy web.",
      "I am a creepy-crawly who weaves beautiful webs."
    ],
    facts: ["Spider silk is stronger than steel of the same size.", "Most spiders have eight eyes."],
    readingClues: ["web", "legs", "bug", "spin"]
  },

  // ---------- OCEAN ----------
  {
    id: "octopus", name: "Octopus", emoji: "🐙", category: "ocean",
    clues: [
      "I live deep down in the ocean.",
      "I have eight wiggly, bendy arms.",
      "I can squirt ink and change my color to hide.",
      "I am very smart and I have three hearts!"
    ],
    facts: ["An octopus has three hearts and blue blood.", "Octopuses can squeeze through a hole the size of a coin."]
  },
  {
    id: "shark", name: "Shark", emoji: "🦈", category: "ocean",
    clues: [
      "I am a powerful fish who lives in the ocean.",
      "I have rows and rows of sharp teeth.",
      "I have a tall fin that pokes out of the water.",
      "I am one of the fastest hunters in the sea."
    ],
    facts: ["Sharks can grow thousands of teeth in a lifetime.", "Sharks existed before trees did!"],
    readingClues: ["fin", "fish", "sea", "fast"]
  },
  {
    id: "dolphin", name: "Dolphin", emoji: "🐬", category: "ocean",
    clues: [
      "I am a smart and friendly sea animal.",
      "I love to leap and flip out of the waves.",
      "I talk to my friends using clicks and whistles.",
      "I am a playful swimmer who breathes air through my blowhole."
    ],
    facts: ["Dolphins call each other by name!", "Dolphins sleep with one half of their brain awake."]
  },
  {
    id: "whale", name: "Whale", emoji: "🐳", category: "ocean",
    clues: [
      "I am the biggest animal in the whole world.",
      "I live in the ocean but I breathe air.",
      "I shoot a spout of water out of my blowhole.",
      "I sing long, low songs across the deep sea."
    ],
    facts: ["A blue whale's heart is as big as a car.", "Whale songs can travel across entire oceans."],
    readingClues: ["big", "sea", "blue", "sing"]
  },
  {
    id: "narwhal", name: "Narwhal", emoji: "🦄", category: "ocean",
    clues: [
      "I am a small whale that lives in icy cold seas.",
      "I have one long, pointy, twisty tusk.",
      "My tusk is really a giant, super-long tooth!",
      "People call me the 'unicorn of the sea'."
    ],
    facts: ["A narwhal's tusk is actually a tooth up to 9 feet long.", "Narwhals live in the freezing Arctic all year."]
  },
  {
    id: "seal", name: "Seal", emoji: "🦭", category: "ocean",
    clues: [
      "I have smooth fur and big, round eyes.",
      "I have flippers that help me zoom through the water.",
      "I love to flop and sunbathe on cold rocks.",
      "I am a chubby swimmer who lives in the cold sea."
    ],
    facts: ["Seals can sleep underwater and pop up to breathe.", "Seals use their whiskers to feel fish swimming."],
    readingClues: ["sea", "swim", "fish", "cold"]
  },
  {
    id: "crab", name: "Crab", emoji: "🦀", category: "ocean",
    clues: [
      "I have a hard shell and eight little legs.",
      "I have two big claws to pinch with.",
      "I live near the sea and dig in the sand.",
      "I walk sideways along the beach."
    ],
    facts: ["Crabs walk sideways because of how their legs bend.", "Some crabs can regrow a claw if they lose one."],
    readingClues: ["sea", "claw", "sand", "red"]
  },
  {
    id: "lobster", name: "Lobster", emoji: "🦞", category: "ocean",
    clues: [
      "I live at the bottom of the cold ocean.",
      "I have a long body and two giant claws.",
      "I have a hard shell and lots of legs.",
      "I turn bright red when I am cooked."
    ],
    facts: ["Lobsters taste with their legs.", "Lobsters can live to be over 100 years old."]
  },
  {
    id: "jellyfish", name: "Jellyfish", emoji: "🪼", category: "ocean",
    clues: [
      "I drift through the ocean and have no bones at all.",
      "I am soft and squishy and almost see-through.",
      "I have long, dangly, stingy tentacles.",
      "I look like a wobbly, floating umbrella."
    ],
    facts: ["Jellyfish have been around for 500 million years.", "Some jellyfish glow in the dark."]
  },
  {
    id: "squid", name: "Squid", emoji: "🦑", category: "ocean",
    clues: [
      "I live in the deep, dark ocean.",
      "I have a long body and ten wiggly arms.",
      "I shoot out a cloud of ink to escape danger.",
      "I am a fast swimmer with big, round eyes."
    ],
    facts: ["The giant squid has eyes as big as dinner plates.", "Squid can swim backwards by squirting water."]
  },
  {
    id: "pufferfish", name: "Pufferfish", emoji: "🐡", category: "ocean",
    clues: [
      "I am a small fish in the warm ocean.",
      "I have a round body and little fins.",
      "When I get scared, I puff up like a balloon!",
      "I am round and spiky when I blow myself up big."
    ],
    facts: ["Pufferfish gulp water to puff up to twice their size.", "Some pufferfish draw patterns in the sand."]
  },
  {
    id: "turtle", name: "Turtle", emoji: "🐢", category: "ocean",
    clues: [
      "I carry a hard, round shell on my back.",
      "I can tuck my head and legs inside to stay safe.",
      "I move very slowly on land but glide in the water.",
      "I am a gentle reptile who lives a very long time."
    ],
    facts: ["Some turtles can live over 150 years.", "Sea turtles travel thousands of miles in the ocean."],
    readingClues: ["slow", "sea", "swim", "old"]
  }
];

/*
 * WANT TO ADD A TRICKY ANIMAL WITHOUT A GOOD EMOJI? (platypus, anteater, axolotl...)
 * Copy this template, give it a real photo, and the game will show the photo instead of an emoji:
 *
 * {
 *   id: "platypus", name: "Platypus", emoji: "🦆", image: "assets/platypus.jpg", category: "wild",
 *   clues: [
 *     "I live in rivers in Australia.",
 *     "I have a bill like a duck and a tail like a beaver.",
 *     "I am a mammal, but I lay eggs!",
 *     "I am one of the strangest animals in the whole world."
 *   ],
 *   facts: ["Platypuses glow green under UV light.", "Male platypuses have venom in their feet."]
 * }
 */
