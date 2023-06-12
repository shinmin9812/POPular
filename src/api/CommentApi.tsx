import { Comment } from '../types/comment';

const getComments = async (postId = '', setComments: (comments: Comment[]) => void) => {
  const getCommentsresponse = await fetch(`http://34.22.81.36:3000/feeds/${postId}/comments`);
  const getCommentsresult = await getCommentsresponse.json();
  setComments(getCommentsresult);
};

export default getComments;
