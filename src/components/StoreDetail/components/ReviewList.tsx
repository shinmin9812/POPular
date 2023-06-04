import styled from 'styled-components';
import { Post } from '../../../types/post';
import ReviewPost from './ReviewPost';
import Button from '../../common/Button/Button';
import { useNavigate } from 'react-router-dom';

const Container = styled.section`
  li {
    list-style: none;
  }
`;

const ReviewBoardLink = styled.section`
  padding: 20px 0;

  h3 {
    font-size: 20px;
    font-weight: 700;
  }

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

interface Props {
  posts: Post[];
  isFetching: boolean;
}

const ReviewList = ({ posts, isFetching }: Props) => {
  const navigate = useNavigate();
  if (!posts) {
    return <div></div>;
  }
  return (
    <Container>
      <ReviewBoardLink>
        <h3>최근 후기 포스트</h3>
        <Button
          onClick={() => {
            navigate('/');
          }}
        >
          후기 게시판
        </Button>
      </ReviewBoardLink>
      {posts.map((post) => {
        return (
          <li key={post.id}>
            <ReviewPost post={post} />
          </li>
        );
      })}
    </Container>
  );
};

export default ReviewList;
