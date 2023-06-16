import CommentInput from '../components/CommentInput';
import { useState, Dispatch, SetStateAction } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../Hooks/useSelectorHooks';
import { PostDetailActions } from '../PostDetailSlice';
import { Comment } from '../../../types/comment';
import { getComments } from '../../../api/CommentApi';
import { API_PATH } from '../../../constants/path';
import callApi from '../../../utils/callApi';

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
  await callApi('POST', API_PATH.COMMENT.POST, JSON.stringify(data));
  setInput('');
  getComments(postId, setComments);
};

const CommentInputContainer = ({
  commentId,
  setReCommentInput,
}: {
  commentId?: string;
  setReCommentInput?: () => void;
}) => {
  const [input, setInput] = useState('');
  const dispatch = useAppDispatch();
  const UserData = useAppSelector((state) => state.UserSlice.user);
  const setComments = (comments: Comment[]) => {
    return dispatch(PostDetailActions.setComment(comments));
  };

  const postId = useParams().postId;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value.normalize());
  };
  const RegisterComment = () => {
    if (!UserData) {
      alert('로그인이 필요합니다.');
      return;
    }
    const data: postCommentBody = {
      author: UserData?._id,
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
