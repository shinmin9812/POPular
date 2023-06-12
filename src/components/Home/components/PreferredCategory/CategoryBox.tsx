import styled from 'styled-components';
import CategorySelect from './CategorySelect';

const CategoryBox = () => {
  return (
    <Container>
      <ContainerBackground>
        <CategoryInner>
          <h2>엘리스님에게 추천하는 팝업스토어🐰</h2>
          <CategoryItems>
            <CategorySelect />
          </CategoryItems>
        </CategoryInner>
      </ContainerBackground>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  margin-top: 60px;

  h2 {
    font-weight: var(--weight-semi-bold);
    font-size: var(--font-medium);
    margin-bottom: 20px;
    text-align: center;
    color: var(--color-main);
  }
`;

const ContainerBackground = styled.div`
  position: static;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    width: 100%;
    height: 250px;
    background-color: rgb(249 244 253);
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
