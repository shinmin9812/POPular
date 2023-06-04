import styled from 'styled-components';
import { Post } from '../../../types/post';
import PostItem from './PostItem';
import { Link } from 'react-router-dom';

interface Props {
  posts: Post[];
}

const PostList = ({ posts }: Props) => {
  return (
    <Container>
      {posts.length > 0 ? (
        <ul className="post-items">
          {posts.map((post) => (
            <li className="post-item" key={post.id}>
              <Link to={`/posts/${post.id}`}>
                <PostItem post={post} />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="nothing">
          <p>
            해당 게시물이
            <br />
            존재하지 않습니다!
          </p>
        </div>
      )}
    </Container>
  );
};

const Container = styled.div`
  .post-item {
    padding: 10px 0px;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid var(--color-light-gray);
  }

  .nothing {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 200px;

    font-size: var(--font-large);
    font-weight: var(--weight-semi-bold);

    line-height: 1.3;

    text-align: center;
    word-break: keep-all;
  }
`;

export default PostList;
