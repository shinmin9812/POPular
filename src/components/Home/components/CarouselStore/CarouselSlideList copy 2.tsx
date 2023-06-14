import styled from 'styled-components';
import { Store } from '../../../../types/store';
import { Link } from 'react-router-dom';
import CasouselSlideItem from './CarouselSlideItem';
import { TouchEventHandler, useEffect, useRef, useState } from 'react';

let touchStartX: number;
let touchEndX: number;

interface Props {
  stores: Store[];
}

const CarouselSlideList = ({ stores }: Props) => {
  const [currIndex, setCurrIndex] = useState(1);
  const [currList, setCurrList] = useState<string[]>([]);

  console.log(currList);

  const carouselRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (stores.length !== 0) {
      const startData = stores[0];
      const endData = stores[stores.length - 1];
      const newList = [endData, ...stores, startData];

      setCurrList(newList);
    }
  }, [stores]);

  useEffect(() => {
    if (carouselRef.current !== null) {
      carouselRef.current.style.transform = `translateX(-${currIndex}00%`;
    }
  }, [currIndex]);

  const handleSwipe = (direction: number) => {
    const newIndex = currIndex + direction;

    if (newIndex === stores.length + 1) {
      moveToNthSlide(1);
    } else if (newIndex === 0) {
      moveToNthSlide(stores.length);
    }

    setCurrIndex((prev) => prev + direction);
    if (carouselRef.current !== null) {
      carouselRef.current.style.transition = 'all 0.5s ease-in-out';
    }
  };

  const handleTouchStart: TouchEventHandler<HTMLDivElement> = (e) => {
    touchStartX = e.nativeEvent.touches[0].clientX;
  };

  const handleTouchMove: TouchEventHandler<HTMLDivElement> = (e) => {
    const currTouchX = e.nativeEvent.changedTouches[0].clientX;

    if (carouselRef.current !== null) {
      carouselRef.current.style.transform = `translateX(calc(-${currIndex}00% - ${
        (touchStartX - currTouchX) * 2 || 0
      }px))`;
    }
  };

  const handleTouchEnd: TouchEventHandler<HTMLDivElement> = (e) => {
    touchEndX = e.nativeEvent.changedTouches[0].clientX;

    if (touchStartX >= touchEndX) {
      handleSwipe(1);
    } else {
      handleSwipe(-1);
    }
  };

  return (
    <CarouselContainer>
      <h2>추천 팝업스토어😍</h2>
      <CarouselBox
        className={'carouselWrapper'}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <CarouselList className={'carousel'} ref={carouselRef}>
          {currList.map((store: Store) => (
            <li key={store._id} className={'carouselItem'}>
              <Link to={`/store/${store._id}`}>
                <CasouselSlideItem store={store} />
              </Link>
            </li>
          ))}
        </CarouselList>

        <button type="button" className={'swipeLeft'} onClick={() => handleSwipe(-1)}>
          PREV
        </button>
        <button type="button" className={'swipeRight'} onClick={() => handleSwipe(1)}>
          NEXT
        </button>
      </CarouselBox>
    </CarouselContainer>
  );
};

const CarouselContainer = styled.div`
  margin-top: 50px;

  h2 {
    font-weight: var(--weight-semi-bold);
    font-size: var(--font-medium);
    margin-bottom: 20px;
  }

  .carouselWrapper {
    position: relative;
    width: 100%;
    padding: 0 10%;
    overflow: hidden;

    &:hover {
      .swipeLeft,
      .swipeRight {
        position: absolute;
        top: 45%;
        z-index: 1;
        display: block;
        padding: 8px 6px;
        background-color: colors.$GRAYE;
        border-radius: 10px;
      }
    }
  }

  .swipeLeft,
  .swipeRight {
    display: none;
  }

  .swipeLeft {
    left: 0;
  }

  .swipeRight {
    right: 0;
  }

  .carousel {
    display: flex;
    width: 100%;

    li {
      flex: none;
      object-fit: contain;
    }
  }

  .carouselItem {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 200px;
    padding: 10px 0 15px;
    overflow: hidden;
    border-right: 2px solid colors.$WHITE;
    border-left: 2px solid colors.$WHITE;
    transition: border 300ms;

    img {
      flex-shrink: 0;
      min-width: 100%;
      min-height: 100%;
    }
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

export default CarouselSlideList;
