import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { ReactComponent as ListenIcon } from '../../assets/images/icons/icn-listen.svg';

type AudioComponentProps = {
  src: string;
  autoPlay?: boolean;
  setPlaySound?: (value: boolean) => void;
};

const ContainerStyle = styled.div`
  width: 134px;
  height: 48px;
  background-color: #5f6164;
  border-radius: 12px;
  color: #5f6164;
  position: absolute;
  bottom: 28px;
  right: 28px;

  & button {
    //width: 100%;
    height: 100%;
    background-color: transparent;
    color: #fff;
    border: none;
    font-size: 18px;
  }

  .button-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
  }
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
      <div className="button-wrapper">
        <button onClick={togglePlay}>
          {isPlaying ? '재생중' : '다시듣기'}
        </button>
        <ListenIcon width="24px" height="24px" />
      </div>
    </ContainerStyle>
  );
};

export default AudioComponent;
