// Simple AI for Teen Patti opponent

import { Card, getRankValue } from './cards';
import { evaluateHand, HandEvaluation } from './handRanking';

export type AIAction = 'fold' | 'call' | 'raise';

export interface AIDecision {
  action: AIAction;
  raiseAmount?: number;
}

function getHandStrength(evaluation: HandEvaluation): number {
  const rankStrength: Record<string, number> = {
    'trail': 1.0,
    'pure-sequence': 0.85,
    'sequence': 0.7,
    'color': 0.6,
    'pair': 0.45,
    'high-card': 0.2
  };
  
  return rankStrength[evaluation.rank] || 0;
}

export function makeAIDecision(
  hand: Card[],
  currentBet: number,
  aiChips: number,
  pot: number,
  playerBet: number
): AIDecision {
  const evaluation = evaluateHand(hand);
  const strength = getHandStrength(evaluation);
  const callAmount = currentBet - playerBet;
  
  // Add some randomness
  const randomFactor = 0.8 + Math.random() * 0.4; // 0.8 to 1.2
  const adjustedStrength = strength * randomFactor;
  
  // Can't afford to call
  if (callAmount > aiChips) {
    if (adjustedStrength > 0.6) {
      // Go all-in with good hand
      return { action: 'raise', raiseAmount: aiChips };
    }
    return { action: 'fold' };
  }
  
  // Decision based on hand strength
  if (adjustedStrength < 0.25) {
    // Very weak hand - mostly fold
    return Math.random() < 0.8 ? { action: 'fold' } : { action: 'call' };
  }
  
  if (adjustedStrength < 0.4) {
    // Weak hand - call or fold
    return Math.random() < 0.6 ? { action: 'call' } : { action: 'fold' };
  }
  
  if (adjustedStrength < 0.65) {
    // Medium hand - mostly call, sometimes raise
    if (Math.random() < 0.7) {
      return { action: 'call' };
    }
    const raiseAmount = Math.min(Math.floor(pot * 0.5), aiChips - callAmount);
    return { action: 'raise', raiseAmount: Math.max(raiseAmount, 10) };
  }
  
  // Strong hand - call or raise
  if (Math.random() < 0.4) {
    return { action: 'call' };
  }
  
  const raiseAmount = Math.min(
    Math.floor(pot * (0.5 + Math.random() * 0.5)),
    aiChips - callAmount
  );
  return { action: 'raise', raiseAmount: Math.max(raiseAmount, 20) };
}
