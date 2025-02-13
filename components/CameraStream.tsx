'use client';

import { useEffect, useState } from 'react';

interface CameraStreamProps {
  deviceMac: string;
  width?: number;
  height?: number;
}

export default function CameraStream({ deviceMac, width = 640, height = 480 }: CameraStreamProps) {
  const [streamUrl, setStreamUrl] = useState<string | null>(null);

  useEffect(() => {
    async function getStream() {
      try {
        const response = await fetch('/api/wyze', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'livestream',
            deviceMac,
          }),
        });

        const data = await response.json();
        if (data.url) {
          setStreamUrl(data.url);
        }
      } catch (error) {
        console.error('Failed to get stream:', error);
      }
    }

    getStream();
  }, [deviceMac]);

  if (!streamUrl) {
    return (
      <div className="flex items-center justify-center" style={{ width, height }}>
        Loading stream...
      </div>
    );
  }

  return (
    <div className="relative" style={{ width, height }}>
      <video
        src={streamUrl}
        width={width}
        height={height}
        autoPlay
        playsInline
        controls
        className="rounded-lg"
      />
    </div>
  );
} 