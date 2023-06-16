import styled from 'styled-components';
import UserProfile from './UserProfile';
import MenuList from './MenuList';
import { useEffect, useState } from 'react';
import MenuItem from './MenuItem';
import { useNavigate } from 'react-router-dom';
import callApi from '../../../utils/callApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

const MemberMenu = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');

  const userData = useSelector((state: RootState) => state.UserSlice.user);

  useEffect(() => {
    if (userData) {
      setUserId(userData._id);
    }
  }, []);

  const fetchDeleteUser = (userId: string) => {
    try {
      callApi('DELETE', `http://34.22.81.36:3000/users/${userId}`);
    } catch (err: any) {
      throw new Error(err);
    }
  };

  const handleDeleteUser = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const result = confirm('정말 탈퇴하시겠습니까?');
    if (result) {
      fetchDeleteUser(userId);
      alert('탈퇴가 완료되었습니다.');
      localStorage.removeItem('token');
      navigate('/');
    }
  };

  return (
    <Container>
      <UserProfile />
      <MenuItem link={`/community/user/${userId}`} title="내 프로필 보기" />
      <MenuItem link={`/user/${userId}/update`} title="회원정보 수정" />
      <MenuList />
      <div className="deleteUser" onClick={handleDeleteUser}>
        회원탈퇴
      </div>
    </Container>
  );
};

export default MemberMenu;

const Container = styled.div`
  margin: 20px 0;
  & > a,
  .deleteUser {
    display: block;
    width: 300px;
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

  @media screen and (max-width: 768px) {
    & > a,
    .deleteUser {
      height: 55px;
      font-size: var(--font-regular);
      :hover {
        transition: all 0.1s ease;
        color: var(--color-main);
        font-size: calc(var(--font-regular) + 2px);
      }
    }
  }
`;
