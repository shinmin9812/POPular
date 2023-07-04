import styled from 'styled-components';
import SearchInputContainer from '../components/Community/containers/SearchInputContainer';

import TabsContainer from '../components/Community/containers/TabsContainer';
import FilterContainer from '../components/Community/containers/FilterContainer';
import WriteButton from '../components/Community/components/WriteButton';
import FilterInfoContainer from '../components/Community/containers/FilterInfoContainer';
import PostListItemContainer from '../components/Community/containers/PostListContainer';
import PaginationContainer from '../components/Community/containers/PaginationContainer';
import FilterAndWriteButtonWrapContainer from '../components/Community/containers/FilterAndWriteWrapContainer';
import MetaTag from '../components/SEO/MetaTag';
const Container = styled.div`
  width: 100%;
  height: 1200px;
`;
const CommunityPage = () => {
  return (
    <Container>
      <MetaTag title={`POPULAR | 커뮤니티`} />
      <TabsContainer />
      <div>
        <SearchInputContainer />
        <FilterAndWriteButtonWrapContainer>
          <FilterContainer />
          <WriteButton />
        </FilterAndWriteButtonWrapContainer>
        <FilterInfoContainer />
      </div>
      <PostListItemContainer />
      <PaginationContainer />
    </Container>
  );
};

export default CommunityPage;
