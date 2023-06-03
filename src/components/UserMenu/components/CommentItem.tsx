import styled from 'styled-components';
import { Comment } from '../../../types/comment';
import BoardTypeTag from '../../common/Board/BoardTypeTag';
import { BoardTypes } from '../../../types/board';

const Container = styled.article`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;

  padding: 20px 0;

  border-bottom: 2px solid var(--color-light-gray);

  .comment-header {
    display: flex;
    gap: 10px;
    width: 100%;

    margin-bottom: 6px;

    .comment-post-title {
      color: var(--color-gray);
    }
  }

  .comment-content {
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

  .comment-date {
    text-align: end;
    p {
      color: var(--color-gray);
    }
  }
`;

interface Props {
  comment: Comment;
}

const CommentItem = ({ comment }: Props) => {
  return (
    <Container>
      {
        <>
          <div className="comment-header">
            <BoardTypeTag boardType={comment.post.board as BoardTypes} />
            <p className="comment-post-title">{comment.post.title}</p>
          </div>
          <div className="comment-content">
            <h2>{comment.content}</h2>
          </div>
          <div className="comment-date">
            <p>2023-03-02</p>
          </div>
        </>
      }
    </Container>
  );
};

export default CommentItem;
