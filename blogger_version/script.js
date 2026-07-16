// DATASETS
const ENGLISH_ALPHABET = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

const ENGLISH_WORDS = [
  { letter: 'A', word: 'Apple', emoji: '🍎' },
  { letter: 'B', word: 'Ball', emoji: '⚽' },
  { letter: 'C', word: 'Cat', emoji: '🐱' },
  { letter: 'D', word: 'Dog', emoji: '🐶' },
  { letter: 'E', word: 'Elephant', emoji: '🐘' },
  { letter: 'F', word: 'Fish', emoji: '🐟' },
  { letter: 'G', word: 'Grapes', emoji: '🍇' },
  { letter: 'H', word: 'Horse', emoji: '🐴' },
  { letter: 'I', word: 'Ice Cream', emoji: '🍦' },
  { letter: 'J', word: 'Jellyfish', emoji: '🪼' },
  { letter: 'K', word: 'Kite', emoji: '🪁' },
  { letter: 'L', word: 'Lion', emoji: '🦁' },
  { letter: 'M', word: 'Monkey', emoji: '🐒' },
  { letter: 'N', word: 'Nest', emoji: '🪹' },
  { letter: 'O', word: 'Orange', emoji: '🍊' },
  { letter: 'P', word: 'Parrot', emoji: '🦜' },
  { letter: 'Q', word: 'Queen', emoji: '👸' },
  { letter: 'R', word: 'Rabbit', emoji: '🐰' },
  { letter: 'S', word: 'Sun', emoji: '☀️' },
  { letter: 'T', word: 'Tiger', emoji: '🐯' },
  { letter: 'U', word: 'Umbrella', emoji: '☂️' },
  { letter: 'V', word: 'Violin', emoji: '🎻' },
  { letter: 'W', word: 'Watermelon', emoji: '🍉' },
  { letter: 'X', word: 'Xylophone', emoji: '🪗' },
  { letter: 'Y', word: 'Yak', emoji: '🐂' },
  { letter: 'Z', word: 'Zebra', emoji: '🦓' }
];

