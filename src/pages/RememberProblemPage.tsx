import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation, matchPath, useParams } from 'react-router-dom';
import useSWR from 'swr';
import { fetcher } from '../utils/fetcher';
import { shuffleArray } from '../utils/utils';
import type { MemoryProblemData, AnswerItem } from '../type';

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
  const [currentProblemData, setCurrentProblemData] =
    useState<MemoryProblemData | null>(null);
  const [problemArray, setProblemArray] = useState<AnswerItem[]>([]);

  useEffect(() => {
    if (data) {
      console.log(data);
      setCurrentProblemData(data);
      const shuffledArr = data?.choices ? shuffleArray(data.choices) : [];
      if (Array.isArray(shuffledArr)) {
        setProblemArray(shuffledArr);
      }
    }
  }, [data, isLoading]);

  return (
    <ContainerStyle>
      <h2
        className="memory-page-title"
        onClick={() => console.log(currentProblemData, problemArray)}
      >
        단어를 듣고 알맞은 정답을 찾아보세요.
      </h2>
    </ContainerStyle>
  );
};

export default RememberProblemPage;
