import { Post } from '../../../types/post';
import { useEffect, useCallback, useMemo } from 'react';
import { useAppSelector, useAppDispatch } from '../../../Hooks/useSelectorHooks';
import { useNavigate, NavigateFunction, Link } from 'react-router-dom';
import filterFunc from '../../../Hooks/filterFunc';
import { Store } from '../../../types/store';
import { communityActions } from '../CommunitySlice';
import { useQuery } from '@tanstack/react-query';

import PostItem from '../../User/components/PostItem';

async function fetchData(tab: string, navigate: NavigateFunction) {
  try {
    let response;
    let result;
    switch (tab) {
      case '전체게시판':
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
    return result;
  } catch (err) {
    alert(err);
    return err;
  }
}

const PostListItemContainer = () => {
  const navigate = useNavigate();
  const tab = useAppSelector((state) => state.CommunitySlice.tab);
  const page = useAppSelector((state) => state.CommunitySlice.page.currPage);
  const filterCategory = useAppSelector((state) => state.CommunitySlice.categoryFilter);
  const filterAddress = useAppSelector((state) => state.CommunitySlice.addressFilter);
  const filterDate = useAppSelector((state) => state.CommunitySlice.durationFilter);
  const dispatch = useAppDispatch();
  const setTotalPage = useCallback((page: number[]) => dispatch(communityActions.setTotalPage(page)), [dispatch]);
  const setPage = useCallback((page: number) => dispatch(communityActions.setPage(page)), [dispatch]);

  const { data, isFetching } = useQuery<Post[]>(['getPosts', tab], () => {
    return fetchData(tab, navigate);
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
  }, [tab, setPage, originalPost]);

  if (isFetching) {
    return <div>loading...</div>;
  }
  return (
    <ul>
      {dividedPost[page - 1]?.map((post) => (
        <li key={post._id}>
          <Link to={`/community/post/${post._id}`}>
            <PostItem post={post} />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default PostListItemContainer;
