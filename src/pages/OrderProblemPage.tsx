import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProblemNavigation from '../components/commons/ProblemNavigation';
import StarNumberIcon from '../components/commons/StarNumberIcon';
import useSWR from 'swr';
import { fetcher } from '../utils/fetcher';

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

const OrderProblemPage: React.FC = () => {
  const { data, error, isLoading, mutate } = useSWR(`problem/order/`, (url) =>
    fetcher({ url })
  );

  useEffect(() => {
    if (!isLoading && data) {
      console.log(data);

      const uniqueLevels = new Set(
        data
          .filter((item: any) => item.category === 'basic')
          .map((item: any) => item.problem.level)
      );

      const numberOfUniqueLevels = uniqueLevels.size;

      console.log(numberOfUniqueLevels);
    }
  }, [isLoading]);

  return (
    <ContainerStyle>
      <ProblemNavigation />
      <div className="problem-block-wrapper">
        <div className="menu-item-wrapper">
          <h2>기본 지시 따르기</h2>
          <div className="star-wrapper">
            {Array.from({ length: 4 }, (_, i) => (
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
            {Array.from({ length: 5 }, (_, i) => (
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
            {Array.from({ length: 6 }, (_, i) => (
              <StarNumberIcon
                key={i}
                starNumber={i + 1}
                url={`/play-order/amount/${i + 1}`}
                color="#02A3B9"
              />
            ))}
          </div>
        </div>
        <div className="menu-item-wrapper">
          <h2>위치적 지시 따르기</h2>
          <div className="star-wrapper">
            {Array.from({ length: 7 }, (_, i) => (
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
