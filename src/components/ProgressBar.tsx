'use client';

import { cn } from '@/lib/utils';

interface ProgressBarProps {
  current: number;
  max: number;
  label?: string;
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'gradient';
  className?: string;
  animated?: boolean;
}

export function ProgressBar({
  current,
  max,
  label,
  showPercentage = true,
  size = 'md',
  color = 'blue',
  className,
  animated = true,
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (current / max) * 100));
  
  const sizeClasses = {
    sm: 'h-2 text-xs',
    md: 'h-3 text-sm',
    lg: 'h-4 text-base',
  };

  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    red: 'bg-red-500',
    yellow: 'bg-yellow-500',
    purple: 'bg-purple-500',
    gradient: 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500',
  };

  const getBackgroundColor = () => {
    if (percentage >= 80) return 'bg-green-100';
    if (percentage >= 50) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className={cn('w-full space-y-1', className)}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center">
          {label && <span className="font-medium">{label}</span>}
          {showPercentage && (
            <span className="text-muted-foreground">{Math.round(percentage)}%</span>
          )}
        </div>
      )}
      <div className={cn('w-full bg-gray-200 rounded-full overflow-hidden', getBackgroundColor())}>
        <div
          className={cn(
            'text-white text-center font-medium transition-all duration-500 ease-in-out rounded-full',
            sizeClasses[size],
            colorClasses[color],
            animated && 'animate-pulse'
          )}
          style={{ width: `${percentage}%` }}
        >
          {percentage >= 10 && showPercentage && (
            <span className="px-2">{Math.round(percentage)}%</span>
          )}
        </div>
      </div>
      {!showPercentage && (
        <div className="text-xs text-muted-foreground text-right">
          {current} / {max}
        </div>
      )}
    </div>
  );
}

// Streak progress bar variant
interface StreakProgressProps {
  currentStreak: number;
  targetStreak: number;
  className?: string;
}

export function StreakProgress({ currentStreak, targetStreak, className }: StreakProgressProps) {
  const percentage = Math.min(100, (currentStreak / targetStreak) * 100);
  
  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium flex items-center gap-1">
          🔥 Daily Streak
        </span>
        <span className="text-sm text-muted-foreground">
          {currentStreak} / {targetStreak} days
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full transition-all duration-500 ease-out flex items-center justify-center"
          style={{ width: `${percentage}%` }}
        >
          {percentage >= 30 && (
            <span className="text-white text-xs font-bold">
              {currentStreak} day{currentStreak !== 1 ? 's' : ''}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// Level progress with XP
interface LevelProgressProps {
  currentXP: number;
  xpToNextLevel: number;
  currentLevel: number;
  className?: string;
}

export function LevelProgress({ currentXP, xpToNextLevel, currentLevel, className }: LevelProgressProps) {
  const percentage = Math.min(100, (currentXP / xpToNextLevel) * 100);
  
  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-2xl">⭐</span>
          <div>
            <div className="text-sm font-medium">Level {currentLevel}</div>
            <div className="text-xs text-muted-foreground">
              {currentXP} / {xpToNextLevel} XP
            </div>
          </div>
        </div>
        <div className="text-2xl">
          {percentage >= 100 ? '🎉' : percentage >= 75 ? '🚀' : percentage >= 50 ? '💪' : '📚'}
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full transition-all duration-500 ease-out flex items-center justify-center text-white text-xs font-bold"
          style={{ width: `${percentage}%` }}
        >
          {percentage >= 10 && `${Math.round(percentage)}% to next level`}
        </div>
      </div>
    </div>
  );
}
