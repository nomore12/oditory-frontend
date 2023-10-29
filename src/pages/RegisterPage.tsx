import React, { useState } from 'react';
import styled from 'styled-components';

const ContainerStyle = styled.div`
  form {
    width: 400px;
    display: flex;
    flex-direction: column;
  }
`;

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [isStudent, setIsStudent] = useState<boolean>(false);
  const [teacherId, setTeacherId] = useState<string>('');
  const [pw, setPw] = useState<string>('');
  const [pwConfirm, setPwConfirm] = useState<string>('');

  const onEmailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onNameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const onIsStudentChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsStudent(event.target.checked);
  };

  const onTeacherIdChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTeacherId(event.target.value);
  };

  const onPwChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPw(event.target.value);
  };

  const onPwConfirmChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPwConfirm(event.target.value);
  };

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <ContainerStyle>
      <form onSubmit={onSubmitHandler}>
        <label htmlFor="register_email_textfield">이메일</label>
        <input
          id="register_email_textfield"
          type="email"
          value={email}
          onChange={onEmailChangeHandler}
        />
        <label htmlFor="register_name_textfield">닉네임</label>
        <input
          id="register_name_textfield"
          type="text"
          value={name}
          onChange={onEmailChangeHandler}
        />
        <div>
          <input
            id="register_checkbox_student"
            type="checkbox"
            checked={isStudent}
            onChange={onIsStudentChangeHandler}
          />
          <label htmlFor="register_checkbox_student">학생</label>
          <input
            id="register_checkbox_teacher"
            type="checkbox"
            checked={!isStudent}
            onChange={onIsStudentChangeHandler}
          />
          <label htmlFor="register_checkbox_teacher">선생님</label>
        </div>
        <label htmlFor="register_teacher_id_textfield">선생님 아이디</label>
        <input
          id="register_teacher_id_textfield"
          type="text"
          value={teacherId}
          onChange={onTeacherIdChangeHandler}
        />
        <label htmlFor="register_pw_textfield">비밀번호</label>
        <input
          id="register_pw_textfield"
          type="password"
          value={pw}
          onChange={onPwChangeHandler}
        />
        <label htmlFor="register_pw_confirm_textfield">비밀번호 확인</label>
        <input
          id="register_pw_confirm_textfield"
          type="password"
          value={pwConfirm}
          onChange={onPwConfirmChangeHandler}
        />
      </form>
    </ContainerStyle>
  );
};

export default RegisterPage;
