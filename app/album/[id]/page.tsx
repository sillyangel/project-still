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
import Loading from "@/app/components/loading";
import { Separator } from '@/components/ui/separator';

interface Track {
  name: string;
  artists: string[];
  length: string;
  explicit: boolean;
}
interface PlayTrack {
  name: string;
  artists: string[];
  url: string;
  image: string;
  database: number;
  explicit: boolean;
  length: string;
  album: string;
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
  const { playTrack, addAlbumToQueue } = useAudioPlayer();

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
    return <Loading />;
  }

  if (!album) {
    return <p>Album not found</p>;
  }

  const normalizedArtistName = album.artist.toLowerCase().replace(/[\s,]+/g, '');
  const normalizedAlbumName = album.name.toLowerCase().replace(/[\s,]+/g, '');
  

  const handlePlayClick = (track: string, artist: string, index: number): void => {
    if (!album) return;

  const baseUrl = databases.find(db => db.id === album.database)?.url;
  if (!baseUrl) return;

  const normalizedTrack = track.replace(/\s*\(.*?\)\s*|[\/\?]+/g, '').trim();

  const url = `${baseUrl}${normalizedArtistName}/${normalizedAlbumName}/${index}. ${normalizedTrack}.mp3`;

  playTrack({ 
      name: track,
      artists: [artist],
      url: url,
      image: album.cover,
      database: album.database,
      explicit: false,
      length: '0:00',
      album: album.name
    } as PlayTrack);
  
  };


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
              <p className="text-3xl font-semibold tracking-tight">{album.name}</p>
          <Button onClick={handleFollow} variant="ghost">
          <Heart className={isFollowing ? 'text-primary' : 'text-gray-500'} fill={isFollowing ? 'var(--primary)' : ""}/>
          </Button>
            </div>
            <Link href={`/artist/${normalizedArtistName}`}>
              <p className="text-xl text-primary mt-0 mb-4 underline">{album.artist}</p>
            </Link>
            <Button className="px-5" onClick={() => addAlbumToQueue(album)}>
              <Play />
              Play Album
            </Button>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus iure praesentium deserunt culpa impedit, veniam eum, molestiae asperiores, autem quasi repellat. Cumque ea nisi distinctio veritatis soluta qui, ipsum quas.
            </p>
          </div>
        </div>
        <div className="space-y-2">
          <Separator />
          {tracklist.map((track, index) => (
            <div key={index} className="py-2 flex justify-between items-center hover:bg-hover rounded-lg cursor-pointer" onClick={() => handlePlayClick(track.name, track.artists.join(', '), index + 1)}>
              <div className="flex items-center">
                <div className="mr-2 w-6 text-right">{index + 1}</div> {/* Fixed width for track numbers */}
                <div>
                  <p className="font-semibold text-lg flex items-center">
                    {track.name}
                  </p>
                  <p className="text-sm font-normal flex items-center">
                    {track.explicit && (
                      <span className="inline-block bg-gray-300 text-gray-700 text-xs font-normal px-1 py-.5 rounded-sm mr-1.5">
                        E
                      </span>
                    )}
                    <p className="text-gray-400"> {track.artists.join(', ')} </p>
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
              <p className="text-sm mr-4">{track.length}</p>
              {/* <PlusIcon/> */}
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