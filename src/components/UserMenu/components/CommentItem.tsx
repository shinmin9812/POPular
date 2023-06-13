import styled from 'styled-components';
import BoardTypeTag from '../../common/Board/BoardTypeTag';
import { useEffect, useState } from 'react';
import { BoardTypes } from '../../../types/board';

interface Props {
  parentId: string;
  comment: string;
  date: string;
}

const CommentItem = ({ parentId, comment, date }: Props) => {
  const [feedTitle, setFeedTitle] = useState(null);
  const [board, setBoard] = useState<BoardTypes>(BoardTypes.free);

  const getFeedData = async (id: string) => {
    try {
      const response = await fetch(`http://34.22.81.36:3000/feeds/${id}`);
      const data = await response.json();
      if (!data._id) return;
      setFeedTitle(data.title);
      setBoard(data.board as BoardTypes);
      return data;
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  useEffect(() => {
    getFeedData(parentId);
  }, []);

  if (feedTitle === null) return <></>;
  return (
    <Container>
      <div className="comment-header">
        <BoardTypeTag boardType={board} />
        <p className="comment-post-title">{feedTitle}</p>
      </div>
      <div className="comment-content">
        <h2>{comment}</h2>
      </div>
      <div className="comment-date">
        <p>{date}</p>
      </div>
    </Container>
  );
};

export default CommentItem;

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
    align-items: center;

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
