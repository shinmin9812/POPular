import styled from 'styled-components';
import SignupForm from '../components/Signup/components/SignupForm';
import MetaTag from '../components/SEO/MetaTag';

const SignupPage = () => {
  return (
    <Container>
      <MetaTag title={`POPular | 회원가입`} />
      <PageTitle>회원가입</PageTitle>
      <SignupForm></SignupForm>
    </Container>
  );
};

export default SignupPage;

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
  padding-bottom: 20px;
`;
