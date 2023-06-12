import LikesAndReports from '../components/LikeAndReportButton';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../../Hooks/useSelectorHooks';
import { PostDetailActions } from '../PostDetailSlice';
import { API_PATH } from '../../../constants/path';

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
    throw new Error(err);
    return null;
  }
};

const LikesAndReportsContainer = () => {
  const postId = useParams().postId;
  const likes = useAppSelector((state) => state.PostDetailSlice.likes);
  const reports = useAppSelector((state) => state.PostDetailSlice.reports);
  const dispatch = useAppDispatch();
  const setLikes = (likes: string[]) => {
    return dispatch(PostDetailActions.setLikes(likes));
  };
  const setReports = (reports: string[]) => {
    return dispatch(PostDetailActions.setReports(reports));
  };

  const [isMember, setIsMember] = useState<string>();

  const [checkLike, setCheckLike] = useState<boolean>();
  const [checkReport, setCheckReport] = useState<boolean>();

  useEffect(() => {
    getUserInfo(setIsMember);
  }, []);
  useEffect(() => {
    isMember && setCheckLike(likes.includes(isMember));
    isMember && setCheckReport(reports.includes(isMember));
  }, [isMember, likes, reports]);

  async function FetchData(isLike: string) {
    const data = { [isLike]: isMember };
    const response = await fetch(`${API_PATH.POST.GET.BY_ID.replace(':postId', postId ? postId : '')}/${isLike}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    isLike === 'like' ? setLikes(result.likes) : setReports(result.reports);
  }

  return (
    <LikesAndReports
      checkLike={checkLike}
      checkReport={checkReport}
      likes={likes.length}
      reports={reports.length}
      onClick={FetchData}
    ></LikesAndReports>
  );
};

export default LikesAndReportsContainer;
