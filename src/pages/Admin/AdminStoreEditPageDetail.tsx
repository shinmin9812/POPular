import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import StoreForm from '../../components/Admin/components/Forms/StoreForm';
import { useGetStoreById } from '../../api/storeApi';

const Container = styled.div`
  .title {
    margin-bottom: 20px;

    font-size: 24px;
    font-weight: 700;
  }
`;

const AdminStoreEditPageDetail = () => {
  const { storeId } = useParams();
  const { data } = useGetStoreById(storeId!, { cacheTime: 0 });

  return <Container>{data ? <StoreForm defaultData={data} /> : <div>Loading</div>}</Container>;
};

export default AdminStoreEditPageDetail;