const GUJARATI_ALPHABET = [
  // Vowels (Svar)
  { letter: 'અ', phonetic: 'A', word: 'અજગર', emoji: '🐍', english: 'Python' },
  { letter: 'આ', phonetic: 'Aa', word: 'આગગાડી', emoji: '🚂', english: 'Train' },
  { letter: 'ઇ', phonetic: 'I', word: 'ઇમારત', emoji: '🏢', english: 'Building' },
  { letter: 'ઈ', phonetic: 'Ee', word: 'ઈશ્વર', emoji: '🛕', english: 'Temple' },
  { letter: 'ઉ', phonetic: 'U', word: 'ઉપવન', emoji: '🏡', english: 'Garden' },
  { letter: 'ઊ', phonetic: 'Oo', word: 'ઊન', emoji: '🧶', english: 'Wool' },
  { letter: 'એ', phonetic: 'E', word: 'એકતા', emoji: '1️⃣', english: 'Unity' },
  { letter: 'ઐ', phonetic: 'Ai', word: 'ઐરાવત', emoji: '🐘', english: 'Elephant' },
  { letter: 'ઓ', phonetic: 'O', word: 'ઓજાર', emoji: '🔧', english: 'Tools' },
  { letter: 'ઔ', phonetic: 'Au', word: 'ઔષધ', emoji: '💊', english: 'Medicine' },
  { letter: 'અં', phonetic: 'Am', word: 'અંજીર', emoji: '🫚', english: 'Fig' },
  { letter: 'અઃ', phonetic: 'Aha', word: 'નમઃ', emoji: '🙏', english: 'Namaste' },

  // Consonants (Vyanjan)
  { letter: 'ક', phonetic: 'Ka', word: 'કમળ', emoji: '🪷', english: 'Lotus' },
  { letter: 'ખ', phonetic: 'Kha', word: 'ખલ', emoji: '🥣', english: 'Mortar' },
  { letter: 'ગ', phonetic: 'Ga', word: 'ગણપતિ', emoji: '🔱', english: 'Lord Ganesha' },
  { letter: 'ઘ', phonetic: 'Gha', word: 'ઘર', emoji: '🏠', english: 'House' },
  { letter: 'ચ', phonetic: 'Cha', word: 'ચકલી', emoji: '🐦', english: 'Sparrow' },
  { letter: 'છ', phonetic: 'Chha', word: 'છત્રી', emoji: '☂️', english: 'Umbrella' },
  { letter: 'જ', phonetic: 'Ja', word: 'જમરૂખ', emoji: '🍏', english: 'Guava' },
  { letter: 'ઝ', phonetic: 'Jha', word: 'ઝભ્ભું', emoji: '🥋', english: 'Kurtas' },
  { letter: 'ટ', phonetic: 'Ta', word: 'ટમેટું', emoji: '🍅', english: 'Tomato' },
  { letter: 'ઠ', phonetic: 'Tha', word: 'ઠળિયો', emoji: '🍒', english: 'Seed' },
  { letter: 'ડ', phonetic: 'Da', word: 'ડમરુ', emoji: '🪘', english: 'Drum' },
  { letter: 'ઢ', phonetic: 'Dha', word: 'ઢગલો', emoji: '⛰️', english: 'Pile' },
  { letter: 'ણ', phonetic: 'Na', word: 'ફેણ', emoji: '🐍', english: 'Cobra Hood' },
  { letter: 'ત', phonetic: 'Ta', word: 'તપેલી', emoji: '🫕', english: 'Pot' },
  { letter: 'થ', phonetic: 'Tha', word: 'થડ', emoji: '🪵', english: 'Tree Trunk' },
  { letter: 'દ', phonetic: 'Da', word: 'દડો', emoji: '⚽', english: 'Ball' },
  { letter: 'ધ', phonetic: 'Dha', word: 'ધનુષ', emoji: '🏹', english: 'Bow' },
  { letter: 'ન', phonetic: 'Na', word: 'નળ', emoji: '🚰', english: 'Tap' },
  { letter: 'પ', phonetic: 'Pa', word: 'પતંગ', emoji: '🪁', english: 'Kite' },
  { letter: 'ફ', phonetic: 'Pha', word: 'ફટાકડા', emoji: '🎆', english: 'Firecrackers' },
  { letter: 'બ', phonetic: 'Ba', word: 'બતક', emoji: '🦆', english: 'Duck' },
  { letter: 'ભ', phonetic: 'Bha', word: 'ભમરડો', emoji: '🪀', english: 'Spinning Top' },
  { letter: 'મ', phonetic: 'Ma', word: 'મરચું', emoji: '🌶️', english: 'Chilli' },
  { letter: 'ય', phonetic: 'Ya', word: 'યજ્ઞ', emoji: '🔥', english: 'Sacred Fire' },
  { letter: 'ર', phonetic: 'Ra', word: 'રમકડું', emoji: '🧸', english: 'Toy' },
  { letter: 'લ', phonetic: 'La', word: 'લખોટી', emoji: '🔮', english: 'Marbles' },
  { letter: 'વ', phonetic: 'Va', word: 'વહાણ', emoji: '🚢', english: 'Ship' },
  { letter: 'શ', phonetic: 'Sha', word: 'શરણાઈ', emoji: '🎷', english: 'Clarinet' },
  { letter: 'ષ', phonetic: 'Sha', word: 'ષટ્કોણ', emoji: '⬡', english: 'Hexagon' },
  { letter: 'સ', phonetic: 'Sa', word: 'સસલું', emoji: '🐰', english: 'Rabbit' },
  { letter: 'હ', phonetic: 'Ha', word: 'હરણ', emoji: '🦌', english: 'Deer' },
  { letter: 'ળ', phonetic: 'La', word: 'નળ', emoji: '🚰', english: 'Water Tap' },
  { letter: 'ક્ષ', phonetic: 'Ksha', word: 'ક્ષત્રિય', emoji: '⚔️', english: 'Warrior' },
  { letter: 'જ્ઞ', phonetic: 'Gnya', word: 'યજ્ઞ', emoji: '🧠', english: 'Sage' }
];

const FUTURE_SECTIONS = [
  { title: 'Gujarati Words', emoji: '📖', category: 'Gujarati' },
  { title: 'English Numbers', emoji: '🔢', category: 'English' },
  { title: 'Gujarati Numbers', emoji: '૧૨૩', category: 'Gujarati' },
  { title: 'Barakhadi (બારાખડી)', emoji: '📚', category: 'Gujarati' },
  { title: 'Games Room', emoji: '🕹️', category: 'Activity' },
  { title: 'Letter Match', emoji: '🧩', category: 'Game' },
  { title: 'Number Trace', emoji: '✏️', category: 'Practice' },
  { title: 'Quiz Arena', emoji: '🏆', category: 'Game' },
  { title: 'Flashcards Room', emoji: '🗂️', category: 'General' },
  { title: 'Animal Sounds', emoji: '🦁', category: 'General' },
  { title: 'Shapes & Colors', emoji: '🔺', category: 'General' }
];

// STATE VARIABLES
let currentEngAlphaIdx = 0;
let currentEngWordIdx = 0;
let currentGujAlphaIdx = 0;

// VOICE WARM-UP
if (window.speechSynthesis) {
  window.speechSynthesis.getVoices();
}

