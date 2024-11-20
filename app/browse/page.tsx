/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import Image from 'next/image';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { AlbumArtwork } from '@/app/components/album-artwork';
import { allAlbums } from '@/app/data/albums';

export default function MusicPage() {
  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/music-light.png"
          width={1280}
          height={1114}
          alt="Music"
          className="block dark:hidden"
        />
        <Image
          src="/examples/music-dark.png"
          width={1280}
          height={1114}
          alt="Music"
          className="hidden dark:block"
        />
      </div>
      <Tabs defaultValue="music" className="h-full flex flex-col space-y-6">
        <TabsContent value="music" className="border-none p-0 outline-none flex flex-col flex-grow">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight">
                Browse
              </h2>
              <p className="text-sm text-muted-foreground">
                Browse the full collection of music available.
              </p>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="relative flex-grow">
            <ScrollArea className="h-full">
              <div className="h-full overflow-y-auto">
                <div className="flex flex-wrap gap-4 p-4">
                  {allAlbums.map((album) => (
                    <AlbumArtwork
                      key={album.id}
                      album={album}
                      className="w-[200px]"
                      aspectRatio="square"
                      width={200}
                      height={200}
                    />
                  ))}
                </div>
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}