import { useEffect, useState } from 'react';
import styled from 'styled-components';
import AccodionList from '../../common/Accordion/AccodionList';
import { CLIENT_PATH } from '../../../constants/path';
import { useLocation } from 'react-router-dom';
import AdminCard from './AdminCard';

const Container = styled.div`
  position: fixed;
  top: 2.5vh;
  left: 2.5vh;

  width: 300px;
  height: fit-content;

  padding: 20px 20px 40px 20px;

  font-family: 'Noto Sans KR', sans-serif;

  background-color: #8241d0;
  background-image: linear-gradient(43deg, #d42d62 0%, #c850c0 30%, #d15ee0 100%);

  border-radius: 20px;
  box-shadow: 0px 0px 22px -6px rgba(0, 0, 0, 0.4);

  z-index: 9999;

  .home {
    position: absolute;
    right: 20px;
    bottom: 20px;

    a {
      font-weight: 500;
      opacity: 0.6;
      color: #fff;
      transition: all 0.3s;
    }

    &:hover {
      a {
        opacity: 1;
      }
    }
  }
`;

const Accodions = [
  {
    title: '팝업 스토어 관리',
    list: [
      {
        name: '스토어 통계',
        path: CLIENT_PATH.ADMIN_STORE.STATISTICS,
      },
      {
        name: '스토어 추가',
        path: CLIENT_PATH.ADMIN_STORE.ADD,
      },
      {
        name: '스토어 수정',
        path: CLIENT_PATH.ADMIN_STORE.EDIT,
      },
      {
        name: '스토어 삭제',
        path: CLIENT_PATH.ADMIN_STORE.DELETE,
      },
    ],
  },
  {
    title: '유저 관리',
    list: [
      {
        name: '유저 통계',
        path: CLIENT_PATH.ADMIN_USER.STATISTICS,
      },
      {
        name: '유저 삭제',
        path: CLIENT_PATH.ADMIN_USER.DELETE,
      },
    ],
  },
  {
    title: '피드 관리',
    list: [
      {
        name: '피드 통계',
        path: CLIENT_PATH.ADMIN_FEED.STATISTICS,
      },
      {
        name: '피드 삭제',
        path: CLIENT_PATH.ADMIN_FEED.DELETE,
      },
    ],
  },
  {
    title: '알림 관리',
    list: [
      {
        name: '알림 보내기',
        path: CLIENT_PATH.ADMIN_NOTIFICATION.SEND,
      },
    ],
  },
];

const MenuMap = new Map<string, string>([
  ['dashboard', '대시보드'],
  ['store', '팝업 스토어 관리'],
  ['user', '유저 관리'],
  ['feed', '피드 관리'],
  ['notification', '알림 관리'],
]);

const AdminNavigation = () => {
  const { pathname } = useLocation();
  const [selectedMenu, setSelectedMenu] = useState<string>('');

  useEffect(() => {
    const currentMenu = pathname.split('/')[2];
    if (!currentMenu) return setSelectedMenu('대시보드');
    setSelectedMenu(MenuMap.get(currentMenu) as string);
  }, []);

  return (
    <Container>
      <AdminCard />
      <nav>
        <AccodionList selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} Accodions={Accodions} />
      </nav>

      <div className="home">
        <a href="/">사이트로 이동</a>
      </div>
    </Container>
  );
};

export default AdminNavigation;
