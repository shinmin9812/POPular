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
      <PostItemInfo>
        <PostItemDate>
          <PostItemCategoty report={post.report}>{post.report}</PostItemCategoty>
          {post.updatedAt}
        </PostItemDate>
        <PostItemTitle>{post.title}</PostItemTitle>
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

const PostItemCategoty = styled.span<{ report: number }>`
  padding: 2px 10px;
  border-radius: var(--border-radius-button);
  margin-right: 5px;
  color: #fff;

  background-color: ${(props) => {
    switch (props.report) {
      case 0:
        return '#CD554D';
      case 1:
        return '#38B135';
      case 2:
        return '#652CC1';
      default:
        return 'gray';
    }
  }};
`;

const PostItemDate = styled.p`
  margin-top: 5px;
  font-size: var(--font-micro);
  color: var(--color-light-black);
`;

const PostItemTitle = styled.p`
  max-width: 100%;
  font-size: var(--font-regular);
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
