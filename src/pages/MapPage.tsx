import styled from 'styled-components';
import Map from '../components/Map/containers/Map';
import MetaTag from '../components/SEO/MetaTag';

const Container = styled.div`
  width: 100%;
  background-color: #214265;
`;

const MapPage = () => {
  return (
    <>
      <MetaTag title="POPular | 지도" url="www" />
      <Container>
        <Map />
      </Container>
    </>
  );
};

export default MapPage;
