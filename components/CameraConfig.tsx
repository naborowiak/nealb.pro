'use client';

import { useState } from 'react';
import { useCamera } from '@/lib/contexts/CameraContext';

export default function CameraConfig() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [rtspUrl, setRtspUrl] = useState('');
  const { addCamera } = useCamera();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCamera({
      id: Date.now().toString(),
      name,
      rtspUrl,
      model: 'Wyze Cam v3',
      status: 'offline'
    });
    setName('');
    setRtspUrl('');
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Add Wyze Camera
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Wyze Camera</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Camera Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  RTSP URL
                </label>
                <input
                  type="text"
                  value={rtspUrl}
                  onChange={(e) => setRtspUrl(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  placeholder="rtsp://username:password@camera-ip:port/live"
                  required
                />
                <p className="mt-1 text-sm text-gray-500">
                  Enable RTSP in Wyze app first: Device Settings → Advanced Settings → RTSP
                </p>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Add Camera
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
} 