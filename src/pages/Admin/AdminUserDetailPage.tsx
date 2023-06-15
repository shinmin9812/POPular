import styled from 'styled-components';
import { useLocation, useParams } from 'react-router-dom';
import { useGetUserById } from '../../api/userApi';
import Card from '../../components/common/Card/Card';
import Tag from '../../components/common/Tag/Tag';
import { useEffect, useState } from 'react';

const Container = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;

  .profile {
    width: 200px;
    height: 200px;

    margin-bottom: 10px;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      box-shadow: 0px 0px 22px 10px rgba(0, 0, 0, 0.2);
    }
  }

  .names {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    .name {
      font-size: 32px;
      font-weight: 600;
    }

    .nickname {
      font-size: 20px;
    }

    ._id {
      font-size: 12px;
    }
  }

  .follow {
    display: flex;
    gap: 10px;

    font-weight: 600;
    color: #600071;

    strong {
      font-weight: 600;
    }
  }

  .category {
    display: flex;
    gap: 10px;
  }

  .phone-number {
    font-weight: 600;
    font-size: 20px;
  }

  .allow-noti {
    padding: 10px;
    background-color: #686868;
    color: #fff;
    font-weight: 500;
    border-radius: 20px;
  }
`;

const AdminUserDetailPage = () => {
  const { userId } = useParams();
  const { data: user } = useGetUserById(userId!, { cacheTime: 0 });
  const { pathname } = useLocation();
  const [, setEditMode] = useState<boolean>(false);

  useEffect(() => {
    if (pathname.split('/')[3] === 'edit') setEditMode(true);
  }, [pathname]);

  return (
    <>
      {user ? (
        <Card>
          <Container>
            <div className="profile">
              <img src={user.profile} alt="profile" />
            </div>
            <div className="names">
              <div className="name">
                {user.name} {user.role === 'admin' && '[관리자]'}
              </div>
              <div className="nickname">{user.nickname}</div>
              <div className="email">{user.email}</div>
              <div className="_id">{user._id}</div>
            </div>
            <div className="follow">
              <div className="follower">
                <strong>Follower</strong> {user.follower.length}
              </div>
              <div className="following">
                <strong>Following</strong> {user.following.length}
              </div>
            </div>
            <div className="phone-number">{user.phone_number}</div>
            <div className="category">
              {user.interested_category.map((item) => (
                <Tag key={item}>{item}</Tag>
              ))}
            </div>
            {user.allow_notification && <div className="allow-noti">알림 허용됨</div>}
          </Container>
        </Card>
      ) : (
        <></>
      )}
    </>
  );
};

export default AdminUserDetailPage;
