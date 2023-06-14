import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { User } from '../../../../types/user';
import dayjs from 'dayjs';

interface Props {
  user: User;
}

const AdminUserItem = ({ user }: Props) => {
  return (
    <Container>
      <NavLink to={`./${user._id}`} className={({ isActive }) => (isActive ? 'active' : '')}>
        <div className="profile">
          <img src={user.profile} alt="profile" />
          <div className="date">{dayjs(user.createdAt).format('YYYY-MM-DD')} 가입</div>
        </div>
        <div className="info">
          <div className="unique-id">
            {' '}
            <strong>ID</strong> {user._id}
          </div>
          <div className="name">{user.name}</div>
          <div className="nickname">{user.nickname}</div>
          <div className="introduce">{user.introduce}</div>
        </div>
      </NavLink>
    </Container>
  );
};

const Container = styled.div`
  a {
    display: flex;
    gap: 20px;

    width: 100%;
    height: 100px;

    padding: 10px;

    border-radius: 10px;

    transition: all 0.3s;

    strong {
      font-weight: 600;
    }

    .profile {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      height: 100%;
      margin-right: 20px;

      img {
        height: 100%;
        aspect-ratio: 1/1;
        border-radius: 50%;
      }

      .date {
        font-size: 11px;
        color: #969696;
      }
    }

    .info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 4px;

      .unique-id {
        font-size: 12px;
      }

      .name {
        font-size: 20px;
        font-weight: 500;
      }

      .nickname {
        font-size: 14px;
        font-weight: 300;
        color: #858585;
      }

      .introduce {
        font-size: 12px;
      }
    }
  }
`;

export default AdminUserItem;
