'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { allAlbums, databases } from '@/app/data/albums';
import { Play, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusIcon } from "@radix-ui/react-icons";
import { db, auth } from '@/app/firebase/config';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useAudioPlayer } from '@/app/components/AudioPlayerContext'

interface Track {
  name: string;
  artists: string[];
  length: string;
  explicit: boolean;
}
// trackurl is /album/artists/albums/[index]. + name + ".mp3"/

interface Album {
  id: string;
  name: string;
  artist: string;
  cover: string;
  tracklist: string;
  database: number;
}

export default function AlbumPage() {
  const { id } = useParams();
  const [album, setAlbum] = useState<Album | null>(null);
  const [tracklist, setTracklist] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const user = auth.currentUser;
  const { playTrack } = useAudioPlayer();

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

        if (user) {
          const userRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setIsFollowing(userData.follows && userData.follows[album.id] === true);
          }
        }
      } else {
        console.log('Album not found');
      }
      setLoading(false);
    };

    fetchAlbum();
  }, [id, user]);

  const handleFollow = async () => {
    if (user && album) {
      const userRef = doc(db, 'users', user.uid);
      if (isFollowing) {
        await setDoc(userRef, {
          follows: {
            [album.id]: false
          }
        }, { merge: true });
        setIsFollowing(false);
      } else {
        await setDoc(userRef, {
          follows: {
            [album.id]: true
          }
        }, { merge: true });
        setIsFollowing(true);
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!album) {
    return <p>Album not found</p>;
  }

  interface PlayTrack {
    name: string;
    artists: string[];
    url: string;
    image: string;
    database: number;
  }

  const handlePlayClick = (track: string, artist: string, index: number): void => {
    if (!album) return;

  const baseUrl = databases.find(db => db.id === album.database)?.url;
  if (!baseUrl) return;

  const url = `${baseUrl}${album.artist}/${album.name}/${index}. ${track}.mp3`;
  playTrack({ 
      name: track,
      artists: [artist],
      url: url,
      image: album.cover,
      database: album.database
    } as PlayTrack);
  };

  const normalizedArtistName = album.artist.toLowerCase().replace(/[\s,]+/g, '');

  return (
    <>
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
            <div className="flex items-center space-x-4">
              <h1 className="text-3xl font-semibold tracking-tight">{album.name}</h1>
              <Button onClick={handleFollow} variant="ghost">
                <Heart className={isFollowing ? 'text-red-500' : 'text-gray-500'} fill={isFollowing ? '#EF4444' : ""}/>
              </Button>
            </div>
            <Link href={`/artist/${normalizedArtistName}`}>
              <p className="text-xl text-blue-500 mt-0 mb-4 underline">{album.artist}</p>
            </Link>
            <Button className="mt-56">
              <Play />
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Tracklist</h2>
          <div className="border-b border-gray-400 py-0 flex justify-between items-center"></div>
          {tracklist.map((track, index) => (
            <div key={index} className="py-2 flex justify-between items-center hover:bg-hover rounded-lg" onClick={() => handlePlayClick(track.name, track.artists.join(', '), index + 1)}>
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
    <br/>
    </>
  );
}