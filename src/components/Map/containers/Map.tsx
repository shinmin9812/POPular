import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import useGeolocation from '../useGeolocation';
import FindCurrentPositon from '../components/FindCurrentPositon';
import StoreList from '../../common/Store/StoreList';
import { Store } from '../../../types/store';
import SlideCarousel from '../components/SlideCarousel';
import { useDispatch, useSelector } from 'react-redux';
import { mapActions } from '../mapSlice';
import { RootState } from '../../../store';
import { useGetAllStoreQuery } from '../../../api/store';

declare global {
  interface Window {
    kakao: any;
  }
}

interface Coord {
  lat: number;
  lng: number;
}

const Container = styled.div`
  position: fixed;
  top: var(--header-height);
  left: 0;

  height: calc(100vh - var(--header-height) - var(--GNA-height));
  width: 100vw;
  overflow: hidden;

  .overlay {
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;

    width: 40px;
    height: 40px;

    border-radius: 50%;
    border: 3px solid #fff;

    background-color: var(--color-sub);
    box-shadow: 0px 0px 10px 4px rgba(0, 0, 0, 0.2);

    transition: all 0.4s;
    animation: appearOverlay 0.3s forwards;

    svg {
      fill: #fff;
    }

    &:hover,
    &.selected {
      transform: scale(1.4);
    }

    &.selected {
      background-color: var(--color-main);
    }
  }

  .store-list-container {
    position: fixed;

    width: 100%;
    height: calc(100vh - (var(--header-height) * 3));

    bottom: calc(-100% + (var(--GNA-height) * 4) + 50px);

    border-top-left-radius: 20px;
    border-top-right-radius: 20px;

    background-color: var(--color-white);
    z-index: 500;

    transition: bottom 1s;

    .opner {
      display: flex;
      justify-content: center;
      align-items: center;
      top: -50px;
      left: 0;
      width: 100%;
      height: 50px;
      z-index: 500;

      border-top-left-radius: 20px;
      border-bottom: 1px solid var(--color-light-gray);
    }

    .opner::after {
      content: '';
      height: 5px;
      width: 10%;
      min-width: 80px;
      display: block;
      background-color: #c9c9c9;
    }

    .opner:hover {
      cursor: pointer;
    }

    .content {
      height: calc(100% + var(--GNA-height) - 50px);
      background-color: var(--color-white);

      .store-list {
        height: 100%;
        overflow-y: scroll;
      }
    }

    &.open {
      bottom: calc(var(--GNA-height) * 2);
    }
  }

  @keyframes appearOverlay {
    0% {
      top: 10px;
      opacity: 0;
    }
    100% {
      top: 0;
      opacity: 1;
    }
  }
`;

const Map = () => {
  const dispatch = useDispatch();

  const [openList, setOpenList] = useState<boolean>(false);
  const [markers, setMarkers] = useState<any[]>([]);

  const map = useSelector((state: RootState) => state.map.map);
  const selectedId = useSelector((state: RootState) => state.map.selectedId);

  const { data: stores, isFetching, refetch } = useGetAllStoreQuery();

  const container = document.getElementById('map'); // 지도를 표시할 div

  // 최초 맵 렌더링
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://dapi.kakao.com/v2/maps/sdk.js?appkey=a3d0cef8246a5ae73272de576cbbddfb&autoload=false';
    document.head.appendChild(script);
    script.onload = () => {
      window.kakao.maps.load(() => {
        const center = new window.kakao.maps.LatLng(37.50802, 127.062835);
        const options = {
          center,
          level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);
        dispatch(mapActions.setMap(map));
      });
      const center: Coord = {
        lat: 37.566826,
        lng: 126.9786567,
      };

      const options = {
        center: new window.kakao.maps.LatLng(center.lat, center.lng),
        level: 3,
        maxLevel: 8,
      };

      const createdMap = new window.kakao.maps.Map(container, options);

      dispatch(mapActions.setMap(createdMap));
    };
  }, [container]);

  // 맵 이벤트 관리
  useEffect(() => {
    if (!map) return;
  }, [map]);

  // 스토어 업데이트 시 맵 변경사항
  useEffect(() => {
    if (!stores) return;
    markers.forEach((marker) => marker.setMap(null));
    setMarkers([]);

    const markerPosition = new window.kakao.maps.LatLng(stores[0].coord.lng, stores[0].coord.lat);
    map?.setCenter(markerPosition);

    stores.map((store) => {
      const markerPosition = new window.kakao.maps.LatLng(store.coord.lng, store.coord.lat);

      const content = document.createElement('div');
      content.className = 'overlay';
      if (store.id === selectedId) content.classList.add('selected');

      content.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
          <path d="M9.939 0l-.939 4.971v1.098c0 1.066-.933 1.931-2 1.931s-2-.865-2-1.932v-1.097l2.996-4.971h1.943zm-3.052 0l-2.887 4.971v1.098c0 1.066-.933 1.931-2 1.931s-2-.865-2-1.932v-1.097l4.874-4.971h2.013zm17.113 6.068c0 1.067-.934 1.932-2 1.932s-2-.933-2-2v-1.098l-2.887-4.902h2.014l4.873 4.971v1.097zm-10-1.168v1.098c0 1.066-.934 2.002-2 2.002-1.067 0-2-.933-2-2v-1.098l1.047-4.902h1.905l1.048 4.9zm2.004-4.9l2.994 5.002v1.098c0 1.067-.932 1.9-1.998 1.9s-2-.933-2-2v-1.098l-.939-4.902h1.943zm4.996 12v7h-18v-7h18zm2-2h-22v14h22v-14z"/>
        </svg>
      `;

      content.addEventListener('click', () => {
        map!.setCenter(markerPosition);

        dispatch(mapActions.setSlectedId(store.id));
      });

      const overlay = new window.kakao.maps.CustomOverlay({
        content,
        position: markerPosition,
      });

      setMarkers((state) => [...state, overlay]);
      overlay.setMap(map);
    });
  }, [stores]);

  async function getStoreList() {
    const response = await fetch('/store');
    const result: Store[] = await response.json();

    dispatch(mapActions.setCurrentIdx(0));
    dispatch(mapActions.setSlectedId(result[0].id));
    const markerPosition = new window.kakao.maps.LatLng(result[0].coord.lng, result[0].coord.lat);

    map?.setCenter(markerPosition);

    refetch();
  }

  return (
    <Container>
      <div id="map" style={{ width: '100%', height: '100%' }}></div>
      <FindCurrentPositon onClick={() => getStoreList()} />
      <div className={`store-list-container ${openList ? 'open' : ''}`}>
        <div
          className="opner"
          onClick={() => {
            setOpenList(!openList);
          }}
        />
        <div className="content">
          <StoreList stores={stores} />
        </div>
      </div>
      <SlideCarousel stores={stores} />
    </Container>
  );
};
export default Map;
