import styled from 'styled-components';
import { User } from '../types/user';
import { useEffect, useState } from 'react';
import ProfileImageModify from '../components/UserUpdate/components/ProfileImageModify';
import { SpaceLine } from '../components/UserUpdate/components/Line';
import ProfileUpdateForm from '../components/UserUpdate/components/ProfileUpdateForm';

const UserUpdatePage = () => {
  const [user, setUser] = useState<User[]>([]);
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await fetch('/user/all');
    const result: User[] = await response.json();

    setUser(result);
  }
  return (
    <Container>
      <ProfileImageModify user={user}></ProfileImageModify>
      <SpaceLine />
      <ProfileUpdateForm />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding-top: 20px;
`;

export default UserUpdatePage;
