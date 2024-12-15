'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useAudioPlayer } from '@/app/components/AudioPlayerContext';
import { FaPlay, FaPause, FaVolumeHigh, FaForward, FaBackward } from "react-icons/fa6";
import ColorThief from '@neutrixs/colorthief';
import { auth } from '@/app/firebase/config';

export const AudioPlayer: React.FC = () => {
  const { currentTrack, playPreviousTrack, addToQueue, playNextTrack, clearQueue } = useAudioPlayer();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const userID = auth.currentUser?.uid;
  const [volume, setVolume] = useState(1);
  const [isClient, setIsClient] = useState(false);
  const [dominantColor, setDominantColor] = useState<string>('#ff0000'); // Default to red
  const audioCurrent = audioRef.current;
  
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
    if (currentTrack) {
      const img = document.createElement('img') as HTMLImageElement;
      img.crossOrigin = 'Anonymous';
      img.src = currentTrack.image;
      img.onload = () => {
        const colorThief = new ColorThief();
        const result = colorThief.getColor(img);
        if (result) {
          setDominantColor(`rgb(${result[0]}, ${result[1]}, ${result[2]})`);
        }
      };
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
  console.log(userID);
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioCurrent) {
      audioCurrent.volume = newVolume;
    }
  };

  
  if (!isClient) {
    return null;
  }

  return (
    <div className="fixed bottom-0 w-9/12 bg-hover text-white p-4 rounded-2xl mb-2 mx-2">
      {currentTrack ? (
        <div className="flex items-center">
          <Image src={currentTrack.image} alt={currentTrack.name} width={64} height={64} className="w-16 h-16 mr-4" />
          <div className="flex-1">
            <p>{currentTrack.name} by {currentTrack.artists.join(', ')}</p>
            <div className="w-full h-2 bg-gray-300 rounded-full cursor-pointer mt-2" onClick={handleProgressClick}>
              <div
                className="h-full rounded-full"
                style={{ width: `${progress}%`, backgroundColor: dominantColor }}
              />
            </div>
          </div>
          <button onClick={playPreviousTrack}>
            <FaBackward />
          </button>
          <button className='mx-4' onClick={togglePlayPause}>
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button className='mx-4' onClick={playNextTrack}>
            <FaForward />
          </button>
          <div className="relative ml-4">
            <button onClick={() => setShowVolumeSlider(!showVolumeSlider)}>
              <FaVolumeHigh />
            </button>
            {showVolumeSlider && (
              <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded-lg shadow-lg">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-2 h-32 transform rotate-[-90deg] origin-bottom"
                />
              </div>
            )}
          </div>
          <button onClick={() => addToQueue(currentTrack)} className="ml-4">
            Add to Queue
          </button>
          <button onClick={clearQueue} className="ml-4">
            Clear Queue
          </button>
        </div>
      ) : (
        <p>No track playing</p>
      )}
      <audio ref={audioRef} hidden />
    </div>
  );
};