import { Comment } from '../types/comment';
import { API_PATH } from '../constants/path';
type postCommentBody = {
  author: string;
  content: string;
  parent: {
    type: string;
    id: string;
  };
  recomments: postCommentBody[];
};

export const getComments = async (postId = '', setComments: (comments: Comment[]) => void) => {
  const response = await (await fetch(`http://34.22.81.36:3000/feeds/${postId}/comments`)).json();
  setComments(response);
};

export const PostComment = async (data: postCommentBody) => {
  try {
    const response = await fetch(API_PATH.COMMENT.POST, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
  } catch (err) {
    throw new Error('댓글 등록에 실패하였습니다!');
  }
};
