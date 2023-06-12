import { NavLink } from 'react-router-dom';

const activeStyle = {
  color: 'var(--color-main)',
  fontSize: 'calc(var(--font-regular) + 2px)',
};
const MenuItem = ({ link, title }: { link: string; title: string }) => {
  return (
    <NavLink to={link} style={({ isActive }) => (isActive ? activeStyle : {})}>
      {title}
    </NavLink>
  );
};

export default MenuItem;
