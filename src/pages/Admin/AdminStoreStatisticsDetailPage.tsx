import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useGetStoreById } from '../../api/storeApi';
import StoreTitle from '../../components/StoreDetail/container/StoreTitle';
import StoreInfo from '../../components/StoreDetail/container/StoreInfo';

const Container = styled.div`
  width: 100%;

  .title {
    margin-bottom: 20px;

    font-size: 24px;
    font-weight: 700;
  }
`;

const AdminStoreStatisticsDetailPage = () => {
  const { storeId } = useParams();
  const { data } = useGetStoreById(storeId!, { cacheTime: 0 });
  return (
    <>
      {data ? (
        <Container>
          <StoreTitle store={data} />
          <StoreInfo store={data} />
        </Container>
      ) : (
        <></>
      )}
    </>
  );
};

export default AdminStoreStatisticsDetailPage;
