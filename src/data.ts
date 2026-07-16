/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { EnglishLetter, EnglishWordItem, GujaratiLetter } from './types';

export const KID_COLORS = [
  { bg: 'bg-pink-100 dark:bg-pink-950/40', border: 'border-pink-300 dark:border-pink-800', text: 'text-pink-600 dark:text-pink-400', button: 'bg-pink-500 hover:bg-pink-600 text-white shadow-pink-200 dark:shadow-none' },
  { bg: 'bg-blue-100 dark:bg-blue-950/40', border: 'border-blue-300 dark:border-blue-800', text: 'text-blue-600 dark:text-blue-400', button: 'bg-blue-500 hover:bg-blue-600 text-white shadow-blue-200 dark:shadow-none' },
  { bg: 'bg-green-100 dark:bg-green-950/40', border: 'border-green-300 dark:border-green-800', text: 'text-green-600 dark:text-green-400', button: 'bg-green-500 hover:bg-green-600 text-white shadow-green-200 dark:shadow-none' },
  { bg: 'bg-amber-100 dark:bg-amber-950/40', border: 'border-amber-300 dark:border-amber-800', text: 'text-amber-600 dark:text-amber-400', button: 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-200 dark:shadow-none' },
  { bg: 'bg-purple-100 dark:bg-purple-950/40', border: 'border-purple-300 dark:border-purple-800', text: 'text-purple-600 dark:text-purple-400', button: 'bg-purple-500 hover:bg-purple-600 text-white shadow-purple-200 dark:shadow-none' },
  { bg: 'bg-orange-100 dark:bg-orange-950/40', border: 'border-orange-300 dark:border-orange-800', text: 'text-orange-600 dark:text-orange-400', button: 'bg-orange-500 hover:bg-orange-600 text-white shadow-orange-200 dark:shadow-none' },
  { bg: 'bg-teal-100 dark:bg-teal-950/40', border: 'border-teal-300 dark:border-teal-800', text: 'text-teal-600 dark:text-teal-400', button: 'bg-teal-500 hover:bg-teal-600 text-white shadow-teal-200 dark:shadow-none' },
  { bg: 'bg-rose-100 dark:bg-rose-950/40', border: 'border-rose-300 dark:border-rose-800', text: 'text-rose-600 dark:text-rose-400', button: 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-200 dark:shadow-none' },
  { bg: 'bg-sky-100 dark:bg-sky-950/40', border: 'border-sky-300 dark:border-sky-800', text: 'text-sky-600 dark:text-sky-400', button: 'bg-sky-500 hover:bg-sky-600 text-white shadow-sky-200 dark:shadow-none' },
  { bg: 'bg-violet-100 dark:bg-violet-950/40', border: 'border-violet-300 dark:border-violet-800', text: 'text-violet-600 dark:text-violet-400', button: 'bg-violet-500 hover:bg-violet-600 text-white shadow-violet-200 dark:shadow-none' },
  { bg: 'bg-lime-100 dark:bg-lime-950/40', border: 'border-lime-300 dark:border-lime-800', text: 'text-lime-600 dark:text-lime-400', button: 'bg-lime-500 hover:bg-lime-600 text-white shadow-lime-200 dark:shadow-none' },
  { bg: 'bg-emerald-100 dark:bg-emerald-950/40', border: 'border-emerald-300 dark:border-emerald-800', text: 'text-emerald-600 dark:text-emerald-400', button: 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-200 dark:shadow-none' }
];

export const ENGLISH_ALPHABET: EnglishLetter[] = Array.from({ length: 26 }, (_, i) => {
  const char = String.fromCharCode(65 + i); // A to Z
  return {
    letter: char,
    color: `color-${i % KID_COLORS.length}`
  };
});

export const ENGLISH_WORDS: EnglishWordItem[] = [
  { letter: 'A', word: 'Apple', emoji: '🍎', color: 'color-0' },
  { letter: 'B', word: 'Ball', emoji: '⚽', color: 'color-1' },
  { letter: 'C', word: 'Cat', emoji: '🐱', color: 'color-2' },
  { letter: 'D', word: 'Dog', emoji: '🐶', color: 'color-3' },
  { letter: 'E', word: 'Elephant', emoji: '🐘', color: 'color-4' },
  { letter: 'F', word: 'Fish', emoji: '🐟', color: 'color-5' },
  { letter: 'G', word: 'Grapes', emoji: '🍇', color: 'color-6' },
  { letter: 'H', word: 'Horse', emoji: '🐴', color: 'color-7' },
  { letter: 'I', word: 'Ice Cream', emoji: '🍦', color: 'color-8' },
  { letter: 'J', word: 'Jellyfish', emoji: '🪼', color: 'color-9' },
  { letter: 'K', word: 'Kite', emoji: '🪁', color: 'color-10' },
  { letter: 'L', word: 'Lion', emoji: '🦁', color: 'color-11' },
  { letter: 'M', word: 'Monkey', emoji: '🐒', color: 'color-0' },
  { letter: 'N', word: 'Nest', emoji: '🪹', color: 'color-1' },
  { letter: 'O', word: 'Orange', emoji: '🍊', color: 'color-2' },
  { letter: 'P', word: 'Parrot', emoji: '🦜', color: 'color-3' },
  { letter: 'Q', word: 'Queen', emoji: '👸', color: 'color-4' },
  { letter: 'R', word: 'Rabbit', emoji: '🐰', color: 'color-5' },
  { letter: 'S', word: 'Sun', emoji: '☀️', color: 'color-6' },
  { letter: 'T', word: 'Tiger', emoji: '🐯', color: 'color-7' },
  { letter: 'U', word: 'Umbrella', emoji: '☂️', color: 'color-8' },
  { letter: 'V', word: 'Violin', emoji: '🎻', color: 'color-9' },
  { letter: 'W', word: 'Watermelon', emoji: '🍉', color: 'color-10' },
  { letter: 'X', word: 'Xylophone', emoji: '🪗', color: 'color-11' },
  { letter: 'Y', word: 'Yak', emoji: '🐂', color: 'color-0' },
  { letter: 'Z', word: 'Zebra', emoji: '🦓', color: 'color-1' }
];

export const GUJARATI_ALPHABET: GujaratiLetter[] = [
  // Vowels (Svar)
  { letter: 'અ', englishPhonetic: 'A', word: 'અજગર', wordEmoji: '🐍', wordEnglish: 'Python', color: 'color-0' },
  { letter: 'આ', englishPhonetic: 'Aa', word: 'આગગાડી', wordEmoji: '🚂', wordEnglish: 'Train', color: 'color-1' },
  { letter: 'ઇ', englishPhonetic: 'I', word: 'ઇમારત', wordEmoji: '🏢', wordEnglish: 'Building', color: 'color-2' },
  { letter: 'ઈ', englishPhonetic: 'Ee', word: 'ઈશ્વર', wordEmoji: '🛕', wordEnglish: 'God / Temple', color: 'color-3' },
  { letter: 'ઉ', englishPhonetic: 'U', word: 'ઉપવન', wordEmoji: '🏡', wordEnglish: 'Garden', color: 'color-4' },
  { letter: 'ઊ', englishPhonetic: 'Oo', word: 'ઊન', wordEmoji: '🧶', wordEnglish: 'Wool', color: 'color-5' },
  { letter: 'એ', englishPhonetic: 'E', word: 'એકતા', wordEmoji: '1️⃣', wordEnglish: 'Unity', color: 'color-6' },
  { letter: 'ઐ', englishPhonetic: 'Ai', word: 'ઐરાવત', wordEmoji: '🐘', wordEnglish: 'Elephant', color: 'color-7' },
  { letter: 'ઓ', englishPhonetic: 'O', word: 'ઓજાર', wordEmoji: '🔧', wordEnglish: 'Tools', color: 'color-8' },
  { letter: 'ઔ', englishPhonetic: 'Au', word: 'ઔષધ', wordEmoji: '💊', wordEnglish: 'Medicine', color: 'color-9' },
  { letter: 'અં', englishPhonetic: 'Am', word: 'અંજીર', wordEmoji: '🫚', wordEnglish: 'Fig', color: 'color-10' },
  { letter: 'અઃ', englishPhonetic: 'Aha', word: 'નમઃ', wordEmoji: '🙏', wordEnglish: 'Namaste', color: 'color-11' },

  // Consonants (Vyanjan)
  { letter: 'ક', englishPhonetic: 'Ka', word: 'કમળ', wordEmoji: '🪷', wordEnglish: 'Lotus', color: 'color-0' },
  { letter: 'ખ', englishPhonetic: 'Kha', word: 'ખલ', wordEmoji: '🥣', wordEnglish: 'Mortar', color: 'color-1' },
  { letter: 'ગ', englishPhonetic: 'Ga', word: 'ગણપતિ', wordEmoji: '🔱', wordEnglish: 'Lord Ganesha', color: 'color-2' },
  { letter: 'ઘ', englishPhonetic: 'Gha', word: 'ઘર', wordEmoji: '🏠', wordEnglish: 'House', color: 'color-3' },
  { letter: 'ચ', englishPhonetic: 'Cha', word: 'ચકલી', wordEmoji: '🐦', wordEnglish: 'Sparrow', color: 'color-4' },
  { letter: 'છ', englishPhonetic: 'Chha', word: 'છત્રી', wordEmoji: '☂️', wordEnglish: 'Umbrella', color: 'color-5' },
  { letter: 'જ', englishPhonetic: 'Ja', word: 'જમરૂખ', wordEmoji: '🍏', wordEnglish: 'Guava', color: 'color-6' },
  { letter: 'ઝ', englishPhonetic: 'Jha', word: 'ઝભ્ભું', wordEmoji: '🥋', wordEnglish: 'Kurtas', color: 'color-7' },
  { letter: 'ટ', englishPhonetic: 'Ta', word: 'ટમેટું', wordEmoji: '🍅', wordEnglish: 'Tomato', color: 'color-8' },
  { letter: 'ઠ', englishPhonetic: 'Tha', word: 'ઠળિયો', wordEmoji: '🍒', wordEnglish: 'Seed', color: 'color-9' },
  { letter: 'ડ', englishPhonetic: 'Da', word: 'ડમરુ', wordEmoji: '🪘', wordEnglish: 'Drum', color: 'color-10' },
  { letter: 'ઢ', englishPhonetic: 'Dha', word: 'ઢગલો', wordEmoji: '⛰️', wordEnglish: 'Pile', color: 'color-11' },
  { letter: 'ણ', englishPhonetic: 'Na', word: 'ફેણ', wordEmoji: '🐍', wordEnglish: 'Cobra Hood', color: 'color-0' },
  { letter: 'ત', englishPhonetic: 'Ta', word: 'તપેલી', wordEmoji: '🫕', wordEnglish: 'Pot', color: 'color-1' },
  { letter: 'થ', englishPhonetic: 'Tha', word: 'થડ', wordEmoji: '🪵', wordEnglish: 'Tree Trunk', color: 'color-2' },
  { letter: 'દ', englishPhonetic: 'Da', word: 'દડો', wordEmoji: '⚽', wordEnglish: 'Ball', color: 'color-3' },
  { letter: 'ધ', englishPhonetic: 'Dha', word: 'ધનુષ', wordEmoji: '🏹', wordEnglish: 'Bow', color: 'color-4' },
  { letter: 'ન', englishPhonetic: 'Na', word: 'નળ', wordEmoji: '🚰', wordEnglish: 'Tap', color: 'color-5' },
  { letter: 'પ', englishPhonetic: 'Pa', word: 'પતંગ', wordEmoji: '🪁', wordEnglish: 'Kite', color: 'color-6' },
  { letter: 'ફ', englishPhonetic: 'Pha', word: 'ફટાકડા', wordEmoji: '🎆', wordEnglish: 'Firecrackers', color: 'color-7' },
  { letter: 'બ', englishPhonetic: 'Ba', word: 'બતક', wordEmoji: '🦆', wordEnglish: 'Duck', color: 'color-8' },
  { letter: 'ભ', englishPhonetic: 'Bha', word: 'ભમરડો', wordEmoji: '🪀', wordEnglish: 'Spinning Top', color: 'color-9' },
  { letter: 'મ', englishPhonetic: 'Ma', word: 'મરચું', wordEmoji: '🌶️', wordEnglish: 'Chilli', color: 'color-10' },
  { letter: 'ય', englishPhonetic: 'Ya', word: 'યજ્ઞ', wordEmoji: '🔥', wordEnglish: 'Sacred Fire', color: 'color-11' },
  { letter: 'ર', englishPhonetic: 'Ra', word: 'રમકડું', wordEmoji: '🧸', wordEnglish: 'Toy', color: 'color-0' },
  { letter: 'લ', englishPhonetic: 'La', word: 'લખોટી', wordEmoji: '🔮', wordEnglish: 'Marbles', color: 'color-1' },
  { letter: 'વ', englishPhonetic: 'Va', word: 'વહાણ', wordEmoji: '🚢', wordEnglish: 'Ship', color: 'color-2' },
  { letter: 'શ', englishPhonetic: 'Sha', word: 'શરણાઈ', wordEmoji: '🎷', wordEnglish: 'Clarinet', color: 'color-3' },
  { letter: 'ષ', englishPhonetic: 'Sha', word: 'ષટ્કોણ', wordEmoji: '⬡', wordEnglish: 'Hexagon', color: 'color-4' },
  { letter: 'સ', englishPhonetic: 'Sa', word: 'સસલું', wordEmoji: '🐰', wordEnglish: 'Rabbit', color: 'color-5' },
  { letter: 'હ', englishPhonetic: 'Ha', word: 'હરણ', wordEmoji: '🦌', wordEnglish: 'Deer', color: 'color-6' },
  { letter: 'ળ', englishPhonetic: 'La', word: 'નળ', wordEmoji: '🚰', wordEnglish: 'Water Tap', color: 'color-7' },
  { letter: 'ક્ષ', englishPhonetic: 'Ksha', word: 'ક્ષત્રિય', wordEmoji: '⚔️', wordEnglish: 'Warrior', color: 'color-8' },
  { letter: 'જ્ઞ', englishPhonetic: 'Gnya', word: 'યજ્ઞ', wordEmoji: '🧠', wordEnglish: 'Sage', color: 'color-9' }
];

export const FUTURE_SECTIONS = [
  { id: 'gujarati-words', title: 'Gujarati Words', emoji: '📖', category: 'Gujarati', desc: 'Learn common words for Gujarati alphabets.' },
  { id: 'english-numbers', title: 'English Numbers', emoji: '🔢', category: 'English', desc: 'Count numbers 1 to 100 with items!' },
  { id: 'gujarati-numbers', title: 'Gujarati Numbers', emoji: '૧૨૩', category: 'Gujarati', desc: 'Learn to write and count numbers in Gujarati.' },
  { id: 'barakhadi', title: 'Barakhadi (બારાખડી)', emoji: '📚', category: 'Gujarati', desc: 'Learn vowels additions to consonants.' },
  { id: 'quiz', title: 'Quiz Room', emoji: '🏆', category: 'General', desc: 'Fun interactive quiz to test what you learned!' },
  { id: 'drawing', title: 'Drawing Board', emoji: '🎨', category: 'Activity', desc: 'Interactive canvas for drawing and sketching.' },
  { id: 'animal-sounds', title: 'Animal Sounds', emoji: '🦁', category: 'Activity', desc: 'Hear what beautiful animals sound like!' },
  { id: 'colors-shapes', title: 'Colors & Shapes', emoji: '🔺', category: 'General', desc: 'Identify basic colors and geometric shapes.' },
  { id: 'days-months', title: 'Days & Months', emoji: '📅', category: 'General', desc: 'Learn week days and monthly calendars.' },
];
