import styled from 'styled-components';
import CarouselSlideList from '../components/CarouselStore/CarouselSlideList';
import { Store } from '../../../types/store';

interface Props {
  stores: Store[];
}

const RecommendStore = ({ stores }: Props) => {
  const currentDate = new Date();

  const sortedData = [...stores]
    .filter((store) => new Date(store.end_date) >= currentDate)
    .sort((a, b) => b.scraps.length - a.scraps.length)
    .slice(0, 20);

  return (
    <Container>
      <CarouselSlideList text={'추천 팝업스토어😍'} stores={sortedData} />
    </Container>
  );
};

const Container = styled.div``;

export default RecommendStore;
