import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Timer, Check, X } from 'lucide-react';

interface MultiplicationBingoProps {
  onGameComplete: (score: number, correct: number, total: number, earnedCoins: number) => void;
  onExit: () => void;
}

interface Question {
  num1: number;
  num2: number;
  answer: number;
}

export function MultiplicationBingo({ onGameComplete, onExit }: MultiplicationBingoProps) {
  const [grid] = useState<number[]>(() => generateGrid());
  const [question, setQuestion] = useState<Question | null>(null);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameEnded, setGameEnded] = useState(false);

  function generateGrid(): number[] {
    const numbers: number[] = [];
    while (numbers.length < 9) {
      const num = Math.floor(Math.random() * 81) + 1;
      if (!numbers.includes(num)) {
        numbers.push(num);
      }
    }
    return numbers;
  }

  function generateQuestion(): Question {
    const num1 = Math.floor(Math.random() * 9) + 2;
    const num2 = Math.floor(Math.random() * 9) + 2;
    return { num1, num2, answer: num1 * num2 };
  }

  useEffect(() => {
    if (!gameEnded) {
      setQuestion(generateQuestion());
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
    const earnedCoins = score * 10;
    onGameComplete(score, score, score + 1, earnedCoins);
  };

  const handleNumberClick = (number: number) => {
    if (!question || gameEnded) return;
    
    setSelectedNumber(number);
    if (number === question.answer) {
      setScore((prev) => prev + 1);
      setQuestion(generateQuestion());
    }
  };

  if (gameEnded) {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Game Over!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-2xl font-bold">Score: {score}</p>
          <p className="text-lg">Coins Earned: {score * 10}</p>
          <Button onClick={onExit} className="w-full">
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
          <CardTitle>Multiplication Bingo</CardTitle>
          <div className="flex items-center gap-4">
            <Badge variant="secondary">Score: {score}</Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Timer className="w-4 h-4" />
              {timeLeft}s
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {question && (
          <div className="text-center">
            <p className="text-4xl font-bold mb-4">
              {question.num1} × {question.num2} = ?
            </p>
            <p className="text-muted-foreground">
              Find {question.answer} in the grid!
            </p>
          </div>
        )}

        <div className="grid grid-cols-3 gap-4">
          {grid.map((number, index) => (
            <Button
              key={index}
              variant={selectedNumber === number ? 'default' : 'outline'}
              className="h-20 text-2xl"
              onClick={() => handleNumberClick(number)}
            >
              {number}
            </Button>
          ))}
        </div>

        <Button onClick={onExit} variant="ghost" className="w-full">
          Exit Game
        </Button>
      </CardContent>
    </Card>
  );
}
