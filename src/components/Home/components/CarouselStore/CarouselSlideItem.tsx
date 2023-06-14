import styled from 'styled-components';
import { Store } from '../../../../types/store';

interface Props {
  store: Store;
}

const CarouselSlideItem = ({ store }: Props) => {
  return (
    <Container>
      <div className={'item-image'}>
        <img src={store.images[0]} alt={store.title} />
      </div>
      <div className={'item-description'}>
        <p className={'item-title'}>{store.title}</p>
        <p className={'item-period'}>
          {new Date(store.start_date).toISOString().slice(0, 10)}~{new Date(store.end_date).toISOString().slice(0, 10)}
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

    &:hover img {
      transform: scale(1.07);
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: all 0.3s;
    }
  }
  .item-description {
    margin-top: 10px;
  }

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
`;

export default CarouselSlideItem;
