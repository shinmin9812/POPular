import { useState } from 'react';
import { Comment } from '../../../types/comment';
import CommentItem from '../components/CommentItem';
import { getComments } from '../../../api/CommentApi';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../Hooks/useSelectorHooks';
import { PostDetailActions } from '../PostDetailSlice';
import { API_PATH } from '../../../constants/path';
import callApi from '../../../utils/callApi';

export type CommentDeleteBody = {
  ids: string[];
};

const CommentItemContainer = ({ comment }: { comment: Comment }) => {
  const [reCommentInput, setReCommentInput] = useState(false);
  const UserData = useAppSelector((state) => state.UserSlice.user);
  const dispatch = useAppDispatch();
  const setComments = (comments: Comment[]) => {
    return dispatch(PostDetailActions.setComment(comments));
  };
  const postId = useParams().postId;

  const commentDeleteApi = async (commentId: string) => {
    const response = await callApi('DELETE', API_PATH.COMMENT.DELETE, { ids: [commentId] });
    const result = await response.json();
    alert(result.message);
    getComments(postId, setComments);
  };

  return (
    // ReComment 추가 예정
    // 배열 그대로 전달
    <CommentItem
      comment={comment}
      reCommentInput={reCommentInput}
      setReCommentInput={() => {
        setReCommentInput((prev) => !prev);
      }}
      commentDelete={commentDeleteApi}
      isMember={UserData?._id}
    />
  );
};

export default CommentItemContainer;
