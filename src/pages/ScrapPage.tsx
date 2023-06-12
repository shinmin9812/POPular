// import { userData } from '../mocks/data/user';
import { storeData } from '../mocks/data/stores';
import StoreList from '../components/common/Store/StoreList';
import styled from 'styled-components';

const ScrapPage = () => {
  return (
    <div>
      <Title>위시리스트</Title>
      <StoreList stores={storeData} />
    </div>
  );
};

export default ScrapPage;

const Title = styled.h1`
  font-size: var(--font-medium);
  color: var(--color-main);
  margin-bottom: 20px;
  margin-left: 20px;
`;
