import { Store } from '../../../../types/store';
import styled from 'styled-components';
import Tag from '../../../common/Tag/Tag';
import dayjs from 'dayjs';
import { NavLink } from 'react-router-dom';

interface Props {
  store: Store;
}

const AdminStoreItem = ({ store }: Props) => {
  const startDate = dayjs(store.start_date).format('YY-MM-DD');
  const endDate = dayjs(store.end_date).format('YY-MM-DD');

  return (
    <Container>
      <NavLink to={`./${store._id}`} className={({ isActive }) => (isActive ? 'active' : '')}>
        <img src={store.images[0]} alt="store-img" />
        <div className="store-info">
          <p className="store-id">
            <strong>ID:</strong> {store._id}
          </p>
          <h3 className="store-title">{store.title}</h3>
          <Tag>{store.category}</Tag>
          <div className="store-date">
            {startDate} - {endDate}
          </div>
        </div>
      </NavLink>
    </Container>
  );
};

const Container = styled.div`
  a {
    display: flex;

    width: 100%;
    height: 100px;

    padding: 10px;

    border-radius: 10px;

    transition: all 0.3s;

    strong {
      font-weight: 700;
    }

    img {
      height: 100%;
      aspect-ratio: 1/1;
      border-radius: 6px;
      margin-right: 20px;
    }

    .store-info {
      display: flex;
      flex-direction: column;
      gap: 4px;

      .store-id {
        opacity: 0.8;
        font-size: 12px;
      }

      .store-title {
        font-weight: 500;
      }

      .store-date {
        font-size: 12px;
      }
    }

    &.active {
      background-color: #faedff;
    }
  }
`;

export default AdminStoreItem;
