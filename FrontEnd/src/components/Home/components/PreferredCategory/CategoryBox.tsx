import styled from 'styled-components';
import CategorySelect from './CategorySelect';
import CategoryRecommend from './CategoryRecommend';
import { useEffect, useState } from 'react';
import { User } from '../../../../types/user';
import { Store } from '../../../../types/store';

interface Props {
  stores: Store[];
}

interface ContainerProps {
  isLogin: boolean;
  isCatagory?: boolean;
}

const CategoryBox = ({ stores }: Props) => {
  const [userData, setUserData] = useState<User | null>(null);
  const [isLogin, setIsLogin] = useState(false);
  const isCatagory =
    userData?.interested_category.length === 0 || userData?.interested_category === undefined ? false : true;

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getUserInfo();
    }
  }, []);

  const getUserInfo = async () => {
    try {
      const response = await fetch('http://34.22.81.36:3000/auth/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
        setIsLogin(true);
      } else {
        setIsLogin(false);
        return null;
      }
    } catch (err: any) {
      throw new Error(err);
    }
  };

  return (
    <Container isLogin={isLogin} isCatagory={isCatagory}>
      <ContainerBackground isLogin={isLogin} isCatagory={isCatagory}>
        <CategoryInner>
          <h2>{userData?.nickname ?? ''}님에게 추천하는 팝업스토어🐰</h2>
          <CategoryItems />
          {isLogin && isCatagory ? (
            <CategoryRecommend stores={stores} users={userData} />
          ) : (
            <CategorySelect isLogin={isLogin} userId={userData?._id} />
          )}
        </CategoryInner>
      </ContainerBackground>
    </Container>
  );
};

const Container = styled.div<ContainerProps>`
  width: 100%;
  margin: 70px 0px;
  height: ${(props) => (props.isLogin && props.isCatagory ? '520px' : '260px')};
  opacity: 0;
  animation: appearOpacity 0.5s 0.9s forwards;

  h2 {
    font-weight: var(--weight-semi-bold);
    font-size: var(--font-medium);
    margin-bottom: 20px;
    text-align: center;
    color: var(--color-main);

    @media all and (max-width: 767px) {
      font-size: 17px;
    }
  }

  @media all and (max-width: 767px) {
    height: ${(props) => (props.isLogin && props.isCatagory ? '800px' : '240px')};
  }
`;

const ContainerBackground = styled.div<{ isLogin: boolean; isCatagory?: boolean }>`
  position: static;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    width: 95%;
    height: ${(props) => (props.isLogin && props.isCatagory ? '520px' : '260px')};
    background-color: rgb(249 244 253);
    transform: translateX(-50%);
    z-index: 0;
    border-radius: 30px;

    @media all and (max-width: 767px) {
      height: ${(props) => (props.isLogin && props.isCatagory ? '800px' : '240px')};
      width: 100%;
      border-radius: 0px;
    }
  }
`;

const CategoryInner = styled.div`
  position: relative;
  z-index: 2;
  padding: 40px 0px;
`;

const CategoryItems = styled.div`
  width: 80%;
  margin: 0 auto;

  background: transparent;
`;

export default CategoryBox;
