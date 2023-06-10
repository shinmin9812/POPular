import LikesAndReports from '../components/LikeAndReportButton';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const getUserInfo = async (setIsMember: React.Dispatch<React.SetStateAction<string | undefined>>) => {
  try {
    const response = await fetch('http://34.22.81.36:3000/auth/profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const data = await response.json();
    setIsMember(data._id);
  } catch (err: any) {
    const errorMessage = err as Error;
    console.log(errorMessage);
    return null;
  }
};

const LikesAndReportsContainer = ({ likes, reports }: { likes: number; reports: number }) => {
  const postId = useParams().postId;
  const [isMember, setIsMember] = useState<string>();
  const [_likes, setLikes] = useState<number>(likes);
  const [_reports, setReports] = useState<number>(reports);
  useEffect(() => {
    getUserInfo(setIsMember);
  }, []);

  async function FetchData(isLike: string) {
    const data = { [isLike]: isMember };
    const response = await fetch(`http://34.22.81.36:3000/feeds/${postId}/${isLike}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    isLike === 'like' ? setLikes(result.likes.length) : setReports(result.reports.length);
  }

  return <LikesAndReports likes={_likes} reports={_reports} onClick={FetchData}></LikesAndReports>;
};

export default LikesAndReportsContainer;
