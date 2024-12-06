'use client';

import React, { createContext, useContext, useState } from 'react';
import { Album, databases } from '../data/albums';
import { Artist } from '../data/artists';
interface Track {
  name: string;
  url: string;
  explicit: boolean;
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
  addAlbumToQueue: (album: Album) => void;
  removeTrackFromQueue: (index: number) => void;
  addArtistToQueue: (artist: Artist) => void;
}

const AudioPlayerContext = createContext<AudioPlayerContextProps | undefined>(undefined);

export const AudioPlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [queue, setQueue] = useState<Track[]>([]);

  const playTrack = (track: Track) => {
    setCurrentTrack(track);
  };
  const removeTrackFromQueue = (index: number) => {
    setQueue((prevQueue) => prevQueue.filter((_, i) => i !== index));
  }
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
  const addArtistToQueue = async (artist: Artist) => {
    const baseUrl = databases[0].url;
    const response = await fetch(`${baseUrl}${artist.name.toLowerCase().replace(/[\s,]+/g, '')}/tracks`);
    const tracks = await response.json();
    tracks.forEach((track: Track) => {
      addToQueue(track);
    });
  }
  const addAlbumToQueue = async (album: Album) => {
    const response = await fetch(album.tracklist);
    const tracklist = await response.json();
    const baseUrl = databases.find(db => db.id === album.database)?.url;
    if (!baseUrl) return;
  
    tracklist.forEach((track: Track, index: number) => {
      track.image = album.cover;
      track.explicit = album.explicit ?? false;
      track.url = `${baseUrl}${album.artist.toLowerCase().replace(/[\s,]+/g, '')}/${album.name.toLowerCase().replace(/[\s,]+/g, '')}/${index + 1} ${track.name}.mp3`;
      addToQueue(track);
    });
  };

  const clearQueue = () => {
    setQueue([]);
  };

  return (
    <AudioPlayerContext.Provider value={{ currentTrack, playTrack, queue, addToQueue, playNextTrack, clearQueue, addAlbumToQueue, removeTrackFromQueue, addArtistToQueue}}>
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
