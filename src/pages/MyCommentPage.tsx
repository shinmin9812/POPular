import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Comment } from '../types/comment';
import CommentList from '../components/UserMenu/components/CommentList';
import MetaTag from '../components/SEO/MetaTag';

const MyCommentPage = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch('http://34.22.81.36:3000/comments');
    const result: Comment[] = await response.json();
    setComments(result);
  };

  return (
    <>
      <MetaTag title={`POPular | 내가 쓴 댓글`} />
      <Title>내가 쓴 댓글</Title>
      <CommentList comments={comments} />
    </>
  );
};

export default MyCommentPage;

const Title = styled.h1`
  font-size: var(--font-medium);
  color: var(--color-main);
  margin-bottom: 20px;
`;
