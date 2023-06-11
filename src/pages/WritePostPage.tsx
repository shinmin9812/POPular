import styled from 'styled-components';
import TabsContainer from '../components/WritePost/containers/TabsContainer';
import PostTitleContainer from '../components/WritePost/containers/PostTitleContainer';
import PostContentContainer from '../components/WritePost/containers/PostContentContainer';
import RatingContainer from '../components/WritePost/containers/RatingContainer';
import ChoiceStoreBoxContainer from '../components/WritePost/containers/ChoiceStoreBoxContainer';
import PostRegisterButtonContainer from '../components/WritePost/containers/PostRegisterButtonContainer';
import { useState } from 'react';
import { BoardTypes } from '../types/board';
import SelectedStoreItem from '../components/WritePost/components/SelectedStoreItem';
import { useAppSelector } from '../Hooks/useSelectorHooks';
const Container = styled.div`
  width: 100%;
  position: relative;

  .store-box {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
  }
`;

const WritePostPage = () => {
  const [postedBoard, setPostedBoard] = useState<Omit<BoardTypes, 'all'>>(BoardTypes.free);
  const selectedStoreId = useAppSelector((state) => state.WritePostSlice.choiceStoreId);

  return (
    <Container>
      <TabsContainer setPostedBoard={setPostedBoard} />
      <PostTitleContainer />
      <PostContentContainer />
      <div className="store-box">
        <ChoiceStoreBoxContainer />
        {selectedStoreId && <SelectedStoreItem storeId={selectedStoreId} />}
      </div>
    </Container>
  );
};

export default WritePostPage;
