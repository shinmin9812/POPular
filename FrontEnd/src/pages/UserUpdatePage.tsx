import styled from 'styled-components';
import { User } from '../types/user';
import { useEffect, useState } from 'react';
import ProfileImageModify from '../components/UserUpdate/components/ProfileImageModify';
import { SpaceLine } from '../components/UserUpdate/components/Line';
import ProfileUpdateForm from '../components/UserUpdate/components/ProfileUpdateForm';
import ProfileUpdatePasswordForm from '../components/UserUpdate/components/ProfileUpdatePasswordForm';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { API_PATH } from '../constants/path';
import MetaTag from '../components/SEO/MetaTag';

const UserUpdatePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const { userId } = useParams();

  useEffect(() => {
    fetchData();
  }, [userId]);

  async function fetchData() {
    if (userId) {
      const response = await fetch(API_PATH.USER.GET.BY_ID.replace(':userId', userId));
      const result: User = await response.json();
      setUser(result);
    } else {
      return;
    }
  }

  const userData = useSelector((state: RootState) => state.UserSlice.user) as User;

  if (!user) {
    return (
      <Loading>
        <img src="/images/loading.gif" alt="loading" />
      </Loading>
    );
  }

  return (
    <Container>
      <MetaTag title={`POPULAR | 프로필 수정`} />
      {userData && userData._id === userId ? (
        <>
          <ProfileImageModify user={user}></ProfileImageModify>
          <SpaceLine />
          <ProfileUpdateForm user={user} />
          <SpaceLine />
          <ProfileUpdatePasswordForm user={user} />
        </>
      ) : (
        <div>접근 권한이 없습니다.</div>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding-top: 20px;
`;

const Loading = styled.div`
  width: 100%;
  padding: 100px;
  text-align: center;

  img {
    width: 100px;
    margin: 0 auto;
  }
`;

export default UserUpdatePage;
