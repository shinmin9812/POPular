import { useVirtualizer } from '@tanstack/react-virtual';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef, CSSProperties } from 'react';
import { Post } from '../../../types/post';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PostItem from '../components/PostItem';

async function getFeeds(
  _limit: number,
  offset: number = 1,
): Promise<{ rows: Post[]; nextOffset: number; hasNextPage: boolean }> {
  const res = await fetch(
    `http://34.22.81.36:3000/feeds/user/648490f8dde175dd0d146256?pageIndex=${offset}&order=desc`,
    {
      method: 'GET',
    },
  );
  const data = await res.json();
  const rows: Post[] = data.docs; // length: 한번에 불러오는 데이터 수
  await new Promise((r) => setTimeout(r, 500));
  return { rows, nextOffset: offset + 1, hasNextPage: data.hasNextPage };
}

// 스타일 컴포넌트 type
type PostgetTotalSizeProps = {
  height: number;
  style?: CSSProperties;
};

type PostItemContainerProps = {
  size: number;
  start: number;
};

const PagePostList = () => {
  const { status, data, error, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['feeds'],
    (ctx) => getFeeds(0, ctx.pageParam),
    {
      getNextPageParam: (lastGroup, groups) => {
        const hasNextPage = lastGroup.hasNextPage;
        return hasNextPage ? groups.length + 1 : undefined;
      },
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
      ) : (
        <PostContainer ref={parentRef}>
          <PostgetTotalSize height={rowVirtualizer.getTotalSize()}>
            {rowVirtualizer.getVirtualItems().map((virtualRow: any) => {
              const isLoaderRow = virtualRow.index > allRows.length - 1;
              const post: Post = allRows[virtualRow.index];
              return (
                <PostItemContainer key={virtualRow.index} size={virtualRow.size} start={virtualRow.start}>
                  {isLoaderRow ? (
                    hasNextPage ? (
                      <Loading>
                        <img src="/images/loading.gif" alt="loading" />
                      </Loading>
                    ) : (
                      'Nothing more to load'
                    )
                  ) : (
                    <PostItemContainerBox>
                      <Link to={`/community/post/${post._id}`}>
                        <PostItem post={post} />
                      </Link>
                    </PostItemContainerBox>
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

const Container = styled.div`
  position: static;
  margin-top: 30px;
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

const PostContainer = styled.div`
  height: calc(100vh - 460px);
  width: 100%;
  overflow: auto;
  padding: 10px;
  position: absolute;
  width: 100%;
  left: 50%;
  width: 100%;
  transform: translateX(-50%);
  z-index: 0;

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
  width: 1024px;
  margin: 0 auto;
  position: relative;

  @media all and (min-width: 768px) and (max-width: 1023px) {
    width: 100%;
  }

  @media all and (max-width: 767px) {
    width: 100%;
  }
`;

const PostItemContainer = styled.div<PostItemContainerProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${(props) => props.size}px;
  transform: translateY(${(props) => props.start}px);
`;

const PostItemContainerBox = styled.div`
  box-sizing: border-box;
  padding: 20px 20px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid var(--color-light-gray);
  transition: all 0.3s;
  box-shadow: 1px 1px 10px #eee;
  margin-bottom: 10px;
  border-radius: 8px;

  &:hover {
    cursor: pointer;
    transform: translateY(-4px);
    background-color: #fff;
    filter: brightness(0.97);
  }
`;

export default PagePostList;
