/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Volume2, ChevronLeft, ChevronRight } from 'lucide-react';
import { ENGLISH_NUMBERS, KID_COLORS } from '../data';
import { speakText } from '../utils/speech';

interface EnglishNumbersViewProps {
  onBack: () => void;
  autoSpeak: boolean;
}

export default function EnglishNumbersView({ onBack, autoSpeak }: EnglishNumbersViewProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const currentItem = ENGLISH_NUMBERS[index];
  const colorTheme = KID_COLORS[index % KID_COLORS.length];

  const handleSpeak = () => {
    speakText(`Number ${currentItem.number}, ${currentItem.word}`, 'en', 0.82);
  };

  const changeCard = (dir: number) => {
    setDirection(dir);
    let nextIndex = index + dir;
    if (nextIndex < 0) nextIndex = ENGLISH_NUMBERS.length - 1;
    if (nextIndex >= ENGLISH_NUMBERS.length) nextIndex = 0;
    setIndex(nextIndex);

    if (autoSpeak) {
      const nextItem = ENGLISH_NUMBERS[nextIndex];
      speakText(`Number ${nextItem.number}, ${nextItem.word}`, 'en', 0.82);
    }
  };

  useEffect(() => {
    if (autoSpeak) {
      const timer = setTimeout(() => {
        handleSpeak();
      }, 350);
      return () => clearTimeout(timer);
    }
  }, []); // Speak first number on mount

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

  // Determine emoji sizes based on quantity to keep layout flawless
  const getEmojiSizeClass = (num: number) => {
    if (num <= 5) return 'text-5xl m-1.5';
    if (num <= 10) return 'text-3.5xl m-1';
    return 'text-2.5xl m-0.5';
  };

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

      {/* Title */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white mb-1">
          English Numbers (1 to 20)
        </h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">
          Count the friendly items inside the card and hear their pronunciations!
        </p>
      </div>

      {/* Card stage */}
      <div className="w-full max-w-md flex flex-col items-center gap-6">
        <div className="w-full relative h-[440px] flex items-center justify-center overflow-hidden">
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
              className={`w-full h-full rounded-[48px] border-8 ${colorTheme.bg} ${colorTheme.border} ${colorTheme.text} shadow-[0_24px_50px_-12px_rgba(0,0,0,0.06)] dark:shadow-none flex flex-col items-center justify-between cursor-pointer select-none relative group transition-colors duration-300 px-6 py-8`}
            >
              {/* Card Index Indicator */}
              <div className="absolute top-6 right-8 font-bold text-sm tracking-widest uppercase opacity-75">
                {index + 1} / 20
              </div>

              {/* Large Numeral in top-left */}
              <div className="absolute top-5 left-8 text-5xl font-black font-sans opacity-30">
                #{currentItem.number}
              </div>

              {/* Dynamic Emoji Counting Grid */}
              <div className="flex-1 flex flex-col items-center justify-center w-full mt-6 mb-2">
                <div className="flex flex-wrap items-center justify-center max-w-[280px] select-none pointer-events-none">
                  {Array.from({ length: currentItem.number }).map((_, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0, rotate: -20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ 
                        delay: Math.min(i * 0.04, 0.6), 
                        type: 'spring', 
                        stiffness: 260, 
                        damping: 15 
                      }}
                      className={`inline-block filter drop-shadow-sm hover:scale-125 transition-transform ${getEmojiSizeClass(currentItem.number)}`}
                    >
                      {currentItem.emoji}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Text label details */}
              <div className="text-center mt-auto">
                <div className="text-[72px] font-black font-sans tracking-tight leading-none mb-1 filter drop-shadow-sm">
                  {currentItem.number}
                </div>
                <h3 className="text-3xl font-extrabold tracking-tight capitalize">
                  {currentItem.word}
                </h3>
              </div>

              {/* Speak indicator bar */}
              <div className="mt-4 flex items-center gap-2 bg-white/60 dark:bg-slate-800/60 px-4 py-1.5 rounded-full border border-white/80 dark:border-slate-700 font-bold text-xs tracking-wide">
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
            className="flex-1 py-4 px-4 bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-extrabold text-base rounded-[24px] border-3 border-amber-100 dark:border-slate-700 shadow-sm flex items-center justify-center gap-1.5"
          >
            <span>Next</span>
            <ChevronRight size={20} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
