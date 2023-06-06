import styled from 'styled-components';
import { Store } from '../../types/store';
import StorePlace from './StorePlace';

type Props = {
  store?: Store;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;

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

  .store-sns-title {
    width: 100%;
    margin-top: 40px;
    font-size: 18px;
    font-weight: 700;
  }

  .store-sns-list {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 10px;

    li + li {
      margin-top: 10px;
    }
  }

  .store-sns-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 30px;
  }

  .sns-info {
    display: flex;
    align-items: center;
  }

  .sns-title {
    font-size: 16px;
    margin-left: 10px;
  }

  .sns-link {
    width: 130px;
    height: 30xp;
    border: 1px solid #652cc1;
    border-radius: 5px;
    line-height: 28px;
    text-align: center;
    color: #652cc1;
  }

  .store-similar {
    width: 100%;
    margin-top: 40px;
  }

  .store-similar-title {
    font-size: 18px;
    font-weight: 700;
  }

  .similar-list {
    display: flex;

    li + li {
      margin-left: 10px;
    }
  }

  .detail-bottom-btns {
    display: flex;
    align-items: center;
    width: 100%;

    button + button {
      margin-left: 10px;
    }
  }

  .reservation-btn,
  .recruiment-btn {
    width: 180px;
    height: 50px;
    border-radius: 5px;
    background-color: #878787;
    font-size: 16px;
    font-weight: 700;
    color: #ffffff;
  }

  .line {
    width: 100%;
    border-bottom: 1px solid #e7e7e7;
    margin: 20px 0;
  }
`;

const DetailInfo = ({ store }: Props) => {
  return (
    <Container>
      <p className="store-description">{store?.description}</p>
      <div className="line"></div>
      <ul className="store-detail-info-list">
        <li className="store-detail-info-item">
          <img className="item-ico" src="/calendar.svg" alt="" />
          <p className="item-info">
            {store?.start_date} ~ {store?.end_date}
          </p>
        </li>
        <li className="store-detail-info-item">
          <img className="item-ico" src="/clock.svg" alt="" />
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
      <div className="store-sns-title">SNS</div>
      <ul className="store-sns-list">
        <li className="store-sns-item">
          <div className="sns-info">
            <img className="sns-ico" src="/images/instagram.svg" alt="" />
            <p className="sns-title">{store?.sns[0].link_title}</p>
          </div>
          <a className="sns-link" href={store?.sns[0].link_url}>
            {store?.sns[0].link_type}
          </a>
        </li>
        <li className="store-sns-item">
          <div className="sns-info">
            <img className="sns-ico" src="/images/instagram.svg" alt="" />
            <p className="sns-title">{store?.sns[0].link_title}</p>
          </div>
          <a className="sns-link" href={store?.sns[0].link_url}>
            {store?.sns[0].link_type}
          </a>
        </li>
      </ul>
      <StorePlace location={store?.location} coord={store?.coord} />
      <div className="line"></div>
      <div className="detail-bottom-btns">
        <button className="reservation-btn">예약하기</button>
        <button className="recruiment-btn">모집하기</button>
      </div>
    </Container>
  );
};

export default DetailInfo;
