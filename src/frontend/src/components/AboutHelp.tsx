import { Gamepad2, Smartphone, Monitor, Scale, Wifi, Download } from 'lucide-react';

export default function AboutHelp() {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <h3 className="font-semibold text-foreground flex items-center gap-2 text-base">
          <Gamepad2 className="h-5 w-5 text-primary" />
          What is Traffic Jam?
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Traffic Jam is a 3D endless driving game where you navigate through traffic obstacles. 
          Avoid collisions, collect points, and see how far you can go!
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-foreground flex items-center gap-2 text-base">
          <Wifi className="h-5 w-5 text-primary" />
          Internet Connection Required
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Traffic Jam requires an active internet connection to play. Offline play is not supported. 
          If your connection drops during gameplay, the game will pause until you're back online.
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-foreground flex items-center gap-2 text-base">
          <Download className="h-5 w-5 text-primary" />
          How to Install
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-2">
          Install Traffic Jam on your device for quick access and an app-like experience.
        </p>
        <div className="text-sm text-muted-foreground space-y-2">
          <p className="font-medium text-foreground">Android Chrome:</p>
          <ol className="list-decimal list-inside space-y-1 ml-2">
            <li>Tap the menu icon (three dots) in the top-right corner</li>
            <li>Select "Add to Home screen"</li>
            <li>Confirm by tapping "Add" or "Install"</li>
          </ol>
          <p className="text-xs pt-1">
            For other browsers, look for "Add to Home screen" or "Install" in the browser menu.
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-foreground flex items-center gap-2 text-base">
          <Monitor className="h-5 w-5 text-primary" />
          Desktop Controls
        </h3>
        <ul className="text-sm text-muted-foreground space-y-1.5">
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5 font-bold">•</span>
            <span><strong className="text-foreground">Arrow Keys</strong> or <strong className="text-foreground">A/D</strong> - Steer left and right</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5 font-bold">•</span>
            <span><strong className="text-foreground">Space</strong> - Brake/Slow down</span>
          </li>
        </ul>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-foreground flex items-center gap-2 text-base">
          <Smartphone className="h-5 w-5 text-primary" />
          Mobile Controls
        </h3>
        <ul className="text-sm text-muted-foreground space-y-1.5">
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5 font-bold">•</span>
            <span>Use the on-screen <strong className="text-foreground">Left</strong> and <strong className="text-foreground">Right</strong> buttons to steer</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5 font-bold">•</span>
            <span>Tap the <strong className="text-foreground">Brake</strong> button to slow down</span>
          </li>
        </ul>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-foreground text-base">How to Play</h3>
        <ul className="text-sm text-muted-foreground space-y-1.5">
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5 font-bold">•</span>
            <span>Avoid hitting traffic obstacles (other cars and barriers)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5 font-bold">•</span>
            <span>Your score increases the longer you survive</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5 font-bold">•</span>
            <span>Collision ends the game - tap Restart to try again</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5 font-bold">•</span>
            <span>Stay in your lane and watch for upcoming obstacles</span>
          </li>
        </ul>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-foreground flex items-center gap-2 text-base">
          <Scale className="h-5 w-5 text-primary" />
          Legal & Assets
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          This game uses only original, procedurally-generated 3D assets created specifically for this project. 
          No copyrighted or unauthorized content is included. All game elements (car models, road, obstacles) 
          are simple geometric shapes rendered in real-time.
        </p>
      </div>

      <div className="pt-3 border-t border-border">
        <p className="text-xs text-muted-foreground leading-relaxed">
          Traffic Jam runs entirely in your web browser using WebGL technology. 
          Install this Progressive Web App (PWA) on your home screen for quick access and an app-like experience.
        </p>
      </div>
    </div>
  );
}
