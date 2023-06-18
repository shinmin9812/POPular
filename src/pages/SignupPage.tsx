import styled from 'styled-components';
import SignupForm from '../components/Signup/components/SignupForm';
import MetaTag from '../components/SEO/MetaTag';

const SignupPage = () => {
  return (
    <Container>
      <MetaTag title={`POPULAR | 회원가입`} />
      <Intro>
        <IntroImg src="images/PopularIntro.png" />
      </Intro>
      <SignupContainer>
        <PageTitle>회원가입</PageTitle>
        <SignupForm></SignupForm>
      </SignupContainer>
    </Container>
  );
};

export default SignupPage;

const Container = styled.div`
  height: calc(100vh - 200px);
  display: flex;
  justify-content: space-around;
  height: 100%;
`;

const Intro = styled.section`
  display: none;

  @media (min-width: 850px) {
    display: block;
    height: 800px;
    border-radius: 10px;
    padding: 20px;
    width: 60%;
  }
`;

const IntroImg = styled.img`
  width: 100%;
  border-radius: 15px;

  @media screen and (min-width: 850px) {
    flex: 1;
  }
`;

const SignupContainer = styled.div`
  height: 700px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media screen and (min-width: 768px) {
    padding-bottom: 50px;
    flex: 1;
    padding: 0 20px;
  }
`;

const PageTitle = styled.h1`
  text-align: center;
  font-size: 24px;
  font-weight: var(--weight-regular);
  color: var(--color-main);
  padding-bottom: 20px;
`;
