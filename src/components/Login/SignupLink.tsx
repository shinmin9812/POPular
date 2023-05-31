import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SignupLink = () => {
  return (
    <Container>
      <SignupMessage>아직 회원이 아니신가요?</SignupMessage>
      <SignupButton to={'/signup'}>회원가입</SignupButton>
    </Container>
  );
};

export default SignupLink;

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 0;
`;

const SignupMessage = styled.p`
  color: var(--color-black);
  font-size: var(--font-small);
`;

const SignupButton = styled(Link)`
  color: var(--color-main);
  background-color: var(--color-white);
  font-size: var(--font-small);
  padding: 0 10px;
  text-decoration: underline;
`;
