import { Post } from '../../../types/post';
import { useEffect, useCallback, useMemo } from 'react';
import { useAppSelector, useAppDispatch } from '../../../Hooks/useSelectorHooks';
import { Link } from 'react-router-dom';
import filterFunc from '../../../utils/filterFunc';
import { Store } from '../../../types/store';
import { communityActions } from '../CommunitySlice';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { API_PATH, CLIENT_PATH } from '../../../constants/path';
import PostItem from '../../common/Post/PostItem';

async function fetchData(postCategory = 'all') {
  try {
    let response;
    let result;
    switch (postCategory) {
      case 'all':
        response = await fetch(API_PATH.POST.GET.ALL);
        result = await response.json();
        break;
      case 'free':
        response = await fetch(API_PATH.POST.GET.ALL_FREE_FEEDS);
        result = await response.json();
        break;
      case 'gather':
        response = await fetch(API_PATH.POST.GET.ALL_GATHER_FEEDS);
        result = await response.json();
        break;
      case 'review':
        response = await fetch(API_PATH.POST.GET.ALL_REVIEW_FEEDS);
        result = await response.json();
        break;
    }
    return result;
  } catch (err) {
    alert(err);
    return err;
  }
}

const PostListItemContainer = () => {
  const page = useAppSelector((state) => state.CommunitySlice.page.currPage);
  const filterCategory = useAppSelector((state) => state.CommunitySlice.categoryFilter);
  const filterAddress = useAppSelector((state) => state.CommunitySlice.addressFilter);
  const filterDate = useAppSelector((state) => state.CommunitySlice.durationFilter);
  const dispatch = useAppDispatch();
  const setTotalPage = useCallback((page: number[]) => dispatch(communityActions.setTotalPage(page)), [dispatch]);
  const setPage = useCallback((page: number) => dispatch(communityActions.setPage(page)), [dispatch]);
  const postCategory = useParams().category;

  const { data, isFetching } = useQuery<Post[]>(['getPosts', postCategory], () => {
    return fetchData(postCategory);
  });

  // 필터 하나라도 사용 유무
  const useFilter = filterCategory.use || filterAddress.use || filterDate.use;
  const originalPost: Post[] | undefined = useMemo(() => {
    if (useFilter) {
      //스토어만 따로 맵핑
      const stores: Store[] | undefined =
        data && data.map((post: Post) => post.store_id).filter((value): value is Store => Boolean(value));
      // 필터링된 스토어리스트
      const useFilterStoreList = stores && filterFunc(stores, filterAddress, filterCategory, filterDate);
      // 필터링된 게시글들
      const useFilterPosts = data?.filter((post) =>
        useFilterStoreList?.some((store) => store._id === post.store_id?._id),
      );
      return useFilterPosts;
    } else {
      return data;
    }
  }, [useFilter, data, filterAddress, filterCategory, filterDate]);

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

  if (isFetching) {
    return <div>loading...</div>;
  }
  return (
    <ul>
      {dividedPost[page - 1]?.map((post) => (
        <li key={post._id}>
          <Link to={CLIENT_PATH.POST.replace(':postId', post._id)}>
            <PostItem post={post} />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default PostListItemContainer;
