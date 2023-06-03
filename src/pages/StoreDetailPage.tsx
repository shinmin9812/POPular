import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Store } from '../types/store';
import Title from '../components/StoreDetail/Title';
import DetailInfo from '../components/StoreDetail/DetailInfo';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const StoreDetailPage = () => {
  const [store, setStore] = useState<Store | undefined>(undefined);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await fetch('/store/id/321323');
    const result: Store = await response.json();

    if (!result) {
      throw new Error('no result');
    }

    setStore(result);
  }

  return (
    <Container>
      <Title store={store}></Title>
      <DetailInfo store={store}></DetailInfo>
    </Container>
  );
};

export default StoreDetailPage;
