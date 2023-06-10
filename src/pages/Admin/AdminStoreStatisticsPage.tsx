import styled from 'styled-components';
import Card from '../../components/common/Card/Card';
import { useGetAllStores } from '../../api/storeApi';
import StoreAddChart from '../../components/Admin/components/Charts/StoreAddChart';
import StoreLocationChart from '../../components/Admin/components/Charts/StoreLocationChart';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 30px;

  .card {
    transition: all 0.3s;
    width: 100%;

    &:hover {
      transform: translateY(-6px);
      box-shadow: 0px 6px 22px -6px rgba(0, 0, 0, 0.3);
    }
  }
`;

const AdminStoreStatisticsPage = () => {
  const { data: allStores } = useGetAllStores();

  return (
    <Container>
      {allStores && (
        <>
          <Card className="store-add-chart">
            <p className="title">최근 추가된 점포수</p>
            <StoreAddChart stores={allStores} />
          </Card>
          <Card className="store-add-chart">
            <p className="title">지역별 점포 수 분포</p>
            <StoreLocationChart stores={allStores} />
          </Card>
        </>
      )}
    </Container>
  );
};

export default AdminStoreStatisticsPage;
