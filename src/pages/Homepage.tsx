import { useEffect } from 'react';
import styled from 'styled-components';
import { Store } from '../types/store';

const Container = styled.div`
  width: 100%;
  height: 1000px;
  background-color: #c6c6c6;
`;

const HomePage = () => {
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await fetch('/store/all');
    const result: Store[] = await response.json();

    const response2 = await fetch('/store/recomended');
    const result2: Store = await response2.json();

    console.log(result);
    console.log(result2);
  }

  return <Container></Container>;
};

export default HomePage;
