import styled from 'styled-components';
import { User } from '../../../../types/user';

interface Props {
  user: User;
}

const Container = styled.div`
  display: flex;
  gap: 7px;
  flex-direction: column;
  align-items: center;
  width: fit-content;

  animation: appear-user 0.5s forwards;

  .profile {
    width: 160px;
    aspect-ratio: 1/1;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0px 0px 22px -6px rgba(0, 0, 0, 0.8);

    img {
      width: 100%;
      height: 100%;
    }
  }

  .info {
    color: #000;
    text-align: center;

    .nickname {
      font-weight: 500;
      font-size: 24px;
      margin-bottom: 3px;
    }

    .name {
      font-weight: 300;
      color: #787878;
    }
  }

  .followers {
    font-weight: 300;
    color: #a34bb2;

    strong {
      font-weight: 600;
    }
  }

  @keyframes appear-user {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }

    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const UserBlock = ({ user }: Props) => {
  return (
    <Container>
      <div className="profile">
        <img src={user.profile ? user.profile : '/defaultProfile.svg'} alt="profile" /> :
      </div>
      <div className="info">
        <p className="nickname">{user.nickname}</p>
        <p className="name">{user.name}</p>
      </div>
      <div className="followers">
        <strong>{user.follower.length}</strong> Followers
      </div>
    </Container>
  );
};

export default UserBlock;
