import styled from 'styled-components';
import CategorySelect from './CategorySelect';
import CategoryRecommend from './CategoryRecommend';
import { useEffect, useState } from 'react';
import { User } from '../../../../types/user';
import { Store } from '../../../../types/store';

interface Props {
  stores: Store[];
  text: string;
}

const CategoryBox = ({ stores, text }: Props) => {
  const [userData, setUserData] = useState<User | null>(null);
  const [isLogin, setIsLogin] = useState(false);

  const isCatagory =
    userData?.interested_category.length === 0 || userData?.interested_category === undefined ? false : true;

  useEffect(() => {
    getUserInfo();
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
    <Container>
      <ContainerBackground isLogin={isLogin} isCatagory={isCatagory}>
        <CategoryInner>
          <h2>{text}</h2>
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

const Container = styled.div`
  width: 100%;
  margin: 70px 0px;

  h2 {
    font-weight: var(--weight-semi-bold);
    font-size: var(--font-medium);
    margin-bottom: 20px;
    text-align: center;
    color: var(--color-main);
  }
`;

const ContainerBackground = styled.div<{ isLogin: boolean; isCatagory?: boolean }>`
  position: static;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    width: 95%;
    height: ${(props) => (props.isLogin && props.isCatagory ? '520px' : '270px')};
    background-color: rgb(249 244 253);
    transform: translateX(-50%);
    z-index: 0;
    border-radius: 30px;

    @media all and (max-width: 767px) {
      height: ${(props) => (props.isLogin ? '850px' : '270px')};
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
