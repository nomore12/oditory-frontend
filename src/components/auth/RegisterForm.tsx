import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import usePostData from '../../hooks/usePostHook';
import { useNavigate } from 'react-router-dom';

const ContainerStyle = styled.div`
  form {
    width: 400px;
    display: flex;
    flex-direction: column;
  }

  .nickname-wrapper {
    width: 400px;
  }

  .nickname-check-wrapper {
    width: 100%;
    display: flex;
  }
`;

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [isStudent, setIsStudent] = useState<boolean>(true);
  const [teacherId, setTeacherId] = useState<string>('');
  const [certFile, setCertFile] = useState<File | null>(null);
  const [pw, setPw] = useState<string>('');
  const [pwConfirm, setPwConfirm] = useState<string>('');
  const navigate = useNavigate();

  const { data, error, isValidating, executePost } = usePostData(
    `auth/register/${isStudent ? 'student' : 'teacher'}/`,
    isStudent
      ? {
          email: email,
          username: name,
          is_student: isStudent,
          teacher_id: teacherId,
          password: pw,
          password_confirm: pwConfirm,
          phone_number: '',
        }
      : {
          email: email,
          username: name,
          is_student: isStudent,
          certification: certFile,
          password: pw,
          password_confirm: pwConfirm,
          phone_number: '000',
        },
    isStudent
      ? { 'Content-Type': 'application/json' }
      : { 'Content-Type': 'multipart/form-data' }
  );

  const onEmailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onNameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const onIsStudentChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsStudent(!isStudent);
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

  const onCertFileChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setCertFile(file);
    }
  };

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(certFile);
    await executePost();

    if (data) {
      console.log(data);
      if (data.message === 'User created successfully') {
        alert('회원가입이 완료되었습니다.');
        navigate('/register-confirm');
      }
    }
  };

  useEffect(() => {
    console.log('useEffect', data);
  }, [data]);

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
        <div className="nickname-wrapper">
          <label htmlFor="register_name_textfield">닉네임</label>
          <div className="nickname-check-wrapper">
            <input
              id="register_name_textfield"
              type="text"
              value={name}
              onChange={onNameChangeHandler}
            />
            <button>중복확인</button>
          </div>
        </div>
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
        {isStudent ? (
          <div>
            <label htmlFor="register_teacher_id_textfield">선생님 아이디</label>
            <input
              id="register_teacher_id_textfield"
              type="text"
              value={teacherId}
              onChange={onTeacherIdChangeHandler}
            />
          </div>
        ) : (
          <div>
            <label htmlFor="register_teacher_cert">자격증 업로드</label>
            <input
              id="register_teacher_cert"
              type="file"
              accept="image/*"
              onChange={onCertFileChangeHandler}
            />
          </div>
        )}
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
        <input type="submit" value="회원가입" />
      </form>
    </ContainerStyle>
  );
};

export default RegisterForm;
