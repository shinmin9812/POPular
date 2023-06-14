import styled from 'styled-components';
// import { Store } from '../../../../types/store';
// import { Link } from 'react-router-dom';
// import CasouselSlideItem from './CarouselSlideItem';
import { useEffect, useRef, useState } from 'react';

const CarouselSlideList = ({ stores }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);

  //const TOTAL_SLIDES = stores?.length || 0;
  const TOTAL_SLIDES = 8;

  console.log(TOTAL_SLIDES);

  useEffect(() => {
    if (slideRef.current) {
      slideRef.current.style.transition = 'all 0.5s ease-in-out';
      slideRef.current.style.transform = `translateX(-${currentSlide}00px)`;
    }
  }, [currentSlide]);

  const nextSlide = () => {
    if (currentSlide >= TOTAL_SLIDES - 1) {
      setCurrentSlide(TOTAL_SLIDES - 1);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };
  const prevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(currentSlide);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <CarouselContainer>
      <h2>추천 팝업스토어😍</h2>
      <CarouselBox>
        <CarouselList ref={slideRef}>
          {/* {stores.map((store: Store) => (
            <li key={store._id}>
              <Link to={`/store/${store._id}`}>
                <CasouselSlideItem store={store} />
              </Link>
            </li>
          ))} */}
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
        </CarouselList>
        <Button disabled={currentSlide === 0} onClick={prevSlide}>
          Previous Slide
        </Button>
        <Button disabled={currentSlide === TOTAL_SLIDES - 1} onClick={nextSlide}>
          Next Slide
        </Button>
      </CarouselBox>
    </CarouselContainer>
  );
};

const CarouselContainer = styled.div`
  margin-top: 50px;
  overflow: hidden;

  h2 {
    font-weight: var(--weight-semi-bold);
    font-size: var(--font-medium);
    margin-bottom: 20px;
  }
`;

const CarouselBox = styled.div``;

const CarouselList = styled.ul`
  display: flex;

  > li {
    width: 200px;
    height: 200px;
    background-color: beige;
  }
`;

const Button = styled.button`
  all: unset;
  border: 1px solid coral;
  padding: 0.5em 2em;
  color: coral;
  border-radius: 10px;
  &:hover {
    transition: all 0.3s ease-in-out;
    background-color: coral;
    color: #fff;
  }
`;

export default CarouselSlideList;
