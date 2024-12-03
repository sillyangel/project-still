/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useState, useEffect } from 'react';
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { ArtistIcon } from '@/app/components/artist-icon';
import { db, auth } from '@/app/firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'next/navigation';
import { allArtists } from '@/app/data/artists';

interface Artist {
  name: string;
  pictureurl: string;
}

export default function ArtistPage() {
  const { artist } = useParams();
  const normalizedArtist = artist ? (Array.isArray(artist) ? artist[0].toLowerCase().replace(/[\s,]+/g, '') : artist.toLowerCase().replace(/[\s,]+/g, '')) : '';
  const [loading, setLoading] = useState(true);
  const [followingArtists, setFollowingArtists] = useState<Artist[]>([]);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchFollowingArtists = async () => {
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const follows = userData.follows || {};
          const followedArtistNames = Object.keys(follows).filter(artist => follows[artist]);
          const followedArtists = allArtists.filter(artist => followedArtistNames.includes(artist.name));
          setFollowingArtists(followedArtists);
        }
      }
      setLoading(false);
    };

    fetchFollowingArtists();
  }, [user]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="h-full px-4 py-6 lg:px-8">
      <Tabs defaultValue="music" className="h-full space-y-6">
        <TabsContent value="music" className="border-none p-0 outline-none">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-2xl font-semibold tracking-tight">
                Following Artists
              </p>
              <p className="text-sm text-muted-foreground">
                ur favs and following artists
              </p>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="relative">
            <ScrollArea>
              <div className="flex space-x-4 pb-4">
                {followingArtists.map((artist) => (
                  <ArtistIcon
                    key={artist.name}
                    artist={artist}
                    className="w-[150px]"
                    width={150}
                    height={150}
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