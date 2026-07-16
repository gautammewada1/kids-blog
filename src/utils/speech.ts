/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

function findBestVoice(lang: 'en' | 'gu'): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  if (lang === 'gu') {
    // 1. Look for a native Gujarati voice
    let guVoice = voices.find(v => {
      const l = v.lang.toLowerCase().replace('_', '-');
      return l === 'gu-in' || l.startsWith('gu-') || v.name.toLowerCase().includes('gujarati');
    });
    
    // 2. Hindi voice (great fallback phonetic matching for Gujarati characters)
    if (!guVoice) {
      guVoice = voices.find(v => {
        const l = v.lang.toLowerCase().replace('_', '-');
        return l === 'hi-in' || l.startsWith('hi-') || v.name.toLowerCase().includes('hindi');
      });
    }
    
    // 3. English India voice
    if (!guVoice) {
      guVoice = voices.find(v => {
        const l = v.lang.toLowerCase().replace('_', '-');
        return l === 'en-in' || l.startsWith('en-in');
      });
    }

    // 4. Any Indian voice
    if (!guVoice) {
      guVoice = voices.find(v => {
        const l = v.lang.toLowerCase().replace('_', '-');
        return l.endsWith('-in') || v.name.toLowerCase().includes('india') || v.name.toLowerCase().includes('indian');
      });
    }

    return guVoice || null;
  } else {
    // English
    let enVoice = voices.find(v => {
      const l = v.lang.toLowerCase().replace('_', '-');
      return l === 'en-us' || l === 'en-gb';
    });
    if (!enVoice) {
      enVoice = voices.find(v => v.lang.toLowerCase().startsWith('en'));
    }
    return enVoice || null;
  }
}

export function speakText(
  text: string, 
  lang: 'en' | 'gu', 
  rate: number = 0.85, 
  englishPhoneticFallback?: string
) {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    console.warn('Speech synthesis not supported in this browser.');
    return;
  }

  // Cancel any ongoing speech to prevent overlapping
  window.speechSynthesis.cancel();

  // Get available voices
  const bestVoice = findBestVoice(lang);

  let textToSpeak = text;
  
  if (lang === 'gu') {
    const isGujaratiOrHindi = bestVoice && (
      bestVoice.lang.toLowerCase().startsWith('gu') || 
      bestVoice.lang.toLowerCase().startsWith('hi') ||
      bestVoice.name.toLowerCase().includes('gujarati') ||
      bestVoice.name.toLowerCase().includes('hindi')
    );

    // If no Gujarati/Hindi voice exists and fallback is provided, use phonetic spelling
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
    // Fallback language code if no voice found but browser might support it natively
    utterance.lang = 'gu-IN';
  } else {
    utterance.lang = 'en-US';
  }

  window.speechSynthesis.speak(utterance);
}

// Warm up voices (some browsers require calling getVoices at least once)
if (typeof window !== 'undefined' && window.speechSynthesis) {
  window.speechSynthesis.getVoices();
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.getVoices();
    };
  }
}

