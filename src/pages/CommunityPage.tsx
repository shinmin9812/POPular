import styled from 'styled-components';

import SearchContainerWrap from '../components/common/SearchInput/SearchInput';
import WriteButton from '../components/Community/components/WriteButton';
import TabsContainer from '../components/Community/containers/TabsContainer';
import FilterContainer from '../components/Community/containers/FilterContainer';
import FilterInfoContainer from '../components/Community/containers/FilterInfoContainer';
import PostListItemContainer from '../components/Community/containers/PostListContainer';
import PaginationContainer from '../components/Community/containers/PaginationContainer';

const Container = styled.div`
  width: 100%;
`;
const CommunityPage = () => {
  return (
    <Container>
      <TabsContainer />
      <div>
        <SearchContainerWrap placeholder="제목을 검색해주세요" />
        <FilterContainer />
        <WriteButton />
        <FilterInfoContainer />
      </div>
      <PostListItemContainer />
      <PaginationContainer />
    </Container>
  );
};

export default CommunityPage;
