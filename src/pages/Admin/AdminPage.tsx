import styled from 'styled-components';
import Card from '../../components/common/Card/Card';
import { getAllStores, useGetAllStores } from '../../api/storeApi';
import { useQueries } from '@tanstack/react-query';

const Container = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-areas:
    'user user'
    'store  feed';
  grid-template-rows: 1fr 1fr;

  .data-section {
    width: 100%;
    transition: all 0.5s;

    .title {
      font-size: 24px;
      font-weight: 700;
    }

    &:hover {
      transform: translateY(-6px);
      box-shadow: 0px 6px 22px -6px rgba(0, 0, 0, 0.3);
    }
  }

  .users-data {
    grid-area: user;
  }

  .stores-data {
    grid-area: store;
  }

  .feeds-data {
    grid-area: feed;
  }
`;

const AdminPage = () => {
  const [{ data: allStores }] = useQueries({
    queries: [
      {
        queryKey: ['allStores'],
        queryFn: getAllStores,
        suspense: true,
      },
    ],
  });
  console.log(allStores);

  return (
    <Container>
      <Card className="users-data data-section">
        <p className="title">유저 관리하기</p>
      </Card>
      <Card className="stores-data data-section">
        <p className="title">스토어 통계</p>
      </Card>
      <Card className="feeds-data data-section">
        <p className="title">피드 관리하기</p>
      </Card>
    </Container>
  );
};

export default AdminPage;
