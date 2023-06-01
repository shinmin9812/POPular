import styled from 'styled-components';
import { User } from '../types/user';
import { useEffect, useState } from 'react';
import Profile from '../components/User/components/Profile';
import Line from '../components/User/components/Line';

const Container = styled.div`
  width: 100%;
  height: 1000px;
  background-color: transparent;
`;

const ProfilePage = () => {
  const [user, setUser] = useState<User[]>([]);
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await fetch('/user/all');
    const result: User[] = await response.json();

    const response2 = await fetch(`/user/id/321323`);
    const result2: User = await response2.json();

    console.log(result);
    console.log(result2);

    setUser(result);
  }
  return (
    <Container>
      <Profile user={user} />
      <Line />
    </Container>
  );
};

export default ProfilePage;
