/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Volume2, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { GUJARATI_ALPHABET, KID_COLORS } from '../data';
import { speakText } from '../utils/speech';

interface GujaratiBarakhadiViewProps {
  onBack: () => void;
  autoSpeak: boolean;
}

// Slice only consonants from GUJARATI_ALPHABET
const consonants = GUJARATI_ALPHABET.slice(12);

const VOWEL_SIGNS = ['', 'ા', 'િ', 'ી', 'ુ', 'ૂ', 'ે', 'ૈ', 'ો', 'ૌ', 'ં', 'ઃ'];

const PHONETIC_SUFFIXES = ['a', 'aa', 'i', 'ee', 'u', 'oo', 'e', 'ai', 'o', 'au', 'am', 'aha'];

export default function GujaratiBarakhadiView({ onBack, autoSpeak }: GujaratiBarakhadiViewProps) {
  const [consonantIndex, setConsonantIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const currentConsonantItem = consonants[consonantIndex];
  const colorTheme = KID_COLORS[consonantIndex % KID_COLORS.length];

  // Helper to generate 12 barakhadi letters
  const barakhadiItems = VOWEL_SIGNS.map((sign, index) => {
    const letter = currentConsonantItem.letter + sign;
    
    // Compute english phonetic fallback
    let stem = currentConsonantItem.englishPhonetic;
    if (stem.endsWith('a')) {
      stem = stem.slice(0, -1);
    }
    const phonetic = stem + PHONETIC_SUFFIXES[index];
    
    return {
      letter,
      phonetic,
      index
    };
  });

  const handleSpeakBase = () => {
    // Speak first letter (e.g., "ક")
    speakText(currentConsonantItem.letter, 'gu', 0.85, currentConsonantItem.englishPhonetic);
  };

  const handleSpeakLetter = (letter: string, phonetic: string) => {
    speakText(letter, 'gu', 0.85, phonetic);
  };

  const changeConsonant = (dir: number) => {
    setDirection(dir);
    let nextIndex = consonantIndex + dir;
    if (nextIndex < 0) nextIndex = consonants.length - 1;
    if (nextIndex >= consonants.length) nextIndex = 0;
    setConsonantIndex(nextIndex);

    if (autoSpeak) {
      const nextItem = consonants[nextIndex];
      speakText(nextItem.letter, 'gu', 0.85, nextItem.englishPhonetic);
    }
  };

  // Speak first card on initial view load
  useEffect(() => {
    if (autoSpeak) {
      const timer = setTimeout(() => {
        handleSpeakBase();
      }, 350);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') changeConsonant(1);
      if (e.key === 'ArrowLeft') changeConsonant(-1);
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        handleSpeakBase();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [consonantIndex]);

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
        id="btn-back-barakhadi"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span>Back to Gujarati Room</span>
      </button>

      {/* Title */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white mb-2 font-gujarati flex items-center justify-center gap-2">
          <BookOpen className="text-blue-500" size={28} />
          <span>ગુજરાતી બારાખડી (Gujarati Barakhadi)</span>
        </h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">
          ક થી જ્ઞ સુધીના વ્યંજનના બારાખડી સ્વરૂપો અને તેમનો સાચો ઉચ્ચાર શીખો.
        </p>
      </div>

      {/* Consonant Selector Panel */}
      <div className="w-full max-w-xl bg-white dark:bg-slate-800 rounded-[32px] border-4 border-slate-100 dark:border-slate-700/50 p-6 shadow-md mb-8 flex flex-col items-center gap-4">
        <div className="flex items-center justify-between w-full">
          {/* Previous Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => changeConsonant(-1)}
            className="p-3 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-white transition-colors"
            title="Previous Consonant"
            id="btn-prev-consonant"
          >
            <ChevronLeft size={24} />
          </motion.button>

          {/* Consonant Banner */}
          <div className="flex flex-col items-center">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">
              Active Consonant
            </span>
            <motion.div
              key={currentConsonantItem.letter}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              onClick={handleSpeakBase}
              className={`text-6xl font-black font-gujarati cursor-pointer px-8 py-3 rounded-2xl ${colorTheme.bg} ${colorTheme.text} border-3 ${colorTheme.border} flex items-center gap-3 group`}
              title="Click to pronounce base consonant"
              id="consonant-badge"
            >
              <span>{currentConsonantItem.letter}</span>
              <Volume2 size={20} className="opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all" />
            </motion.div>
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-2">
              Pronunciation: {currentConsonantItem.englishPhonetic} ({consonantIndex + 1} / {consonants.length})
            </span>
          </div>

          {/* Next Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => changeConsonant(1)}
            className="p-3 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-white transition-colors"
            title="Next Consonant"
            id="btn-next-consonant"
          >
            <ChevronRight size={24} />
          </motion.button>
        </div>
      </div>

      {/* 12 Barakhadi Grid */}
      <div className="w-full max-w-4xl px-4">
        <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-4 text-center font-gujarati">
          {currentConsonantItem.letter} ની બારાખડી (12 forms of {currentConsonantItem.letter}):
        </h3>
        
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
          <AnimatePresence mode="popLayout">
            {barakhadiItems.map((item, idx) => {
              const itemColor = KID_COLORS[(consonantIndex + idx) % KID_COLORS.length];
              return (
                <motion.div
                  key={`${currentConsonantItem.letter}-${item.letter}`}
                  initial={{ opacity: 0, scale: 0.8, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -15 }}
                  transition={{ delay: idx * 0.02, type: 'spring', stiffness: 200, damping: 20 }}
                  whileHover={{ y: -6, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleSpeakLetter(item.letter, item.phonetic)}
                  className={`bg-white dark:bg-slate-800 border-4 border-slate-100 hover:border-slate-300 dark:border-slate-700/60 dark:hover:border-slate-500 rounded-[24px] p-4 flex flex-col items-center justify-center cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.02)] hover:shadow-md transition-all select-none group aspect-square`}
                  id={`barakhadi-cell-${idx}`}
                >
                  {/* Big Barakhadi Letter */}
                  <span className={`text-4xl font-extrabold font-gujarati mb-1 group-hover:scale-110 transition-transform duration-300 ${itemColor.text}`}>
                    {item.letter}
                  </span>
                  
                  {/* English phonetic hint */}
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500">
                    {item.phonetic}
                  </span>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Speech Tip */}
      <div className="mt-8 flex items-center gap-2 bg-blue-50/50 dark:bg-slate-900/45 px-4 py-2 rounded-full border border-blue-100 dark:border-slate-800 font-bold text-xs text-blue-600 dark:text-blue-400">
        <Volume2 size={16} />
        <span>કોઈપણ અક્ષર પર ક્લિક કરીને તેનો ઉચ્ચાર સાંભળો!</span>
      </div>
    </motion.div>
  );
}
