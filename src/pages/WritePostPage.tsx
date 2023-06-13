import styled from 'styled-components';
import TabsContainer from '../components/WritePost/containers/TabsContainer';
import PostTitleContainer from '../components/WritePost/containers/PostTitleContainer';
import PostContentContainer from '../components/WritePost/containers/PostContentContainer';
import RatingContainer from '../components/WritePost/containers/RatingContainer';
import ChoiceStoreBoxContainer from '../components/WritePost/containers/ChoiceStoreBoxContainer';
import PostRegisterButtonContainer from '../components/WritePost/containers/PostRegisterButtonContainer';
import MetaTag from '../components/SEO/MetaTag';
const Container = styled.div`
  width: 100%;
  position: relative;
`;

const WritePostPage = () => {
  return (
    <Container>
      <MetaTag title="POPULAR | 글쓰기" />
      <TabsContainer />
      <PostTitleContainer />
      <PostContentContainer />
      <ChoiceStoreBoxContainer />
      <RatingContainer />
      <PostRegisterButtonContainer />
    </Container>
  );
};

export default WritePostPage;
