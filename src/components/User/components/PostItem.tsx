import styled from 'styled-components';
import { Post } from '../../../types/post';

interface Props {
  post: Post;
}

const PostItem = ({ post }: Props) => {
  const findImage = post.content;
  const regex = /src="([^"]+)"/;
  const match = findImage.match(regex);

  return (
    <Container>
      <PostItemImage>
        <div className="temporary-image">
          {match ? (
            <img src={match[1]} alt={''} />
          ) : (
            <img src="https://via.placeholder.com/300x200/dddddd.png" alt="이미지가 없습니다." />
          )}
        </div>
      </PostItemImage>
      <PostItemInfo>
        <p className="post-item-title">{post.title}</p>
        <p className="post-item-date">{post.updatedAt}</p>
      </PostItemInfo>
    </Container>
  );
};

const Container = styled.div``;

const PostItemImage = styled.div`
  width: 100%;
  padding-bottom: 100%;
  background-color: #eee;
  border-radius: 8px;
  overflow: hidden;
  position: relative;

  .temporary-image {
    position: absolute;
    top: 0;

    img {
      width: 100%;
      height: 250px;
      object-fit: cover;
    }
  }
`;

const PostItemInfo = styled.div`
  margin-top: 6px;
  .post-item-title {
    max-width: 100%;
    font-size: var(--font-regular);
    font-weight: var(--weight-regular);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .post-item-date {
    margin-top: 5px;
    font-size: var(--font-micro);
    color: var(--color-light-black);
  }

  @media all and (max-width: 767px) {
    .post-item-title {
      font-size: var(--font-small);
    }

    .post-item-date {
      margin-top: 5px;
      font-size: var(--font-micro);
      color: var(--color-light-black);
    }
  }
`;

export default PostItem;
