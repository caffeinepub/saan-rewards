import { ExternalLink, Info, AlertTriangle, Trophy, Users } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function AboutHelp() {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <h3 className="font-semibold text-foreground flex items-center gap-2 text-base">
          <Info className="h-5 w-5 text-primary" />
          What is Teen Patti?
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Teen Patti is a classic 3-card poker game popular in South Asia. This is a digital version 
          where you play against a computer opponent using play chips only.
        </p>
      </div>

      {/* Non-Gambling Disclaimer */}
      <Alert className="border-yellow-500/20 bg-yellow-500/10">
        <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-500" />
        <AlertDescription className="space-y-2">
          <p className="font-semibold text-yellow-700 dark:text-yellow-400">
            Entertainment Only - No Real Money Gambling
          </p>
          <p className="text-sm text-yellow-700 dark:text-yellow-400">
            This game uses play chips only and involves no real money gambling whatsoever. 
            It is purely for entertainment purposes. No deposits, withdrawals, or real money 
            transactions are possible.
          </p>
        </AlertDescription>
      </Alert>

      <div className="space-y-2">
        <h3 className="font-semibold text-foreground flex items-center gap-2 text-base">
          <Trophy className="h-5 w-5 text-primary" />
          How to Play
        </h3>
        <div className="text-sm text-muted-foreground space-y-3">
          <div>
            <p className="font-medium text-foreground mb-2">Game Flow:</p>
            <ol className="list-decimal list-inside space-y-1.5 ml-2">
              <li>Each player (you and the opponent) receives 3 cards</li>
              <li>Both players place an initial ante (10 chips)</li>
              <li>You can <strong className="text-foreground">Fold</strong> (give up), <strong className="text-foreground">Call/Check</strong> (match the bet), or <strong className="text-foreground">Raise</strong> (increase the bet)</li>
              <li>The opponent responds to your action</li>
              <li>When both players match bets, cards are revealed</li>
              <li>The best hand wins the pot</li>
            </ol>
          </div>
          
          <div>
            <p className="font-medium text-foreground mb-2">Hand Rankings (Best to Worst):</p>
            <ol className="list-decimal list-inside space-y-1 ml-2">
              <li><strong className="text-foreground">Trail</strong> - Three of a kind (e.g., K-K-K)</li>
              <li><strong className="text-foreground">Pure Sequence</strong> - Straight flush (e.g., 5♥-6♥-7♥)</li>
              <li><strong className="text-foreground">Sequence</strong> - Straight (e.g., 5♥-6♣-7♦)</li>
              <li><strong className="text-foreground">Color</strong> - Flush (e.g., K♥-9♥-3♥)</li>
              <li><strong className="text-foreground">Pair</strong> - Two of a kind (e.g., 8-8-K)</li>
              <li><strong className="text-foreground">High Card</strong> - Highest card wins</li>
            </ol>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-foreground flex items-center gap-2 text-base">
          <Users className="h-5 w-5 text-primary" />
          Game Features
        </h3>
        <ul className="text-sm text-muted-foreground space-y-1.5">
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5 font-bold">•</span>
            <span>Play against a computer opponent with realistic AI</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5 font-bold">•</span>
            <span>Start with 1,000 play chips each</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5 font-bold">•</span>
            <span>Mobile-friendly touch controls</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5 font-bold">•</span>
            <span>Play as many hands as you want</span>
          </li>
        </ul>
      </div>

      {/* Source Code Notice */}
      <Alert className="border-primary/20 bg-primary/5">
        <ExternalLink className="h-4 w-4 text-primary" />
        <AlertDescription className="space-y-2">
          <p className="font-semibold text-foreground">
            Open Source Project
          </p>
          <p className="text-sm text-muted-foreground">
            You have full access to the project source code and all included original assets within this application. 
            All game graphics, card designs, and visual elements are original creations made specifically for this project.
          </p>
        </AlertDescription>
      </Alert>

      <div className="pt-3 border-t border-border">
        <p className="text-xs text-muted-foreground leading-relaxed">
          This Progressive Web App (PWA) can be installed on your device for quick access. 
          The game runs entirely in your browser with no server connection required for gameplay.
        </p>
      </div>
    </div>
  );
}
