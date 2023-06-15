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
    </>
  );
};

export default NonMemberMenu;

const MenuList = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  a,
  div {
    display: flex;
    align-items: center;
    width: 300px;
    height: 65px;
    font-size: var(--font-medium);
    border-bottom: 0.5px solid var(--color-gray);
    padding-left: 90px;
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
