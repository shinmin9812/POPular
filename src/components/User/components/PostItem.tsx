import styled from 'styled-components';
import { Post } from '../../../types/post';

interface Props {
  post: Post;
}

const PostItem = ({ post }: Props) => {
  const findImage = post.content;
  const regex = /src="([^"]+)"/;
  const match = findImage.match(regex);

  const boardKorea = post.board === 'free' ? '자유게시판' : post.board === 'gather' ? '모집게시판' : '후기게시판';

  return (
    <Container>
      <PostItemInfo>
        <PostItemCategory>
          <PostItemCategoty report={boardKorea}>{boardKorea}</PostItemCategoty>
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
  box-sizing: border-box;
  padding-top: 10px;
`;

const PostItemCategoty = styled.span<{ report: string }>`
  padding: 2px 7px;
  border-radius: var(--border-radius-button);
  margin-right: 5px;
  color: #fff;
  font-size: var(--font-micro);

  background-color: ${(props) => {
    switch (props.report) {
      case '자유게시판':
        return '#CD554D';
      case '후기게시판':
        return '#38B135';
      case '모집게시판':
        return '#652CC1';
      default:
        return 'gray';
    }
  }};
`;

const PostItemCategory = styled.p`
  margin-top: 5px;
  font-size: var(--font-micro);
  color: var(--color-light-black);
`;

const PostItemBottom = styled.div`
  margin-top: 10px;
  font-size: var(--font-micro);
  color: var(--color-gray);
`;

const PostItemTitle = styled.p`
  max-width: 100%;
  font-size: var(--font-small);
  font-weight: var(--weight-regular);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  margin-top: 10px;

  @media all and (max-width: 767px) {
    font-size: var(--font-small);
  }
`;

export default PostItem;
