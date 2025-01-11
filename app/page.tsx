'use client';

import { ScrollArea, ScrollBar } from '../components/ui/scroll-area';
import { Separator } from '../components/ui/separator';
import { Tabs, TabsContent } from '../components/ui/tabs';
import { AlbumArtwork } from './components/album-artwork';
import { listenNowAlbums, madeForYouAlbums } from './data/albums';

export default function MusicPage() {
  return (
    <div className="h-full px-4 py-6 lg:px-8">
    <>
      <Tabs defaultValue="music" className="h-full space-y-6">
        <TabsContent value="music" className="border-none p-0 outline-none">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-2xl font-semibold tracking-tight">
                Listen Now
              </p>
              <p className="text-sm text-muted-foreground">
                Top picks for you. Updated daily.
              </p>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="relative">
            <ScrollArea>
              <div className="flex space-x-4 pb-4">
                {listenNowAlbums.map((album) => (
                  <AlbumArtwork
                    key={album.id}
                    album={album}
                    className="w-[300px]"
                    aspectRatio="square"
                    width={300}
                    height={300}
                  />
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
          <div className="mt-6 space-y-1">
            <p className="text-2xl font-semibold tracking-tight">
              Made for You
            </p>
            <p className="text-sm text-muted-foreground">
              Your personal playlists. Updated daily.
            </p>
          </div>
          <Separator className="my-4" />
          <div className="relative">
            <ScrollArea>
            <div className="flex space-x-4 pb-4">
            {madeForYouAlbums.map((album) => (
                  <AlbumArtwork
                    key={album.id}
                    album={album}
                    className="w-[150px]"
                    aspectRatio="square"
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
      </>
    </div>
  );
}