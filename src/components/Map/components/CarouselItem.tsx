import styled from 'styled-components';
import { Store } from '../../../types/store';
import StoreItem from '../../common/Store/StoreItem';
import { useNavigate } from 'react-router-dom';
import { MapProps } from './SlideCarousel';
import { Map } from '../containers/Map';

interface Props extends MapProps {
  store: Store;
  idx: number;
  currentIdx: number;
}

const Container = styled.div<{ idx: number }>`
  display: flex;
  align-items: center;
  max-width: 300px;
  border-radius: 10px;

  background-color: #fff;

  transition: all 1s;
  transform-origin: center center;

  margin-right: 20px;

  opacity: 0.9;

  filter: brightness(0.6);
  transform: scale(0.95);

  &.current {
    opacity: 1;
    transform: scale(1.05);
    filter: brightness(1);
  }
`;

const CarouselItem = ({ store, map, idx, currentIdx, setSlectedId, setCurrentIdx, setCenter }: Props) => {
  const navigate = useNavigate();
  map as Map;

  let seq = '';
  if (idx === currentIdx - 1) seq = 'prev';
  if (idx === currentIdx) seq = 'current';
  if (idx === currentIdx + 1) seq = 'next';

  function clickHandler() {
    if (seq === 'current') navigate(`/store/${store._id}`);
    const markerPosition = new window.kakao.maps.LatLng(store.coord.coordinates[1], store.coord.coordinates[0]);

    setCurrentIdx(idx);
    setSlectedId(store._id);
    map.panTo(markerPosition);
    setCenter({
      lat: +store.coord.coordinates[1],
      lng: +store.coord.coordinates[0],
    });
  }

  return (
    <Container className={seq} idx={idx} onClick={clickHandler}>
      <StoreItem store={store} />
    </Container>
  );
};

export default CarouselItem;
