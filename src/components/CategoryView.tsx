/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Lock, Sparkles, BookOpen } from 'lucide-react';
import { CategoryType, ViewType } from '../types';

interface CategoryViewProps {
  category: CategoryType;
  setView: (view: ViewType) => void;
  onBack: () => void;
}

export default function CategoryView({ category, setView, onBack }: CategoryViewProps) {
  const isEnglish = category === 'english';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="w-full flex flex-col items-center py-4"
    >
      {/* Back to Home Button */}
      <button 
        onClick={onBack}
        className="self-start flex items-center gap-2 text-pink-600 dark:text-pink-400 font-bold mb-6 hover:underline transition-all group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span>Back to Home</span>
      </button>

      {/* Header title */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2">
          {isEnglish ? (
            <>English <span className="bg-gradient-to-r from-pink-500 to-rose-400 bg-clip-text text-transparent">Learning Room</span></>
          ) : (
            <>ગુજરાતી <span className="bg-gradient-to-r from-blue-500 to-indigo-400 bg-clip-text text-transparent">શિક્ષણ વર્ગ</span></>
          )}
        </h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium">
          {isEnglish 
            ? 'Choose a fun learning section below to start your adventure!'
            : 'કૃપા કરીને નીચેનામાંથી કોઈ એક પ્રવૃત્તિ પસંદ કરો!'
          }
        </p>
      </div>

      {/* List of sub-learning sections */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl px-4">
        {isEnglish ? (
          <>
            {/* English Alphabet */}
            <motion.div
              whileHover={{ y: -8, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setView('english-alphabet')}
              className="bg-white dark:bg-slate-800 rounded-3xl border-4 border-slate-100 dark:border-slate-700/50 p-6 flex flex-col items-center cursor-pointer shadow-[0_8px_20px_-4px_rgba(0,0,0,0.04)] hover:shadow-lg transition-all"
            >
              <div className="text-6xl mb-4 filter drop-shadow">🅰️</div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">English Alphabet</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm text-center mb-4 leading-relaxed">
                Read and hear letters from A to Z with gorgeous slide-in cards.
              </p>
              <span className="mt-auto flex items-center gap-1.5 text-pink-500 font-bold text-sm">
                Let's Learn <ArrowRight size={16} />
              </span>
            </motion.div>

            {/* English Words */}
            <motion.div
              whileHover={{ y: -8, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setView('english-words')}
              className="bg-white dark:bg-slate-800 rounded-3xl border-4 border-slate-100 dark:border-slate-700/50 p-6 flex flex-col items-center cursor-pointer shadow-[0_8px_20px_-4px_rgba(0,0,0,0.04)] hover:shadow-lg transition-all"
            >
              <div className="text-6xl mb-4 filter drop-shadow">🍎</div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">English Words</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm text-center mb-4 leading-relaxed">
                A for Apple, B for Ball! Pronounce both letters and cute objects.
              </p>
              <span className="mt-auto flex items-center gap-1.5 text-pink-500 font-bold text-sm">
                Let's Learn <ArrowRight size={16} />
              </span>
            </motion.div>

            {/* English Numbers */}
            <motion.div
              whileHover={{ y: -8, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setView('english-numbers')}
              className="bg-white dark:bg-slate-800 rounded-3xl border-4 border-slate-100 dark:border-slate-700/50 p-6 flex flex-col items-center cursor-pointer shadow-[0_8px_20px_-4px_rgba(0,0,0,0.04)] hover:shadow-lg transition-all"
            >
              <div className="text-6xl mb-4 filter drop-shadow">🔢</div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">English Numbers</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm text-center mb-4 leading-relaxed">
                Learn to count 0 to 100 with gorgeous items and voice pronunciations!
              </p>
              <span className="mt-auto flex items-center gap-1.5 text-pink-500 font-bold text-sm">
                Let's Learn <ArrowRight size={16} />
              </span>
            </motion.div>
          </>
        ) : (
          <>
            {/* Gujarati Alphabet */}
            <motion.div
              whileHover={{ y: -8, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setView('gujarati-alphabet')}
              className="bg-white dark:bg-slate-800 rounded-3xl border-4 border-slate-100 dark:border-slate-700/50 p-6 flex flex-col items-center cursor-pointer shadow-[0_8px_20px_-4px_rgba(0,0,0,0.04)] hover:shadow-lg transition-all"
            >
              <div className="text-6xl mb-4 filter drop-shadow">🗣️</div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2 font-gujarati">ગુજરાતી મૂળાક્ષરો</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm text-center mb-4 leading-relaxed">
                ક થી જ્ઞ સુધીના સ્વર અને વ્યંજન સચિત્ર ઉચ્ચારણ અને સ્પષ્ટ ઓડિયો સાથે શીખો.
              </p>
              <span className="mt-auto flex items-center gap-1.5 text-blue-500 font-bold text-sm">
                શીખવા માટે ક્લિક કરો <ArrowRight size={16} />
              </span>
            </motion.div>

            {/* Gujarati Numbers */}
            <motion.div
              whileHover={{ y: -8, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setView('gujarati-numbers')}
              className="bg-white dark:bg-slate-800 rounded-3xl border-4 border-slate-100 dark:border-slate-700/50 p-6 flex flex-col items-center cursor-pointer shadow-[0_8px_20px_-4px_rgba(0,0,0,0.04)] hover:shadow-lg transition-all"
            >
              <div className="text-6xl mb-4 filter drop-shadow">૧️⃣</div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2 font-gujarati">ગુજરાતી અંકો</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm text-center mb-4 leading-relaxed font-gujarati">
                ૦ થી ૧૦૦ સુધીના અંકો સચિત્ર ગણતરી અને ઓડિયો ઉચ્ચાર સાથે શીખો.
              </p>
              <span className="mt-auto flex items-center gap-1.5 text-blue-500 font-bold text-sm">
                શીખવા માટે ક્લિક કરો <ArrowRight size={16} />
              </span>
            </motion.div>

            {/* Gujarati Barakhadi */}
            <motion.div
              whileHover={{ y: -8, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setView('gujarati-barakhadi')}
              className="bg-white dark:bg-slate-800 rounded-3xl border-4 border-slate-100 dark:border-slate-700/50 p-6 flex flex-col items-center cursor-pointer shadow-[0_8px_20px_-4px_rgba(0,0,0,0.04)] hover:shadow-lg transition-all"
            >
              <div className="text-6xl mb-4 filter drop-shadow">📚</div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2 font-gujarati">ગુજરાતી બારાખડી</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm text-center mb-4 leading-relaxed font-gujarati">
                ક થી જ્ઞ સુધીના વ્યંજનના બારાખડી સ્વરૂપો અને તેમનો સાચો ઉચ્ચાર શીખો.
              </p>
              <span className="mt-auto flex items-center gap-1.5 text-blue-500 font-bold text-sm">
                શીખવા માટે ક્લિક કરો <ArrowRight size={16} />
              </span>
            </motion.div>

            {/* Gujarati Words (Future Section) */}
            <motion.div
              whileHover={{ y: -2 }}
              onClick={() => setView('future-room')}
              className="bg-slate-50 dark:bg-slate-800/40 rounded-3xl border-4 border-dashed border-slate-200 dark:border-slate-800 p-6 flex flex-col items-center cursor-pointer opacity-80"
            >
              <div className="text-6xl mb-4 filter drop-shadow grayscale">📙</div>
              <div className="flex items-center gap-1.5 mb-2">
                <h3 className="text-2xl font-bold text-slate-400 dark:text-slate-500 font-gujarati">ગુજરાતી શબ્દો</h3>
                <Lock className="text-slate-400 dark:text-slate-500" size={18} />
              </div>
              <p className="text-slate-400 dark:text-slate-500 text-sm text-center mb-4 leading-relaxed">
                આ પ્રવૃત્તિ ટૂંક સમયમાં આગામી અપડેટમાં ઉમેરવામાં આવશે.
              </p>
              <span className="mt-auto bg-slate-200 dark:bg-slate-800 text-slate-500 px-4 py-1.5 rounded-full text-xs font-bold">
                🔒 Locked / Coming Soon
              </span>
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  );
}
