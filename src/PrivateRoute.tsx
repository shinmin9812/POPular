import { Navigate } from 'react-router-dom';
import { CLIENT_PATH } from './constants/path';
import { User } from './types/user';

interface Props {
  userData: User | undefined;
  component: JSX.Element;
}

const PrivateRoute = ({ userData, component }: Props) => {
  if (userData) {
    return component;
  } else {
    alert('로그인을 해주세요.');
    return <Navigate to={CLIENT_PATH.LOGIN} />;
  }
};

export default PrivateRoute;
