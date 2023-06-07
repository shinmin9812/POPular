import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { CLIENT_PATH } from '../../../constants/path';
import UserProfile from './UserProfile';
import MenuItem from './MenuItem';
import Logo from '../../common/Icons/DummyLogo';
import { useEffect, useState } from 'react';

const MemberMenu = () => {
  const [profileImage, setProfileImage] = useState('');
  const [nickname, setNickname] = useState('');
  const [userId, setUserId] = useState('');

  const navigate = useNavigate();
  const handleLogout = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    localStorage.removeItem('token');
    alert('다음에 또 만나요!');
    navigate('/');
  };

  const getUserInfo = async () => {
    try {
      const response = await fetch('http://34.22.81.36:3000/auth/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      setProfileImage('/defaultProfile.svg');
      setNickname(data.nickname);
      setUserId(data._id);
      return data;
    } catch (err: any) {
      const errorMessage = err as Error;
      console.log(errorMessage);
      return null;
    }
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
      const errorMessage = err as Error;
      console.log(errorMessage);
    }
  };

  const handleDeleteUser = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const result = confirm('정말 탈퇴하시겠습니까?');
    const userId = await (await getUserInfo())._id;
    if (result) {
      fetchDeleteUser(userId);
      alert('탈퇴가 완료되었습니다.');
      localStorage.removeItem('token');
      navigate('/');
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
      <UserProfile profileImage={profileImage} nickname={nickname} userId={userId} />
      <MenuList>
        <MenuItem link={`/user/${userId}`} title="내 프로필 보기" />
        <MenuItem link={CLIENT_PATH.USER_RECENT} title="최근 본 스토어" />
        <MenuItem link={CLIENT_PATH.USER_SCRAP} title="위시리스트" />
        <MenuItem link={CLIENT_PATH.USER_POSTS} title="내가 쓴 글" />
        <MenuItem link={CLIENT_PATH.USER_COMMENTS} title="내가 쓴 댓글" />
        <MenuItem link="/user/12341231/update" title="회원정보 수정" />
        <div className="logout" onClick={handleLogout}>
          로그아웃
        </div>
        <div onClick={handleDeleteUser}>회원탈퇴</div>
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
