import CommentInput from '../components/CommentInput';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../Hooks/useSelectorHooks';
import { PostDetailActions } from '../PostDetailSlice';
import { Comment } from '../../../types/comment';
import { getComments } from '../../../api/CommentApi';
import { API_PATH } from '../../../constants/path';

type postCommentBody = {
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
  await fetch(API_PATH.COMMENT.POST, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(data),
  });
  setInput('');
  getComments(postId, setComments);
};

const getUserInfo = async (setIsMember: React.Dispatch<React.SetStateAction<string | undefined>>) => {
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
  const [isMember, setIsMember] = useState<string>();
  const dispatch = useAppDispatch();
  const setComments = (comments: Comment[]) => {
    return dispatch(PostDetailActions.setComment(comments));
  };

  const postId = useParams().postId;
  useEffect(() => {
    getUserInfo(setIsMember);
  }, []);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  const RegisterComment = () => {
    const data: postCommentBody = {
      author: isMember ? isMember : '',
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
