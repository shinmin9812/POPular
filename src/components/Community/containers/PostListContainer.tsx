import PostListItem from '../components/PostList';
import { Post } from '../../../types/post';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../Hooks/useSelectorHooks';

async function fetchData(tab: string, setPosts: React.Dispatch<React.SetStateAction<Post[] | undefined>>) {
  // const response = await fetch('/post/all');
  // const result: Post[] = await response.json();
  let response;
  let result;
  switch (tab) {
    case '전체':
      console.log(tab);
      response = await fetch(`http://34.22.81.36:3000/posts`);
      result = await response.json();
      break;
    case '자유게시판':
      console.log(tab);

      response = await fetch(`http://34.22.81.36:3000/posts/free`);
      result = await response.json();
      break;
    case '모집게시판':
      console.log(tab);

      response = await fetch(`http://34.22.81.36:3000/posts/gather`);
      result = await response.json();
      break;
    case '후기게시판':
      console.log(tab);

      response = await fetch(`http://34.22.81.36:3000/posts/review`);
      result = await response.json();
      break;
  }
  setPosts(result);
}

const PostListItemContainer = () => {
  const tab = useAppSelector((state) => state.CommunitySlice.tab);
  const [posts, setPosts] = useState<Post[]>();

  useEffect(() => {
    fetchData(tab, setPosts);
  }, [tab]);

  return (
    <ul>
      {posts?.map((post) => (
        <PostListItem
          key={post._id}
          postTitle={post.title}
          //storeName="어짜라고"
          postInfo={`${new Date(post.updatedAt).toISOString().slice(0, 10)} | By ${post.author.nickname} | Likes ${
            post.likes.length
          }`}
          postId={post._id}
        />
      ))}
    </ul>
  );
};

export default PostListItemContainer;
