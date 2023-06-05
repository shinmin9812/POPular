import styled from 'styled-components';
import { Link } from 'react-router-dom';

const MenuItem = ({ link, title }: { link: string; title: string }) => {
  return (
    <Item>
      {link === 'deleteAccount' ? <DeleteAccountBtn>{title}</DeleteAccountBtn> : <Link to={link}>{title}</Link>}
    </Item>
  );
};

export default MenuItem;

const Item = styled.div`
  width: 300px;
  font-size: var(--font-regular);
  border-bottom: 0.5px solid var(--color-gray);
  padding: 20px;
  margin: 0;
  & a:hover {
    color: var(--color-main);
  }
`;

const DeleteAccountBtn = styled.div`
  width: fit-content;
  cursor: pointer;
  &:hover {
    color: var(--color-main);
  }
`;
