import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import AdminNavigation from './AdminNavigation';

const Container = styled.div``;

const OutletWrapper = styled.div`
  min-height: 100vh;
  width: calc(100vw - 300px);
  margin-left: 300px;
  background-color: #f0f0f0;
`;

const AdminLayout = () => {
  return (
    <Container>
      <AdminNavigation />
      <OutletWrapper>
        <Outlet />
      </OutletWrapper>
    </Container>
  );
};

export default AdminLayout;
