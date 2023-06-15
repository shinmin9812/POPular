import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface Props {
  catecoryList: string;
}

const CategoryItems = ({ catecoryList }: Props) => {
  const [categoryData, setCategoryData] = useState<any[]>([]);
  useEffect(() => {
    getCategoryItems();
  }, [catecoryList]);

  const getCategoryItems = async () => {
    try {
      const response = await fetch(`http://34.22.81.36:3000/stores/category/${catecoryList}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setCategoryData(data);
    } catch (err: any) {
      throw new Error(err);
    }
  };

  return (
    <Container>
      <CategoryItemContainer>
        {categoryData.length > 0 ? (
          <CategoryItemList>
            {categoryData.slice(0, 4).map((store) => {
              const location = store.location.split(' ').slice(0, 2).join(' ');
              return (
                <CategoryItem key={store._id}>
                  <Link to={`/store/${store._id}`}>
                    <ItemInner>
                      <div className="item-image">
                        <img src={store.images[0]} alt={store.title} />
                      </div>
                      <div className="item-description">
                        <p className="item-title">{store.title}</p>
                        <p className="item-location">{location}</p>
                        <p className="item-period">
                          {new Date(store.start_date).toISOString().slice(0, 10)} ~
                          {new Date(store.end_date).toISOString().slice(0, 10)}
                        </p>
                      </div>
                    </ItemInner>
                  </Link>
                </CategoryItem>
              );
            })}
          </CategoryItemList>
        ) : (
          <Notice>
            <TextContianer>
              <p className="notice-emoji">🥲</p>
              <p className="notice-message-1">해당 카테고리의 스토어가 없습니다.</p>
              <p className="notice-message-2">
                <span className="highlight">다른 카테고리</span>를 이용해주세요.
              </p>
            </TextContianer>
          </Notice>
        )}
      </CategoryItemContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

const CategoryItemContainer = styled.div`
  width: 100%;
`;

const CategoryItemList = styled.ul`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 15px;

  @media all and (min-width: 768px) and (max-width: 1023px) {
    justify-content: center;
  }

  @media all and (max-width: 767px) {
    justify-content: center;
  }
`;

const CategoryItem = styled.li`
  width: 49%;
  height: 150px;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: #d7cdd726 0px 0px 3px 3px;
  background-color: var(--color-white);
  animation: Up 1s;

  @keyframes Up {
    0% {
      transform: translateY(10px);
      opacity: 0;
    }
    100% {
      transform: translateY(0px);
      opacity: 1;
    }
  }

  @media all and (min-width: 768px) and (max-width: 1023px) {
    width: 45%;
  }

  @media all and (max-width: 767px) {
    width: 95%;
  }
`;

const ItemInner = styled.div`
  display: flex;
  background-color: var(--color-white);

  .item-image {
    width: 50%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .item-description {
    width: 50%;
    padding: 20px;
    box-sizing: border-box;

    .item-title {
      font-weight: var(--weight-semi-bold);
    }

    .item-location {
      margin-top: 8px;
      display: inline-block;
      font-size: var(--font-micro);
      background-color: var(--color-light-black);
      color: var(--color-white);
      padding: 5px 5px;
      border-radius: 10px;
    }

    .item-period {
      margin-top: 20px;
      font-size: var(--font-small);
      color: var(--color-light-black);
    }
  }
`;

const Notice = styled.div`
  width: 60%;
  height: 250px;
  background-color: var(--color-white);
  border-radius: 10px;
  box-shadow: #d7cdd726 0px 0px 3px 3px;
  margin: 0px auto;
  margin-top: 60px;
  animation: Up 1s;

  @keyframes Up {
    0% {
      transform: translateY(10px);
      opacity: 0;
    }
    100% {
      transform: translateY(0px);
      opacity: 1;
    }
  }

  @media all and (max-width: 767px) {
    width: 95%;
    height: 350px;
  }
`;

const TextContianer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .notice-emoji {
    font-size: 35px;
  }

  .notice-message-1 {
    margin-top: 30px;
    font-size: var(--font-regular);
    font-weight: var(--weight-regular);
  }
  .notice-message-2 {
    margin-top: 6px;
    font-size: var(--font-medium);
    font-weight: var(--weight-semi-bold);
  }

  .highlight {
    box-shadow: inset 0 -20px 0 #bfffa1;
  }
`;

export default CategoryItems;
