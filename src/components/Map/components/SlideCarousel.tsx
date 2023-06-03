import styled from 'styled-components';
import { Store } from '../../../types/store';
import CarouselItem from './CarouselItem';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

const Container = styled.div<{ currentIdx: number }>`
  position: fixed;
  bottom: -100%;

  display: flex;
  align-items: center;

  width: 100vw;
  height: 200px;

  z-index: 200;

  transform: ${(props) => `translateX(-${props.currentIdx > 0 && 320 * props.currentIdx}px)`};
  transition: all 1s;

  margin-left: calc((100vw - 300px) / 2);

  animation: appear 1s forwards;

  @keyframes appear {
    0% {
      bottom: -100%;
    }
    100% {
      bottom: 150px;
    }
  }
`;

interface Props {
  stores: Store[] | undefined;
}

const SlideCarousel = ({ stores }: Props) => {
  const currentIdx = useSelector((state: RootState) => state.map.currentIdx);
  return stores ? (
    <Container currentIdx={currentIdx} className="carousel">
      {stores.map((store, idx) => {
        return <CarouselItem key={idx} store={store} idx={idx} />;
      })}
    </Container>
  ) : (
    <div />
  );
};

export default SlideCarousel;
