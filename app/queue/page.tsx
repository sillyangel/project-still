'use client';

import React from 'react';
import { useAudioPlayer } from '@/app/components/AudioPlayerContext';

const QueuePage: React.FC = () => {
  const { queue, playTrack, clearQueue } = useAudioPlayer();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Queue</h1>
      {queue.length === 0 ? (
        <p>No tracks in the queue</p>
      ) : (
        <ul>
          {queue.map((track, index) => (
            <li key={index} className="mb-2">
              <div className="flex items-center justify-between">
                <div>
                  <p>{track.name} by {track.artists.join(', ')}</p>
                </div>
                <div>
                  <button onClick={() => playTrack(track)} className="mr-2">
                    Play
                  </button>
                  <button onClick={() => clearQueue()}>
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QueuePage;
