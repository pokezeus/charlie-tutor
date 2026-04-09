// Demo script to simulate a complete game session
console.log('=== Charlie Tutor Demo Game Session ===\n');

// Simulate login as Charlie
console.log('1. LOGIN SCREEN');
console.log('   → Selecting: Charlie (Primary 3)');
console.log('   Initial Stats:');
console.log('     - Coins: 350');
console.log('     - Level: 3');
console.log('     - XP: 240');
console.log('     - Streak: 5 days');
console.log('     - Games Played: 12');
console.log('     - Math Accuracy: 68%\n');

// Simulate playing Multiplication Bingo
console.log('2. GAME: Multiplication Bingo');
console.log('   Starting game...');
console.log('   Grid generated: [12, 45, 67, 23, 89, 34, 56, 78, 9]');
console.log('');

// Simulate questions
const questions = [
  { q: '7 × 8', a: 56 },
  { q: '9 × 6', a: 54 },
  { q: '12 × 5', a: 60 },
  { q: '8 × 8', a: 64 },
  { q: '7 × 9', a: 63 }
];

console.log('   Questions answered:');
questions.forEach((item, i) => {
  const correct = Math.random() > 0.2; // 80% accuracy
  console.log(`   ${i+1}. ${item.q} = ${item.a} ${correct ? '✓' : '✗'}`);
});

console.log('');
console.log('   Game Complete!');
console.log('   Score: 4/5 (80%)');
console.log('   Coins Earned: 40');
console.log('   XP Earned: 40');
console.log('');

// Updated stats
console.log('3. UPDATED STATS');
console.log('   - Coins: 350 + 40 = 390 💰');
console.log('   - XP: 240 + 40 = 280 ⭐');
console.log('   - Games Played: 12 + 1 = 13 🎮');
console.log('   - Math Accuracy: 68% → 69% 📈');
console.log('   - Streak: 5 days 🔥');
console.log('');

// Check achievements
console.log('4. ACHIEVEMENTS CHECK');
console.log('   ✓ First Steps - Complete first game (UNLOCKED)');
console.log('   ⏳ Math Wizard - 100% accuracy (Not yet - got 80%)');
console.log('   ⏳ On Fire - 7-day streak (5/7 days)');
console.log('   ⏳ Coin Collector - 500 coins (390/500)');
console.log('   ⏳ Level Up - Reach Level 5 (Level 3)');
console.log('');

// Shop preview
console.log('5. REWARD SHOP');
console.log('   Available items:');
console.log('   - 🦸 Super Hero Avatar: 100 coins');
console.log('   - 🤖 Robot Avatar: 100 coins');
console.log('   - 🧙 Wizard Avatar: 150 coins');
console.log('   - ⚡ Double XP (1hr): 200 coins');
console.log('   - 💎 Coin Boost: 80 coins');
console.log('');
console.log('   Current coins: 390');
console.log('   Can purchase: Super Hero, Robot, or Coin Boost!');
console.log('');

// Parent view
console.log('6. PARENT DASHBOARD');
console.log('   Charlie (Primary 3):');
console.log('   - Level: 3 | XP: 280');
console.log('   - Math Accuracy: 69%');
console.log('   - Games Played: 13');
console.log('   - Last Played: Today');
console.log('');
console.log('   Ashley (K3):');
console.log('   - Level: 1 | XP: 80');
console.log('   - Math Accuracy: 45%');
console.log('   - Games Played: 3');
console.log('   - Last Played: Yesterday');
console.log('');
console.log('   Weekly Insight:');
console.log('   ✅ Charlie: Strong in multiplication');
console.log('   ⚠️ Charlie: Focus on division');
console.log('   ✅ Ashley: Great start!');
console.log('   ⚠️ Ashley: Practice number recognition');
console.log('');

console.log('=== Demo Complete ===');
