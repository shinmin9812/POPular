import styled from 'styled-components';
import { Post } from '../types/post';
import { Comment } from '../types/comment';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../Hooks/useSelectorHooks';
import { PostDetailActions } from '../components/PostDetail/PostDetailSlice';
import PostInfo from '../components/PostDetail/components/PostInfo';
import StoreWrap from '../components/PostDetail/components/StoreWrap';
import StoreItem from '../components/common/Store/StoreItem';
import PostContent from '../components/PostDetail/components/PostContent';
import CommentListContainer from '../components/PostDetail/containers/CommentListContainer';
import UpdateAndDeleteContainer from '../components/PostDetail/containers/UpdateAndDeleteButtonContainer';
import LikesAndReportsContainer from '../components/PostDetail/containers/LikeAndReportButtonContainer';
import CommentInputContainer from '../components/PostDetail/containers/CommentInputContainer';
import StarIcon from '../components/common/Icons/StarIcon';
import { getComments } from '../api/CommentApi';
import { useQuery } from '@tanstack/react-query';
import MetaTag from '../components/SEO/MetaTag';

const Container = styled.div`
  width: 100%;
`;

const FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: auto;
`;

const RatingsWrap = styled.div`
  display: flex;
  align-items: center;
  padding: 0 0 15px 20px;
  span {
    margin-right: 5px;
  }
`;

async function fetchData(postId = '') {
  const response = await fetch(`http://34.22.81.36:3000/feeds/${postId}`);
  const result: Post = await response.json();
  return result;
}
const PostDetailPage = () => {
  const postId = useParams().postId;
  const [post, setPost] = useState<Post | null>(null);
  const comments = useAppSelector((state) => state.PostDetailSlice.comment);
  const dispatch = useAppDispatch();
  const setComments = (comments: Comment[]) => {
    return dispatch(PostDetailActions.setComment(comments));
  };
  const setLikes = (likes: string[]) => {
    return dispatch(PostDetailActions.setLikes(likes));
  };
  const setReports = (reports: string[]) => {
    return dispatch(PostDetailActions.setReports(reports));
  };

  useEffect(() => {
    getComments(postId, setComments);
  }, []);

  const { data } = useQuery<Post>(['getPost'], () => {
    return fetchData(postId);
  });
  useEffect(() => {
    if (data) {
      setPost(data);
      setLikes(data.likes);
      setReports(data.reports);
    }
  }, [data]);

  // post가 null일 경우 로딩 상태를 표시
  if (post === null) {
    return <div>Loading...</div>;
  }
  return (
    <Container>
      <MetaTag title={`POPULAR | ${post.title}`} />
      <PostInfo
        boardType={post.board}
        title={post.title}
        nickName={post.author.nickname}
        updatedAt={post.updatedAt}
        likes={post.likes.length}
        views={post.views}
        comments={comments.length}
      />
      {post.store_id && (
        <StoreWrap>
          <StoreItem store={post.store_id} />
          {post.ratings && (
            <RatingsWrap>
              <span>평점:</span>
              {Array(post.ratings)
                .fill(0)
                .map((i, index) => (
                  <StarIcon key={index} fill="var(--color-sub)" width={20} />
                ))}
            </RatingsWrap>
          )}
        </StoreWrap>
      )}
      <PostContent content={post ? post.content : ''}></PostContent>
      <FlexDiv>
        <LikesAndReportsContainer />
        <UpdateAndDeleteContainer />
      </FlexDiv>
      <CommentListContainer />
      <CommentInputContainer />
    </Container>
  );
};

export default PostDetailPage;
