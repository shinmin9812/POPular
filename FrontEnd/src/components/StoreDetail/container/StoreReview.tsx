import styled from 'styled-components';
import { useGetStoreReviewFeeds } from '../../../api/feedApi';
import ReviewList from '../components/ReviewList';

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
  const { data: posts, isFetching } = useGetStoreReviewFeeds(storeId);

  return (
    <Container>
      <div className="review-list">
        <ReviewList posts={posts} isFetching={isFetching} />
      </div>
    </Container>
  );
};

export default StoreReview;
