import styled from 'styled-components';
import BoardTypeTag from '../../common/Board/BoardTypeTag';
import { useEffect, useState } from 'react';
import { BoardTypes } from '../../../types/board';
import { Link } from 'react-router-dom';

interface Props {
  parentId: string;
  comment: string;
  date: string;
}

const CommentItem = ({ parentId, comment, date }: Props) => {
  const [feedTitle, setFeedTitle] = useState(null);
  const [board, setBoard] = useState<BoardTypes>(BoardTypes.free);
  const [error, setError] = useState(false);

  const getFeedData = async (id: string) => {
    try {
      const response = await fetch(`http://34.22.81.36:3000/feeds/${id}`);
      const data = await response.json();
      setFeedTitle(data.title);
      setBoard(data.board as BoardTypes);
      if (!data._id) setFeedTitle(null);
      return data;
    } catch (err: any) {
      setError(true);
      throw new Error(err.message);
    }
  };

  useEffect(() => {
    getFeedData(parentId);
  }, []);

  return (
    <>
      {error || !feedTitle ? (
        <Blank>삭제된 글입니다.</Blank>
      ) : (
        <Link to={`/community/post/${parentId}`}>
          <Container>
            <CommentHeader>
              <BoardTypeTag boardType={board} />
              <PostTitle>{feedTitle}</PostTitle>
            </CommentHeader>
            <CommentContent>{comment}</CommentContent>
            <CommentDate>{date}</CommentDate>
          </Container>
        </Link>
      )}
    </>
  );
};

export default CommentItem;

const Blank = styled.div`
  color: var(--color-gray);
  width: 95%;
  height: 120px;
  padding: 10px 20px;
  margin: 10px 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  transition: all 0.3s ease 0s;
  box-shadow: rgb(238, 238, 238) 1px 1px 10px;
  border-radius: 8px;
`;

const Container = styled.article`
  width: 95%;
  height: 120px;
  padding: 15px 20px;
  margin: 10px 10px;

  transition: all 0.3s ease 0s;
  box-shadow: rgb(238, 238, 238) 1px 1px 10px;
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CommentHeader = styled.div`
  display: flex;
  width: 100%;
  margin: 3px 0;
`;

const PostTitle = styled.p`
  color: var(--color-light-black);
  padding-left: 10px;
  flex: 1;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const CommentContent = styled.h2`
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
  height: 20px;
  margin: 6px 4px;
`;

const CommentDate = styled.p`
  text-align: end;
  color: var(--color-gray);
  margin: 4px 0;
`;
