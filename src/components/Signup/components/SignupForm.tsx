import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
// import FormField from './FormField';
import autoHyphen from '../../../utils/autoHyphen';

const SignupForm = () => {
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [nicknameCheckMessage, setNicknameCheckMessage] = useState('');

  const handleNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    // 닉네임 중복 확인 fetch
    // 중복 시 setNicknameCheckMessage('다른 유저가 사용 중인 닉네임입니다.');
    // 중복X && 2글자 이상 이면 setNicknameCheckMessage('사용 가능한 닉네임입니다.');
    setNicknameCheckMessage('다른 유저가 사용 중인 닉네임입니다.');
  };

  return (
    <FormContainer>
      {/* <FormField label={'이름'} name={'name'} type={'text'}></FormField> */}
      <FieldContainer>
        <Label htmlFor="name">이름</Label>
        <Input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        />
      </FieldContainer>

      <FieldContainer>
        <NicknameLabel>
          <Label htmlFor="nickname">닉네임</Label>
          <NicknameCheckMessage>{nicknameCheckMessage}</NicknameCheckMessage>
        </NicknameLabel>
        <NicknameInput>
          <Input type="text" name="nickname" id="nickname" value={nickname} onChange={handleNickname} />
        </NicknameInput>
      </FieldContainer>

      {/* <FormField label={'이메일'} name={'email'} type={'email'}></FormField> */}
      <FieldContainer>
        <Label htmlFor="email">이메일</Label>
        <Input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(autoHyphen(e.target.value))}
        />
      </FieldContainer>

      {/* <FormField label={'비밀번호'} name={'password'} type={'password'}></FormField> */}
      <FieldContainer>
        <Label htmlFor="password">비밀번호</Label>
        <Input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        />
      </FieldContainer>

      {/* <FormField label={'비밀번호 확인'} name={'passwordConfirm'} type={'password'}></FormField> */}
      <FieldContainer>
        <Label htmlFor="passwordConfirm">비밀번호 확인</Label>
        <Input
          type="password"
          name="passwordConfirm"
          id="passwordConfirm"
          value={passwordConfirm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPasswordConfirm(e.target.value)}
        />
      </FieldContainer>

      {/* <FormField label={'전화번호'} name={'phoneNumber'} type={'text'}></FormField> */}
      <FieldContainer>
        <Label htmlFor="phoneNumber">전화번호</Label>
        <Input
          type="text"
          name="phoneNumber"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhoneNumber(autoHyphen(e.target.value))}
        />
      </FieldContainer>

      <CheckboxContainer>
        <Input type="checkbox" name="allowNotification" id="allowNotification" />
        <Label htmlFor="allowNotification">팔로우∙댓글∙팝업스토어 알림 허용</Label>
      </CheckboxContainer>

      <WarningMessage>이메일 형식이 올바르지 않습니다.</WarningMessage>
      <SignupButton type="submit">가입하기</SignupButton>
    </FormContainer>
  );
};

export default SignupForm;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const NicknameLabel = styled.div`
  width: 270px;
  display: flex;
  justify-content: space-between;
`;

const Label = styled.label`
  font-size: var(--font-small);
  padding-left: 8px;
  margin: 8px 0;
`;

const NicknameCheckMessage = styled.p`
  font-size: var(--font-micro);
  margin-right: 4px;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
`;

const NicknameInput = styled.div`
  width: 270px;
  display: flex;
  justify-content: space-between;

  & button {
    width: 80px;
    height: 30px;
    font-size: 12px;
    color: var(--color-white);
    background-color: var(--color-main);
    border-radius: var(--border-radius-button);
  }
`;

const Input = styled.input`
  width: 270px;
  height: 30px;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid var(--color-sub);
  border-radius: var(--border-radius-input);
  font-size: var(--font-small);
  color: var(--color-black);
`;

const CheckboxContainer = styled.div`
  width: 270px;
  font-size: var(--font-small);
  display: flex;
  margin-bottom: 20px;

  & input {
    accent-color: var(--color-main);
    width: 16px;
    height: 16px;
    margin: 8px 0;
  }
`;

const WarningMessage = styled.p`
  font-size: var(--font-small);
  color: var(--color-red);
  padding-top: 10px;
`;

const SignupButton = styled.button`
  width: 270px;
  height: 40px;
  color: var(--color-white);
  background-color: var(--color-main);
  border-radius: var(--border-radius-button);
  margin: 10px 0;
  cursor: pointer;
`;
