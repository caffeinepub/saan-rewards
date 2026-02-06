import { Card } from '../engine/cards';

interface TeenPattiCardProps {
  card?: Card;
  faceDown?: boolean;
  className?: string;
}

const suitSymbols: Record<string, string> = {
  hearts: '♥',
  diamonds: '♦',
  clubs: '♣',
  spades: '♠'
};

const suitColors: Record<string, string> = {
  hearts: 'text-red-600',
  diamonds: 'text-red-600',
  clubs: 'text-gray-900 dark:text-gray-100',
  spades: 'text-gray-900 dark:text-gray-100'
};

export function TeenPattiCard({ card, faceDown = false, className = '' }: TeenPattiCardProps) {
  if (faceDown || !card) {
    return (
      <div className={`relative w-16 h-24 sm:w-20 sm:h-28 rounded-lg shadow-lg ${className}`}>
        <img
          src="/assets/generated/teenpatti-card-back.dim_768x1024.png"
          alt="Card back"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    );
  }

  const suitColor = suitColors[card.suit];
  const suitSymbol = suitSymbols[card.suit];

  return (
    <div className={`relative w-16 h-24 sm:w-20 sm:h-28 bg-white rounded-lg shadow-lg border-2 border-gray-300 flex flex-col items-center justify-between p-1.5 sm:p-2 ${className}`}>
      {/* Top rank and suit */}
      <div className={`text-left w-full ${suitColor} font-bold text-sm sm:text-base leading-none`}>
        <div>{card.rank}</div>
        <div className="text-lg sm:text-xl">{suitSymbol}</div>
      </div>
      
      {/* Center suit symbol */}
      <div className={`${suitColor} text-3xl sm:text-4xl`}>
        {suitSymbol}
      </div>
      
      {/* Bottom rank and suit (rotated) */}
      <div className={`text-right w-full ${suitColor} font-bold text-sm sm:text-base leading-none rotate-180`}>
        <div>{card.rank}</div>
        <div className="text-lg sm:text-xl">{suitSymbol}</div>
      </div>
    </div>
  );
}
