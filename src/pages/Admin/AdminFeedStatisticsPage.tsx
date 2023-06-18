import styled from 'styled-components';
import Card from '../../components/common/Card/Card';
import { useGetAllFeeds } from '../../api/feedApi';
import AddLineChart from '../../components/Admin/components/Charts/AddLineChart';
import FeedViewsChart from '../../components/Admin/components/Charts/FeedViewsChart';
import FeedLikeChart from '../../components/Admin/components/Charts/FeedLikeChart';
import AdminFeedList from '../../components/Admin/components/Feeds/AdminFeedList';

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
    width: 100%;
    .feed-search-box {
      height: 100%;
      overflow-y: hidden;
    }
  }
`;

const AdminFeedStatisticsPage = () => {
  const { data: allFeeds, isFetched } = useGetAllFeeds();

  return (
    <Container>
      {isFetched && allFeeds!.length > 0 ? (
        <>
          <div className="feed-charts">
            <Card className="feed-add-chart">
              <p className="title">피드 등록 추이</p>
              <AddLineChart barKey="등록된 피드 수" data={allFeeds!} />
            </Card>
            <Card className="feed-weekly-chart">
              <p className="title">최다 조회수 피드</p>
              <FeedViewsChart feeds={allFeeds!} />
            </Card>
            <Card className="feed-likes-chart">
              <p className="title">최다 추천 피드</p>
              <FeedLikeChart feeds={allFeeds!} />
            </Card>
          </div>
          <div className="feed-search">
            <Card className="feed-search-box">
              <p className="title">피드 검색</p>
              {allFeeds && <AdminFeedList feeds={allFeeds} />}
            </Card>
          </div>
        </>
      ) : (
        <Card>피드가 존재하지 않습니다!</Card>
      )}
    </Container>
  );
};

export default AdminFeedStatisticsPage;
