import { Navigate, Outlet } from 'react-router-dom';
import { CLIENT_PATH } from './constants/path';
import { useGetValidToken } from './api/AuthApi';

const AuthChecker = () => {
  const { data, isFetched } = useGetValidToken();

  if (isFetched) {
    return data!._id ? (
      <Outlet />
    ) : (
      <>
        {alert('로그인을 해주세요!')}
        <Navigate to={CLIENT_PATH.LOGIN} />
      </>
    );
  }

  return <></>;
};

export default AuthChecker;
