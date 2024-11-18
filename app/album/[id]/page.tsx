'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { listenNowAlbums } from '@/app/data/albums';

export default function AlbumPage() {
  const { id } = useParams() as { id: string };
  const album = listenNowAlbums.find((album) => album.id === id);

  if (!album) {
    return <p>Album not found</p>;
  }

  return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold tracking-tight">{album.name}</h1>
        <div className="flex items-start gap-6">
          <Image 
            src={album.cover} 
            alt={album.name} 
            width={300} 
            height={300}
            className="rounded-md"
          />
          <div className="space-y-2">
            <p className="text-xl">{album.artist}</p>
            {/* Add more album details here */}
          </div>
        </div>
      </div>
  );
}