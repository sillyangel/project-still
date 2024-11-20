'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { allAlbums, Album } from '@/app/data/albums';
import { AlbumArtwork } from '@/app/components/album-artwork';

export default function ArtistPage() {
  const { artist } = useParams();
  const normalizedArtist = artist.toLowerCase().replace(/\s+/g, '');

  const [artistAlbums, setArtistAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtistAlbums = () => {
      setLoading(true);
      const albums = allAlbums.filter((album) => 
        album.artist.toLowerCase().replace(/\s+/g, '') === normalizedArtist
      );
      setArtistAlbums(albums);
      setLoading(false);
    };

    fetchArtistAlbums();
  }, [normalizedArtist]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (artistAlbums.length === 0) {
    return <p>No albums found for artist: {artist}</p>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold tracking-tight">{artistName}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {artistAlbums.map((album) => (
          <div key={album.id} className="space-y-2">
            <AlbumArtwork
              key={album.id}
              album={album}
              className="w-[200px]"
              aspectRatio="square"
              width={200}
              height={200}
            />
          </div>
        ))}
      </div>
    </div>
  );
}