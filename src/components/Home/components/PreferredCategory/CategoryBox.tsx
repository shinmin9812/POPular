import styled from 'styled-components';
import CategorySelect from './CategorySelect';

const CategoryBox = () => {
  return (
    <Container>
      <CategoryInner>
        <h2>엘리스님에게 추천하는 팝업스토어🐰</h2>
        <CategoryItems>
          <CategorySelect />
        </CategoryItems>
      </CategoryInner>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;

  position: static;
  margin-top: 40px;

  h2 {
    font-weight: var(--weight-semi-bold);
    margin-bottom: 20px;
    text-align: center;
    color: var(--color-main);
  }

  &::before {
    content: '';
    position: absolute;
    top: 50.5%;
    left: 50%;
    width: 100%;
    height: 230px;
    background-color: #fbf3ff;
    transform: translateX(-50%);
    z-index: 0;
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
