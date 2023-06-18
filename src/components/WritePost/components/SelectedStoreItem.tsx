import styled from 'styled-components';
import { useGetStoreById } from '../../../api/storeApi';
import Tag from '../../common/Tag/Tag';
import dayjs from 'dayjs';

interface Props {
  storeId: string;
}

const Container = styled.div`
  @media (max-width: 768px) {
    display: none;
  }

  width: 50%;

  .store-card {
    display: grid;
    gap: 30px;
    grid-template-columns: 1fr 1fr;
    width: 90%;
    height: 250px;
    padding: 20px;
    margin-top: 35px;
    margin-left: auto;
    border-radius: 10px;
    box-shadow: 0px 0px 22px -6px rgba(0, 0, 0, 0.3);
    animation: appear-store 0.5s forwards;

    @keyframes appear-store {
      0% {
        opacity: 0;
        transform: translateY(10px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .store-data {
      width: 100%;

      .store-thumbnail {
        width: 100%;
        aspect-ratio: 1.6/1;
        border-radius: 10px;
        margin-bottom: 10px;
        object-fit: cover;
      }

      .store-title-box {
        display: flex;
        align-items: center;
        gap: 10px;
        width: fit-content;
        margin-bottom: 4px;

        .store-title {
          font-size: 16px;
          font-weight: 600;
        }
      }

      .store-location {
        margin-bottom: 10px;
        font-size: 12px;
        color: #8c8c8c;
      }

      .store-date {
        font-size: 14px;
      }
    }
    .store-operate {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      gap: 10px;
      width: 100%;

      padding: 20px 0;

      * {
        font-size: 12px;
        margin-top: 0px;
      }

      div {
        display: flex;
        align-items: center;
        gap: 10px;
      }
    }

    margin-bottom: 20px;
  }

  .posting-btn {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
`;

const SelectedStoreItem = ({ storeId }: Props) => {
  const { data: store } = useGetStoreById(storeId);

  if (store) {
    return (
      <Container>
        <div className="store-card">
          <div className="store-data">
            <img src={store?.images[0]} alt="store-thumbnail" className="store-thumbnail" />
            <div className="store-info">
              <div className="store-title-box">
                <Tag>{store?.category}</Tag>
                <div className="store-title">{store?.title}</div>
              </div>
              <p className="store-location">
                {store?.postcode.sido} {store?.postcode.sigungu}
              </p>
              <p className="store-date">
                {dayjs(store?.start_date).format('YYYY/MM/DD')} - {dayjs(store?.end_date).format('YYYY/MM/DD')}
              </p>
            </div>
          </div>
          <div className="store-operate">
            <div className="store-date">
              <img className="item-ico" src="/images/calendar.svg" alt="" />
              {dayjs(store?.start_date).format('YYYY/MM/DD')} - {dayjs(store?.end_date).format('YYYY/MM/DD')}
            </div>
            <div className="store-hours">
              <img className="item-ico" src="/images/clock.svg" alt="" />
              영업중 {store.hours.mon.start} - {store.hours.mon.end}
            </div>
            <div className="store-date">
              <img className="item-ico" src="/images/place.svg" alt="" />
              {store.location}
            </div>
            <div className="store-price">
              <img className="item-ico" src="/images/won.svg" alt="" />
              {store.price.toLocaleString()}원
            </div>
          </div>
        </div>
        <div className="posting-btn"></div>
      </Container>
    );
  }

  return <></>;
};

export default SelectedStoreItem;
