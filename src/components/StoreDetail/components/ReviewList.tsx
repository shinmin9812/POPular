import styled from 'styled-components';
import { Post } from '../../../types/post';
import ReviewPost from './ReviewPost';
import Button from '../../common/Button/Button';
import { useNavigate } from 'react-router-dom';
import Skeleton from './Skeleton';

const Container = styled.section`
  li {
    list-style: none;
  }

  .more-view {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-bottom: 100px;
  }

  .no-reviews {
    margin: 40px 0;

    font-size: 20px;
    font-weight: 700;

    text-align: center;
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

  if (!isFetching && posts.length === 0) {
    return (
      <Container>
        <p className="no-reviews">해당 스토어의 후기가 없습니다!</p>
      </Container>
    );
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
      {posts ? (
        posts.map((post) => {
          return (
            <li key={post._id}>
              <ReviewPost post={post} />
            </li>
          );
        })
      ) : (
        <>
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </>
      )}
      <div className="more-view">
        <Button onClick={() => navigate('/community/board/review')}>후기 더 보기</Button>
      </div>
    </Container>
  );
};

export default ReviewList;
