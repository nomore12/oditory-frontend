import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation, matchPath, useParams } from 'react-router-dom';
import useSWR from 'swr';
import { fetcher } from '../utils/fetcher';
import { arraysMatch, shuffleArray } from '../utils/utils';
import type { MemoryProblemData, AnswerItem } from '../type';
import ChoicesBoard from '../components/play/remember/ChoicesBoard';
import { useMemoryProblemStore } from '../store/MemoryStore';
import AudioComponent from '../components/play/AudioComponent';
import { useOverlay } from '../hooks/useOverlay';
import Overlay from '../components/commons/Overlay';
import type { MemoryProblemStateData } from '../store/MemoryStore';

const ContainerStyle = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
  position: relative;
  background-image: url('/images/bg-01-02@2x.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
`;

const RememberProblemPage: React.FC = () => {
  const params = useParams();
  const location = useLocation();
  const level = params.level;
  const { data, error, isLoading } = useSWR(
    `problem/memory/?level=${level}`,
    (url) => fetcher({ url })
  );
  const [currentLevelProblemData, setCurrentLevelProblemData] = useState<
    MemoryProblemData[] | null
  >(null);
  const [currentProblemData, setCurrentProblemData] = useState<AnswerItem[]>(
    []
  );
  const [playSound, setPlaySound] = useState(false);
  const { isAdd, overlayHandler } = useOverlay();
  const {
    currentProblemNumber,
    memoryProblemStateData,
    userCheckedAnswers,
    correctAnswers,
    setCorrectAnswers,
    setInitialMemoryProblemStateData,
    setCurrentProblemIsCorrect,
    setCurrentProblemIsWrong,
    clearUserCheckedAnswers,
  } = useMemoryProblemStore();

  console.log(location.pathname);

  const playSoundHandler = () => {
    setPlaySound(true);
  };

  useEffect(() => {
    if (data) {
      setInitialMemoryProblemStateData(data);
      setCurrentLevelProblemData(data);
      const problems = data[currentProblemNumber]?.choices;
      setCurrentProblemData(problems);
      const corrects = data[currentProblemNumber].answers.map(
        (item: any) => item.pk
      );
      setCorrectAnswers(corrects);
    }
  }, [data, isLoading]);

  useEffect(() => {
    setCurrentLevelProblemData(data);
  }, [currentProblemNumber]);

  useEffect(() => {
    if (
      correctAnswers.length > 0 &&
      arraysMatch(correctAnswers, userCheckedAnswers)
    ) {
      console.log('correct');
      setCurrentProblemIsCorrect();
      overlayHandler();
    } else if (correctAnswers.length === userCheckedAnswers.length) {
      console.log('wrong');
      setCurrentProblemIsWrong();
      overlayHandler();
    }
  }, [userCheckedAnswers.length]);

  useEffect(() => {
    console.log(
      'currentLevelProblemData',
      currentLevelProblemData,
      currentProblemData
    );
  }, [currentLevelProblemData, currentProblemData]);

  return (
    <ContainerStyle>
      {currentProblemData && <ChoicesBoard itemArray={currentProblemData} />}
      {/*<button onClick={overlayHandler}>dddd</button>*/}
      <div></div>
      {currentLevelProblemData && (
        <AudioComponent
          src={
            currentLevelProblemData[currentProblemNumber].problem.sound_item
              .sound
          }
          autoPlay={playSound}
          setPlaySound={setPlaySound}
        />
      )}
      <Overlay>
        {isAdd && (
          <div>
            <h1>
              {memoryProblemStateData.length > 2 &&
              memoryProblemStateData[currentProblemNumber - 1].status ===
                'correct'
                ? '정답이에요'
                : '오답이에요'}
            </h1>
            <button
              onClick={() => {
                const problems = data[currentProblemNumber]?.choices;
                setCurrentProblemData(problems);
                const corrects = data[currentProblemNumber].answers.map(
                  (item: any) => item.pk
                );
                setCorrectAnswers(corrects);
                clearUserCheckedAnswers();
                overlayHandler();
              }}
            >
              다음 문제
            </button>
          </div>
        )}
      </Overlay>
    </ContainerStyle>
  );
};

export default RememberProblemPage;
