import styled from 'styled-components';
import { Post } from '../../../types/post';
import PostItem from './PostItem';
import { Link } from 'react-router-dom';

interface Props {
  posts: Post[];
}

const StoreList = ({ posts }: Props) => {
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
  .post-items {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;

    .post-item {
      flex-basis: 24.2%;
      margin-right: 1%;
      margin-bottom: 3%;
    }

    .post-item:nth-child(4n) {
      margin-right: 0%;
    }

    @media all and (max-width: 767px) {
      .post-item {
        flex-basis: 49%;
        margin-right: 2%;
        margin-bottom: 3%;
      }

      .post-item:nth-child(2n) {
        margin-right: 0%;
      }
    }
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

export default StoreList;
