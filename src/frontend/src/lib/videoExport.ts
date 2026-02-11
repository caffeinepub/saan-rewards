interface ExportOptions {
  videoUrl: string;
  trimStart: number;
  trimEnd: number;
  muteAudio: boolean;
  onProgress?: (progress: number) => void;
}

// Extend HTMLVideoElement to include captureStream (not in standard types but supported in browsers)
interface HTMLVideoElementWithCapture extends HTMLVideoElement {
  captureStream?: () => MediaStream;
}

export async function exportVideo({
  videoUrl,
  trimStart,
  trimEnd,
  muteAudio,
  onProgress,
}: ExportOptions): Promise<Blob> {
  return new Promise((resolve, reject) => {
    try {
      // Create video element for processing
      const video = document.createElement('video') as HTMLVideoElementWithCapture;
      video.src = videoUrl;
      video.crossOrigin = 'anonymous';

      video.onloadedmetadata = async () => {
        try {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          if (!ctx) {
            throw new Error('Could not get canvas context');
          }

          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;

          // Check for MediaRecorder support
          if (!window.MediaRecorder) {
            throw new Error('MediaRecorder is not supported in your browser');
          }

          const stream = canvas.captureStream(30); // 30 fps

          // Add audio track if not muted
          if (!muteAudio && video.captureStream) {
            try {
              const videoStream = video.captureStream();
              const audioTracks = videoStream.getAudioTracks();
              if (audioTracks.length > 0) {
                stream.addTrack(audioTracks[0]);
              }
            } catch (e) {
              console.warn('Could not capture audio:', e);
            }
          }

          const chunks: Blob[] = [];
          const mediaRecorder = new MediaRecorder(stream, {
            mimeType: 'video/webm;codecs=vp8,opus',
          });

          mediaRecorder.ondataavailable = (e) => {
            if (e.data.size > 0) {
              chunks.push(e.data);
            }
          };

          mediaRecorder.onstop = () => {
            const blob = new Blob(chunks, { type: 'video/webm' });
            resolve(blob);
          };

          mediaRecorder.onerror = (e) => {
            reject(new Error('MediaRecorder error: ' + e));
          };

          // Start recording
          mediaRecorder.start(100); // Collect data every 100ms

          // Set video to start time
          video.currentTime = trimStart;

          const duration = trimEnd - trimStart;
          let lastProgress = 0;

          const captureFrame = () => {
            if (video.currentTime >= trimEnd) {
              mediaRecorder.stop();
              video.pause();
              return;
            }

            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            // Update progress
            const progress = Math.min(
              100,
              Math.floor(((video.currentTime - trimStart) / duration) * 100)
            );
            if (progress > lastProgress && onProgress) {
              lastProgress = progress;
              onProgress(progress);
            }

            requestAnimationFrame(captureFrame);
          };

          video.onplay = () => {
            captureFrame();
          };

          video.play();
        } catch (error) {
          reject(error);
        }
      };

      video.onerror = () => {
        reject(new Error('Failed to load video'));
      };
    } catch (error) {
      reject(error);
    }
  });
}
