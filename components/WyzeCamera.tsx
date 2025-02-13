'use client';

import { useEffect, useRef } from 'react';
import { useWyze } from '@/lib/contexts/WyzeContext';

interface WyzeCameraProps {
  id: string;
  name: string;
  rtspUrl: string;
}

export default function WyzeCamera({ id, name, rtspUrl }: WyzeCameraProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { setError } = useWyze();

  useEffect(() => {
    if (videoRef.current) {
      // Using JSMpeg for RTSP stream handling
      const player = new JSMpeg.Player(rtspUrl, {
        canvas: videoRef.current,
        autoplay: true,
        audio: false,
        loop: true
      });

      player.on('error', (error: Error) => {
        setError(`Failed to connect to camera ${name}: ${error.message}`);
      });

      return () => {
        player.destroy();
      };
    }
  }, [rtspUrl, name, setError]);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="aspect-video bg-gray-900 relative">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          playsInline
        />
        
        {/* Camera Controls */}
        <div className="absolute bottom-4 right-4 flex space-x-2">
          <button className="p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-75">
            <span className="sr-only">Take Snapshot</span>
            {/* Camera icon */}
          </button>
          <button className="p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-75">
            <span className="sr-only">Record</span>
            {/* Record icon */}
          </button>
          <button className="p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-75">
            <span className="sr-only">Settings</span>
            {/* Settings icon */}
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{name}</h3>
          <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
            Live
          </span>
        </div>
      </div>
    </div>
  );
} 