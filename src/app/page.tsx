'use client';
import { useState, useEffect } from 'react';
import { BookOpen, Calculator, Languages, Mic, Trophy, Star, Sparkles, Gift, User, LogOut, BarChart3, GraduationCap } from 'lucide-react';
import { GameCard } from '@/components/GameCard';
import { CoinDisplay } from '@/components/CoinDisplay';
import { LevelBadge } from '@/components/LevelBadge';
import { StreakProgress } from '@/components/ProgressBar';
import { MultiplicationBingo } from '@/components/games/MultiplicationBingo';

type View = 'dashboard' | 'game' | 'achievements' | 'shop' | 'parent-dashboard';
type Game = 'multiplication-bingo' | null;
type UserType = 'charlie' | 'ashley' | 'parent' | null;

interface User {
  name: string;
  type: UserType;
  grade: string;
  coins: number;
  level: number;
  streak: number;
  xp: number;
  avatar: string;
  totalGamesPlayed: number;
  mathAccuracy: number;
  gamesPlayed: number;
  lastPlayed?: string;
}

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

const defaultUsers: Record<string, User> = {
  charlie: {
    name: 'Charlie',
    type: 'charlie',
    grade: 'Primary 3',
    coins: 350,
    level: 3,
    streak: 5,
    xp: 240,
    avatar: '🦸',
    totalGamesPlayed: 12,
    mathAccuracy: 68,
    gamesPlayed: 12,
    lastPlayed: '2026-04-09',
  },
  ashley: {
    name: 'Ashley',
    type: 'ashley',
    grade: 'K3',
    coins: 150,
    level: 1,
    streak: 2,
    xp: 80,
    avatar: '👸',
    totalGamesPlayed: 3,
    mathAccuracy: 45,
    gamesPlayed: 3,
    lastPlayed: '2026-04-08',
  },
};

