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
        <Container>
          <Link to={`/community/post/${parentId}`}>
            <CommentHeader>
              <BoardTypeTag boardType={board} />
              <PostTitle>{feedTitle}</PostTitle>
            </CommentHeader>
            <CommentContent>{comment}</CommentContent>
            <CommentDate>{date}</CommentDate>
          </Link>
        </Container>
      )}
    </>
  );
};

export default CommentItem;

const Blank = styled.div`
  color: var(--color-gray);
  height: 130px;
  padding: 20px 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  transition: all 0.3s ease 0s;
  box-shadow: rgb(238, 238, 238) 1px 1px 10px;
  border-radius: 8px;
`;

const Container = styled.div`
  height: 130px;
  box-sizing: border-box;
  padding: 20px 20px;
  border-bottom: 1px solid var(--color-light-gray);

  transition: all 0.3s ease 0s;
  box-shadow: rgb(238, 238, 238) 1px 1px 10px;
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &:hover {
    cursor: pointer;
    transform: translateY(-4px);
    background-color: #fff;
    filter: brightness(0.97);
  }
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
  margin: 14px 4px;
`;

const CommentDate = styled.p`
  text-align: end;
  color: var(--color-gray);
  margin: 4px 0;
`;
