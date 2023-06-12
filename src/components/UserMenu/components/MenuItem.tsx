import { Link } from 'react-router-dom';
import styled from 'styled-components';

const MenuItem = ({ link, title }: { link: string; title: string }) => {
  return <StyledLink to={link}>{title}</StyledLink>;
};

export default MenuItem;

const StyledLink = styled(Link)`
  display: block;
  width: 350px;
  height: 65px;
  font-size: var(--font-medium);
  border-bottom: 0.5px solid var(--color-gray);
  padding: 20px;
  margin: 0;
  cursor: pointer;

  :hover {
    transition: all 0.1s ease;
    color: var(--color-main);
    font-size: calc(var(--font-medium) + 2px);
  }
`;
