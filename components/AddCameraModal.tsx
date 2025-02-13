'use client';

import { useState } from 'react';
import { useWyze } from '@/lib/contexts/WyzeContext';

interface AddCameraModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddCameraModal({ isOpen, onClose }: AddCameraModalProps) {
  const [name, setName] = useState('');
  const [rtspUrl, setRtspUrl] = useState('');
  const { addCamera } = useWyze();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCamera({
      id: Date.now(),
      name,
      rtspUrl
    });
  };

  return (
    <div>
      {/* Render your form here */}
    </div>
  );
} 