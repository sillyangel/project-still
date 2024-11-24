import React, { useRef, useState } from 'react';

interface AudioPlayerProps {
  src: string;
  trackName: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, trackName }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

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

  return (
    <div className="audio-player">
      <p>Now Playing: {trackName}</p>
      <audio ref={audioRef} src={src} />
      <button onClick={togglePlayPause}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  );
};