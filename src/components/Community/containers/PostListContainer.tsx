import { Post } from '../../../types/post';
import { Store } from '../../../types/store';
import { useEffect, useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { communityActions } from '../CommunitySlice';
import { useParams } from 'react-router-dom';
import { CLIENT_PATH } from '../../../constants/path';
import { getAllFeeds, getAllFreeFeeds, getAllReviewFeeds, getAllGatherFeeds } from '../../../api/feedApi';
import { useAppSelector, useAppDispatch } from '../../../Hooks/useSelectorHooks';
import filterFunc from '../../../utils/filterFunc';
import PostItem from '../../common/Post/PostItem';
import PostList from '../components/PostList';

const PostListItemContainer = () => {
  const page = useAppSelector((state) => state.CommunitySlice.page.currPage);
  const filterCategory = useAppSelector((state) => state.CommunitySlice.categoryFilter);
  const filterAddress = useAppSelector((state) => state.CommunitySlice.addressFilter);
  const filterDate = useAppSelector((state) => state.CommunitySlice.durationFilter);
  const dispatch = useAppDispatch();
  const setTotalPage = useCallback((page: number[]) => dispatch(communityActions.setTotalPage(page)), [dispatch]);
  const setPage = useCallback((page: number) => dispatch(communityActions.setPage(page)), [dispatch]);
  const postCategory = useParams().category;

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchData = useCallback(async (postCategory = '', setPosts: React.Dispatch<React.SetStateAction<Post[]>>) => {
    try {
      setLoading(true);
      let result;
      switch (postCategory) {
        case 'all':
          result = await getAllFeeds();
          break;
        case 'free':
          result = await getAllFreeFeeds();
          break;
        case 'gather':
          result = await getAllGatherFeeds();
          break;
        case 'review':
          result = await getAllReviewFeeds();
          break;
        default:
          result = [];
      }
      setPosts(result);
      setLoading(false);
    } catch (err) {
      alert(err);
    }
  }, []);

  useEffect(() => {
    fetchData(postCategory, setPosts);
  }, [fetchData, postCategory]);

  // 필터 하나라도 사용 유무
  const useFilter = filterCategory.use || filterAddress.use || filterDate.use;
  const originalPost: Post[] | undefined = useMemo(() => {
    if (useFilter) {
      //스토어만 따로 맵핑
      const stores: Store[] | undefined =
        posts && posts.map((post: Post) => post.store_id).filter((value): value is Store => Boolean(value));
      // 필터링된 스토어리스트
      const useFilterStoreList = stores && filterFunc(stores, filterAddress, filterCategory, filterDate);
      // 필터링된 게시글들
      const useFilterPosts = posts?.filter((post) =>
        useFilterStoreList?.some((store) => store._id === post.store_id?._id),
      );
      return useFilterPosts;
    } else {
      return posts;
    }
  }, [useFilter, posts, filterAddress, filterCategory, filterDate]);

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
  }, [setTotalPage, dividedPost]);

  useEffect(() => {
    // 탭 이동 시 페이지 초기화
    setPage(1);
  }, [postCategory, setPage, originalPost]);

  return (
    <PostList>
      {loading
        ? 'loading...'
        : dividedPost[page - 1]?.map((post) => (
            <li key={post._id}>
              <Link to={CLIENT_PATH.POST.replace(':postId', post._id)}>
                <PostItem post={post} />
              </Link>
            </li>
          ))}
    </PostList>
  );
};

export default PostListItemContainer;
