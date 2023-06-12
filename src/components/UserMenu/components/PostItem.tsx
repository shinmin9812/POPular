import styled from 'styled-components';
import { Post } from '../../../types/post';
import BoardTypeTag from '../../common/Board/BoardTypeTag';

interface Props {
  post: Post;
}

const PostItem = ({ post }: Props) => {
  return (
    <Container>
      <div className="post-header">
        <BoardTypeTag boardType={post.board} />
        <p className="post-date">{post.updatedAt.slice(0, 10)}</p>
      </div>
      <div className="post-title">
        <h2>{post.title}</h2>
      </div>
    </Container>
  );
};

export default PostItem;

const Container = styled.article`
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;

  padding: 20px 0;

  border-bottom: 2px solid var(--color-light-gray);

  .post-header {
    width: 100%;
    display: flex;
    justify-content: space-between;

    .post-date {
      color: var(--color-gray);
    }
  }

  .post-title {
    width: 100%;
    flex: 1;
    display: flex;
    align-items: center;

    h2 {
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
`;
