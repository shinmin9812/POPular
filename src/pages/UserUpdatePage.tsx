import styled from 'styled-components';
import { User } from '../types/user';
import { useEffect, useState } from 'react';
import ProfileImageModify from '../components/UserUpdate/components/ProfileImageModify';
import { SpaceLine } from '../components/UserUpdate/components/Line';
import ProfileUpdateForm from '../components/UserUpdate/components/ProfileUpdateForm';
import ProfileUpdatePasswordForm from '../components/UserUpdate/components/ProfileUpdatePasswordForm';

const UserUpdatePage = () => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await fetch('http://34.22.81.36:3000/users/6479cd31b0b0d8f69ffcfc55');
    const result: User = await response.json();

    setUser(result);
  }

  return (
    <Container>
      {user ? (
        <>
          <ProfileImageModify user={user}></ProfileImageModify>
          <SpaceLine />
          <ProfileUpdateForm user={user} />
          <SpaceLine />
          <ProfileUpdatePasswordForm />
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
