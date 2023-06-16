import BoardTypeTag from '../../common/Board/BoardTypeTag';
import { BoardTypes } from '../../../types/board';
import styled from 'styled-components';
import { CLIENT_PATH } from '../../../constants/path';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
interface PostInfoType {
  boardType: BoardTypes;
  title: string;
  authorId: string;
  nickName: string;
  updatedAt: string;
  likes: number;
  comments: number;
  views: number;
  profile: string;
  follower: number;
}

const PostInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;

  .board {
    width: fit-content;
    transform-origin: left;
    transform: scale(1.5);
  }

  .feed-data {
    display: flex;
    gap: 10px;
    width: 100%;
    height: fit-content;
  }
`;

const ColumnWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const RowWrap = styled.div`
  display: flex;
  gap: 20px;
  padding: 15px 0;
  border-bottom: 1px var(--color-light-gray) solid;
`;

const PostTitle = styled.h3`
  margin-bottom: 10px;
  font-size: 30px;
  font-weight: 500;
`;
const BottomInfo = styled.div`
  color: var(--color-gray);
  margin: 10px 0;
  font-size: var(--font-small);

  a {
    color: var(--color-gray);
  }

  .profile {
    display: flex;
    align-items: center;
    gap: 10px;

    .profile-pic {
      width: 40px;
      aspect-ratio: 1/1;
      border-radius: 50%;
    }

    .info {
      display: flex;
      flex-direction: column;
      gap: 4px;

      .nickname {
        color: #000;
        font-size: 16px;
        font-weight: 300;

        em {
          color: #a0a0a0;
          font-size: 12px;
          font-weight: 500;
        }
      }
    }
  }
`;
const RightInfo = styled.div`
  display: flex;
  gap: 4px;
  color: var(--color-gray);
  font-size: var(--font-small);
`;

const PostInfo = ({
  boardType,
  title,
  authorId,
  profile,
  nickName,
  updatedAt,
  likes,
  comments,
  follower,
  views,
}: PostInfoType) => {
  return (
    <PostInfoWrap>
      <Link to={`/community/board/${boardType}`} className="board">
        <BoardTypeTag boardType={boardType} />
      </Link>
      <RowWrap>
        <ColumnWrap>
          <PostTitle>{title}</PostTitle>
          <BottomInfo>
            <Link to={CLIENT_PATH.PROFILE.replace(':userId', authorId)}>
              <div className="profile">
                <img src={profile ? profile : '/defaultProfile.svg'} className="profile-pic" />
                <div className="info">
                  <p className="nickname">
                    {nickName} <em>| {follower} Followers</em>
                  </p>
                  <p className="updated">{`${dayjs(updatedAt).format('YYYY-MM-DD HH:mm:ss')}`}</p>
                </div>
              </div>
            </Link>
          </BottomInfo>
          <div className="feed-data"></div>
        </ColumnWrap>
      </RowWrap>
      <RowWrap>
        <RightInfo>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#CBCBCB" viewBox="0 0 24 24">
            <path d="M12.015 7c4.751 0 8.063 3.012 9.504 4.636-1.401 1.837-4.713 5.364-9.504 5.364-4.42 0-7.93-3.536-9.478-5.407 1.493-1.647 4.817-4.593 9.478-4.593zm0-2c-7.569 0-12.015 6.551-12.015 6.551s4.835 7.449 12.015 7.449c7.733 0 11.985-7.449 11.985-7.449s-4.291-6.551-11.985-6.551zm-.015 3c-2.209 0-4 1.792-4 4 0 2.209 1.791 4 4 4s4-1.791 4-4c0-2.208-1.791-4-4-4z" />
          </svg>
          <span>{views}</span>
        </RightInfo>
        <RightInfo>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#CBCBCB" viewBox="0 0 24 24">
            <path d="M22 3v13h-11.643l-4.357 3.105v-3.105h-4v-13h20zm2-2h-24v16.981h4v5.019l7-5.019h13v-16.981z" />
          </svg>
          <span>{comments}</span>
        </RightInfo>
      </RowWrap>
    </PostInfoWrap>
  );
};

export default PostInfo;
