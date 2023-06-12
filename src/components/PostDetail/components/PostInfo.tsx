import BoardTypeTag from '../../common/Board/BoardTypeTag';
import { BoardTypes } from '../../../types/board';
import styled from 'styled-components';
import getDateFunc from '../../../utils/getDateFunc';

interface PostInfoType {
  boardType: BoardTypes;
  title: string;
  nickName: string;
  updatedAt: string;
  likes: number;
  comments: number;
  views: number;
}

const PostInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px var(--color-light-gray) solid;
  margin-bottom: 30px;
`;

const ColumnWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const RowWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;
const PostTitle = styled.h3`
  font-size: var(--font-medium);
  font-weight: var(--weight-semi-bold);
`;
const BottomInfo = styled.div`
  color: var(--color-gray);
  margin: 10px 0;
  font-size: var(--font-small);
`;
const RightInfo = styled.div`
  display: flex;
  justify-content: space-between;
  width: 120px;
  color: var(--color-gray);
  font-size: var(--font-small);
`;

const PostInfo = ({ boardType, title, nickName, updatedAt, likes, comments, views }: PostInfoType) => {
  return (
    <PostInfoWrap>
      <BoardTypeTag boardType={boardType} />
      <RowWrap>
        <ColumnWrap>
          <PostTitle>{title}</PostTitle>
          <BottomInfo>{`${nickName} | ${getDateFunc(updatedAt)}`}</BottomInfo>
        </ColumnWrap>
        <ColumnWrap>
          <RightInfo>
            <span>Views</span>
            <span>{views}</span>
          </RightInfo>
          <RightInfo>
            <span>Likes</span>
            <span>{likes}</span>
          </RightInfo>
          <RightInfo>
            <span>Comments</span>
            <span>{comments}</span>
          </RightInfo>
        </ColumnWrap>
      </RowWrap>
    </PostInfoWrap>
  );
};

export default PostInfo;
