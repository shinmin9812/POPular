import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { CLIENT_PATH } from '../../../constants/path';
import PrevIcon from '../Icons/PrevIcon';

const Container = styled.header`
  position: fixed;
  top: 0;
  left: 0;

  width: 100vw;
  height: 80px;

  padding: 20px;

  border-bottom: 1px var(--color-light-gray) solid;

  background-color: #fff;

  z-index: 999;

  .inner {
    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;

    max-width: 1024px;
    height: 100%;

    margin: 0 auto;

    button {
      position: absolute;
      top: 50%;
      left: 0;

      width: 32px;
      height: 32px;

      background-color: transparent;
      border: none;

      transform: translateY(-50%);

      svg {
        fill: var(--color-main);
      }

      &:hover {
        cursor: pointer;
      }
    }
  }
`;

const Header = () => {
  const isHome = useLocation().pathname === CLIENT_PATH.HOME;
  const navigate = useNavigate();

  return (
    <Container>
      <div className="inner">
        {!isHome && (
          <button onClick={() => navigate(-1)}>
            <PrevIcon />
          </button>
        )}
        <Link to={CLIENT_PATH.HOME}>LOGO</Link>
      </div>
    </Container>
  );
};

export default Header;
