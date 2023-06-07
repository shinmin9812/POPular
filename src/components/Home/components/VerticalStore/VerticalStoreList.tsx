import styled from 'styled-components';
import VerticalStoreItem from './VerticalStoreItem';
import { Store } from '../../../../types/store';
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
        {stores.slice(0, 5).map((store) => (
          <Item key={store.id}>
            <Link to={`/store/${store.id}`}>
              <VerticalStoreItem store={store}></VerticalStoreItem>
            </Link>
          </Item>
        ))}
      </ItemsBox>
      <MoreView>
        <Link className="ItemLink" to={``}>
          More View
        </Link>
      </MoreView>
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

const MoreView = styled.div`
  width: 100px;
  margin: 30px auto 0px;
  font-size: var(--font-micro);
  color: var(--color-light-black);
  text-align: center;
  position: relative;
  cursor: pointer;
  display: block;

  &::after {
    content: '';
    display: block;
    width: 120px;
    height: 10px;
    background-image: url('/images/arrow.png');
    background-repeat: no-repeat;

    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-39%);
  }

  .ItemLink {
    display: inline-block;
    width: 100%;
    padding: 6px 0px;
    transform: translateY(0px);
    transition: all 0.2s;
  }

  &:hover .ItemLink {
    transform: translateY(-3px);
  }
`;

export default VerticalStoreList;
