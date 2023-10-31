import React from 'react';
import { Box, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import ClearIcon from '@mui/icons-material/Clear';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/AuthStore';
import Paper from '../components/play/Paper';
import styled from 'styled-components';
import { ReactComponent as Star } from '../assets/images/icons/icn-star.svg';

const ContainerStyle = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url('/images/bg-01-01@2x.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;

  & h1 {
    font-size: 40px;
    font-weight: 600;
    margin-bottom: 40px;
  }

  & * {
    text-decoration: none;
    color: inherit;

    &:hover {
      text-decoration: none;
    }
  }

  .paper-wrapper {
    display: flex;
    gap: 60px;
  }

  .paper-menu-image-wrapper {
    width: 180px;
    height: 220px;
  }

  .paper-menu-title {
    font-size: 28px;
    font-weight: 600;
  }

  .star-problem-wrapper {
    display: flex;
    gap: 12px;

    & > div {
      font-size: 16px;
    }
  }
`;

const StyledStar = styled(Star)`
  fill: #ffd833;
  width: 17px;
  height: 16px;
`;

const MainPage: React.FC = () => {
  const { token, user } = useAuthStore();
  console.log(user);

  return (
    <ContainerStyle>
      <div>
        <h1>오늘은 어떤 놀이를 해볼까요?</h1>
      </div>
      <div className="paper-wrapper">
        <Link to={'/play-remember'}>
          <Paper
            styleProps={{
              width: '260px',
              height: '380px',
              padding: '40px',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '14px',
            }}
          >
            <div className="paper-menu-image-wrapper">
              <img src="/images/t-01.png" alt="기억력 향상" />
            </div>
            <h3 className="paper-menu-title">기억력 향상</h3>
            <div className="star-problem-wrapper">
              <StyledStar />
              <div>6/39</div>
            </div>
          </Paper>
        </Link>
        <Link to={'/play-order'}>
          <Paper
            styleProps={{
              width: '260px',
              height: '380px',
              padding: '40px',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '14px',
            }}
          >
            <div className="paper-menu-image-wrapper">
              <img src="/images/t-02.png" alt="지시 따르기" />
            </div>
            <h3 className="paper-menu-title">지시 따르기</h3>
            <div className="star-problem-wrapper">
              <StyledStar />
              <div>6/39</div>
            </div>
          </Paper>
        </Link>
        <Link to={'/play-understand'}>
          <Paper
            styleProps={{
              width: '260px',
              height: '380px',
              padding: '40px',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '14px',
            }}
          >
            <div className="paper-menu-image-wrapper">
              <img src="/images/t-03.png" alt="구문 이해" />
            </div>
            <h3 className="paper-menu-title">구문 이해</h3>
            <div className="star-problem-wrapper">
              <StyledStar />
              <div>6/39</div>
            </div>
          </Paper>
        </Link>
      </div>
    </ContainerStyle>
  );
};

export default MainPage;
