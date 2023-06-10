import styled from 'styled-components';
import { User } from '../types/user';
import { useEffect, useState } from 'react';
import ProfileImageModify from '../components/UserUpdate/components/ProfileImageModify';
import { SpaceLine } from '../components/UserUpdate/components/Line';
import ProfileUpdateForm from '../components/UserUpdate/components/ProfileUpdateForm';
import ProfileUpdatePasswordForm from '../components/UserUpdate/components/ProfileUpdatePasswordForm';
import { useParams } from 'react-router-dom';
import MetaTag from '../components/SEO/MetaTag';

const UserUpdatePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const { userId } = useParams();
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await fetch(`http://34.22.81.36:3000/users/${userId}`);
    const result: User = await response.json();
    setUser(result);
  }
  return (
    <Container>
      <MetaTag title={`POPular | 프로필 수정`} />
      {user ? (
        <>
          <ProfileImageModify user={user}></ProfileImageModify>
          <SpaceLine />
          <ProfileUpdateForm user={user} />
          <SpaceLine />
          <ProfileUpdatePasswordForm user={user} />
        </>
      ) : (
        <div>로그인</div>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding-top: 20px;
`;

export default UserUpdatePage;
