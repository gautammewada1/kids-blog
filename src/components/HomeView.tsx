/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { ViewType, CategoryType } from '../types';

interface HomeViewProps {
  onSelectCategory: (category: CategoryType) => void;
  setView: (view: ViewType) => void;
}

export default function HomeView({ onSelectCategory, setView }: HomeViewProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full flex flex-col items-center py-6"
    >
      {/* Title */}
      <div className="text-center mb-10 relative">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          className="absolute -top-12 -left-12 text-5xl pointer-events-none hidden sm:block"
        >
          🎈
        </motion.div>
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          className="absolute -top-14 -right-12 text-5xl pointer-events-none hidden sm:block"
        >
          🪁
        </motion.div>

        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 font-sans text-slate-900 dark:text-white flex items-center justify-center gap-3">
          <span>Kids Learning</span>
          <Sparkles className="text-amber-400 animate-pulse" size={40} />
        </h1>
        <p className="text-slate-600 dark:text-slate-400 font-medium text-lg max-w-md mx-auto leading-relaxed">
          Unlock a beautiful world of alphabets, words, and playful sounds in English and Gujarati! 🌟
        </p>
      </div>

      {/* Two main category cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl px-4">
        {/* English Category Card */}
        <motion.div
          whileHover={{ y: -10, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelectCategory('english')}
          className="bg-white dark:bg-slate-800 rounded-[36px] border-4 border-pink-100 dark:border-pink-950/60 p-8 text-center cursor-pointer shadow-[0_16px_32px_-4px_rgba(255,107,139,0.12)] dark:shadow-none relative overflow-hidden group transition-colors duration-300"
        >
          {/* Badge */}
          <div className="absolute top-4 right-4 bg-pink-50 dark:bg-pink-950/40 text-pink-500 font-bold px-4 py-1 rounded-full text-xs border border-pink-100 dark:border-pink-900/40">
            A to Z
          </div>

          <div className="text-7xl mb-6 filter drop-shadow-md group-hover:scale-115 group-hover:-rotate-6 transition-transform duration-300">
            🔤
          </div>
          
          <h2 className="text-3xl font-extrabold text-pink-600 dark:text-pink-400 mb-3 font-sans">
            English
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm leading-relaxed">
            Fun and simple alphabet flashcards and word-building with picture recognition and voice pronunciation.
          </p>
        </motion.div>

        {/* Gujarati Category Card */}
        <motion.div
          whileHover={{ y: -10, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelectCategory('gujarati')}
          className="bg-white dark:bg-slate-800 rounded-[36px] border-4 border-blue-100 dark:border-blue-950/60 p-8 text-center cursor-pointer shadow-[0_16px_32px_-4px_rgba(77,150,255,0.12)] dark:shadow-none relative overflow-hidden group transition-colors duration-300"
        >
          {/* Badge */}
          <div className="absolute top-4 right-4 bg-blue-50 dark:bg-blue-950/40 text-blue-500 font-bold px-4 py-1 rounded-full text-xs border border-blue-100 dark:border-blue-900/40 font-gujarati">
            ગુજરાતી
          </div>

          <div className="text-7xl mb-6 filter drop-shadow-md group-hover:scale-115 group-hover:rotate-6 transition-transform duration-300">
            🕉️
          </div>

          <h2 className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 mb-3 font-gujarati">
            Gujarati (ગુજરાતી)
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm leading-relaxed">
            શીખો ગુજરાતી મૂળાક્ષરો (કક્કો) સુંદર સચિત્ર અર્થો અને વાસ્તવિક ઓડિયો ઉચ્ચારણ સાથે!
          </p>
        </motion.div>
      </div>

    </motion.div>
  );
}
