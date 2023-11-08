import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation, matchPath, useParams } from 'react-router-dom';
import useSWR from 'swr';
import { fetcher } from '../utils/fetcher';
import { shuffleArray } from '../utils/utils';
import type { MemoryProblemData, AnswerItem } from '../type';
import ChoicesBoard from '../components/play/remember/ChoicesBoard';
import { useMemoryProblemStore } from '../store/MemoryStore';
import AudioComponent from '../components/play/AudioComponent';
import { useOverlay } from '../hooks/useOverlay';
import Overlay from '../components/commons/Overlay';

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
    setInitialMemoryProblemStateData,
    setCurrentProblemIsCorrect,
    setCurrentProblemIsWrong,
    clearUserCheckedAnswers,
  } = useMemoryProblemStore();

  const playSoundHandler = () => {
    setPlaySound(true);
  };

  useEffect(() => {
    clearUserCheckedAnswers();
  }, []);

  useEffect(() => {
    if (data) {
      setCurrentLevelProblemData(data);
      console.log('data', data, data[currentProblemNumber]);
      const problems = data[currentProblemNumber]?.choices;
      setCurrentProblemData(problems);
    }
  }, [data, isLoading]);

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
            <h1>asdfasdfasdfasfdsdaf</h1>
            <button onClick={overlayHandler}>닫기</button>
          </div>
        )}
      </Overlay>
    </ContainerStyle>
  );
};

export default RememberProblemPage;
