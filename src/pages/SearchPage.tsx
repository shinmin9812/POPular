import { SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Store } from '../types/store';
import SearchInput from '../components/common/SearchInput/SearchInput';
import SearchFilter from '../components/common/SearchInput/SearchFilter';
import FilterContainer from '../components/Search/containers/FilterContainer';
import FilterInfoContainer from '../components/Search/containers/FilterInfoContainer';
import SearchStoreListContainer from '../components/Search/containers/SearchStoreListContainer';
import MetaTag from '../components/SEO/MetaTag';

const Container = styled.div`
  width: 100%;
`;

const SearchPage = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (e: { target: { value: SetStateAction<string> } }) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyPress = (e: { code: string }) => {
    if (e.code === 'Enter' || searchValue) {
      setSearchValue(inputValue);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const res = await fetch('http://34.22.81.36:3000/stores');
    const result: Store[] = await res.json();
    setStores(result);
  }

  return (
    <Container>
      <MetaTag title={`POPULAR | 검색`} />
      <SearchInput
        placeholder="제목을 입력하세요."
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleInputKeyPress}
      />
      <FilterContainer />
      <FilterInfoContainer />
      <SearchStoreListContainer />
    </Container>
  );
};

export default SearchPage;
