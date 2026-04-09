'use client';
import { useState } from 'react';
import { BookOpen, Calculator, Languages, Mic, Trophy, Star, Sparkles, Gift } from 'lucide-react';
import { GameCard } from '@/components/GameCard';
import { CoinDisplay } from '@/components/CoinDisplay';
import { LevelBadge } from '@/components/LevelBadge';
import { StreakProgress } from '@/components/ProgressBar';
import { MultiplicationBingo } from '@/components/games/MultiplicationBingo';

type View = 'dashboard' | 'game' | 'achievements' | 'shop';
type Game = 'multiplication-bingo' | null;

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: string;
}

export default function Home() {
  const [view, setView] = useState<View>('dashboard');
  const [currentGame, setCurrentGame] = useState<Game>(null);
  const [coins, setCoins] = useState(350);
  const [level] = useState(3);
  const [streak] = useState(5);
  const [xp] = useState(240);
  const [totalGamesPlayed] = useState(12);
  const [avatar, setAvatar] = useState('🦸');

  const achievements: Achievement[] = [
    { id: '1', title: 'First Steps', description: 'Complete your first game', icon: '🎯', unlocked: true },
    { id: '2', title: 'Math Wizard', description: 'Get 100% in Multiplication Bingo', icon: '🧙', unlocked: true },
    { id: '3', title: 'On Fire', description: 'Reach a 7-day streak', icon: '🔥', unlocked: false },
    { id: '4', title: 'Coin Collector', description: 'Earn 500 coins', icon: '💰', unlocked: false },
    { id: '5', title: 'Level Up', description: 'Reach Level 5', icon: '⬆️', unlocked: false },
  ];

  const shopItems: ShopItem[] = [
    { id: '1', name: 'Super Hero Avatar', description: 'Unleash your inner hero', price: 100, icon: '🦸' },
    { id: '2', name: 'Robot Avatar', description: 'Beep boop learning machine', price: 100, icon: '🤖' },
    { id: '3', name: 'Wizard Avatar', description: 'Magical learning powers', price: 150, icon: '🧙' },
    { id: '4', name: 'Double XP (1hr)', description: '2x XP for 1 hour', price: 200, icon: '⚡' },
    { id: '5', name: 'Coin Boost', description: 'Instant 50 coin bonus', price: 80, icon: '💎' },
  ];

  const handleGameComplete = (score: number, correct: number, total: number, earnedCoins: number) => {
    setCoins((prev) => prev + earnedCoins);
  };

  const handleExitGame = () => {
    setView('dashboard');
    setCurrentGame(null);
  };

  const startGame = (game: Game) => {
    setCurrentGame(game);
    setView('game');
  };

  const buyItem = (item: ShopItem) => {
    if (coins >= item.price) {
      setCoins((prev) => prev - item.price);
      if (item.icon.includes('🦸') || item.icon.includes('🤖') || item.icon.includes('🧙')) {
        setAvatar(item.icon);
      }
    }
  };

  if (view === 'game' && currentGame === 'multiplication-bingo') {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <MultiplicationBingo onGameComplete={handleGameComplete} onExit={handleExitGame} />
        </div>
      </main>
    );
  }

  if (view === 'achievements') {
    return (
      <main className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <header className="flex items-center gap-4 mb-6">
            <button onClick={() => setView('dashboard')} className="p-2 hover:bg-white rounded-lg">← Back</button>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Trophy className="w-8 h-8 text-yellow-500" />
              Achievements
            </h1>
          </header>
          <div className="grid gap-4">
            {achievements.map((achievement) => (
              <div key={achievement.id} className={`p-6 rounded-xl border-2 ${achievement.unlocked ? 'bg-white border-yellow-400 shadow-lg' : 'bg-gray-50 border-gray-200 opacity-60'}`}>
                <div className="flex items-center gap-4">
                  <div className="text-5xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{achievement.title}</h3>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </div>
                  {achievement.unlocked ? <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" /> : <Star className="w-8 h-8 text-gray-400" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (view === 'shop') {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <header className="flex items-center justify-between mb-6">
            <button onClick={() => setView('dashboard')} className="p-2 hover:bg-white rounded-lg">← Back</button>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Gift className="w-8 h-8 text-pink-500" />
              Reward Shop
            </h1>
            <CoinDisplay coins={coins} size="lg" />
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shopItems.map((item) => (
              <div key={item.id} className="p-6 bg-white rounded-xl border-2 border-gray-200 shadow-sm">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-lg mb-2">{item.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                <button
                  onClick={() => buyItem(item)}
                  disabled={coins < item.price}
                  className={`w-full py-2 px-4 rounded-lg font-semibold ${coins >= item.price ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                >
                  {item.price} coins
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="text-5xl">{avatar}</div>
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

        <section className="flex gap-4">
          <button onClick={() => setView('achievements')} className="flex items-center gap-2 px-4 py-2 bg-yellow-100 hover:bg-yellow-200 rounded-lg font-semibold">
            <Trophy className="w-5 h-5 text-yellow-600" />
            Achievements
          </button>
          <button onClick={() => setView('shop')} className="flex items-center gap-2 px-4 py-2 bg-pink-100 hover:bg-pink-200 rounded-lg font-semibold">
            <Gift className="w-5 h-5 text-pink-600" />
            Shop
          </button>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-orange-100 rounded-lg"><span className="text-xl">🔥</span></div>
              <div>
                <h3 className="font-semibold text-gray-900">Daily Streak</h3>
                <p className="text-sm text-muted-foreground">Keep it going!</p>
              </div>
            </div>
            <StreakProgress currentStreak={streak} targetStreak={7} />
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-100 rounded-lg"><Calculator className="w-6 h-6 text-blue-600" /></div>
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
              <div className="p-2 bg-yellow-100 rounded-lg"><Star className="w-6 h-6 text-yellow-600" /></div>
              <div>
                <h3 className="font-semibold text-gray-900">Total XP</h3>
                <p className="text-sm text-muted-foreground">Experience points</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-yellow-600">{xp}</div>
            <p className="text-xs text-muted-foreground mt-1">Level {level} - {260} XP to next</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-purple-100 rounded-lg"><Sparkles className="w-6 h-6 text-purple-600" /></div>
              <div>
                <h3 className="font-semibold text-gray-900">Games Played</h3>
                <p className="text-sm text-muted-foreground">Total games</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-purple-600">{totalGamesPlayed}</div>
            <p className="text-xs text-muted-foreground mt-1">Keep learning!</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🎮 Choose Your Game</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <GameCard title="Multiplication Bingo" subject="math" description="Master your times tables in this fast-paced bingo challenge!" icon={<Calculator className="w-6 h-6 text-white" />} bestScore={0} totalAttempts={0} accuracy={0} onPlay={() => startGame('multiplication-bingo')} />
            <GameCard title="Phonics Sprint" subject="english" description="Race against time to complete phonics patterns!" icon={<Mic className="w-6 h-6 text-white" />} onPlay={() => {}} isLocked={true} requiredLevel={5} currentLevel={level} />
            <GameCard title="拼音 Balloon Pop" subject="chinese" description="Pop the balloons with the correct pinyin tones!" icon={<Languages className="w-6 h-6 text-white" />} onPlay={() => {}} isLocked={true} requiredLevel={10} currentLevel={level} />
          </div>
        </section>

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

        <footer className="text-center text-sm text-muted-foreground py-4">
          <p>Phase 1: Foundation • Built with Next.js, Tailwind CSS & shadcn/ui</p>
        </footer>
      </div>
    </main>
  );
}
