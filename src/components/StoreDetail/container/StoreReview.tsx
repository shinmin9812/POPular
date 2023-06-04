import styled from 'styled-components';
import { useGetReviewPostByStoreQuery } from '../../../api/useQueries';
import { useParams } from 'react-router-dom';

const Container = styled.section`
  width: 100%;
  min-height: 1000px;
`;

const StoreReview = () => {
  const { storeId } = useParams();
  const { data: posts, isFetching } = useGetReviewPostByStoreQuery({ storeId: storeId });
  console.log(posts);
  return <Container></Container>;
};

export default StoreReview;
