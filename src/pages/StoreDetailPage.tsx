import { useState } from 'react';
import styled from 'styled-components';
import StoreTitle from '../components/StoreDetail/container/StoreTitle';
import StoreInfo from '../components/StoreDetail/container/StoreInfo';
import StoreReview from '../components/StoreDetail/container/StoreReview';
import { useParams } from 'react-router-dom';
import { useGetStoreById } from '../api/storeApi';
import MetaTag from '../components/SEO/MetaTag';
import { Store } from '../types/store';

type PathParams = {
  storeId: string | undefined;
};

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

const addRecentStore = (store: Store) => {
  const recentStoreString = window.localStorage.getItem('store');
  const recentStore = recentStoreString ? JSON.parse(recentStoreString) : [];
  const isStoreExist = recentStore.some((s: Store) => s._id === store._id);

  if (recentStore.length > 4) {
    recentStore.pop();
  }

  if (!isStoreExist) {
    const newRecentStore = [store, ...recentStore];
    window.localStorage.setItem('store', JSON.stringify(newRecentStore));
  }
};

const StoreDetailPage = () => {
  const [isDetail, setIsDetail] = useState<boolean>(true);
  const { storeId } = useParams<PathParams>();
  const { data: store, isLoading, isError } = useGetStoreById(storeId!);

  if (isLoading) return <></>;

  addRecentStore(store);

  return (
    <Container isDetail={isDetail}>
      <MetaTag title={`POPULAR | ${store?.title}`} url="www.popular.com" />
      <StoreTitle store={store!} />
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
      {isDetail ? (
        <StoreInfo store={store!} isLoading={isLoading} isError={isError} />
      ) : (
        <StoreReview storeId={storeId!} />
      )}
    </Container>
  );
};

export default StoreDetailPage;
