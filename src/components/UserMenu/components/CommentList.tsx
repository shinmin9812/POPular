import { useVirtualizer } from '@tanstack/react-virtual';
import { useInfiniteQuery } from '@tanstack/react-query';
import { CSSProperties, useEffect, useRef, useState } from 'react';
import { Comment } from '../../../types/comment';
import styled from 'styled-components';
import CommentItem from './CommentItem';
import RecommentItem from './RecommentItem';
import getDateFunc from '../../../utils/getDateFunc';

const getComments = async (
  _limit: number,
  offset = 1,
  userId: string,
): Promise<{ rows: Comment[]; nextOffset: number; hasNextPage: boolean }> => {
  try {
    const res = await fetch(`http://34.22.81.36:3000/comments/user/${userId}?pageIndex=${offset}`, {
      method: 'GET',
    });
    const data = await res.json();
    const rows: Comment[] = data.docs; // length: 한번에 불러오는 데이터 수
    await new Promise((r) => setTimeout(r, 500));
    return { rows, nextOffset: offset + 1, hasNextPage: data.hasNextPage };
  } catch (err: any) {
    throw new Error(err.message);
  }
};

type CommentGetTotalSizeProps = {
  height: number;
  style?: CSSProperties;
};

type CommentItemContainerProps = {
  size: number;
  start: number;
};

const CommentList = () => {
  const [userId, setUserId] = useState('');
  const getUserInfo = async () => {
    try {
      const response = await fetch('http://34.22.81.36:3000/auth/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) {
        throw new Error('유저 정보를 불러올 수 없습니다.');
      }
      const data = await response.json();
      setUserId(data._id);
    } catch (err: any) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    getUserInfo();
  }, []);

  const { status, data, error, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['comments'],
    (ctx) => getComments(0, ctx.pageParam, userId),
    {
      getNextPageParam: (lastGroup, groups) => {
        const hasNextPage = lastGroup.hasNextPage;
        return hasNextPage ? groups.length + 1 : undefined;
      },
      enabled: !!userId,
    },
  );

  const allRows: Comment[] = data ? data.pages.flatMap<Comment>((d) => d.rows) : [];

  const parentRef = useRef(null);

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? allRows.length + 1 : allRows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 140,
    overscan: 7,
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
        <CommentContainer ref={parentRef}>
          <CommentGetTotalSize height={rowVirtualizer.getTotalSize()}>
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const isLoaderRow = virtualRow.index > allRows.length - 1;
              const comment: Comment = allRows[virtualRow.index];

              return (
                <CommentItemContainer key={virtualRow.index} size={virtualRow.size} start={virtualRow.start - 120}>
                  {isLoaderRow ? (
                    hasNextPage ? (
                      <Loading>
                        <img src="/images/loading.gif" alt="loading" />
                      </Loading>
                    ) : (
                      'Nothing more to load'
                    )
                  ) : (
                    comment &&
                    comment.parent &&
                    (comment.parent.type === 'Feed' ? (
                      <CommentItem
                        parentId={comment.parent.id}
                        comment={comment.content}
                        date={getDateFunc(comment.updatedAt)}
                      />
                    ) : (
                      <RecommentItem
                        parentId={comment.parent.id}
                        recomment={comment.content}
                        date={getDateFunc(comment.updatedAt)}
                      />
                    ))
                  )}
                </CommentItemContainer>
              );
            })}
          </CommentGetTotalSize>
        </CommentContainer>
      )}
    </Container>
  );
};

export default CommentList;

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

const CommentContainer = styled.div`
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

const CommentGetTotalSize = styled.div<CommentGetTotalSizeProps>`
  height: ${(props) => props.height}px;
  width: 100%;
  margin: 0 auto;
  position: relative;
`;

const CommentItemContainer = styled.div<CommentItemContainerProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${(props) => props.size}px;
  margin: 0;
  transform: translateY(${(props) => props.size + props.start}px);
`;
