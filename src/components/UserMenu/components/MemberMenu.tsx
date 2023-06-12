import styled from 'styled-components';
import UserProfile from './UserProfile';
import MenuList from './MenuList';
import Logo from '../../common/Icons/DummyLogo';
import { useEffect, useState } from 'react';
import MenuItem from './MenuItem';
import { useNavigate } from 'react-router-dom';

const MemberMenu = () => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState('');
  const [nickname, setNickname] = useState('');
  const [userId, setUserId] = useState('');

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
      setProfileImage(data.profile);
      setNickname(data.nickname);
      setUserId(data._id);
      return data;
    } catch (err: any) {
      throw new Error(err);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

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
    <Container>
      <UserProfile profileImage={profileImage} nickname={nickname} userId={userId} />
      <MenuItem link={`/community/user/${userId}`} title="내 프로필 보기" />
      <MenuItem link={`/user/${userId}/update`} title="회원정보 수정" />
      <MenuList userId={userId} />
      <div className="deleteUser" onClick={handleDeleteUser}>
        회원탈퇴
      </div>

      <LogoContainer>
        <Logo color="#bfbfbf" />
      </LogoContainer>
    </Container>
  );
};

export default MemberMenu;

const Container = styled.div`
  & > a {
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
  margin: 20px 0;
  .deleteUser {
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
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
`;
