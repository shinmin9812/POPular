import styled from 'styled-components';
import LoginForm from '../components/Login/components/LoginForm';
import SignupLink from '../components/Login/components/SignupLink';
import MetaTag from '../components/SEO/MetaTag';

const LoginPage = () => {
  return (
    <Container>
      <MetaTag title="POPULAR" url="www.popular.com" />
      <Intro>모든 트렌드가 모이는 곳 팝업스토어!</Intro>
      <LoginContainer>
        <PageTitle>로그인</PageTitle>
        <LoginForm />
        <SignupLink />
      </LoginContainer>
    </Container>
  );
};

export default LoginPage;

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  height: 100%;
`;

const Intro = styled.section`
  display: none;
  @media (min-width: 768px) {
    display: block;
    background: linear-gradient(to bottom right, var(--color-main), var(--color-white));
    color: var(--color-white);
    flex-grow: 1.5;
    height: 800px;
    border-radius: 10px;
    padding: 20px;
  }
`;

const LoginContainer = styled.div`
  height: 700px;
  display: flex;
  flex-direction: column;
  margin-top: 170px;
  @media (min-width: 768px) {
    flex-grow: 1;
  }
`;

const PageTitle = styled.h1`
  text-align: center;
  font-size: 24px;
  font-weight: var(--weight-regular);
  color: var(--color-main);
  padding-bottom: 60px;
`;
