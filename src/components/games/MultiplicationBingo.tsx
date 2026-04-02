'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, Trophy, Star, Coins, RefreshCw, Check, X } from 'lucide-react';
import { generateMultiplicationExercise, Exercise } from '@/lib/curriculum';
import { CoinDisplay } from '../CoinDisplay';
import { ProgressBar } from '../ProgressBar';

interface MultiplicationBingoProps {
  table?: number; // Which multiplication table (2-12), or random
  onGameComplete?: (score: number, correct: number, total: number, earnedCoins: number) => void;
  onExit?: () => void;
}

interface BingoCell {
  id: string;
  value: number;
  question: string;
  isCorrect: boolean;
  selected: boolean;
  showAnswer: boolean;
}

export function MultiplicationBingo({ 
  table: propTable, 
  onGameComplete,
  onExit 
}: MultiplicationBingoProps) {
  const [table] = useState(propTable || Math.floor(Math.random() * 11) + 2); // 2-12
  const [grid, setGrid] = useState<BingoCell[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Exercise | null>(null);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(60); // 60 seconds
  const [gameState, setGameState] = useState<'playing' | 'gameover'>('playing');
  const [earnedCoins, setEarnedCoins] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showFeedback, setShowFeedback] = useState<'correct' | 'wrong' | null>(null);

  // Generate bingo grid (5x5 = 25 cells with random products from the table)
  const generateGrid = () => {
    const newGrid: BingoCell[] = [];
    const usedNumbers = new Set<number>();
    
    for (let i = 0; i < 25; i++) {
      const multiplier = Math.floor(Math.random() * 10) + 1; // 1-10
      const value = table * multiplier;
      const id = `cell-${i}-${value}`;
      
      newGrid.push({
        id,
        value,
        question: `${table} × ${multiplier}`,
        isCorrect: false,
        selected: false,
        showAnswer: false,
      });
    }
    
    setGrid(newGrid);
  };

  // Generate new question
  const generateQuestion = () => {
    const exercise = generateMultiplicationExercise(table, 'medium');
    setCurrentQuestion(exercise);
  };

  // Initialize game
  useEffect(() => {
    generateGrid();
    generateQuestion();
  }, [table]);

  // Timer
  useEffect(() => {
    if (gameState === 'gameover') return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [gameState]);

  const endGame = () => {
    setGameState('gameover');
    const bonusCoins = streak >= 5 ? 10 : 0;
    const totalCoins = Math.floor(score / 10) + bonusCoins;
    setEarnedCoins(totalCoins);
    onGameComplete?.(score, correctCount, totalQuestions, totalCoins);
  };

  const handleCellClick = (cellIndex: number) => {
    if (gameState === 'gameover' || !currentQuestion) return;

    const cell = grid[cellIndex];
    const expectedAnswer = table * (currentQuestion.question.split(' × ')[1]?.replace(' = ?', '').trim() ? 
      parseInt(currentQuestion.question.split(' × ')[1].replace(' = ?', '')) : 0);
    
    // Parse the actual multiplier from the question
    const parts = currentQuestion.question.split(' × ');
    const multiplier = parts[1] ? parseInt(parts[1].replace(' = ?', '')) : 0;
    const correctValue = table * multiplier;

    const newGrid = [...grid];
    newGrid[cellIndex] = {
      ...cell,
      selected: true,
      isCorrect: cell.value === correctValue,
      showAnswer: true,
    };

    setGrid(newGrid);
    setTotalQuestions((prev) => prev + 1);

    if (cell.value === correctValue) {
      // Correct!
      setCorrectCount((prev) => prev + 1);
      setScore((prev) => prev + 10 + (streak * 2)); // Bonus for streak
      setStreak((prev) => prev + 1);
      setShowFeedback('correct');
    } else {
      // Wrong
      setStreak(0);
      setShowFeedback('wrong');
    }

    setTimeout(() => {
      setShowFeedback(null);
      generateQuestion();
    }, 800);
  };

  const restartGame = () => {
    setScore(0);
    setCorrectCount(0);
    setTotalQuestions(0);
    setTimeRemaining(60);
    setGameState('playing');
    setStreak(0);
    setEarnedCoins(0);
    generateGrid();
    generateQuestion();
  };

  const accuracy = totalQuestions > 0 ? correctCount / totalQuestions : 0;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              🎯 Multiplication Bingo - Table of {table}
            </CardTitle>
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{timeRemaining}s</span>
              </div>
              <div className="flex items-center gap-1">
                <Trophy className="w-4 h-4" />
                <span>Score: {score}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4" />
                <span>Streak: {streak}🔥</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onExit}>
              Exit
            </Button>
            <Button variant="outline" size="sm" onClick={restartGame}>
              <RefreshCw className="w-4 h-4 mr-1" />
              Restart
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Current Question */}
        {currentQuestion && (
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">Find the answer:</p>
            <p className="text-3xl font-bold text-blue-600">{currentQuestion.question}</p>
            {showFeedback && (
              <div className={`mt-2 flex items-center justify-center gap-1 ${
                showFeedback === 'correct' ? 'text-green-600' : 'text-red-600'
              }`}>
                {showFeedback === 'correct' ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                <span className="font-semibold">
                  {showFeedback === 'correct' ? 'Correct!' : 'Try again!'}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Bingo Grid */}
        <div className="grid grid-cols-5 gap-2">
          {grid.map((cell, index) => (
            <button
              key={cell.id}
              onClick={() => handleCellClick(index)}
              disabled={gameState === 'gameover' || cell.selected}
              className={`
                aspect-square rounded-lg font-bold text-lg transition-all
                ${cell.selected
                  ? cell.isCorrect
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                  : 'bg-white border-2 border-gray-200 hover:border-blue-400 hover:scale-105'
                }
                focus:outline-none focus:ring-2 focus:ring-blue-500
              `}
            >
              {cell.value}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">{correctCount}</div>
            <div className="text-xs text-muted-foreground">Correct</div>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{totalQuestions}</div>
            <div className="text-xs text-muted-foreground">Total</div>
          </div>
        </div>

        {/* Accuracy Progress */}
        <ProgressBar
          current={correctCount}
          max={totalQuestions || 1}
          label="Accuracy"
          color={accuracy >= 0.8 ? 'green' : accuracy >= 0.6 ? 'yellow' : 'red'}
        />

        {/* Game Over */}
        {gameState === 'gameover' && (
          <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-2 border-blue-200">
            <h3 className="text-2xl font-bold mb-4">🎉 Game Over!</h3>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <div className="text-3xl font-bold text-blue-600">{score}</div>
                <div className="text-xs text-muted-foreground">Final Score</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600">{Math.round(accuracy * 100)}%</div>
                <div className="text-xs text-muted-foreground">Accuracy</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-600">+{earnedCoins}</div>
                <div className="text-xs text-muted-foreground">Coins Earned</div>
              </div>
            </div>
            <Button onClick={restartGame} className="w-full">
              Play Again
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
