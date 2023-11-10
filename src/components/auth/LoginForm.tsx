import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import usePostData from '../../hooks/usePostHook';
import useAuthStore from '../../store/AuthStore';
import Cookie from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';

const ContainerStyle = styled.div`
  width: 50vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  form {
    display: flex;
    flex-direction: column;

    label {
      font-size: 14px;
      margin-bottom: 8px;
      margin-top: 20px;
    }

    input {
      width: 320px;
      height: 51px;
      background-color: #f5f5f2 !important;
      border-radius: 12px;
      border: none;
      outline: none;
      padding: 0 16px;
      font-size: 16px;
      box-sizing: border-box;
    }

    input[type='checkbox'] {
      width: 16px;
      height: 16px;
      background: #f5f5f2;
      border: 1px solid #e2e0d9;
      border-radius: 4px;
      outline: none;
      padding: 0;
    }

    button {
      width: 320px;
      height: 49px;
      background: #000000;
      border-radius: 12px;
      color: #fff;
    }
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

  .checkbox-wrapper {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 12px 0px 20px 0px;

    & > label {
      margin: 0;
    }
  }

  .register-wrapper {
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;

    & > a {
      text-decoration: underline;
      color: #000;

      &:visited {
        color: #000;
      }
    }
  }
`;

const LoginForm: React.FC = () => {
  const [id, setId] = useState<string>('');
  const [pw, setPw] = useState<string>('');
  const [rememberId, setRememberId] = useState<boolean>(false);
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();
  const { user } = useAuthStore();

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

    if (data && data.token && data.user) {
      delete data.user.user.password;
      setAuth(data.token, data.user);
      navigate('/main');
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/main');
    }
  }, []);

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
        <div className="checkbox-wrapper">
          <input
            id="login_checkbox"
            type="checkbox"
            checked={rememberId}
            onChange={onRememberIdChangeHandler}
          />
          <label htmlFor="login_checkbox">아이디 기억하기</label>
        </div>
        <button>로그인</button>
        <div className="register-wrapper">
          <Link to="/register">아직 회원이 아니신가요?</Link>
        </div>
      </form>
    </ContainerStyle>
  );
};

export default LoginForm;
