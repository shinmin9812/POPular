import styled from 'styled-components';
import { User } from '../types/user';
import { useEffect, useState } from 'react';
import Profile from '../components/User/components/Profile';
import Line from '../components/User/components/Line';
import ProfilePostList from '../components/User/containers/ProfilePostList';
import Filter from '../components/User/containers/Filter';

const Container = styled.div`
  width: 100%;
  height: 1000px;
  background-color: transparent;
`;

const customOptions = [
  { value: 'newest', name: '최신순' },
  { value: 'oldest', name: '오래된 순' },
];

const UserPage = () => {
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
      <Profile user={user} />
      <Line />
      <Filter options={customOptions} />
      <ProfilePostList />
    </Container>
  );
};

export default UserPage;
