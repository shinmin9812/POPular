import styled from 'styled-components';
import { Store } from '../../../../types/store';

interface Props {
  store: Store;
}

const VerticalStoreItem = ({ store }: Props) => {
  return (
    <Container>
      <InnerContent>
        <div className={'text-section'}>
          <p className={'item-title'}>{store.title}</p>
          <p className={'item-period'}>
            {new Date(store.start_date).toISOString().slice(0, 10)}~
            {new Date(store.end_date).toISOString().slice(0, 10)}
          </p>
        </div>
        <div className={'image-section'}>
          <img src={store.images[0]} alt={store.title} />
        </div>
      </InnerContent>
    </Container>
  );
};

const Container = styled.div``;

const InnerContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .text-section {
    .item-title {
      font-weight: var(--weight-semi-bold);
      font-size: var(--font-regular);
    }

    .item-period {
      margin-top: 7px;
      font-weight: var(--weight-light);
      font-size: var(--font-small);
      color: var(--color-light-black);
    }
  }

  .image-section {
    width: 140px;
    height: 90px;
    overflow: hidden;
    border-radius: 5px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

export default VerticalStoreItem;
