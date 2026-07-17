/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ENGLISH_NUMBERS, GUJARATI_ALPHABET, GUJARATI_NUMBERS } from '../data';
import { AUDIO_FILES } from '../audio-manifest';

// Build a fast lookup table at startup
const availableAudioSet = new Set<string>(
  AUDIO_FILES.map(path => path.replace(/\\/g, '/').toLowerCase())
);

// Keep track of the last requested speech to prevent queue build-up and handle autoplay unlocking
let lastRequestedSpeech: {
  text: string;
  lang: 'en' | 'gu';
  rate: number;
  englishPhoneticFallback?: string;
} | null = null;

let isSpeechSynthesisUnlocked = false;
let voicesLoaded = false;
let voicesList: SpeechSynthesisVoice[] = [];

// Keep track of the currently playing Audio instance to stop it before playing a new one.
let currentAudio: HTMLAudioElement | null = null;

/**
 * Diagnostic logger to verify available files across categories.
 * Prints loaded stats and lists any missing canonical files.
 */
function initializeAudioUploadManager() {
  const missingFiles: string[] = [];

  // 1. English Alphabet (26 items: A-Z)
  let englishAlphabetCount = 0;
  for (let i = 0; i < 26; i++) {
    const letter = String.fromCharCode(65 + i);
    const canonical = `public/audio/english/alphabet/${letter}.mp3`;
    const canonicalLower = `public/audio/english/alphabet/${letter.toLowerCase()}.mp3`;

    if (availableAudioSet.has(canonical.toLowerCase()) || availableAudioSet.has(canonicalLower.toLowerCase())) {
      englishAlphabetCount++;
    } else {
      missingFiles.push(canonical);
    }
  }

  // 2. English Words (26 items)
  let englishWordsCount = 0;
  const wordItems = [
    'Apple', 'Ball', 'Cat', 'Dog', 'Elephant', 'Fish', 'Grapes', 'Horse', 'Ice Cream', 'Jellyfish', 'Kite', 'Lion',
    'Monkey', 'Nest', 'Orange', 'Parrot', 'Queen', 'Rabbit', 'Sun', 'Tiger', 'Umbrella', 'Violin', 'Watermelon',
    'Xylophone', 'Yak', 'Zebra'
  ];
  wordItems.forEach((word, index) => {
    const letter = String.fromCharCode(65 + index);
    const wordClean = word.replace(/\s+/g, '_');
    const canonical = `public/audio/english/words/${wordClean}.mp3`;

    // Check possible variations
    const check1 = `public/audio/english/words/${wordClean}.mp3`;
    const check2 = `public/audio/english/words/${wordClean.toLowerCase()}.mp3`;
    const check3 = `public/audio/english/words/${letter.toLowerCase()}_for_${wordClean.toLowerCase()}.mp3`;
    const check4 = `public/audio/english/words/${letter.toUpperCase()}_for_${wordClean}.mp3`;

    if (
      availableAudioSet.has(check1.toLowerCase()) ||
      availableAudioSet.has(check2.toLowerCase()) ||
      availableAudioSet.has(check3.toLowerCase()) ||
      availableAudioSet.has(check4.toLowerCase())
    ) {
      englishWordsCount++;
    } else {
      missingFiles.push(canonical);
    }
  });

  // 3. English Numbers (101 items: 0 to 100)
  let englishNumbersCount = 0;
  for (let i = 0; i <= 100; i++) {
    const canonical = `public/audio/english/numbers/${i}.mp3`;
    if (availableAudioSet.has(canonical.toLowerCase())) {
      englishNumbersCount++;
    } else {
      missingFiles.push(canonical);
    }
  }

  // 4. Gujarati Alphabet (48 items: 12 vowels + 36 consonants)
  let gujaratiAlphabetCount = 0;
  GUJARATI_ALPHABET.forEach(item => {
    const canonical = `public/audio/gujarati/alphabet/${item.englishPhonetic}.mp3`;

    const check1 = `public/audio/gujarati/alphabet/${item.englishPhonetic}.mp3`;
    const check2 = `public/audio/gujarati/alphabet/${item.englishPhonetic.toLowerCase()}.mp3`;
    const check3 = `public/audio/gujarati/alphabet/${item.letter}.mp3`;
    const check4 = `public/audio/gujarati/alphabet/${item.wordEnglish.toLowerCase().replace(/\s+/g, '_')}.mp3`;

    if (
      availableAudioSet.has(check1.toLowerCase()) ||
      availableAudioSet.has(check2.toLowerCase()) ||
      availableAudioSet.has(check3.toLowerCase()) ||
      availableAudioSet.has(check4.toLowerCase())
    ) {
      gujaratiAlphabetCount++;
    } else {
      missingFiles.push(canonical);
    }
  });

  // 5. Gujarati Numbers (101 items: 0 to 100)
  let gujaratiNumbersCount = 0;
  for (let i = 0; i <= 100; i++) {
    const canonical = `public/audio/gujarati/numbers/${i}.mp3`;
    if (availableAudioSet.has(canonical.toLowerCase())) {
      gujaratiNumbersCount++;
    } else {
      missingFiles.push(canonical);
    }
  }

  // 6. Gujarati Barakhadi (432 items: 36 consonants * 12 vowel sounds)
  let gujaratiBarakhadiCount = 0;
  const consonants = GUJARATI_ALPHABET.slice(12);
  const VOWEL_SIGNS = ['', 'ા', 'િ', 'ી', 'ુ', 'ૂ', 'ે', 'ૈ', 'ો', 'ૌ', 'ં', 'ઃ'];
  const PHONETIC_SUFFIXES = ['a', 'aa', 'i', 'ee', 'u', 'oo', 'e', 'ai', 'o', 'au', 'am', 'aha'];

  consonants.forEach(consonant => {
    VOWEL_SIGNS.forEach((sign, idx) => {
      const letter = consonant.letter + sign;
      let stem = consonant.englishPhonetic;
      if (stem.endsWith('a')) {
        stem = stem.slice(0, -1);
      }
      const phonetic = stem + PHONETIC_SUFFIXES[idx];
      const canonical = `public/audio/gujarati/barakhadi/${phonetic.toLowerCase()}.mp3`;

      const check1 = `public/audio/gujarati/barakhadi/${letter}.mp3`;
      const check2 = `public/audio/gujarati/barakhadi/${phonetic.toLowerCase()}.mp3`;

      if (availableAudioSet.has(check1.toLowerCase()) || availableAudioSet.has(check2.toLowerCase())) {
        gujaratiBarakhadiCount++;
      } else {
        missingFiles.push(canonical);
      }
    });
  });

  // Print results strictly according to browser console requirements
  console.log(
    `Loaded audio files:\n` +
    `- English Alphabet: ${englishAlphabetCount}/26\n` +
    `- English Words: ${englishWordsCount}/26\n` +
    `- English Numbers: ${englishNumbersCount}/101\n` +
    `- Gujarati Alphabet: ${gujaratiAlphabetCount}/48\n` +
    `- Gujarati Numbers: ${gujaratiNumbersCount}/101\n` +
    `- Gujarati Barakhadi: ${gujaratiBarakhadiCount}/432`
  );

  if (missingFiles.length > 0) {
    console.log('Missing:\n' + missingFiles.join('\n'));
  }
}

