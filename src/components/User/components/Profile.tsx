import styled from 'styled-components';
import { User } from '../../../types/user';
import ProfileFollow from './ProfileFollow';
import ProfileButton from './ProfileButton';
import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import MetaTag from '../../SEO/MetaTag';
import { useGetFeedsByUserId } from '../../../api/feedApi';
import Follower from './Follower';

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userInfo, setUserInfo] = useState('');
  const { userId } = useParams();
  const [checkFollower, setCheckFollower] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const [isFollowLoading, setIsFollowLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalType, setModalType] = useState('');

  useEffect(() => {
    getUserInfo();
    fetchData();
  }, [userId, userInfo]);

  const { data: feeds } = useGetFeedsByUserId(userId!);

  const modalHandler = (type: string) => {
    setModal(true);
    setModalType(type);
  };

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

  const fetchData = useCallback(async () => {
    const response = await fetch(`http://34.22.81.36:3000/users/${userId}`);
    const result: User = await response.json();
    setUser(result);

    const isFollower = result.follower.some((follower: any) => follower._id === userInfo);
    setCheckFollower(isFollower);
    setFollowerCount(result.follower.length);
  }, [userId, userInfo]);

  // 유저 팔로우
  const followMutation = useMutation(() => {
    return fetch(`http://34.22.81.36:3000/users/${userInfo}/follow/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  });

  // 유저 언팔로우
  const unfollowMutation = useMutation(() => {
    return fetch(`http://34.22.81.36:3000/users/${userInfo}/unfollow/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  });

  const followHandler = async () => {
    if (isFollowLoading) return;
    setIsFollowLoading(true);

    if (checkFollower) {
      setCheckFollower(false);
      return;
    }
    try {
      await followMutation.mutateAsync();
      setCheckFollower(true);
      setFollowerCount((prevCount) => prevCount + 1);
    } catch (error) {
      console.log('팔로우 요청 에러:', error);
    } finally {
      setIsFollowLoading(false);
    }
  };

  const unfollowHandler = async () => {
    if (isFollowLoading) return;
    setIsFollowLoading(true);

    if (!checkFollower) {
      setCheckFollower(true);
      return;
    }

    try {
      await unfollowMutation.mutateAsync();
      setCheckFollower(false);
      setFollowerCount((prevCount) => prevCount - 1);
    } catch (error) {
      console.log('언팔로우 요청 에러:', error);
    } finally {
      setIsFollowLoading(false);
    }
  };

  if (!user || !user._id) {
    return null;
  }
  return (
    <Container>
      <ProfileInfo>
        <MetaTag title={`POPULAR | ${user.nickname}님의 프로필`} />
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
          <ProfileFollow title={'게시물'} number={feeds?.totalDocs ? feeds.totalDocs : 0} />
          <ProfileFollow title={'팔로워'} number={followerCount} onClick={() => modalHandler('follower')} />
          <ProfileFollow title={'팔로잉'} number={user.following.length} onClick={() => modalHandler('following')} />
        </ProfileList>
      </ProfileInfo>
      <ProfileDescript>
        <p className="user-nickname">{user.nickname}</p>
        <p className="user-introduce">{user.introduce}</p>
        <div className="button-position">
          {userInfo === userId ? (
            <ProfileButton text={'프로필수정'} type={'profileEdit'} link={`/usermenu/${userId}/update`} />
          ) : (
            <div>
              {checkFollower ? (
                <ProfileButton text={'언팔로우'} type={'unfollow'} onClick={unfollowHandler} />
              ) : (
                <ProfileButton text={'팔로우'} type={'follow'} onClick={followHandler} />
              )}
            </div>
          )}
        </div>
      </ProfileDescript>
      {modal ? (
        <ModalBackground onClick={() => setModal(false)}>
          <FollowModal>
            {modalType === 'follower' ? (
              <Follower text={'팔로워'} user={user} />
            ) : modalType === 'following' ? (
              <Follower text={'팔로잉'} user={user} />
            ) : null}
          </FollowModal>
        </ModalBackground>
      ) : null}
    </Container>
  );
};

const Container = styled.div`
  padding: 20px 0px;

  @media all and (max-width: 767px) {
    padding: 5px 0px 20px;
  }
`;

const ProfileInfo = styled.div`
  display: flex;
  justify-content: center;
  gap: 3%;

  @media all and (max-width: 767px) {
    justify-content: space-around;
  }
`;

const UserProfile = styled.div`
  .profile-frame {
    width: 70px;
    height: 70px;
    background-color: #fff;
    border-radius: 50%;
    overflow: hidden;
    position: relative;

    .default-style {
      width: 100%;
    }

    .profile-style {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

const ProfileList = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileDescript = styled.div`
  width: 450px;
  padding: 30px 0px 10px;
  margin: 0 auto;
  position: relative;

  .user-nickname {
    font-weight: var(--weight-semi-bold);
  }

  .user-introduce {
    margin-top: 6px;
    font-weight: var(--weight-light);
    font-size: var(--font-small);
    letter-spacing: 0.5px;
    width: 70%;
    line-height: 18px;
  }

  .button-position {
    position: absolute;
    bottom: 0px;
    right: 0px;
  }

  @media all and (max-width: 767px) {
    width: 100%;
    box-sizing: border-box;
    padding: 10px 10px 20px;
    margin: 10px 0px 0px;

    .user-nickname {
      font-size: var(--font-small);
    }
  }
`;
const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 99;
  backdrop-filter: blur(1.5px);
`;

const FollowModal = styled.div`
  width: 400px;
  height: 500px;
  border-radius: var(--border-radius-button);
  box-shadow: #d7cdd726 0px 0px 3px 3px;
  background-color: var(--color-white);
  overflow-y: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #2f3542;
  }
  &::-webkit-scrollbar-track {
    background-color: grey;
  }

  position: fixed;
  left: 0;
  right: 0;
  top: 25%;
  margin: 0 auto;
  z-index: 99;
  animation: modalUP 0.3s;

  @keyframes modalUP {
    0% {
      transform: translateY(30px);
      opacity: 0;
    }
    100% {
      transform: translateY(0px);
      opacity: 1;
    }
  }

  @media all and (max-width: 767px) {
    width: 320px;
    height: 400px;
  }
`;

export default Profile;
