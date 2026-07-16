/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ChevronLeft, ChevronRight, Music } from 'lucide-react';
import { KID_COLORS } from '../data';

interface GujaratiLettersViewProps {
  onBack: () => void;
}

const vowels = [
  { letter: 'અ', transliteration: 'A' },
  { letter: 'આ', transliteration: 'Aa' },
  { letter: 'ઇ', transliteration: 'I' },
  { letter: 'ઈ', transliteration: 'Ee' },
  { letter: 'ઉ', transliteration: 'U' },
  { letter: 'ઊ', transliteration: 'Oo' },
  { letter: 'ઋ', transliteration: 'Ru' },
  { letter: 'એ', transliteration: 'E' },
  { letter: 'ઐ', transliteration: 'Ai' },
  { letter: 'ઓ', transliteration: 'O' },
  { letter: 'ઔ', transliteration: 'Au' },
  { letter: 'અં', transliteration: 'Am' },
  { letter: 'અઃ', transliteration: 'Ah' }
];

const consonants = [
  { letter: 'ક', transliteration: 'Ka' },
  { letter: 'ખ', transliteration: 'Kha' },
  { letter: 'ગ', transliteration: 'Ga' },
  { letter: 'ઘ', transliteration: 'Gha' },
  { letter: 'ઙ', transliteration: 'Nga' },
  { letter: 'ચ', transliteration: 'Cha' },
  { letter: 'છ', transliteration: 'Chha' },
  { letter: 'જ', transliteration: 'Ja' },
  { letter: 'ઝ', transliteration: 'Jha' },
  { letter: 'ઞ', transliteration: 'Nya' },
  { letter: 'ટ', transliteration: 'Ta' },
  { letter: 'ઠ', transliteration: 'Tha' },
  { letter: 'ડ', transliteration: 'Da' },
  { letter: 'ઢ', transliteration: 'Dha' },
  { letter: 'ણ', transliteration: 'Na' },
  { letter: 'ત', transliteration: 'Ta' },
  { letter: 'થ', transliteration: 'Tha' },
  { letter: 'દ', transliteration: 'Da' },
  { letter: 'ધ', transliteration: 'Dha' },
  { letter: 'ન', transliteration: 'Na' },
  { letter: 'પ', transliteration: 'Pa' },
  { letter: 'ફ', transliteration: 'Pha' },
  { letter: 'બ', transliteration: 'Ba' },
  { letter: 'ભ', transliteration: 'Bha' },
  { letter: 'મ', transliteration: 'Ma' },
  { letter: 'ય', transliteration: 'Ya' },
  { letter: 'ર', transliteration: 'Ra' },
  { letter: 'લ', transliteration: 'La' },
  { letter: 'વ', transliteration: 'Va' },
  { letter: 'શ', transliteration: 'Sha' },
  { letter: 'ષ', transliteration: 'Sha' },
  { letter: 'સ', transliteration: 'Sa' },
  { letter: 'હ', transliteration: 'Ha' },
  { letter: 'ળ', transliteration: 'La' },
  { letter: 'ક્ષ', transliteration: 'Ksha' },
  { letter: 'જ્ઞ', transliteration: 'Gnya' }
];

// Reusable custom synth beep function using Web Audio API
function playBeep() {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    
    const audioCtx = new AudioContextClass();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = 'sine';
    // Friendly high-pitch soft beep/click
    osc.frequency.setValueAtTime(650, audioCtx.currentTime);
    
    gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
    // Smooth fast decay
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.1);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.1);
  } catch (err) {
    console.error('Audio beep failed:', err);
  }
}

