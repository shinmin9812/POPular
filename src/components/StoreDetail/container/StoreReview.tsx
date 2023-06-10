import styled from 'styled-components';
import { useGetReviewPostByStoreQuery } from '../../../api/useQueries';
import { useParams } from 'react-router-dom';
import ReviewList from '../components/ReviewList';

const Container = styled.section`
  width: 100%;

  .review-list {
    max-width: 500px;
    margin: 0 auto;
  }
`;

const StoreReview = () => {
  const { storeId } = useParams();
  const { currentData: posts, isFetching } = useGetReviewPostByStoreQuery({ storeId: storeId });
  return (
    <Container>
      <div className="review-list">
        <ReviewList posts={posts} isFetching={isFetching} />
      </div>
    </Container>
  );
};

export default StoreReview;
