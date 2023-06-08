import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  width: 300px;
  height: 100vh;

  padding: 20px;

  font-family: 'Noto Sans KR', sans-serif;

  background-color: #ffffff;
  box-shadow: 0px 0px 22px -6px rgba(0, 0, 0, 0.2);
  transition: all 1s;

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

      .accordion-item {
        padding: 6px 10px 6px 20px;
      }
    }

    &.on {
      h2 {
        background-color: #fcf6ff;
        font-weight: 700;
      }

      .accordion {
        height: fit-content;
        transition: all 1s;
      }
    }
  }
`;

const AdminNavigation = () => {
  const [selectedMenu, setSelectedMenu] = useState<string>('');

  return (
    <Container>
      <nav>
        <ul className="management-list">
          <li className={`management-item store-management ${selectedMenu === 'store' ? 'on' : ''}`}>
            <h2
              onClick={() => {
                setSelectedMenu(`${selectedMenu === 'store' ? '' : 'store'}`);
              }}
            >
              팝업 스토어 관리
            </h2>
            <ul className={`accordion`}>
              <li className="accordion-item">
                <h3>스토어 통계</h3>
              </li>
              <li className="accordion-item">
                <h3>스토어 삭제</h3>
              </li>
              <li className="accordion-item">
                <h3>스토어 수정</h3>
              </li>
              <li className="accordion-item">
                <h3>스토어 삭제</h3>
              </li>
            </ul>
          </li>
          <li
            className={`management-item user-management ${selectedMenu === 'user' ? 'on' : ''}`}
            onClick={() => {
              setSelectedMenu(`${selectedMenu === 'user' ? '' : 'user'}`);
            }}
          >
            <h2>유저 관리</h2>
            <ul className={`accordion`}>
              <li className="accordion-item">
                <h3>유저 통계</h3>
              </li>
              <li className="accordion-item">
                <h3>유저 정보 수정</h3>
              </li>
              <li className="accordion-item">
                <h3>유저 삭제</h3>
              </li>
            </ul>
          </li>
          <li className="post-management"></li>
          <li className="notification-management"></li>
          <li className="-management"></li>
        </ul>
      </nav>
    </Container>
  );
};

export default AdminNavigation;
