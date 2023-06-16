import styled from 'styled-components';
import FollowItem from './FollowItem';
import { User } from '../../../types/user';
import { Link } from 'react-router-dom';
import { LinkHandler } from '../../../utils/ linkHandler';

interface Props {
  text: string;
  user: User;
}

const Follower = ({ text, user }: Props) => {
  return (
    <Container>
      <p className="follow-title">{text}</p>
      {text === '팔로워' ? (
        <FollowList>
          {user.follower.map((item, i) => (
            <Link key={item._id} to={`/community/user/${item._id}`} onClick={LinkHandler}>
              <div key={i}>
                <FollowItem list={item} />
              </div>
            </Link>
          ))}
        </FollowList>
      ) : text === '팔로잉' ? (
        <FollowList>
          {user.following.map((item, i) => (
            <Link key={item._id} to={`/community/user/${item._id}`} onClick={LinkHandler}>
              <div key={i}>
                <FollowItem list={item} />
              </div>
            </Link>
          ))}
        </FollowList>
      ) : null}
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  box-sizing: border-box;

  .follow-title {
    font-size: var(--font-medium);
    font-weight: var(--weight-regular);
    padding-bottom: 15px;
    border-bottom: 1px solid #eee;
    text-align: center;
  }

  @media all and (max-width: 767px) {
    padding: 15px;

    .follow-title {
      font-size: var(--font-regular);
    }
  }
`;

const FollowList = styled.div`
  margin-top: 15px;

  @media all and (max-width: 767px) {
    margin-top: 7px;
  }
`;

export default Follower;
