import { useEffect } from 'react';
import styled from 'styled-components';
import { Store } from '../types/store';

const Container = styled.div`
  width: 100%;
  height: 1000px;
  background-color: #214265;
`;

const MapPage = () => {
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await fetch('/store');
    const result: Store[] = await response.json();

    const response2 = await fetch(`/store/321323`);
    const result2: Store = await response2.json();

    const response3 = await fetch(`/store/213`);
    const result3 = await response3.json();

    console.log(result);
    console.log(result2);
    console.log(result3);
  }

  return <Container></Container>;
};

export default MapPage;
