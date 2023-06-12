import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import AdminNavigation from './AdminNavigation';

const Container = styled.div`
  --header-height: 80px;
  --GNA-height: 80px;

  // Colors
  --color-main: #652cc1;
  --color-sub: #a37edc;

  --color-white: #ffffff;
  --color-black: #111111;
  --color-light-black: #7d7d7d;
  --color-gray: #bfbfbf;
  --color-light-gray: #e7e7e7;
  --color-red: #ef3737;

  // 게시판 구분 컬러
  --color-tomato: #cd554d;
  --color-green: #38b135;

  // Font size
  --font-large: 30px;
  --font-medium: 20px;
  --font-regular: 16px;
  --font-small: 14px;
  --font-micro: 10px;

  // Font weight
  --weight-bold: 900;
  --weight-semi-bold: 700;
  --weight-regular: 500;
  --weight-light: 300;

  // Size
  --border-radius-button: 8px;
  --border-radius-input: 4px;

  width: fit-content;
  background-color: #fcf6ff;
`;

const OutletWrapper = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  width: fit-content;
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
