import React, { KeyboardEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
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
import CorrectPanel from '../components/play/remember/CorrectPanel';
import ClearPanel from '../components/play/remember/ClearPanel';

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

  .start-button {
    width: 280px;
    height: 76px;
    background-color: #000;
    color: #fff;
    font-size: 26px;
    border-radius: 20px;
  }
`;

const RememberProblemPage: React.FC = () => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
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
  const [isStart, setIsStart] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [nextProblem, setNextProblem] = useState(0);
  const { isAdd, overlayHandler } = useOverlay();
  const {
    wrongCheck,
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
    setWrongCheck,
  } = useMemoryProblemStore();

  const toTheNextProblem = () => {
    if (currentProblemNumber === -1) {
      setFinished(true);
      if (
        memoryProblemStateData[memoryProblemStateData.length - 1].status ===
        'wrong'
      ) {
        overlayHandler();
      }
      return;
    }
    const problems = data[currentProblemNumber]?.choices;
    setCurrentProblemData(problems);
    const corrects = data[currentProblemNumber].answers.map(
      (item: any) => item.pk
    );
    setCorrectAnswers(corrects);
    clearUserCheckedAnswers();

    if (!isWrong) {
      overlayHandler();
    } else {
      setIsWrong(false);
      setWrongCheck();
    }
    setTimeout(() => setPlaySound(true), 500);
  };

  const onRetryhandler = () => {
    setInitialMemoryProblemStateData(data);
    setCurrentLevelProblemData(data);
    const problems = data[0]?.choices;
    setCurrentProblemData(problems);
    const corrects = data[0].answers.map((item: any) => item.pk);
    setCorrectAnswers(corrects);
    setFinished(false);
    if (wrongCheck) {
      setWrongCheck();
    }
    setTimeout(() => setPlaySound(true), 500);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        setNextProblem(nextProblem + 1);
      }
    };

    // 이벤트 핸들러를 EventListener 타입으로 캐스팅
    const keyDownListener = handleKeyDown as unknown as EventListener;

    window.addEventListener('keydown', keyDownListener);

    return () => {
      window.removeEventListener('keydown', keyDownListener);
    };
  }, [nextProblem, setNextProblem]);

  useEffect(() => {
    if (data) {
      console.log('data', data);
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
    if (nextProblem !== 0) {
      if (
        !isLoading &&
        correctAnswers.length > 0 &&
        memoryProblemStateData.length === 10 &&
        arraysMatch(correctAnswers, userCheckedAnswers)
      ) {
        setCurrentProblemIsCorrect();
        overlayHandler();
      } else if (
        !isLoading &&
        correctAnswers.length > 0 &&
        memoryProblemStateData.length === 10
      ) {
        setCurrentProblemIsWrong();
        setIsWrong(true);
        setWrongCheck();
        // if (finished) {
        //   overlayHandler();
        // }
      }
    }
  }, [nextProblem]);

  return (
    <ContainerStyle>
      {isStart && currentProblemData && (
        <ChoicesBoard itemArray={currentProblemData} />
      )}
      <div>
        {!isStart && (
          <button
            className="start-button"
            onClick={() => {
              setIsStart(true);
              setTimeout(() => setPlaySound(true), 500);
            }}
          >
            시작하기
          </button>
        )}
        {isStart && !isAdd && !isWrong && (
          <button
            className="start-button"
            onClick={() => setNextProblem(nextProblem + 1)}
          >
            정답 확인
          </button>
        )}
        {isWrong && (
          <button className="start-button" onClick={toTheNextProblem}>
            다음 문제
          </button>
        )}
      </div>
      {isStart && currentLevelProblemData && (
        <AudioComponent
          src={
            currentProblemNumber < 10 && currentProblemNumber !== -1
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
              <ClearPanel
                level={level ? Number(level) : 0}
                correctCount={
                  memoryProblemStateData
                    ? memoryProblemStateData.filter(
                        (item) => item.status === 'correct'
                      ).length
                    : 0
                }
                overlayHandler={overlayHandler}
                onRetryHandler={onRetryhandler}
              />
            ) : (
              <>
                {memoryProblemStateData.length > 0 &&
                currentProblemNumber !== 0 &&
                currentProblemNumber !== -1 &&
                memoryProblemStateData[
                  currentProblemNumber === 9 || currentProblemNumber === -1
                    ? memoryProblemStateData.length - 1
                    : currentProblemNumber - 1
                ].status === 'correct' ? (
                  <CorrectPanel isCorrect={true} onClick={toTheNextProblem} />
                ) : (
                  <CorrectPanel isCorrect={false} onClick={toTheNextProblem} />
                )}
              </>
            )}
          </div>
        )}
      </Overlay>
    </ContainerStyle>
  );
};

export default RememberProblemPage;
