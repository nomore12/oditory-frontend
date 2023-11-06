import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

type AudioComponentProps = {
  src: string;
  autoPlay?: boolean;
  setPlaySound?: (value: boolean) => void;
};

const ContainerStyle = styled.div`
  width: 145px;
  height: 56px;
  background-color: #000;
  border-radius: 12px;
  color: #fff;
  position: absolute;
  bottom: 28px;
  right: 28px;

  & button {
    width: 100%;
    height: 100%;
    background-color: transparent;
    color: #fff;
    border: none;
`;

const AudioComponent: React.FC<AudioComponentProps> = ({
  src,
  setPlaySound,
  autoPlay = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
        setTimeout(
          () => setIsPlaying(false),
          audioRef.current?.duration * 1000 + 500
        );
        console.log('audio', audioRef.current?.onplaying);
        setTimeout(
          () =>
            console.log(
              audioRef.current?.currentTime,
              audioRef.current?.currentSrc,
              audioRef.current?.duration
            ),
          5000
        );
      } else {
        audioRef.current.pause();
        setPlaySound && setPlaySound(false);
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (autoPlay) {
      setIsPlaying(true);
    }
  }, [autoPlay]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <ContainerStyle>
      <audio ref={audioRef} src={src} />
      <button onClick={togglePlay}>{isPlaying ? '재생중' : '다시듣기'}</button>
    </ContainerStyle>
  );
};

export default AudioComponent;
