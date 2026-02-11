import { useState } from 'react';
import { Download, Loader2, AlertCircle, Video } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { exportVideo } from '@/lib/videoExport';

interface ExportPanelProps {
  videoUrl: string | null;
  trimStart: number;
  trimEnd: number;
  muteAudio: boolean;
  disabled: boolean;
  onNewVideo: () => void;
}

export function ExportPanel({
  videoUrl,
  trimStart,
  trimEnd,
  muteAudio,
  disabled,
  onNewVideo,
}: ExportPanelProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportError, setExportError] = useState<string | null>(null);
  const [exportedUrl, setExportedUrl] = useState<string | null>(null);

  const handleExport = async () => {
    if (!videoUrl) return;

    setIsExporting(true);
    setExportProgress(0);
    setExportError(null);
    setExportedUrl(null);

    try {
      const blob = await exportVideo({
        videoUrl,
        trimStart,
        trimEnd,
        muteAudio,
        onProgress: (progress) => setExportProgress(progress),
      });

      const url = URL.createObjectURL(blob);
      setExportedUrl(url);
      setExportProgress(100);
    } catch (error) {
      console.error('Export failed:', error);
      setExportError(
        error instanceof Error
          ? error.message
          : 'Export failed. Your browser may not support this feature.'
      );
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownload = () => {
    if (!exportedUrl) return;

    const a = document.createElement('a');
    a.href = exportedUrl;
    a.download = `edited-video-${Date.now()}.mp4`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleRetry = () => {
    setExportError(null);
    setExportedUrl(null);
    setExportProgress(0);
  };

  return (
    <Card className="tj-surface-elevated">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Video className="h-5 w-5 text-primary" />
          Export Video
        </CardTitle>
        <CardDescription>
          Process and download your edited video
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Export Progress */}
        {isExporting && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Processing...</span>
              <span className="font-medium">{exportProgress}%</span>
            </div>
            <Progress value={exportProgress} className="w-full" />
          </div>
        )}

        {/* Export Error */}
        {exportError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="space-y-2">
              <p className="font-semibold">Export Failed</p>
              <p className="text-sm">{exportError}</p>
            </AlertDescription>
          </Alert>
        )}

        {/* Export Success */}
        {exportedUrl && !isExporting && (
          <Alert className="border-primary/20 bg-primary/5">
            <Download className="h-4 w-4 text-primary" />
            <AlertDescription className="text-sm text-foreground">
              Your video is ready to download!
            </AlertDescription>
          </Alert>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          {!exportedUrl ? (
            <>
              <Button
                onClick={handleExport}
                disabled={disabled || isExporting}
                size="lg"
                className="w-full tj-btn-primary tj-interactive tj-focus-ring"
              >
                {isExporting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Exporting...
                  </>
                ) : (
                  <>
                    <Video className="mr-2 h-5 w-5" />
                    Export Video
                  </>
                )}
              </Button>
              {exportError && (
                <Button
                  onClick={handleRetry}
                  variant="outline"
                  size="lg"
                  className="w-full tj-btn-secondary tj-interactive tj-focus-ring"
                >
                  <AlertCircle className="mr-2 h-5 w-5" />
                  Retry Export
                </Button>
              )}
            </>
          ) : (
            <>
              <Button
                onClick={handleDownload}
                size="lg"
                className="w-full tj-btn-primary tj-interactive tj-focus-ring"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Video
              </Button>
              <Button
                onClick={onNewVideo}
                variant="outline"
                size="lg"
                className="w-full tj-btn-secondary tj-interactive tj-focus-ring"
              >
                Edit Another Video
              </Button>
            </>
          )}
        </div>

        <p className="text-xs text-muted-foreground text-center">
          All processing happens on your device. No uploads required.
        </p>
      </CardContent>
    </Card>
  );
}
