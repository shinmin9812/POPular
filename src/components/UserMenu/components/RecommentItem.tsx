import styled from 'styled-components';
import BoardTypeTag from '../../common/Board/BoardTypeTag';
import { BoardTypes } from '../../../types/board';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  parentId: string;
  recomment: string;
  date: string;
}

const RecommentItem = ({ parentId, recomment, date }: Props) => {
  const [parentComment, setParentComment] = useState('');
  const [parentFeedTitle, setParentFeedTitle] = useState('');
  const [parentFeedId, setParentFeedId] = useState('');
  const [board, setBoard] = useState<BoardTypes>(BoardTypes.free);
  const [error, setError] = useState(false);

  const getParentData = async (parentCommentId: string) => {
    try {
      const res = await fetch(`http://34.22.81.36:3000/comments/${parentCommentId}`);
      const data = await res.json();
      setParentComment(data.content);
      setParentFeedTitle(data.parent?.id.title);
      setParentFeedId(data.parent.id._id);
      setBoard(data.parent.id.board as BoardTypes);
    } catch (err: any) {
      setError(true);
      throw new Error(err.message);
    }
  };

  useEffect(() => {
    getParentData(parentId);
  }, []);

  return (
    <>
      {error ? (
        <Blank>삭제된 글입니다.</Blank>
      ) : (
        <Link to={`/community/post/${parentFeedId}`}>
          <Container>
            <CommentHeader>
              <BoardTypeTag boardType={board} />
              <PostTitle>{parentFeedTitle}</PostTitle>
            </CommentHeader>
            <ParentComment>{parentComment}</ParentComment>
            <RecommentContent>
              <div>↳</div>
              <h2>{recomment}</h2>
            </RecommentContent>
            <CommentDate>{date}</CommentDate>
          </Container>
        </Link>
      )}
    </>
  );
};

export default RecommentItem;

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

const Container = styled.article`
  height: 130px;
  box-sizing: border-box;
  padding: 20px 20px;
  margin-bottom: 20px;
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

const ParentComment = styled.p`
  display: block;
  color: var(--color-gray);
  font-size: var(--font-small);
  padding: 4px 6px 6px;
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const RecommentContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  div {
    font-size: var(--font-small);
    color: var(--color-light-black);
    padding: 2px 4px 4px;
    margin-left: 8px 0 0;
  }

  h2 {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 100%;
    height: 20px;
    margin: 8px 4px 0;
  }
`;

const CommentDate = styled.p`
  text-align: end;
  color: var(--color-gray);
  margin: 0;
`;
