import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { CLIENT_PATH } from '../../../constants/path';
import PrevIcon from '../Icons/PrevIcon';
import { NavLink } from 'react-router-dom';
import HeaderSearchBox from './HeaderSearchBox';
import HeaderProfile from './HeaderProfile';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../Hooks/useSelectorHooks';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { useGetLoginuser } from '../../../api/userApi';
import { setUser } from '../../User/UserSlice';
import { User } from '../../../types/user';
const Container = styled.header`
  position: fixed;
  top: 0;
  left: 0;

  width: 100vw;
  height: 80px;

  padding: 20px;

  border-bottom: 1px var(--color-light-gray) solid;

  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);

  z-index: 999;
  box-shadow: 0px 0px 22px -6px rgba(0, 0, 0, 0.4);
  transition: all 0.3s;

  &.hide {
    top: -90px;
  }

  &.top {
    box-shadow: none;
  }

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
      align-items: center;
      height: fit-content;

      .prev-btn {
        display: none;
      }

      .logo {
        margin-right: 40px;

        font-size: 30px;

        color: var(--color-main);

        img {
          width: 150px;
        }
      }

      nav {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .links {
          display: flex;
          gap: 40px;
          font-size: 18px;

          a {
            position: relative;
            transition: all 0.5s;
            color: var(--color-light-black);
            background-color: transparent;
            font-weight: 300;
            transform-origin: bottom center;

            &:hover {
              transform: translateY(-3px);
            }

            &.active {
              color: var(--color-main);
              font-weight: 500;
              transform: scale(1.2);
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
    .logo {
      width: 200px;
      img {
        width: 100%;
      }
    }
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
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.UserSlice.user);

  const [position, setPosition] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);

  const { refetch } = useGetLoginuser({
    enabled: false,
    onSuccess: (data: User) => {
      if (data._id) dispatch(setUser(data));
    },
  });

  useEffect(() => {
    const handleScroll = () => {
      const moving = window.pageYOffset;
      setVisible(position > moving);
      setPosition(moving);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [position]);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      refetch();
    }
  }, []);

  return (
    <Container className={`${visible ? '' : 'hide'}${position === 0 ? 'top' : ''}`}>
      <div className="inner">
        {!isHome && (
          <button className="prev-btn" onClick={() => navigate(-1)}>
            <PrevIcon />
          </button>
        )}
        <Link className="logo" to={CLIENT_PATH.HOME}>
          <img src="/images/logo.png" alt="POPULAR" />
        </Link>

        <nav>
          <div className="links">
            <NavLink to={CLIENT_PATH.MAP} className={({ isActive }) => (isActive ? 'active' : '')}>
              지도
            </NavLink>
            <NavLink to={CLIENT_PATH.BOARD_ALL} className={({ isActive }) => (isActive ? 'active' : '')}>
              커뮤니티
            </NavLink>
            {user?.role === 'admin' && (
              <NavLink to={'/admin'} target="_blank">
                관리자
              </NavLink>
            )}
          </div>
        </nav>
        <div className="sub-links">
          <HeaderSearchBox />
          {user ? <HeaderProfile src={user.profile} /> : <Login to="/login">LOGIN</Login>}
        </div>
      </div>
    </Container>
  );
};

const Login = styled(NavLink)`
  font-size: 20px;
  font-weight: 300;
  color: var(--color-main);
`;

export default Header;
