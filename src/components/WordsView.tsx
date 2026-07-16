/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Volume2, ChevronLeft, ChevronRight } from 'lucide-react';
import { ENGLISH_WORDS, KID_COLORS } from '../data';
import { speakText } from '../utils/speech';

interface WordsViewProps {
  onBack: () => void;
  autoSpeak: boolean;
}

export default function WordsView({ onBack, autoSpeak }: WordsViewProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const currentItem = ENGLISH_WORDS[index];
  const colorTheme = KID_COLORS[index % KID_COLORS.length];

  const handleSpeak = () => {
    // Pronounce "A for Apple" or "B for Ball"
    speakText(`${currentItem.letter} for ${currentItem.word}`, 'en', 0.82);
  };

  const changeCard = (dir: number) => {
    setDirection(dir);
    let nextIndex = index + dir;
    if (nextIndex < 0) nextIndex = ENGLISH_WORDS.length - 1;
    if (nextIndex >= ENGLISH_WORDS.length) nextIndex = 0;
    setIndex(nextIndex);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSpeak();
    }, 350);
    return () => clearTimeout(timer);
  }, [index]);

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
      {/* Back button */}
      <button 
        onClick={onBack}
        className="self-start flex items-center gap-2 text-pink-600 dark:text-pink-400 font-bold mb-6 hover:underline transition-all group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span>Back to English Room</span>
      </button>

      {/* Subheading */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white mb-1">
          English Words (A to Z)
        </h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">
          A for Apple, B for Ball! Tap the card to hear it spoken aloud!
        </p>
      </div>

      {/* Card core */}
      <div className="w-full max-w-md flex flex-col items-center gap-6">
        {/* Animated Flashcard */}
        <div className="w-full relative h-[420px] flex items-center justify-center overflow-hidden">
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
              className={`w-full h-full rounded-[48px] border-8 ${colorTheme.bg} ${colorTheme.border} ${colorTheme.text} shadow-[0_24px_50px_-12px_rgba(0,0,0,0.06)] dark:shadow-none flex flex-col items-center justify-center cursor-pointer select-none relative group transition-colors duration-300 px-6 py-8`}
            >
              {/* Card Index Indicator */}
              <div className="absolute top-6 font-bold text-sm tracking-widest uppercase opacity-75">
                Card {index + 1} of 26
              </div>

              {/* Top corner reference letter */}
              <div className="absolute top-5 left-6 text-4xl font-black font-sans opacity-25">
                {currentItem.letter}
              </div>

              {/* Large Emojis visual representation */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                className="text-[120px] filter drop-shadow-md mb-2 selection:bg-transparent pointer-events-none"
              >
                {currentItem.emoji}
              </motion.div>

              {/* Large word label with letter match */}
              <div className="flex items-center justify-center gap-2.5 sm:gap-4 mt-4 text-center whitespace-nowrap">
                <span className={`text-6xl sm:text-7xl md:text-8xl font-black leading-none ${colorTheme.text}`}>
                  {currentItem.letter}
                </span>
                <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
                  For {currentItem.word}
                </span>
              </div>

              {/* Speak indicator bar */}
              <div className="absolute bottom-6 flex items-center gap-2 bg-white/60 dark:bg-slate-800/60 px-4 py-1.5 rounded-full border border-white/80 dark:border-slate-700 font-bold text-xs tracking-wide">
                <Volume2 size={14} />
                <span>Hear Pronunciation</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Playful Controls */}
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
            className={`w-16 h-16 rounded-full flex items-center justify-center ${colorTheme.button} shadow-lg shadow-pink-200/50 dark:shadow-none transition-all duration-300`}
            title="Pronounce letter and word"
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
