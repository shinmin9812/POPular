import styled from 'styled-components';
import FormField from './FormField';

const onSubmitHandler = () => {
  console.log('회원가입');
};

const SignupForm = () => {
  return (
    <FormContainer onSubmit={onSubmitHandler}>
      <FormField label={'이름'} type={'name'}></FormField>
      <FormField label={'이메일'} type={'email'}></FormField>
      <FormField label={'비밀번호'} type={'password'}></FormField>
      <FormField label={'비밀번호 확인'} type={'password'}></FormField>
      <FormField label={'전화번호'} type={'number'}></FormField>
      <WarningMessage>이메일 형식이 올바르지 않습니다.</WarningMessage>
      <Button>가입하기</Button>
    </FormContainer>
  );
};

export default SignupForm;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
`;

const WarningMessage = styled.p`
  font-size: var(--font-small);
  color: var(--color-red);
  padding-top: 10px;
`;

const Button = styled.button`
  width: 270px;
  height: 40px;
  color: var(--color-white);
  background-color: var(--color-main);
  border-radius: var(--border-radius-button);
  margin: 10px 0;
  cursor: pointer;
`;
