import styled from 'styled-components';
import SignupForm from '../components/Signup/components/SignupForm';

const SignupPage = () => {
  return (
    <>
      <PageTitle>회원가입</PageTitle>
      <SignupForm></SignupForm>
    </>
  );
};

export default SignupPage;

const PageTitle = styled.h1`
  text-align: center;
  font-size: 24px;
  font-weight: var(--weight-regular);
  color: var(--color-main);
  padding: 20px 0;
`;
