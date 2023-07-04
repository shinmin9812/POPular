import styled from 'styled-components';
import Card from '../../components/common/Card/Card';
import { useGetAllStores } from '../../api/storeApi';
import AdminStoreList from '../../components/Admin/components/Stores/AdminStoreList';
import { Outlet } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  gap: 30px;

  .title {
    margin-bottom: 20px;

    font-size: 24px;
    font-weight: 700;
  }

  .edit-store {
    display: flex;
    flex-direction: column;

    width: 500px;

    opacity: 1;

    ::-webkit-scrollbar {
      padding: 10px 0;
    }
  }

  .edit-store-form {
    display: flex;
  }
`;

const AdminStoreEditPage = () => {
  const { data: allStores } = useGetAllStores();

  return (
    <Container>
      <Card className="edit-store">
        <p className="title">스토어 수정</p>
        {allStores && <AdminStoreList stores={allStores} />}
      </Card>
      <div className="edit-store-form">
        <Outlet />
      </div>
    </Container>
  );
};

export default AdminStoreEditPage;
