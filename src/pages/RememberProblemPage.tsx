import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  useLocation,
  matchPath,
  useParams,
  useNavigate,
} from 'react-router-dom';
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
    if (currentProblemNumber === -1) {
      setFinished(true);
      clearMemoryProblemStore();
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
    setTimeout(() => setPlaySound(true), 500);
  };

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
              <>
                <div>문제를 모두 마쳤어요.</div>
                <button
                  onClick={() => {
                    clearMemoryProblemStore();
                    overlayHandler();
                    navigate('/play-remember');
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
                  currentProblemNumber !== -1 &&
                  memoryProblemStateData[
                    currentProblemNumber === 9 || currentProblemNumber === -1
                      ? memoryProblemStateData.length - 1
                      : currentProblemNumber - 1
                  ].status === 'correct' ? (
                    <CorrectPanel isCorrect={true} onClick={toTheNextProblem} />
                  ) : (
                    <CorrectPanel
                      isCorrect={false}
                      onClick={toTheNextProblem}
                    />
                  )}
                </h1>
                {/*<button onClick={toTheNextProblem}>다음</button>*/}
              </>
            )}
          </div>
        )}
      </Overlay>
    </ContainerStyle>
  );
};

export default RememberProblemPage;