export default function GujaratiLettersView({ onBack }: GujaratiLettersViewProps) {
  const [activeTab, setActiveTab] = useState<'consonants' | 'vowels'>('consonants');
  const [vowelIndex, setVowelIndex] = useState(0);
  const [consonantIndex, setConsonantIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const currentArray = activeTab === 'vowels' ? vowels : consonants;
  const currentIndex = activeTab === 'vowels' ? vowelIndex : consonantIndex;
  const currentItem = currentArray[currentIndex];
  
  const colorTheme = KID_COLORS[currentIndex % KID_COLORS.length];

  const handleTabChange = (tab: 'consonants' | 'vowels') => {
    setActiveTab(tab);
    setDirection(0);
    playBeep();
  };

  const changeCard = (dir: number) => {
    setDirection(dir);
    playBeep();
    
    if (activeTab === 'vowels') {
      let nextIndex = vowelIndex + dir;
      if (nextIndex < 0) nextIndex = vowels.length - 1;
      if (nextIndex >= vowels.length) nextIndex = 0;
      setVowelIndex(nextIndex);
    } else {
      let nextIndex = consonantIndex + dir;
      if (nextIndex < 0) nextIndex = consonants.length - 1;
      if (nextIndex >= consonants.length) nextIndex = 0;
      setConsonantIndex(nextIndex);
    }
  };

  const handleCardClick = () => {
    playBeep();
  };

  // Listen to keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') changeCard(1);
      if (e.key === 'ArrowLeft') changeCard(-1);
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        handleCardClick();
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
        id="btn-back-letters"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span>Back to Gujarati Room</span>
      </button>

      {/* Subtitle */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white mb-1 font-gujarati">
          ગુજરાતી અક્ષરો (Gujarati Letters)
        </h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">
          વ્યંજન અને સ્વર શીખો અને સુંદર અવાજ સાંભળો!
        </p>
      </div>

      {/* Tab Selector Buttons */}
      <div className="flex bg-blue-50/50 dark:bg-slate-900/50 p-1.5 rounded-[24px] border-3 border-blue-100/60 dark:border-slate-800 w-full max-w-sm mb-8 gap-2">
        <button
          onClick={() => handleTabChange('consonants')}
          className={`flex-1 py-3 px-4 rounded-[18px] font-extrabold text-sm transition-all duration-300 relative ${
            activeTab === 'consonants'
              ? 'bg-blue-500 text-white shadow-md'
              : 'text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-white/50 dark:hover:bg-slate-800/40'
          }`}
        >
          વ્યંજન (Consonants)
        </button>
        <button
          onClick={() => handleTabChange('vowels')}
          className={`flex-1 py-3 px-4 rounded-[18px] font-extrabold text-sm transition-all duration-300 relative ${
            activeTab === 'vowels'
              ? 'bg-blue-500 text-white shadow-md'
              : 'text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-white/50 dark:hover:bg-slate-800/40'
          }`}
        >
          સ્વર (Vowels)
        </button>
      </div>

      {/* Carousel Container */}
      <div className="w-full max-w-md flex flex-col items-center gap-6">
        {/* Animated Letter Display Card */}
        <div className="w-full relative h-[380px] flex items-center justify-center overflow-hidden">
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
              onClick={handleCardClick}
              className={`w-full h-full rounded-[48px] border-8 ${colorTheme.bg} ${colorTheme.border} ${colorTheme.text} shadow-[0_24px_50px_-12px_rgba(0,0,0,0.06)] dark:shadow-none flex flex-col items-center justify-center cursor-pointer select-none relative group transition-colors duration-300 px-6 py-8`}
              id="letters-card-display"
            >
              {/* Badge */}
              <div className="absolute top-6 left-6 bg-white/75 dark:bg-slate-800/75 px-3 py-1 rounded-full text-xs font-bold border border-white/80 dark:border-slate-700">
                {activeTab === 'vowels' ? 'સ્વર (Vowel)' : 'વ્યંજન (Consonant)'}
              </div>

              {/* Index indicator */}
              <div className="absolute top-6 right-6 font-bold text-xs opacity-75">
                અક્ષર {currentIndex + 1} / {currentArray.length}
              </div>

              {/* Big central Gujarati letter */}
              <div className="text-[130px] font-black font-gujarati leading-none mb-4 filter drop-shadow-sm group-hover:scale-110 transition-transform duration-300">
                {currentItem.letter}
              </div>

              {/* Transliteration below the letter */}
              <div className="text-4xl font-extrabold text-slate-700 dark:text-slate-300 select-none tracking-wide">
                {currentItem.transliteration}
              </div>

              {/* Interactive Audio Tip */}
              <div className="absolute bottom-6 flex items-center gap-1.5 bg-white/60 dark:bg-slate-800/60 px-4 py-1.5 rounded-full border border-white/80 dark:border-slate-700 font-bold text-xs tracking-wide">
                <Music size={14} className="animate-pulse" />
                <span>ક્લિક કરો અને અવાજ સાંભળો</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel buttons */}
        <div className="flex items-center justify-between w-full px-2 gap-4">
          {/* Previous Button */}
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => changeCard(-1)}
            className="flex-1 py-4 px-4 bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-extrabold text-base rounded-[24px] border-3 border-amber-100 dark:border-slate-700 shadow-sm flex items-center justify-center gap-1.5"
            id="btn-prev-letter"
          >
            <ChevronLeft size={20} />
            <span>Prev</span>
          </motion.button>

          {/* Next Button */}
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => changeCard(1)}
            className="flex-1 py-4 px-4 bg-blue-500 hover:bg-blue-600 text-white font-extrabold text-base rounded-[24px] border-3 border-blue-600/10 shadow-sm flex items-center justify-center gap-1.5"
            id="btn-next-letter"
          >
            <span>Next</span>
            <ChevronRight size={20} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
