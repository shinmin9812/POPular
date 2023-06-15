import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Comment } from '../../../types/comment';
import BoardTypeTag from '../../common/Board/BoardTypeTag';
import CommentIconMini from '../../common/Icons/CommentIconMini';
import { BoardTypes } from '../../../types/board';

interface Props {
  id: string;
  commentData: Comment;
  board: BoardTypes;
  checked: boolean;
}

const handleChecked = async (checked: boolean, id: string) => {
  if (!checked) {
    fetch(`http://34.22.81.36:3000/notifications/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        checked: true,
      }),
    });
  }
};

const RemoveNotification = async (id: string) => {
  fetch(`http://34.22.81.36:3000/notifications/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  location.reload();
};

const CommentNotificationItem = ({ id, commentData, board, checked }: Props) => {
  return (
    <Container checked={checked}>
      {commentData ? (
        <>
          <Link to={`/community/post/${commentData.parent.id}`} onClick={() => handleChecked(checked, id)}>
            <Item>
              <CommentIconMini />
              <Content>
                <Message>{commentData.author.nickname}님이 댓글을 작성했습니다.</Message>
                <CommentContainer>
                  <BoardTypeTag boardType={board as BoardTypes} />
                  <CommentContent>{commentData.content}</CommentContent>
                </CommentContainer>
              </Content>
            </Item>
          </Link>
          <RemoveButton onClick={() => RemoveNotification(id)}>×</RemoveButton>
        </>
      ) : (
        <ErrorItem>삭제된 항목입니다.</ErrorItem>
      )}
    </Container>
  );
};

export default CommentNotificationItem;

const Container = styled.div<{ checked: boolean }>`
  width: 95%;
  height: 80px;
  margin: 10px auto;
  border: 1px solid var(--color-light-gray);

  transition: all 0.3s ease 0s;
  box-shadow: rgb(238, 238, 238) 1px 1px 10px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  opacity: ${(props) => (props.checked ? 0.3 : 1)};

  a {
    color: ${(props) => props.checked && 'var(--color-light-black)'};
    flex: 1;
    height: 100%;
    padding-left: 20px;
  }
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const RemoveButton = styled.span`
  color: var(--color-light-black);
  padding: 10px;
  margin-right: 10px;
  cursor: pointer;

  :hover {
    transition: all 0.1s ease;
    opacity: 1;
    color: var(--color-red);
    transform: scale(1.5);
  }
  transition: all 0.1s ease;
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

const ErrorItem = styled.p`
  color: var(--color-gray);
  width: 100%;
  text-align: center;
`;
