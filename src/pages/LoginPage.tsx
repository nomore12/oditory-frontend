import React from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate('/main');
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        gap: '2rem',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <Typography sx={{ fontWeight: 600 }} variant="h1">
        오디토리
      </Typography>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        component="form"
        onSubmit={handleLogin}
      >
        <TextField label="아이디"></TextField>
        <TextField label="비밀번호" type="password"></TextField>
        <Box>
          <FormControlLabel control={<Checkbox />} label="자동 로그인" />
          <Button variant="outlined" type="submit">
            로그인
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', gap: '1rem', position: 'fixed', bottom: 30 }}>
        <Typography variant="body2">아직 회원이 아니신가요?</Typography>
        <Link to="/signup">회원가입</Link>
      </Box>
    </Box>
  );
};

export default LoginPage;
