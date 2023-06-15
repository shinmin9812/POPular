import LikesAndReports from '../components/LikeAndReportButton';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../../Hooks/useSelectorHooks';
import { PostDetailActions } from '../PostDetailSlice';
import { API_PATH } from '../../../constants/path';
import callApi from '../../../utils/callApi';

export type LikeAndReportBodyType = {
  like?: string[];
  report?: string[];
};

const LikesAndReportsContainer = () => {
  const postId = useParams().postId;
  const UserData = useAppSelector((state) => state.UserSlice.user);
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
    UserData && setCheckLike(likes.includes(UserData._id));
    UserData && setCheckReport(reports.includes(UserData._id));
  }, [UserData, likes, reports]);

  async function FetchData(isLike: string) {
    if (!UserData) {
      alert('로그인이 필요합니다.');
      return;
    }
    const data = { [isLike]: UserData._id };
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
