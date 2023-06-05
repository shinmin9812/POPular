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

const Container = styled.div`
  width: 100%;
`;

const PostDetailPage = () => {
  const [post, setPost] = useState<Post[]>();
  const [currPage, setPage] = useState(1);
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await fetch('/post/all');
    const result: Post[] = await response.json();

    //const response2 = await fetch(`/post/board/free`);
    //const result2: Post = await response2.json();
    setPost(result);
  }
  const rating = [1, 2, 3];
  // for(let i =0; i < post.rating; i++){
  //   rating.push(i);
  // }
  return (
    <Container>
      <PostInfo
        boardType={post ? post[0].board : BoardTypes.free}
        title={post ? post[0].title : ''}
        nickName={post ? post[0].author.nickname : ''}
        updatedAt={post ? post[0].updatedAt : ''}
        likes={post ? post[0].likes : 0}
        comments={post ? post[0].comments.length : 0}
      />
      {rating && (
        <div>
          평점 :
          {rating.map((i) => (
            <StarIcon key={i} />
          ))}
        </div>
      )}
      <PostContent img={post ? post[0].author.profile : ''} content={post ? post[0].content : ''}></PostContent>
      <LikesAndReports />
      <CommentsList comments={post ? post[0].comments : undefined} />
      <Pagination currPage={currPage} setPage={setPage} />
      <CommentInput />
    </Container>
  );
};

export default PostDetailPage;
