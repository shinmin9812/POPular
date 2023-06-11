import styled from 'styled-components';
import UserProfile from './UserProfile';
import MenuList from './MenuList';
import Logo from '../../common/Icons/DummyLogo';
import { useEffect, useState } from 'react';

const MemberMenu = () => {
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

  return (
    <>
      <UserProfile profileImage={profileImage} nickname={nickname} userId={userId} />
      <MenuList userId={userId} />
      <LogoContainer>
        <Logo color="#bfbfbf" />
      </LogoContainer>
    </>
  );
};

export default MemberMenu;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
