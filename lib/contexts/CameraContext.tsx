'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface Camera {
  id: string;
  name: string;
  rtspUrl: string;
  model: string;
  status: 'online' | 'offline';
}

interface CameraContextType {
  cameras: Camera[];
  addCamera: (camera: Camera) => void;
  removeCamera: (id: string) => void;
  updateCamera: (id: string, data: Partial<Camera>) => void;
}

const CameraContext = createContext<CameraContextType | undefined>(undefined);

export function CameraProvider({ children }: { children: ReactNode }) {
  const [cameras, setCameras] = useState<Camera[]>([]);

  const addCamera = (camera: Camera) => {
    setCameras(prev => [...prev, camera]);
  };

  const removeCamera = (id: string) => {
    setCameras(prev => prev.filter(cam => cam.id !== id));
  };

  const updateCamera = (id: string, data: Partial<Camera>) => {
    setCameras(prev => 
      prev.map(cam => cam.id === id ? { ...cam, ...data } : cam)
    );
  };

  return (
    <CameraContext.Provider value={{ cameras, addCamera, removeCamera, updateCamera }}>
      {children}
    </CameraContext.Provider>
  );
}

export function useCamera() {
  const context = useContext(CameraContext);
  if (!context) {
    throw new Error('useCamera must be used within a CameraProvider');
  }
  return context;
} 