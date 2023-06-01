import styled from 'styled-components';
import FormField from './FormField';

const onSubmitHandler = () => {
  console.log('로그인!');
};

const LoginForm = () => {
  return (
    <Form onSubmit={onSubmitHandler}>
      <FormField type={'email'} />
      <FormField type={'password'} />
      <WarningMessage>이메일 형식이 올바르지 않습니다.</WarningMessage>
      {/* <WarningMessage>이메일 또는 비밀번호가 일치하지 않습니다.</WarningMessage> */}
      <LoginButton type="submit">로그인</LoginButton>
    </Form>
  );
};

const Form = styled.form`
  flex-direction: column;
  align-items: center;
  display: flex;
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

export default LoginForm;
