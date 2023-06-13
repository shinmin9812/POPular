import { Store } from '../../../../types/store';
import styled from 'styled-components';
import AdminStoreItem from '../Stores/AdminStoreItem';

interface Props {
  stores: Store[];
}
const StoreScrapChart = ({ stores }: Props) => {
  let sortedStores = stores.sort((a, b) => b.scraps.length - a.scraps.length);

  if (sortedStores.length > 10) {
    sortedStores = sortedStores.slice(sortedStores.length - 10, sortedStores.length);
  }

  return (
    <Container>
      <ul>
        {sortedStores.map((store) => {
          return (
            <div className="store-scrap-item" key={store._id}>
              <AdminStoreItem store={store} />
              <div className="scrap-count">
                {store.scraps.length}
                <br />
                <p>SCRAP</p>
              </div>
            </div>
          );
        })}
      </ul>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 300px;

  ul {
    height: 100%;
    overflow-y: scroll;

    .store-scrap-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;

      .scrap-count {
        padding: 10px 8px;

        text-align: center;
        font-size: 24px;

        border-radius: 10px;
        color: #fff;
        background-color: var(--color-main);
        font-weight: 500;

        p {
          margin-top: 4px;
          font-size: 10px;
          font-weight: 300;
        }
      }
    }
  }
`;

export default StoreScrapChart;
