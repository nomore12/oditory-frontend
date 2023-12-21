import React, { useEffect, useState } from 'react';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import styled from 'styled-components';
import ProblemNavigation from '../components/commons/ProblemNavigation';
import StarNumberIcon from '../components/commons/StarNumberIcon';
import useSWR from 'swr';
import { fetcher } from '../utils/fetcher';
import { useProblemManagerStore } from '../store/ProblemManager';

interface LinePropsType {
  name: number;
}

const ContainerStyle = styled.div`
  width: 100%;
  height: 100vh;
  padding: 60px 0 0 0;
  display: flex;
  flex-direction: column;
  background-image: url('/images/bg-03-01@2x.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;

  .problem-block-wrapper {
    width: 100%;
    height: 100%;
    padding: 80px 120px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    overflow: auto;

    .menu-item-wrapper {
      display: flex;
      flex-direction: column;

      & > h2 {
        font-size: 26px;
        font-weight: 600;
        margin-bottom: 30px;
      }

      .star-wrapper {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 42px;
        flex-wrap: wrap;
        margin-bottom: 30px;
      }
    }
  }
`;

const initialLevelData = [
  { type: '의자에앉기', levelCount: 0 },

  {
    type: '술래잡기',
    levelCount: 0,
  },
  { type: '자전거타기', levelCount: 0 },
  { type: '비교', levelCount: 0 },
  { type: '물건주기', levelCount: 0 },
];

const SyntaxProblemPage: React.FC = () => {
  const [levelData, setLevelData] =
    useState<{ type: string; levelCount: number }[]>(initialLevelData);

  const { data, error, isLoading, mutate } = useSWR(`problem/syntax/`, (url) =>
    fetcher({ url })
  );

  const { setCurrState, clearAll } = useProblemManagerStore();

  useEffect(() => {
    if (!isLoading && data) {
      console.log(data);

      const chairLevels = new Set(
        data
          .filter((item: any) => item.category === '의자에앉기')
          .map((item: any) => item.problem.level)
      );
      const catchLevels = new Set(
        data
          .filter((item: any) => item.category === '술래잡기')
          .map((item: any) => item.problem.level)
      );

      const bikeLevels = new Set(
        data
          .filter((item: any) => item.category === '자전거타기')
          .map((item: any) => item.problem.level)
      );

      const compareLevels = new Set(
        data
          .filter((item: any) => item.category === '비교')
          .map((item: any) => item.problem.level)
      );

      const sendLevels = new Set(
        data
          .filter((item: any) => item.category === '물건주기')
          .map((item: any) => item.problem.level)
      );

      const levels = [
        { type: '의자에앉기', levelCount: chairLevels.size },
        {
          type: '술래잡기',
          levelCount: catchLevels.size,
        },
        { type: '자전거타기', levelCount: bikeLevels.size },
        { type: '비교', levelCount: compareLevels.size },
        { type: '물건주기', levelCount: sendLevels.size },
      ];

      setLevelData([...levels]);

      console.log(
        chairLevels.size,
        catchLevels.size,
        bikeLevels.size,
        compareLevels.size,
        sendLevels.size
      );
    }
  }, [isLoading]);

  useEffect(() => {
    clearAll();
    if (data) {
      mutate();
    }
  }, []);

  return (
    <ContainerStyle>
      <ProblemNavigation />
      <div className="problem-block-wrapper">
        <div className="menu-item-wrapper">
          <h2>의자에 앉기</h2>
          <div className="star-wrapper">
            {Array.from({ length: levelData[0].levelCount }, (_, i) => (
              <StarNumberIcon
                key={i}
                starNumber={i + 1}
                url={`/play-syntax/chair/${i + 1}`}
                color="#EF8610"
              />
            ))}
          </div>
        </div>
        <div className="menu-item-wrapper">
          <h2>술래잡기</h2>
          <div className="star-wrapper">
            {Array.from({ length: levelData[1].levelCount }, (_, i) => (
              <StarNumberIcon
                key={i}
                starNumber={i + 1}
                url={`/play-syntax/hide/${i + 1}`}
                color="#EF8610"
              />
            ))}
          </div>
        </div>
        <div className="menu-item-wrapper">
          <h2>자전거 타기</h2>
          <div className="star-wrapper">
            {Array.from({ length: levelData[2].levelCount }, (_, i) => (
              <StarNumberIcon
                key={i}
                starNumber={i + 1}
                url={`/play-syntax/bike/${i + 1}`}
                color="#EF8610"
              />
            ))}
          </div>
        </div>
        <div className="menu-item-wrapper">
          <h2>비교</h2>
          <div className="star-wrapper">
            {Array.from({ length: levelData[3].levelCount }, (_, i) => (
              <StarNumberIcon
                key={i}
                starNumber={i + 1}
                url={`/play-syntax/compare/${i + 1}`}
                color="#EF8610"
              />
            ))}
          </div>
        </div>
        <div className="menu-item-wrapper">
          <h2>물건주기</h2>
          <div className="star-wrapper">
            {Array.from({ length: levelData[4].levelCount }, (_, i) => (
              <StarNumberIcon
                key={i}
                starNumber={i + 1}
                url={`/play-syntax/send/${i + 1}`}
                color="#EF8610"
              />
            ))}
          </div>
        </div>
      </div>
    </ContainerStyle>
  );
};

export default SyntaxProblemPage;
