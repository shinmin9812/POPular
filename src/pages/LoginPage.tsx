import styled from 'styled-components';
import LoginForm from '../components/Login/components/LoginForm';
import SignupLink from '../components/Login/components/SignupLink';
import MetaTag from '../components/SEO/MetaTag';

const LoginPage = () => {
  return (
    <Container>
      <MetaTag title={`POPular | 로그인`} />
      <PageTitle>로그인</PageTitle>
      <div>
        <LoginForm />
        <SignupLink />
      </div>
    </Container>
  );
};

export default LoginPage;

const Container = styled.div`
  height: calc(100vh - 200px);
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const PageTitle = styled.h1`
  text-align: center;
  font-size: 24px;
  font-weight: var(--weight-regular);
  color: var(--color-main);
  padding-bottom: 60px;
`;
