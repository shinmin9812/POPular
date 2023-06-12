import { useState, useEffect } from 'react';
import { Comment } from '../../../types/comment';
import CommentItem from '../components/CommentItem';
import getComments from '../../../api/CommentApi';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../Hooks/useSelectorHooks';
import { PostDetailActions } from '../PostDetailSlice';
import { API_PATH } from '../../../constants/path';

const CommentItemContainer = ({ comment }: { comment: Comment }) => {
  const postId = useParams().postId;
  const dispatch = useAppDispatch();
  const setComments = (comments: Comment[]) => {
    return dispatch(PostDetailActions.setComment(comments));
  };

  const [reCommentInput, setReCommentInput] = useState(false);
  const [isMember, setIsMember] = useState();
  useEffect(() => {
    getUserInfo();
  }, []);
  const getUserInfo = async () => {
    try {
      const response = await fetch('http://34.22.81.36:3000/auth/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      setIsMember(data._id);
    } catch (err: any) {
      const errorMessage = err as Error;
      console.log(errorMessage);
      return null;
    }
  };

  const commentDeleteApi = async (commentId: string, authorId: string) => {
    if (isMember !== authorId) {
      alert('작성자가 아닙니다');
      return;
    }
    const response = await fetch(API_PATH.COMMENT.DELETE.replace(':commentId', commentId), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
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
    />
  );
};

export default CommentItemContainer;
