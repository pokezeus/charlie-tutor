'use client';

import { useState } from 'react';
import { BookOpen, Calculator, Languages, Mic, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GameCard } from '@/components/GameCard';
import { CoinDisplay } from '@/components/CoinDisplay';
import { LevelBadge } from '@/components/LevelBadge';
import { StreakProgress } from '@/components/ProgressBar';
import { MultiplicationBingo } from '@/components/games/MultiplicationBingo';

type View = 'dashboard' | 'game';
type Game = 'multiplication-bingo' | null;

export default function Home() {
  const [view, setView] = useState<View>('dashboard');
  const [currentGame, setCurrentGame] = useState<Game>(null);
  const [coins, setCoins] = useState(150);
  const [level, setLevel] = useState(3);
  const [streak, setStreak] = useState(5);

  const handleGameComplete = (score: number, correct: number, total: number, earnedCoins: number) => {
    setCoins((prev) => prev + earnedCoins);
    console.log('Game completed:', { score, correct, total, earnedCoins });
  };

  const handleExitGame = () => {
    setView('dashboard');
    setCurrentGame(null);
  };

  const startGame = (game: Game) => {
    setCurrentGame(game);
    setView('game');
  };

  // Render game view
  if (view === 'game' && currentGame === 'multiplication-bingo') {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <MultiplicationBingo 
            onGameComplete={handleGameComplete}
            onExit={handleExitGame}
          />
        </div>
      </main>
    );
  }

  // Dashboard view
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-600 rounded-xl">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Charlie Tutor</h1>
              <p className="text-sm text-muted-foreground">Your personalized learning companion</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <CoinDisplay coins={coins} size="md" />
            <LevelBadge level={level} size="md" />
          </div>
        </header>

        {/* Stats Overview */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <span className="text-xl">🔥</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Daily Streak</h3>
                <p className="text-sm text-muted-foreground">Keep it going!</p>
              </div>
            </div>
            <StreakProgress currentStreak={streak} targetStreak={7} />
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calculator className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Math Progress</h3>
                <p className="text-sm text-muted-foreground">Multiplication mastery</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-blue-600">12%</div>
            <p className="text-xs text-muted-foreground mt-1">Of curriculum complete</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <span className="text-xl">⭐</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Total XP</h3>
                <p className="text-sm text-muted-foreground">Experience points</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-yellow-600">240</div>
            <p className="text-xs text-muted-foreground mt-1">Level {level} - {260} XP to next</p>
          </div>
        </section>

        {/* Games Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🎮 Choose Your Game</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Multiplication Bingo */}
            <GameCard
              title="Multiplication Bingo"
              subject="math"
              description="Master your times tables in this fast-paced bingo challenge!"
              icon={<Calculator className="w-6 h-6 text-white" />}
              bestScore={0}
              totalAttempts={0}
              accuracy={0}
              onPlay={() => startGame('multiplication-bingo')}
            />

            {/* Phonics Sprint - Locked */}
            <GameCard
              title="Phonics Sprint"
              subject="english"
              description="Race against time to complete phonics patterns!"
              icon={<Mic className="w-6 h-6 text-white" />}
              onPlay={() => {}}
              isLocked={true}
              requiredLevel={5}
              currentLevel={level}
            />

            {/* Pinyin Balloon Pop - Locked */}
            <GameCard
              title="拼音 Balloon Pop"
              subject="chinese"
              description="Pop the balloons with the correct pinyin tones!"
              icon={<Languages className="w-6 h-6 text-white" />}
              onPlay={() => {}}
              isLocked={true}
              requiredLevel={10}
              currentLevel={level}
            />
          </div>
        </section>

        {/* Coming Soon Section */}
        <section className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">🚀 Coming Soon</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg opacity-60">
              <div className="text-3xl mb-2">➗</div>
              <div className="text-sm font-medium">Division Dash</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg opacity-60">
              <div className="text-3xl mb-2">📝</div>
              <div className="text-sm font-medium">Spelling Bee</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg opacity-60">
              <div className="text-3xl mb-2">🀄</div>
              <div className="text-sm font-medium">Character Match</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg opacity-60">
              <div className="text-3xl mb-2">📊</div>
              <div className="text-sm font-medium">Parent Dashboard</div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-sm text-muted-foreground py-4">
          <p>Phase 1: Foundation • Built with Next.js, Tailwind CSS & shadcn/ui</p>
        </footer>
      </div>
    </main>
  );
}
