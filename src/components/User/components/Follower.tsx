import styled from 'styled-components';
import FollowItem from './FollowItem';
import { User } from '../../../types/user';

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
            <a href={`/community/user/${item._id}`}>
              <div key={i}>
                <FollowItem list={item} />
              </div>
            </a>
          ))}
        </FollowList>
      ) : text === '팔로잉' ? (
        <FollowList>
          {user.following.map((item, i) => (
            <a href={`/community/user/${item._id}`}>
              <div key={i}>
                <FollowItem list={item} />
              </div>
            </a>
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
