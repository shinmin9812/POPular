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
import { Link } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
`;

const FlexDiv = styled.div`
  position: relative;
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
  setLikes: (likes: string[]) => {
    payload: string[];
    type: 'PostDetail/setLikes';
  },
  setReports: (reports: string[]) => {
    payload: string[];
    type: 'PostDetail/setReports';
  },
) {
  try {
    const response = await fetch(API_PATH.POST.GET.BY_ID.replace(':postId', postId));
    if (response.status === 404) {
      throw new Error('해당 페이지가 존재하지 않습니다.');
    }
    const result: Post = await response.json();
    setPost(result);
    setLikes(result.likes);
    setReports(result.reports);
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
  const setComments = useCallback((comments: Comment[]) => {
    return dispatch(PostDetailActions.setComment(comments));
  }, []);
  const setLikes = (likes: string[]) => {
    return dispatch(PostDetailActions.setLikes(likes));
  };

  const setReports = useCallback(
    (reports: string[]) => {
      return dispatch(PostDetailActions.setReports(reports));
    },
    [dispatch],
  );

  useEffect(() => {
    fetchData(postId, setPost, navigate, setLikes, setReports);
    getComments(postId, setComments);
  }, []);

  // post가 null일 경우 로딩 상태를 표시
  if (post === null) {
    return <div></div>;
  }

  return (
    <Container>
      <MetaTag title={`POPULAR | ${post.title}`} />
      <PostInfo
        boardType={post.board}
        title={post.title}
        nickName={post.author.nickname}
        profile={post.author.profile}
        follower={post.author.follower.length}
        authorId={post.author._id}
        createdAt={post.createdAt}
        views={post.views}
        comments={comments.length}
      />
      {post.store_id && (
        <StoreWrap>
          <Link to={`/store/${post.store_id._id}`}>
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
          </Link>
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
