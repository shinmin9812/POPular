import styled from 'styled-components';
import { useEffect } from 'react';

type Place = {
  location: string | undefined;
  coordinates: [number, number];
};

const Container = styled.div`
  width: 100%;
  margin-top: 40px;

  .store-location-title {
    font-size: 18px;
    font-weight: 700;
  }

  .store-location-img {
    width: 100%;
    height: 175px;
    margin-top: 10px;
  }

  .store-location {
    font-size: 14px;
    margin-top: 10px;
  }
`;

const InfoPlace = ({ location, coordinates }: Place) => {
  useEffect(() => {
    const container = document.getElementById('store-detail-map');
    const latLng = new window.kakao.maps.LatLng(coordinates[1], coordinates[0]);
    const options = {
      center: latLng,
      level: 3,
    };

    const map = new window.kakao.maps.Map(container, options);

    const markerPosition = latLng;
    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
    });

    marker.setMap(map);
  }, [coordinates, location]);

  return (
    <Container>
      <p className="store-location-title">오시는 길</p>
      <div id="store-detail-map" className="store-location-img"></div>
      <p className="store-location">{location}</p>
    </Container>
  );
};

export default InfoPlace;
