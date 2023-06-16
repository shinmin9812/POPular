import styled from 'styled-components';
import { Post } from '../../../types/post';
import { useGetUserById } from '../../../api/userApi';

const Container = styled.article`
  margin-bottom: 20px;
  border-radius: 10px;
  border: 1px solid #e3e3e3;

  .thumbnail-box {
    width: 100%;
    aspect-ratio: 1/1;

    margin-bottom: 20px;

    border-radius: 14px;

    box-shadow: rgb(238, 238, 238) 1px 1px 10px;

    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
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

        object-fit: cover;

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
      height: 50px;
      color: #474747;
    }
  }
`;

export interface UnPopulatedPost extends Omit<Post, 'author'> {
  author: string;
}

interface Props {
  post: UnPopulatedPost;
}

const ReviewPost = ({ post }: Props) => {
  const { data: user } = useGetUserById(post.author);

  if (!user) return <></>;

  return (
    <Container>
      <div className="post-info">
        {post.images?.length > 0 && (
          <figure className="thumbnail-box">
            <img className="thumbnail" src={post.images[0]} alt={post.title} />
          </figure>
        )}
        <div className="user-info">
          {user.profile ? <img src={user.profile} /> : <img src="/defaultProfile.svg" />}
          <p className="user-name">{user.nickname}</p>
          <span className="user-followers"> · {user.follower.length} followers</span>
        </div>
        <p className="content">{post.content.replace(/<[^>]*>?/g, '')}</p>
      </div>
    </Container>
  );
};

export default ReviewPost;
