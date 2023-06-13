import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { CLIENT_PATH } from '../../../constants/path';
import PrevIcon from '../Icons/PrevIcon';
import { NavLink } from 'react-router-dom';
import HeaderSearchBox from './HeaderSearchBox';
import HeaderProfile from './HeaderProfile';

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

    .prev-btn {
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

  @media all and (min-width: 768px) {
    .inner {
      justify-content: flex-start;
      align-items: end;
      height: fit-content;

      .prev-btn {
        display: none;
      }

      .logo {
        margin-right: 40px;

        font-size: 30px;

        color: var(--color-main);
      }

      nav {
        display: flex;
        justify-content: space-between;
        align-items: center;

        flex-grow: 1;

        .links {
          display: flex;
          gap: 40px;
          font-size: 18px;

          a {
            transition: all 0.5s;
            color: var(--color-light-black);

            &.active {
              color: var(--color-main);

              transform: scale(1.1);
            }
          }
        }
      }

      .sub-links {
        display: flex;
        align-items: center;
        gap: 20px;
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-40%);
      }
    }
  }

  @media all and (max-width: 767px) {
    .prev-btn {
      display: block;
    }
    nav,
    .sub-links {
      display: none;
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
          <button className="prev-btn" onClick={() => navigate(-1)}>
            <PrevIcon />
          </button>
        )}
        <Link className="logo" to={CLIENT_PATH.HOME}>
          POPULAR
        </Link>

        <nav>
          <div className="links">
            <NavLink to={CLIENT_PATH.MAP} className={({ isActive }) => (isActive ? 'active' : '')}>
              지도
            </NavLink>
            <NavLink to={'/community/board/all'} className={({ isActive }) => (isActive ? 'active' : '')}>
              커뮤니티
            </NavLink>
            <NavLink to={'/admin'}>관리자</NavLink>
          </div>
        </nav>
        <div className="sub-links">
          <HeaderSearchBox />
          <HeaderProfile />
        </div>
      </div>
    </Container>
  );
};

export default Header;
