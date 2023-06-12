import styled from 'styled-components';
import { CLIENT_PATH } from '../../../constants/path';
import LoginLink from './LoginLink';
import MenuItem from './MenuItem';
import Logo from '../../common/Icons/DummyLogo';
import { Link } from 'react-router-dom';

const NonMemberMenu = () => {
  return (
    <>
      <LoginLink />
      <MenuList>
        <MenuItem link={CLIENT_PATH.USER_RECENT} title="최근 본 스토어" />
        <MenuItem link={CLIENT_PATH.USER_SCRAP} title="위시리스트" />
        <MenuItem link={CLIENT_PATH.USER_POSTS} title="내가 쓴 글" />
        <MenuItem link={CLIENT_PATH.USER_COMMENTS} title="내가 쓴 댓글" />
        <Link className="signup" to="/signup">
          회원가입
        </Link>
      </MenuList>
      <LogoContainer>
        <Logo color="#bfbfbf" />
      </LogoContainer>
    </>
  );
};

export default NonMemberMenu;

const MenuList = styled.div`
  width: 300px;
  margin: 40px 20px;
  a,
  div {
    display: block;
    width: 350px;
    height: 65px;
    font-size: var(--font-medium);
    border-bottom: 0.5px solid var(--color-gray);
    padding: 20px;
    margin: 0;
    cursor: pointer;

    :hover {
      transition: all 0.1s ease;
      color: var(--color-main);
      font-size: calc(var(--font-medium) + 2px);
    }
  }

  .signup {
    border-top: 1px solid gray;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 100px;
`;
