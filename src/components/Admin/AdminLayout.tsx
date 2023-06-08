import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import AdminNavigation from './AdminNavigation';

const Container = styled.div``;

const OutletWrapper = styled.div`
  min-height: 100vh;
  width: 100vw;
  padding: 30px 30px 30px 360px;
  background-color: #fcf6ff;
  font-family: 'Noto Sans KR', sans-serif;
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
