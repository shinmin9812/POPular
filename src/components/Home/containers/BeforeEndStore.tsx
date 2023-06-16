import styled from 'styled-components';
import CarouselSlideList from '../components/CarouselStore/CarouselSlideList';
import { Store } from '../../../types/store';

interface Props {
  stores: Store[];
}

const BeforeEndStore = ({ stores }: Props) => {
  const currentDate = new Date();
  const sortedStores = stores
    .filter((store) => {
      const endDate = new Date(store.end_date);
      return (
        endDate.getFullYear() >= currentDate.getFullYear() &&
        endDate.getMonth() >= currentDate.getMonth() &&
        endDate.getDate() >= currentDate.getDate()
      );
    })
    .sort((a, b) => {
      const dateA = new Date(a.end_date);
      const dateB = new Date(b.end_date);
      const diffA = Math.abs(currentDate.getTime() - dateA.getTime());
      const diffB = Math.abs(currentDate.getTime() - dateB.getTime());
      return diffA - diffB;
    })
    .slice(0, 10);

  return (
    <Container>
      <CarouselSlideList text={'종료 직전 팝업스토어🔥'} stores={sortedStores} />
    </Container>
  );
};

const Container = styled.div``;

export default BeforeEndStore;
