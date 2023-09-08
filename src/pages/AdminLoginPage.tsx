import React, { ChangeEvent, useCallback, useState } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';

const AdminLoginPage: React.FC = () => {
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onLoginClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      console.log('로그인 버튼 클릭');
    },
    []
  );

  const onIdChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.currentTarget.value);
    setId(event.target.value);
  };

  const onPasswordChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log(event.target.value);
    setPassword(event.target.value);
  };

  return (
    <Box>
      <Container
        maxWidth="sm"
        sx={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h3" gutterBottom component="h3">
          관리자 페이지 로그인
        </Typography>
        <Box
          sx={{ display: 'flex', flexDirection: 'column', width: 400, gap: 2 }}
        >
          <TextField
            id="outlined-basic"
            label="아이디"
            variant="outlined"
            onChange={onIdChangeHandler}
          />
          <TextField
            id="outlined-basic"
            label="패스워드"
            type="password"
            variant="outlined"
            onChange={onPasswordChangeHandler}
          />
          <Button variant="outlined" onClick={onLoginClick}>
            로그인
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default AdminLoginPage;
