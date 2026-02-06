import { useState, useEffect } from 'react';
import { createDeck, dealHands } from './engine/cards';
import { evaluateHand, determineWinner } from './engine/handRanking';
import { makeAIDecision } from './engine/ai';
import {
  GameState,
  createInitialState,
  startNewHand,
  playerFold,
  playerCall,
  playerRaise,
  opponentFold,
  opponentCall,
  opponentRaise,
  goToShowdown
} from './engine/gameState';
import { TeenPattiStartScreen } from './ui/TeenPattiStartScreen';
import { TeenPattiTable } from './ui/TeenPattiTable';
import { TeenPattiResultOverlay } from './ui/TeenPattiResultOverlay';

interface TeenPattiGameShellProps {
  onShowRules: () => void;
}

export function TeenPattiGameShell({ onShowRules }: TeenPattiGameShellProps) {
  const [gameState, setGameState] = useState<GameState>(createInitialState());
  const [isProcessing, setIsProcessing] = useState(false);

  const handleStartGame = () => {
    const deck = createDeck();
    const { playerHand, opponentHand, remainingDeck } = dealHands(deck);
    setGameState(startNewHand(gameState, playerHand, opponentHand, remainingDeck));
  };

  const handlePlayerFold = () => {
    setGameState(playerFold(gameState));
  };

  const handlePlayerCall = () => {
    setIsProcessing(true);
    const newState = playerCall(gameState);
    setGameState(newState);
    
    // AI responds after a short delay
    setTimeout(() => {
      processAITurn(newState);
    }, 800);
  };

  const handlePlayerRaise = (amount: number) => {
    setIsProcessing(true);
    const newState = playerRaise(gameState, amount);
    setGameState(newState);
    
    // AI responds after a short delay
    setTimeout(() => {
      processAITurn(newState);
    }, 800);
  };

  const processAITurn = (currentState: GameState) => {
    const decision = makeAIDecision(
      currentState.opponent.hand,
      currentState.currentBet,
      currentState.opponent.chips,
      currentState.pot,
      currentState.opponent.currentBet
    );

    let newState = currentState;

    if (decision.action === 'fold') {
      newState = opponentFold(currentState);
      setGameState(newState);
      setIsProcessing(false);
    } else if (decision.action === 'call') {
      newState = opponentCall(currentState);
      
      // Both players have matched bets, go to showdown
      if (newState.player.currentBet === newState.opponent.currentBet) {
        setTimeout(() => {
          performShowdown(newState);
        }, 500);
      } else {
        setGameState(newState);
        setIsProcessing(false);
      }
    } else if (decision.action === 'raise' && decision.raiseAmount) {
      newState = opponentRaise(currentState, decision.raiseAmount);
      setGameState(newState);
      setIsProcessing(false);
    }
  };

  const performShowdown = (currentState: GameState) => {
    const playerEval = evaluateHand(currentState.player.hand);
    const opponentEval = evaluateHand(currentState.opponent.hand);
    const winner = determineWinner(currentState.player.hand, currentState.opponent.hand);
    
    const finalState = goToShowdown(currentState, playerEval, opponentEval, winner);
    setGameState(finalState);
    setIsProcessing(false);
  };

  const handlePlayAgain = () => {
    // Check if either player is out of chips
    if (gameState.player.chips < 10) {
      // Reset both players
      const resetState = createInitialState();
      setGameState(resetState);
      return;
    }
    
    if (gameState.opponent.chips < 10) {
      // Reset both players
      const resetState = createInitialState();
      setGameState(resetState);
      return;
    }

    // Start new hand
    const deck = createDeck();
    const { playerHand, opponentHand, remainingDeck } = dealHands(deck);
    setGameState(startNewHand(gameState, playerHand, opponentHand, remainingDeck));
  };

  if (gameState.phase === 'start') {
    return (
      <TeenPattiStartScreen
        onStartGame={handleStartGame}
        onShowRules={onShowRules}
      />
    );
  }

  return (
    <div className="relative h-full w-full">
      <TeenPattiTable
        gameState={gameState}
        onFold={handlePlayerFold}
        onCall={handlePlayerCall}
        onRaise={handlePlayerRaise}
        showOpponentCards={gameState.phase === 'showdown' || gameState.phase === 'result'}
        isProcessing={isProcessing}
      />
      <TeenPattiResultOverlay
        gameState={gameState}
        onPlayAgain={handlePlayAgain}
      />
    </div>
  );
}
