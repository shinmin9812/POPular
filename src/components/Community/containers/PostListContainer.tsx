import { Post } from '../../../types/post';
import { Store } from '../../../types/store';
import { useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { communityActions } from '../CommunitySlice';
import { useParams } from 'react-router-dom';
import { CLIENT_PATH } from '../../../constants/path';
import { useGetFeeds } from '../../../api/feedApi';
import { useAppSelector, useAppDispatch } from '../../../Hooks/useSelectorHooks';
import filterFunc from '../../../utils/filterFunc';
import PostItem from '../../common/Post/PostItem';
import PostList from '../components/PostList';

const searchFilter = (posts: Post[], value: string) => {
  const normalizedValue = value.normalize(); // 검색어 정규화
  const regex = new RegExp(normalizedValue, 'i');
  const newStores = posts.filter((post) => regex.test(post.title));
  return newStores;
};

const PostListItemContainer = () => {
  const page = useAppSelector((state) => state.CommunitySlice.page.currPage);
  const searchValue = useAppSelector((state) => state.CommunitySlice.searchValue);
  const filterCategory = useAppSelector((state) => state.CommunitySlice.categoryFilter);
  const filterAddress = useAppSelector((state) => state.CommunitySlice.addressFilter);
  const filterDate = useAppSelector((state) => state.CommunitySlice.durationFilter);
  const dispatch = useAppDispatch();
  const setPageGroup = useCallback((page: number[]) => dispatch(communityActions.setPageGroup(page)), [dispatch]);
  const setTotalPage = useCallback((page: number[]) => dispatch(communityActions.setTotalPage(page)), [dispatch]);
  const postCategory = useParams().category;
  const { data, isFetching, isError } = useGetFeeds(postCategory);
  // 필터 하나라도 사용 유무
  const useFilter = filterCategory.use || filterAddress.use || filterDate.use;
  const originalPost: Post[] | undefined = useMemo(() => {
    if (searchValue.length > 0) {
      return data && searchFilter(data, searchValue);
    }
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
  }, [useFilter, data, filterAddress, filterCategory, filterDate, searchValue]);

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
    const totalPage = dividedPost.length;
    const pageCount = 5;
    const pageGroup = Math.ceil(page / pageCount);
    let lastNumber = pageGroup * pageCount;
    if (lastNumber > totalPage) {
      lastNumber = totalPage;
    }
    const firstNumber = lastNumber - (pageCount - 1);
    const newPageGroup = [];
    for (let i = firstNumber; i <= lastNumber; i++) {
      newPageGroup.push(i);
    }
    setPageGroup(newPageGroup);
  }, [page, dividedPost, setPageGroup]);

  if (isError) {
    return <></>;
  }
  return (
    <PostList>
      {isFetching ? (
        <></>
      ) : (
        dividedPost[page - 1]?.map((post) => (
          <li key={post._id}>
            <Link to={CLIENT_PATH.POST.replace(':postId', post._id)}>
              <PostItem post={post} />
            </Link>
          </li>
        ))
      )}
    </PostList>
  );
};

export default PostListItemContainer;
