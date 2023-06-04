import styled from 'styled-components';
import { Post } from '../../../types/post';

const Container = styled.article`
  margin-bottom: 20px;

  .thumbnail {
    width: 100%;
    aspect-ratio: 1/1;
    border-radius: 14px;

    object-fit: cover;
  }

  .post-info {
    padding: 14px 10px;
    .user-info {
      display: flex;
      align-items: center;

      margin-bottom: 10px;

      img {
        width: 40px;
        aspect-ratio: 1/1;
        margin-right: 6px;

        border-radius: 50%;
      }

      .user-name {
        margin-right: 6px;
        font-weight: 700;
      }

      .user-followers {
        font-size: var(--font-micro);
        color: var(--color-light-black);
        font-weight: 700;
      }
    }

    .content {
      color: #474747;
    }
  }
`;

interface Props {
  post: Post;
}

const ReviewPost = ({ post }: Props) => {
  console.log(post);
  return (
    <Container>
      <img className="thumbnail" src={post.images ? post.images[0] : ''} alt={post.title} />
      <div className="post-info">
        <div className="user-info">
          <img src={post.author.profile} />
          <p className="user-name">{post.author.nickname}</p>
          <span className="user-followers"> · {post.author.follower.length} followers</span>
        </div>
        <p className="content">{post.content}</p>
      </div>
    </Container>
  );
};

export default ReviewPost;
