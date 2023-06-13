import styled from 'styled-components';
import Card from '../../components/common/Card/Card';
import { useGetAllUsers } from '../../api/userApi';
import UserAddChart from '../../components/Admin/components/Charts/UserAddChart';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;

  .user-charts {
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

  .user-search {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;

    .user-search-box {
      height: 100%;
      overflow-y: hidden;
    }
  }
`;

const AdminUserStatisticsPage = () => {
  const { data: allUsers } = useGetAllUsers();

  console.log(allUsers);

  return (
    <Container>
      {allUsers && (
        <div className="user-charts">
          <Card className="user-add-chart">
            <p className="title">유저 가입 추이</p>
            <UserAddChart users={allUsers} />
          </Card>
          {/* <Card className="user-add-chart">
            <p className="title">지역별 점포 수 분포</p>
            <StoreLocationChart users={allStores} />
          </Card>
          <Card className="user-scrap-chart">
            <p className="title">스토어별 스크랩 순위</p>
            <StoreScrapChart users={allStores} />
          </Card> */}
        </div>
      )}

      {/* <div className="user-search">
        <Card className="user-search-box">
          <p className="title">스토어 검색</p>
          {allStores && <AdminStoreList users={allStores} />}
        </Card>
        {userId && allStores && (
          <Card className="user-scrap-chart">
            <StoreTitle user={allStores.find((user) => user._id === userId)!} />
            <StoreInfo user={allStores.find((user) => user._id === userId)!} />
          </Card>
        )}
      </div> */}
    </Container>
  );
};

export default AdminUserStatisticsPage;
