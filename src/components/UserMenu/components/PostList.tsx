import { Post } from '../../../types/post';
import PostItem from './PostItem';
import { Link } from 'react-router-dom';

interface Props {
  posts: Post[];
}

const PostList = ({ posts }: Props) => {
  return (
    <ul>
      {posts.map((post) => {
        return (
          <li key={post._id}>
            <Link to={`/community/post/${post._id}`}>
              <PostItem post={post} />
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default PostList;
