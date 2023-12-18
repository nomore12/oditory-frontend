import React from 'react';
import styled from 'styled-components';
import ProblemNavigation from '../components/commons/ProblemNavigation';
import StarNumberIcon from '../components/commons/StarNumberIcon';

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
  return (
    <ContainerStyle>
      <ProblemNavigation />
      <div className="problem-block-wrapper">
        <div className="menu-item-wrapper">
          <h2>기본 지시 따르기</h2>
          <div className="star-wrapper">
            {Array.from({ length: 20 }, (_, i) => (
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
            {Array.from({ length: 20 }, (_, i) => (
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
          <h2>양적 지시 따르기</h2>
          <div className="star-wrapper">
            {Array.from({ length: 20 }, (_, i) => (
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
          <h2>위치적 지시 따르기</h2>
          <div className="star-wrapper">
            {Array.from({ length: 20 }, (_, i) => (
              <StarNumberIcon
                key={i}
                starNumber={i + 1}
                url={`/play-order/basic/${i + 1}`}
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
