'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { listenNowAlbums } from '@/app/data/albums';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Track {
  name: string;
  artists: string[];
  length: string;
  explicit: boolean;
}

export default function AlbumPage() {
  const { id } = useParams() as { id: string };
  const album = listenNowAlbums.find((album) => album.id === id);
  const [tracklist, setTracklist] = useState<Track[]>([]);

  useEffect(() => {
    if (album) {
      fetch(album.tracklist)
        .then((response) => response.json())
        .then((data) => setTracklist(data))
        .catch((error) => console.error('Error fetching tracklist:', error));
    }
  }, [album]);

  if (!album) {
    return <p>Album not found</p>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-6">
        <Image 
          src={album.cover} 
          alt={album.name} 
          width={300} 
          height={300}
          className="rounded-md"
        />
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">{album.name}</h1>
          <p className="text-xl">{album.artist}</p>
            <Button>
              <Play /> Play Album
            </Button>
        </div>
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Tracklist</h2>
        {tracklist.map((track, index) => (
          <div key={index} className="border-b border-gray-300 py-2 flex justify-between items-center">
            <div>
              <p className="font-semibold">{track.name}</p>
              <p className="text-sm">{track.artists.join(', ')}</p>
            </div>
            <div className="flex items-center space-x-2">
              {track.explicit && (
                <span className="inline-block bg-gray-300 text-gray-700 text-xs font-semibold px-2 py-1 rounded">
                  E
                </span>
              )}
              <p className="text-sm">{track.length}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}