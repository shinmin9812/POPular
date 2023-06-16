import styled from 'styled-components';
import LoginForm from '../components/Login/components/LoginForm';
import SignupLink from '../components/Login/components/SignupLink';
import MetaTag from '../components/SEO/MetaTag';

const LoginPage = () => {
  return (
    <Container>
      <MetaTag title="POPULAR" url="www.popular.com" />
      <Intro>
        <IntroImg src="images/PopularIntro.png" />
      </Intro>
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
    border-radius: 10px;
    padding: 20px;
    flex: 1;
  }
`;

const IntroImg = styled.img`
  width: 100%;
  border-radius: 15px;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 170px;

  @media screen and (min-width: 768px) {
    margin-top: 0;
    width: 100%;
    flex: 1;
  }
`;

const PageTitle = styled.h1`
  text-align: center;
  font-size: 24px;
  font-weight: var(--weight-regular);
  color: var(--color-main);
  padding-bottom: 60px;
`;
