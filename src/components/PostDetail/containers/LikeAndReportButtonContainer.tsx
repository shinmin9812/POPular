import LikesAndReports from '../components/LikeAndReportButton';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

const LikesAndReportsContainer = () => {
  const postId = useParams().postId;

  async function fetchData() {
    const response = await fetch(`http://34.22.81.36:3000/feeds/${postId}`, {
      method: 'PATCH',
      body: JSON.stringify({ title: '변경 테스트' }),
    });
    const result = await response.json();
    console.log(result);
  }

  // useEffect(() => {
  //   fetchData();
  // }, []);

  return <LikesAndReports></LikesAndReports>;
};

export default LikesAndReportsContainer;
