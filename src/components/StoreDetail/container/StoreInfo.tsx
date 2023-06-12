import styled from 'styled-components';
import InfoPlace from '../components/InfoPlace';
import InfoDetail from '../components/InfoDetail';
import { Store } from '../../../types/store';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;

  .store-info {
    width: 100%;
    display: flex;
    gap: 20px;
  }

  .store-location {
    width: 50%;
  }

  .store-description {
    padding-top: 20px;

    font-size: 18px;
    font-weight: 300;

    word-break: keep-all;
    line-height: 1.3;
    letter-spacing: 0.02em;
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
    flex-direction: column;
    gap: 20px;
    align-items: center;
    width: 100%;
    margin-top: 20px;

    button {
      width: 100%;
    }
  }

  .reservation-btn,
  .recruiment-btn {
    width: 50%;
    height: 50px;
    border-radius: 5px;
    background-color: var(--color-sub);
    font-size: 16px;
    font-weight: 700;
    color: #ffffff;

    &:hover {
      cursor: pointer;
    }

    &:disabled {
      background-color: #c1c1c1;
      cursor: not-allowed;
    }
  }

  .line {
    width: 100%;
    border-bottom: 1px solid #e7e7e7;
    margin: 20px 0;
  }

  // 모바일
  @media all and (max-width: 767px) {
    .store-info {
      width: 100%;
      flex-direction: column;
      gap: 30px;
    }

    .store-location {
      width: 100%;
    }
  }
`;

interface Props {
  store: Store;
}

const StoreInfo = ({ store }: Props) => {
  return (
    <>
      <Container>
        <p className="store-description">{store?.description}</p>
        <div className="line"></div>
        <div className="store-info">
          <div className="store-location">
            <InfoPlace location={store.location} coordinates={store.coord.coordinates} />
          </div>
          <InfoDetail store={store} />
        </div>
      </Container>
    </>
  );
};

export default StoreInfo;
