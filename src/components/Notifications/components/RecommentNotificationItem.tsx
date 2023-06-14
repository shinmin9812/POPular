import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Comment } from '../../../types/comment';
import BoardTypeTag from '../../common/Board/BoardTypeTag';
import CommentIconMini from '../../common/Icons/CommentIconMini';

interface Props {
  id: string;
  recommentData: Comment;
  board: string;
  checked: boolean;
}

const RecommentNotificationItem = ({ id, recommentData, board, checked }: Props) => {
  const [feedId, setFeedId] = useState('');
  const handleChecked = async (checked: boolean, id: string) => {
    if (!checked) {
      fetch(`http://34.22.81.36:3000/notifications/${id}`, {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          checked: true,
        }),
      });
    }
  };

  const getFeedId = async (commentId: string) => {
    try {
      const res = await fetch(`http://34.22.81.36:3000/comments/info/${commentId}`);
      const data = await res.json();
      if (data.ancestor) setFeedId(data.ancestor.id);
    } catch (err) {
      alert('항목을 찾을 수 없습니다.');
    }
  };

  useEffect(() => {
    getFeedId(recommentData._id);
  }, []);
  return (
    <Link to={`/community/post/${feedId}`} onClick={() => handleChecked(checked, id)}>
      <ItemContainer checked={checked}>
        <CommentIconMini />
        <Content>
          <Message>{recommentData.author.nickname}님이 대댓글을 작성했습니다.</Message>
          <CommentContainer>
            <BoardTypeTag boardType={board} />
            <CommentContent>{recommentData.content}</CommentContent>
          </CommentContainer>
        </Content>
      </ItemContainer>
    </Link>
  );
};

export default RecommentNotificationItem;

const ItemContainer = styled.div`
  width: 95%;
  height: 80px;
  padding: 0 20px;
  margin: 8px auto;
  border: 1px solid var(--color-light-gray);

  transition: all 0.3s ease 0s;
  box-shadow: rgb(238, 238, 238) 1px 1px 10px;
  border-radius: 8px;

  display: flex;
  align-items: center;
  color: ${(props) => props.checked && 'var(--color-light-black)'};
  opacity: ${(props) => (props.checked ? 0.3 : 1)};
`;

const Content = styled.div`
  margin: 0 18px;
  flex: 1;
`;

const Message = styled.p`
  margin-bottom: 4px;
`;

const CommentContainer = styled.div`
  display: flex;
  margin: 10px 0 0;
`;

const CommentContent = styled.p`
  font-size: var(--font-regular);

  margin-left: 10px;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
