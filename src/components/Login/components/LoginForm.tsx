import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { API_PATH } from '../../../constants/path';

const LoginForm = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const checkValid = () => {
    if (!email) {
      setErrorMessage('이메일을 입력해주세요.');
    } else if (!password) {
      setErrorMessage('비밀번호를 입력해주세요.');
    } else {
      setErrorMessage('');
    }
  };

  const emailInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const passwordInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const onSubmitHandler = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    checkValid();

    if (email && password) {
      fetch(API_PATH.USER.POST.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            setErrorMessage('이메일 또는 비밀번호가 일치하지 않습니다.');
            throw new Error('로그인에 실패했습니다.');
          }
        })
        .then((data) => {
          localStorage.setItem('token', data.token);
          navigate('/');
        })
        .catch((err) => console.log(err.message));
    }
  };

  return (
    <Form onSubmit={onSubmitHandler}>
      <FieldContainer>
        <label>이메일</label>
        <input type="email" value={email} onChange={emailInputHandler} />
      </FieldContainer>
      <FieldContainer>
        <label>비밀번호</label>
        <input type="password" value={password} onChange={passwordInputHandler} />
      </FieldContainer>
      <WarningMessage>{errorMessage}</WarningMessage>
      <LoginButton type="submit">로그인</LoginButton>
    </Form>
  );
};

export default LoginForm;

const Form = styled.form`
  flex-direction: column;
  align-items: center;
  display: flex;
`;

const FieldContainer = styled.div`
  display: flex;
  width: 300px;
  justify-content: space-between;
  padding: 10px 0;

  label {
    justify-content: center;
    display: flex;
    align-items: center;
    width: 70px;
  }

  input {
    width: 200px;
    height: 30px;
    padding: 8px;
    margin: 0;
    box-sizing: border-box;
    border: 1px solid var(--color-sub);
    border-radius: var(--border-radius-input);
    font-size: var(--font-small);
    color: var(--color-black);
  }
`;

const WarningMessage = styled.p`
  font-size: var(--font-small);
  color: var(--color-red);
  padding-top: 10px;
`;

const LoginButton = styled.button`
  width: 300px;
  height: 40px;
  color: var(--color-white);
  background-color: var(--color-main);
  border-radius: var(--border-radius-button);
  margin: 10px 0;
  cursor: pointer;
`;
