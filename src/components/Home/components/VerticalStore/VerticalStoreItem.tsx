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
    width: 300px;
    .item-title {
      font-weight: var(--weight-semi-bold);
      font-size: var(--font-regular);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding: 5px 20px 5px 0;
      box-sizing: border-box;
    }

    .item-period {
      margin-top: 2px;
      font-weight: var(--weight-light);
      font-size: var(--font-small);
      color: var(--color-light-black);
    }

    @media all and (max-width: 767px) {
      width: 180px;

      .item-title {
        font-size: 15px;
      }
    }
  }

  .image-section {
    width: 120px;
    height: 90px;

    img {
      width: 120px;
      height: 90px;
      object-fit: cover;
      overflow: hidden;
      border-radius: 5px;
    }
  }
`;

export default VerticalStoreItem;
