import styled from 'styled-components';
import Profile from '../components/User/components/Profile';
import Line from '../components/User/components/Line';
import ProfilePostList from '../components/User/containers/ProfilePostList';
import Filter from '../components/User/containers/Filter';

const Container = styled.div`
  width: 100%;
  height: 1000px;
  background-color: transparent;
`;

const customOptions = [
  { value: 'newest', name: '최신순' },
  { value: 'oldest', name: '오래된 순' },
];

const UserPage = () => {
  return (
    <Container>
      <Profile />
      <Line />
      <Filter options={customOptions} />
      <ProfilePostList />
    </Container>
  );
};

export default UserPage;
