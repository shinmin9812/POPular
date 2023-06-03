import styled from 'styled-components';
import { Post } from '../../../types/post';

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
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

interface Props {
  post: Post;
}

const PostItem = ({ post }: Props) => {
  return (
    <Container>
      {
        <>
          <div className="post-header">
            <span>{post.board}</span>
            <p className="post-date">{post.updatedAt}</p>
          </div>
          <div className="post-title">
            <h2>{post.title}</h2>
          </div>
        </>
      }
    </Container>
  );
};

export default PostItem;
