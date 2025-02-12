'use client';

import Image from "next/image"
import { PlusCircledIcon } from "@radix-ui/react-icons"
import { useRouter } from 'next/navigation';

import { cn } from "@/lib/utils"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "../../components/ui/context-menu"

import { Artist } from "../data/artists"
import { playlists } from "../data/playlists"
import { useAudioPlayer } from "@/app/components/AudioPlayerContext";

interface ArtistIconProps extends React.HTMLAttributes<HTMLDivElement> {
  artist: Artist
  rounded?: boolean
  width?: number
  height?: number
}

export function ArtistIcon({
  artist,
  rounded = true,
  width,
  height,
  className,
  ...props
}: ArtistIconProps) {
  const router = useRouter();
  const { addArtistToQueue } = useAudioPlayer();
  const namenormalized = artist.name.toLowerCase().replace(/[\s,]+/g, '');
  const handleClick = () => {
    router.push(`/artist/${namenormalized}`);
  };

  return (
    <div className={cn("space-y-3", className)} {...props} onClick={handleClick}>
      <ContextMenu>
        <ContextMenuTrigger>
          <div className={cn("overflow-hidden", rounded ? "rounded-full" : "rounded-md")}>
            <Image
              src={artist.pictureurl}
              alt={artist.name}
              width={width}
              height={height}
              className={cn(
                "h-auto w-auto object-cover transition-all hover:scale-105"
              )}
            />
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-40">
          <ContextMenuItem>Add to Library</ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger>Add to Playlist</ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-48">
              <ContextMenuItem>
                <PlusCircledIcon className="mr-2 h-4 w-4" />
                New Playlist
              </ContextMenuItem>
              <ContextMenuSeparator />
              {playlists.map((playlist) => (
                <ContextMenuItem key={playlist}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="mr-2 h-4 w-4"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 15V6M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM12 12H3M16 6H3M12 18H3" />
                  </svg>
                  {playlist}
                </ContextMenuItem>
              ))}
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuItem>Play Next</ContextMenuItem>
          <ContextMenuItem>Play Later</ContextMenuItem>
          <ContextMenuItem>Create Station</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Like</ContextMenuItem>
          <ContextMenuItem>Share</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem onClick={() => addArtistToQueue(artist)}>Add Artist&apos;s Tracks to Queue</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <div className="space-y-1 text-sm">
        <p className="font-medium leading-none">{artist.name}</p>
        <p className="text-xs text-muted-foreground">Artist</p>
      </div>
    </div>
  )
}