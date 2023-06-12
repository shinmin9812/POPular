import { Link } from 'react-router-dom';

const MenuItem = ({ link, title }: { link: string; title: string }) => {
  return <Link to={link}>{title}</Link>;
};

export default MenuItem;
