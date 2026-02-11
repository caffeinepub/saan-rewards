import { useState, useEffect } from 'react';

interface UseLocalVideoFileReturn {
  videoFile: File | null;
  videoUrl: string | null;
  duration: number;
  selectVideo: (file: File) => void;
  clearVideo: () => void;
}

export function useLocalVideoFile(): UseLocalVideoFileReturn {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [duration, setDuration] = useState(0);

  const selectVideo = (file: File) => {
    // Clean up previous URL
    if (videoUrl) {
      URL.revokeObjectURL(videoUrl);
    }

    setVideoFile(file);
    const url = URL.createObjectURL(file);
    setVideoUrl(url);
    setDuration(0);
  };

  const clearVideo = () => {
    if (videoUrl) {
      URL.revokeObjectURL(videoUrl);
    }
    setVideoFile(null);
    setVideoUrl(null);
    setDuration(0);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }
    };
  }, [videoUrl]);

  return {
    videoFile,
    videoUrl,
    duration,
    selectVideo,
    clearVideo,
  };
}
