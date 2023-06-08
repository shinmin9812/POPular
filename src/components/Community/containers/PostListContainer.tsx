import PostListItem from '../components/PostList';
import { Post } from '../../../types/post';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../Hooks/useSelectorHooks';
import { useNavigate, NavigateFunction } from 'react-router-dom';

async function fetchData(
  tab: string,
  page: number,
  setPosts: React.Dispatch<React.SetStateAction<Post[] | undefined>>,
  navigate: NavigateFunction,
) {
  // const response = await fetch('/post/all');
  // const result: Post[] = await response.json();
  let response;
  let result;
  switch (tab) {
    case '전체':
      response = await fetch(`http://34.22.81.36:3000/feeds/pages?page=${page}`);
      result = await response.json();
      navigate('/community/board/all');
      break;
    case '자유게시판':
      response = await fetch(`http://34.22.81.36:3000/feeds/free`);
      result = await response.json();
      navigate('/community/board/free');

      break;
    case '모집게시판':
      response = await fetch(`http://34.22.81.36:3000/feeds/gather`);
      result = await response.json();
      navigate('/community/board/gather');
      break;
    case '후기게시판':
      response = await fetch(`http://34.22.81.36:3000/feeds/review`);
      result = await response.json();
      navigate('/community/board/review');
      break;
  }
  setPosts(result);
}

const PostListItemContainer = () => {
  const navigate = useNavigate();

  const tab = useAppSelector((state) => state.CommunitySlice.tab);
  const page = useAppSelector((state) => state.CommunitySlice.page);
  const [posts, setPosts] = useState<Post[]>();

  useEffect(() => {
    fetchData(tab, page, setPosts, navigate);
  }, [tab, page, navigate]);

  return (
    <ul>
      {posts?.map((post) => (
        <PostListItem
          key={post._id}
          postTitle={post.title}
          //storeName="어짜라고"
          postInfo={`${new Date(post.updatedAt).toISOString().slice(0, 10)} | By ${post.author} | Likes ${
            post.likes.length
          }`}
          postId={post._id}
        />
      ))}
    </ul>
  );
};

export default PostListItemContainer;
