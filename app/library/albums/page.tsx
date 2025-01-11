/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useState, useEffect } from 'react';
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { AlbumArtwork } from '@/app/components/album-artwork';
import { db, auth } from '@/app/firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'next/navigation';
import { allAlbums } from '@/app/data/albums';
import Loading  from '@/app/components/loading';

interface Album {
  id: string;
  name: string;
  tracklist: string;
  artist: string;
  cover: string;
  database: number;
}

export default function Albumpage() {
  const { artist } = useParams();
  const normalizedArtist = artist ? (Array.isArray(artist) ? artist[0].toLowerCase().replace(/[\s,]+/g, '') : artist.toLowerCase().replace(/[\s,]+/g, '')) : '';
  const [loading, setLoading] = useState(true);
  const [followingAlbums, setFollowingAlbums] = useState<Album[]>([]);
  const user = auth.currentUser;

  useEffect(() => {
    setLoading(true);
    const fetchFollowingAlbums = async () => {
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const follows = userData.follows || {};
          const followedAlbumIds = Object.keys(follows).filter(albumId => follows[albumId]);
          const followedAlbums = allAlbums.filter(album => followedAlbumIds.includes(album.id));
          setFollowingAlbums(followedAlbums);
        }
      }
      setLoading(false);
    };

    fetchFollowingAlbums();
  }, [user]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="h-full px-4 py-6 lg:px-8">
      <Tabs defaultValue="music" className="h-full space-y-6">
        <TabsContent value="music" className="border-none p-0 outline-none">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-2xl font-semibold tracking-tight">
                Albums 
              </p>
              <p className="text-sm text-muted-foreground">
                albums added to your library
              </p>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="relative">
            <ScrollArea>
              <div className="flex space-x-4 pb-4">
                {followingAlbums.map((album) => (
                  <AlbumArtwork
                    key={album.id}
                    album={album}
                    className="w-[250px]"
                    aspectRatio="square"
                    width={250}
                    height={250}
                  />
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}