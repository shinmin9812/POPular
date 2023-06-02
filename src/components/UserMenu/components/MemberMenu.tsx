import styled from 'styled-components';
import { CLIENT_PATH } from '../../../constants/path';
import UserProfile from './UserProfile';
import MenuItem from './MenuItem';
import Logo from '../../common/Icons/DummyLogo';

const MemberMenu = () => {
  return (
    <>
      <UserProfile />
      <MenuContainer>
        <MenuItem link="/user/12341231" title="내 프로필 보기" />
        <MenuItem link={CLIENT_PATH.USER_RECENT} title="최근 본 스토어" />
        <MenuItem link={CLIENT_PATH.USER_SCRAP} title="위시리스트" />
        <MenuItem link={CLIENT_PATH.USER_POSTS} title="내가 쓴 글" />
        <MenuItem link={CLIENT_PATH.USER_COMMENTS} title="내가 쓴 댓글" />
        <MenuItem link="/user/12341231/update" title="회원정보 수정" />
        <MenuItem link="withdraw" title="회원탈퇴" />
      </MenuContainer>
      <Logo style={{ textAlign: 'center', width: '100%' }} color="#bfbfbf" />
    </>
  );
};

export default MemberMenu;

const MenuContainer = styled.div`
  width: 300px;
  margin: 40px 20px;
`;
