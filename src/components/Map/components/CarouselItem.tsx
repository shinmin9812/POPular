import styled from 'styled-components';
import { Store } from '../../../types/store';
import StoreItem from '../../common/Store/StoreItem';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { mapActions } from '../mapSlice';

interface Props {
  store: Store;
  idx: number;
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

const CarouselItem = ({ store, idx }: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentIdx = useSelector((state: RootState) => state.map.currentIdx);

  const map = useSelector((state: RootState) => state.map.map);

  let seq = '';
  if (idx === currentIdx - 1) seq = 'prev';
  if (idx === currentIdx) seq = 'current';
  if (idx === currentIdx + 1) seq = 'next';

  function clickHandler() {
    if (seq === 'current') navigate(`/store/${store.id}`);
    const markerPosition = new window.kakao.maps.LatLng(store.coord.lng, store.coord.lat);

    dispatch(mapActions.setCurrentIdx(idx));
    dispatch(mapActions.setSlectedId(store.id));
    map!.panTo(markerPosition);
    dispatch(
      mapActions.setCenter({
        lat: store.coord.lng,
        lng: store.coord.lat,
      }),
    );
  }

  return (
    <Container className={seq} idx={idx} onClick={clickHandler}>
      <StoreItem store={store} />
    </Container>
  );
};

export default CarouselItem;
