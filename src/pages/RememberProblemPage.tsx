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

const ContainerStyle = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
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
  const {
    currentProblemNumber,
    memoryProblemStateData,
    userCheckedAnswers,
    setInitialMemoryProblemStateData,
    setCurrentProblemIsCorrect,
    setCurrentProblemIsWrong,
    clearUserCheckedAnswers,
  } = useMemoryProblemStore();

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
      {currentLevelProblemData && (
        <AudioComponent
          src={
            currentLevelProblemData[currentProblemNumber].problem.sound_item
              .sound
          }
        />
      )}
    </ContainerStyle>
  );
};

export default RememberProblemPage;
