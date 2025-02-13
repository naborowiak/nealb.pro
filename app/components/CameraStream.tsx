import JSMpeg from 'jsmpeg-player';
import { useEffect, useRef } from 'react';

export default function CameraStream({ rtspUrl }: { rtspUrl: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const playerRef = useRef<JSMpeg | null>(null);

  useEffect(() => {
    if (canvasRef.current && !playerRef.current) {
      playerRef.current = new JSMpeg(rtspUrl, {
        canvas: canvasRef.current,
        autoplay: true
      });
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [rtspUrl]);

  return <canvas ref={canvasRef} />;
} 