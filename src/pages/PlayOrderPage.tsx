import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import styled from 'styled-components';
import ProblemNavigation from '../components/commons/ProblemNavigation';
import ControlButton from '../components/commons/ControlButton';
import OrderItemCard from '../components/play/order/OrderItemCard';
import { useParams, useSearchParams } from 'react-router-dom';
import useSWR, { mutate } from 'swr';
import { fetcher } from '../utils/fetcher';
import { shuffleArray } from '../utils/utils';
import { useProblemManagerStore } from '../store/ProblemManager';

interface LinePropsType {
  name: number;
}

const ContainerStyle = styled.div<{ colCount: number }>`
  width: 100%;
  height: 100vh;
  padding: 60px 0 0 0;
  display: flex;
  flex-direction: column;
  background-image: url('/images/bg-02-02@2x.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;

  .problem-container {
    width: 100%;
    height: 100%;
    padding: 80px 120px;
    display: flex;
    flex-direction: column;

    .card-wrapper {
      width: 100%;
      padding: 30px;
      display: grid;
      grid-template-columns: repeat(
        ${(props) => props.colCount},
        minmax(0, 1fr)
      );

      grid-gap: 20px;

      .card-item-box {
        position: relative;
      }

      .item-checked {
        position: absolute;
        left: 20px;
        bottom: 20px;
      }
    }

    .control-wrapper {
      width: 100%;
      height: 80px;
      display: flex;
      justify-content: center;
      gap: 20px;
    }
  }
`;

const PlayOrderPage: React.FC = () => {
  const [colCount, setColCount] = React.useState<number>(6);
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
  const [level, setLevel] = React.useState<number>(1);
  const [type, setType] = React.useState<string>('order');
  const [problemData, setProblemData] = React.useState<any[]>([]);
  const [currentProblemImages, setCurrentProblemImages] = React.useState<
    string[]
  >([]);
  const [currentProblemImageIds, setCurrentProblemImageIds] = useState<
    number[]
  >([]);
  const [currentProblemAnswers, setCurrentProblemAnswers] = React.useState<
    number[][]
  >([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const params = useParams();

  const {
    currentProblemIndex,
    currState,
    answers,
    setAnswers,
    setCurrState,
    clearAnswers,
    clearAll,
    toNextProblem,
    playProblemSound,
  } = useProblemManagerStore();

  const { data, error, isLoading } = useSWR(
    `problem/order/${level && type ? `?level=${level}&category=${type}` : ''}`,
    (url) => fetcher({ url })
  );

  useEffect(() => {
    if (params.level && params.type) {
      setLevel(parseInt(params.level));
      setType(params.type);
      console.log(
        params.type,
        params.level,
        `?level=${level}&category=${type}`
      );
    }
  }, [params]);

  useEffect(() => {
    if (!isLoading && data && data.length > 0) {
      console.log('enter page', data);
      const shuffledData: any[] = shuffleArray(data).slice(0, 10);
      setProblemData([...shuffledData]);
      const currImages = shuffledData[currentProblemIndex].choices_images
        ? shuffledData[currentProblemIndex].choices_images.map(
            (item: string) => item
          )
        : [];
      setCurrentProblemImageIds([...shuffledData[currentProblemIndex].choices]);
      setColCount(currImages.length / 3);
      setCurrentProblemImages([...currImages]);
      const answersData = shuffledData.map((item: any) => item.answers);
      setCurrentProblemAnswers([...answersData]);
    }
  }, [isLoading]);

  useEffect(() => {
    console.log('currState', currState);
  }, [currState]);

  useEffect(() => {
    console.log('currState', currState);
    if (!isPlaying) {
      console.log('isPlaying', currState);
      setCurrState('solving');
    }
  }, [isPlaying]);

  useEffect(() => {
    clearAll();
    (async () => {
      await mutate(
        `problem/order/${
          level && type ? `?level=${level}&category=${type}` : ''
        }`,
        undefined,
        true
      );
    })();
  }, []);

  useEffect(() => {
    console.log(answers);
  }, [answers]);

  return (
    <ContainerStyle colCount={colCount}>
      <ProblemNavigation />
      <div className="problem-container">
        <audio
          ref={audioRef}
          src={problemData[currentProblemIndex]?.sound_file}
        />
        <div className="card-wrapper">
          {Array.from(
            { length: currentProblemImages ? currentProblemImages.length : 0 },
            (_, i) => i + 1
          ).map((item, i) => (
            <div className="card-item-box" key={i}>
              <OrderItemCard
                imageId={currentProblemImageIds[i]}
                url={`https://oditory.s3.ap-northeast-2.amazonaws.com/media/public/${currentProblemImages[i]}`}
                size={
                  colCount === 4 ? 'large' : colCount === 5 ? 'medium' : 'small'
                }
              />
            </div>
          ))}
        </div>
        <div className="control-wrapper">
          {currState === 'waiting' && currentProblemIndex === 0 && (
            <>
              <ControlButton
                name="시작하기"
                onClick={() => {
                  console.log('시작하기', audioRef, currState);
                  setCurrState('playing');
                  setIsPlaying(true);
                  audioRef.current?.play();
                  if (audioRef.current) {
                    setTimeout(
                      () => {
                        setIsPlaying(false);
                      },
                      audioRef.current?.duration * 1000 + 500
                    );
                  }
                }}
              />
            </>
          )}
          {currState === 'solving' && (
            <>
              <ControlButton
                name="정답확인"
                onClick={() => console.log('시작하기')}
              />
              <ControlButton
                isRetry={true}
                name="다시고르기"
                onClick={clearAnswers}
              />
            </>
          )}
        </div>
      </div>
    </ContainerStyle>
  );
};

export default PlayOrderPage;
