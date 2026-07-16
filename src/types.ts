/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface EnglishLetter {
  letter: string;
  color: string;
}

export interface EnglishWordItem {
  letter: string;
  word: string;
  emoji: string;
  color: string;
}

export interface GujaratiLetter {
  letter: string;
  englishPhonetic: string;
  word?: string;
  wordEmoji?: string;
  wordEnglish?: string;
  color: string;
}

export type ViewType = 'home' | 'english-alphabet' | 'english-words' | 'gujarati-alphabet' | 'future-room' | 'category-english' | 'category-gujarati' | 'quiz';
export type CategoryType = 'english' | 'gujarati';
