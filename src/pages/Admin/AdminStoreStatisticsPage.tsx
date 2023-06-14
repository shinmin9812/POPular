import styled from 'styled-components';
import Card from '../../components/common/Card/Card';
import { useGetAllStores } from '../../api/storeApi';
import StoreAddChart from '../../components/Admin/components/Charts/StoreAddChart';
import StoreLocationChart from '../../components/Admin/components/Charts/StoreLocationChart';
import StoreScrapChart from '../../components/Admin/components/Charts/StoreScrapChart';
import AdminStoreList from '../../components/Admin/components/Stores/AdminStoreList';
import { useNavigate, useParams } from 'react-router-dom';
import StoreTitle from '../../components/StoreDetail/container/StoreTitle';
import StoreInfo from '../../components/StoreDetail/container/StoreInfo';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;

  .store-charts {
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

  .store-search {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;

    .store-search-box {
      height: 100%;
      overflow-y: hidden;
    }
  }
`;

const AdminStoreStatisticsPage = () => {
  const navigate = useNavigate();
  const { data: allStores } = useGetAllStores({
    onSuccess: () => {
      if (allStores) navigate(`./${allStores![0]._id}`);
    },
  });
  const { storeId } = useParams();

  return (
    <Container>
      {allStores && (
        <div className="store-charts">
          <Card className="store-add-chart">
            <p className="title">최근 추가된 점포수</p>
            <StoreAddChart stores={allStores} />
          </Card>
          <Card className="store-add-chart">
            <p className="title">지역별 점포 수 분포</p>
            <StoreLocationChart stores={allStores} />
          </Card>
          <Card className="store-scrap-chart">
            <p className="title">스토어별 스크랩 순위</p>
            <StoreScrapChart stores={allStores} />
          </Card>
        </div>
      )}

      <div className="store-search">
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
      </div>
    </Container>
  );
};

export default AdminStoreStatisticsPage;
