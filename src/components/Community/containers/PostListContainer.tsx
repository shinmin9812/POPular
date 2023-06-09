import PostListItem from '../components/PostList';
import { Post } from '../../../types/post';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { useAppSelector, useAppDispatch } from '../../../Hooks/useSelectorHooks';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import filterFunc from '../../../Hooks/filterFunc';
import { Store } from '../../../types/store';
import { communityActions } from '../CommunitySlice';
async function fetchData(
  tab: string,
  setPosts: React.Dispatch<React.SetStateAction<Post[] | undefined>>,
  navigate: NavigateFunction,
) {
  let response;
  let result;
  switch (tab) {
    case '전체':
      response = await fetch(`http://34.22.81.36:3000/feeds/`);
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
  const page = useAppSelector((state) => state.CommunitySlice.page.currPage);
  const filterCategory = useAppSelector((state) => state.CommunitySlice.categoryFilter);
  const filterAddress = useAppSelector((state) => state.CommunitySlice.addressFilter);
  const filterDate = useAppSelector((state) => state.CommunitySlice.durationFilter);
  const filterDateUse = useAppSelector((state) => state.CommunitySlice.durationFilter.use);
  const filterStartDate = `${filterDate.StartDate.year}-${filterDate.StartDate.month}-${filterDate.StartDate.day}`;
  const filterEndDate = `${filterDate.endDate.year}-${filterDate.endDate.month}-${filterDate.endDate.day}`;
  const dispatch = useAppDispatch();
  const setTotalPage = useCallback((page: number[]) => dispatch(communityActions.setTotalPage(page)), [dispatch]);
  const setPage = useCallback((page: number) => dispatch(communityActions.setPage(page)), [dispatch]);

  const [posts, setPosts] = useState<Post[]>();

  const stores: Store[] | undefined =
    posts && posts.map((post: Post) => post.store_id).filter((value): value is Store => Boolean(value));

  useEffect(() => {
    fetchData(tab, setPosts, navigate);
  }, [tab, page, navigate]);

  // 필터 사용 유무
  const useFilter = filterCategory.use || filterAddress.use || filterDateUse;

  //에러 발생 fix 예정
  const originalPost: Post[] | undefined = useMemo(() => {
    if (useFilter) {
      // 필터링된 스토어리스트
      const useFilterStoreList =
        stores && filterFunc(stores, filterAddress, filterCategory, filterStartDate, filterEndDate, filterDateUse);
      // 필터링된 게시글들
      const useFilterPosts = posts?.filter((post) =>
        useFilterStoreList?.some((store) => store._id === post.store_id?._id),
      );
      return useFilterPosts;
    } else {
      return posts;
    }
  }, [useFilter]);

  useEffect(() => {
    // 탭 이동 시 페이지 초기화
    setPage(1);
  }, [tab, setPage, originalPost]);

  const dividedPost: Post[][] = useMemo(() => {
    const post: Post[][] = [];
    if (originalPost !== undefined && originalPost.length > 0) {
      for (let i = 0; i < originalPost.length; i += 7) {
        post.push(originalPost.slice(i, i + 7));
      }
    }
    return post;
  }, [originalPost]);

  useEffect(() => {
    setTotalPage(Array.from({ length: dividedPost.length }, (_, index) => index + 1));
  }, [setTotalPage, dividedPost, originalPost]);

  return (
    <ul>
      {dividedPost[page - 1]?.map((post) => (
        <PostListItem
          key={post._id}
          postTitle={post.title}
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
