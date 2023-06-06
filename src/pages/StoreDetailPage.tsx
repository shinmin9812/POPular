import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Store } from '../types/store';
import Title from '../components/StoreDetail/Title';
import DetailInfo from '../components/StoreDetail/DetailInfo';
import StoreReview from '../components/StoreDetail/container/StoreReview';

const Container = styled.div<{ isDetail: boolean }>`
  .detail-top-btn {
    display: flex;
    width: 100%;
    height: 50px;

    position: relative;
  }

  .detail-top-btn::after {
    content: '';
    display: block;
    position: absolute;
    bottom: 0;
    width: 50%;
    height: 2px;
    background-color: var(--color-main);

    transition: all 0.3s;

    transform: ${(props) => (props.isDetail ? 'translateX(0)' : 'translateX(100%)')};
  }

  .detail-info-btn,
  .store-comment-btn {
    width: 100%;
    background-color: #ffffff;
    font-weight: 700;

    &:hover {
      cursor: pointer;
    }
  }

  overflow-x: hidden;
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
    <Container isDetail={isDetail}>
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
      {isDetail ? <DetailInfo store={store} /> : <StoreReview />}
    </Container>
  );
};

export default StoreDetailPage;
