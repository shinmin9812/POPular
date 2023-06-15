import styled from 'styled-components';
import TabsContainer from '../components/WritePost/containers/TabsContainer';
import PostTitleContainer from '../components/WritePost/containers/PostTitleContainer';
import PostContentContainer from '../components/WritePost/containers/PostContentContainer';
import RatingContainer from '../components/WritePost/containers/RatingContainer';
import ChoiceStoreBoxContainer from '../components/WritePost/containers/ChoiceStoreBoxContainer';
import PostRegisterButtonContainer from '../components/WritePost/containers/PostRegisterButtonContainer';
import SelectedStoreItem from '../components/WritePost/components/SelectedStoreItem';
import { useAppSelector } from '../Hooks/useSelectorHooks';
import MetaTag from '../components/SEO/MetaTag';

const Container = styled.div`
  width: 100%;
`;

const FlexDiv = styled.div`
  display: flex;
`;
const RatingAndRegisterWrap = styled.div`
  display: flex;
  width: fit-content;
  margin-left: auto;
  margin-top: 20px;
  justify-content: flex-end;
  gap: 20px;
  width: 100%;
`;

const WritePostPage = () => {
  const selectedStoreId = useAppSelector((state) => state.WritePostSlice.choiceStoreId);
  const tab = useAppSelector((state) => state.WritePostSlice.tab);

  return (
    <Container>
      <MetaTag title="POPULAR | 글쓰기" />
      <TabsContainer />
      <PostTitleContainer />
      <PostContentContainer />
      {tab !== '자유게시판' && (
        <FlexDiv>
          <ChoiceStoreBoxContainer />
          {selectedStoreId && <SelectedStoreItem storeId={selectedStoreId} />}
        </FlexDiv>
      )}
      <RatingAndRegisterWrap>
        <RatingContainer />
        <PostRegisterButtonContainer />
      </RatingAndRegisterWrap>
    </Container>
  );
};

export default WritePostPage;
