import styled from 'styled-components';
import { User } from '../../../../types/user';
import UserBlock from './UserBlock';

interface Props {
  users: User[];
}
const UserFollowerChart = ({ users }: Props) => {
  const sortedUsers = users.sort((a, b) => b.follower.length - a.follower.length).slice(0, 3);

  console.log(sortedUsers);

  return (
    <Container>
      <div className="first">
        <UserBlock user={users[11]} />
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
