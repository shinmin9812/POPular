import styled from 'styled-components';
import ReservationStoreItem from './ReservationStoreItem';
import { Store } from '../../../../types/store';
import { Link } from 'react-router-dom';
import { LinkHandler } from '../../../../utils/linkHandler';

interface Props {
  stores: Store[];
  text: string;
}

const ReservationStoreList = ({ stores, text }: Props) => {
  return (
    <Container>
      <h2>{text}</h2>
      <ItemsBox>
        {stores.slice(0, 4).map((store) => (
          <Item key={store._id}>
            <Link to={`/store/${store._id}`} onClick={LinkHandler}>
              <ReservationStoreItem store={store} />
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
    font-size: var(--font-medium);

    @media all and (max-width: 767px) {
      font-size: 17px;
    }
  }
`;

const ItemsBox = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1em;
`;

const Item = styled.li`
  min-height: 200px;
  flex-basis: 200px;
  flex-grow: 1;

  @media all and (max-width: 767px) {
    min-height: 150px;
    flex-basis: 150px;
  }
`;

export default ReservationStoreList;
