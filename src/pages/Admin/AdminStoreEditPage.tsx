import styled from 'styled-components';
import Card from '../../components/common/Card/Card';
import StoreForm from '../../components/Admin/components/Forms/StoreForm';
import { useGetAllStores } from '../../api/storeApi';
import AdminStoreList from '../../components/Admin/components/Stores/AdminStoreList';
import StoreList from '../../components/common/Store/StoreList';
import { useState } from 'react';

const Container = styled.div`
  display: flex;
  gap: 30px;

  .title {
    margin-bottom: 20px;

    font-size: 24px;
    font-weight: 700;
  }

  .edit-store {
    width: 500px;
    position: fixed;
    left: 360px;

    height: calc(100vh - 60px);

    overflow-y: scroll;
  }

  .edit-store-form {
    width: 600px;
    margin-left: 530px;
  }
`;

const AdminStoreEditPage = () => {
  const { data: allStores } = useGetAllStores();

  const [openForm, setOpenForm] = useState<boolean>(false);

  return (
    <Container>
      <Card className="edit-store">
        <p className="title">스토어 수정</p>
        {allStores && <StoreList stores={allStores} />}
      </Card>
      <Card className="edit-store-form">
        <p className="title">스토어 수정</p>
        <StoreForm />
      </Card>
    </Container>
  );
};

export default AdminStoreEditPage;
