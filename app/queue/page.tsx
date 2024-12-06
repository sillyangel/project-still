'use client';

import React from 'react';
import { useAudioPlayer } from '@/app/components/AudioPlayerContext';

const QueuePage: React.FC = () => {
  const { queue, currentTrack } = useAudioPlayer();

  return (
    <div className="h-full px-4 py-6 lg:px-8">
      <h1 className="text-2xl font-semibold tracking-tight">Queue</h1>
      <div className="mt-4">
        {currentTrack ? (
          <div className="mb-4">
            <p className="text-lg">Now Playing: {currentTrack.name}</p>
            <p className="text-sm text-muted-foreground">{currentTrack.artists.join(', ')}</p>
          </div>
        ) : (
          <p>No track currently playing</p>
        )}
        {queue.length > 0 ? (
          <ul>
            {queue.map((track, index) => (
              <li key={index} className="mb-2">
                <p className="text-lg">{track.name}</p>
                <p className="text-sm text-muted-foreground">{track.artists.join(', ')}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No tracks in the queue</p>
        )}
      </div>
    </div>
  );
};

export default QueuePage;
