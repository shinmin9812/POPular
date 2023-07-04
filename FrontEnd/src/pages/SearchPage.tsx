import styled from 'styled-components';
import FilterContainer from '../components/Search/containers/FilterContainer';
import FilterInfoContainer from '../components/Search/containers/FilterInfoContainer';
import SearchStoreListContainer from '../components/Search/containers/SearchStoreListContainer';
import MetaTag from '../components/SEO/MetaTag';
import SearchInputContainer from '../components/Search/containers/SearchInputContainer';

const Container = styled.div`
  width: 100%;
`;

const SearchPage = () => {
  return (
    <Container>
      <MetaTag title={`POPULAR | 검색`} />
      <SearchInputContainer />
      <FilterContainer />
      <FilterInfoContainer />
      <SearchStoreListContainer />
    </Container>
  );
};

export default SearchPage;
