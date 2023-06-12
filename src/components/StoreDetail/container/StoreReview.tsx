import styled from 'styled-components';
import { useGetReviewPostByStoreQuery } from '../../../api/useQueries';
import { useParams } from 'react-router-dom';
import ReviewList from '../components/ReviewList';
import { useGetAllReviewFeeds } from '../../../api/storeApi';

const Container = styled.section`
  width: 100%;

  .review-list {
    max-width: 500px;
    margin: 0 auto;
  }
`;

interface Props {
  storeId: string;
}

const StoreReview = ({ storeId }: Props) => {
  const { data: posts, isFetching } = useGetAllReviewFeeds();

  return (
    <Container>
      <div className="review-list">
        <ReviewList posts={posts!} isFetching={isFetching} />
      </div>
    </Container>
  );
};

export default StoreReview;
