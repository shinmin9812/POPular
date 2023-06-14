import styled from 'styled-components';
import { Store } from '../../../../types/store';
import { Link } from 'react-router-dom';
import CasouselSlideItem from './CarouselSlideItem';
import PrevArrowIcon from '../../../common/Icons/PrevArrowIcon';
import NextArrowIcon from '../../../common/Icons/NextArrowIcon';
import { useRef } from 'react';

interface Props {
  stores: Store[];
  text: string;
}

const CarouselSlideList = ({ stores, text }: Props) => {
  const scrollContainerRef = useRef<HTMLUListElement | null>(null);
  const scrollX = (direction: 'prev' | 'next') => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = direction === 'next' ? container.offsetWidth / 5 : -container.offsetWidth / 5;
      container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <CarouselContainer>
      <h2>{text}</h2>

      <CarouselList ref={scrollContainerRef}>
        {stores.map((store: Store) => (
          <CarouselItem key={store._id}>
            <Link to={`/store/${store._id}`}>
              <CasouselSlideItem store={store} />
            </Link>
          </CarouselItem>
        ))}
      </CarouselList>

      <button onClick={() => scrollX('prev')} className="prev-button">
        <PrevArrowIcon />
      </button>
      <button onClick={() => scrollX('next')} className="next-button">
        <NextArrowIcon />
      </button>
    </CarouselContainer>
  );
};

const CarouselContainer = styled.div`
  margin-top: 50px;
  position: relative;

  h2 {
    font-weight: var(--weight-semi-bold);
    font-size: var(--font-medium);
    margin-bottom: 20px;
  }

  button {
    position: absolute;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: var(--color-white);
    cursor: pointer;
    transform: translateY(0);
    transition: all 0.2s;
    box-shadow: 1px 1px 1px #ddd;

    &:hover {
      transform: translateY(-3px);
      filter: brightness(1.3);
    }
  }

  .prev-button {
    left: -20px;
    top: 50%;
    margin-top: -20px;
  }

  .next-button {
    right: -20px;
    top: 50%;
    margin-top: -20px;
  }
`;

const CarouselList = styled.ul`
  display: flex;
  align-items: center;
  column-gap: 20px;
  height: 100%;
  overflow-x: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const CarouselItem = styled.li`
  scroll-snap-align: start;
`;

export default CarouselSlideList;
