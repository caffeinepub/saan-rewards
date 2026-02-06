// Teen Patti hand evaluation and comparison

import { Card, getRankValue } from './cards';

export type HandRank = 
  | 'trail'        // Three of a kind (highest)
  | 'pure-sequence' // Straight flush
  | 'sequence'     // Straight
  | 'color'        // Flush
  | 'pair'         // Pair
  | 'high-card';   // High card (lowest)

export interface HandEvaluation {
  rank: HandRank;
  values: number[];
  name: string;
}

function sortByRank(cards: Card[]): Card[] {
  return [...cards].sort((a, b) => getRankValue(b.rank) - getRankValue(a.rank));
}

function isFlush(cards: Card[]): boolean {
  return cards.every(card => card.suit === cards[0].suit);
}

function isStraight(cards: Card[]): boolean {
  const sorted = sortByRank(cards);
  const values = sorted.map(c => getRankValue(c.rank));
  
  // Check normal straight
  if (values[0] - values[1] === 1 && values[1] - values[2] === 1) {
    return true;
  }
  
  // Check A-2-3 special case
  if (values[0] === 14 && values[1] === 3 && values[2] === 2) {
    return true;
  }
  
  return false;
}

export function evaluateHand(cards: Card[]): HandEvaluation {
  if (cards.length !== 3) {
    throw new Error('Hand must contain exactly 3 cards');
  }

  const sorted = sortByRank(cards);
  const values = sorted.map(c => getRankValue(c.rank));
  const rankCounts = new Map<number, number>();
  
  values.forEach(v => rankCounts.set(v, (rankCounts.get(v) || 0) + 1));
  
  // Trail (Three of a kind)
  if (rankCounts.size === 1) {
    return {
      rank: 'trail',
      values: [values[0]],
      name: `Trail of ${sorted[0].rank}s`
    };
  }
  
  // Pure Sequence (Straight Flush)
  if (isFlush(cards) && isStraight(cards)) {
    // Handle A-2-3 special case
    if (values[0] === 14 && values[1] === 3 && values[2] === 2) {
      return {
        rank: 'pure-sequence',
        values: [3, 2, 14],
        name: 'Pure Sequence (A-2-3)'
      };
    }
    return {
      rank: 'pure-sequence',
      values,
      name: `Pure Sequence (${sorted[0].rank}-${sorted[1].rank}-${sorted[2].rank})`
    };
  }
  
  // Sequence (Straight)
  if (isStraight(cards)) {
    // Handle A-2-3 special case
    if (values[0] === 14 && values[1] === 3 && values[2] === 2) {
      return {
        rank: 'sequence',
        values: [3, 2, 14],
        name: 'Sequence (A-2-3)'
      };
    }
    return {
      rank: 'sequence',
      values,
      name: `Sequence (${sorted[0].rank}-${sorted[1].rank}-${sorted[2].rank})`
    };
  }
  
  // Color (Flush)
  if (isFlush(cards)) {
    return {
      rank: 'color',
      values,
      name: `Color (${sorted[0].suit})`
    };
  }
  
  // Pair
  if (rankCounts.size === 2) {
    const pairValue = Array.from(rankCounts.entries()).find(([_, count]) => count === 2)?.[0] || 0;
    const kicker = values.find(v => v !== pairValue) || 0;
    return {
      rank: 'pair',
      values: [pairValue, kicker],
      name: `Pair of ${sorted.find(c => getRankValue(c.rank) === pairValue)?.rank}s`
    };
  }
  
  // High Card
  return {
    rank: 'high-card',
    values,
    name: `High Card ${sorted[0].rank}`
  };
}

export function compareHands(hand1: HandEvaluation, hand2: HandEvaluation): number {
  const rankOrder: HandRank[] = ['trail', 'pure-sequence', 'sequence', 'color', 'pair', 'high-card'];
  
  const rank1Index = rankOrder.indexOf(hand1.rank);
  const rank2Index = rankOrder.indexOf(hand2.rank);
  
  if (rank1Index !== rank2Index) {
    return rank1Index - rank2Index; // Lower index = better hand
  }
  
  // Same rank, compare values
  for (let i = 0; i < Math.max(hand1.values.length, hand2.values.length); i++) {
    const v1 = hand1.values[i] || 0;
    const v2 = hand2.values[i] || 0;
    if (v1 !== v2) {
      return v2 - v1; // Higher value wins
    }
  }
  
  return 0; // Tie
}

export function determineWinner(playerHand: Card[], opponentHand: Card[]): 'player' | 'opponent' | 'tie' {
  const playerEval = evaluateHand(playerHand);
  const opponentEval = evaluateHand(opponentHand);
  
  const comparison = compareHands(playerEval, opponentEval);
  
  if (comparison < 0) return 'player';
  if (comparison > 0) return 'opponent';
  return 'tie';
}
