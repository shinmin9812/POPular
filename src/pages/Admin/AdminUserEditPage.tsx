import styled from 'styled-components';
import Card from '../../components/common/Card/Card';
import { Outlet } from 'react-router-dom';
import { useGetAllUsers } from '../../api/userApi';
import AdminUserList from '../../components/Admin/components/Users/AdminUserList';

const Container = styled.div`
  display: flex;
  gap: 30px;

  .title {
    margin-bottom: 20px;

    font-size: 24px;
    font-weight: 700;
  }

  .edit-user {
    display: flex;
    flex-direction: column;

    width: 500px;

    opacity: 1;

    ::-webkit-scrollbar {
      padding: 10px 0;
    }
  }

  .edit-user-form {
    display: flex;
    width: 500px;
  }
`;

const AdminUserEditPage = () => {
  const { data: allUsers } = useGetAllUsers();

  return (
    <Container>
      <Card className="edit-user">
        <p className="title">유저 수정</p>
        {allUsers && <AdminUserList users={allUsers} />}
      </Card>
      <div className="edit-user-form">
        <Outlet />
      </div>
    </Container>
  );
};

export default AdminUserEditPage;
