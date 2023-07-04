import StoreList from '../components/common/Store/StoreList';
import styled from 'styled-components';
import MenuList from '../components/UserMenu/components/MenuList';
import MetaTag from '../components/SEO/MetaTag';
import { useEffect, useState } from 'react';
import { CLIENT_PATH } from '../constants/path';
import MenuItem from '../components/UserMenu/components/MenuItem';
import { Store } from '../types/store';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const ScrapPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [stores, setStores] = useState<Store[]>([]);

  const fetchStore = async (storeId: string) => {
    const res = await fetch(`http://34.22.81.36:3000/stores/store/${storeId}`);
    const data = await res.json();
    return data;
  };

  const userData = useSelector((state: RootState) => state.UserSlice.user);

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
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getStoreData();
  }, [userData]);

  return (
    // <>
    //   {isLoading ? (
    // <Loading>
    //   <img src="/images/loading.gif" alt="loading" width="100px" />
    // </Loading>
    //   ) : (
    <Container>
      <MetaTag title={`POPULAR | 위시리스트`} />
      <MenuListContainer>
        <NotificationMenu link={CLIENT_PATH.USER_NOTIFICATIONS} title="알림 목록" />
        <MenuList />
      </MenuListContainer>
      <ContentContainer>
        <Title>위시리스트</Title>
        {isLoading ? (
          <Loading>
            <img src="/images/loading.gif" alt="loading" width="100px" />
          </Loading>
        ) : (
          <StyledStoreList stores={stores} />
        )}
      </ContentContainer>
    </Container>
    // )}
    // </>
  );
};

export default ScrapPage;

const Container = styled.div`
  width: 100%;
  display: flex;
`;

const MenuListContainer = styled.div`
  display: none;
  a {
    display: block;
    width: 350px;
    height: 65px;
    font-size: var(--font-medium);
    border-bottom: 0.5px solid var(--color-gray);
    padding: 20px;
    margin: 0;
    cursor: pointer;

    :hover {
      transition: all 0.1s ease;
      color: var(--color-main);
      font-size: calc(var(--font-medium) + 2px);
    }
  }

  @media screen and (min-width: 768px) {
    margin: 50px 20px;
    display: block;
    width: 200px;

    a,
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

const NotificationMenu = styled(MenuItem)`
  display: none;
  @media screen and (min-width: 768px) {
    display: block;
  }
`;

const ContentContainer = styled.div`
  flex: 1;

  & li {
    margin: 10px 20px;
    border-radius: 8px;
    background-color: var(--color-light-gray);
    animation: appear-post 1s forwards;

    @keyframes appear-post {
      0% {
        opacity: 0;
        transform: translateY(20px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }

  @media screen and (max-width: 768px) {
    h1 {
      margin-left: 0;
    }
    li {
      margin: 10px 0;
    }
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

const Loading = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;
