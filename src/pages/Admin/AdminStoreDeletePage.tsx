import styled from 'styled-components';
import Card from '../../components/common/Card/Card';
import { useDeleteStore, useGetAllStores } from '../../api/storeApi';
import AdminStoreList from '../../components/Admin/components/Stores/AdminStoreList';
import { useState } from 'react';
import AdminStoreItem from '../../components/Admin/components/Stores/AdminStoreItem';
import { Store } from '../../types/store';
import Button from '../../components/common/Button/Button';

const Container = styled.div`
  display: flex;
  gap: 30px;
  margin-left: 500px;

  .title {
    margin-bottom: 20px;

    font-size: 24px;
    font-weight: 700;
  }

  .delete-store {
    width: 500px;
    position: fixed;
    top: 30px;
    left: 360px;

    height: calc(100vh - 60px);

    overflow-y: scroll;

    z-index: 100;

    ::-webkit-scrollbar {
      padding: 10px 0;
    }
  }

  .selected-store {
    position: relative;
    width: 500px;
    left: 40px;
    padding-bottom: 60px;

    button {
      position: absolute;
      bottom: 10px;
      right: 10px;
    }
  }
`;

const AdminStoreDeletePage = () => {
  const { data: allStores } = useGetAllStores();
  const [selectedId, setSelectedId] = useState<string[]>([]);

  const { mutate, isLoading, isSuccess } = useDeleteStore(selectedId[0], {
    onSuccess: () => {
      setSelectedId([]);
      console.log();
    },
  });

  let filteredStores: Store[] = [];

  if (allStores) {
    filteredStores = allStores!.filter((store) => selectedId.includes(store._id));
  }

  const deleteHandler = () => {
    mutate();
  };

  return (
    <Container>
      <Card className="delete-store">
        <p className="title">스토어 삭제</p>
        {allStores && (
          <AdminStoreList selectMode={true} setSelectedId={setSelectedId} selectedId={selectedId} stores={allStores} />
        )}
      </Card>
      {isSuccess && <Card className="selected-store">스토어 삭제에 성공하였습니다!</Card>}
      {selectedId.length > 0 && !isSuccess && (
        <Card className="selected-store">
          <p className="title">선택된 목록</p>
          {filteredStores!.map((store) => (
            <AdminStoreItem store={store} />
          ))}
          <Button onClick={deleteHandler}>스토어 삭제하기</Button>
        </Card>
      )}
    </Container>
  );
};

export default AdminStoreDeletePage;
