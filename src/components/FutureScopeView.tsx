/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ArrowLeft, Lock, Rocket, Sparkles, ArrowRight } from 'lucide-react';
import { FUTURE_SECTIONS } from '../data';
import { ViewType } from '../types';

interface FutureScopeViewProps {
  onBack: () => void;
  setView: (view: ViewType) => void;
}

const IMPLEMENTED_VIEWS: Record<string, ViewType> = {
  'english-numbers': 'english-numbers',
  'gujarati-numbers': 'gujarati-numbers',
  'barakhadi': 'gujarati-barakhadi',
  'quiz': 'quiz',
};

export default function FutureScopeView({ onBack, setView }: FutureScopeViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="w-full flex flex-col items-center py-4"
    >
      {/* Back button */}
      <button 
        onClick={onBack}
        className="self-start flex items-center gap-2 text-pink-600 dark:text-pink-400 font-bold mb-6 hover:underline transition-all group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span>Back to Home</span>
      </button>

      {/* Header title */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2 flex items-center justify-center gap-2">
          <span>Kids Adventure Room</span>
          <Rocket className="text-amber-500 animate-bounce" size={32} />
        </h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium text-sm max-w-md mx-auto">
          Here is a special sneak peek at the exciting activities and games currently being crafted for our young stars! 🌟
        </p>
      </div>

      {/* Grid of future modules */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl px-4">
        {FUTURE_SECTIONS.map((item, idx) => {
          const targetView = IMPLEMENTED_VIEWS[item.id];
          const isUnlocked = !!targetView;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.3 }}
              whileHover={{ y: -4, scale: 1.01 }}
              onClick={isUnlocked ? () => setView(targetView) : undefined}
              className={`bg-white dark:bg-slate-800 rounded-3xl p-5 flex items-start gap-4 relative overflow-hidden transition-all ${
                isUnlocked 
                  ? 'border-4 border-slate-100 hover:border-blue-300 dark:border-slate-700/60 dark:hover:border-blue-900 shadow-sm hover:shadow-md cursor-pointer'
                  : 'border-3 border-dashed border-slate-200 dark:border-slate-800/80 opacity-90'
              }`}
            >
              {/* Visual Icon background */}
              <span className={`text-4xl p-3 rounded-2xl filter drop-shadow-sm flex-shrink-0 ${
                isUnlocked ? 'bg-blue-50 dark:bg-blue-950/35' : 'bg-slate-100 dark:bg-slate-700/50'
              }`}>
                {item.emoji}
              </span>

              {/* Info */}
              <div className="flex flex-col items-start text-left">
                <div className="flex items-center gap-1.5">
                  <h4 className="font-extrabold text-slate-700 dark:text-slate-200 text-lg leading-tight">
                    {item.title}
                  </h4>
                  {!isUnlocked ? (
                    <Lock size={14} className="text-slate-400 dark:text-slate-500 flex-shrink-0" />
                  ) : (
                    <ArrowRight size={14} className="text-blue-500 flex-shrink-0" />
                  )}
                </div>

                {/* Tag Category */}
                <span className={`mt-1 px-3 py-0.5 rounded-full text-[10px] font-extrabold tracking-wide uppercase ${
                  isUnlocked 
                    ? 'bg-blue-100 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400' 
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                }`}>
                  {item.category}
                </span>

                <p className={`text-xs font-medium mt-2 leading-relaxed ${
                  isUnlocked ? 'text-slate-500 dark:text-slate-400' : 'text-slate-400 dark:text-slate-500'
                }`}>
                  {item.desc}
                </p>
              </div>

              {/* Subtle sparkling corner badge */}
              {isUnlocked ? (
                <div className="absolute top-2 right-2 flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-wider">
                  <Sparkles size={8} className="animate-pulse" />
                  <span>PLAY NOW</span>
                </div>
              ) : (
                <div className="absolute top-2 right-2 flex items-center gap-1 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-100 dark:border-yellow-900/30 text-yellow-600 dark:text-yellow-400 px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-wider">
                  <Sparkles size={8} className="animate-spin" />
                  <span>CRAFTING</span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Decorative banner */}
      <div className="mt-12 bg-gradient-to-r from-pink-500/10 via-amber-500/10 to-blue-500/10 border-2 border-dashed border-pink-200 dark:border-pink-900/40 rounded-[32px] p-6 text-center max-w-2xl mx-4">
        <h4 className="font-bold text-slate-700 dark:text-slate-300 text-base mb-1">
          Have an activity suggestion or custom requests?
        </h4>
        <p className="text-slate-500 dark:text-slate-400 text-xs">
          This portal is built using modular React cards and standalone Vanilla ES6, meaning we can instantly drop in any of these upcoming rooms in seconds without modifying existing routes!
        </p>
      </div>
    </motion.div>
  );
}
