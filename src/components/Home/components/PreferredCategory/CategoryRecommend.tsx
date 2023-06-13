import styled from 'styled-components';
import { User } from '../../../../types/user';
import { Store } from '../../../../types/store';
import CategoryItems from './CategoryItems';

interface UserProps {
  users: User | null;
  stores: Store[];
}

const CategoryRecommend = ({ users, stores }: UserProps) => {
  const interestedCategories = users?.interested_category || [];
  return (
    <Container>
      <CategoryList>
        {interestedCategories.map((category) => (
          <CategoryItem key={category}>{category}</CategoryItem>
        ))}
      </CategoryList>
      <CategoryItems stores={stores} />
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
  gap: 10px;
  justify-content: center;
`;

const CategoryItem = styled.div`
  border-radius: 20px;
  background-color: var(--color-main);
  padding: 5px 18px;
  color: var(--color-light-gray);
  font-weight: var(--weight-regular);
  font-size: var(--font-small);
`;

export default CategoryRecommend;
