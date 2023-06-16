import styled from 'styled-components';
import Card from '../../components/common/Card/Card';
import { useDeleteUsers, useGetAllUsers } from '../../api/userApi';
import { useState } from 'react';
import Button from '../../components/common/Button/Button';
import { useQueryClient } from '@tanstack/react-query';
import AlertModal from '../../components/common/Modals/AlertModal';
import AdminUserList from '../../components/Admin/components/Users/AdminUserList';
import AdminUserItem from '../../components/Admin/components/Users/AdminUserItem';

const Container = styled.div`
  display: flex;
  gap: 30px;
  margin-left: 500px;

  .title {
    margin-bottom: 20px;

    font-size: 24px;
    font-weight: 700;
  }

  .delete-user {
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

  .selected-users {
    position: relative;
    width: 500px;
    left: 40px;
    padding-bottom: 60px;

    .selected-user {
      transition: all 0.3s;
    }

    .selected-user:hover {
      cursor: pointer;
      transform: translateY(-6px);
      box-shadow: 0px 6px 22px -6px rgba(0, 0, 0, 0.3);
    }

    .selected-user a {
      pointer-events: none;
    }

    button {
      position: absolute;
      bottom: 10px;
      right: 10px;
    }
  }
`;

const AdminUserDeletePage = () => {
  const queryClient = useQueryClient();
  const { data: allUsers } = useGetAllUsers();
  const [selectedId, setSelectedId] = useState<string[]>([]);

  const { mutate, isSuccess } = useDeleteUsers(selectedId, {
    onSuccess: () => {
      setSelectedId([]);
      setIsModalOpen(true);
      queryClient.refetchQueries(['allUsers']);
    },
  });

  function deleteHandler() {
    mutate();
  }

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <Container>
      <Card className="delete-user">
        <p className="title">유저 삭제</p>
        {allUsers && allUsers.length > 0 && (
          <AdminUserList setSelectedId={setSelectedId} selectedId={selectedId} users={allUsers} selectMode={true} />
        )}
      </Card>
      {selectedId.length > 0 && (
        <Card className="selected-users">
          <p className="title">선택된 목록</p>
          {allUsers!.map((user) => {
            if (selectedId.includes(user._id)) {
              return (
                <div
                  className="selected-user"
                  key={user._id}
                  onClick={() => {
                    setSelectedId((prev) => prev.filter((id) => id !== user._id));
                  }}
                >
                  <AdminUserItem key={user._id} user={user} />
                </div>
              );
            }
          })}
          <Button onClick={deleteHandler}>유저 삭제하기</Button>
        </Card>
      )}
      {isSuccess && isModalOpen && <AlertModal onClose={setIsModalOpen} content="유저가 삭제되었습니다!"></AlertModal>}
    </Container>
  );
};

export default AdminUserDeletePage;
