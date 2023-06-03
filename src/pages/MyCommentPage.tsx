import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Comment } from '../types/comment';
import CommentList from '../components/UserMenu/components/CommentList';

const MyCommentPage = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await fetch('/comment/post/123');
    const result: Comment[] = await response.json();

    setComments(result);
  }

  return (
    <div>
      <Title>내가 쓴 댓글</Title>
      <CommentList comments={comments} />
    </div>
  );
};

export default MyCommentPage;

const Title = styled.h1`
  font-size: var(--font-medium);
  color: var(--color-main);
  margin-bottom: 20px;
`;
