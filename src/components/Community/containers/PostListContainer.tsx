import PostListItem from '../components/PostList';
import { Post } from '../../../types/post';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../Hooks/useSelectorHooks';

const arr = [1, 2, 3, 4, 5, 6, 7];

const PostListItemContainer = () => {
  const [post, setPost] = useState<Post[]>();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await fetch('/post/all');
    const result: Post[] = await response.json();

    //const response2 = await fetch(`/post/board/free`);
    //const result2: Post = await response2.json();
    setPost(result);
  }

  const tab = useAppSelector((state) => state.CommunitySlice.tab);
  return (
    <ul>
      {arr.map((i) => (
        <PostListItem
          key={i}
          postTitle={post ? post[0].title : ''}
          storeName="어짜라고"
          postInfo={post ? `${post[0].updatedAt} | By ${post[0].author.nickname} | Likes ${post[0].likes}` : ''}
          postId={post ? post[0].id : ''}
        />
      ))}
    </ul>
  );
};

export default PostListItemContainer;
