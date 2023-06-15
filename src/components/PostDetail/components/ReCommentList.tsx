import styled from 'styled-components';
import ReCommentArrowIcon from '../../common/Icons/ReCommentArrowIcon';
import {
  CommentWrap,
  CommentInfoWrap,
  CommentAuthorName,
  CommentContent,
  CommentUpdateAt,
  CommentDeleteButton,
} from './CommentItem';
import { Comment } from '../../../types/comment';
import { Link } from 'react-router-dom';
import { CLIENT_PATH } from '../../../constants/path';
import dayjs from 'dayjs';
const ReCommentWrap = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
  margin-left: 80px;

  @media (max-width: 768px) {
    margin-left: 20px;
  }
`;

const ReCommentItem = styled.li`
  display: flex;
  padding: 15px 0 15px 15px;
  width: 100%;
  box-shadow: rgb(212, 212, 212) 1px 1px 10px;
  border-radius: 20px;
  svg {
    margin-right: 5px;
  }
  @media (max-width: 768px) {
    div {
      width: 100%;
      text-align: left;
    }
  }
`;

const ReComment = ({
  reComments,
  commentDelete,
  isMember,
}: {
  reComments: Comment[] | undefined;
  commentDelete: (commentId: string) => Promise<void>;
  isMember: string | undefined;
}) => {
  return (
    <ReCommentWrap>
      {reComments?.map((reComment, index) => (
        <ReCommentItem key={reComment._id + index}>
          <ReCommentArrowIcon />
          <CommentWrap>
            <CommentInfoWrap>
              <CommentAuthorName>
                <Link to={CLIENT_PATH.PROFILE.replace(':userId', reComment.author._id)}>
                  <div className="profile">
                    <img
                      src={reComment.author.profile ? reComment.author.profile : '/defaultProfile.svg'}
                      className="profile-pic"
                    />
                    <div className="info">
                      <p className="nickname">{reComment.author.nickname}</p>
                    </div>
                  </div>
                </Link>
              </CommentAuthorName>
              <CommentContent>{reComment.content}</CommentContent>
              <CommentUpdateAt>{dayjs(reComment.updatedAt).format('YYYY-MM-DD HH:mm:ss')}</CommentUpdateAt>
            </CommentInfoWrap>
            {isMember === reComment.author._id ? (
              <CommentDeleteButton
                onClick={() => {
                  commentDelete(reComment._id);
                }}
              >
                x
              </CommentDeleteButton>
            ) : (
              <CommentDeleteButton></CommentDeleteButton>
            )}
          </CommentWrap>
        </ReCommentItem>
      ))}
    </ReCommentWrap>
  );
};

export default ReComment;
