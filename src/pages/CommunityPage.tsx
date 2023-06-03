import styled from 'styled-components';
import { Post } from '../types/post';
import { useEffect } from 'react';

import SearchContainerWrap from '../components/common/SearchInput/SearchInput';
import WriteButton from '../components/Community/components/WriteButton';
import TabsContainer from '../components/Community/containers/TabsContainer';
import FilterContainer from '../components/Community/containers/FilterContainer';
import FilterInfoContainer from '../components/Community/containers/FilterInfoContainer';
import PostListItem from '../components/Community/components/PostList';
import PaginationContainer from '../components/Community/containers/PaginationContainer';

const Container = styled.div`
  width: 100%;
`;

const CommunityPage = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7];

  return (
    <Container>
      <TabsContainer />
      <div>
        <SearchContainerWrap placeholder="제목을 검색해주세요" />
        <FilterContainer />
        <WriteButton />
        <FilterInfoContainer />
      </div>
      <ul>
        {arr.map((i) => (
          <PostListItem key={i} postTitle="안녕하세요" storeName="어짜라고" postInfo="이준석" />
        ))}
      </ul>
      <PaginationContainer />
    </Container>
  );
};

export default CommunityPage;
