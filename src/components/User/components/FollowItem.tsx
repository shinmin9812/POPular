import styled from 'styled-components';

interface FollowerData {
  _id: string;
  nickname: string;
  profile: string;
}

interface Props {
  list: FollowerData;
}

const Follower = ({ list }: Props) => {
  return (
    <FollowItem>
      <Profile>
        {list.profile === '' ? <img src={'/defaultProfile.svg'} /> : <img src={list.profile} alt={list.nickname} />}
      </Profile>
      <Description>
        <p>{list.nickname}</p>
      </Description>
    </FollowItem>
  );
};

const FollowItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px 7px;
  box-sizing: border-box;
  border-bottom: 1px solid #eee;
`;

const Profile = styled.div`
  width: 65px;
  height: 65px;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media all and (max-width: 767px) {
    width: 60px;
    height: 60px;
  }
`;

const Description = styled.div`
  padding-left: 25px;
  font-weight: var(--weight-regular);

  @media all and (max-width: 767px) {
    font-size: var(--font-small);
  }
`;

export default Follower;
