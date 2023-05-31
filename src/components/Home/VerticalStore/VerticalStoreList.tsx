import styled from 'styled-components';
import VerticalStoreItem from './VerticalStoreItem';
import { Store } from '../../../types/store';
import { Link } from 'react-router-dom';

interface Props {
  stores: Store[];
  text: string;
}

const VerticalStoreList = ({ stores, text }: Props) => {
  return (
    <Container>
      <h2>{text}</h2>
      <ItemsBox>
        {stores.map((store) => (
          <Item key={store.id}>
            <Link to={`/store/${store.id}`}>
              <VerticalStoreItem store={store}></VerticalStoreItem>
            </Link>
          </Item>
        ))}
      </ItemsBox>
    </Container>
  );
};

const Container = styled.div`
  h2 {
    font-weight: var(--weight-semi-bold);
    margin-bottom: 20px;
  }
`;

const ItemsBox = styled.ul`
  width: 100%;
`;

const Item = styled.li`
  padding: 15px 15px;
  box-sizing: border-box;
  background-color: #f5f5f5;
  margin-bottom: 7px;
  border-radius: 5px;

  &:last-child {
    margin-bottom: 0px;
  }
`;

export default VerticalStoreList;