// INITIALIZE BUBBLES
function createBubbles() {
  const container = document.getElementById('bubbles-container');
  if (!container) return;
  
  const numberOfBubbles = window.innerWidth < 600 ? 12 : 25;
  
  for (let i = 0; i < numberOfBubbles; i++) {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    
    const size = Math.random() * 40 + 20; // 20px to 60px
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    
    bubble.style.left = `${Math.random() * 100}%`;
    bubble.style.animationDelay = `${Math.random() * 10}s`;
    bubble.style.animationDuration = `${Math.random() * 8 + 8}s`;
    
    container.appendChild(bubble);
  }
}

// THEME HANDLING
function toggleTheme() {
  const body = document.body;
  const themeBtn = document.getElementById('theme-btn');
  const currentTheme = body.getAttribute('data-theme');
  
  if (currentTheme === 'dark') {
    body.setAttribute('data-theme', 'light');
    themeBtn.innerText = '☀️';
  } else {
    body.setAttribute('data-theme', 'dark');
    themeBtn.innerText = '🌙';
  }
}

// NAVIGATION
function navigateTo(viewId) {
  // Hide all views
  document.querySelectorAll('.view').forEach(view => {
    view.classList.remove('active');
  });

  // Show requested view
  const targetView = document.getElementById(`view-${viewId}`);
  if (targetView) {
    targetView.classList.add('active');
  }

  // Automatically trigger sound if checked and inside a carousel
  if (viewId === 'english-alphabet') {
    updateEngAlphaCard();
  } else if (viewId === 'english-words') {
    updateEngWordCard();
  } else if (viewId === 'gujarati-alphabet') {
    updateGujAlphaCard();
  }
}

// TEXT TO SPEECH UTILITY
function speak(text, lang) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel(); // Stop current speaking

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.82; // kids-friendly, slightly slower speed
  
  const voices = window.speechSynthesis.getVoices();

  if (lang === 'gu') {
    // Find Gujarati or Indian Voice
    let voice = voices.find(v => v.lang.toLowerCase() === 'gu-in' || v.lang.toLowerCase().includes('gujarati'));
    if (!voice) {
      voice = voices.find(v => v.lang.toLowerCase() === 'hi-in' || v.lang.toLowerCase().includes('hindi'));
    }
    if (!voice) {
      voice = voices.find(v => v.lang.toLowerCase() === 'en-in');
    }
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    } else {
      utterance.lang = 'gu-IN';
    }
  } else {
    // English Voice
    let voice = voices.find(v => v.lang.toLowerCase() === 'en-us');
    if (!voice) voice = voices.find(v => v.lang.toLowerCase() === 'en-gb');
    if (!voice) voice = voices.find(v => v.lang.toLowerCase().startsWith('en'));
    
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    } else {
      utterance.lang = 'en-US';
    }
  }

  window.speechSynthesis.speak(utterance);
}

// ENGLISH ALPHABET SLIDER
function startEnglishAlphabet() {
  currentEngAlphaIdx = 0;
  navigateTo('english-alphabet');
}

function changeEngAlpha(dir) {
  currentEngAlphaIdx += dir;
  if (currentEngAlphaIdx < 0) currentEngAlphaIdx = ENGLISH_ALPHABET.length - 1;
  if (currentEngAlphaIdx >= ENGLISH_ALPHABET.length) currentEngAlphaIdx = 0;
  
  // Animation class
  const card = document.getElementById('eng-alpha-card');
  const animClass = dir > 0 ? 'animate-next' : 'animate-prev';
  card.classList.remove('animate-next', 'animate-prev');
  void card.offsetWidth; // trigger reflow
  card.className = `flash-card ${animClass}`;
  
  updateEngAlphaCard();
}

function updateEngAlphaCard() {
  const letter = ENGLISH_ALPHABET[currentEngAlphaIdx];
  const card = document.getElementById('eng-alpha-card');
  const charEl = document.getElementById('eng-alpha-char');
  const indexEl = document.getElementById('eng-alpha-index');
  
  charEl.innerText = letter;
  indexEl.innerText = `Card ${currentEngAlphaIdx + 1} of 26`;
  
  // Update color based on alphabet index
  const colorIndex = currentEngAlphaIdx % 12;
  card.style.borderColor = `var(--border-color)`;
  charEl.className = `large-letter color-${colorIndex}`;
  card.className = card.className.replace(/color-bg-\d+/g, '') + ` color-bg-${colorIndex}`;

  // Speak automatically if enabled
  if (document.getElementById('chk-auto-speak-alpha').checked) {
    setTimeout(() => speakEngAlpha(), 150);
  }
}

function speakEngAlpha() {
  const letter = ENGLISH_ALPHABET[currentEngAlphaIdx];
  speak(letter, 'en');
}

// ENGLISH WORDS SLIDER
function startEnglishWords() {
  currentEngWordIdx = 0;
  navigateTo('english-words');
}

