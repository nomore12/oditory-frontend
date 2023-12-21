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
import { compareArrays } from '../utils/utils';

interface LinePropsType {
  name: number;
}

const ContainerStyle = styled.div<{ colCount: number }>`
  width: 100%;
  height: 100vh;
  padding: 60px 0 0 0;
  display: flex;
  position: relative;
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

  .score-panel {
    position: absolute;
    width: 600px;
    height: 400px;
    top: calc(50% - 300px);
    left: calc(50% - 200px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    background-color: white;
    border-radius: 40px;
  }

  .score-panel-title {
    font-size: 46px;
    font-weight: 700;
  }

  .score-panel-desc {
    font-size: 1rem;
    color: #999999;
  }

  .score-panel-score {
    font-size: 60px;
    display: flex;
    justify-content: center;

    & > first-child {
      color: #4d74be;
    }

    & > last-child {
      color: rgba(0, 0, 0, 0.1);
    }
  }

  .score-panel-buttons {
    display: flex;
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
  const [audioSrc, setAudioSrc] = React.useState<string>('');
  const [finalScore, setFinalScore] = React.useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const params = useParams();

  const {
    currentProblemIndex,
    currState,
    answers,
    setAnswers,
    scores,
    setScores,
    setCurrState,
    clearAnswers,
    clearAll,
    checkAnswer,
    toNextProblem,
    playProblemSound,
  } = useProblemManagerStore();

  const { data, error, isLoading } = useSWR(
    `problem/order/${level && type ? `?level=${level}&category=${type}` : ''}`,
    (url) => fetcher({ url })
  );

  const onCheckAnswer = () => {
    if (!answers) {
      alert('정답을 선택해주세요');
      return;
    }
    const correctAnswers = currentProblemAnswers[currentProblemIndex];
    if (
      answers.length !== currentProblemAnswers[currentProblemIndex].length ||
      answers.length !== correctAnswers.length
    ) {
      setScores(0);
    }
    console.log('compare', answers, correctAnswers);
    if (compareArrays(answers, correctAnswers)) {
      setScores(1);
    }

    setCurrState('checkAnswer');
  };

  const handleStartProblem = () => {
    if (currState === 'waiting') {
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
    } else if (currState === 'checkAnswer') {
      if (currentProblemIndex === 9) {
        const totalScore = scores.reduce((acc, curr) => acc + curr) * 10;
        setFinalScore(totalScore);
        setCurrState('end');
        return;
      }
      setAudioSrc(problemData[currentProblemIndex + 1]?.sound_file);
      toNextProblem();
      clearAnswers();
      setCurrState('playing');
      setIsPlaying(true);
      setTimeout(() => audioRef.current?.play(), 100);
      if (audioRef.current) {
        setTimeout(
          () => {
            setIsPlaying(false);
          },
          audioRef.current?.duration * 1000 + 500
        );
      }
    }
  };

  useEffect(() => {
    if (currentProblemIndex > 0) {
      const currImages = problemData[currentProblemIndex].choices_images
        ? problemData[currentProblemIndex].choices_images.map(
            (item: string) => item
          )
        : [];
      setCurrentProblemImageIds([...problemData[currentProblemIndex].choices]);
      setCurrentProblemImages([...currImages]);
      const answersData = problemData.map((item: any) => item.answers);
      setCurrentProblemAnswers([...answersData]);
    }
  }, [currentProblemIndex]);

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
      setAudioSrc(shuffledData[currentProblemIndex]?.sound_file);
    }
  }, [isLoading]);

  useEffect(() => {
    console.log('currState', currState);
  }, [currState, audioSrc]);

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
    console.log(scores);
  }, [scores]);

  return (
    <ContainerStyle colCount={colCount}>
      <ProblemNavigation />
      <div className="problem-container">
        <audio ref={audioRef} src={audioSrc} />
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
                isCorrect={currentProblemAnswers[currentProblemIndex].includes(
                  currentProblemImageIds[i]
                )}
              />
            </div>
          ))}
        </div>
        <div className="control-wrapper">
          {(currState === 'waiting' || currState === 'checkAnswer') && (
            <>
              <ControlButton
                name={
                  currentProblemIndex === 0 && currState === 'waiting'
                    ? '시작하기'
                    : '다음문제'
                }
                onClick={handleStartProblem}
              />
            </>
          )}
          {currState === 'solving' && (
            <>
              <ControlButton name="정답확인" onClick={onCheckAnswer} />
              <ControlButton
                isRetry={true}
                name="다시고르기"
                onClick={clearAnswers}
              />
            </>
          )}
        </div>
      </div>
      {currState === 'end' && (
        <div className="score-panel">
          <div className="score-panel-title">
            {level}레벨 {finalScore >= 60 ? '성공!!' : '실패...'}
          </div>
          <div className="score-panel-desc">
            {finalScore >= 60
              ? `멋져요, 총 ${finalScore / 10}개 문제를 맞췄어요.`
              : `아쉽지만 실패했어요. 다시 도전해보세요.`}
          </div>
          <div className="score-panel-score">
            <div>{finalScore}</div>
            <div>/ 100</div>
          </div>
          <div className="score-panel-buttons">
            <ControlButton name="확인" onClick={() => null} />
            <ControlButton name="다시 풀기" onClick={() => null} />
          </div>
        </div>
      )}
    </ContainerStyle>
  );
};

export default PlayOrderPage;
