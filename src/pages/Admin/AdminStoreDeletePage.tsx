import styled from 'styled-components';
import Card from '../../components/common/Card/Card';
import { useDeleteStore, useGetAllStores } from '../../api/storeApi';
import AdminStoreList from '../../components/Admin/components/Stores/AdminStoreList';
import { useState } from 'react';
import AdminStoreItem from '../../components/Admin/components/Stores/AdminStoreItem';
import Button from '../../components/common/Button/Button';
import { useQueryClient } from '@tanstack/react-query';
import { Category } from '../../types/category';
import Modal from '../../components/common/Modal/Modal';

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

export interface FilterSettingValues {
  searchType: string;
  searchValue: string;
  categories: Category[];
  location: string;
  isEnded: boolean;
}

const AdminStoreDeletePage = () => {
  const queryClient = useQueryClient();
  const { data: allStores, isFetched, refetch } = useGetAllStores();
  const [selectedId, setSelectedId] = useState<string[]>([]);

  const { mutate, isSuccess } = useDeleteStore(selectedId, {
    onSuccess: () => {
      setSelectedId([]);
      setIsModalOpen(true);
      queryClient.refetchQueries(['allStores']);
    },
  });

  function deleteHandler() {
    mutate();
  }

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Container>
      <Card className="delete-store">
        <p className="title">스토어 삭제</p>
        {allStores && allStores.length > 0 && (
          <AdminStoreList setSelectedId={setSelectedId} selectedId={selectedId} stores={allStores} selectMode={true} />
        )}
      </Card>
      {selectedId.length > 0 && !isSuccess && (
        <Card className="selected-store">
          <p className="title">선택된 목록</p>
          {allStores!.map((store) => {
            if (selectedId.includes(store._id)) {
              return <AdminStoreItem key={store._id} store={store} />;
            }
          })}
          <Button onClick={deleteHandler}>스토어 삭제하기</Button>
        </Card>
      )}
      {isSuccess && isModalOpen && <Modal onClose={() => setIsModalOpen(false)}>스토어가 삭제되었습니다!</Modal>}
    </Container>
  );
};

export default AdminStoreDeletePage;
