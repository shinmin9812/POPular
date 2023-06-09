import styled from 'styled-components';
import Card from '../../common/Card/Card';

const Container = styled.div``;

const AdminDashboardItem = () => {
  // const [{ data: allStores }] = useQueries<[{ data: Store[] }]>({
  //   queries: [
  //     {
  //       queryKey: ['allStores'],
  //       queryFn: getAllStores,
  //       suspense: true,
  //     },
  //   ],
  // });
  return (
    <Card>
      <Container></Container>
    </Card>
  );
};

export default AdminDashboardItem;
