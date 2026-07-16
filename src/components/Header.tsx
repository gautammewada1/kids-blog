/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Sun, Moon, Rocket, Volume2, VolumeX } from 'lucide-react';
import { ViewType } from '../types';

interface HeaderProps {
  currentView: ViewType;
  setView: (view: ViewType) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  autoSpeak: boolean;
  setAutoSpeak: (speak: boolean) => void;
}

export default function Header({
  currentView,
  setView,
  darkMode,
  setDarkMode,
  autoSpeak,
  setAutoSpeak,
}: HeaderProps) {
  return (
    <header className="w-full flex items-center justify-between py-4 px-6 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md border-b-4 border-amber-100 dark:border-slate-800 rounded-3xl shadow-sm mb-6 transition-all duration-300">
      <div 
        onClick={() => setView('home')}
        className="flex items-center gap-2 cursor-pointer group"
      >
        <span className="text-3xl filter drop-shadow group-hover:scale-110 transition-transform duration-300">🌟</span>
        <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-500 via-orange-400 to-blue-500 bg-clip-text text-transparent font-sans tracking-tight">
          Kids Learning
        </h1>
      </div>

      <div className="flex items-center gap-3">
        {/* Sound toggle */}
        <button
          onClick={() => setAutoSpeak(!autoSpeak)}
          className={`p-3 rounded-full border-2 transition-all duration-300 ${
            autoSpeak 
              ? 'bg-emerald-100 border-emerald-300 text-emerald-600 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-400' 
              : 'bg-rose-50 border-rose-200 text-rose-500 dark:bg-rose-950/20 dark:border-rose-900 dark:text-rose-400'
          }`}
          title={autoSpeak ? 'Auto Pronounce is ON' : 'Auto Pronounce is OFF'}
        >
          {autoSpeak ? <Volume2 size={20} className="animate-pulse" /> : <VolumeX size={20} />}
        </button>

        {/* Coming Soon room */}
        <button
          onClick={() => setView('future-room')}
          className={`p-3 rounded-full border-2 transition-all duration-300 ${
            currentView === 'future-room'
              ? 'bg-amber-400 border-amber-500 text-slate-900 shadow-md'
              : 'bg-amber-100 hover:bg-amber-200 border-amber-300 text-amber-700 dark:bg-amber-950/40 dark:hover:bg-amber-950/60 dark:border-amber-800 dark:text-amber-400'
          }`}
          title="Adventures Room (Coming Soon!)"
        >
          <Rocket size={20} />
        </button>

        {/* Theme button */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-3 rounded-full border-2 border-slate-200 hover:border-pink-300 bg-white dark:bg-slate-800 dark:border-slate-700 text-slate-800 dark:text-slate-200 transition-all duration-300 hover:scale-110 active:scale-95"
          title={darkMode ? 'Switch to Light' : 'Switch to Dark'}
        >
          {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-indigo-600" />}
        </button>
      </div>
    </header>
  );
}
