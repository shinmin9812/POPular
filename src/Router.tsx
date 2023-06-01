import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout';
import HomePage from './pages/Homepage';
import { CLIENT_PATH } from './constants/path';
import MapPage from './pages/MapPage';
import SearchPage from './pages/SearchPage';
import CommunityPage from './pages/CommunityPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path={CLIENT_PATH.HOME} element={<HomePage />}></Route>
          <Route path={CLIENT_PATH.MAP} element={<MapPage />}></Route>
          <Route path={CLIENT_PATH.SEARCH} element={<SearchPage />}></Route>
          <Route path={CLIENT_PATH.COMMUNITY} element={<CommunityPage />}></Route>
          <Route path={CLIENT_PATH.USER_DETAIL} element={<UserPage />}></Route>
          <Route path={CLIENT_PATH.LOGIN} element={<LoginPage />}></Route>
          <Route path={CLIENT_PATH.PROFILE} element={<ProfilePage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
