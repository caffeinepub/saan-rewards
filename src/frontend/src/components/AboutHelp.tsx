import { ExternalLink, Download, Smartphone, Info } from 'lucide-react';

const SAAN_REWARDS_URL = 'https://sites.google.com/view/saanrewards/home';

export default function AboutHelp() {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <h3 className="font-semibold text-foreground flex items-center gap-2 text-base">
          <Info className="h-5 w-5 text-primary" />
          What is this app?
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          This is a Progressive Web App (PWA) that provides quick and easy access to the Saan Rewards website. 
          Install it on your device for convenient access from your home screen.
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-foreground flex items-center gap-2 text-base">
          <ExternalLink className="h-5 w-5 text-primary" />
          Saan Rewards Website
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-2">
          This app opens the official Saan Rewards website:
        </p>
        <a
          href={SAAN_REWARDS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-primary hover:underline break-all tj-interactive inline-flex items-center gap-1"
        >
          {SAAN_REWARDS_URL}
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-foreground flex items-center gap-2 text-base">
          <Download className="h-5 w-5 text-primary" />
          How to Install
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-2">
          Install this app on your device for quick access and an app-like experience.
        </p>
        <div className="text-sm text-muted-foreground space-y-2">
          <p className="font-medium text-foreground">Android Chrome:</p>
          <ol className="list-decimal list-inside space-y-1 ml-2">
            <li>Tap the menu icon (three dots) in the top-right corner</li>
            <li>Select "Add to Home screen"</li>
            <li>Confirm by tapping "Add" or "Install"</li>
            <li>The app icon will appear on your home screen</li>
          </ol>
          <p className="text-xs pt-1">
            For other browsers, look for "Add to Home screen" or "Install" in the browser menu.
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-foreground flex items-center gap-2 text-base">
          <Smartphone className="h-5 w-5 text-primary" />
          How to Use
        </h3>
        <ul className="text-sm text-muted-foreground space-y-1.5">
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5 font-bold">•</span>
            <span>Tap <strong className="text-foreground">"Open Saan Rewards"</strong> to visit the website in the same tab</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5 font-bold">•</span>
            <span>Tap <strong className="text-foreground">"Open in New Tab"</strong> to open the website in a new browser tab</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5 font-bold">•</span>
            <span>Use the <strong className="text-foreground">Install</strong> button to add this app to your home screen</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5 font-bold">•</span>
            <span>Use the <strong className="text-foreground">Share</strong> button to share this app with others</span>
          </li>
        </ul>
      </div>

      <div className="pt-3 border-t border-border">
        <p className="text-xs text-muted-foreground leading-relaxed">
          This Progressive Web App (PWA) runs in your web browser and provides a convenient shortcut 
          to access the Saan Rewards website. Install it on your home screen for quick access anytime.
        </p>
      </div>
    </div>
  );
}
