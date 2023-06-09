import styled from 'styled-components';
import { Post } from '../../../types/post';
import BoardTypeTag from '../../common/Board/BoardTypeTag';

interface Props {
  post: Post;
}

const PostItem = ({ post }: Props) => {
  const findImage = post.content;
  const regex = /src="([^"]+)"/;
  const match = findImage.match(regex);

  return (
    <Container key={post._id}>
      <PostItemInfo>
        <PostItemCategory>
          <BoardTypeTag boardType={post.board} />
        </PostItemCategory>
        <PostItemTitle>{post.title}</PostItemTitle>
        <PostItemBottom>
          {post.updatedAt} | {post.author.nickname} | 💜 {post.likes.length}
        </PostItemBottom>
      </PostItemInfo>
      <PostItemImage>
        <div className="temporary-image">{match ? <img src={match[1]} alt={''} /> : null}</div>
      </PostItemImage>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  height: 75px;

  .link {
    width: 100%;
  }
`;

const PostItemImage = styled.div`
  width: 20%;
  position: relative;

  .temporary-image {
    position: absolute;
    width: 75px;
    height: 75px;
    border-radius: 8px;
    overflow: hidden;
    top: 0;
    right: 0;

    img {
      width: 75px;
      height: 75px;
      object-fit: cover;
    }
  }
`;

const PostItemInfo = styled.div`
  width: 80%;
`;

const PostItemCategory = styled.div`
  margin-top: 5px;
  font-size: var(--font-micro);
  color: var(--color-light-black);
`;

const PostItemBottom = styled.div`
  margin-top: 10px;
  font-size: var(--font-micro);
  color: var(--color-gray);
`;

const PostItemTitle = styled.div`
  max-width: 100%;
  font-size: var(--font-small);
  font-weight: var(--weight-regular);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 5px;

  margin-top: 10px;

  @media all and (max-width: 767px) {
    font-size: var(--font-small);
  }
`;

export default PostItem;