/**
 * Helper to resolve possible local MP3 paths for the given speech parameters.
 */
function getPossibleAudioPaths(
  text: string,
  lang: 'en' | 'gu',
  englishPhoneticFallback?: string
): string[] {
  const paths: string[] = [];
  const cleanText = text.trim();

  if (lang === 'en') {
    // 1. English Alphabet
    if (/^[A-Za-z]$/.test(cleanText)) {
      const letterLower = cleanText.toLowerCase();
      paths.push(`/audio/english/alphabet/${letterLower}.mp3`);
      paths.push(`/audio/english/alphabet/${cleanText.toUpperCase()}.mp3`);
    }

    // 2. English Words (e.g. "A for Apple" or "Apple")
    const forMatch = cleanText.match(/^([A-Za-z])\s+for\s+(.+)$/i);
    if (forMatch) {
      const letter = forMatch[1];
      const word = forMatch[2];
      const wordClean = word.replace(/\s+/g, '_').toLowerCase();
      const wordExact = word.replace(/\s+/g, '_');
      
      paths.push(`/audio/english/words/${wordClean}.mp3`);
      paths.push(`/audio/english/words/${letter.toLowerCase()}_for_${wordClean}.mp3`);
      paths.push(`/audio/english/words/${letter.toUpperCase()}_for_${wordExact}.mp3`);
    } else {
      const wordClean = cleanText.replace(/\s+/g, '_').toLowerCase();
      paths.push(`/audio/english/words/${wordClean}.mp3`);
      paths.push(`/audio/english/words/${cleanText.replace(/\s+/g, '_')}.mp3`);
    }

    // 3. English Numbers
    const numItem = ENGLISH_NUMBERS.find(
      item => item.word.toUpperCase() === cleanText.toUpperCase()
    );
    if (numItem) {
      paths.push(`/audio/english/numbers/${numItem.number}.mp3`);
      paths.push(`/audio/english/numbers/${numItem.word.toLowerCase().replace(/[^a-z0-9_]+/g, '_')}.mp3`);
    } else if (/^\d+$/.test(cleanText)) {
      paths.push(`/audio/english/numbers/${cleanText}.mp3`);
    }
  } else if (lang === 'gu') {
    // 4. Gujarati Alphabet (or Letters)
    const cleanPhonetic = englishPhoneticFallback?.trim() || '';
    const guItem = GUJARATI_ALPHABET.find(item => {
      return (
        item.letter === cleanText ||
        cleanText.startsWith(item.letter) ||
        (cleanPhonetic && item.englishPhonetic.toLowerCase() === cleanPhonetic.toLowerCase()) ||
        (cleanPhonetic && cleanPhonetic.toLowerCase().startsWith(item.englishPhonetic.toLowerCase()))
      );
    });

    if (guItem) {
      const phoneticClean = guItem.englishPhonetic.toLowerCase();
      const wordClean = guItem.wordEnglish.toLowerCase().replace(/\s+/g, '_');
      
      paths.push(`/audio/gujarati/alphabet/${phoneticClean}.mp3`);
      paths.push(`/audio/gujarati/alphabet/${guItem.letter}.mp3`);
      paths.push(`/audio/gujarati/alphabet/${guItem.word}.mp3`);
      paths.push(`/audio/gujarati/alphabet/${wordClean}.mp3`);
      paths.push(`/audio/gujarati/alphabet/${phoneticClean}_for_${wordClean}.mp3`);
    }

    // 5. Gujarati Numbers
    const guNumItem = GUJARATI_NUMBERS.find(item => {
      return (
        item.word === cleanText ||
        (cleanPhonetic && item.englishPhonetic.toLowerCase() === cleanPhonetic.toLowerCase())
      );
    });

    if (guNumItem) {
      paths.push(`/audio/gujarati/numbers/${guNumItem.number}.mp3`);
      paths.push(`/audio/gujarati/numbers/${guNumItem.word}.mp3`);
      paths.push(`/audio/gujarati/numbers/${guNumItem.englishPhonetic.toLowerCase()}.mp3`);
    } else if (/^\d+$/.test(cleanText)) {
      paths.push(`/audio/gujarati/numbers/${cleanText}.mp3`);
    }

    // 6. Gujarati Barakhadi
    paths.push(`/audio/gujarati/barakhadi/${cleanText}.mp3`);
    if (cleanPhonetic) {
      paths.push(`/audio/gujarati/barakhadi/${cleanPhonetic.toLowerCase()}.mp3`);
    }
  }

  return Array.from(new Set(paths));
}

