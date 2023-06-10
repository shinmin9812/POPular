import styled from 'styled-components';
import Card from '../../components/common/Card/Card';
import { useGetAllStores } from '../../api/storeApi';
import AdminStoreList from '../../components/Admin/components/Stores/AdminStoreList';
import { useState } from 'react';

const Container = styled.div`
  display: flex;
  gap: 30px;

  .title {
    margin-bottom: 20px;

    font-size: 24px;
    font-weight: 700;
  }

  .delete-store {
    width: 600px;
    position: fixed;
    top: 30px;
    left: 360px;

    height: calc(100vh - 60px);

    overflow-y: scroll;

    ::-webkit-scrollbar {
      padding: 10px 0;
    }
  }
`;

const AdminStoreDeletePage = () => {
  const { data: allStores } = useGetAllStores();
  const [selectedId, setSelectedId] = useState<string[]>([]);

  return (
    <Container>
      <Card className="delete-store">
        <p className="title">스토어 삭제</p>
        {allStores && (
          <AdminStoreList selectMode={true} setSelectedId={setSelectedId} selectedId={selectedId} stores={allStores} />
        )}
      </Card>
    </Container>
  );
};

export default AdminStoreDeletePage;
