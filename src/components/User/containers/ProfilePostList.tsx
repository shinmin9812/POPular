import { useEffect } from 'react';
import styled from 'styled-components';
import PostItem from '../components/PostItem';
import { Post } from '../../../types/post';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const ProfilePostList = () => {
  const [ref, inView] = useInView();
  const { userId } = useParams();

  const getFeedPost = async ({ pageParam = 1 }) => {
    const res = await fetch(`http://34.22.81.36:3000/feeds/user/${userId}?pageIndex=${pageParam}&order=desc`);
    const data = await res.json();
    return {
      board_page: data,
      current_page: pageParam,
      isLast: data.last,
    };
  };

  const { data, fetchNextPage, hasNextPage, isSuccess, isLoading } = useInfiniteQuery(['feeds'], getFeedPost, {
    getNextPageParam: (lastPage) => {
      if (!lastPage.isLast) return lastPage.current_page + 1;
      return undefined;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  if (isLoading) return <h4>Loading...</h4>;

  return (
    <Container>
      {isSuccess && data.pages ? (
        <div>
          {data.pages.map((page_data, page_num) => {
            console.log(data);
            const board_page = page_data.board_page;
            return board_page.docs.map((item: Post, idx: number) => {
              if (data.pages.length - 1 === page_num && board_page.docs.length - 1 === idx) {
                return (
                  <div className="post-items" ref={ref} key={item._id}>
                    <Link to={`/community/post/${item._id}`}>
                      <PostItem post={item} />
                    </Link>
                  </div>
                );
              } else {
                return (
                  <div className="post-items" key={item._id}>
                    <Link to={`/community/post/${item._id}`}>
                      <PostItem post={item} />
                    </Link>
                  </div>
                );
              }
            });
          })}
        </div>
      ) : (
        <div>게시글이 없습니다.</div>
      )}
    </Container>
  );
};

const Container = styled.div`
  margin-top: 20px;

  .post-items {
    box-sizing: border-box;
    padding: 20px 15px;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid var(--color-light-gray);
    transition: all 0.3s;
    box-shadow: 1px 1px 10px #eee;
    margin-bottom: 10px;
    border-radius: 8px;
    transform: translateY(0px);

    &:hover {
      cursor: pointer;
      transform: translateY(-4px);
      background-color: #fff;
      filter: brightness(0.97);
    }
  }
`;

export default ProfilePostList;
