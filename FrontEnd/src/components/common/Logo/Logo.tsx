import { Link } from 'react-router-dom';
import { CLIENT_PATH } from '../../../constants/path';

const Logo = () => {
  return (
    <Link className="logo" to={CLIENT_PATH.HOME}>
      POPULAR
    </Link>
  );
};

export default Logo;
