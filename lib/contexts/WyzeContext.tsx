'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface WyzeContextType {
  cameras: WyzeCamera[];
  addCamera: (camera: WyzeCamera) => void;
  removeCamera: (id: string) => void;
  setError: (error: string | null) => void;
  error: string | null;
}

interface WyzeCamera {
  id: string;
  name: string;
  rtspUrl: string;
  model: string;
}

const WyzeContext = createContext<WyzeContextType | undefined>(undefined);

export function WyzeProvider({ children }: { children: ReactNode }) {
  const [cameras, setCameras] = useState<WyzeCamera[]>([]);
  const [error, setError] = useState<string | null>(null);

  const addCamera = (camera: WyzeCamera) => {
    setCameras(prev => [...prev, camera]);
  };

  const removeCamera = (id: string) => {
    setCameras(prev => prev.filter(camera => camera.id !== id));
  };

  return (
    <WyzeContext.Provider value={{ cameras, addCamera, removeCamera, error, setError }}>
      {children}
    </WyzeContext.Provider>
  );
}

export function useWyze() {
  const context = useContext(WyzeContext);
  if (context === undefined) {
    throw new Error('useWyze must be used within a WyzeProvider');
  }
  return context;
} 