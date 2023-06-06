import styled from 'styled-components';
import { BoardTypes } from '../types/board';
import { Post } from '../types/post';
import { useEffect, useState } from 'react';
import PostInfo from '../components/PostDetail/components/PostInfo';
import PostContent from '../components/PostDetail/components/PostContent';
import LikesAndReports from '../components/PostDetail/components/LikeAndReportButton';
import CommentsList from '../components/PostDetail/components/CommentsList';
import Pagination from '../components/common/Pagination/Pagination';
import CommentInput from '../components/PostDetail/components/CommentInput';
import StarIcon from '../components/common/Icons/StarIcon';
import { useParams } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
`;

const PostDetailPage = () => {
  const postId = useParams().postId;
  const [post, setPost] = useState<Post>();
  const [currPage, setPage] = useState(1);
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await fetch(`http://34.22.81.36:3000/posts/${postId}`);
    const result: Post = await response.json();
    setPost(result);
  }

  return (
    <Container>
      <PostInfo
        boardType={post ? post.board : BoardTypes.free}
        title={post ? post.title : ''}
        nickName={post ? post.author.nickname : ''}
        updatedAt={post ? post.updatedAt : ''}
        likes={post ? post.likes.length : 0}
        comments={post ? post.comments.length : 0}
      />
      {post && (
        <div>
          평점 :
          {Array(post?.ratings)
            .fill(0)
            .map((i, index) => (
              <StarIcon key={index} />
            ))}
        </div>
      )}
      <PostContent img={post ? post.author.profile : ''} content={post ? post.content : ''}></PostContent>
      <LikesAndReports />
      <CommentsList comments={post ? post.comments : undefined} />
      <Pagination currPage={currPage} setPage={setPage} />
      <CommentInput />
    </Container>
  );
};

export default PostDetailPage;
