import styled from 'styled-components';
import { Store } from '../../../types/store';
import StoreItem from './StoreItem';
import { Link } from 'react-router-dom';

interface Props {
  stores: Store[] | undefined;
}

const Container = styled.div`
  width: 100%;

  .nothing {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 200px;

    font-size: var(--font-large);
    font-weight: var(--weight-semi-bold);

    line-height: 1.3;

    text-align: center;
    word-break: keep-all;
  }
`;

const StoreList = ({ stores }: Props) => {
  return (
    <Container className="store-list">
      {stores ? (
        <ul>
          {stores.map((store) => (
            <li key={store.id}>
              <Link to={`/store/${store.id}`}>
                <StoreItem store={store} />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="nothing">
          <p>
            해당 스토어가
            <br />
            존재하지 않습니다!
          </p>
        </div>
      )}
    </Container>
  );
};

export default StoreList;
