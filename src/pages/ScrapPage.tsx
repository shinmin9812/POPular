import StoreList from '../components/common/Store/StoreList';
import styled from 'styled-components';
import MenuList from '../components/UserMenu/components/MenuList';
import MetaTag from '../components/SEO/MetaTag';
import { useEffect, useState } from 'react';

const ScrapPage = () => {
  const [userId, setUserId] = useState('');
  const getUserInfo = async () => {
    try {
      const response = await fetch('http://34.22.81.36:3000/auth/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      setUserId(data._id);
    } catch (err: any) {
      throw new Error(err);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <Container>
      <MetaTag title={`POPULAR | 위시리스트`} />
      <MenuListContainer>
        <MenuList />
      </MenuListContainer>
      <ContentContainer>
        <Title>위시리스트</Title>
        <StyledStoreList userId={userId} />
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
