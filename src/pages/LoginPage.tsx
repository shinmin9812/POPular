import styled from 'styled-components';
import LoginForm from '../components/Login/components/LoginForm';
import SignupLink from '../components/Login/components/SignupLink';

const LoginPage = () => {
  return (
    <>
      <PageTitle>로그인</PageTitle>
      <Container>
        <LoginForm />
        <SignupLink />
      </Container>
    </>
  );
};

export default LoginPage;

const PageTitle = styled.h1`
  text-align: center;
  font-size: 24px;
  font-weight: var(--weight-regular);
  color: var(--color-main);
  padding: 20px 0;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 170px;
`;
