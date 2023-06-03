import styled from 'styled-components';
import TabsContainer from '../components/WritePost/containers/TabsContainer';
import TitleInput from '../components/WritePost/components/PostTitle';
import PostContentContainer from '../components/WritePost/containers/PostContentContainer';
import SearchContainerWrap from '../components/common/SearchInput/SearchInput';
import FilterContainer from '../components/WritePost/containers/FilterContainer';
import RatingContainer from '../components/WritePost/containers/RatingContainer';

const Container = styled.div`
  width: 100%;
  height: 1000px;
`;

const WritePostPage = () => {
  return (
    <Container>
      <TabsContainer />
      <TitleInput />
      <PostContentContainer />
      <SearchContainerWrap placeholder={'스토어를 검색해주세요.'} />
      <FilterContainer />
      <RatingContainer />
    </Container>
  );
};

export default WritePostPage;
