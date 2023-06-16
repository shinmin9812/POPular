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
import AlertModal from '../../components/common/Modals/AlertModal';

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

  .selected-stores {
    position: relative;
    width: 500px;
    left: 40px;
    padding-bottom: 60px;

    .selected-store {
      transition: all 0.3s;
    }

    .selected-store:hover {
      cursor: pointer;
      transform: translateY(-6px);
      box-shadow: 0px 6px 22px -6px rgba(0, 0, 0, 0.3);
    }

    .selected-store a {
      pointer-events: none;
    }

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
  const { data: allStores } = useGetAllStores();
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

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <Container>
      <Card className="delete-store">
        <p className="title">스토어 삭제</p>
        {allStores && allStores.length > 0 && (
          <AdminStoreList setSelectedId={setSelectedId} selectedId={selectedId} stores={allStores} selectMode={true} />
        )}
      </Card>
      {selectedId.length > 0 && !isSuccess && (
        <Card className="selected-stores">
          <p className="title">선택된 목록</p>
          {allStores!.map((store) => {
            if (selectedId.includes(store._id)) {
              return (
                <div
                  className="selected-store"
                  key={store._id}
                  onClick={() => {
                    setSelectedId((prev) => prev.filter((id) => id !== store._id));
                  }}
                >
                  <AdminStoreItem key={store._id} store={store} />
                </div>
              );
            }
          })}
          <Button onClick={deleteHandler}>스토어 삭제하기</Button>
        </Card>
      )}
      {isSuccess && isModalOpen && (
        <AlertModal onClose={setIsModalOpen} content="스토어가 삭제되었습니다!"></AlertModal>
      )}
    </Container>
  );
};

export default AdminStoreDeletePage;
