'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Timer, HelpCircle, Check, X, Sparkles, Trophy } from 'lucide-react';

interface MultiplicationBingoProps {
  onGameComplete: (score: number, correct: number, total: number, earnedCoins: number) => void;
  onExit: () => void;
}

// HK Primary 3 Multiplication Tables (1-10)
const multiplicationTables = [
  { table: 1, questions: [
      { q: '1 × 5', a: 5, hint: 'Any number multiplied by 1 stays the same' },
      { q: '1 × 8', a: 8, hint: '1 times any number equals that number' },
      { q: '1 × 9', a: 9, hint: 'Think: one group of 9' },
    ]
  },
  { table: 2, questions: [
      { q: '2 × 3', a: 6, hint: 'Double 3: 3 + 3' },
      { q: '2 × 6', a: 12, hint: 'Double 6: 6 + 6' },
      { q: '2 × 7', a: 14, hint: 'Double 7: 7 + 7' },
      { q: '2 × 9', a: 18, hint: 'Double 9: 9 + 9' },
    ]
  },
  { table: 3, questions: [
      { q: '3 × 4', a: 12, hint: '3 groups of 4: 4 + 4 + 4' },
      { q: '3 × 6', a: 18, hint: '3 groups of 6: 6 + 6 + 6' },
      { q: '3 × 7', a: 21, hint: '3 groups of 7: 7 + 7 + 7' },
    ]
  },
  { table: 4, questions: [
      { q: '4 × 5', a: 20, hint: 'Double 5 is 10, double again: 20' },
      { q: '4 × 6', a: 24, hint: 'Double 6 is 12, double again: 24' },
      { q: '4 × 8', a: 32, hint: 'Double 8 is 16, double again: 32' },
    ]
  },
  { table: 5, questions: [
      { q: '5 × 3', a: 15, hint: 'Count by 5s: 5, 10, 15' },
      { q: '5 × 6', a: 30, hint: '5 × 6: ends in 0 or 5, this time 0' },
      { q: '5 × 9', a: 45, hint: '5 × 9: half of 10 × 9 (90)' },
    ]
  },
  { table: 6, questions: [
      { q: '6 × 4', a: 24, hint: '6 × 4: same as 4 × 6' },
      { q: '6 × 7', a: 42, hint: '6 × 7: 6 more than 6 × 6 (36)' },
      { q: '6 × 8', a: 48, hint: '6 × 8: double 6 × 4 (24)' },
    ]
  },
  { table: 7, questions: [
      { q: '7 × 6', a: 42, hint: '7 × 6: 7 more than 6 × 6 (36)' },
      { q: '7 × 8', a: 56, hint: '7 × 8: 5, 6, 7, 8 (trick: 56 = 7×8)' },
      { q: '7 × 9', a: 63, hint: '7 × 9: 7 less than 7 × 10 (70)' },
    ]
  },
  { table: 8, questions: [
      { q: '8 × 6', a: 48, hint: '8 × 6: double 4 × 6 (24)' },
      { q: '8 × 7', a: 56, hint: '8 × 7: double 4 × 7 (28)' },
      { q: '8 × 9', a: 72, hint: '8 × 9: 8 less than 8 × 10 (80)' },
    ]
  },
  { table: 9, questions: [
      { q: '9 × 6', a: 54, hint: '9 × 6: digits add to 9 (5+4=9)' },
      { q: '9 × 7', a: 63, hint: '9 × 7: digits add to 9 (6+3=9)' },
      { q: '9 × 8', a: 72, hint: '9 × 8: digits add to 9 (7+2=9)' },
    ]
  },
  { table: 10, questions: [
      { q: '10 × 4', a: 40, hint: 'Add a zero: 4 becomes 40' },
      { q: '10 × 7', a: 70, hint: 'Add a zero: 7 becomes 70' },
      { q: '10 × 9', a: 90, hint: 'Add a zero: 9 becomes 90' },
    ]
  },
];

// K3 Simple Counting & Addition (easier level)
const k3Questions = [
  { q: '2 + 3', a: 5, hint: 'Count on your fingers: 2... 3, 4, 5' },
  { q: '4 + 1', a: 5, hint: 'One more than 4' },
  { q: '3 + 2', a: 5, hint: 'Same as 2 + 3' },
  { q: '5 + 0', a: 5, hint: 'Adding 0 keeps it the same' },
  { q: '1 + 4', a: 5, hint: 'Start at 1, count 4 more' },
];

