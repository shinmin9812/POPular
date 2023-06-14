import StoreList from '../components/common/Store/StoreList';
import styled from 'styled-components';
import MenuList from '../components/UserMenu/components/MenuList';
import MetaTag from '../components/SEO/MetaTag';
import { useEffect, useState } from 'react';
import { User } from '../types/user';
import { Store } from '../types/store';

const ScrapPage = ({ userData }: { userData: User | undefined }) => {
  const [stores, setStores] = useState<Store[]>([]);

  const fetchStore = async (storeId: string) => {
    const res = await fetch(`http://34.22.81.36:3000/stores/store/${storeId}`);
    const data = await res.json();
    return data;
  };

  const getStoreData = async () => {
    if (userData) {
      const res = await fetch(`http://34.22.81.36:3000/users/${userData._id}/scraps`);
      const storeIdData = await res.json();
      const storeData = await Promise.all(
        storeIdData.map((id: string) => {
          return fetchStore(id);
        }),
      );
      setStores(storeData);
    }
  };

  useEffect(() => {
    getStoreData();
  }, [userData]);

  return (
    <Container>
      <MetaTag title={`POPULAR | 위시리스트`} />
      <MenuListContainer>
        <MenuList />
      </MenuListContainer>
      <ContentContainer>
        <Title>위시리스트</Title>
        <StyledStoreList stores={stores} />
      </ContentContainer>
    </Container>
  );
};

export default ScrapPage;

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
`;

const Title = styled.h1`
  font-size: 25px;
  color: var(--color-main);
  margin-bottom: 20px;
  margin-left: 20px;
`;

const StyledStoreList = styled(StoreList)`
  @media (min-width: 768px) {
    & article {
      width: 50%;
    }
  }
`;
