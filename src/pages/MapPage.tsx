import styled from 'styled-components';
import Map from '../components/Map/containers/Map';

const Container = styled.div`
  width: 100%;
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
