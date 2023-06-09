import { useEffect, useState } from 'react';
import styled from 'styled-components';
import CategorySelect from './CategorySelect';

interface ContainerProps {
  windowWidth: number;
}

const CategoryBox = () => {
  // 백그라운드 영역 사이즈 동적으로 조정하기
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <Container windowWidth={windowWidth}>
      <CategoryInner>
        <h2>엘리스님에게 추천하는 팝업스토어🐰</h2>
        <CategoryItems>
          <CategorySelect />
        </CategoryItems>
      </CategoryInner>
    </Container>
  );
};

const Container = styled.div<ContainerProps>`
  width: 100%;

  position: relative;

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
    top: 0;
    left: 50%;
    width: ${(props) => props.windowWidth - 13}px;
    height: 100%;
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
