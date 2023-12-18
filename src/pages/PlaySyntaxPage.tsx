import React, { useEffect } from 'react';
import styled from 'styled-components';
import SyntaxItemCard from '../components/play/syntax/SyntaxItemCard';
import ControlButton from '../components/commons/ControlButton';
import ProblemNavigation from '../components/commons/ProblemNavigation';
import { useParams } from 'react-router-dom';

const ContainerStyle = styled.div`
  width: 100%;
  height: 100vh;
  padding: 60px 0 0 0;
  display: flex;
  flex-direction: column;
  background-image: url('/images/bg-03-02@2x.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;

  .problem-container {
    width: 100%;
    height: 100%;
    padding: 80px 120px;
    display: flex;
    flex-direction: column;

    .card-wrapper {
      width: 100%;
      padding: 30px;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 20px;

      .card-item-box {
        position: relative;
      }

      .item-checked {
        position: absolute;
        left: 20px;
        bottom: 20px;
      }
    }

    .control-wrapper {
      width: 100%;
      height: 80px;
      display: flex;
      justify-content: center;
      gap: 20px;
    }
  }
`;

const PlaySyntaxPage: React.FC = () => {
  const { type, level } = useParams<{ type: string; level: string }>();

  useEffect(() => {
    console.log(type, level);
  }, []);

  return (
    <ContainerStyle>
      <ProblemNavigation />
      <div className="problem-container">
        <div className="card-wrapper">
          <div className="card-item-box">
            <SyntaxItemCard />
          </div>
          <div className="card-item-box">
            <SyntaxItemCard />
          </div>
          <div className="card-item-box">
            <SyntaxItemCard />
            <div className="item-checked">checked</div>
          </div>
          <div className="card-item-box">
            <SyntaxItemCard />
          </div>
        </div>
        <div className="control-wrapper">
          <ControlButton
            name="시작하기"
            onClick={() => console.log('시작하기')}
          />
          <ControlButton
            name="정답확인"
            onClick={() => console.log('시작하기')}
          />
          <ControlButton
            isRetry={true}
            name="다시고르기"
            onClick={() => console.log('시작하기')}
          />
        </div>
      </div>
    </ContainerStyle>
  );
};

export default PlaySyntaxPage;
