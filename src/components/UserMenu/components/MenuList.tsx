import styled from 'styled-components';
import MenuItem from './MenuItem';
import { CLIENT_PATH } from '../../../constants/path';
import { useNavigate } from 'react-router-dom';

const MenuList = ({ userId }: { userId: string }) => {
  const navigate = useNavigate();
  const handleLogout = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    localStorage.removeItem('token');
    alert('다음에 또 만나요!');
    navigate('/');
  };

  const fetchDeleteUser = (userId: string) => {
    try {
      fetch(`http://34.22.81.36:3000/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
    } catch (err: any) {
      throw new Error(err);
    }
  };

  const handleDeleteUser = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const result = confirm('정말 탈퇴하시겠습니까?');
    if (result) {
      fetchDeleteUser(userId);
      alert('탈퇴가 완료되었습니다.');
      localStorage.removeItem('token');
      navigate('/');
    }
  };

  return (
    <MenuListContainer>
      <MenuItem link={`/user/${userId}`} title="내 프로필 보기" />
      <MenuItem link={CLIENT_PATH.USER_RECENT} title="최근 본 스토어" />
      <MenuItem link={CLIENT_PATH.USER_SCRAP} title="위시리스트" />
      <MenuItem link={CLIENT_PATH.USER_POSTS} title="내가 쓴 글" />
      <MenuItem link={CLIENT_PATH.USER_COMMENTS} title="내가 쓴 댓글" />
      <MenuItem link={`/user/${userId}/update`} title="회원정보 수정" />
      <div className="logout" onClick={handleLogout}>
        로그아웃
      </div>
      <div onClick={handleDeleteUser}>회원탈퇴</div>
    </MenuListContainer>
  );
};

export default MenuList;

const MenuListContainer = styled.div`
  width: 350px;
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

  .logout {
    border-top: 1px solid gray;
  }
`;
