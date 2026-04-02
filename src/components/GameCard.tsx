'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Star, Clock, TrendingUp } from 'lucide-react';

interface GameCardProps {
  title: string;
  subject: 'math' | 'english' | 'chinese';
  description: string;
  icon?: React.ReactNode;
  bestScore?: number;
  totalAttempts?: number;
  accuracy?: number;
  lastPlayed?: Date;
  onPlay: () => void;
  isLocked?: boolean;
  requiredLevel?: number;
  currentLevel?: number;
}

export function GameCard({
  title,
  subject,
  description,
  icon,
  bestScore,
  totalAttempts = 0,
  accuracy,
  lastPlayed,
  onPlay,
  isLocked = false,
  requiredLevel = 1,
  currentLevel = 1,
}: GameCardProps) {
  const isLockedState = isLocked || currentLevel < requiredLevel;

  const subjectColors = {
    math: 'bg-blue-500 hover:bg-blue-600',
    english: 'bg-green-500 hover:bg-green-600',
    chinese: 'bg-red-500 hover:bg-red-600',
  };

  const subjectBadges = {
    math: { bg: 'bg-blue-100', text: 'text-blue-800' },
    english: { bg: 'bg-green-100', text: 'text-green-800' },
    chinese: { bg: 'bg-red-100', text: 'text-red-800' },
  };

  return (
    <Card className={`w-full max-w-sm transition-all duration-300 ${isLockedState ? 'opacity-60 grayscale' : 'hover:shadow-lg hover:-translate-y-1'}`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {icon && (
              <div className={`p-2 rounded-lg ${subjectColors[subject]}`}>
                {icon}
              </div>
            )}
            <div>
              <CardTitle className="text-xl">{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
          </div>
          <Badge className={`${subjectBadges[subject].bg} ${subjectBadges[subject].text}`}>
            {subject.charAt(0).toUpperCase() + subject.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Stats Grid */}
        {(bestScore !== undefined || accuracy !== undefined || totalAttempts > 0) && (
          <div className="grid grid-cols-3 gap-2 text-sm">
            {bestScore !== undefined && (
              <div className="text-center p-2 bg-yellow-50 rounded-lg">
                <div className="flex items-center justify-center gap-1 text-yellow-600 mb-1">
                  <Trophy className="w-4 h-4" />
                </div>
                <div className="font-semibold">{bestScore}</div>
                <div className="text-xs text-muted-foreground">Best</div>
              </div>
            )}
            
            {accuracy !== undefined && (
              <div className="text-center p-2 bg-green-50 rounded-lg">
                <div className="flex items-center justify-center gap-1 text-green-600 mb-1">
                  <Star className="w-4 h-4" />
                </div>
                <div className="font-semibold">{Math.round(accuracy * 100)}%</div>
                <div className="text-xs text-muted-foreground">Accuracy</div>
              </div>
            )}
            
            {totalAttempts > 0 && (
              <div className="text-center p-2 bg-purple-50 rounded-lg">
                <div className="flex items-center justify-center gap-1 text-purple-600 mb-1">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div className="font-semibold">{totalAttempts}</div>
                <div className="text-xs text-muted-foreground">Attempts</div>
              </div>
            )}
          </div>
        )}

        {/* Progress to next level */}
        {!isLockedState && accuracy !== undefined && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Progress to next level</span>
              <span>{Math.min(100, Math.round((accuracy / 0.8) * 100))}%</span>
            </div>
            <Progress value={(accuracy / 0.8) * 100} className="h-2" />
          </div>
        )}

        {isLockedState && requiredLevel > 1 && (
          <div className="text-center py-4 text-sm text-muted-foreground bg-muted rounded-lg">
            <Clock className="w-6 h-6 mx-auto mb-2" />
            <p>Unlock at Level {requiredLevel}</p>
            <p className="text-xs">Current: Level {currentLevel}</p>
          </div>
        )}
      </CardContent>

      <CardFooter>
        <Button 
          className={`w-full ${subjectColors[subject]}`}
          onClick={onPlay}
          disabled={isLockedState}
        >
          {isLockedState ? '🔒 Locked' : '🎮 Play Now'}
        </Button>
      </CardFooter>
    </Card>
  );
}
