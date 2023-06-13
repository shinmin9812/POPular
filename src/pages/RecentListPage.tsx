import styled from 'styled-components';
import StoreList from '../components/common/Store/StoreList';
import { storeData } from '../mocks/data/stores';
import MetaTag from '../components/SEO/MetaTag';

// dummydata로 임시 세팅

const RecentListPage = () => {
  // const items: string | null = localStorage.getItem('recent');
  // let stores;
  // if (items !== null) {
  //   stores = JSON.parse(items);
  // }
  const stores = storeData;

  return (
    <>
      <MetaTag title={`POPULAR | 최근 본 스토어`} />
      <Title>최근 본 스토어</Title>
      <StoreList stores={stores} />
    </>
  );
};

export default RecentListPage;

const Title = styled.h1`
  font-size: var(--font-medium);
  color: var(--color-main);
  margin-bottom: 20px;
  margin-left: 20px;
`;
