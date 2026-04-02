'use client';

import { cn } from '@/lib/utils';
import { Trophy, Star, Medal, Crown, Sparkles } from 'lucide-react';

interface LevelBadgeProps {
  level: number;
  showNumber?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  animated?: boolean;
}

export function LevelBadge({
  level,
  showNumber = true,
  size = 'md',
  className,
  animated = true,
}: LevelBadgeProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-base',
    xl: 'w-24 h-24 text-lg',
  };

  const getLevelInfo = (lvl: number) => {
    if (lvl >= 50) return { icon: Crown, color: 'text-yellow-500', bg: 'bg-yellow-100', title: 'Master' };
    if (lvl >= 30) return { icon: Star, color: 'text-purple-500', bg: 'bg-purple-100', title: 'Expert' };
    if (lvl >= 20) return { icon: Trophy, color: 'text-blue-500', bg: 'bg-blue-100', title: 'Advanced' };
    if (lvl >= 10) return { icon: Medal, color: 'text-green-500', bg: 'bg-green-100', title: 'Intermediate' };
    return { icon: Sparkles, color: 'text-orange-500', bg: 'bg-orange-100', title: 'Beginner' };
  };

  const { icon: Icon, color, bg, title } = getLevelInfo(level);

  return (
    <div className={cn('inline-flex flex-col items-center gap-1', className)}>
      <div
        className={cn(
          'rounded-full flex items-center justify-center font-bold border-4 border-white shadow-lg',
          sizeClasses[size],
          bg,
          color,
          animated && 'transition-all duration-300 hover:scale-110'
        )}
      >
        <Icon className={cn(
          size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-6 h-6' : size === 'lg' ? 'w-8 h-8' : 'w-12 h-12',
          color
        )} />
        {showNumber && (
          <span className={cn('absolute', color, 'font-bold')}>
            {level}
          </span>
        )}
      </div>
      {showNumber && (
        <span className="text-xs text-muted-foreground font-medium">{title}</span>
      )}
    </div>
  );
}

// Achievement badge component
interface AchievementBadgeProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  earned?: boolean;
  className?: string;
}

export function AchievementBadge({
  title,
  description,
  icon,
  earned = false,
  className,
}: AchievementBadgeProps) {
  return (
    <div
      className={cn(
        'p-3 rounded-lg border-2 transition-all',
        earned
          ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300 shadow-md'
          : 'bg-gray-50 border-gray-200 opacity-60'
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            'w-12 h-12 rounded-full flex items-center justify-center text-2xl',
            earned ? 'bg-yellow-100' : 'bg-gray-200'
          )}
        >
          {icon}
        </div>
        <div className="flex-1">
          <h4 className={cn('font-semibold text-sm', !earned && 'text-gray-400')}>
            {title}
          </h4>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
        {earned && (
          <Trophy className="w-5 h-5 text-yellow-600" />
        )}
      </div>
    </div>
  );
}

// Streak badge with fire animation
interface StreakBadgeProps {
  streak: number;
  className?: string;
}

export function StreakBadge({ streak, className }: StreakBadgeProps) {
  const getStreakEmoji = (s: number) => {
    if (s >= 30) return '🔥🔥🔥';
    if (s >= 14) return '🔥🔥';
    if (s >= 7) return '🔥';
    return '💪';
  };

  const getStreakTitle = (s: number) => {
    if (s >= 30) return 'Inferno';
    if (s >= 14) return 'Blazing';
    if (s >= 7) return 'On Fire';
    if (s >= 3) return 'Getting Started';
    return 'Beginner';
  };

  return (
    <div className={cn('text-center', className)}>
      <div className="text-4xl mb-1 animate-pulse">
        {getStreakEmoji(streak)}
      </div>
      <div className="text-sm font-semibold">{streak} Day Streak</div>
      <div className="text-xs text-muted-foreground">{getStreakTitle(streak)}</div>
    </div>
  );
}

// Subject mastery badge
interface SubjectMasteryProps {
  subject: 'math' | 'english' | 'chinese';
  mastery: number; // 0-100
  className?: string;
}

export function SubjectMastery({ subject, mastery, className }: SubjectMasteryProps) {
  const subjectInfo = {
    math: { emoji: '📐', color: 'text-blue-500', bg: 'bg-blue-100' },
    english: { emoji: '📚', color: 'text-green-500', bg: 'bg-green-100' },
    chinese: { emoji: '🀄', color: 'text-red-500', bg: 'bg-red-100' },
  };

  const { emoji, color, bg } = subjectInfo[subject];

  const getMasteryTitle = (m: number) => {
    if (m >= 90) return 'Master';
    if (m >= 75) return 'Expert';
    if (m >= 60) return 'Proficient';
    if (m >= 40) return 'Learning';
    return 'Beginner';
  };

  return (
    <div className={cn('text-center', className)}>
      <div className={cn('w-16 h-16 rounded-full flex items-center justify-center text-3xl mx-auto mb-2', bg)}>
        {emoji}
      </div>
      <div className={cn('text-lg font-bold', color)}>{mastery}%</div>
      <div className="text-xs text-muted-foreground">{getMasteryTitle(mastery)}</div>
    </div>
  );
}
