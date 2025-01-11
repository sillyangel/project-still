'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useAudioPlayer } from '@/app/components/AudioPlayerContext';
import { FaPlay, FaPause, FaVolumeHigh, FaForward, FaBackward } from "react-icons/fa6";
import ColorThief from '@neutrixs/colorthief';
import { auth } from '@/app/firebase/config';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

export const AudioPlayer: React.FC = () => {
  const { currentTrack, playPreviousTrack, addToQueue, playNextTrack, clearQueue } = useAudioPlayer();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const userID = auth.currentUser?.uid;
  const [volume, setVolume] = useState(1);
  const [isClient, setIsClient] = useState(false);
  const audioCurrent = audioRef.current;
  const { toast } = useToast();
  
  useEffect(() => {
    setIsClient(true);

    const audioCurrent = audioRef.current;
    
    if (currentTrack && audioCurrent) {
      audioCurrent.src = currentTrack.url;
      audioCurrent.play();
      setIsPlaying(true);
    }

    const updateProgress = () => {
      if (audioCurrent) {
        setProgress((audioCurrent.currentTime / audioCurrent.duration) * 100);
      }
    };
    if (audioCurrent) {
      audioCurrent.addEventListener('timeupdate', updateProgress);
      audioCurrent.addEventListener('ended', playNextTrack);
    }
    return () => {
      if (audioCurrent) {
        audioCurrent.removeEventListener('timeupdate', updateProgress);
        audioCurrent.removeEventListener('ended', playNextTrack);
      }
    };
  }, [currentTrack, playNextTrack]);
  
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (audioCurrent) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newTime = (clickX / rect.width) * audioCurrent.duration;
      audioCurrent.currentTime = newTime;
    }
  };

  const togglePlayPause = () => {
    if (audioCurrent) {
      if (isPlaying) {
        audioCurrent.pause();
      } else {
        audioCurrent.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioCurrent) {
      audioCurrent.volume = newVolume;
    }
  };
  
  function formatTime(seconds: number): string {
    if (isNaN(seconds) || seconds < 0) {
      return "0:00";
    }
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${minutes}:${secs}`;
  }
  
  if (!isClient) {
    return null;
  }

  return (
    <div className="bg-background w-full text-white p-4 border-t border-t-1">
      {currentTrack ? (
        <div className="flex items-center">
          <Image src={currentTrack.image} alt={currentTrack.name} width={64} height={64} className="w-16 h-16 mr-4" />
          <div className="flex-1 w-auto">
            <p className="mb-0 ">{currentTrack.name}</p>
            <p className='text-sm mt-0 text-gray-400'>{currentTrack.artists.join(', ')}</p>
          </div>
          <div>
            <div>
              <button className="mx-4"onClick={playPreviousTrack}><FaBackward /></button>
              <button className='mx-4' onClick={togglePlayPause}>{isPlaying ? <FaPause /> : <FaPlay />}</button>
              <button className='mx-4' onClick={playNextTrack}><FaForward /></button>
            </div>
            <div>
            <p>{formatTime(audioCurrent?.currentTime ?? 0)}</p>
            <Progress value={progress} className="mt-1 cursor-pointer" onClick={handleProgressClick}/>
            <p>{formatTime(audioCurrent?.duration ?? 0)}</p>
            </div>
          </div>
          {/* replace these buttons with icons
           */}
          <button onClick={() => addToQueue(currentTrack)} className="ml-4">
          </button>
          <button onClick={clearQueue} className="ml-4">
          </button>
        </div>
      ) : (
        <p>No track playing</p>
      )}
      <audio ref={audioRef} hidden />
    </div>
  );
};