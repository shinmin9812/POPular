import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Store } from '../types/store';
import SearchInput from '../components/common/SearchInput/SearchInput';
import StoreList from '../components/common/Store/StoreList';
import FilterContainer from '../components/Community/containers/FilterContainer';

const Container = styled.div`
  width: 100%;
`;

const SearchPage = () => {
  const [stores, setStores] = useState<Store[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const res = await fetch('http://34.22.81.36:3000/stores');
    const result: Store[] = await res.json();

    setStores(result);
  }

  console.log(stores);

  return (
    <Container>
      <SearchInput placeholder="제목을 입력하세요." />
      <FilterContainer />
      <StoreList stores={stores} />
    </Container>
  );
};

export default SearchPage;
