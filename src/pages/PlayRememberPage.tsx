import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import StarNumberIcon from '../components/commons/StarNumberIcon';
import LockNumberIcon from '../components/commons/LockNumberIcon';
import useGetHook from '../hooks/useGetHook';
import type { MemoryProblemData, AnswerItem } from '../type';

const ContainerStyle = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
  background-image: url('/images/bg-01-01-1@2x.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;

  .memory-page-title {
    font-size: 40px;
    font-weight: 600;
    color: #fff;
  }

  .star-icon-container {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-template-rows: repeat(4, 1fr);
  }

  .star-icon-wrapper {
    margin: 22px;
  }
`;

const arr = [];
for (let i = 0; i < 40; i++) {
  arr.push(i + 1);
}

const PlayRememberPage: React.FC = () => {
  const { data, error, mutate } = useGetHook('problem/memory/');
  const [levelData, setLevelData] = useState<MemoryProblemData[][]>([]);

  useEffect(() => {
    console.log('data', data);
    const groupAndSortByLevel = (
      data: MemoryProblemData[] = []
    ): MemoryProblemData[][] => {
      const groupedByLevel: { [key: number]: MemoryProblemData[] } =
        data.reduce((acc: { [key: number]: MemoryProblemData[] }, item) => {
          if (!acc[item.problem.level]) {
            acc[item.problem.level] = [];
          }
          acc[item.problem.level].push(item);
          return acc;
        }, {});

      const sortedLevels = Object.keys(groupedByLevel)
        .map(Number)
        .sort((a, b) => a - b);
      return sortedLevels.map((level) => groupedByLevel[level]);
    };

    // 사용 예시:
    const result = groupAndSortByLevel(data); // data는 MemoryProblemData 타입의 배열입니다.
    console.log(result);
    setLevelData(result);
  }, [data]);

  const starArr = levelData?.map((item: any, index: number) => {
    return (
      <div key={index} className="star-icon-wrapper">
        <StarNumberIcon
          starNumber={index + 1}
          url={`/play-remember/${index + 1}`}
        />
      </div>
    );
  });

  const emptyArr = Array.from(
    { length: 40 - data?.length },
    (_, i) => i + 1
  ).map((item, index) => {
    return (
      <div key={index} className="star-icon-wrapper">
        <LockNumberIcon starNumber={item} />
      </div>
    );
  });

  return (
    <ContainerStyle>
      <h2 className="memory-page-title">
        단어를 듣고 알맞은 정답을 찾아보세요.
      </h2>
      <div className="star-icon-container">
        {starArr}
        {emptyArr}
      </div>
    </ContainerStyle>
  );
};

export default PlayRememberPage;
