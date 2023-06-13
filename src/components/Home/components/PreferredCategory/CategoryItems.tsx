import styled from 'styled-components';
import { Store } from '../../../../types/store';
import { Link } from 'react-router-dom';

interface Props {
  stores: Store[];
}

const CategoryItems = ({ stores }: Props) => {
  return (
    <Container>
      <CategoryItemList>
        {stores.slice(0, 4).map((store) => {
          const location = store.location.split(' ').slice(0, 2).join(' ');
          return (
            <CategoryItem key={store._id}>
              <Link to={`/store/${store._id}`}>
                <ItemInner>
                  <div className="item-image">
                    <img src={store.images[0]} alt={store.title} />
                  </div>
                  <div className="item-description">
                    <p className="item-title">{store.title}</p>
                    <p className="item-location">{location}</p>
                    <p className="item-period">
                      {new Date(store.start_date).toISOString().slice(0, 10)} ~
                      {new Date(store.end_date).toISOString().slice(0, 10)}
                    </p>
                  </div>
                </ItemInner>
              </Link>
            </CategoryItem>
          );
        })}
      </CategoryItemList>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

const CategoryItemList = styled.ul`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 15px;

  @media all and (min-width: 768px) and (max-width: 1023px) {
    justify-content: center;
  }

  @media all and (max-width: 767px) {
    justify-content: center;
  }
`;

const CategoryItem = styled.li`
  width: 49%;
  height: 150px;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: #d7cdd726 0px 0px 3px 3px;
  background-color: var(--color-white);

  @media all and (min-width: 768px) and (max-width: 1023px) {
    width: 45%;
  }

  @media all and (max-width: 767px) {
    width: 85%;
  }
`;

const ItemInner = styled.div`
  display: flex;
  background-color: var(--color-white);

  .item-image {
    width: 50%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .item-description {
    width: 50%;
    padding: 20px;
    box-sizing: border-box;

    .item-title {
      font-weight: var(--weight-semi-bold);
    }

    .item-location {
      margin-top: 8px;
      display: inline-block;
      font-size: var(--font-micro);
      background-color: var(--color-light-black);
      color: var(--color-white);
      padding: 5px 5px;
      border-radius: 10px;
    }

    .item-period {
      margin-top: 20px;
      font-size: var(--font-small);
      color: var(--color-light-black);
    }
  }
`;

export default CategoryItems;
