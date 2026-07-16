/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Volume2, ChevronLeft, ChevronRight } from 'lucide-react';
import { GUJARATI_ALPHABET, KID_COLORS } from '../data';
import { speakText } from '../utils/speech';

interface GujaratiAlphabetViewProps {
  onBack: () => void;
  autoSpeak: boolean;
}

// Slice the central GUJARATI_ALPHABET array into Vowels and Consonants
const vowels = GUJARATI_ALPHABET.slice(0, 12);
const consonants = GUJARATI_ALPHABET.slice(12);

export default function GujaratiAlphabetView({ onBack, autoSpeak }: GujaratiAlphabetViewProps) {
  const [activeTab, setActiveTab] = useState<'vowels' | 'consonants'>('vowels');
  const [vowelIndex, setVowelIndex] = useState(0);
  const [consonantIndex, setConsonantIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const currentItem = activeTab === 'vowels' ? vowels[vowelIndex] : consonants[consonantIndex];
  const currentIndex = activeTab === 'vowels' ? vowelIndex : consonantIndex;
  const currentArray = activeTab === 'vowels' ? vowels : consonants;
  const colorTheme = KID_COLORS[currentIndex % KID_COLORS.length];

  const handleSpeak = () => {
    const item = activeTab === 'vowels' ? vowels[vowelIndex] : consonants[consonantIndex];
    const speechString = item.word 
      ? `${item.letter}, ${item.word}` 
      : `${item.letter}`;
    
    // Provide english phonetic fallback if system has no Indic/Gujarati TTS voice
    const phoneticFallback = item.wordEnglish
      ? `${item.englishPhonetic} for ${item.wordEnglish}`
      : `${item.englishPhonetic}`;

    speakText(speechString, 'gu', 0.82, phoneticFallback);
  };

  const changeCard = (dir: number) => {
    setDirection(dir);
    if (activeTab === 'vowels') {
      let nextIndex = vowelIndex + dir;
      if (nextIndex < 0) nextIndex = vowels.length - 1;
      if (nextIndex >= vowels.length) nextIndex = 0;
      setVowelIndex(nextIndex);

      if (autoSpeak) {
        const nextItem = vowels[nextIndex];
        const speechString = nextItem.word 
          ? `${nextItem.letter}, ${nextItem.word}` 
          : `${nextItem.letter}`;
        const phoneticFallback = nextItem.wordEnglish
          ? `${nextItem.englishPhonetic} for ${nextItem.wordEnglish}`
          : `${nextItem.englishPhonetic}`;
        speakText(speechString, 'gu', 0.82, phoneticFallback);
      }
    } else {
      let nextIndex = consonantIndex + dir;
      if (nextIndex < 0) nextIndex = consonants.length - 1;
      if (nextIndex >= consonants.length) nextIndex = 0;
      setConsonantIndex(nextIndex);

      if (autoSpeak) {
        const nextItem = consonants[nextIndex];
        const speechString = nextItem.word 
          ? `${nextItem.letter}, ${nextItem.word}` 
          : `${nextItem.letter}`;
        const phoneticFallback = nextItem.wordEnglish
          ? `${nextItem.englishPhonetic} for ${nextItem.wordEnglish}`
          : `${nextItem.englishPhonetic}`;
        speakText(speechString, 'gu', 0.82, phoneticFallback);
      }
    }
  };

  const handleTabChange = (tab: 'vowels' | 'consonants') => {
    setActiveTab(tab);
    setDirection(0); // reset direction for tab transitions
    if (autoSpeak) {
      const nextItem = tab === 'vowels' ? vowels[vowelIndex] : consonants[consonantIndex];
      const speechString = nextItem.word 
        ? `${nextItem.letter}, ${nextItem.word}` 
        : `${nextItem.letter}`;
      const phoneticFallback = nextItem.wordEnglish
        ? `${nextItem.englishPhonetic} for ${nextItem.wordEnglish}`
        : `${nextItem.englishPhonetic}`;
      speakText(speechString, 'gu', 0.82, phoneticFallback);
    }
  };

  // Speak first card on initial view load
  useEffect(() => {
    if (autoSpeak) {
      const timer = setTimeout(() => {
        handleSpeak();
      }, 350);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') changeCard(1);
      if (e.key === 'ArrowLeft') changeCard(-1);
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        handleSpeak();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [vowelIndex, consonantIndex, activeTab]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full flex flex-col items-center py-4"
    >
      {/* Back button */}
      <button 
        onClick={onBack}
        className="self-start flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold mb-6 hover:underline transition-all group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span>Back to Gujarati Room</span>
      </button>

      {/* Subtitle */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white mb-1 font-gujarati">
          ગુજરાતી કક્કો (Gujarati Alphabet)
        </h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">
          શીખો સ્વર અને વ્યંજન સુંદર ચિત્રો અને સાચા ઓડિયો સાથે!
        </p>
      </div>

      {/* Tab Selector Buttons */}
      <div className="flex bg-blue-50/50 dark:bg-slate-900/50 p-1.5 rounded-[24px] border-3 border-blue-100/60 dark:border-slate-800 w-full max-w-sm mb-6 gap-2">
        <button
          onClick={() => handleTabChange('vowels')}
          className={`flex-1 py-3 px-4 rounded-[18px] font-extrabold text-sm transition-all duration-300 relative ${
            activeTab === 'vowels'
              ? 'bg-blue-500 text-white shadow-md'
              : 'text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-white/50 dark:hover:bg-slate-800/40'
          }`}
        >
          Vowels (સ્વર)
        </button>
        <button
          onClick={() => handleTabChange('consonants')}
          className={`flex-1 py-3 px-4 rounded-[18px] font-extrabold text-sm transition-all duration-300 relative ${
            activeTab === 'consonants'
              ? 'bg-blue-500 text-white shadow-md'
              : 'text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-white/50 dark:hover:bg-slate-800/40'
          }`}
        >
          Consonants (વ્યંજન)
        </button>
      </div>

      {/* Carousel */}
      <div className="w-full max-w-md flex flex-col items-center gap-6">
        {/* Animated Card */}
        <div className="w-full relative h-[440px] flex items-center justify-center overflow-hidden">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={`${activeTab}-${currentIndex}`}
              initial={{ 
                opacity: 0, 
                x: direction > 0 ? 150 : -150,
                rotate: direction > 0 ? 5 : -5 
              }}
              animate={{ 
                opacity: 1, 
                x: 0,
                rotate: 0 
              }}
              exit={{ 
                opacity: 0, 
                x: direction > 0 ? -150 : 150,
                rotate: direction > 0 ? -5 : 5 
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={handleSpeak}
              className={`w-full h-full rounded-[48px] border-8 ${colorTheme.bg} ${colorTheme.border} ${colorTheme.text} shadow-[0_24px_50px_-12px_rgba(0,0,0,0.06)] dark:shadow-none flex flex-col items-center justify-center cursor-pointer select-none relative group transition-colors duration-300 px-6 py-8`}
            >
              {/* Card Badge: Vowel or Consonant */}
              <div className="absolute top-6 left-6 bg-white/75 dark:bg-slate-800/75 px-3 py-1 rounded-full text-xs font-bold border border-white/80 dark:border-slate-700">
                {activeTab === 'vowels' ? 'સ્વર (Vowel)' : 'વ્યંજન (Consonant)'}
              </div>

              {/* Card index */}
              <div className="absolute top-6 right-6 font-bold text-xs opacity-75">
                કાર્ડ {currentIndex + 1} / {currentArray.length}
              </div>

              {/* Big letter in Gujarati Script with rounded font */}
              <div className="text-[120px] font-black font-gujarati leading-none mb-1 filter drop-shadow-sm group-hover:scale-110 transition-transform duration-300">
                {currentItem.letter}
              </div>

              {/* Phonetic Pronunciation helper */}
              <div className="bg-white/80 dark:bg-slate-800/80 border border-white dark:border-slate-700 px-4 py-1 rounded-full font-bold text-sm text-slate-700 dark:text-slate-300 shadow-sm mt-1 mb-4 select-none">
                Pronunciation: {currentItem.englishPhonetic}
              </div>

              {/* Word & Illustration meaning details */}
              {currentItem.word && (
                <div className="flex flex-col items-center gap-1.5 mt-2 bg-white/40 dark:bg-slate-800/30 px-6 py-3 rounded-3xl border border-white/50 dark:border-slate-700/50 w-full max-w-[260px]">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl filter drop-shadow-sm animate-bounce">{currentItem.wordEmoji}</span>
                    <span className="text-2xl font-bold font-gujarati text-slate-800 dark:text-slate-100">{currentItem.word}</span>
                  </div>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">({currentItem.wordEnglish})</span>
                </div>
              )}

              {/* Click instruction */}
              <div className="absolute bottom-6 flex items-center gap-2 bg-white/60 dark:bg-slate-800/60 px-4 py-1.5 rounded-full border border-white/80 dark:border-slate-700 font-bold text-xs tracking-wide">
                <Volume2 size={14} />
                <span>સાંભળવા માટે ક્લિક કરો</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Playful Slider Controls */}
        <div className="flex items-center justify-between w-full px-2 gap-4">
          {/* Previous */}
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => changeCard(-1)}
            className="flex-1 py-4 px-4 bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-extrabold text-base rounded-[24px] border-3 border-amber-100 dark:border-slate-700 shadow-sm flex items-center justify-center gap-1.5"
          >
            <ChevronLeft size={20} />
            <span>Prev</span>
          </motion.button>

          {/* Sound trigger button */}
          <motion.button
            whileHover={{ scale: 1.15, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSpeak}
            className={`w-16 h-16 rounded-full flex items-center justify-center ${colorTheme.button} shadow-lg shadow-blue-200/50 dark:shadow-none transition-all duration-300`}
            title="Pronounce Gujarati Letter"
          >
            <Volume2 size={28} />
          </motion.button>

          {/* Next */}
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => changeCard(1)}
            className="flex-1 py-4 px-4 bg-blue-500 hover:bg-blue-600 text-white font-extrabold text-base rounded-[24px] border-3 border-blue-600/10 shadow-sm flex items-center justify-center gap-1.5"
          >
            <span>Next</span>
            <ChevronRight size={20} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
