import React, { useEffect, useRef } from 'react';
import { useAudioPlayer } from '@/app/components/AudioPlayerContext';

export const AudioPlayer: React.FC = () => {
  const { currentTrack } = useAudioPlayer();
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (currentTrack && audioRef.current) {
      audioRef.current.src = currentTrack.url;
      audioRef.current.play();
    }
  }, [currentTrack]);

  return (
    <div className="fixed bottom-0 w-full bg-hover text-white p-4 8  rounded-2xl mb-1">
      {currentTrack ? (
        <div>
          <p>Now playing: {currentTrack.name} by {currentTrack.artists.join(', ')}</p>
          <audio ref={audioRef} controls />
        </div>
      ) : (
        <p>No track playing</p>
      )}
    </div>
  );
};