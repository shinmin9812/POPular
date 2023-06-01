import styled from 'styled-components';
import { Store } from '../types/store';
import Map from '../components/Map/containers/Map';
import useGeolocation from '../components/Map/useGeolocation';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #214265;
`;

const MapPage = () => {
  return (
    <Container>
      <Map />
    </Container>
  );
};

export default MapPage;
