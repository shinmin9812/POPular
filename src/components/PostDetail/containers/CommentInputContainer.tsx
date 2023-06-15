import CommentInput from '../components/CommentInput';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../Hooks/useSelectorHooks';
import { PostDetailActions } from '../PostDetailSlice';
import { Comment } from '../../../types/comment';
import { getComments } from '../../../api/CommentApi';
import { API_PATH } from '../../../constants/path';
import callApi from '../../../utils/callApi';
import { User } from '../../../types/user';

export type postCommentBody = {
  author: string;
  content: string;
  parent: {
    type: string;
    id: string;
  };
  recomments: postCommentBody[];
};

const feedCommentApi = async (
  data: postCommentBody,
  setInput: Dispatch<SetStateAction<string>>,
  postId = '',
  setComments: (comments: Comment[]) => void,
) => {
  await callApi('POST', API_PATH.COMMENT.POST, data);
  setInput('');
  getComments(postId, setComments);
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

const CommentInputContainer = ({
  commentId,
  setReCommentInput,
}: {
  commentId?: string;
  setReCommentInput?: () => void;
}) => {
  const [input, setInput] = useState('');
  const [userData, setUserData] = useState<User>();
  const dispatch = useAppDispatch();
  const setComments = (comments: Comment[]) => {
    return dispatch(PostDetailActions.setComment(comments));
  };

  const postId = useParams().postId;
  useEffect(() => {
    getUserInfo(setUserData);
  }, []);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  const RegisterComment = () => {
    if (!userData) {
      alert('로그인이 필요합니다.');
      return;
    }
    const data: postCommentBody = {
      author: userData._id,
      content: input,
      parent: {
        type: commentId ? 'Comment' : 'Feed',
        id: commentId ? commentId : postId ? postId : '',
      },
      recomments: [],
    };
    feedCommentApi(data, setInput, postId, setComments);
    setReCommentInput && setReCommentInput();
  };
  return <CommentInput onChange={onChange} value={input} RegisterComment={RegisterComment} />;
};

export default CommentInputContainer;
