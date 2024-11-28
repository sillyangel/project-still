import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useAudioPlayer } from '@/app/components/AudioPlayerContext';
import { FaPlay, FaPause, FaVolumeHigh } from "react-icons/fa6";

export const AudioPlayer: React.FC = () => {
  const { currentTrack } = useAudioPlayer();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (currentTrack && audioRef.current) {
      audioRef.current.src = currentTrack.url;
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [currentTrack]);

  useEffect(() => {
    const updateProgress = () => {
      if (audioRef.current) {
        setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
      }
    };

    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', updateProgress);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', updateProgress);
      }
    };
  }, []);

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (audioRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newTime = (clickX / rect.width) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
    }
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
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
                className="h-full bg-blue-500 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <button onClick={togglePlayPause}>
            {isPlaying ? <FaPause /> : <FaPlay />}
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
        </div>
      ) : (
        <p>No track playing</p>
      )}
      <audio ref={audioRef} hidden />
    </div>
  );
};