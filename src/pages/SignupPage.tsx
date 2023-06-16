import styled from 'styled-components';
import SignupForm from '../components/Signup/components/SignupForm';
import MetaTag from '../components/SEO/MetaTag';

const SignupPage = () => {
  return (
    <Container>
      <MetaTag title={`POPULAR | 회원가입`} />
      <Intro></Intro>
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
  @media (min-width: 768px) {
    display: block;
    background: linear-gradient(to bottom right, var(--color-main), var(--color-white));
    color: var(--color-white);
    height: 800px;
    border-radius: 10px;
    padding: 20px;
    width: 60%;
  }
`;

const SignupContainer = styled.div`
  height: 700px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 50px;
  @media screen and (min-width: 768px) {
    flex: 1;
    padding: 0 20px;
    margin-top: 60px;
  }
`;

const PageTitle = styled.h1`
  text-align: center;
  font-size: 24px;
  font-weight: var(--weight-regular);
  color: var(--color-main);
  padding-bottom: 20px;
`;
