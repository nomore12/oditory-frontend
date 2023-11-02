import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

type AudioComponentProps = {
  src: string;
  autoPlay?: boolean;
};

const ContainerStyle = styled.div`
  width: 145px;
  height: 56px;
  background-color: #000;
  border-radius: 12px;
  color: #fff;

  & button {
    width: 100%;
    height: 100%;
    background-color: transparent;
    color: #fff;
    border: none;
`;

const AudioComponent: React.FC<AudioComponentProps> = ({
  src,
  autoPlay = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
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
      <button onClick={togglePlay}>{isPlaying ? '다시듣기' : '재생중'}</button>
    </ContainerStyle>
  );
};

export default AudioComponent;
