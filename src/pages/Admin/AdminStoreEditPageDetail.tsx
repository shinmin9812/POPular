import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import StoreForm from '../../components/Admin/components/Forms/StoreForm';
import { useGetStoreById } from '../../api/storeApi';
import Button from '../../components/common/Button/Button';

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

  return <Container>{data ? <StoreForm defaultData={data} /> : <></>}</Container>;
};

export default AdminStoreEditPageDetail;
