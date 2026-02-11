import { Info, Shield, Smartphone, Download } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function AboutHelp() {
  return (
    <div className="space-y-5">
      {/* Privacy Notice */}
      <Alert className="border-primary/20 bg-primary/5">
        <Shield className="h-4 w-4 text-primary" />
        <AlertDescription className="space-y-2">
          <p className="font-semibold text-foreground">
            Your Privacy is Protected
          </p>
          <p className="text-sm text-muted-foreground">
            This video editor works entirely on your device. Your videos are never uploaded to any server. 
            All editing happens locally in your browser, ensuring complete privacy.
          </p>
        </AlertDescription>
      </Alert>

      <div className="space-y-2">
        <h3 className="font-semibold text-foreground flex items-center gap-2 text-base">
          <Info className="h-5 w-5 text-primary" />
          What is Video Editor?
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          A simple, privacy-focused video editor that runs entirely in your browser. 
          Edit videos on your phone without uploading them anywhere.
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-foreground flex items-center gap-2 text-base">
          <Download className="h-5 w-5 text-primary" />
          Features
        </h3>
        <ul className="text-sm text-muted-foreground space-y-1.5">
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5 font-bold">•</span>
            <span>Trim videos - set custom start and end points</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5 font-bold">•</span>
            <span>Mute or keep audio in your edited videos</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5 font-bold">•</span>
            <span>Preview your video before exporting</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5 font-bold">•</span>
            <span>Download edited videos directly to your device</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5 font-bold">•</span>
            <span>Works offline after first load</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5 font-bold">•</span>
            <span>No uploads - complete privacy</span>
          </li>
        </ul>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-foreground flex items-center gap-2 text-base">
          <Smartphone className="h-5 w-5 text-primary" />
          Install on Your Phone
        </h3>
        <div className="text-sm text-muted-foreground space-y-3">
          <p className="font-medium text-foreground">For Android Chrome:</p>
          <ol className="list-decimal list-inside space-y-1.5 ml-2">
            <li>Tap the <strong className="text-foreground">three dots menu</strong> (⋮) at the top right</li>
            <li>Select <strong className="text-foreground">"Add to Home screen"</strong></li>
            <li>Tap <strong className="text-foreground">"Add"</strong> or <strong className="text-foreground">"Install"</strong></li>
            <li>The app icon will appear on your home screen</li>
          </ol>
          
          <p className="font-medium text-foreground mt-4">For iPhone Safari:</p>
          <ol className="list-decimal list-inside space-y-1.5 ml-2">
            <li>Tap the <strong className="text-foreground">Share button</strong> (square with arrow)</li>
            <li>Scroll down and tap <strong className="text-foreground">"Add to Home Screen"</strong></li>
            <li>Tap <strong className="text-foreground">"Add"</strong> in the top right</li>
            <li>The app will appear on your home screen</li>
          </ol>
        </div>
      </div>

      {/* Local Processing Notice */}
      <Alert className="border-primary/20 bg-primary/5">
        <Info className="h-4 w-4 text-primary" />
        <AlertDescription className="space-y-2">
          <p className="font-semibold text-foreground">
            On-Device Processing
          </p>
          <p className="text-sm text-muted-foreground">
            All video editing happens on your device using your browser's built-in capabilities. 
            No internet connection is required for editing once the app is loaded. Your videos never leave your device.
          </p>
        </AlertDescription>
      </Alert>

      <div className="pt-3 border-t border-border">
        <p className="text-xs text-muted-foreground leading-relaxed">
          This Progressive Web App (PWA) can be installed on your device for quick access. 
          After the first visit, you can use it offline to edit your local videos.
        </p>
      </div>
    </div>
  );
}
