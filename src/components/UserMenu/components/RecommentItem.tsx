import styled from 'styled-components';
import BoardTypeTag from '../../common/Board/BoardTypeTag';
import { BoardTypes } from '../../../types/board';
import { useEffect, useState } from 'react';

interface Props {
  parentId: string;
  recomment: string;
  date: string;
}

const RecommentItem = ({ parentId, recomment, date }: Props) => {
  const [parentComment, setParentComment] = useState('');
  const [parentFeedTitle, setParentFeedTitle] = useState('');
  const [board, setBoard] = useState<BoardTypes>(BoardTypes.free);

  const getParentData = async (parentCommentId: string) => {
    try {
      const res = await fetch(`http://34.22.81.36:3000/comments/${parentCommentId}`);
      const data = await res.json();
      setParentComment(data.content);
      setParentFeedTitle(data.parent?.id.title);
      setBoard(data.parent.id.board as BoardTypes);
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  useEffect(() => {
    getParentData(parentId);
  }, []);

  return (
    <Container>
      <div className="comment-header">
        <BoardTypeTag boardType={board} />
        <p className="comment-post-title">{parentFeedTitle}</p>
      </div>
      <div className="comment-content">
        <div className="parent-comment">{parentComment}</div>
        <h2>Re: {recomment}</h2>
      </div>
      <div className="comment-date">
        <p>{date}</p>
      </div>
    </Container>
  );
};

export default RecommentItem;

const Container = styled.article`
  width: 100%;
  padding: 20px 10px;
  gap: 5px;
  display: flex;
  flex-direction: column;
  border-bottom: 2px solid var(--color-light-gray);

  .comment-header {
    display: flex;
    width: 100%;
    margin-bottom: 6px;

    .comment-post-title {
      color: var(--color-gray);
      padding-left: 10px;
    }
  }

  .comment-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .parent-comment {
      color: var(--color-gray);
      font-size: var(--font-small);
      padding: 8px 0;
    }

    h2 {
      white-space: nowrap;
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
