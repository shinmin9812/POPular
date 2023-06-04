import styled from 'styled-components';
import { useGetReviewPostByStoreQuery } from '../../../api/useQueries';
import { useParams } from 'react-router-dom';
import ReviewList from '../components/ReviewList';

const Container = styled.section`
  width: 100%;
  min-height: 1000px;
`;

const StoreReview = () => {
  const { storeId } = useParams();
  const { currentData: posts, isFetching } = useGetReviewPostByStoreQuery({ storeId: storeId });
  return (
    <Container>
      <ReviewList posts={posts} isFetching={isFetching} />
    </Container>
  );
};

export default StoreReview;
