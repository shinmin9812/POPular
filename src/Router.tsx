import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout';
import HomePage from './pages/Homepage';
import { CLIENT_PATH } from './constants/path';
import MapPage from './pages/MapPage';
import SearchPage from './pages/SearchPage';
import CommunityPage from './pages/CommunityPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import WritePostPage from './pages/WritePostPage';
import StoreDetailPage from './pages/StoreDetailPage';
import SignupPage from './pages/SignupPage';
import RecentListPage from './pages/RecentListPage';
import UserMenuPage from './pages/UserMenuPage';
import ScrapPage from './pages/ScrapPage';
import NotificationsPage from './pages/NotificationsPage';
import MyPostPage from './pages/MyPostPage';
import MyCommentPage from './pages/MyCommentPage';
import PostDetailPage from './pages/PostDetailPage';
import UserUpdatePage from './pages/UserUpdatePage';
import AdminLayout from './components/Admin/components/AdminLayout';
import AdminPage from './pages/Admin/AdminPage';
import AdminStoreAddPage from './pages/Admin/AdminStoreAddPage';
import AdminStoreEditPage from './pages/Admin/AdminStoreEditPage';
import AdminStoreEditPageDetail from './pages/Admin/AdminStoreEditPageDetail';
import AdminStoreStatisticsPage from './pages/Admin/AdminStoreStatisticsPage';
import AdminStoreDeletePage from './pages/Admin/AdminStoreDeletePage';
import AdminStoreStatisticsDetailPage from './pages/Admin/AdminStoreStatisticsDetailPage';
import AdminUserStatisticsPage from './pages/Admin/AdminUserStatisticsPage';
import AdminUserDetailPage from './pages/Admin/AdminUserDetailPage';
import AdminUserEditPage from './pages/Admin/AdminUserEditPage';
import AdminUserDeletePage from './pages/Admin/AdminUserDeletePage';
import AuthChecker from './AuthChecker';
import AdminFeedStatisticsPage from './pages/Admin/AdminFeedStatisticsPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path={CLIENT_PATH.HOME} element={<HomePage />}></Route>
          <Route path={CLIENT_PATH.POST} element={<PostDetailPage />}></Route>
          <Route path={CLIENT_PATH.MAP} element={<MapPage />}></Route>
          <Route path={CLIENT_PATH.SEARCH} element={<SearchPage />}></Route>
          <Route path={CLIENT_PATH.BOARD_ALL} element={<CommunityPage />}></Route>
          <Route path={CLIENT_PATH.BOARD} element={<CommunityPage />}></Route>
          <Route path={CLIENT_PATH.USER_MENU} element={<UserMenuPage />}></Route>
          <Route path={CLIENT_PATH.PROFILE} element={<UserPage />}></Route>
          <Route path={CLIENT_PATH.LOGIN} element={<LoginPage />}></Route>
          <Route path={CLIENT_PATH.SIGNUP} element={<SignupPage />}></Route>
          <Route path={CLIENT_PATH.STORE_DETAIL} element={<StoreDetailPage />}></Route>
          <Route path={CLIENT_PATH.USER_RECENT} element={<RecentListPage />}></Route>

          <Route element={<AuthChecker />}>
            <Route path={CLIENT_PATH.WRITE} element={<WritePostPage />} />
            <Route path={CLIENT_PATH.USER_SCRAP} element={<ScrapPage />} />
            <Route path={CLIENT_PATH.USER_POSTS} element={<MyPostPage />} />
            <Route path={CLIENT_PATH.USER_NOTIFICATIONS} element={<NotificationsPage />} />
            <Route path={CLIENT_PATH.USER_POSTS} element={<MyPostPage />} />
            <Route path={CLIENT_PATH.USER_COMMENTS} element={<MyCommentPage />} />
            <Route path={CLIENT_PATH.USER_UPDATE} element={<UserUpdatePage />} />
          </Route>
        </Route>

        <Route element={<AuthChecker admin={true} />}>
          <Route element={<AdminLayout />}>
            <Route path={CLIENT_PATH.ADMIN} element={<AdminPage />} />
            <Route path={CLIENT_PATH.ADMIN_STORE.STATISTICS} element={<AdminStoreStatisticsPage />}>
              <Route
                path={`${CLIENT_PATH.ADMIN_STORE.STATISTICS}/:storeId`}
                element={<AdminStoreStatisticsDetailPage />}
              />
            </Route>
            <Route path={CLIENT_PATH.ADMIN_STORE.ADD} element={<AdminStoreAddPage />} />
            <Route path={CLIENT_PATH.ADMIN_STORE.EDIT} element={<AdminStoreEditPage />}>
              <Route path={`${CLIENT_PATH.ADMIN_STORE.EDIT}/:storeId`} element={<AdminStoreEditPageDetail />} />
            </Route>
            <Route path={CLIENT_PATH.ADMIN_STORE.DELETE} element={<AdminStoreDeletePage />} />

            <Route path={CLIENT_PATH.ADMIN_USER.STATISTICS} element={<AdminUserStatisticsPage />}>
              <Route path={`${CLIENT_PATH.ADMIN_USER.STATISTICS}/:userId`} element={<AdminUserDetailPage />} />
            </Route>
            <Route />
            <Route path={CLIENT_PATH.ADMIN_USER.ADD} element={<AdminPage />}></Route>
            <Route path={CLIENT_PATH.ADMIN_USER.EDIT} element={<AdminUserEditPage />}>
              <Route path={`${CLIENT_PATH.ADMIN_USER.EDIT}/:userId`} element={<AdminUserDetailPage />} />
            </Route>
            <Route path={CLIENT_PATH.ADMIN_USER.DELETE} element={<AdminUserDeletePage />} />

            <Route path={CLIENT_PATH.ADMIN_FEED.STATISTICS} element={<AdminFeedStatisticsPage />} />
            <Route path={CLIENT_PATH.ADMIN_FEED.EDIT} element={<AdminPage />} />
            <Route path={CLIENT_PATH.ADMIN_FEED.DELETE} element={<AdminUserDeletePage />} />
            <Route path={CLIENT_PATH.ADMIN_NOTIFICATION.SEND} element={<AdminPage />} />
            <Route path={CLIENT_PATH.ADMIN_NOTIFICATION.EDIT} element={<AdminPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
