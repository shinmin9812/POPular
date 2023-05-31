import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import Header from './Header/Header';
import GlovalNavigation from './GNA/GlovalNavigation';

const Wrapper = styled.div`
  // Common components area data
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

  position: relative;
  min-height: 100vh;
`;

const OutletWrapper = styled.div`
  min-height: 100vh;

  // 데스크탑
  @media all and (min-width: 1024px) {
    width: 1024px;
    padding: calc(var(--header-height) + 20px) 0 calc(var(--GNA-height) + 20px) 0;
    margin: 0 auto;
  }

  // 테블릿
  @media all and (min-width: 768px) and (max-width: 1023px) {
    padding: calc(var(--header-height) + 20px) 20px calc(var(--GNA-height) + 20px) 20px;
  }

  // 모바일
  @media all and (max-width: 767px) {
    padding: calc(var(--header-height) + 20px) 20px calc(var(--GNA-height) + 20px) 20px;
  }
`;

const Layout = () => {
  return (
    <Wrapper>
      <Header />
      <OutletWrapper>
        <Outlet />
      </OutletWrapper>
      <GlovalNavigation />
    </Wrapper>
  );
};

export default Layout;
