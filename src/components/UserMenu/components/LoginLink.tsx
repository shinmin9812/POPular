import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { CLIENT_PATH } from '../../../constants/path';
import NotificationIcon from '../../common/Icons/NotificationIcon';

const LoginLink = () => {
  return (
    <LinkContainer>
      <Link to="/">
        <img src="/public/defaultProfile.svg" alt="profile" width={40} />
        <p>로그인 하러 가기</p>
      </Link>
      <Link to={CLIENT_PATH.USER_NOTIFICATIONS} style={{ display: 'flex', alignItems: 'center' }}>
        <NotificationIcon />
      </Link>
    </LinkContainer>
  );
};

export default LoginLink;

const LinkContainer = styled.div`
  width: 350px;
  padding: 4px 12px 16px 8px;
  border-bottom: 1px solid var(--color-gray);
  display: flex;
  justify-content: space-between;

  & > a {
    display: flex;
  }

  & p {
    font-size: var(--font-medium);
    font-weight: var(--weight-light);
    display: flex;
    align-items: center;
    padding: 0 8px;
  }
`;
