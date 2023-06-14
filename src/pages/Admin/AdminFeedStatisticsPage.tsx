import styled from 'styled-components';
import Card from '../../components/common/Card/Card';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetAllFeeds, useGetAllReviewFeeds } from '../../api/feedApi';
import getDataByCreatedAt from '../../utils/getDataByCreatedAt';
import AddChart from '../../components/Admin/components/Charts/AddLineChart';
import AddLineChart from '../../components/Admin/components/Charts/AddLineChart';
import WeeklyFeedChart from '../../components/Admin/components/Charts/FeedViewsChart';
import FeedViewsChart from '../../components/Admin/components/Charts/FeedViewsChart';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;

  .feed-charts {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
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

  .feed-search {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;

    .feed-search-box {
      height: 100%;
      overflow-y: hidden;
    }
  }
`;

const AdminFeedStatisticsPage = () => {
  const navigate = useNavigate();
  const { data: allFeeds } = useGetAllFeeds({
    onSuccess: () => {},
  });

  return (
    <Container>
      {allFeeds && (
        <div className="feed-charts">
          <Card className="feed-add-chart">
            <p className="title">피드 등록 추이</p>
            <AddLineChart barKey="등록된 피드 수" data={allFeeds} />
          </Card>
          <Card className="feed-weekly-chart">
            <p className="title">최다 조회수 피드</p>
            <FeedViewsChart feeds={allFeeds} />
          </Card>
          <Card className="store-scrap-chart">
            <p className="title">스토어별 스크랩 순위</p>
          </Card>
        </div>
      )}

      {/* <div className="store-search">
        <Card className="store-search-box">
          <p className="title">스토어 검색</p>
          {allStores && <AdminStoreList stores={allStores} />}
        </Card>
        {storeId && allStores && (
          <Card className="store-scrap-chart">
            <StoreTitle store={allStores.find((store) => store._id === storeId)!} />
            <StoreInfo store={allStores.find((store) => store._id === storeId)!} />
          </Card>
        )}
      </div> */}
    </Container>
  );
};

export default AdminFeedStatisticsPage;