/**
 * Robust asynchronous loader for speech synthesis voices.
 * Especially handles Android Chrome and lazy-loaded TTS engines by polling and listening to onvoiceschanged.
 */
function ensureVoices(): Promise<SpeechSynthesisVoice[]> {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    return Promise.resolve([]);
  }

  // If already loaded, return immediately
  const current = window.speechSynthesis.getVoices();
  if (current && current.length > 0) {
    voicesList = current;
    voicesLoaded = true;
    return Promise.resolve(current);
  }

  return new Promise((resolve) => {
    let resolved = false;

    const done = () => {
      if (resolved) return;
      resolved = true;
      const list = window.speechSynthesis.getVoices() || [];
      if (list.length > 0) {
        voicesList = list;
        voicesLoaded = true;
      }
      resolve(list);
    };

    // Register onvoiceschanged listener
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      const originalOnVoicesChanged = window.speechSynthesis.onvoiceschanged;
      window.speechSynthesis.onvoiceschanged = (ev) => {
        if (originalOnVoicesChanged) {
          try { (originalOnVoicesChanged as any)(ev); } catch (e) {}
        }
        done();
      };
    }

    // Force voice list loading on Android Chrome by polling getVoices()
    const interval = setInterval(() => {
      const list = window.speechSynthesis.getVoices();
      if (list && list.length > 0) {
        clearInterval(interval);
        done();
      }
    }, 50);

    // Hard fallback timeout (e.g. 1.5 seconds) in case no voices are found
    setTimeout(() => {
      clearInterval(interval);
      done();
    }, 1500);
  });
}

/**
 * Finds the absolute best matching voice based on the requested language and priority rules.
 * Prefers Indian voices (en-IN and gu-IN) first, falling back gracefully to other accents or Hindi.
 */
