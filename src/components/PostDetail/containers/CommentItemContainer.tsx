import { useState } from 'react';
import { Comment } from '../../../types/comment';
import CommentItem from '../components/CommentItem';

const date = new Date();

const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, '0')}.${date
  .getDate()
  .toString()
  .padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date
  .getMinutes()
  .toString()
  .padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;

const CommentItemContainer = ({ comment }: { comment: Comment }) => {
  const [reCommentInput, setReCommentInput] = useState(false);
  return (
    // ReComment 추가 예정
    // 배열 그대로 전달
    <CommentItem
      comment={comment}
      UpdateAt={formattedDate}
      reCommentInput={reCommentInput}
      setReCommentInput={() => {
        setReCommentInput((prev) => !prev);
      }}
    />
  );
};

export default CommentItemContainer;
