import styled from 'styled-components';
import PostList from '../components/UserMenu/components/PostList';

const MyPostPage = () => {
  return (
    <div>
      <Title>내가 쓴 글</Title>
      <PostList />
    </div>
  );
};

export default MyPostPage;

const Title = styled.h1`
  font-size: var(--font-medium);
  color: var(--color-main);
  margin-bottom: 20px;
`;