function findBestVoice(lang: 'en' | 'gu', voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  if (!voices || voices.length === 0) return null;

  const normalizedVoices = voices.map(v => ({
    voice: v,
    langLower: v.lang.toLowerCase().replace('_', '-'),
    nameLower: v.name.toLowerCase()
  }));

  if (lang === 'gu') {
    // 1. Gujarati (India) - Exact match (gu-in)
    let match = normalizedVoices.find(v => v.langLower === 'gu-in');
    if (match) return match.voice;

    // 2. Gujarati (any variant) or containing "gujarati" in name
    match = normalizedVoices.find(v => v.langLower.startsWith('gu-') || v.nameLower.includes('gujarati'));
    if (match) return match.voice;

    // 3. Hindi (India) - Exact match (hi-in) - excellent phonetics fallback for Gujarati
    match = normalizedVoices.find(v => v.langLower === 'hi-in');
    if (match) return match.voice;

    // 4. Hindi (any variant) or containing "hindi" in name
    match = normalizedVoices.find(v => v.langLower.startsWith('hi-') || v.nameLower.includes('hindi'));
    if (match) return match.voice;

    // 5. English (India) - Exact match (en-in)
    match = normalizedVoices.find(v => v.langLower === 'en-in');
    if (match) return match.voice;

    // 6. Any voice with Indian region indicator or name
    match = normalizedVoices.find(v => v.langLower.endsWith('-in') || v.nameLower.includes('india') || v.nameLower.includes('indian'));
    if (match) return match.voice;

    // 7. Any English voice as fallback
    match = normalizedVoices.find(v => v.langLower.startsWith('en'));
    if (match) return match.voice;

    return voices[0];
  } else {
    // English
    // 1. English (India) - Exact match (en-in)
    let match = normalizedVoices.find(v => v.langLower === 'en-in');
    if (match) return match.voice;

    // 2. English (India) name-based
    match = normalizedVoices.find(v => v.langLower.startsWith('en') && (v.nameLower.includes('india') || v.nameLower.includes('indian')));
    if (match) return match.voice;

    // 3. English (US/GB)
    match = normalizedVoices.find(v => v.langLower === 'en-us' || v.langLower === 'en-gb');
    if (match) return match.voice;

    // 4. Any English voice
    match = normalizedVoices.find(v => v.langLower.startsWith('en'));
    if (match) return match.voice;

    return voices[0];
  }
}

/**
 * Speaks the requested text using either a matching local MP3 audio file,
 * or native browser SpeechSynthesis as a fallback.
 * Ensures no overlap, stops prior playbacks, and supports offline-safe asset serving.
 */
