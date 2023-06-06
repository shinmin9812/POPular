import styled from 'styled-components';
import { Store } from '../../../types/store';
import Tag from '../Tag/Tag';

interface Props {
  store: Store;
}

const Container = styled.article`
  display: flex;
  width: 100%;
  min-width: 300px;
  max-width: 100%;
  height: 150px;

  padding: 20px;

  border-radius: 6px;

  transition: background-color 0.5s;

  figure {
    min-height: 100%;
    min-width: 100px;
    aspect-ratio: 1/1;
    margin-right: 20px;
    border-radius: 6px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 1s;
    }
  }

  .store-info {
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    flex-grow: 1;
    max-width: calc(100% - 130px);

    padding: 10px 0;

    letter-spacing: -0.02em;

    .store-title {
      max-width: 100%;
      font-size: var(--font-regular);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .store-location {
      font-size: var(--font-small);
      color: var(--color-gray);
    }

    .store-date {
      width: fit-content;
      font-size: var(--font-small);
    }
  }

  &:hover {
    cursor: pointer;
  }
`;

const StoreItem = ({ store }: Props) => {
  // 주소지에서 상위 2단계만 추출
  const location = store.location.split(' ').slice(0, 2).join(' ');

  return (
    <Container>
      <figure>
        <img src={store.images[0]} alt={store.title} />
      </figure>
      <div className="store-info">
        <h3 className="store-title">{store.title}</h3>
        <p className="store-location">{location}</p>
        <p className="store-date">
          {store.start_date} - {store.end_date}
        </p>
        <Tag>{store.category}</Tag>
      </div>
    </Container>
  );
};

export default StoreItem;
