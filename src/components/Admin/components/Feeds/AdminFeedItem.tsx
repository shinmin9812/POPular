import styled from 'styled-components';
import Tag from '../../../common/Tag/Tag';
import dayjs from 'dayjs';
import { Post } from '../../../../types/post';
import BoardTypeTag from '../../../common/Board/BoardTypeTag';

interface Props {
  feed: Post;
}

const AdminFeedItem = ({ feed }: Props) => {
  const createdAt = dayjs(feed.createdAt).format('YYYY-MM-DD');

  console.log(feed);

  return (
    <Container>
      <a href={`/community/post/${feed._id}`} target="_blank">
        <div className="info">
          <div className="unique">
            <BoardTypeTag boardType={feed.board} />
            <div className="feed-id">
              <strong>id</strong> {feed._id}
            </div>
          </div>
          <div className="feed-title">{feed.title}</div>
          <div className="other">
            <span>
              <strong>닉네임</strong> {feed.author.nickname}
            </span>
            <span>
              <strong>이름</strong> {feed.author.name}
            </span>
            <span>
              <strong>작성일</strong> {createdAt}
            </span>
            <span>
              <strong>조회수</strong> {feed.views}
            </span>
            <span>
              <strong>추천</strong> {feed.likes.length}
            </span>
            <span>
              <strong>신고</strong> {feed.reports.length}
            </span>
          </div>
        </div>

        {feed.images && feed.images?.length > 0 && <img src={feed.images[0]} className="thumbnail" alt="thumbnail" />}
      </a>
    </Container>
  );
};

const Container = styled.div`
  a {
    display: flex;

    justify-content: space-between;

    width: 100%;
    height: 100px;

    padding: 10px;

    border-radius: 10px;

    transition: all 0.3s;

    strong {
      font-weight: 700;
    }

    .info {
      display: flex;
      flex-direction: column;
      gap: 10px;

      .unique {
        display: flex;
        align-items: center;
        gap: 6px;
        .feed-id {
          font-size: 12px;
        }
      }

      .feed-title {
        font-size: 20px;
        font-weight: 500;
      }

      .other {
        display: flex;
        gap: 6px;
        font-size: 12px;
      }
    }
  }
`;

export default AdminFeedItem;