export function MultiplicationBingo({ onGameComplete, onExit }: MultiplicationBingoProps) {
  const [grid, setGrid] = useState<number[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [timeLeft, setTimeLeft] = useState(90); // 90 seconds for P3
  const [gameEnded, setGameEnded] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [streak, setStreak] = useState(0);
  const [difficulty, setDifficulty] = useState<'P3' | 'K3'>('P3');

  function generateGrid(answer: number): number[] {
    const numbers: number[] = [answer]; // Always include the correct answer
    
    // Generate 8 more random numbers (avoiding the answer)
    while (numbers.length < 9) {
      // Generate numbers that could plausibly be answers (1-100)
      const num = Math.floor(Math.random() * 100) + 1;
      if (!numbers.includes(num)) {
        numbers.push(num);
      }
    }
    
    // Shuffle the grid
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    
    return numbers;
  }

  function generateQuestion() {
    const tableIndex = Math.floor(Math.random() * multiplicationTables.length);
    const table = multiplicationTables[tableIndex];
    const qIndex = Math.floor(Math.random() * table.questions.length);
    return table.questions[qIndex];
  }

  useEffect(() => {
    if (!gameEnded) {
      const question = generateQuestion();
      setCurrentQuestion(question);
      setGrid(generateGrid(question.a)); // Generate grid WITH the answer
      setShowHint(false);
    }
  }, [gameEnded]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const endGame = () => {
    setGameEnded(true);
    const accuracy = totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;
    const earnedCoins = score * 10 + (streak > 3 ? streak * 2 : 0);
    onGameComplete(score, score, totalQuestions, earnedCoins);
  };

  const handleNumberClick = (number: number) => {
    if (!currentQuestion || gameEnded) return;
    
    setSelectedNumber(number);
    
    if (number === currentQuestion.a) {
      setScore((prev) => prev + 1);
      setStreak((prev) => prev + 1);
      // Generate new question AND new grid with the new answer
      setTimeout(() => {
        const newQuestion = generateQuestion();
        setCurrentQuestion(newQuestion);
        setGrid(generateGrid(newQuestion.a)); // New grid with new answer
        setSelectedNumber(null);
        setShowHint(false);
      }, 500);
    } else {
      setStreak(0);
      setTimeout(() => {
        setSelectedNumber(null);
      }, 500);
    }
    
    setTotalQuestions((prev) => prev + 1);
  };

  const showHintHandler = () => {
    setShowHint(true);
  };

  if (gameEnded) {
    const accuracy = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
    const earnedCoins = score * 10 + (streak > 3 ? streak * 2 : 0);
    
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="text-6xl mb-4">🎉</div>
          <CardTitle className="text-3xl">Game Over!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-sm text-muted-foreground">Score</div>
              <div className="text-3xl font-bold text-blue-600">{score}/{totalQuestions}</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="text-sm text-muted-foreground">Accuracy</div>
              <div className="text-3xl font-bold text-green-600">{accuracy}%</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg text-center">
              <div className="text-sm text-muted-foreground">Coins Earned</div>
              <div className="text-3xl font-bold text-yellow-600">{earnedCoins} 💰</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <div className="text-sm text-muted-foreground">XP Earned</div>
              <div className="text-3xl font-bold text-purple-600">{score * 10} ⭐</div>
            </div>
          </div>
          
          {accuracy === 100 && totalQuestions >= 5 && (
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-4 rounded-lg text-center text-white">
              <Trophy className="w-12 h-12 mx-auto mb-2" />
              <div className="font-bold text-xl">Perfect Score! 🌟</div>
              <div className="text-sm">You're a multiplication master!</div>
            </div>
          )}
          
          <Button onClick={onExit} className="w-full" size="lg">
            Back to Dashboard
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl">Multiplication Bingo</CardTitle>
            <p className="text-sm text-muted-foreground">
              {difficulty === 'P3' ? 'Primary 3 Level' : 'K3 Level'} • Find the answer in the grid
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="text-lg px-3 py-1">
              Score: {score}
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1 text-lg px-3 py-1">
              <Timer className="w-4 h-4" />
              {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </Badge>
            {streak > 2 && (
              <Badge className="bg-orange-500">
                🔥 {streak} streak!
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {currentQuestion && (
          <div className="text-center space-y-4">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-xl text-white">
              <div className="text-sm mb-2 opacity-90">Solve this:</div>
              <div className="text-5xl font-bold mb-4">{currentQuestion.q} = ?</div>
              
              <div className="flex items-center justify-center gap-4 mb-4">
                <Button
                  onClick={showHintHandler}
                  variant="outline"
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                >
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Show Hint
                </Button>
                {showHint && (
                  <div className="bg-white/20 px-4 py-2 rounded-lg animate-in fade-in">
                    <span className="text-sm">💡 {currentQuestion.hint}</span>
                  </div>
                )}
              </div>
              
              <div className="text-sm opacity-90">
                Find the answer in the bingo grid below 👇
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-3 gap-4">
          {grid.map((number, index) => (
            <Button
              key={index}
              variant={selectedNumber === number ? 'default' : 'outline'}
              className="h-20 text-2xl font-bold transition-all"
              onClick={() => handleNumberClick(number)}
              disabled={gameEnded}
            >
              {number}
            </Button>
          ))}
        </div>

        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <div>Questions answered: {totalQuestions}</div>
          <Button onClick={endGame} variant="ghost" size="sm">
            Exit Game
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
