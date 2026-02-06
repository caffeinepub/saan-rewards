// Game state management for Teen Patti

import { Card } from './cards';
import { HandEvaluation } from './handRanking';

export type GamePhase = 'start' | 'betting' | 'showdown' | 'result';

export interface PlayerState {
  hand: Card[];
  chips: number;
  currentBet: number;
  folded: boolean;
}

export interface GameState {
  phase: GamePhase;
  player: PlayerState;
  opponent: PlayerState;
  pot: number;
  currentBet: number;
  deck: Card[];
  playerEvaluation?: HandEvaluation;
  opponentEvaluation?: HandEvaluation;
  winner?: 'player' | 'opponent' | 'tie';
  message?: string;
}

export function createInitialState(): GameState {
  return {
    phase: 'start',
    player: {
      hand: [],
      chips: 1000,
      currentBet: 0,
      folded: false
    },
    opponent: {
      hand: [],
      chips: 1000,
      currentBet: 0,
      folded: false
    },
    pot: 0,
    currentBet: 0,
    deck: []
  };
}

export function startNewHand(state: GameState, playerHand: Card[], opponentHand: Card[], deck: Card[]): GameState {
  const ante = 10;
  
  return {
    ...state,
    phase: 'betting',
    player: {
      hand: playerHand,
      chips: state.player.chips - ante,
      currentBet: ante,
      folded: false
    },
    opponent: {
      hand: opponentHand,
      chips: state.opponent.chips - ante,
      currentBet: ante,
      folded: false
    },
    pot: ante * 2,
    currentBet: ante,
    deck,
    playerEvaluation: undefined,
    opponentEvaluation: undefined,
    winner: undefined,
    message: undefined
  };
}

export function playerFold(state: GameState): GameState {
  return {
    ...state,
    phase: 'result',
    player: { ...state.player, folded: true },
    opponent: { ...state.opponent, chips: state.opponent.chips + state.pot },
    winner: 'opponent',
    message: 'You folded. Opponent wins!'
  };
}

export function playerCall(state: GameState): GameState {
  const callAmount = state.currentBet - state.player.currentBet;
  
  return {
    ...state,
    player: {
      ...state.player,
      chips: state.player.chips - callAmount,
      currentBet: state.currentBet
    },
    pot: state.pot + callAmount
  };
}

export function playerRaise(state: GameState, raiseAmount: number): GameState {
  const callAmount = state.currentBet - state.player.currentBet;
  const totalAmount = callAmount + raiseAmount;
  const newBet = state.player.currentBet + totalAmount;
  
  return {
    ...state,
    player: {
      ...state.player,
      chips: state.player.chips - totalAmount,
      currentBet: newBet
    },
    pot: state.pot + totalAmount,
    currentBet: newBet
  };
}

export function opponentFold(state: GameState): GameState {
  return {
    ...state,
    phase: 'result',
    opponent: { ...state.opponent, folded: true },
    player: { ...state.player, chips: state.player.chips + state.pot },
    winner: 'player',
    message: 'Opponent folded. You win!'
  };
}

export function opponentCall(state: GameState): GameState {
  const callAmount = state.currentBet - state.opponent.currentBet;
  
  return {
    ...state,
    opponent: {
      ...state.opponent,
      chips: state.opponent.chips - callAmount,
      currentBet: state.currentBet
    },
    pot: state.pot + callAmount
  };
}

export function opponentRaise(state: GameState, raiseAmount: number): GameState {
  const callAmount = state.currentBet - state.opponent.currentBet;
  const totalAmount = callAmount + raiseAmount;
  const newBet = state.opponent.currentBet + totalAmount;
  
  return {
    ...state,
    opponent: {
      ...state.opponent,
      chips: state.opponent.chips - totalAmount,
      currentBet: newBet
    },
    pot: state.pot + totalAmount,
    currentBet: newBet
  };
}

export function goToShowdown(
  state: GameState,
  playerEval: HandEvaluation,
  opponentEval: HandEvaluation,
  winner: 'player' | 'opponent' | 'tie'
): GameState {
  let newState = {
    ...state,
    phase: 'showdown' as GamePhase,
    playerEvaluation: playerEval,
    opponentEvaluation: opponentEval,
    winner
  };
  
  // Award pot
  if (winner === 'player') {
    newState.player.chips += state.pot;
    newState.message = 'You win!';
  } else if (winner === 'opponent') {
    newState.opponent.chips += state.pot;
    newState.message = 'Opponent wins!';
  } else {
    // Split pot
    const half = Math.floor(state.pot / 2);
    newState.player.chips += half;
    newState.opponent.chips += state.pot - half;
    newState.message = "It's a tie!";
  }
  
  return newState;
}
