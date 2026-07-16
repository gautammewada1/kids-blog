/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ViewType, CategoryType } from './types';

// Components
import Header from './components/Header';
import HomeView from './components/HomeView';
import CategoryView from './components/CategoryView';
import AlphabetView from './components/AlphabetView';
import WordsView from './components/WordsView';
import EnglishNumbersView from './components/EnglishNumbersView';
import GujaratiAlphabetView from './components/GujaratiAlphabetView';
import GujaratiNumbersView from './components/GujaratiNumbersView';
import GujaratiBarakhadiView from './components/GujaratiBarakhadiView';
import GujaratiLettersView from './components/GujaratiLettersView';
import FutureScopeView from './components/FutureScopeView';
import QuizView from './components/QuizView';

export default function App() {
  const [view, setView] = useState<ViewType>('home');
  const [category, setCategory] = useState<CategoryType>('english');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [autoSpeak, setAutoSpeak] = useState<boolean>(true);

  // Synchronize Dark Mode Class with document root
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  const handleSelectCategory = (cat: CategoryType) => {
    setCategory(cat);
    setView(cat === 'english' ? 'category-english' : 'category-gujarati');
  };

  const handleBackToHome = () => {
    setView('home');
  };

  const handleBackToCategory = () => {
    setView(category === 'english' ? 'category-english' : 'category-gujarati');
  };

  return (
    <div className="min-h-screen bg-[#FFFDF6] dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans transition-colors duration-300 relative overflow-x-hidden flex flex-col items-center pb-12">
      
      {/* Decorative Bubble Background Floaters */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[10%] left-[5%] w-32 h-32 rounded-full bg-pink-100/30 dark:bg-pink-950/10 blur-xl animate-pulse" />
        <div className="absolute bottom-[20%] right-[8%] w-48 h-48 rounded-full bg-blue-100/30 dark:bg-blue-950/10 blur-xl animate-pulse delay-700" />
        <div className="absolute top-[40%] right-[15%] w-24 h-24 rounded-full bg-yellow-100/30 dark:bg-amber-950/10 blur-xl" />
        <div className="absolute bottom-[10%] left-[12%] w-36 h-36 rounded-full bg-emerald-100/30 dark:bg-emerald-950/10 blur-xl" />
      </div>

      <div className="w-full max-w-5xl px-4 md:px-6 relative z-10 flex flex-col min-h-screen">
        {/* Header Component */}
        <Header 
          currentView={view} 
          setView={setView} 
          darkMode={darkMode} 
          setDarkMode={setDarkMode}
          autoSpeak={autoSpeak}
          setAutoSpeak={setAutoSpeak}
        />

        {/* Dynamic Interactive Views with Transitions */}
        <main className="flex-1 flex flex-col items-center justify-center w-full">
          <AnimatePresence mode="wait">
            {view === 'home' && (
              <motion.div key="home" className="w-full">
                <HomeView 
                  onSelectCategory={handleSelectCategory} 
                  setView={setView} 
                />
              </motion.div>
            )}

            {(view === 'category-english' || view === 'category-gujarati') && (
              <motion.div key="category" className="w-full">
                <CategoryView 
                  category={category} 
                  setView={setView} 
                  onBack={handleBackToHome} 
                />
              </motion.div>
            )}

            {view === 'english-alphabet' && (
              <motion.div key="english-alphabet" className="w-full">
                <AlphabetView 
                  onBack={handleBackToCategory} 
                  autoSpeak={autoSpeak} 
                />
              </motion.div>
            )}

            {view === 'english-words' && (
              <motion.div key="english-words" className="w-full">
                <WordsView 
                  onBack={handleBackToCategory} 
                  autoSpeak={autoSpeak} 
                />
              </motion.div>
            )}

            {view === 'english-numbers' && (
              <motion.div key="english-numbers" className="w-full">
                <EnglishNumbersView 
                  onBack={handleBackToCategory} 
                  autoSpeak={autoSpeak} 
                />
              </motion.div>
            )}

            {view === 'gujarati-alphabet' && (
              <motion.div key="gujarati-alphabet" className="w-full">
                <GujaratiAlphabetView 
                  onBack={handleBackToCategory} 
                  autoSpeak={autoSpeak} 
                />
              </motion.div>
            )}

            {view === 'gujarati-numbers' && (
              <motion.div key="gujarati-numbers" className="w-full">
                <GujaratiNumbersView 
                  onBack={handleBackToCategory} 
                  autoSpeak={autoSpeak} 
                />
              </motion.div>
            )}

            {view === 'gujarati-barakhadi' && (
              <motion.div key="gujarati-barakhadi" className="w-full">
                <GujaratiBarakhadiView 
                  onBack={handleBackToCategory} 
                  autoSpeak={autoSpeak} 
                />
              </motion.div>
            )}

            {view === 'gujarati-letters' && (
              <motion.div key="gujarati-letters" className="w-full">
                <GujaratiLettersView 
                  onBack={handleBackToCategory} 
                />
              </motion.div>
            )}

            {view === 'future-room' && (
              <motion.div key="future-room" className="w-full">
                <FutureScopeView 
                  onBack={handleBackToHome} 
                  setView={setView}
                />
              </motion.div>
            )}

            {view === 'quiz' && (
              <motion.div key="quiz" className="w-full">
                <QuizView 
                  onBack={handleBackToHome} 
                  autoSpeak={autoSpeak} 
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Minimal Footer */}
        <footer className="mt-auto pt-10 text-center text-xs font-semibold text-slate-400 dark:text-slate-500">
          <p>© 2026 Kids Learning Portal • Purely Client-side & Offline Ready</p>
        </footer>
      </div>
    </div>
  );
}
