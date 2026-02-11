import { Volume2, VolumeX } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface AudioToggleProps {
  muteAudio: boolean;
  onMuteAudioChange: (muted: boolean) => void;
}

export function AudioToggle({ muteAudio, onMuteAudioChange }: AudioToggleProps) {
  return (
    <Card className="tj-surface-elevated">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          {muteAudio ? (
            <VolumeX className="h-5 w-5 text-muted-foreground" />
          ) : (
            <Volume2 className="h-5 w-5 text-primary" />
          )}
          Audio Settings
        </CardTitle>
        <CardDescription>
          Control audio in the exported video
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <Label htmlFor="mute-audio" className="text-sm font-medium cursor-pointer">
            Mute Audio
          </Label>
          <Switch
            id="mute-audio"
            checked={muteAudio}
            onCheckedChange={onMuteAudioChange}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          {muteAudio
            ? 'Audio will be removed from the exported video'
            : 'Audio will be included in the exported video'}
        </p>
      </CardContent>
    </Card>
  );
}
