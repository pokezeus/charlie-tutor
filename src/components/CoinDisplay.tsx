'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Coins, TrendingUp } from 'lucide-react';

interface CoinDisplayProps {
  coins: number;
  lifetime?: number;
  showAnimation?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function CoinDisplay({
  coins,
  lifetime,
  showAnimation = true,
  size = 'md',
  className,
}: CoinDisplayProps) {
  const [displayedCoins, setDisplayedCoins] = useState(coins);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (coins !== displayedCoins) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setDisplayedCoins(coins);
        setIsAnimating(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [coins, displayedCoins]);

  const sizeClasses = {
    sm: 'text-sm py-1 px-2',
    md: 'text-base py-1.5 px-3',
    lg: 'text-lg py-2 px-4',
  };

  return (
    <div className={cn('inline-flex items-center gap-2', className)}>
      <div
        className={cn(
          'inline-flex items-center gap-1.5 rounded-full bg-yellow-100 text-yellow-800 font-semibold border-2 border-yellow-300',
          sizeClasses[size],
          showAnimation && isAnimating && 'animate-bounce'
        )}
      >
        <Coins className={cn(
          size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-5 h-5' : 'w-6 h-6',
          'text-yellow-600'
        )} />
        <span>{displayedCoins.toLocaleString()}</span>
      </div>
      
      {lifetime !== undefined && lifetime > coins && (
        <div className="text-xs text-muted-foreground flex items-center gap-1">
          <TrendingUp className="w-3 h-3" />
          <span>+{lifetime.toLocaleString()} lifetime</span>
        </div>
      )}
    </div>
  );
}

// Coin animation component for earning coins
interface CoinAnimationProps {
  amount: number;
  onComplete?: () => void;
  className?: string;
}

export function CoinAnimation({ amount, onComplete, className }: CoinAnimationProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onComplete?.();
    }, 1500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div
      className={cn(
        'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none',
        className
      )}
    >
      <div className="animate-ping absolute inset-0">
        <div className="w-full h-full rounded-full bg-yellow-400 opacity-75" />
      </div>
      <div className="relative flex items-center gap-2 bg-yellow-100 border-2 border-yellow-400 rounded-full px-6 py-3 shadow-lg">
        <Coins className="w-8 h-8 text-yellow-600" />
        <span className="text-2xl font-bold text-yellow-800">+{amount}</span>
      </div>
    </div>
  );
}

// Coin shop item component
interface CoinShopItemProps {
  title: string;
  cost: number;
  description?: string;
  icon?: React.ReactNode;
  onPurchase: () => void;
  canAfford: boolean;
  purchased?: boolean;
}

export function CoinShopItem({
  title,
  cost,
  description,
  icon,
  onPurchase,
  canAfford,
  purchased = false,
}: CoinShopItemProps) {
  return (
    <div
      className={cn(
        'p-4 rounded-lg border-2 transition-all',
        purchased
          ? 'bg-green-50 border-green-300'
          : canAfford
          ? 'bg-white border-gray-200 hover:border-yellow-400 hover:shadow-md'
          : 'bg-gray-50 border-gray-200 opacity-60'
      )}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          {icon && <div className="text-2xl">{icon}</div>}
          <div>
            <h3 className="font-semibold">{title}</h3>
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
          </div>
        </div>
        <div
          className={cn(
            'px-3 py-1 rounded-full text-sm font-semibold',
            canAfford
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-gray-200 text-gray-600'
          )}
        >
          {cost.toLocaleString()} 🪙
        </div>
      </div>
      <button
        onClick={onPurchase}
        disabled={!canAfford || purchased}
        className={cn(
          'w-full py-2 rounded-lg font-medium transition-colors',
          purchased
            ? 'bg-green-500 text-white cursor-default'
            : canAfford
            ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        )}
      >
        {purchased ? '✓ Purchased' : canAfford ? 'Purchase' : "Can't Afford"}
      </button>
    </div>
  );
}
