import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { CLIENT_PATH } from '../../../constants/path';
import UserProfile from './UserProfile';
import MenuItem from './MenuItem';
import Logo from '../../common/Icons/DummyLogo';

const MemberMenu = () => {
  const navigate = useNavigate();
  const handleLogout = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    localStorage.removeItem('token');
    alert('Bye!');
    navigate('/');
  };
  return (
    <>
      <UserProfile />
      <MenuList>
        <MenuItem link="/user/12341231" title="내 프로필 보기" />
        <MenuItem link={CLIENT_PATH.USER_RECENT} title="최근 본 스토어" />
        <MenuItem link={CLIENT_PATH.USER_SCRAP} title="위시리스트" />
        <MenuItem link={CLIENT_PATH.USER_POSTS} title="내가 쓴 글" />
        <MenuItem link={CLIENT_PATH.USER_COMMENTS} title="내가 쓴 댓글" />
        <MenuItem link="/user/12341231/update" title="회원정보 수정" />
        <div className="logout" onClick={handleLogout}>
          로그아웃
        </div>
        <div>회원탈퇴</div>
      </MenuList>
      <LogoContainer>
        <Logo color="#bfbfbf" />
      </LogoContainer>
    </>
  );
};

export default MemberMenu;

const MenuList = styled.div`
  width: 300px;
  margin: 40px 20px;
  a,
  div {
    display: block;
    width: 300px;
    font-size: var(--font-regular);
    border-bottom: 0.5px solid var(--color-gray);
    padding: 20px;
    margin: 0;
    cursor: pointer;

    :hover {
      color: var(--color-main);
    }
  }

  .logout {
    border-top: 1px solid gray;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
