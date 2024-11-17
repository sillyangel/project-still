import { Metadata } from "next"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Layout } from "./layout"
import { AlbumArtwork } from "./components/album-artwork"
import { listenNowAlbums, madeForYouAlbums } from "./data/albums"

export const metadata: Metadata = {
  title: "Offbrand Spotify",
  description: "Offbrand Spotify Developmental Version.",
}

export default function MusicPage() {
  return (
    <Layout>
      <Tabs defaultValue="music" className="h-full space-y-6">
        <TabsContent value="music" className="border-none p-0 outline-none">
          <div className="flex flex-col space-y-8">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Listen Now
              </h2>
              <ScrollArea>
                <div className="flex space-x-4 pb-4 pt-4">
                  {listenNowAlbums.map((album) => (
                    <AlbumArtwork
                      key={album.id}
                      album={album}
                      className="w-[250px]"
                      aspectRatio="portrait"
                      width={250}
                      height={330}
                    />
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
            <Separator className="my-4" />
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Made for You
              </h2>
              <ScrollArea>
                <div className="flex space-x-4 pb-4 pt-4">
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
          </div>
        </TabsContent>
      </Tabs>
    </Layout>
  )
}