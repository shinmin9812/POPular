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

  opacity: 0.8;

  &.current {
    opacity: 1;
    transform: scale(1.05);
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

    dispatch(mapActions.setCurrentIdx(idx));
    dispatch(mapActions.setSlectedId(store.id));

    if (map) {
      const markerPosition = new window.kakao.maps.LatLng(store.coord.lng, store.coord.lat);
      console.log(markerPosition);
      map.setCenter(markerPosition);
    }
  }

  return (
    <Container className={seq} idx={idx} onClick={clickHandler}>
      <StoreItem store={store} />
    </Container>
  );
};

export default CarouselItem;
