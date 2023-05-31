import styled from 'styled-components';
import { Store } from '../../../types/store';

interface Props {
  store: Store;
}

const SlideStoreItem = ({ store }: Props) => {
  return (
    <Container>
      <div className={'item-image'}>
        <img src={store.images[0]} alt={store.title} />
      </div>
      <div className={'item-description'}>
        <p className={'item-title'}>{store.title}</p>
        <p className={'item-period'}>
          {store.startDate} ~ {store.endDate}
        </p>
      </div>
    </Container>
  );
};

const Container = styled.div`
  .item-image {
    width: 200px;
    height: 200px;
    border-radius: 8px;
    overflow: hidden;

    img {
      width: 100%;
    }
  }
  .item-description {
    margin-top: 10px;
  }

  .item-title {
    font-weight: var(--weight-semi-bold);
    font-size: var(--font-small);
  }

  .item-period {
    margin-top: 5px;
    font-weight: var(--weight-regular);
    font-size: var(--font-micro);
    color: var(--color-gray);
  }
`;

export default SlideStoreItem;
