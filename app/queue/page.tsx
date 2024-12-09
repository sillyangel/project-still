'use client';

import React from 'react';
import Image from 'next/image';
import { useAudioPlayer } from '@/app/components/AudioPlayerContext';

const QueuePage: React.FC = () => {
  const { queue, playTrack, removeTrackFromQueue, clearQueue } = useAudioPlayer();

  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
      <h1 className="text-2xl font-semibold mb-4">Queue</h1>
      <button onClick={clearQueue} className="mb-4">
        Clear queue
      </button>
      </div>
      {queue.length === 0 ? (
        <p>No tracks in the queue</p>
      ) : (
        <ul>
          {queue.map((track, index) => (
            <li key={index} className="mb-4 flex items-start ">
              <div className='py-2 flex justify-between items-center hover:bg-hover rounded-lg'>
                <div className="mr-2 w-6 text-right">{index + 1}</div> {/* Fixed width for track numbers */}
              <Image
                src={track.image}
                alt={track.name}
                width={50}
                height={50}
                className="rounded-md mr-4"
              />
              <div key={index} onClick={() => playTrack(track)}>
              <div className="flex items-center">
                <div>
                  <p className="font-semibold text-lg flex items-center">
                    {track.name}
                  </p>
                  <p className="text-sm font-normal flex items-center">
                    {track.explicit && (
                      <span className="inline-block bg-gray-300 text-gray-700 text-xs font-thin px-1.5 py-0.5 rounded-sm mr-1.5">
                        E
                      </span>
                    )}
                    {track.artists.join(', ')}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
              <p className="text-sm mr-4">{track.length}</p>
              <button onClick={() => removeTrackFromQueue(index)}>Remove</button>
              </div>
              </div>
            </div>
                {/* playTrack(track) */}
                {/* removeTrackFromQueue(index) */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QueuePage;