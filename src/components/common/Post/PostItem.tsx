import styled from 'styled-components';
import { Post } from '../../../types/post';
import BoardTypeTag from '../../common/Board/BoardTypeTag';
import dayjs from 'dayjs';

interface Props {
  post: Post;
}

const PostItem = ({ post }: Props) => {
  const findImage = post.content;
  const regex = /src="([^"]+)"/;
  const match = findImage.match(regex);
  return (
    <Container key={post._id}>
      <ContainerInner>
        <PostItemInfo>
          <PostItemCategory>
            <BoardTypeTag boardType={post.board} />
          </PostItemCategory>
          <PostItemTitle>{post.title}</PostItemTitle>
          <PostItemBottom>
            <span>{dayjs(post.updatedAt).format('YYYY-MM-DD')} </span>|
            <div className="info">
              {typeof post.author === 'object' ? (
                <>
                  <span>{post.author.nickname}</span>|<span>💜 {post.likes.length}</span>
                </>
              ) : (
                `💜 ${post.likes.length > 0 ? post.likes.length : '0'}`
              )}
            </div>
          </PostItemBottom>
        </PostItemInfo>
        <PostItemImage>
          <div className="temporary-image">{match ? <img src={post.images && post.images[0]} /> : null}</div>
        </PostItemImage>
      </ContainerInner>
    </Container>
  );
};

const Container = styled.div`
  box-sizing: border-box;
  padding: 20px 20px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid var(--color-light-gray);
  transition: all 0.3s;
  box-shadow: 1px 1px 10px #eee;
  margin-bottom: 10px;
  border-radius: 8px;

  &:hover {
    cursor: pointer;
    transform: translateY(-4px);
    background-color: #fff;
    filter: brightness(0.97);
  }

  @media all and (max-width: 767px) {
    padding: 20px 15px;
  }
`;

const ContainerInner = styled.div`
  width: 100%;
  display: flex;
  height: 80px;
`;

const PostItemImage = styled.div`
  width: 13%;
  position: relative;

  .temporary-image {
    position: absolute;
    width: 100%;
    height: 80px;
    border-radius: 8px;
    overflow: hidden;
    top: 0;
    right: 0;

    img {
      width: 100%;
      height: 80px;
      object-fit: cover;
    }
  }
  @media all and (max-width: 767px) {
    width: 28%;
  }
`;

const PostItemInfo = styled.div`
  width: 87%;

  @media all and (max-width: 767px) {
    width: 72%;
  }
`;

const PostItemCategory = styled.div`
  margin-top: 5px;
  font-size: var(--font-small);
  color: var(--color-light-black);
`;

const PostItemBottom = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
  font-size: 12px;
  color: var(--color-gray);

  .info {
    display: flex;
    gap: 10px;
  }
`;

const PostItemTitle = styled.div`
  max-width: 100%;
  font-size: var(--font-regular);
  font-weight: var(--weight-regular);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 5px 0px;
  margin-top: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media all and (max-width: 767px) {
    font-size: var(--font-small);
  }
`;

export default PostItem;
