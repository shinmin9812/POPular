import styled from 'styled-components';
import { useState } from 'react';
import { Store } from '../../../types/store';

type Props = {
  store: Store;
};

type hours = {
  mon: {
    start: string | null;
    end: string | null;
  };
  tue: {
    start: string | null;
    end: string | null;
  };
  wed: {
    start: string | null;
    end: string | null;
  };
  thu: {
    start: string | null;
    end: string | null;
  };
  fri: {
    start: string | null;
    end: string | null;
  };
  sat: {
    start: string | null;
    end: string | null;
  };
  sun: {
    start: string | null;
    end: string | null;
  };
};

const Container = styled.div`
  width: 100%;

  .store-detail-info-list {
    display: flex;
    flex-direction: column;
    width: 100%;

    li + li {
      margin-top: 20px;
    }
  }

  .store-detail-title {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 20px;
  }

  .store-detail-info-item {
    display: flex;
    align-items: center;
  }

  .item-info {
    font-size: 16px;
    font-weight: 500;
    margin-left: 20px;
    margin-right: 10px;
  }

  .week-btn {
    display: flex;
    align-items: end;
    justify-content: center;
    width: 24px;
    height: 24px;
    background-color: #ffffff;
  }

  .hours-list {
    display: flex;
    flex-direction: column;
    margin: 20px 0 20px 45px;

    li + li {
      margin-top: 8px;
    }
  }

  .hours-item {
    letter-spacing: 1px;
  }

  .store-sns-title {
    width: 100%;
    margin-top: 20px;
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
    transition: all 0.5s;

    &:hover {
      cursor: pointer;
      background-color: #652cc1;
      color: #fff;
      transform: translateY(-4px);
      box-shadow: 0px 6px 12px -3px rgba(0, 0, 0, 0.6);
    }
  }

  @media all and (max-width: 767px) {
    width: 100%;
  }
`;

function getPeriod(period: string) {
  const date = new Date(period);
  return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
}

function businessHours(hours: hours) {
  const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  const koreanDays = ['월', '화', '수', '목', '금', '토', '일'];
  const openHours: string[] = [];

  Object.entries(hours).forEach(([day, time]) => {
    const start = time.start;
    const end = time.end;
    const dayIndex = days.indexOf(day);
    const koreanDay = koreanDays[dayIndex];

    if (!start || !end) {
      return openHours.push(`${koreanDay} 휴무일`);
    }

    openHours.push(`${koreanDay} ${start} ~ ${end}`);
  });

  return (
    <ul className="hours-list">
      {openHours.map((hour: string, i: number) => (
        <li className="hours-item" key={i}>
          {hour}
        </li>
      ))}
    </ul>
  );
}

const InfoDetail = ({ store }: Props) => {
  const [week, setWeek] = useState<boolean>(false);

  return (
    <Container>
      <ul className="store-detail-info-list">
        <p className="store-detail-title">운영 정보</p>
        <li className="store-detail-info-item">
          <img className="item-ico" src="/images/calendar.svg" alt="" />
          <p className="item-info">
            {getPeriod(store.start_date)} ~ {getPeriod(store.end_date)}
          </p>
        </li>
        <li className="store-detail-info-item">
          <img className="item-ico" src="/images/clock.svg" alt="" />
          <p className="item-info">
            영업 중 {store.hours.fri.start} ~ {store.hours.fri.end}
          </p>
          <button className="week-btn" onClick={() => setWeek(!week)}>
            <img
              src="/images/angle-down.svg"
              alt=""
              style={week ? { transform: 'rotate(180deg)' } : { transform: 'rotate(0)' }}
            />
          </button>
        </li>
        {week && businessHours(store.hours)}
        <li className="store-detail-info-item">
          <img className="item-ico" src="/images/place.svg" alt="" />
          <p className="item-info">{store.location}</p>
        </li>
        <li className="store-detail-info-item">
          <img className="item-ico" src="/images/won.svg" alt="" />
          <p className="item-info">입장료 {!store.price ? '무료' : `${store.price.toLocaleString()}원`}</p>
        </li>
        <div className="store-sns-title">SNS</div>
        {store.sns.length > 0 && (
          <>
            <ul className="store-sns-list">
              <li className="store-sns-item">
                <div className="sns-info">
                  <img className="sns-ico" src="/images/instagram.svg" alt="" />
                  <p className="sns-title">{store.sns[0].link_title}</p>
                </div>
                <a className="sns-link" href={store.sns[0].link_url}>
                  {store.sns[0].link_type}
                </a>
              </li>
            </ul>
          </>
        )}
        <div className="detail-bottom-btns">
          <div className="line"></div>
          <button
            onClick={() => window.open(store.sns[0].link_url)}
            disabled={store.reservation_required ? false : true}
            className="reservation-btn"
          >
            예약하기
          </button>
          <button className="recruiment-btn">모집하기</button>
        </div>
      </ul>
    </Container>
  );
};

export default InfoDetail;
