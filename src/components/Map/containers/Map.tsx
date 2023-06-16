import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import FindCurrentPositon from '../components/FindCurrentPositon';
import SlideCarousel from '../components/SlideCarousel';
import { getDistance } from '../../../utils/getDistance';
import { useQuery } from '@tanstack/react-query';
import { API_PATH } from '../../../constants/path';
import { Store } from '../../../types/store';
import StoreSheet from '../components/StoreSheet';
import KakaoMap from '../components/KakaoMap';
import SearchBox from '../components/SearchBox';

declare global {
  interface Window {
    kakao: any;
  }
}

export interface Coord {
  lat: number;
  lng: number;
}

interface Marker {
  setMap(deleted?: null): () => void;
}

interface Bounds {
  getSouthWest(): {
    La: number;
    Ma: number;
  };
}

export interface Map {
  getCenter(): {
    Ma: number;
    La: number;
    getLat(): number;
    getLng(): number;
  };
  getLevel(): number;
  getBounds(): Bounds;
  setCenter(coord: Coord): () => void;
  panTo(coord: Coord): () => void;
}

const Map = () => {
  const [openList, setOpenList] = useState<boolean>(false);
  const [map, setMap] = useState<Map | null>(null);
  const [selectedId, setSlectedId] = useState<string>('');
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [center, setCenter] = useState<Coord>({
    lat: 37.566826,
    lng: 126.9786567,
  });
  const [zoom, setZoom] = useState(3);
  const [distance, setDistance] = useState<number>(0);
  const searchRef = useRef<HTMLInputElement>();

  const {
    data: stores,
    isFetched,
    refetch,
  } = useQuery<Store[]>(['allStore'], async () => {
    const response = await fetch(
      `${API_PATH.STORE.GET.BY_COORD}?x=${center.lat}&y=${center.lng}&distance=${distance}&page=1  `,
    );
    const result = await response.json();
    return result;
  });

  useEffect(() => {
    if (!map) return;
    const boundPoint = map.getBounds();

    searchRef.current?.blur();

    const { La: targetLng, Ma: targetLat } = boundPoint.getSouthWest();
    const distance = getDistance({
      centerLat: center.lat,
      centerLng: center.lng,
      targetLat,
      targetLng,
    });

    setDistance(distance);
  }, [center, zoom]);

  // 최초 맵 렌더링
  useEffect(() => {
    const container = document.getElementById('map'); // 지도를 표시할 div

    const options = {
      center: new window.kakao.maps.LatLng(center.lat, center.lng),
      level: zoom,
      maxLevel: 8,
    };

    const createdMap = new window.kakao.maps.Map(container, options);
    createdMap.relayout();

    window.kakao.maps.event.addListener(createdMap, 'zoom_changed', () => {
      const level = createdMap!.getLevel();
      setZoom(level);
    });

    window.kakao.maps.event.addListener(createdMap, 'dragend', () => {
      const lat = createdMap!.getCenter().getLat();
      const lng = createdMap!.getCenter().getLng();
      setCenter({
        lat,
        lng,
      });
    });

    setMap(createdMap);
  }, []);

  function createMarkers() {
    markers.forEach((marker) => marker.setMap(null));

    const createdMarkers = stores!.map((store, idx) => {
      const markerPosition = new window.kakao.maps.LatLng(store.coord.coordinates[1], store.coord.coordinates[0]);
      const content = document.createElement('div');
      content.className = 'custom-overlay';
      if (selectedId === store._id) content.classList.add('selected');
      content.id = store._id;
      content.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
          <path d="M9.939 0l-.939 4.971v1.098c0 1.066-.933 1.931-2 1.931s-2-.865-2-1.932v-1.097l2.996-4.971h1.943zm-3.052 0l-2.887 4.971v1.098c0 1.066-.933 1.931-2 1.931s-2-.865-2-1.932v-1.097l4.874-4.971h2.013zm17.113 6.068c0 1.067-.934 1.932-2 1.932s-2-.933-2-2v-1.098l-2.887-4.902h2.014l4.873 4.971v1.097zm-10-1.168v1.098c0 1.066-.934 2.002-2 2.002-1.067 0-2-.933-2-2v-1.098l1.047-4.902h1.905l1.048 4.9zm2.004-4.9l2.994 5.002v1.098c0 1.067-.932 1.9-1.998 1.9s-2-.933-2-2v-1.098l-.939-4.902h1.943zm4.996 12v7h-18v-7h18zm2-2h-22v14h22v-14z"/>
        </svg>
      `;

      content.addEventListener('click', () => {
        map!.panTo(markerPosition);
        setCurrentIdx(idx);
        setSlectedId(store._id);
        setCenter({
          lat: +store.coord.coordinates[1],
          lng: +store.coord.coordinates[1],
        });
      });

      const overlay = new window.kakao.maps.CustomOverlay({
        content,
        position: markerPosition,
      });

      overlay.setMap(map);
      return overlay;
    });
    setMarkers(createdMarkers);
  }

  useEffect(() => {
    if (!isFetched || !stores || !map) return;
    if (stores.length === 0) return;

    const markerPosition = new window.kakao.maps.LatLng(stores[0].coord.coordinates[1], stores[0].coord.coordinates[0]);
    setCurrentIdx(0);
    setSlectedId(stores[0]._id);
    setCenter({
      lat: +stores[0].coord.coordinates[1],
      lng: +stores[0].coord.coordinates[0],
    }),
      map.setCenter(markerPosition);
    createMarkers();
  }, [isFetched, stores]);

  // 스토어 업데이트 시 맵 변경사항
  useEffect(() => {
    if (!stores) return;
    createMarkers();
  }, [selectedId]);

  return (
    <Container>
      <KakaoMap />
      {isFetched && stores && stores.length > 0 && (
        <SlideCarousel
          setSlectedId={setSlectedId}
          setCurrentIdx={setCurrentIdx}
          setCenter={setCenter}
          stores={stores}
          map={map as Map}
          currentIdx={currentIdx}
        />
      )}
      <FindCurrentPositon
        onClick={() => {
          refetch();
        }}
      />
      <SearchBox searchRef={searchRef as React.MutableRefObject<HTMLInputElement>} map={map!} setCenter={setCenter} />
      {stores && <StoreSheet openList={openList} setOpenList={setOpenList} stores={stores} />}
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  top: var(--header-height);
  right: 0;

  height: calc(100vh - var(--header-height));
  width: calc(100vw - 400px);
  overflow: hidden;

  .custom-overlay {
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

  @media all and (max-width: 1200px) {
    height: calc(100vh - var(--header-height) - var(--GNA-height));
    width: 100vw;
  }
`;

export default Map;
