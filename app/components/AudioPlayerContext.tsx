'use client';

import React, { createContext, useContext, useState } from 'react';

interface Track {
  name: string;
  url: string;
  artists: string[];
  image: string; // Add image property
}

interface AudioPlayerContextProps {
  currentTrack: Track | null;
  playTrack: (track: Track) => void;
  queue: Track[];
  addToQueue: (track: Track) => void;
  playNextTrack: () => void;
  clearQueue: () => void;
}

const AudioPlayerContext = createContext<AudioPlayerContextProps | undefined>(undefined);

export const AudioPlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [queue, setQueue] = useState<Track[]>([]);

  const playTrack = (track: Track) => {
    setCurrentTrack(track);
  };

  const addToQueue = (track: Track) => {
    setQueue((prevQueue) => [...prevQueue, track]);
  };

  const playNextTrack = () => {
    if (queue.length > 0) {
      const nextTrack = queue[0];
      setQueue((prevQueue) => prevQueue.slice(1));
      setCurrentTrack(nextTrack);
    }
  };

  const clearQueue = () => {
    setQueue([]);
  };

  return (
    <AudioPlayerContext.Provider value={{ currentTrack, playTrack, queue, addToQueue, playNextTrack, clearQueue }}>
      {children}
    </AudioPlayerContext.Provider>
  );
};

export const useAudioPlayer = () => {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error('useAudioPlayer must be used within an AudioPlayerProvider');
  }
  return context;
};
