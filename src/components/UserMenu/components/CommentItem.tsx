import styled from 'styled-components';
import { Comment } from '../../../types/comment';
import BoardTypeTag from '../../common/Board/BoardTypeTag';
import { BoardTypes } from '../../../types/board';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

interface Props {
  comment: Comment;
  parentType: string;
  parentId: string;
}

const fetchFeedData = async (id: string) => {
  const response = await fetch(`http://34.22.81.36:3000/feeds/${id}`);
  const data = await response.json();
  return data;
};

const CommentItem = ({ comment, parentType, parentId }: Props) => {
  const [feedTitle, setFeedTitle] = useState('');
  const { isLoading, error, data } = useQuery(['feedData'], () => fetchFeedData(parentId), {
    enabled: parentType === 'Feed' && !!parentId,
  });

  useEffect(() => {
    if (parentType === 'Feed' && !isLoading && !error && data) {
      setFeedTitle(data.title);
    }
  }, [parentType, parentId, isLoading, error, data]);

  return (
    <Container>
      <div className="comment-header">
        <BoardTypeTag boardType={'free' as BoardTypes} />
        <p className="comment-post-title">{feedTitle}</p>
      </div>
      <div className="comment-content">
        <h2>{comment.content}</h2>
      </div>
      <div className="comment-date">
        <p>2023-03-02</p>
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
    }
  }

  .comment-content {
    width: 100%;
    flex: 1;
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
