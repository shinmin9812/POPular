import styled from 'styled-components';

const Container = styled.div`
  width: 40px;
  aspect-ratio: 1/1;

  border-radius: 50%;

  img {
    width: 100%;
    height: 100%;

    object-fit: cover;
  }
`;

const HeaderProfile = () => {
  return (
    <Container>
      <a href="/usermenu">
        <img src="/defaultProfile.svg" alt="" />
      </a>
    </Container>
  );
};

export default HeaderProfile;
