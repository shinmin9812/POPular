import styled from 'styled-components';
import MenuItem from './MenuItem';
import { CLIENT_PATH } from '../../../constants/path';
import { useNavigate } from 'react-router-dom';

const MenuList = () => {
  const navigate = useNavigate();
  const handleLogout = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    localStorage.removeItem('token');
    alert('다음에 또 만나요!');
    navigate('/');
  };

  return (
    <MenuListContainer>
      <MenuItem link={CLIENT_PATH.USER_RECENT} title="최근 본 스토어" />
      <MenuItem link={CLIENT_PATH.USER_SCRAP} title="위시리스트" />
      <MenuItem link={CLIENT_PATH.USER_POSTS} title="내가 쓴 글" />
      <MenuItem link={CLIENT_PATH.USER_COMMENTS} title="내가 쓴 댓글" />

      <div className="logout" onClick={handleLogout}>
        로그아웃
      </div>
    </MenuListContainer>
  );
};

export default MenuList;

const MenuListContainer = styled.div`
  width: 350px;
  margin: 0;
  border-top: 1px solid gray;
  a,
  div {
    display: block;
    width: 350px;
    height: 65px;
    font-size: var(--font-medium);
    border-bottom: 0.5px solid var(--color-gray);
    padding: 20px;
    margin: 0;
    cursor: pointer;

    :hover {
      transition: all 0.1s ease;
      color: var(--color-main);
      font-size: calc(var(--font-medium) + 2px);
    }
  }

  .logout {
    border-top: 1px solid gray;
  }
`;
