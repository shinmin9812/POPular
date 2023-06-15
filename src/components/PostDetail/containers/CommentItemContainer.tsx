import { useState, useEffect } from 'react';
import { Comment } from '../../../types/comment';
import CommentItem from '../components/CommentItem';
import { getComments } from '../../../api/CommentApi';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../Hooks/useSelectorHooks';
import { PostDetailActions } from '../PostDetailSlice';
import { API_PATH } from '../../../constants/path';
import callApi from '../../../utils/callApi';
import { User } from '../../../types/user';

export type CommentDeleteBody = {
  ids: string[];
};

const getUserInfo = async (setUserData: React.Dispatch<React.SetStateAction<User | undefined>>) => {
  try {
    const response = await callApi('GET', API_PATH.AUTH.GET.PROFILE);
    if (response.ok) {
      const data = await response.json();
      setUserData(data);
      return;
    } else return;
  } catch (err: any) {
    throw new Error(err);
  }
};

const CommentItemContainer = ({ comment }: { comment: Comment }) => {
  const [reCommentInput, setReCommentInput] = useState(false);
  const [userData, setUserData] = useState<User>();
  const dispatch = useAppDispatch();
  const setComments = (comments: Comment[]) => {
    return dispatch(PostDetailActions.setComment(comments));
  };
  const postId = useParams().postId;

  useEffect(() => {
    getUserInfo(setUserData);
  }, []);

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
      isMember={userData?._id}
    />
  );
};

export default CommentItemContainer;
