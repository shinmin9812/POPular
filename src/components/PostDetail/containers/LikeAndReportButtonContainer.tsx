import LikesAndReports from '../components/LikeAndReportButton';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

const LikesAndReportsContainer = () => {
  const postId = useParams().postId;

  async function fetchData() {
    const response = await fetch(`http://34.22.81.36:3000/posts/${postId}`);
    const result = await response.json();
  }

  useEffect(() => {
    fetchData();
  }, []);
};
