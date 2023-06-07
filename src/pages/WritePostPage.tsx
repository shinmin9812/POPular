import styled from 'styled-components';
import TabsContainer from '../components/WritePost/containers/TabsContainer';
import TitleInput from '../components/WritePost/components/PostTitle';
import PostContentContainer from '../components/WritePost/containers/PostContentContainer';
import RatingContainer from '../components/WritePost/containers/RatingContainer';
import ChoiceStoreBoxContainer from '../components/WritePost/containers/ChoiceStoreBoxContainer';
import PostRegisterButtonContainer from '../components/WritePost/containers/PostRegisterButtonContainer';
const Container = styled.div`
  width: 100%;
  position: relative;
`;

const WritePostPage = () => {
  return (
    <Container>
      <TabsContainer />
      <TitleInput />
      <PostContentContainer />
      <ChoiceStoreBoxContainer />
      <RatingContainer />
      <PostRegisterButtonContainer />
    </Container>
  );
};

export default WritePostPage;
