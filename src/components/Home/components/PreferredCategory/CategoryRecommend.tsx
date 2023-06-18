import styled, { css } from 'styled-components';
import { User } from '../../../../types/user';
import { Store } from '../../../../types/store';
import CategoryItems from './CategoryItems';
import { useState } from 'react';

interface UserProps {
  users: User | null;
  stores: Store[];
}

type CategoryItemProps = {
  active: 'active' | 'item';
};

const CategoryRecommend = ({ users, stores }: UserProps) => {
  const interestedCategories = users?.interested_category || [];
  const [selectCategory, setSelectCategory] = useState(interestedCategories[0]);

  return (
    <Container>
      <CategoryList>
        {interestedCategories.map((category) => (
          <CategoryItem
            key={category}
            onClick={() => setSelectCategory(category)}
            active={selectCategory === category ? 'active' : 'item'}
          >
            {category}
          </CategoryItem>
        ))}
      </CategoryList>
      <CategoryItems catecoryList={selectCategory} />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

const CategoryList = styled.div`
  width: 100%;
  margin: 28px auto;
  display: flex;
  gap: 6px;
  justify-content: center;
  flex-wrap: wrap;
`;

const CategoryItem = styled.div<CategoryItemProps>`
  border-radius: 20px;
  padding: 5px 18px;
  color: var(--color-light-gray);
  font-weight: var(--weight-regular);
  font-size: var(--font-small);
  cursor: pointer;
  transition: all 0.2s;

  ${(props) =>
    props.active === 'active' &&
    css`
      background-color: var(--color-main);
      color: var(--color-white);

      &:hover {
        background-color: var(--color-main);
        color: #fff;
      }
    `}

  ${(props) =>
    props.active === 'item' &&
    css`
      background-color: var(--color-light-black);
      color: var(--color-white);

      &:hover {
        background-color: var(--color-main);
        color: #fff;
      }
    `}
`;

export default CategoryRecommend;