export async function speakText(
  text: string, 
  lang: 'en' | 'gu', 
  rate: number = 0.85, 
  englishPhoneticFallback?: string
) {
  if (typeof window === 'undefined') {
    return;
  }

  // Always stop any playing local MP3 audio
  if (currentAudio) {
    try {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    } catch (e) {
      console.warn('Failed to pause current audio player:', e);
    }
    currentAudio = null;
  }

  // Always cancel any native speech queue to prevent overlap
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }

  // Update last requested speech context
  lastRequestedSpeech = { text, lang, rate, englishPhoneticFallback };

  // Resolve potential local MP3 audio paths
  const possiblePaths = getPossibleAudioPaths(text, lang, englishPhoneticFallback);

  // Check which MP3 file exists first (sequentially, respecting lookup table)
  let matchedPath: string | null = null;
  for (const path of possiblePaths) {
    let cleanPath = path.replace(/\\/g, '/');
    if (cleanPath.startsWith('/')) {
      cleanPath = 'public' + cleanPath;
    }
    if (availableAudioSet.has(cleanPath.toLowerCase())) {
      matchedPath = cleanPath.startsWith('public/') ? cleanPath.substring(6) : cleanPath;
      break;
    }
  }

  // If a local MP3 exists, play it!
  if (matchedPath) {
    let baseUrl = (import.meta as any).env?.BASE_URL || '/';
    if (baseUrl === './') {
      baseUrl = '/';
    }
    const combinedPath = (baseUrl + '/' + matchedPath).replace(/\/+/g, '/');
    const resolvedUrl = new URL(combinedPath, window.location.origin).href;

    console.log(`[Audio System] Playback requested for local MP3. Resolved URL: ${resolvedUrl}`);

    try {
      // Perform a non-blocking HEAD request to verify file accessibility and capture status codes
      fetch(resolvedUrl, { method: 'HEAD' })
        .then(res => {
          console.log(`[Audio System] HTTP status for ${resolvedUrl}: ${res.status} ${res.statusText}`);
          if (!res.ok) {
            console.error(`[Audio System] Failed to load audio file over HTTP (Status ${res.status}). File might be missing or inaccessible.`);
          }
        })
        .catch(err => {
          console.error(`[Audio System] Network check failed for ${resolvedUrl}:`, err);
        });

      const audio = new Audio(resolvedUrl);
      currentAudio = audio;

      audio.addEventListener('error', (e) => {
        const mediaError = audio.error;
        console.error(`[Audio System] HTML5 Audio Element error for URL ${resolvedUrl}:`, {
          code: mediaError?.code,
          message: mediaError?.message,
          event: e
        });
      });

      await audio.play();
      console.log(`[Audio System] Playback started successfully for ${resolvedUrl}`);
      return; // Played successfully!
    } catch (err) {
      console.warn(`Local MP3 found at ${resolvedUrl} but playback was blocked/failed:`, err);
      if (lastRequestedSpeech?.text !== text) {
        return;
      }
    }
  }

  // Only if MP3 does not exist (or failed to play), use standard SpeechSynthesis fallback
  if (!window.speechSynthesis) {
    console.warn('Speech synthesis not supported in this browser.');
    return;
  }

  // Wait for voices to load
  const availableVoices = await ensureVoices();

  // If a new speech has been requested while waiting for voices to load, abort this stale call
  if (lastRequestedSpeech?.text !== text) {
    return;
  }

  const bestVoice = findBestVoice(lang, availableVoices);
  let textToSpeak = text;

  if (lang === 'gu') {
    const isGujaratiOrHindi = bestVoice && (
      bestVoice.lang.toLowerCase().startsWith('gu') || 
      bestVoice.lang.toLowerCase().startsWith('hi') ||
      bestVoice.name.toLowerCase().includes('gujarati') ||
      bestVoice.name.toLowerCase().includes('hindi')
    );

    // If fallback to non-Gujarati/Hindi voices, use phonetic English spelling
    if (!isGujaratiOrHindi && englishPhoneticFallback) {
      textToSpeak = englishPhoneticFallback;
    }
  }

  const utterance = new SpeechSynthesisUtterance(textToSpeak);
  utterance.rate = rate;

  if (bestVoice) {
    utterance.voice = bestVoice;
    utterance.lang = bestVoice.lang;
  } else if (lang === 'gu') {
    utterance.lang = 'gu-IN';
  } else {
    utterance.lang = 'en-IN';
  }

  // Speak!
  window.speechSynthesis.speak(utterance);
}

/**
 * Unlocks the SpeechSynthesis engine on first user interaction.
 * Addresses autoplay constraints in cross-origin iframes (e.g. Blogger, Blogspot, mobile Chrome).
 */
export function unlockSpeechSynthesis() {
  if (isSpeechSynthesisUnlocked) return;
  if (typeof window === 'undefined' || !window.speechSynthesis) return;

  isSpeechSynthesisUnlocked = true;

  try {
    // Speak a short silent space to satisfy the browser's user activation requirement
    const silentUtterance = new SpeechSynthesisUtterance(' ');
    silentUtterance.volume = 0;
    window.speechSynthesis.speak(silentUtterance);
    console.log('Speech synthesis unlocked on user gesture.');

    // Cleanup event listeners
    document.removeEventListener('click', unlockSpeechSynthesis, { capture: true });
    document.removeEventListener('touchstart', unlockSpeechSynthesis, { capture: true });
    document.removeEventListener('keydown', unlockSpeechSynthesis, { capture: true });

    // If there is any pending auto-pronunciation that was blocked, play it now
    if (lastRequestedSpeech) {
      const { text, lang, rate, englishPhoneticFallback } = lastRequestedSpeech;
      speakText(text, lang, rate, englishPhoneticFallback);
    }
  } catch (e) {
    console.error('Failed to unlock SpeechSynthesis:', e);
  }
}

// Warm up voices and register listeners on module load
if (typeof window !== 'undefined' && window.speechSynthesis) {
  // Warm up voices
  window.speechSynthesis.getVoices();
  ensureVoices();

  // Run the diagnostics & load metrics at startup
  initializeAudioUploadManager();

  // Listen to any interaction anywhere to unlock speech
  document.addEventListener('click', unlockSpeechSynthesis, { capture: true, passive: true });
  document.addEventListener('touchstart', unlockSpeechSynthesis, { capture: true, passive: true });
  document.addEventListener('keydown', unlockSpeechSynthesis, { capture: true, passive: true });
}