export default function Home() {
  const [currentUser, setCurrentUser] = useState<UserType>(null);
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<Record<string, User>>(defaultUsers);
  const [view, setView] = useState<View>('dashboard');
  const [currentGame, setCurrentGame] = useState<Game>(null);
  const [showLogin, setShowLogin] = useState(true);

  // Load user data from localStorage on mount
  useEffect(() => {
    const savedUsers = localStorage.getItem('charlieTutorUsers');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
  }, []);

  // Save users to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('charlieTutorUsers', JSON.stringify(users));
  }, [users]);

  const handleLogin = (type: UserType) => {
    setCurrentUser(type);
    if (type && type !== 'parent') {
      setUser(users[type as keyof typeof users] || null);
      setView('dashboard');
    } else {
      setView('parent-dashboard');
    }
    setShowLogin(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setUser(null);
    setView('dashboard');
    setShowLogin(true);
  };

  const handleGameComplete = (score: number, correct: number, total: number, earnedCoins: number) => {
    if (!currentUser) return;
    
    const earnedXp = score * 10;
    const updatedUser = {
      ...users[currentUser],
      coins: users[currentUser].coins + earnedCoins,
      xp: users[currentUser].xp + earnedXp,
      totalGamesPlayed: users[currentUser].totalGamesPlayed + 1,
      gamesPlayed: users[currentUser].gamesPlayed + 1,
      mathAccuracy: Math.round(((users[currentUser].mathAccuracy * users[currentUser].gamesPlayed + (correct / total * 100)) / (users[currentUser].gamesPlayed + 1)) * 100) / 100,
      lastPlayed: new Date().toISOString().split('T')[0],
    };
    
    setUsers(prev => ({
      ...prev,
      [currentUser]: updatedUser,
    }));
    setUser(updatedUser);
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
    if (!currentUser || !user) return;
    if (user.coins >= item.price) {
      const updatedUser = {
        ...user,
        coins: user.coins - item.price,
        avatar: item.icon.includes('🦸') || item.icon.includes('🤖') || item.icon.includes('🧙') ? item.icon : user.avatar,
      };
      
      setUsers(prev => ({
        ...prev,
        [currentUser]: updatedUser,
      }));
      setUser(updatedUser);
    }
  };

  // Login Screen
  if (showLogin) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-blue-600 rounded-2xl">
                <BookOpen className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Charlie Tutor</h1>
            <p className="text-muted-foreground">Choose your account to start learning!</p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => handleLogin('charlie')}
              className="w-full p-4 rounded-xl border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-all text-left flex items-center gap-4"
            >
              <div className="text-4xl">🦸</div>
              <div>
                <div className="font-bold text-lg">Charlie</div>
                <div className="text-sm text-muted-foreground">Primary 3</div>
              </div>
            </button>

            <button
              onClick={() => handleLogin('ashley')}
              className="w-full p-4 rounded-xl border-2 border-pink-200 hover:border-pink-400 hover:bg-pink-50 transition-all text-left flex items-center gap-4"
            >
              <div className="text-4xl">👸</div>
              <div>
                <div className="font-bold text-lg">Ashley</div>
                <div className="text-sm text-muted-foreground">K3</div>
              </div>
            </button>

            <button
              onClick={() => handleLogin('parent')}
              className="w-full p-4 rounded-xl border-2 border-gray-200 hover:border-gray-400 hover:bg-gray-50 transition-all text-left flex items-center gap-4"
            >
              <div className="text-4xl">👨‍👩‍👧‍👦</div>
              <div>
                <div className="font-bold text-lg">Parent Dashboard</div>
                <div className="text-sm text-muted-foreground">View progress & stats</div>
              </div>
            </button>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>Personalized learning for Hong Kong students</p>
          </div>
        </div>
      </main>
    );
  }

  // Parent Dashboard
  if (view === 'parent-dashboard' && currentUser === 'parent') {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <header className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={handleLogout} className="p-2 hover:bg-white rounded-lg">
                <LogOut className="w-6 h-6" />
              </button>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <BarChart3 className="w-8 h-8 text-blue-600" />
                Parent Dashboard
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-gray-600" />
              <span className="font-semibold">Parent</span>
            </div>
          </header>

          {/* Children Overview */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(users).map(([key, child]) => (
              <div key={key} className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-5xl">{child.avatar}</div>
                  <div>
                    <h2 className="text-2xl font-bold">{child.name}</h2>
                    <p className="text-muted-foreground">{child.grade}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Trophy className="w-5 h-5 text-yellow-600" />
                      <span className="text-sm font-semibold">Level</span>
                    </div>
                    <div className="text-3xl font-bold text-blue-600">{child.level}</div>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-5 h-5 text-orange-600" />
                      <span className="text-sm font-semibold">XP Points</span>
                    </div>
                    <div className="text-3xl font-bold text-orange-600">{child.xp}</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">🔥</span>
                      <span className="text-sm font-semibold">Streak</span>
                    </div>
                    <div className="text-3xl font-bold text-green-600">{child.streak} days</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Calculator className="w-5 h-5 text-purple-600" />
                      <span className="text-sm font-semibold">Math Accuracy</span>
                    </div>
                    <div className="text-3xl font-bold text-purple-600">{child.mathAccuracy}%</div>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Coins Earned:</span>
                    <span className="font-semibold">{child.coins} 💰</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Games Played:</span>
                    <span className="font-semibold">{child.totalGamesPlayed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Played:</span>
                    <span className="font-semibold">{child.lastPlayed || 'Never'}</span>
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* Progress Chart Placeholder */}
          <section className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-blue-600" />
              Learning Progress
            </h2>
            <div className="space-y-4">
              {Object.entries(users).map(([key, child]) => (
                <div key={key}>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">{child.name}</span>
                    <span>{child.mathAccuracy}% Math Mastery</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className="bg-blue-600 h-4 rounded-full transition-all"
                      style={{ width: `${child.mathAccuracy}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Recommendations */}
          <section className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
            <h2 className="text-xl font-bold mb-4">📊 Weekly Insights</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Charlie</h3>
                <ul className="space-y-1 text-sm">
                  <li>✅ Strong performance in multiplication</li>
                  <li>⚠️ Focus area: Division concepts</li>
                  <li>🎯 Goal: Reach Level 4 this week</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Ashley</h3>
                <ul className="space-y-1 text-sm">
                  <li>✅ Great start with basic counting</li>
                  <li>⚠️ Focus area: Number recognition</li>
                  <li>🎯 Goal: Complete 5 games this week</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </main>
    );
  }

  // Game View
  if (view === 'game' && currentGame === 'multiplication-bingo' && user) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <MultiplicationBingo onGameComplete={handleGameComplete} onExit={handleExitGame} />
        </div>
      </main>
    );
  }

  // Achievements View
  if (view === 'achievements' && user) {
    const achievements: Achievement[] = [
      { id: '1', title: 'First Steps', description: 'Complete your first game', icon: '🎯', unlocked: user.totalGamesPlayed >= 1 },
      { id: '2', title: 'Math Wizard', description: 'Get 100% in Multiplication Bingo', icon: '🧙', unlocked: user.mathAccuracy === 100 },
      { id: '3', title: 'On Fire', description: 'Reach a 7-day streak', icon: '🔥', unlocked: user.streak >= 7 },
      { id: '4', title: 'Coin Collector', description: 'Earn 500 coins', icon: '💰', unlocked: user.coins >= 500 },
      { id: '5', title: 'Level Up', description: 'Reach Level 5', icon: '⬆️', unlocked: user.level >= 5 },
    ];

    return (
      <main className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <header className="flex items-center gap-4 mb-6">
            <button onClick={() => setView('dashboard')} className="p-2 hover:bg-white rounded-lg">← Back</button>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Trophy className="w-8 h-8 text-yellow-500" />
              {user.name}'s Achievements
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
                  {achievement.unlocked ? (
                    <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
                  ) : (
                    <Star className="w-8 h-8 text-gray-400" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  // Shop View
  if (view === 'shop' && user) {
    const shopItems: ShopItem[] = [
      { id: '1', name: 'Super Hero Avatar', description: 'Unleash your inner hero', price: 100, icon: '🦸' },
      { id: '2', name: 'Robot Avatar', description: 'Beep boop learning machine', price: 100, icon: '🤖' },
      { id: '3', name: 'Wizard Avatar', description: 'Magical learning powers', price: 150, icon: '🧙' },
      { id: '4', name: 'Double XP (1hr)', description: '2x XP for 1 hour', price: 200, icon: '⚡' },
      { id: '5', name: 'Coin Boost', description: 'Instant 50 coin bonus', price: 80, icon: '💎' },
    ];

    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <header className="flex items-center justify-between mb-6">
            <button onClick={() => setView('dashboard')} className="p-2 hover:bg-white rounded-lg">← Back</button>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Gift className="w-8 h-8 text-pink-500" />
              Reward Shop
            </h1>
            <CoinDisplay coins={user.coins} size="lg" />
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shopItems.map((item) => (
              <div key={item.id} className="p-6 bg-white rounded-xl border-2 border-gray-200 shadow-sm">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-lg mb-2">{item.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                <button
                  onClick={() => buyItem(item)}
                  disabled={user.coins < item.price}
                  className={`w-full py-2 px-4 rounded-lg font-semibold ${user.coins >= item.price ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
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

  // Student Dashboard
  if (user) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 md:p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="text-5xl">{user.avatar}</div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{user.name}'s Tutor</h1>
                <p className="text-sm text-muted-foreground">{user.grade} • Personalized Learning</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <CoinDisplay coins={user.coins} size="md" />
              <LevelBadge level={user.level} size="md" />
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
              <StreakProgress currentStreak={user.streak} targetStreak={7} />
            </div>
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-100 rounded-lg"><Calculator className="w-6 h-6 text-blue-600" /></div>
                <div>
                  <h3 className="font-semibold text-gray-900">Math Progress</h3>
                  <p className="text-sm text-muted-foreground">Multiplication mastery</p>
                </div>
              </div>
              <div className="text-3xl font-bold text-blue-600">{user.mathAccuracy}%</div>
              <p className="text-xs text-muted-foreground mt-1">Accuracy rate</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-yellow-100 rounded-lg"><Star className="w-6 h-6 text-yellow-600" /></div>
                <div>
                  <h3 className="font-semibold text-gray-900">Total XP</h3>
                  <p className="text-sm text-muted-foreground">Experience points</p>
                </div>
              </div>
              <div className="text-3xl font-bold text-yellow-600">{user.xp}</div>
              <p className="text-xs text-muted-foreground mt-1">Level {user.level} - {1000 - user.xp} XP to next</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-purple-100 rounded-lg"><Sparkles className="w-6 h-6 text-purple-600" /></div>
                <div>
                  <h3 className="font-semibold text-gray-900">Games Played</h3>
                  <p className="text-sm text-muted-foreground">Total games</p>
                </div>
              </div>
              <div className="text-3xl font-bold text-purple-600">{user.totalGamesPlayed}</div>
              <p className="text-xs text-muted-foreground mt-1">Keep learning!</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">🎮 Choose Your Game</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <GameCard
                title="Phonics Sprint"
                subject="english"
                description="Race against time to complete phonics patterns!"
                icon={<Mic className="w-6 h-6 text-white" />}
                onPlay={() => {}}
                isLocked={true}
                requiredLevel={5}
                currentLevel={user.level}
              />
              <GameCard
                title="拼音 Balloon Pop"
                subject="chinese"
                description="Pop the balloons with the correct pinyin tones!"
                icon={<Languages className="w-6 h-6 text-white" />}
                onPlay={() => {}}
                isLocked={true}
                requiredLevel={10}
                currentLevel={user.level}
              />
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

  return null;
}
