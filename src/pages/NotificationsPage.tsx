import styled from 'styled-components';
import MetaTag from '../components/SEO/MetaTag';
import MenuList from '../components/UserMenu/components/MenuList';
import MenuItem from '../components/UserMenu/components/MenuItem';
import { CLIENT_PATH } from '../constants/path';
import NotificationList from '../components/Notifications/components/NotificationList';

const NotificationsPage = () => {
  return (
    <Container>
      <MetaTag title={`POPULAR | 알림 목록`} />
      <MenuListContainer>
        <NotificationMenu link={CLIENT_PATH.USER_NOTIFICATIONS} title="알림 목록" />
        <MenuList />
      </MenuListContainer>
      <ContentContainer>
        <Title>알림 목록</Title>
        <NotificationList />
      </ContentContainer>
    </Container>
  );
};

export default NotificationsPage;

const Container = styled.div`
  width: 100%;
  display: flex;
`;

const MenuListContainer = styled.div`
  display: none;
  a {
    display: block;
    width: 350px;
    height: 65px;
    font-size: var(--font-medium);
    border-bottom: 0.5px solid var(--color-gray);
    padding: 20px;
    margin: 0;
    cursor: pointer;

    :hover {
      transition: all 0.1s ease;
      color: var(--color-main);
      font-size: calc(var(--font-medium) + 2px);
    }
  }
  @media screen and (min-width: 768px) {
    margin: 50px 20px;
    display: block;
    width: 200px;

    a,
    div > a,
    div > div {
      width: 200px;
      height: 55px;
      font-size: var(--font-regular);
      :hover {
        font-size: calc(var(--font-regular) + 2px);
      }
    }
  }
`;

const NotificationMenu = styled(MenuItem)`
  display: none;
  @media screen and (min-width: 768px) {
    display: block;
  }
`;

const ContentContainer = styled.div`
  flex: 1;

  & li {
    margin: 10px 20px;
    border-radius: 8px;
  }
`;

const Title = styled.h1`
  font-size: 25px;
  color: var(--color-main);
  margin-bottom: 20px;
  margin-left: 20px;
`;
