import { Navigate, Outlet } from 'react-router-dom';
import { CLIENT_PATH } from './constants/path';
import { useGetTokenValid } from './api/authApi';

interface Props {
  admin?: boolean;
}

const AuthChecker = ({ admin }: Props) => {
  const { data, isFetching } = useGetTokenValid();

  if (isFetching) return <></>;

  if (admin) {
    return data!.role === 'admin' ? (
      <Outlet />
    ) : (
      <>
        {alert('관리자 전용 페이지입니다!')}
        <Navigate to="/" />
      </>
    );
  }

  return data!._id ? (
    <Outlet />
  ) : (
    <>
      {alert('로그인을 해주세요!')}
      <Navigate to={CLIENT_PATH.LOGIN} />
    </>
  );
};

export default AuthChecker;
