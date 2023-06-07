import styled from 'styled-components';
import { User } from '../../../types/user';
import ProfileFollow from './ProfileFollow';
import ProfileButton from './ProfileButton';

interface Props {
  user: User[];
}

const Profile = ({ user }: Props) => {
  if (!user || user.length === 0) {
    return null;
  }
  return (
    <Container>
      <ProfileInfo>
        <UserProfile>
          <div className="profile-frame">
            <img src={user[0].profile} alt={user[0].nickname} />
          </div>
        </UserProfile>
        <ProfileList>
          <ProfileFollow title={'게시물'} number={33} />
          <ProfileFollow title={'팔로워'} number={user[0].follower.length} />
          <ProfileFollow title={'팔로잉'} number={user[0].following.length} />
        </ProfileList>
      </ProfileInfo>
      <ProfileDescript>
        <p className="user-nickname">{user[0].nickname}</p>
        <p className="user-introduce">{user[0].introduce}</p>
        <div className="button-position">
          <ProfileButton text={'프로필수정'} type={'profileEdit'} />
          <ProfileButton text={'팔로우'} type={'follow'} />
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
    max-width: 75px;
    min-width: 50px;
    background-color: #999;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
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
