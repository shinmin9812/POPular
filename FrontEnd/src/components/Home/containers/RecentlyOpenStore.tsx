import styled from 'styled-components';
import CarouselSlideList from '../components/CarouselStore/CarouselSlideList';
import { Store } from '../../../types/store';

interface Props {
  stores: Store[];
}

const RecentlyOpenStore = ({ stores }: Props) => {
  const currentDate = new Date();
  const sortedStores = stores
    .filter((store) => {
      const openDate = new Date(store.start_date);
      const endDate = new Date(store.end_date);
      return currentDate >= openDate && currentDate <= endDate;
    })
    .sort((a, b) => {
      const dateA = new Date(a.start_date);
      const dateB = new Date(b.start_date);
      const diffA = Math.abs(currentDate.getTime() - dateA.getTime());
      const diffB = Math.abs(currentDate.getTime() - dateB.getTime());
      return diffA - diffB;
    })
    .slice(0, 10);

  return (
    <Container>
      <CarouselSlideList text={'최근 오픈한 팝업스토어😳'} stores={sortedStores} />
    </Container>
  );
};

const Container = styled.div`
  animation: appearOpacity 0.5s 1.2s forwards;
`;

export default RecentlyOpenStore;
