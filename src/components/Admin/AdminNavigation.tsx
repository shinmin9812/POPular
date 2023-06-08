import { useState } from 'react';
import styled from 'styled-components';
import StoreIconMini from '../common/Icons/StoreIconMini';
import AccodionList from '../common/Accordion/AccodionList';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  width: 300px;
  height: 100vh;

  padding: 20px 0;

  font-family: 'Noto Sans KR', sans-serif;

  background-color: #ffffff;
  box-shadow: 0px 0px 22px -6px rgba(0, 0, 0, 0.2);
  /* transition: all 1s; */

  .management-item {
    h2 {
      display: flex;
      align-items: center;
      width: 100%;

      padding: 14px;

      border-radius: 10px;

      font-size: 16px;
      font-weight: 400;
      color: #242424;

      /* transition: background-color 0.3s; */

      &:hover {
        cursor: pointer;
      }
    }

    .accordion {
      height: 0;
      overflow: hidden;
      font-size: 16px;
      gap: 14px;
    }

    &.on {
      h2 {
        background-color: #fcf6ff;
        font-weight: 700;
      }

      .accordion {
        display: flex;
        flex-direction: column;
        height: fit-content;
        background-color: #f4e6fc;
        padding: 10px 20px;
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
        path: '/admin/store/statistics',
      },
      {
        name: '스토어 추가',
        path: '/admin/store/add',
      },
      {
        name: '스토어 수정',
        path: '/admin/store/edit',
      },
      {
        name: '스토어 삭제',
        path: '/admin/store/delete',
      },
    ],
  },
  {
    title: '유저 관리',
    list: [
      {
        name: '유저 통계',
        path: '/admin/user/statistics',
      },
      {
        name: '유저 추가',
        path: '/admin/user/add',
      },
      {
        name: '유저 수정',
        path: '/admin/user/edit',
      },
      {
        name: '유저 삭제',
        path: '/admin/user/delete',
      },
    ],
  },
  {
    title: '피드 관리',
    list: [
      {
        name: '피드 통계',
        path: '/admin/feed/statistics',
      },
      {
        name: '피드 수정',
        path: '/admin/feed/edit',
      },
      {
        name: '피드 삭제',
        path: '/admin/feed/delete',
      },
    ],
  },
  {
    title: '알림 관리',
    list: [
      {
        name: '알림 보내기',
        path: '/admin/notification/send',
      },
      {
        name: '유저 수정',
        path: '/admin/notification/edit',
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
