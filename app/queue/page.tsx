import React from 'react';
import { useAudioPlayer } from '@/app/components/AudioPlayerContext';

const QueuePage: React.FC = () => {
  const { queue } = useAudioPlayer();

  return (
    <div className="h-full px-4 py-6 lg:px-8">
      <h1 className="text-2xl font-semibold tracking-tight">Queue</h1>
      <div className="mt-4">
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
