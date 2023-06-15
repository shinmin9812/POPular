import { postCommentBody } from "../components/PostDetail/containers/CommentInputContainer";
import { LikeAndReportBodyType } from "../components/PostDetail/containers/LikeAndReportButtonContainer";
import { CommentDeleteBody } from "../components/PostDetail/containers/CommentItemContainer";
import { writePostBody } from "../components/WritePost/containers/PostRegisterButtonContainer";
export type bodyData = postCommentBody | LikeAndReportBodyType | CommentDeleteBody | writePostBody
const callApi = async (method: string, url: string, body?: bodyData) => {
  const response = await fetch(url, {
    method,
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    ...(body !== undefined && { body: JSON.stringify(body) }),
  });

  return response;
};

export default callApi;
