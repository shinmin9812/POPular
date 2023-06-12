import styled from 'styled-components';
import Profile from '../components/User/components/Profile';
import Line from '../components/User/components/Line';
import Filter from '../components/User/containers/Filter';
import PagePostList from '../components/User/containers/PagePostList';

const Container = styled.div`
  width: 100%;
  background-color: transparent;
`;

const customOptions = [
  { value: 'desc', name: '최신순' },
  { value: 'asc', name: '오래된 순' },
];

const UserPage = () => {
  return (
    <Container>
      <Profile />
      <Line />
      <Filter options={customOptions} />
      <PagePostList />
    </Container>
  );
};

export default UserPage;
