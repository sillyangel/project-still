'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { allAlbums, Album } from '@/app/data/albums';
import { allArtists } from '@/app/data/artists';
import { AlbumArtwork } from '@/app/components/album-artwork';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Heart } from 'lucide-react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface Artist {
  name: string;
  pictureurl: string;
}

export default function ArtistPage() {
  const { artist } = useParams();
  const normalizedArtist = Array.isArray(artist) ? artist[0].toLowerCase().replace(/[\s,]+/g, '') : artist.toLowerCase().replace(/[\s,]+/g, '');
  
  const [artistAlbums, setArtistAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [artistName, setArtistName] = useState('');
  const [artistProfile, setArtistProfile] = useState<Artist | null>(null);

  useEffect(() => {
    const fetchArtistData = () => {
      setLoading(true);
      const albums = allAlbums.filter((album) => 
        album.artist.toLowerCase().replace(/[\s,]+/g, '') === normalizedArtist
      );
      setArtistAlbums(albums);
      if (albums.length > 0) {
        setArtistName(albums[0].artist);
      }

      const artistData = allArtists.find((artist) => 
        artist.name.toLowerCase().replace(/[\s,]+/g, '') === normalizedArtist
      );
      setArtistProfile(artistData || null);

      setLoading(false);
    };

    fetchArtistData();
  }, [normalizedArtist]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (artistAlbums.length === 0) {
    return <p>No albums found for artist: {artist}</p>;
  }

  return (
    <div className="space-y-4">
      {artistProfile && (
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4">
            <Image 
              src={artistProfile.pictureurl} 
              alt={artistName} 
              width={100} 
              height={100}
              className="rounded-full"
            />
            <h1 className="text-2xl font-semibold tracking-tight">{artistName}</h1>
          </div>
          <div className="ml-auto">
            <Button>
              <Heart />
              Follow
            </Button>
          </div>
        </div>
      )}
      <hr className="my-4 border-gray-300" />
      <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight">
                Discography
              </h2>
            </div>
      <Separator className="my-4" />
      <ScrollArea>
      <div className="flex space-x-4 pb-4">
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
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}