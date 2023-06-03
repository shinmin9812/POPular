import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import PostList from '../components/PostList';
import { loadPost } from '../UserSlice';
import { useInView } from 'react-intersection-observer';
import { Post } from '../../../types/post';

interface Props {
  filter: string | null;
  loadPostLoading: boolean;
  loadPostDone: boolean;
  loadPostError: string | null;
  loadList: Post[];
}

const ProfilePostList = () => {
  const dispatch = useDispatch();
  const [ref, inView] = useInView();
  const posts = useSelector((state: { UserSlice: Props }) => {
    return state.UserSlice.loadList;
  });

  console.log(posts);

  useEffect(() => {
    if (posts.length === 0) {
      console.log('시작');
      const loadPostAction = loadPost() as any;
      dispatch(loadPostAction);
      return;
    }
  }, []);

  useEffect(() => {
    if (posts.length !== 0 && inView) {
      console.log('첫 로딩 이후 무한 스크롤');
      const loadPostAction = loadPost() as any;
      dispatch(loadPostAction);
      //dispatch(loadPost());
    }
  }, [inView]);

  return (
    <Container>
      <PostList posts={posts} />
      <div ref={ref} />
    </Container>
  );
};

const Container = styled.div``;

export default ProfilePostList;
