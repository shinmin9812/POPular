import styled from 'styled-components';
import { Store } from '../../../types/store';
import CarouselItem from './CarouselItem';
import { Coord, Map } from '../containers/Map';

const Container = styled.div<{ currentIdx: number }>`
  position: fixed;
  bottom: -100%;

  display: flex;
  align-items: center;

  width: calc(100vw - 500px);
  height: 200px;

  z-index: 200;

  transform: ${(props) => `translateX(-${props.currentIdx > 0 && 320 * props.currentIdx}px)`};
  transition: all 1s;

  margin-left: 20vw;

  animation: appear 1s forwards;

  @keyframes appear {
    0% {
      bottom: -100%;
    }
    100% {
      bottom: 150px;
    }
  }

  @media all and (max-width: 767px) {
    margin-left: calc((100vw - 300px) / 2);
  }
`;

export interface MapProps {
  map: Map;
  setSlectedId: React.Dispatch<React.SetStateAction<string>>;
  setCurrentIdx: React.Dispatch<React.SetStateAction<number>>;
  setCenter: React.Dispatch<React.SetStateAction<Coord>>;
}

interface Props extends MapProps {
  stores: Store[] | undefined;
  currentIdx: number;
}

const SlideCarousel = ({ stores, map, currentIdx, setSlectedId, setCurrentIdx, setCenter }: Props) => {
  return Array.isArray(stores) ? (
    <Container currentIdx={currentIdx} className="carousel">
      {stores.map((store, idx) => {
        return (
          <CarouselItem
            key={idx}
            store={store}
            idx={idx}
            map={map}
            currentIdx={currentIdx}
            setSlectedId={setSlectedId}
            setCurrentIdx={setCurrentIdx}
            setCenter={setCenter}
          />
        );
      })}
    </Container>
  ) : (
    <div />
  );
};

export default SlideCarousel;
