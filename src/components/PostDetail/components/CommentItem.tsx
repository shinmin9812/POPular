import styled from 'styled-components';
import { Comment } from '../../../types/comment';
import CommentInputContainer from '../containers/CommentInputContainer';
import ReComment from './ReCommentList';
import XmarkIcon from '../../common/Icons/XmarkIcon';
import { Link } from 'react-router-dom';
import { CLIENT_PATH } from '../../../constants/path';
import dayjs from 'dayjs';
export const CommentWrap = styled.div`
  display: flex;
  cursor: pointer;
  width: 100%;
`;

export const CommentInfoWrap = styled.div`
  display: flex;
  width: 100%;
  @media (max-width: 768px) {
    flex-direction: column;
    div {
      width: 100%;
      text-align: left;
    }
  }
`;

export const Li = styled.li`
  display: flex;
  flex-direction: column;
  border-bottom: 1px var(--color-light-gray) solid;
  padding: 15px 0 15px 15px;
  line-height: 20px;
  text-align: center;
  cursor: pointer;
`;

export const CommentAuthorName = styled.div`
  color: var(--color-light-black);
  font-weight: 500;
  width: fit-content;
  font-size: var(--font-small);
  margin-right: 20px;

  a {
    .profile {
      padding-top: 5px;
      display: flex;
      align-items: center;
      gap: 8px;

      .profile-pic {
        width: 30px;
        aspect-ratio: 1/1;
        border-radius: 50%;
      }

      .info {
        display: flex;
        flex-direction: column;
        gap: 8px;

        .nickname {
          color: #000;
          font-size: 16px;
          width: 60px;
          text-align: left;
          white-space: no-wrap;
          overflow: hidden;
          text-overflow: ellipsis;

          em {
            color: #a0a0a0;
            font-size: 12px;
            font-weight: 500;
          }
        }
      }
    }
  }
`;

export const CommentContent = styled.div`
  display: flex;
  align-items: center;
  width: 75%;
  padding: 10px 0;
  text-align: left;
  font-size: var(--font-small);
`;

export const CommentUpdateAt = styled.div`
  color: var(--color-gray);
  font-weight: var(--weight-light);
  width: 10%;
  font-size: var(--font-small);
  text-align: right;
  cursor: pointer;
`;

export const CommentDeleteButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  width: 78px;
  justify-content: center;
`;

const ReCommentInputWrap = styled.div`
  width: 86%;
  margin-left: 14%;
`;

const CommentItem = ({
  comment,
  reCommentInput,
  setReCommentInput,
  commentDelete,
  isMember,
}: {
  comment: Comment;
  reCommentInput: boolean;
  setReCommentInput: () => void;
  commentDelete: (commentId: string) => Promise<void>;
  isMember: string | undefined;
}) => {
  return (
    <Li>
      <CommentWrap onClick={setReCommentInput}>
        <CommentInfoWrap>
          <CommentAuthorName>
            <Link to={CLIENT_PATH.PROFILE.replace(':userId', comment.author._id)}>
              <div className="profile">
                <img
                  src={comment.author.profile ? comment.author.profile : '/defaultProfile.svg'}
                  className="profile-pic"
                />
                <div className="info">
                  <p className="nickname">{comment.author.nickname}</p>
                </div>
              </div>
            </Link>
          </CommentAuthorName>
          <CommentContent>{comment.content}</CommentContent>
          <CommentUpdateAt>{dayjs(comment.updatedAt).format('YYYY-MM-DD HH:mm:ss')}</CommentUpdateAt>
        </CommentInfoWrap>
        {comment.author._id === isMember ? (
          <CommentDeleteButton
            onClick={(e) => {
              e.stopPropagation(); // 상단에 있는 setReCommentInput 방지
              commentDelete(comment._id);
            }}
          >
            <XmarkIcon />
          </CommentDeleteButton>
        ) : (
          <CommentDeleteButton></CommentDeleteButton>
        )}
      </CommentWrap>
      {comment.recomments && comment.recomments.length > 0 && (
        <ReComment reComments={comment.recomments} commentDelete={commentDelete} isMember={isMember} />
      )}
      {reCommentInput && (
        <ReCommentInputWrap>
          <CommentInputContainer commentId={comment._id} setReCommentInput={setReCommentInput} />
        </ReCommentInputWrap>
      )}
    </Li>
  );
};

export default CommentItem;
