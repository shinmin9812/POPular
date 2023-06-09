import styled from 'styled-components';
import { Post } from '../types/post';
import { useEffect, useState } from 'react';
import PostInfo from '../components/PostDetail/components/PostInfo';
import StoreWrap from '../components/PostDetail/components/StoreWrap';
import StoreItem from '../components/common/Store/StoreItem';
import PostContent from '../components/PostDetail/components/PostContent';
import CommentsList from '../components/PostDetail/components/CommentsList';
import UpdateAndDeleteContainer from '../components/PostDetail/containers/UpdateAndDeleteButtonContainer';
import LikesAndReportsContainer from '../components/PostDetail/containers/LikeAndReportButtonContainer';
import { useParams } from 'react-router-dom';
import CommentInputContainer from '../components/PostDetail/containers/CommentInputContainer';
const Container = styled.div`
  width: 100%;
`;

const PostDetailPage = () => {
  const postId = useParams().postId;
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await fetch(`http://34.22.81.36:3000/feeds/${postId}`);
    const result: Post = await response.json();
    setPost(result);
  }
  // post가 null일 경우 로딩 상태를 표시
  if (post === null) {
    return <div>Loading...</div>;
  }
  return (
    <Container>
      <PostInfo
        boardType={post.board}
        title={post.title}
        nickName={post.author.nickname}
        updatedAt={post.updatedAt}
        likes={post.likes.length}
        views={post.views}
        comments={post.comments.length}
      />
      {post.store_id && (
        <StoreWrap>
          <StoreItem store={post.store_id} />
        </StoreWrap>
      )}
      <PostContent content={post ? post.content : ''} rating={post ? post.ratings : 0}></PostContent>
      <UpdateAndDeleteContainer />
      <LikesAndReportsContainer />
      <CommentsList comments={post ? post.comments : undefined} />
      <CommentInputContainer />
    </Container>
  );
};

export default PostDetailPage;
