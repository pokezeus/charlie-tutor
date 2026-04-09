import { Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface GameCardProps {
  title: string;
  subject: string;
  description: string;
  icon: React.ReactNode;
  bestScore?: number;
  totalAttempts?: number;
  accuracy?: number;
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
  bestScore = 0,
  totalAttempts = 0,
  accuracy = 0,
  onPlay,
  isLocked = false,
  requiredLevel = 1,
  currentLevel = 1,
}: GameCardProps) {
  const isUnlocked = !isLocked || (currentLevel && currentLevel >= requiredLevel);

  return (
    <Card className="relative overflow-hidden">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-lg ${isLocked ? 'bg-gray-400' : 'bg-blue-600'}`}>
            {icon}
          </div>
          <div>
            <CardTitle className="flex items-center gap-2">
              {title}
              {isLocked && <Lock className="w-4 h-4 text-gray-400" />}
            </CardTitle>
            <p className="text-sm text-muted-foreground capitalize">{subject}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        
        {isLocked ? (
          <div className="text-center py-4">
            <p className="text-sm text-muted-foreground mb-2">
              Unlocks at Level {requiredLevel}
            </p>
            <p className="text-xs text-muted-foreground">
              Current: Level {currentLevel}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2 text-center text-sm">
              <div>
                <p className="text-muted-foreground">Best</p>
                <p className="font-semibold">{bestScore}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Attempts</p>
                <p className="font-semibold">{totalAttempts}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Accuracy</p>
                <p className="font-semibold">{accuracy}%</p>
              </div>
            </div>
            <Button onClick={onPlay} className="w-full">
              Play Now
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
