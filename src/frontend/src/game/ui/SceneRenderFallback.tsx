import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface SceneRenderFallbackProps {
  onRetry: () => void;
}

export default function SceneRenderFallback({ onRetry }: SceneRenderFallbackProps) {
  return (
    <div className="w-full h-full flex items-center justify-center p-4 bg-background">
      <Card className="max-w-md w-full">
        <CardHeader>
          <div className="flex items-center gap-3">
            <AlertCircle className="h-8 w-8 text-destructive" />
            <div>
              <CardTitle>Game Failed to Load</CardTitle>
              <CardDescription>The 3D scene could not be rendered</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            This could be due to:
          </p>
          <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
            <li>Your device doesn't support WebGL</li>
            <li>Your browser needs to be updated</li>
            <li>Hardware acceleration is disabled</li>
            <li>A temporary rendering issue occurred</li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button onClick={onRetry} className="w-full">
            Retry
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
