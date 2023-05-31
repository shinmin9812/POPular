import styled from 'styled-components';
import { Post } from '../types/post';
import { useEffect } from 'react';

const Container = styled.div`
  width: 100%;
  height: 1000px;
  background-color: #eaf855;
`;

const CommunityPage = () => {
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await fetch('/post/all');
    const result: Post[] = await response.json();

    const response2 = await fetch(`/post/board/free`);
    const result2: Post = await response2.json();

    console.log(result);
    console.log(result2);
  }
  return <Container></Container>;
};

export default CommunityPage;
