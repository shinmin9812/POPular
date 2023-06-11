import styled from 'styled-components';
import Profile from '../components/User/components/Profile';
import Line from '../components/User/components/Line';

const Container = styled.div`
  width: 100%;
  height: 1000px;
  background-color: transparent;
`;

const ProfilePage = () => {
  return (
    <Container>
      <Profile />
      <Line />
    </Container>
  );
};

export default ProfilePage;
