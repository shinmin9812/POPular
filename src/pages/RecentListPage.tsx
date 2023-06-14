import styled from 'styled-components';
import StoreList from '../components/common/Store/StoreList';
import MenuList from '../components/UserMenu/components/MenuList';
import MetaTag from '../components/SEO/MetaTag';
import { useEffect, useState } from 'react';
import { Store } from '../types/store';

const isTypeStore = (item: any): item is Store => {
  return true;
};

const RecentListPage = () => {
  const [stores, setStores] = useState<Store[]>();
  const items = localStorage.getItem('store');
  const getStores = () => {
    if (items) {
      const stores: Store[] = JSON.parse(items);
      if (stores.every(isTypeStore)) {
        setStores(stores);
      } else return;
    }
  };

  useEffect(() => {
    getStores();
  }, []);
  return (
    <Container>
      <MetaTag title={`POPULAR | 최근 본 스토어`} />
      <MenuListContainer>
        <MenuList />
      </MenuListContainer>
      <ContentContainer>
        <Title>최근 본 스토어</Title>
        {stores ? (
          <StoreList stores={stores} />
        ) : (
          <div className="nothing">
            <p>
              해당 스토어가
              <br />
              존재하지 않습니다!
            </p>
          </div>
        )}
      </ContentContainer>
    </Container>
  );
};

export default RecentListPage;

const Container = styled.div`
  width: 100%;
  display: flex;
`;

const MenuListContainer = styled.div`
  display: none;
  @media screen and (min-width: 768px) {
    margin: 50px 20px;
    display: block;
    width: 200px;

    & > div {
      width: 200px;
      position: sticky;
      top: 100px;
    }
    div > a,
    div > div {
      width: 200px;
      height: 55px;
      font-size: var(--font-regular);
      :hover {
        font-size: calc(var(--font-regular) + 2px);
      }
    }
  }
`;

const ContentContainer = styled.div`
  flex: 1;

  & li {
    margin: 10px 20px;
    border-radius: 8px;
    background-color: var(--color-light-gray);
  }

  .nothing {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 200px;

    font-size: var(--font-large);
    font-weight: var(--weight-semi-bold);

    line-height: 1.3;

    text-align: center;
    word-break: keep-all;
  }
`;

const Title = styled.h1`
  font-size: 25px;
  color: var(--color-main);
  margin-bottom: 20px;
  margin-left: 20px;
`;
