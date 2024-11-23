'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { allAlbums } from '@/app/data/albums';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusIcon } from "@radix-ui/react-icons"
interface Track {
  name: string;
  artists: string[];
  length: string;
  explicit: boolean;
}

interface Album {
  id: string;
  name: string;
  artist: string;
  cover: string;
  tracklist: string;
}

export default function AlbumPage() {
  const { id } = useParams();
  const [album, setAlbum] = useState<Album | null>(null);
  const [tracklist, setTracklist] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
    const fetchAlbum = async () => {
      setLoading(true);
      console.log(`Fetching album with id: ${id}`);
      const album = allAlbums.find((album) => album.id === id) || null;
      setAlbum(album);

      if (album) {
        console.log(`Album found: ${album.name}`);
        try {
          const response = await fetch(album.tracklist);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const tracklist = await response.json();
          setTracklist(tracklist);
        } catch (error) {
          console.error('Failed to fetch tracklist:', error);
        }
      } else {
        console.log('Album not found');
      }
      setLoading(false);
    };

    fetchAlbum();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!album) {
    return <p>Album not found</p>;
  }
  const handlePlayClick = () => {
    alert(`Playing album: ${album.name} by ${album.artist}`);
  };
  const normalizedArtistName = album.artist.toLowerCase().replace(/[\s,]+/g, '');
  return (
    <div className="h-full px-4 py-6 lg:px-8">
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
          <h1 className="text-3xl font-semibold tracking-tight">{album.name}</h1>
          <Link href={`/artist/${normalizedArtistName}`}><p className="text-xl text-blue-500 mt-0 mb-4 underline">{album.artist}</p></Link>
            <Button onClick={handlePlayClick} className="mt-56">
              <Play /> Play Album
            </Button>
        </div>
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Tracklist</h2>
        <div className="border-b border-gray-400 py-0 flex justify-between items-center"></div>
        {tracklist.map((track, index) => (
            <div key={index} className="py-2 flex justify-between items-center hover:bg-hover rounded-lg" onClick={() => alert(`Selected Track, ${index +1} ${track.name}`)}>
              <div className="flex items-center">
                <div className="mr-2 w-6 text-right">{index + 1}</div> {/* Fixed width for track numbers */}
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
                <PlusIcon className='mr-4'/>
                <p className="text-sm">{track.length}</p>
              </div>
            </div>
        ))}
      </div>
    </div>
    </div>
  );
}