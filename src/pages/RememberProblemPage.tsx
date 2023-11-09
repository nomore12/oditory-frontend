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
  const [finished, setFinished] = useState(false);
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
    clearMemoryProblemStore,
  } = useMemoryProblemStore();

  const playSoundHandler = () => {
    setPlaySound(true);
  };

  const toTheNextProblem = () => {
    if (currentProblemNumber > 9) {
      setFinished(true);
      return;
    }
    const problems = data[currentProblemNumber]?.choices;
    setCurrentProblemData(problems);
    const corrects = data[currentProblemNumber].answers.map(
      (item: any) => item.pk
    );
    setCorrectAnswers(corrects);
    clearUserCheckedAnswers();

    overlayHandler();
  };

  // useEffect(() => {
  //   // 여기서 라우트 변경에 따른 사이드 이펙트를 처리합니다.
  //   console.log('라우트가 변경되었습니다:', location.pathname);
  //   if (confirm('정말로 이전 페이지로 돌아가시겠습니까?')) {
  //     clearMemoryProblemStore();
  //   }
  // }, [location.key]); // location이 변경될 때마다 useEffect가 실행됩니다.

  useEffect(() => {
    clearMemoryProblemStore();
  }, []);

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
      !isLoading &&
      correctAnswers.length > 0 &&
      arraysMatch(correctAnswers, userCheckedAnswers)
    ) {
      setCurrentProblemIsCorrect();
      overlayHandler();
    } else if (
      !isLoading &&
      correctAnswers.length > 0 &&
      correctAnswers.length === userCheckedAnswers.length
    ) {
      setCurrentProblemIsWrong();
      overlayHandler();
    }
  }, [userCheckedAnswers.length]);

  return (
    <ContainerStyle>
      {currentProblemData && <ChoicesBoard itemArray={currentProblemData} />}
      <div></div>
      {currentLevelProblemData && (
        <AudioComponent
          src={
            currentProblemNumber < 10
              ? currentLevelProblemData[currentProblemNumber].problem.sound_item
                  .sound
              : ''
          }
          autoPlay={playSound}
          setPlaySound={setPlaySound}
        />
      )}
      <Overlay blockBackground>
        {isAdd && (
          <div>
            {finished ? (
              <>
                <div>문제를 모두 마쳤어요.</div>
                <button
                  onClick={() => {
                    clearMemoryProblemStore();
                    overlayHandler();
                  }}
                >
                  이전 페이지로 돌아가기.
                </button>
              </>
            ) : (
              <>
                <h1>
                  {memoryProblemStateData.length > 0 &&
                  currentProblemNumber !== 0 &&
                  memoryProblemStateData[currentProblemNumber - 1].status ===
                    'correct'
                    ? '정답이에요'
                    : '오답이에요'}
                </h1>
                <button onClick={toTheNextProblem}>다음 문제</button>
              </>
            )}
          </div>
        )}
      </Overlay>
    </ContainerStyle>
  );
};

export default RememberProblemPage;
