import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

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

// const StyledLink = styled(NavLink)`
//   display: block;
//   width: 350px;
//   height: 65px;
//   font-size: var(--font-medium);
//   border-bottom: 0.5px solid var(--color-gray);
//   padding: 20px;
//   margin: 0;
//   cursor: pointer;

//   :hover {
//     transition: all 0.1s ease;
//     color: var(--color-main);
//     font-size: calc(var(--font-medium) + 2px);
//   }
// `;
