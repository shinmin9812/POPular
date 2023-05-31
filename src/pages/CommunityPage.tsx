import styled from 'styled-components';
import { Post } from '../types/post';
import { useEffect } from 'react';

import SearchContainerWrap from '../components/common/Search';
import WriteButton from '../components/Community/Write';
import TabsContainer from '../components/Community/containers/TabsContainer';
import FilterContainer from '../components/Community/containers/FilterContainer';

const Container = styled.div`
  width: 100%;
  height: 1000px;
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
  return (
    <Container>
      <TabsContainer />
      <div>
        <SearchContainerWrap placeholder="제목을 검색해주세요" />
        <FilterContainer />
        <WriteButton />
      </div>
    </Container>
  );
};

export default CommunityPage;
