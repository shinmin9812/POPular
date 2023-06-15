import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  width: 40px;
  aspect-ratio: 1/1;

  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;

    object-fit: cover;
  }
`;

const HeaderProfile = ({ src }: { src: string }) => {
  return (
    <Container>
      <Link to="/usermenu">
        <img src={src} alt="profile" onError={() => 'this.src="/defaultProfile.svg"'} />
      </Link>
    </Container>
  );
};

export default HeaderProfile;
