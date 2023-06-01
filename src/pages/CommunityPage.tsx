import styled from 'styled-components';
import { Post } from '../types/post';
import { useEffect } from 'react';

import SearchContainerWrap from '../components/common/Search';
import WriteButton from '../components/Community/components/Write';
import TabsContainer from '../components/Community/containers/TabsContainer';
import FilterContainer from '../components/Community/containers/FilterContainer';
import FilterInfoContainer from '../components/Community/containers/FilterInfoContainer';
import PostListItem from '../components/Community/components/PostList';
import PaginationContainer from '../components/Community/containers/PaginationContainer';

const Container = styled.div`
  width: 100%;
`;

const CommunityPage = () => {
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await fetch('/post/all');
    const result: Post[] = await response.json();

    const response2 = await fetch(`/post/board/free`);
    const result2: Post = await response2.json();

    console.log(result);
    console.log(result2);
  }

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
