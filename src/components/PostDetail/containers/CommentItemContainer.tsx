import { useState } from 'react';
import { Comment } from '../../../types/comment';
import CommentItem from '../components/CommentItem';

const CommentItemContainer = ({ comment }: { comment: Comment }) => {
  const [reCommentInput, setReCommentInput] = useState(false);
  return (
    // ReComment 추가 예정
    // 배열 그대로 전달
    <CommentItem
      comment={comment}
      reCommentInput={reCommentInput}
      setReCommentInput={() => {
        setReCommentInput((prev) => !prev);
      }}
    />
  );
};

export default CommentItemContainer;
