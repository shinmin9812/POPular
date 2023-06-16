import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { CLIENT_PATH } from '../../../constants/path';

const LoginLink = () => {
  return (
    <LinkContainer>
      <Link to={CLIENT_PATH.LOGIN}>
        <img src="defaultProfile.svg" alt="profile" width={40} />
        <p>로그인 하러 가기</p>
      </Link>
    </LinkContainer>
  );
};

export default LoginLink;

const LinkContainer = styled.div`
  width: 300px;
  padding: 4px 12px 16px 8px;
  border-bottom: 1px solid var(--color-gray);
  display: flex;
  justify-content: center;
  margin-right: 10px;

  & > a {
    display: flex;
  }

  & p {
    font-weight: var(--weight-light);
    font-size: var(--font-medium);
    display: flex;
    align-items: center;
    padding: 0 8px;
  }
`;
