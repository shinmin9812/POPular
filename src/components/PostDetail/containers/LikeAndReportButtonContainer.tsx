import LikesAndReports from '../components/LikeAndReportButton';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../../Hooks/useSelectorHooks';
import { PostDetailActions } from '../PostDetailSlice';
import { API_PATH } from '../../../constants/path';
import callApi from '../../../utils/callApi';
import { User } from '../../../types/user';

export type LikeAndReportBodyType = {
  like?: string[];
  report?: string[];
};

const getUserInfo = async (setUserData: React.Dispatch<React.SetStateAction<User | undefined>>) => {
  try {
    const response = await callApi('GET', API_PATH.AUTH.GET.PROFILE);
    if (response.ok) {
      const data = await response.json();
      setUserData(data);
      return;
    } else return;
  } catch (err: any) {
    throw new Error(err);
  }
};

const LikesAndReportsContainer = () => {
  const postId = useParams().postId;
  const [userData, setUserData] = useState<User>();
  const likes = useAppSelector((state) => state.PostDetailSlice.likes);
  const reports = useAppSelector((state) => state.PostDetailSlice.reports);
  const dispatch = useAppDispatch();
  const setLikes = (likes: string[]) => {
    return dispatch(PostDetailActions.setLikes(likes));
  };
  const setReports = (reports: string[]) => {
    return dispatch(PostDetailActions.setReports(reports));
  };

  const [checkLike, setCheckLike] = useState<boolean>();
  const [checkReport, setCheckReport] = useState<boolean>();

  useEffect(() => {
    getUserInfo(setUserData);
  }, []);
  useEffect(() => {
    userData && setCheckLike(likes.includes(userData._id));
    userData && setCheckReport(reports.includes(userData._id));
  }, [userData, likes, reports]);

  async function FetchData(isLike: string) {
    const data = { [isLike]: userData?._id };
    const response = await callApi(
      'PATCH',
      `${API_PATH.POST.GET.BY_ID.replace(':postId', postId ? postId : '')}/${isLike}`,
      data,
    );
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
