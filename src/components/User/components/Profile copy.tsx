import styled from 'styled-components';
import { User } from '../../../types/user';
import ProfileFollow from './ProfileFollow';
import ProfileButton from './ProfileButton';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userInfo, setUserInfo] = useState('');
  const { userId } = useParams();

  useEffect(() => {
    getUserInfo();
    fetchData();
  }, []);

  const getUserInfo = async () => {
    try {
      const response = await fetch('http://34.22.81.36:3000/auth/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      setUserInfo(data._id);
      return data;
    } catch (err: any) {
      throw new Error(err);
    }
  };

  async function fetchData() {
    const response = await fetch(`http://34.22.81.36:3000/users/${userId}`);
    const result: User = await response.json();
    setUser(result);
  }

  if (!user || !user._id) {
    return null;
  }
  return (
    <Container>
      <ProfileInfo>
        <UserProfile>
          <div className="profile-frame">
            {user.profile === '' ? (
              <img src={'/defaultProfile.svg'} className="default-style" />
            ) : (
              <img src={user.profile} alt={user.nickname} className="profile-style" />
            )}
          </div>
        </UserProfile>
        <ProfileList>
          <ProfileFollow title={'게시물'} number={33} />
          <ProfileFollow title={'팔로워'} number={user.follower.length} />
          <ProfileFollow title={'팔로잉'} number={user.following.length} />
        </ProfileList>
      </ProfileInfo>
      <ProfileDescript>
        <p className="user-nickname">{user.nickname}</p>
        <p className="user-introduce">{user.introduce}</p>
        <div className="button-position">
          {userInfo === userId ? (
            <ProfileButton text={'프로필수정'} type={'profileEdit'} />
          ) : (
            <ProfileButton text={'팔로우'} type={'follow'} />
          )}
        </div>
      </ProfileDescript>
    </Container>
  );
};

const Container = styled.div``;

const ProfileInfo = styled.div`
  display: flex;
  justify-content: center;
  gap: 3%;
`;

const UserProfile = styled.div`
  .profile-frame {
    width: 60px;
    height: 60px;
    background-color: #fff;
    border-radius: 50%;
    overflow: hidden;
    position: relative;

    .default-style {
      width: 100%;
    }

    .profile-style {
      width: 100px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;

const ProfileList = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileDescript = styled.div`
  width: 400px;
  padding: 20px 0px;
  margin: 0 auto;
  position: relative;

  .user-nickname {
    font-weight: var(--weight-regular);
  }

  .user-introduce {
    margin-top: 6px;
    font-weight: var(--weight-light);
    font-size: var(--font-micro);
    width: 70%;
  }

  .button-position {
    position: absolute;
    bottom: 0px;
    right: 0px;
  }

  @media all and (max-width: 500px) {
    width: 100%;
    padding: 10px 0px 20px;
    margin: 10px 0px 0px;

    .user-nickname {
      font-size: var(--font-small);
    }
  }
`;

export default Profile;
