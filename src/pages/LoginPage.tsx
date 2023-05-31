import styled from 'styled-components';
import FormArea from '../components/Login/LoginForm';
import SignupLink from '../components/Login/SignupLink';

// state에 따라 WarningMessage 출력 or null
const LoginPage = () => {
  return (
    <Container>
      <FormArea />
      <SignupLink />
    </Container>
  );
};

export default LoginPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 250px;
`;
