/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

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
 * Speaks the requested text using the native browser SpeechSynthesis API.
 * Ensures no speech overlap, waits for voice loading, handles fallbacks, and stores pending calls for autoplay unlocking.
 */
export async function speakText(
  text: string, 
  lang: 'en' | 'gu', 
  rate: number = 0.85, 
  englishPhoneticFallback?: string
) {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    console.warn('Speech synthesis not supported in this browser.');
    return;
  }

  // Update last requested speech context
  lastRequestedSpeech = { text, lang, rate, englishPhoneticFallback };

  // Always cancel any current or queued speaking to prevent overlaps immediately
  window.speechSynthesis.cancel();

  // Wait for voices to be loaded
  const availableVoices = await ensureVoices();

  // If a new speech has been requested while waiting for voices to load, abort this stale call
  if (lastRequestedSpeech.text !== text) {
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

    // If we've fallback to non-Gujarati/Hindi voices, use the phonetic English spelling for better sounding speech
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

  // Listen to any interaction anywhere to unlock speech
  document.addEventListener('click', unlockSpeechSynthesis, { capture: true, passive: true });
  document.addEventListener('touchstart', unlockSpeechSynthesis, { capture: true, passive: true });
  document.addEventListener('keydown', unlockSpeechSynthesis, { capture: true, passive: true });
}
