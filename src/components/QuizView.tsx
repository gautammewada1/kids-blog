/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Volume2, RotateCcw, Trophy, Check, X, Star, Award, Sparkles } from 'lucide-react';
import { ENGLISH_ALPHABET, ENGLISH_WORDS, GUJARATI_ALPHABET, KID_COLORS } from '../data';
import { speakText } from '../utils/speech';

interface QuizViewProps {
  onBack: () => void;
  autoSpeak: boolean;
}

type QuizType = 'english-alphabet' | 'english-words' | 'gujarati-alphabet';

interface QuizQuestion {
  correctItem: any;
  options: any[];
}

export default function QuizView({ onBack, autoSpeak }: QuizViewProps) {
  const [quizType, setQuizType] = useState<QuizType | null>(null);
  const [gameState, setGameState] = useState<'lobby' | 'playing' | 'summary'>('lobby');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const TOTAL_QUESTIONS = 10;

  // Initialize a new game
  const handleStartQuiz = (type: QuizType) => {
    setQuizType(type);
    
    // Choose dataset based on category
    let dataset: any[] = [];
    if (type === 'english-alphabet') dataset = ENGLISH_ALPHABET;
    else if (type === 'english-words') dataset = ENGLISH_WORDS;
    else if (type === 'gujarati-alphabet') dataset = GUJARATI_ALPHABET;

    // Generate questions
    const generatedQuestions: QuizQuestion[] = [];
    
    // Make sure we have enough items
    if (dataset.length === 0) return;

    for (let i = 0; i < TOTAL_QUESTIONS; i++) {
      // Pick random item for the correct answer (unique if possible, but random is fine for large lists)
      const correctItem = dataset[Math.floor(Math.random() * dataset.length)];
      
      // Select 3 unique distractor options
      const distractors: any[] = [];
      while (distractors.length < 3) {
        const randomItem = dataset[Math.floor(Math.random() * dataset.length)];
        const isAlreadyAdded = distractors.some(item => {
          if (type === 'english-alphabet') return item.letter === randomItem.letter;
          if (type === 'english-words') return item.word === randomItem.word;
          return item.letter === randomItem.letter;
        });
        const isCorrectItem = (type === 'english-alphabet' && randomItem.letter === correctItem.letter) ||
                            (type === 'english-words' && randomItem.word === correctItem.word) ||
                            (type === 'gujarati-alphabet' && randomItem.letter === correctItem.letter);

        if (!isAlreadyAdded && !isCorrectItem) {
          distractors.push(randomItem);
        }
      }

      // Combine and shuffle options
      const options = [correctItem, ...distractors].sort(() => Math.random() - 0.5);
      
      generatedQuestions.push({
        correctItem,
        options,
      });
    }

    setQuestions(generatedQuestions);
    setCurrentIdx(0);
    setSelectedIdx(null);
    setIsAnswered(false);
    setScore(0);
    setGameState('playing');
  };

  const currentQuestion = questions[currentIdx];

  // Speaking utility
  const speakQuestion = (item: any) => {
    if (!item) return;

    if (quizType === 'english-alphabet') {
      speakText(`Can you find the letter ${item.letter}?`, 'en', 0.8);
    } else if (quizType === 'english-words') {
      speakText(`Can you find the card for ${item.word}?`, 'en', 0.8);
    } else if (quizType === 'gujarati-alphabet') {
      speakText(item.letter, 'gu', 0.8, item.englishPhonetic);
    }
  };

  // Speak when a new question loads
  useEffect(() => {
    if (gameState === 'playing' && currentQuestion && autoSpeak) {
      const timer = setTimeout(() => {
        speakQuestion(currentQuestion.correctItem);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [gameState, currentIdx]);

  const handleRepeatQuestion = () => {
    if (currentQuestion) {
      speakQuestion(currentQuestion.correctItem);
    }
  };

  const checkAnswer = (optionIdx: number) => {
    if (isAnswered) return;
    
    setSelectedIdx(optionIdx);
    setIsAnswered(true);

    const chosenItem = currentQuestion.options[optionIdx];
    const isCorrect = checkIsCorrect(chosenItem);

    if (isCorrect) {
      setScore(prev => prev + 1);
      // Play high-pitched positive speech confirmation
      const praises = ["Woohoo!", "Awesome!", "Correct!", "Great job!", "You got it!"];
      const randomPraise = praises[Math.floor(Math.random() * praises.length)];
      
      if (quizType === 'gujarati-alphabet') {
        speakText("ખૂબ સરસ", 'gu', 0.85, "Khub Saras");
      } else {
        speakText(randomPraise, 'en', 0.9);
      }
    } else {
      // Play supportive speech confirmation
      if (quizType === 'gujarati-alphabet') {
        speakText("ફરીથી પ્રયત્ન કરો", 'gu', 0.85, "Farithi Prayatna Karo");
      } else {
        speakText("Oops! Try again next time!", 'en', 0.85);
      }
    }
  };

  const checkIsCorrect = (item: any) => {
    if (!currentQuestion) return false;
    const correct = currentQuestion.correctItem;
    if (quizType === 'english-alphabet') return item.letter === correct.letter;
    if (quizType === 'english-words') return item.word === correct.word;
    return item.letter === correct.letter;
  };

  const handleNextQuestion = () => {
    if (currentIdx + 1 < TOTAL_QUESTIONS) {
      setCurrentIdx(prev => prev + 1);
      setSelectedIdx(null);
      setIsAnswered(false);
    } else {
      setGameState('summary');
      // Speak final congratulations
      const scorePercentage = (score / TOTAL_QUESTIONS) * 100;
      if (scorePercentage >= 80) {
        speakText(`Wow! You are a superstar! You scored ${score} out of 10!`, 'en', 0.85);
      } else if (scorePercentage >= 50) {
        speakText(`Great effort! You scored ${score} out of 10! Keep practicing!`, 'en', 0.85);
      } else {
        speakText(`Good try! You scored ${score} out of 10! Let's learn more and try again!`, 'en', 0.85);
      }
    }
  };

  const getPraiseMessage = () => {
    const scorePercentage = (score / TOTAL_QUESTIONS) * 100;
    if (scorePercentage === 100) return '🏆 Perfect Score! You are an Absolute Genius!';
    if (scorePercentage >= 80) return '🌟 Superb! You got almost everything right!';
    if (scorePercentage >= 50) return '🎈 Great job! Keep up the good learning!';
    return '🌱 Good attempt! Keep studying and try again!';
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
        onClick={gameState === 'playing' ? () => setGameState('lobby') : onBack}
        className="self-start flex items-center gap-2 text-pink-600 dark:text-pink-400 font-bold mb-6 hover:underline transition-all group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span>{gameState === 'playing' ? 'Exit Quiz' : 'Back to Home'}</span>
      </button>

      {/* ----------------- LOBBY STATE ----------------- */}
      {gameState === 'lobby' && (
        <div className="w-full flex flex-col items-center max-w-2xl px-4 text-center">
          <div className="relative mb-6">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 0.9, 1] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="text-7xl filter drop-shadow-md"
            >
              🏆
            </motion.div>
            <div className="absolute -top-2 -right-2 text-2xl animate-ping">✨</div>
          </div>

          <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2">
            Interactive Quiz Arena
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm max-w-md mb-8 leading-relaxed">
            Test your knowledge! Listen to the voice pronounce a letter or word, then tap the correct card in the grid! 🎧
          </p>

          <h3 className="font-extrabold text-slate-700 dark:text-slate-300 text-lg mb-4">
            Select Your Challenge Category:
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
            {/* English Letters */}
            <motion.div
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleStartQuiz('english-alphabet')}
              className="bg-white dark:bg-slate-800 rounded-3xl border-4 border-pink-100 dark:border-pink-950/60 p-6 flex flex-col items-center cursor-pointer shadow-[0_8px_20px_-4px_rgba(244,63,94,0.08)] hover:shadow-md transition-all group"
            >
              <div className="text-5xl mb-3 filter drop-shadow group-hover:scale-110 transition-transform">🔤</div>
              <h4 className="font-extrabold text-slate-800 dark:text-white text-base mb-1">English Alphabet</h4>
              <p className="text-slate-400 dark:text-slate-500 text-xs text-center mb-4">Identify Letters A to Z by sound!</p>
              <span className="mt-auto bg-pink-500 hover:bg-pink-600 text-white font-extrabold text-xs px-4 py-2 rounded-full shadow-sm">Play Now</span>
            </motion.div>

            {/* English Words */}
            <motion.div
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleStartQuiz('english-words')}
              className="bg-white dark:bg-slate-800 rounded-3xl border-4 border-amber-100 dark:border-amber-950/60 p-6 flex flex-col items-center cursor-pointer shadow-[0_8px_20px_-4px_rgba(245,158,11,0.08)] hover:shadow-md transition-all group"
            >
              <div className="text-5xl mb-3 filter drop-shadow group-hover:scale-110 transition-transform">🍎</div>
              <h4 className="font-extrabold text-slate-800 dark:text-white text-base mb-1">English Words</h4>
              <p className="text-slate-400 dark:text-slate-500 text-xs text-center mb-4">Match voice to objects and emojis!</p>
              <span className="mt-auto bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs px-4 py-2 rounded-full shadow-sm">Play Now</span>
            </motion.div>

            {/* Gujarati Alphabet */}
            <motion.div
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleStartQuiz('gujarati-alphabet')}
              className="bg-white dark:bg-slate-800 rounded-3xl border-4 border-blue-100 dark:border-blue-950/60 p-6 flex flex-col items-center cursor-pointer shadow-[0_8px_20px_-4px_rgba(59,130,246,0.08)] hover:shadow-md transition-all group"
            >
              <div className="text-5xl mb-3 filter drop-shadow group-hover:scale-110 transition-transform">🗣️</div>
              <h4 className="font-extrabold text-slate-800 dark:text-white text-base mb-1 font-gujarati">ગુજરાતી કક્કો</h4>
              <p className="text-slate-400 dark:text-slate-500 text-xs text-center mb-4">ગુજરાતી અક્ષરોના સાચા અવાજ શોધો!</p>
              <span className="mt-auto bg-blue-500 hover:bg-blue-600 text-white font-extrabold text-xs px-4 py-2 rounded-full shadow-sm">Play Now</span>
            </motion.div>
          </div>
        </div>
      )}

      {/* ----------------- PLAYING STATE ----------------- */}
      {gameState === 'playing' && currentQuestion && (
        <div className="w-full flex flex-col items-center max-w-xl px-4">
          
          {/* Header info & Score */}
          <div className="w-full flex items-center justify-between mb-6">
            <span className="px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-extrabold text-xs">
              Question {currentIdx + 1} of {TOTAL_QUESTIONS}
            </span>
            <div className="flex items-center gap-1.5 text-amber-500 font-extrabold text-sm">
              <Trophy size={16} />
              <span>Score: {score}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-8 border border-slate-200/50 dark:border-slate-800">
            <motion.div 
              className="h-full bg-gradient-to-r from-pink-500 to-amber-400"
              initial={{ width: 0 }}
              animate={{ width: `${((currentIdx + (isAnswered ? 1 : 0)) / TOTAL_QUESTIONS) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Prompt speaker visualizer */}
          <div className="w-full bg-amber-50/50 dark:bg-slate-900/40 border-3 border-amber-200/60 dark:border-slate-800/80 rounded-[32px] p-6 text-center flex flex-col items-center mb-8 relative overflow-hidden shadow-sm">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleRepeatQuestion}
              className="w-20 h-20 bg-amber-500 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-amber-200/50 dark:hover:shadow-none mb-3 transition-shadow"
            >
              <Volume2 size={36} className="animate-pulse" />
            </motion.button>
            <h3 className="font-extrabold text-slate-800 dark:text-slate-200 text-lg">
              Click the Button to Hear the Sound
            </h3>
            <p className="text-slate-400 dark:text-slate-500 text-xs font-semibold mt-1">
              Select the matching card from the grid below!
            </p>
          </div>

          {/* 2x2 grid of options */}
          <div className="grid grid-cols-2 gap-4 w-full">
            {currentQuestion.options.map((option, idx) => {
              const colorTheme = KID_COLORS[idx % KID_COLORS.length];
              const isCorrectOption = checkIsCorrect(option);
              const isSelected = selectedIdx === idx;
              
              // Determine styles based on state
              let cardStyle = `${colorTheme.bg} ${colorTheme.border} ${colorTheme.text}`;
              let borderOverride = '';
              let scaleEffect = 1;

              if (isAnswered) {
                if (isCorrectOption) {
                  // Show glowing green for correct
                  borderOverride = 'border-emerald-500 dark:border-emerald-500 ring-4 ring-emerald-200 dark:ring-emerald-900/30';
                  scaleEffect = isSelected ? 1.05 : 1;
                } else if (isSelected) {
                  // Show red for chosen incorrect
                  borderOverride = 'border-rose-500 dark:border-rose-500 ring-4 ring-rose-200 dark:ring-rose-900/30 opacity-70';
                  scaleEffect = 0.95;
                } else {
                  // Mute others
                  borderOverride = 'opacity-40';
                }
              }

              return (
                <motion.div
                  key={idx}
                  whileHover={!isAnswered ? { y: -4, scale: 1.02 } : {}}
                  whileTap={!isAnswered ? { scale: 0.98 } : {}}
                  onClick={() => checkAnswer(idx)}
                  className={`relative min-h-[160px] md:min-h-[180px] rounded-[32px] border-4 flex flex-col items-center justify-center cursor-pointer select-none p-4 transition-all duration-300 ${cardStyle} ${borderOverride}`}
                  style={{ scale: scaleEffect }}
                >
                  {/* Option visual contents depending on type */}
                  {quizType === 'english-alphabet' && (
                    <span className="text-6xl font-black">{option.letter}</span>
                  )}

                  {quizType === 'english-words' && (
                    <div className="flex flex-col items-center">
                      <span className="text-5xl mb-2 filter drop-shadow">{option.emoji}</span>
                      <span className="text-lg font-black tracking-tight">{option.word}</span>
                    </div>
                  )}

                  {quizType === 'gujarati-alphabet' && (
                    <div className="flex flex-col items-center">
                      <span className="text-5xl font-extrabold font-gujarati mb-1">{option.letter}</span>
                      <span className="text-xs font-semibold text-slate-500 tracking-wide">
                        {option.englishPhonetic}
                      </span>
                    </div>
                  )}

                  {/* Icon indicators */}
                  {isAnswered && isCorrectOption && (
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md">
                      <Check size={18} strokeWidth={3} />
                    </div>
                  )}

                  {isAnswered && isSelected && !isCorrectOption && (
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-md">
                      <X size={18} strokeWidth={3} />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Next Button / Score Overlay */}
          <AnimatePresence>
            {isAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="w-full mt-8 flex flex-col items-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNextQuestion}
                  className="w-full py-4 bg-blue-500 hover:bg-blue-600 text-white font-extrabold text-lg rounded-[24px] shadow-lg shadow-blue-100 dark:shadow-none flex items-center justify-center gap-2"
                >
                  <span>{currentIdx + 1 === TOTAL_QUESTIONS ? 'View Results' : 'Next Question'}</span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* ----------------- SUMMARY STATE ----------------- */}
      {gameState === 'summary' && (
        <div className="w-full flex flex-col items-center max-w-md px-4 text-center">
          
          {/* Main big trophy badge */}
          <div className="relative mb-6">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', damping: 15 }}
              className="w-32 h-32 rounded-full bg-amber-100 dark:bg-amber-950/40 border-4 border-amber-300 dark:border-amber-800 flex items-center justify-center text-6xl shadow-sm"
            >
              🎉
            </motion.div>
            <motion.div 
              animate={{ y: [-5, 5, -5] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="absolute -top-3 -right-3 text-4xl"
            >
              👑
            </motion.div>
          </div>

          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
            Quiz Completed!
          </h2>
          <p className="text-amber-600 dark:text-amber-400 font-extrabold text-base mb-6 flex items-center justify-center gap-1.5">
            <Award size={20} />
            <span>{getPraiseMessage()}</span>
          </p>

          {/* Stars visualizer based on score */}
          <div className="flex items-center gap-2 justify-center mb-8">
            {Array.from({ length: 5 }).map((_, i) => {
              const starsRequired = (i + 1) * 2;
              const isLit = score >= starsRequired || (i === 0 && score > 0);
              return (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.1, type: 'spring' }}
                >
                  <Star
                    size={40}
                    className={isLit ? 'text-amber-400 fill-amber-400' : 'text-slate-200 dark:text-slate-800'}
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Score card detail */}
          <div className="w-full bg-slate-50 dark:bg-slate-900 border-3 border-slate-200 dark:border-slate-800 rounded-[32px] p-6 mb-8 flex justify-around">
            <div className="text-center">
              <span className="block text-slate-400 dark:text-slate-500 font-extrabold text-xs uppercase tracking-wider mb-1">Correct</span>
              <span className="text-3xl font-black text-emerald-500">{score}</span>
            </div>
            <div className="w-0.5 bg-slate-200 dark:bg-slate-800" />
            <div className="text-center">
              <span className="block text-slate-400 dark:text-slate-500 font-extrabold text-xs uppercase tracking-wider mb-1">Total</span>
              <span className="text-3xl font-black text-slate-700 dark:text-slate-300">{TOTAL_QUESTIONS}</span>
            </div>
            <div className="w-0.5 bg-slate-200 dark:bg-slate-800" />
            <div className="text-center">
              <span className="block text-slate-400 dark:text-slate-500 font-extrabold text-xs uppercase tracking-wider mb-1">Grade</span>
              <span className="text-3xl font-black text-blue-500">
                {score === TOTAL_QUESTIONS ? 'A+' : score >= 8 ? 'A' : score >= 5 ? 'B' : 'C'}
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-4 w-full">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleStartQuiz(quizType!)}
              className="py-4 bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-lg rounded-[24px] shadow-lg shadow-amber-100 dark:shadow-none flex items-center justify-center gap-2"
            >
              <RotateCcw size={20} />
              <span>Try Again</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setGameState('lobby')}
              className="py-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-extrabold text-lg rounded-[24px] flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700"
            >
              <span>Back to Quiz Menu</span>
            </motion.button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
