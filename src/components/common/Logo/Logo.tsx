import React from 'react';
import { Link } from 'react-router-dom';
import { CLIENT_PATH } from '../../../constants/path';

const Logo = () => {
  return (
    <Link className="logo" to={CLIENT_PATH.HOME}>
      POPular
    </Link>
  );
};

export default Logo;
