import styled from 'styled-components';
import StoreList from '../components/common/Store/StoreList';

// dummydata로 임시 세팅

const RecentListPage = () => {
  const items: string | null = localStorage.getItem('recent');
  let stores;
  if (items !== null) {
    stores = JSON.parse(items);
  }

  return (
    <div>
      <Title>최근 본 스토어</Title>
      <StoreList stores={stores} />
    </div>
  );
};

export default RecentListPage;

const Title = styled.h1`
  font-size: var(--font-medium);
  color: var(--color-main);
  margin-bottom: 20px;
  margin-left: 20px;
`;