function changeEngWord(dir) {
  currentEngWordIdx += dir;
  if (currentEngWordIdx < 0) currentEngWordIdx = ENGLISH_WORDS.length - 1;
  if (currentEngWordIdx >= ENGLISH_WORDS.length) currentEngWordIdx = 0;

  const card = document.getElementById('eng-word-card');
  const animClass = dir > 0 ? 'animate-next' : 'animate-prev';
  card.classList.remove('animate-next', 'animate-prev');
  void card.offsetWidth; // trigger reflow
  card.className = `flash-card ${animClass}`;

  updateEngWordCard();
}

function updateEngWordCard() {
  const item = ENGLISH_WORDS[currentEngWordIdx];
  const card = document.getElementById('eng-word-card');
  const letterEl = document.getElementById('eng-word-letter');
  const emojiEl = document.getElementById('eng-word-emoji');
  const textEl = document.getElementById('eng-word-text');
  const indexEl = document.getElementById('eng-word-index');

  letterEl.innerText = item.letter;
  emojiEl.innerText = item.emoji;
  textEl.innerText = item.word;
  indexEl.innerText = `Card ${currentEngWordIdx + 1} of 26`;

  const colorIndex = currentEngWordIdx % 12;
  letterEl.className = `large-letter color-${colorIndex}`;
  textEl.className = `word-text color-${colorIndex}`;
  card.className = card.className.replace(/color-bg-\d+/g, '') + ` color-bg-${colorIndex}`;

  if (document.getElementById('chk-auto-speak-word').checked) {
    setTimeout(() => speakEngWord(), 150);
  }
}

function speakEngWord() {
  const item = ENGLISH_WORDS[currentEngWordIdx];
  speak(`${item.letter} for ${item.word}`, 'en');
}

// GUJARATI ALPHABET SLIDER
function startGujaratiAlphabet() {
  currentGujAlphaIdx = 0;
  navigateTo('gujarati-alphabet');
}

function changeGujAlpha(dir) {
  currentGujAlphaIdx += dir;
  if (currentGujAlphaIdx < 0) currentGujAlphaIdx = GUJARATI_ALPHABET.length - 1;
  if (currentGujAlphaIdx >= GUJARATI_ALPHABET.length) currentGujAlphaIdx = 0;

  const card = document.getElementById('guj-alpha-card');
  const animClass = dir > 0 ? 'animate-next' : 'animate-prev';
  card.classList.remove('animate-next', 'animate-prev');
  void card.offsetWidth; // trigger reflow
  card.className = `flash-card ${animClass}`;

  updateGujAlphaCard();
}

function updateGujAlphaCard() {
  const item = GUJARATI_ALPHABET[currentGujAlphaIdx];
  const card = document.getElementById('guj-alpha-card');
  const charEl = document.getElementById('guj-alpha-char');
  const phoneticEl = document.getElementById('guj-alpha-phonetic');
  const emojiEl = document.getElementById('guj-alpha-emoji');
  const wordEl = document.getElementById('guj-alpha-word');
  const englishEl = document.getElementById('guj-alpha-english');
  const indexEl = document.getElementById('guj-alpha-index');

  charEl.innerText = item.letter;
  phoneticEl.innerText = `Pronunciation: ${item.phonetic}`;
  emojiEl.innerText = item.emoji;
  wordEl.innerText = item.word;
  englishEl.innerText = `(${item.english})`;
  indexEl.innerText = `Card ${currentGujAlphaIdx + 1} of ${GUJARATI_ALPHABET.length}`;

  const colorIndex = currentGujAlphaIdx % 12;
  charEl.className = `large-letter gujarati-letter color-${colorIndex}`;
  wordEl.className = `color-${colorIndex}`;
  card.className = card.className.replace(/color-bg-\d+/g, '') + ` color-bg-${colorIndex}`;

  if (document.getElementById('chk-auto-speak-guj').checked) {
    setTimeout(() => speakGujAlpha(), 150);
  }
}

function speakGujAlpha() {
  const item = GUJARATI_ALPHABET[currentGujAlphaIdx];
  speak(`${item.letter}, ${item.word}`, 'gu');
}

// POPULATE FUTURE ROOM
function populateFutureRoom() {
  const container = document.getElementById('future-grid-container');
  if (!container) return;
  
  container.innerHTML = '';
  FUTURE_SECTIONS.forEach(item => {
    const div = document.createElement('div');
    div.className = 'future-card';
    div.innerHTML = `
      <span class="future-emoji">${item.emoji}</span>
      <div class="future-info">
        <h4 class="future-title">${item.title}</h4>
        <span class="future-badge">${item.category}</span>
      </div>
    `;
    container.appendChild(div);
  });
}

// ON LOAD
window.addEventListener('DOMContentLoaded', () => {
  createBubbles();
  populateFutureRoom();
});
