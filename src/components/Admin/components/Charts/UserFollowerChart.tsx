import styled from 'styled-components';
import { User } from '../../../../types/user';
import UserBlock from './UserBlock';

interface Props {
  users: User[];
}
const UserFollowerChart = ({ users }: Props) => {
  const most = users.sort((a, b) => b.follower.length - a.follower.length)[0];

  return (
    <Container>
      <div className="first">
        <UserBlock user={most} />
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;

  .first {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default UserFollowerChart;
