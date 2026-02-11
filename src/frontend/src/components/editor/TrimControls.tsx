import { Scissors } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';

interface TrimControlsProps {
  duration: number;
  trimStart: number;
  trimEnd: number;
  onTrimStartChange: (value: number) => void;
  onTrimEndChange: (value: number) => void;
}

export function TrimControls({
  duration,
  trimStart,
  trimEnd,
  onTrimStartChange,
  onTrimEndChange,
}: TrimControlsProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = (seconds % 60).toFixed(1);
    return `${mins}:${secs.padStart(4, '0')}`;
  };

  return (
    <Card className="tj-surface-elevated">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Scissors className="h-5 w-5 text-primary" />
          Trim Video
        </CardTitle>
        <CardDescription>
          Set the start and end points for your edited video
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Start Time */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="trim-start" className="text-sm font-medium">
              Start Time
            </Label>
            <span className="text-sm text-muted-foreground">{formatTime(trimStart)}</span>
          </div>
          <Slider
            id="trim-start"
            min={0}
            max={duration}
            step={0.1}
            value={[trimStart]}
            onValueChange={(values) => onTrimStartChange(values[0])}
            className="w-full"
          />
          <Input
            type="number"
            min={0}
            max={duration}
            step={0.1}
            value={trimStart.toFixed(1)}
            onChange={(e) => onTrimStartChange(parseFloat(e.target.value) || 0)}
            className="w-full"
          />
        </div>

        {/* End Time */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="trim-end" className="text-sm font-medium">
              End Time
            </Label>
            <span className="text-sm text-muted-foreground">{formatTime(trimEnd)}</span>
          </div>
          <Slider
            id="trim-end"
            min={0}
            max={duration}
            step={0.1}
            value={[trimEnd]}
            onValueChange={(values) => onTrimEndChange(values[0])}
            className="w-full"
          />
          <Input
            type="number"
            min={0}
            max={duration}
            step={0.1}
            value={trimEnd.toFixed(1)}
            onChange={(e) => onTrimEndChange(parseFloat(e.target.value) || 0)}
            className="w-full"
          />
        </div>

        {/* Duration Display */}
        <div className="pt-2 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Output Duration:</span>
            <span className="font-medium text-foreground">
              {formatTime(Math.max(0, trimEnd - trimStart))}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
