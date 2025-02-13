'use client';

import { useWyze } from '@/lib/contexts/WyzeContext';
import WyzeCamera from './WyzeCamera';

export default function CameraGrid() {
  const { cameras } = useWyze();

  if (cameras.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold text-gray-900">No cameras configured</h3>
        <p className="mt-2 text-gray-600">Add your first Wyze camera to get started</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cameras.map((camera) => (
        <WyzeCamera
          key={camera.id}
          id={camera.id}
          name={camera.name}
          rtspUrl={camera.rtspUrl}
        />
      ))}
    </div>
  );
} 