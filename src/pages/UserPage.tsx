import styled from 'styled-components';
import { User } from '../types/user';
import { useEffect } from 'react';

const Container = styled.div`
  width: 100%;
  height: 1000px;
  background-color: #d39494;
`;

const UserPage = () => {
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
  }
  return <Container></Container>;
};

export default UserPage;
