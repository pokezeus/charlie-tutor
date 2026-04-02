// Charlie Tutor Curriculum Data Structure
// Aligned with UK National Curriculum Key Stage 2 (ages 7-11)

export type Subject = 'math' | 'english' | 'chinese';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Exercise {
  id: string;
  subject: Subject;
  topic: string;
  question: string;
  answer: string | string[]; // Can be single answer or multiple choice options
  correctAnswer: string; // The actual correct answer for validation
  difficulty: Difficulty;
  points: number;
  hint?: string;
}

export interface Level {
  id: string;
  name: string;
  subject: Subject;
  minAge: number;
  maxAge: number;
  topics: string[];
  exercises: Exercise[];
}

// Curriculum structure by subject
export const CURRICULUM = {
  math: {
    name: 'Mathematics',
    topics: [
      'Multiplication Tables',
      'Division',
      'Addition & Subtraction',
      'Fractions',
      'Decimals',
      'Percentages',
      'Geometry',
      'Measurement',
    ],
  },
  english: {
    name: 'English',
    topics: [
      'Phonics',
      'Spelling',
      'Grammar',
      'Reading Comprehension',
      'Vocabulary',
      'Writing',
    ],
  },
  chinese: {
    name: 'Chinese (Mandarin)',
    topics: [
      '拼音 (Pinyin)',
      '汉字 (Characters)',
      '声调 (Tones)',
      '词汇 (Vocabulary)',
      '语法 (Grammar)',
      '阅读 (Reading)',
    ],
  },
} as const;

// Exercise generation functions
export function generateMultiplicationExercise(table: number, difficulty: Difficulty): Exercise {
  const multiplier = difficulty === 'easy' 
    ? Math.floor(Math.random() * 5) + 1  // 1-5
    : difficulty === 'medium'
    ? Math.floor(Math.random() * 7) + 3  // 3-9
    : Math.floor(Math.random() * 10) + 1; // 1-10

  const question = `${table} × ${multiplier} = ?`;
  const answer = table * multiplier;

  return {
    id: `math-mult-${table}-${multiplier}-${Date.now()}`,
    subject: 'math',
    topic: 'Multiplication Tables',
    question,
    answer: answer.toString(),
    correctAnswer: answer.toString(),
    difficulty,
    points: difficulty === 'easy' ? 10 : difficulty === 'medium' ? 20 : 30,
    hint: `Think of ${table} groups of ${multiplier}`,
  };
}

export function generatePhonicsExercise(pattern: 'CVC' | 'CVVC' | 'CCVC', difficulty: Difficulty): Exercise {
  const cvcWords = ['cat', 'dog', 'pig', 'sun', 'hat', 'bed', 'cup', 'log'];
  const cvvcWords = ['rain', 'boat', 'seed', 'moon', 'team', 'coat', 'beach', 'road'];
  const ccvcWords = ['stop', 'frog', 'plan', 'crab', 'spot', 'grad', 'twin', 'swim'];

  const wordList = pattern === 'CVC' ? cvcWords : pattern === 'CVVC' ? cvvcWords : ccvcWords;
  const word = wordList[Math.floor(Math.random() * wordList.length)];
  
  // Remove one letter for the exercise
  const missingIndex = Math.floor(Math.random() * word.length);
  const question = `Complete the word: ${word.slice(0, missingIndex)}_ ${word.slice(missingIndex + 1)}`;
  
  // Generate options
  const vowels = 'aeiou';
  const options = [word[missingIndex]];
  while (options.length < 4) {
    const randomVowel = vowels[Math.floor(Math.random() * vowels.length)];
    if (!options.includes(randomVowel)) {
      options.push(randomVowel);
    }
  }

  return {
    id: `english-phonics-${pattern}-${word}-${Date.now()}`,
    subject: 'english',
    topic: 'Phonics',
    question: `${question} (${pattern} pattern)`,
    answer: options.sort().join('|'),
    correctAnswer: word[missingIndex],
    difficulty,
    points: difficulty === 'easy' ? 10 : difficulty === 'medium' ? 20 : 30,
    hint: `Listen to the sound: ${word}`,
  };
}

export function generatePinyinExercise(type: 'tone' | 'spelling', difficulty: Difficulty): Exercise {
  const pinyinTones = [
    { pinyin: 'mā', char: '妈', meaning: 'mother', tone: 1 },
    { pinyin: 'má', char: '麻', meaning: 'hemp', tone: 2 },
    { pinyin: 'mǎ', char: '马', meaning: 'horse', tone: 3 },
    { pinyin: 'mà', char: '骂', meaning: 'scold', tone: 4 },
    { pinyin: 'ba', char: '吧', meaning: 'particle', tone: 0 },
    { pinyin: 'bà', char: '爸', meaning: 'father', tone: 4 },
    { pinyin: 'bǐ', char: '笔', meaning: 'pen', tone: 3 },
    { pinyin: 'hǎo', char: '好', meaning: 'good', tone: 3 },
  ];

  const item = pinyinTones[Math.floor(Math.random() * pinyinTones.length)];
  
  if (type === 'tone') {
    return {
      id: `chinese-pinyin-tone-${item.pinyin}-${Date.now()}`,
      subject: 'chinese',
      topic: '拼音 (Pinyin)',
      question: `What tone is ${item.pinyin}? (0-4)`,
      answer: ['0', '1', '2', '3', '4'],
      correctAnswer: item.tone.toString(),
      difficulty,
      points: difficulty === 'easy' ? 10 : difficulty === 'medium' ? 20 : 30,
      hint: `Tone mark: ${item.tone === 1 ? 'flat' : item.tone === 2 ? 'rising' : item.tone === 3 ? 'dip' : item.tone === 4 ? 'falling' : 'neutral'}`,
    };
  } else {
    return {
      id: `chinese-pinyin-spelling-${item.char}-${Date.now()}`,
      subject: 'chinese',
      topic: '拼音 (Pinyin)',
      question: `What is the pinyin for ${item.char} (${item.meaning})?`,
      answer: item.pinyin,
      correctAnswer: item.pinyin,
      difficulty,
      points: difficulty === 'easy' ? 10 : difficulty === 'medium' ? 20 : 30,
      hint: `Remember the tone mark`,
    };
  }
}

// Performance tracking thresholds
export const PERFORMANCE_THRESHOLDS = {
  excellent: 0.9,   // 90%+ accuracy
  good: 0.75,       // 75-89% accuracy
  average: 0.6,     // 60-74% accuracy
  needsPractice: 0.5, // 50-59% accuracy
  struggling: 0.0,  // <50% accuracy
};

export const DIFFICULTY_PROGRESS = {
  easy: { minAccuracy: 0.8, exercisesToAdvance: 5 },
  medium: { minAccuracy: 0.75, exercisesToAdvance: 5 },
  hard: { minAccuracy: 0.7, exercisesToAdvance: 5 },
};
