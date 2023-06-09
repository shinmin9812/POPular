import styled from 'styled-components';
import InfoPlace from '../components/InfoPlace';
import InfoDetail from '../components/InfoDetail';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;

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
    width: 50%;
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

const StoreInfo = () => {
  const { storeId } = useParams();
  async function fetchStore() {
    const response = await fetch(`http://34.22.81.36:3000/stores/store/${storeId}`);
    return response.json();
  }
  const { data: store, isLoading, isError } = useQuery(['store'], fetchStore);

  console.log(store);

  if (isError) return <h3>error</h3>;
  if (isLoading) return <h3>Loading...</h3>;
  return (
    <Container>
      <InfoDetail store={store} />
      <div className="store-sns-title">SNS</div>
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
      <InfoPlace location={store.location} coordinates={store.coord.coordinates} />
      <div className="line"></div>
      <div className="detail-bottom-btns">
        <button className="reservation-btn">예약하기</button>
        <button className="recruiment-btn">모집하기</button>
      </div>
    </Container>
  );
};

export default StoreInfo;
