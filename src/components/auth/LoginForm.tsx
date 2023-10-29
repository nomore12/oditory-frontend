import React, { useState } from 'react';
import styled from 'styled-components';
import usePostData from '../../hooks/usePostHook';
import useAuthStore from '../../store/AuthStore';
import Cookie from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';

const ContainerStyle = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;

  form {
    display: flex;
    flex-direction: column;
  }

  .login-image__section {
    width: 50%;
  }

  .login-form__section {
    width: 50%;
    padding: 100px;
    display: flex;
    flex-direction: column;
  }
`;

const LoginForm: React.FC = () => {
  const [id, setId] = useState<string>('');
  const [pw, setPw] = useState<string>('');
  const [rememberId, setRememberId] = useState<boolean>(false);
  const { setToken } = useAuthStore;
  const navigate = useNavigate();

  const { data, error, isValidating, executePost } = usePostData(
    'auth/login/',
    {
      email: id,
      password: pw,
    },
    { 'Content-Type': 'application/json' }
  );

  const onIdChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };

  const onPwChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPw(event.target.value);
  };

  const onRememberIdChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRememberId(event.target.checked);
  };

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = await executePost();

    if (data && data.token) {
      // console.log(data);
      // Cookie.set('token', data.token, { expires: 7, path: '/' });
      sessionStorage.setItem('token', data.token);
      navigate('/main');
    }
  };

  return (
    <ContainerStyle>
      <form onSubmit={onSubmitHandler}>
        <label htmlFor="login_id_textfield">이메일</label>
        <input
          id="login_id_textfield"
          type="text"
          value={id}
          onChange={onIdChangeHandler}
        />
        <label htmlFor="login_pw_textfield">비밀번호</label>
        <input
          id="login_pw_textfield"
          type="password"
          value={pw}
          onChange={onPwChangeHandler}
        />
        <div>
          <input
            id="login_checkbox"
            type="checkbox"
            checked={rememberId}
            onChange={onRememberIdChangeHandler}
          />
          <label htmlFor="login_checkbox">아이디 기억하기</label>
        </div>
        <button>로그인</button>
      </form>
      <Link to="/register">회원가입</Link>
    </ContainerStyle>
  );
};

export default LoginForm;
