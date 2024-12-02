'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { allAlbums, Album } from '@/app/data/albums';
import { allArtists } from '@/app/data/artists';
import { AlbumArtwork } from '@/app/components/album-artwork';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { db, auth } from '@/app/firebase/config';
import { doc, setDoc, getDoc } from 'firebase/firestore';

interface Artist {
  name: string;
  pictureurl: string;
}

export default function ArtistPage() {
  const { artist } = useParams();
  const normalizedArtist = artist ? (Array.isArray(artist) ? artist[0].toLowerCase().replace(/[\s,]+/g, '') : artist.toLowerCase().replace(/[\s,]+/g, '')) : '';
  const [isFollowing, setIsFollowing] = useState(false);
  const [artistAlbums, setArtistAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [artistName, setArtistName] = useState('');
  const [artistProfile, setArtistProfile] = useState<Artist | null>(null);
  const user = auth.currentUser;
  
    useEffect(() => {
    const fetchArtistData = async () => {
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
  
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setIsFollowing(userData.follows && userData.follows[artistName] === true);
        }
      }
  
      setLoading(false);
    };
  
    fetchArtistData();
  }, [normalizedArtist, user, artistName]);

  const handleFollow = async () => {
    if (user && artistProfile) {
      const userRef = doc(db, 'users', user.uid);
      if (isFollowing) {
        await setDoc(userRef, {
          follows: {
            [artistName]: false
          }
        }, { merge: true });
        setIsFollowing(false);
      } else {
        await setDoc(userRef, {
          follows: {
            [artistName]: true
          }
        }, { merge: true });
        setIsFollowing(true);
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (artistAlbums.length === 0) {
    return <p>No albums found for artist: {artist}</p>;
  }

  return (
    <div className="space-y-4">
      {artistProfile && (
      <div className="relative bg-cover bg-center h-48" style={{ backgroundImage: `url(${artistProfile.pictureurl})` }}>
        <div className="absolute inset-0 bg-black opacity-50"></div> {/* Optional overlay for better contrast */}
        <div className="relative flex items-center justify-between space-x-8 p-8">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div
                className="absolute inset-0 bg-cover bg-center rounded-full"
                style={{ backgroundImage: `url(${artistProfile.pictureurl})`, filter: 'blur(22px)' }}
              ></div>
              <Image 
                src={artistProfile.pictureurl} 
                alt={artistName} 
                width={100} 
                height={100}
                className="relative rounded-full border-4 border-white shadow-lg"
              />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">{artistName}</h1>
          </div>
          <div className="ml-auto">
          <Button onClick={handleFollow}>
            <Heart />
            {isFollowing ? 'Unfollow' : 'Follow'}
          </Button>
          </div>
        </div>
      </div>
    )}
    <div className="h-full px-4 lg:px-8">
      <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight">
                Discography
              </h2>
            </div>
      <ScrollArea>
        <div className="flex space-x-4 pb-4 pt-3">
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
    </div>
  );
}