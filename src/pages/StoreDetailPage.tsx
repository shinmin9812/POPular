import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Store } from '../types/store';
import Title from '../components/StoreDetail/Title';
import DetailInfo from '../components/StoreDetail/DetailInfo';

const Container = styled.div`
  width: 100%;
  height: 100%;

  .detail-top-btn {
    display: flex;
    width: 100%;
    height: 50px;
  }

  .detail-info-btn,
  .store-comment-btn {
    width: 50%;
    background-color: #ffffff;
    border-bottom: 2px solid blue;
    font-weight: 700;
  }

  .active {
    border-bottom: 2px solid rgba(0, 0, 255, 0.2);
  }
`;

const StoreDetailPage = () => {
  const [store, setStore] = useState<Store | undefined>(undefined);

  const [isDetail, setIsDetail] = useState<boolean>(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await fetch('/store/id/321323');
    const result: Store = await response.json();

    if (!result) {
      throw new Error('no result');
    }

    setStore(result);
  }

  return (
    <Container>
      <Title store={store}></Title>
      <div className="detail-top-btn">
        <button className={isDetail ? 'detail-info-btn' : 'detail-info-btn active'} onClick={() => setIsDetail(true)}>
          상세 정보
        </button>
        <button
          className={isDetail ? 'store-comment-btn active' : 'store-comment-btn'}
          onClick={() => setIsDetail(false)}
        >
          후기
        </button>
      </div>
      {isDetail ? <DetailInfo store={store} /> : <div>hello</div>}
    </Container>
  );
};

export default StoreDetailPage;
