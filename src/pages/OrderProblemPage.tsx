import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProblemNavigation from '../components/commons/ProblemNavigation';
import StarNumberIcon from '../components/commons/StarNumberIcon';
import useSWR from 'swr';
import { fetcher } from '../utils/fetcher';
import { useParams } from 'react-router-dom';
import { useProblemManagerStore } from '../store/ProblemManager';

const ContainerStyle = styled.div`
  width: 100%;
  height: 100vh;
  padding: 60px 0 0 0;
  display: flex;
  flex-direction: column;
  background-image: url('/images/bg-02-01@2x.png');
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
  { type: 'basic', levelCount: 1 },

  {
    type: 'time',
    levelCount: 1,
  },
  { type: 'quantity', levelCount: 1 },
  { type: 'location', levelCount: 1 },
];

const OrderProblemPage: React.FC = () => {
  const [level, setLevel] = useState<number>(0);
  const [type, setType] = useState<string>('');
  const [levelData, setLevelData] =
    useState<{ type: string; levelCount: number }[]>(initialLevelData);

  const { setCurrState, clearAll } = useProblemManagerStore();

  const { data, error, isLoading, mutate } = useSWR(`problem/order/`, (url) =>
    fetcher({ url })
  );

  useEffect(() => {
    if (!isLoading && data) {
      console.log(data);

      const basicLevels = new Set(
        data
          .filter((item: any) => item.category === 'basic')
          .map((item: any) => item.problem.level)
      );
      const timeLevels = new Set(
        data
          .filter((item: any) => item.category === 'time')
          .map((item: any) => item.problem.level)
      );

      const quantityLevels = new Set(
        data
          .filter((item: any) => item.category === 'quantity')
          .map((item: any) => item.problem.level)
      );

      const locationLevels = new Set(
        data
          .filter((item: any) => item.category === 'location')
          .map((item: any) => item.problem.level)
      );

      const levels = [
        { type: 'basic', levelCount: basicLevels.size },
        {
          type: 'time',
          levelCount: timeLevels.size,
        },
        { type: 'quantity', levelCount: quantityLevels.size },
        { type: 'location', levelCount: locationLevels.size },
      ];

      setLevelData([...levels]);

      console.log(
        basicLevels.size,
        timeLevels.size,
        quantityLevels.size,
        locationLevels.size
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
          <h2>기본 지시 따르기</h2>
          <div className="star-wrapper">
            {Array.from({ length: levelData[0].levelCount }, (_, i) => (
              <StarNumberIcon
                key={i}
                starNumber={i + 1}
                url={`/play-order/basic/${i + 1}`}
                color="#02A3B9"
              />
            ))}
          </div>
        </div>
        <div className="menu-item-wrapper">
          <h2>시간적 지시 따르기</h2>
          <div className="star-wrapper">
            {Array.from({ length: levelData[1].levelCount }, (_, i) => (
              <StarNumberIcon
                key={i}
                starNumber={i + 1}
                url={`/play-order/time/${i + 1}`}
                color="#02A3B9"
              />
            ))}
          </div>
        </div>
        <div className="menu-item-wrapper">
          <h2>양적 지시 따르기</h2>
          <div className="star-wrapper">
            {Array.from({ length: levelData[2].levelCount }, (_, i) => (
              <StarNumberIcon
                key={i}
                starNumber={i + 1}
                url={`/play-order/quantity/${i + 1}`}
                color="#02A3B9"
              />
            ))}
          </div>
        </div>
        <div className="menu-item-wrapper">
          <h2>위치적 지시 따르기</h2>
          <div className="star-wrapper">
            {Array.from({ length: levelData[3].levelCount }, (_, i) => (
              <StarNumberIcon
                key={i}
                starNumber={i + 1}
                url={`/play-order/location/${i + 1}`}
                color="#02A3B9"
              />
            ))}
          </div>
        </div>
      </div>
    </ContainerStyle>
  );
};

export default OrderProblemPage;
