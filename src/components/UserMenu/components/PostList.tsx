import { useVirtualizer } from '@tanstack/react-virtual';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { Post } from '../../../types/post';

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

const PostList = () => {
  const { status, data, error, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery(
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
    estimateSize: () => 300,
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
    <div>
      {status === 'loading' ? (
        <p>Loading...</p>
      ) : status === 'error' ? (
        <span>Error: {(error as Error).message}</span>
      ) : (
        <div
          ref={parentRef}
          className="List"
          style={{
            height: `500px`,
            width: `100%`,
            overflow: 'auto',
          }}
        >
          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              width: '100%',
              position: 'relative',
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const isLoaderRow = virtualRow.index > allRows.length - 1;
              const post: Post = allRows[virtualRow.index];
              return (
                <div
                  key={virtualRow.index}
                  className={virtualRow.index % 2 ? 'ListItemOdd' : 'ListItemEven'}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  {isLoaderRow
                    ? hasNextPage
                      ? 'Loading more...'
                      : 'Nothing more to load'
                    : `${post.title} / ${post.updatedAt} / ${post.author}/ Likes ${post.likes}`}
                </div>
              );
            })}
          </div>
        </div>
      )}
      <div>{isFetching && !isFetchingNextPage ? 'Background Updating...' : null}</div>
    </div>
  );
};

export default PostList;
