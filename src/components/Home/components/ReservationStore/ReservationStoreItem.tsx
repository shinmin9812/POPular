import styled from 'styled-components';
import { Store } from '../../../../types/store';

interface Props {
  store: Store;
}

const ReservationStoreItem = ({ store }: Props) => {
  return (
    <Container>
      <InnerContent>
        <div className={'item-image'}>
          <img src={store.images[0]} alt={store.title} />
        </div>
        <div className={'item-description'}>
          <p className={'item-title'}>{store.title}</p>
          <p className={'item-period'}>
            {new Date(store.start_date).toISOString().slice(0, 10)}~
            {new Date(store.end_date).toISOString().slice(0, 10)}
          </p>
        </div>
      </InnerContent>
    </Container>
  );
};

const Container = styled.div``;

const InnerContent = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;

  .item-image {
    height: 200px;

    &:hover img {
      transform: scale(1.07);
    }

    img {
      transition: all 0.3s;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }

  .item-description {
    margin-top: 10px;
    padding: 12px;
    box-sizing: border-box;
    position: absolute;
    bottom: 0px;
    width: 100%;
    height: 100px;
    background-image: linear-gradient(to bottom, rgba(182, 182, 182, 0.03), rgba(16, 16, 16, 0.751));

    display: flex;
    justify-content: end;
    flex-direction: column;
  }

  .item-title {
    font-weight: var(--weight-semi-bold);
    font-size: var(--font-regular);
    color: var(--color-white);
  }

  .item-period {
    margin-top: 7px;
    font-weight: var(--weight-light);
    font-size: var(--font-small);
    color: var(--color-light-gray);
  }
`;

export default ReservationStoreItem;
