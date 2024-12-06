'use client';

import React from 'react';
import Image from 'next/image';
import { useAudioPlayer } from '@/app/components/AudioPlayerContext';

const QueuePage: React.FC = () => {
  const { queue, playTrack, removeTrackFromQueue } = useAudioPlayer();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Queue</h1>
      {queue.length === 0 ? (
        <p>No tracks in the queue</p>
      ) : (
        <ul>
          {queue.map((track, index) => (
            <li key={index} className="mb-4 flex items-start">
              <Image
                src={track.image}
                alt={track.name}
                width={50}
                height={50}
                className="rounded-md mr-4"
              />
              <div className="flex-1">
                <p className="font-semibold">{track.name}</p>
                <div className="flex items-center">
                  {track.explicit && (
                    <span className="inline-block bg-gray-300 text-gray-700 text-xs font-thin px-1.5 py-0.5 rounded-sm mr-1.5">
                      E
                    </span>
                  )}
                  <p className="text-sm">{track.artists.join(', ')}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button onClick={() => playTrack(track)} className="mr-2">
                  Play
                </button>
                <button onClick={() => removeTrackFromQueue(index)}>
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QueuePage;