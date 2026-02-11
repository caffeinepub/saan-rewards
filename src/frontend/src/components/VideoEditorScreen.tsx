import { useState } from 'react';
import { Upload, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useLocalVideoFile } from '@/hooks/useLocalVideoFile';
import { TrimControls } from '@/components/editor/TrimControls';
import { AudioToggle } from '@/components/editor/AudioToggle';
import { ExportPanel } from '@/components/editor/ExportPanel';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';

export function VideoEditorScreen() {
  const { isOnline } = useOnlineStatus();
  const { videoFile, videoUrl, duration, selectVideo, clearVideo } = useLocalVideoFile();
  const [trimStart, setTrimStart] = useState(0);
  const [trimEnd, setTrimEnd] = useState(0);
  const [muteAudio, setMuteAudio] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Update trim end when duration changes
  const handleVideoLoaded = (newDuration: number) => {
    setTrimEnd(newDuration);
  };

  // Validate trim values
  const validateTrim = (start: number, end: number): boolean => {
    if (start < 0 || end > duration) {
      setValidationError('Trim values must be within video duration');
      return false;
    }
    if (start >= end) {
      setValidationError('Start time must be less than end time');
      return false;
    }
    setValidationError(null);
    return true;
  };

  const handleTrimStartChange = (value: number) => {
    setTrimStart(value);
    validateTrim(value, trimEnd);
  };

  const handleTrimEndChange = (value: number) => {
    setTrimEnd(value);
    validateTrim(trimStart, value);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      selectVideo(file);
      setTrimStart(0);
      setValidationError(null);
    }
  };

  const handleNewVideo = () => {
    clearVideo();
    setTrimStart(0);
    setTrimEnd(0);
    setMuteAudio(false);
    setValidationError(null);
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="container mx-auto px-4 py-6 max-w-4xl space-y-6">
        {/* Offline Status Banner */}
        {!isOnline && (
          <Alert className="border-yellow-500/20 bg-yellow-500/10">
            <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-500" />
            <AlertDescription className="text-sm text-yellow-700 dark:text-yellow-400">
              You're offline. Local video editing will still work, but some features may be limited.
            </AlertDescription>
          </Alert>
        )}

        {!videoFile ? (
          /* Upload Card */
          <Card className="tj-surface-elevated">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Upload className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Select a Video</CardTitle>
              <CardDescription className="text-base">
                Choose a video file from your device to start editing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <label htmlFor="video-upload">
                <input
                  id="video-upload"
                  type="file"
                  accept="video/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <Button
                  asChild
                  size="lg"
                  className="w-full tj-btn-primary tj-interactive tj-focus-ring"
                >
                  <span className="cursor-pointer">
                    <Upload className="mr-2 h-5 w-5" />
                    Choose Video File
                  </span>
                </Button>
              </label>
              <p className="text-xs text-muted-foreground text-center mt-4">
                Your video stays on your device. No uploads, completely private.
              </p>
            </CardContent>
          </Card>
        ) : (
          /* Editor Interface */
          <div className="space-y-6">
            {/* Video Preview */}
            <Card className="tj-surface-elevated">
              <CardHeader>
                <CardTitle className="text-lg">Preview</CardTitle>
                <CardDescription>
                  {videoFile.name} • {duration > 0 ? `${duration.toFixed(1)}s` : 'Loading...'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative w-full bg-black rounded-lg overflow-hidden aspect-video">
                  {videoUrl && (
                    <video
                      src={videoUrl}
                      controls
                      className="w-full h-full"
                      onLoadedMetadata={(e) => {
                        const video = e.currentTarget;
                        handleVideoLoaded(video.duration);
                      }}
                    >
                      Your browser does not support video playback.
                    </video>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Validation Error */}
            {validationError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{validationError}</AlertDescription>
              </Alert>
            )}

            {/* Trim Controls */}
            {duration > 0 && (
              <TrimControls
                duration={duration}
                trimStart={trimStart}
                trimEnd={trimEnd}
                onTrimStartChange={handleTrimStartChange}
                onTrimEndChange={handleTrimEndChange}
              />
            )}

            {/* Audio Toggle */}
            <AudioToggle muteAudio={muteAudio} onMuteAudioChange={setMuteAudio} />

            {/* Export Panel */}
            <ExportPanel
              videoUrl={videoUrl}
              trimStart={trimStart}
              trimEnd={trimEnd}
              muteAudio={muteAudio}
              disabled={!duration || !!validationError}
              onNewVideo={handleNewVideo}
            />
          </div>
        )}
      </div>
    </div>
  );
}
