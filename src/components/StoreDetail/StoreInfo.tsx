import styled from 'styled-components';
import { Store } from '../../types/store';

type Props = {
  store?: Store;
};

const Container = styled.div`
  width: 100%;

  .store-description {
    margin-top: 20px;
    font-size: 14px;
    line-height: 20px;
  }

  .store-detail-info-list {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 40px;

    li + li {
      margin-top: 20px;
    }
  }

  .store-detail-info-item {
    display: flex;
    align-items: center;
  }

  .item-info {
    font-size: 16px;
    font-weight: 500;
    margin-left: 20px;
  }
`;

const StoreInfo = ({ store }: Props) => {
  return (
    <Container>
      <p className="store-description">{store?.description}</p>
      <div className="line"></div>
      <ul className="store-detail-info-list">
        <li className="store-detail-info-item">
          <img className="item-ico" src="/images/calendar.svg" alt="" />
          <p className="item-info">
            {store?.start_date} ~ {store?.end_date}
          </p>
        </li>
        <li className="store-detail-info-item">
          <img className="item-ico" src="/images/clock.svg" alt="" />
          <p className="item-info">
            영업중 {store?.hours.mon.start} - {store?.hours.mon.end}
          </p>
        </li>
        <li className="store-detail-info-item">
          <img className="item-ico" src="/images/place.svg" alt="" />
          <p className="item-info">{store?.location}</p>
        </li>
        <li className="store-detail-info-item">
          <img className="item-ico" src="/images/won.svg" alt="" />
          <p className="item-info">입장료 {store?.price}원</p>
        </li>
      </ul>
    </Container>
  );
};

export default StoreInfo;
