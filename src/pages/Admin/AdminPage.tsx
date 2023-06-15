import styled from 'styled-components';
import Card from '../../components/common/Card/Card';
import { useQueries } from '@tanstack/react-query';
import { useGetAllData } from '../../api/adminApi';
import StoreAddChart from '../../components/Admin/components/Charts/StoreAddChart';
import UserAddChart from '../../components/Admin/components/Charts/UserAddChart';
import FeedViewsChart from '../../components/Admin/components/Charts/FeedViewsChart';
import AddLineChart from '../../components/Admin/components/Charts/AddLineChart';
import UserFollowerChart from '../../components/Admin/components/Charts/UserFollowerChart';
import UserCategoryCharts from '../../components/Admin/components/Charts/UserCategoryCharts';
import StoreLocationChart from '../../components/Admin/components/Charts/StoreLocationChart';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;

  .admin-charts-first {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 30px;
  }

  .admin-charts-second,
  .admin-charts-third {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 30px;
  }

  .card {
    transition: all 0.3s;
    width: 100%;

    &:hover {
      transform: translateY(-6px);
      box-shadow: 0px 6px 22px -6px rgba(0, 0, 0, 0.3);
    }
  }
`;

const AdminPage = () => {
  const [store, user, feed] = useGetAllData();

  const allFetched = store.isFetched && user.isFetched && feed.isFetched;

  return (
    <Container>
      {allFetched && (
        <>
          <div className="admin-charts-first">
            <Card className="admin-store-add-chart">
              <p className="title">최근 추가된 점포수</p>
              <StoreAddChart stores={store.data} />
            </Card>
            <Card className="admin-user-follow-chart">
              <p className="title">최다 팔로워 유저</p>
              <UserFollowerChart users={user.data} />
            </Card>
            <Card className="admin-store-location-chart">
              <p className="title">지역별 스토어 개점 현황</p>
              <StoreLocationChart stores={store.data} />
            </Card>
          </div>
          <div className="admin-charts-second">
            <Card className="admin-store-location-chart">
              <p className="title">유저 증가 추이</p>
              <UserAddChart users={user.data} />
            </Card>
            <Card className="admin-feed-scrap-chart">
              <p className="title">게시물 등록 추이</p>
              <AddLineChart barKey="게시물 수" data={feed.data} />
            </Card>
          </div>
          <div className="admin-charts-third">
            <Card className="admin-user-category-chart">
              <p className="title">유저 선호 카테고리</p>
              <UserCategoryCharts users={user.data} />
            </Card>
            <Card className="admin-feed-view-chart">
              <p className="title">최다 조회수 피드</p>
              <FeedViewsChart feeds={feed.data} />
            </Card>
          </div>
        </>
      )}
    </Container>
  );
};

export default AdminPage;
