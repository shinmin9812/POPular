import styled from 'styled-components';
import { User } from '../../../types/user';
import { Post } from '../../../types/post';
import ProfileFollow from './ProfileFollow';
import ProfileButton from './ProfileButton';
import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import MetaTag from '../../SEO/MetaTag';

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userInfo, setUserInfo] = useState('');
  const { userId } = useParams();
  const [checkFollower, setCheckFollower] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const [isFollowLoading, setIsFollowLoading] = useState(false);
  const [feedNumber, setFeedNumber] = useState<Post[]>([]);

  useEffect(() => {
    getUserInfo();
    fetchData();
    getFeedNumber();
  }, [userId, userInfo]);

  let feedNumbers: string[] = [];
  for (let i = 0; i < feedNumber.length; i++) {
    const currentFeed = feedNumber[i];
    if (userId && currentFeed.author._id.includes(userId)) {
      feedNumbers.push(currentFeed.author._id);
    }
  }

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

  const getFeedNumber = async () => {
    try {
      const response = await fetch('http://34.22.81.36:3000/feeds', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setFeedNumber(data);
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
          <ProfileFollow title={'게시물'} number={feedNumbers.length} />
          <ProfileFollow title={'팔로워'} number={followerCount} />
          <ProfileFollow title={'팔로잉'} number={user.following.length} />
        </ProfileList>
      </ProfileInfo>
      <ProfileDescript>
        <p className="user-nickname">{user.nickname}</p>
        <p className="user-introduce">{user.introduce}</p>
        <div className="button-position">
          {userInfo === userId ? (
            <ProfileButton text={'프로필수정'} type={'profileEdit'} link={`/user/${userId}/update`} />
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
    font-size: 13px;
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

export default Profile;
