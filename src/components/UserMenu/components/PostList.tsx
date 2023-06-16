import { useVirtualizer } from '@tanstack/react-virtual';
import { useInfiniteQuery } from '@tanstack/react-query';
import { CSSProperties, useEffect, useRef, useState } from 'react';
import { Post } from '../../../types/post';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PostItem from '../../common/Post/PostItem';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

const getFeeds = async (
  _limit: number,
  offset = 1,
  userId: string | undefined,
): Promise<{ rows: Post[]; nextOffset: number; hasNextPage: boolean }> => {
  const res = await fetch(`http://34.22.81.36:3000/feeds/user/${userId}?pageIndex=${offset}`, {
    method: 'GET',
  });
  const data = await res.json();
  const rows: Post[] = data.docs; // length: 한번에 불러오는 데이터 수
  await new Promise((r) => setTimeout(r, 500));
  return { rows, nextOffset: offset + 1, hasNextPage: data.hasNextPage };
};

type PostgetTotalSizeProps = {
  height: number;
  style?: CSSProperties;
};

type PostItemContainerProps = {
  size: number;
  start: number;
};

const PostList = () => {
  const [userId, setUserId] = useState('');

  const userData = useSelector((state: RootState) => state.UserSlice.user);

  useEffect(() => {
    if (userData) {
      setUserId(userData._id);
    }
  }, []);

  const { status, data, error, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['feeds'],
    (ctx) => getFeeds(0, ctx.pageParam, userId),
    {
      getNextPageParam: (lastGroup, groups) => {
        const hasNextPage = lastGroup.hasNextPage;
        return hasNextPage ? groups.length + 1 : undefined;
      },
      enabled: !!userId,
    },
  );

  const allRows: Post[] = data ? data.pages.flatMap<Post>((d) => d.rows) : [];

  const parentRef = useRef(null);

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? allRows.length + 1 : allRows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 135,
    overscan: 0,
  });

  useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();
    if (!lastItem) {
      return;
    }
    if (lastItem.index >= allRows.length - 1 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage, allRows.length, isFetchingNextPage, rowVirtualizer.getVirtualItems()]);

  return (
    <Container>
      {status === 'loading' ? (
        <Loading>
          <img src="/images/loading.gif" alt="loading" />
        </Loading>
      ) : status === 'error' ? (
        <span>Error: {(error as Error).message}</span>
      ) : allRows.length === 0 ? (
        <NonData>작성한 게시물이 없습니다.</NonData>
      ) : (
        <PostContainer ref={parentRef}>
          <PostgetTotalSize height={rowVirtualizer.getTotalSize()}>
            {rowVirtualizer.getVirtualItems().map((virtualRow: any) => {
              const isLoaderRow = virtualRow.index > allRows.length - 1;
              const post: Post = allRows[virtualRow.index];
              if (!post) return <span key={virtualRow.index}></span>;
              return (
                <PostItemContainer key={virtualRow.index} size={virtualRow.size} start={virtualRow.start - 130}>
                  {isLoaderRow ? (
                    hasNextPage ? (
                      <Loading>
                        <img src="/images/loading.gif" alt="loading" />
                      </Loading>
                    ) : (
                      'Nothing more to load'
                    )
                  ) : (
                    <Link to={`/community/post/${post._id}`}>
                      <PostItem post={post} />
                    </Link>
                  )}
                </PostItemContainer>
              );
            })}
          </PostgetTotalSize>
        </PostContainer>
      )}
    </Container>
  );
};

export default PostList;

const Container = styled.div`
  position: static;
  margin-top: 20px;
`;

const Loading = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100px;
  }
`;

const NonData = styled.div`
  font-size: var(--font-medium);
  margin-top: 50px;
  margin: 20px;
  height: 20vh;
  color: var(--color-light-black);
  background-color: var(--color-light-gray);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

const PostContainer = styled.div`
  width: 100%;
  height: calc(100vh - 165px);
  overflow: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--color-main);
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: var(--color-gray);
    border-radius: 10px;
  }
`;

const PostgetTotalSize = styled.div<PostgetTotalSizeProps>`
  height: ${(props) => props.height}px;
  width: 95%;
  margin: 0 auto;
  position: relative;
`;

const PostItemContainer = styled.div<PostItemContainerProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${(props) => props.size}px;
  margin: 0;
  transform: translateY(${(props) => props.size + props.start}px);
`;
