import { useVirtualizer } from '@tanstack/react-virtual';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef, CSSProperties, useState } from 'react';
import { Post } from '../../../types/post';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PostItem from '../../common/Post/PostItem';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { useParams } from 'react-router-dom';
import { LinkHandler } from '../../../utils/ linkHandler';

async function getFeeds(
  _limit: number,
  offset = 1,
  filter?: string | number | readonly string[],
  userId?: string | undefined,
): Promise<{ rows: Post[]; nextOffset: number; hasNextPage: boolean }> {
  const res = await fetch(`http://34.22.81.36:3000/feeds/user/${userId}?pageIndex=${offset}&order=${filter}`, {
    method: 'GET',
  });
  const data = await res.json();
  const rows: Post[] = data.docs; // length: 한번에 불러오는 데이터 수
  await new Promise((r) => setTimeout(r, 500));
  return { rows, nextOffset: offset + 1, hasNextPage: data.hasNextPage };
}

type PostgetTotalSizeProps = {
  height: number;
  style?: CSSProperties;
};

type PostItemContainerProps = {
  size: number;
  start: number;
};

const PagePostList = () => {
  const filter = useSelector((state: RootState) => state.UserSlice.filter);
  const { userId } = useParams();
  const [filterLoading, setFilterLoading] = useState(false);
  const { status, data, error, isFetchingNextPage, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery(
    ['feeds'],
    (ctx) => getFeeds(0, ctx.pageParam, filter, userId),
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setFilterLoading(true);
        await refetch();
        setFilterLoading(false);
      } catch (error) {
        setFilterLoading(false);
      }
    };
    fetchData();
  }, [filter, refetch, userId]);

  if (filterLoading) {
    return (
      <Container>
        <Loading>
          <img src="/images/loading.gif" alt="loading" />
        </Loading>
      </Container>
    );
  }

  return (
    <Container>
      {status === 'loading' && !data ? (
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
                    <Link to={`/community/post/${post._id}`} onClick={LinkHandler}>
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

const Container = styled.div`
  position: static;
  margin-top: 30px;

  @media all and (max-width: 767px) {
    margin-top: 10px;
  }
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
  width: 100%;
  text-align: center;
  padding: 50px 0px;
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

export default PagePostList;
