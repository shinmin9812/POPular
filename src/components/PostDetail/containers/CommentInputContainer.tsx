import CommentInput from '../components/CommentInput';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

type aa = {
  author: string;
  content: string;
  parent: {
    type: string;
    id: string;
  };
  recomments: aa[];
};

const feedCommentApi = async (url = '', method = '', postId = '', data: aa, commentId?: string) => {
  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  const response2 = await fetch(`http://34.22.81.36:3000/feeds/${postId}/comment`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      comment: result._id,
    }),
  });
  const result2 = await response2.json();
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
    const errorMessage = err as Error;
    console.log(errorMessage);
    return null;
  }
};

const CommentInputContainer = ({ commentId }: { commentId?: string }) => {
  const [input, setInput] = useState('');
  const [isMember, setIsMember] = useState<string>();
  const postId = useParams().postId;
  useEffect(() => {
    getUserInfo(setIsMember);
  }, []);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  const onClick = () => {
    const data: aa = {
      author: isMember ? isMember : '',
      content: input,
      parent: {
        type: commentId ? 'Comment' : 'Feed',
        id: commentId ? commentId : postId ? postId : '',
      },
      recomments: [],
    };
    commentId
      ? feedCommentApi(`http://34.22.81.36:3000/comments/${commentId}/recomment`, 'PATCH', postId, data, commentId)
      : feedCommentApi(`http://34.22.81.36:3000/comments`, 'POST', postId, data);
  };
  return <CommentInput onChange={onChange} value={input} onClick={onClick} />;
};

export default CommentInputContainer;
