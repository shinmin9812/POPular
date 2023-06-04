import styled from 'styled-components';
import { useGetReviewPostByStoreQuery } from '../../../api/useQueries';
import { useParams } from 'react-router-dom';
import ReviewList from '../components/ReviewList';
import { useState } from 'react';

const Container = styled.section`
  width: 100%;
`;

const StoreReview = () => {
  const { storeId } = useParams();
  const [page, setPage] = useState<number>(1);
  const { currentData: posts, isFetching } = useGetReviewPostByStoreQuery({ storeId: storeId });
  return (
    <Container>
      <ReviewList posts={posts} isFetching={isFetching} />
    </Container>
  );
};

export default StoreReview;
