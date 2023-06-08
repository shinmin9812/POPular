import { useState } from 'react';
import styled from 'styled-components';
import AccodionList from '../common/Accordion/AccodionList';
import { CLIENT_PATH } from '../../constants/path';

const Container = styled.div`
  position: fixed;
  top: 2.5vh;
  left: 2.5vh;

  width: 300px;
  height: 95vh;

  padding: 20px;

  font-family: 'Noto Sans KR', sans-serif;

  background-color: #8241d0;
  background-image: linear-gradient(43deg, #d42d62 0%, #c850c0 30%, #e096ef 100%);

  border-radius: 20px;
  box-shadow: 0px 0px 22px -6px rgba(0, 0, 0, 0.4);
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
        name: '유저 추가',
        path: CLIENT_PATH.ADMIN_USER.ADD,
      },
      {
        name: '유저 수정',
        path: CLIENT_PATH.ADMIN_USER.EDIT,
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
        name: '피드 수정',
        path: CLIENT_PATH.ADMIN_FEED.EDIT,
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
      {
        name: '림 수정',
        path: CLIENT_PATH.ADMIN_NOTIFICATION.EDIT,
      },
    ],
  },
];

const AdminNavigation = () => {
  const [selectedMenu, setSelectedMenu] = useState<string>('');

  return (
    <Container>
      <nav>
        <AccodionList selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} Accodions={Accodions} />
      </nav>
    </Container>
  );
};

export default AdminNavigation;
