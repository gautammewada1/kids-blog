/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Volume2, ChevronLeft, ChevronRight } from 'lucide-react';
import { ENGLISH_ALPHABET, KID_COLORS } from '../data';
import { speakText } from '../utils/speech';

interface AlphabetViewProps {
  onBack: () => void;
  autoSpeak: boolean;
}

export default function AlphabetView({ onBack, autoSpeak }: AlphabetViewProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const currentItem = ENGLISH_ALPHABET[index];
  const colorTheme = KID_COLORS[index % KID_COLORS.length];

  const handleSpeak = () => {
    speakText(currentItem.letter, 'en', 0.85);
  };

  const changeCard = (dir: number) => {
    setDirection(dir);
    let nextIndex = index + dir;
    if (nextIndex < 0) nextIndex = ENGLISH_ALPHABET.length - 1;
    if (nextIndex >= ENGLISH_ALPHABET.length) nextIndex = 0;
    setIndex(nextIndex);

    if (autoSpeak) {
      speakText(ENGLISH_ALPHABET[nextIndex].letter, 'en', 0.85);
    }
  };

  useEffect(() => {
    if (autoSpeak) {
      const timer = setTimeout(() => {
        handleSpeak();
      }, 350);
      return () => clearTimeout(timer);
    }
  }, []); // Only run on mount to speak the first card

  // Handle keyboard navigation for Accessibility & Convenience
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
  }, [index]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full flex flex-col items-center py-4"
    >
      {/* Back navigation */}
      <button 
        onClick={onBack}
        className="self-start flex items-center gap-2 text-pink-600 dark:text-pink-400 font-bold mb-6 hover:underline transition-all group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span>Back to English Room</span>
      </button>

      {/* Subtitle info */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white mb-1">
          English Alphabet (A to Z)
        </h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">
          Slide through the flashcards or press Left/Right arrows on your keyboard!
        </p>
      </div>

      {/* Slider Core Container */}
      <div className="w-full max-w-md flex flex-col items-center gap-6">
        {/* Animated Flashcard */}
        <div className="w-full relative h-[360px] flex items-center justify-center overflow-hidden">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={index}
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
              className={`w-full h-full rounded-[48px] border-8 ${colorTheme.bg} ${colorTheme.border} ${colorTheme.text} shadow-[0_24px_50px_-12px_rgba(0,0,0,0.06)] dark:shadow-none flex flex-col items-center justify-center cursor-pointer select-none relative group transition-colors duration-300`}
            >
              {/* Floating index */}
              <div className="absolute top-6 font-bold text-sm tracking-widest uppercase opacity-75">
                Card {index + 1} of 26
              </div>

              {/* Large Letter font */}
              <div className="text-[160px] font-black font-sans tracking-tight filter drop-shadow-sm group-hover:scale-110 transition-transform duration-300">
                {currentItem.letter}
              </div>

              {/* Speak indicator bar */}
              <div className="absolute bottom-6 flex items-center gap-2 bg-white/60 dark:bg-slate-800/60 px-4 py-1.5 rounded-full border border-white/80 dark:border-slate-700 font-bold text-xs tracking-wide">
                <Volume2 size={14} />
                <span>Click to Pronounce</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Playful Controls */}
        <div className="flex items-center justify-between w-full px-2 gap-4 mt-2">
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

          {/* Sound button */}
          <motion.button
            whileHover={{ scale: 1.15, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSpeak}
            className={`w-16 h-16 rounded-full flex items-center justify-center ${colorTheme.button} shadow-lg shadow-pink-200/50 dark:shadow-none transition-all duration-300`}
            title="Pronounce"
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
