import styled from 'styled-components';
import { Post } from '../../../types/post';
import PostItem from './PostItem';
import { Link } from 'react-router-dom';

const Container = styled.section``;

interface Props {
  posts: Post[];
}

const PostList = ({ posts }: Props) => {
  return (
    <Container>
      <ul>
        {posts.map((post) => {
          return (
            <li key={post.id}>
              <Link to={`/posts/${post.id}`}>
                <PostItem post={post} />
              </Link>
            </li>
          );
        })}
      </ul>
    </Container>
  );
};

export default PostList;
