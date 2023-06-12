import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Comment } from '../types/comment';
import CommentList from '../components/UserMenu/components/CommentList';
import MenuList from '../components/UserMenu/components/MenuList';

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
    <Container>
      <MenuListContainer>
        <MenuList />
      </MenuListContainer>
      <ContentContainer>
        <Title>내가 쓴 댓글</Title>
        <CommentList comments={comments} />
      </ContentContainer>
    </Container>
  );
};

export default MyCommentPage;

const Container = styled.div`
  width: 100%;
  display: flex;
`;

const MenuListContainer = styled.div`
  display: none;
  @media screen and (min-width: 768px) {
    margin: 50px 20px;
    display: block;
    width: 200px;

    & > div {
      width: 200px;
      position: sticky;
      top: 100px;
    }
    div > a,
    div > div {
      width: 200px;
      height: 55px;
      font-size: var(--font-regular);
      :hover {
        font-size: calc(var(--font-regular) + 2px);
      }
    }
  }
`;

const ContentContainer = styled.div`
  flex: 1;

  & li {
    margin: 10px 20px;
    border-radius: 8px;
  }
`;

const Title = styled.h1`
  font-size: 25px;
  color: var(--color-main);
  margin-bottom: 20px;
  margin-left: 20px;
`;
