import styled from 'styled-components';
import { Post } from '../types/post';
import { Comment } from '../types/comment';
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
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
import MetaTag from '../components/SEO/MetaTag';
import { API_PATH } from '../constants/path';

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

async function fetchData(
  postId = '',
  setPost: React.Dispatch<React.SetStateAction<Post | null>>,
  navigate: NavigateFunction,
) {
  try {
    const response = await fetch(API_PATH.POST.GET.BY_ID.replace(':postId', postId));
    if (response.status === 404) {
      throw new Error('해당 페이지가 존재하지 않습니다.');
    }
    const result: Post = await response.json();
    setPost(result);
  } catch (err: any) {
    alert(err.message);
    navigate(-1);
  }
}

const PostDetailPage = () => {
  const navigate = useNavigate();
  const postId = useParams().postId;
  const [post, setPost] = useState<Post | null>(null);
  const comments = useAppSelector((state) => state.PostDetailSlice.comment);
  const dispatch = useAppDispatch();
  const setComments = useCallback(
    (comments: Comment[]) => {
      return dispatch(PostDetailActions.setComment(comments));
    },
    [dispatch],
  );
  const setLikes = useCallback(
    (likes: string[]) => {
      return dispatch(PostDetailActions.setLikes(likes));
    },
    [dispatch],
  );

  const setReports = useCallback(
    (reports: string[]) => {
      return dispatch(PostDetailActions.setReports(reports));
    },
    [dispatch],
  );

  useEffect(() => {
    fetchData(postId, setPost, navigate);
  }, []);

  useEffect(() => {
    getComments(postId, setComments);
  }, [postId, setComments]);

  useEffect(() => {
    if (post) {
      setPost(post);
      setLikes(post.likes);
      setReports(post.reports);
    }
  }, [setPost, setLikes, setReports, post]);

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
        authorId={post.author._id}
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
        <UpdateAndDeleteContainer post={post} />
      </FlexDiv>
      <CommentListContainer />
      <CommentInputContainer />
    </Container>
  );
};

export default PostDetailPage;
