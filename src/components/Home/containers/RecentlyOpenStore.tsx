import styled from 'styled-components';
import CarouselSlideList from '../components/CarouselStore/CarouselSlideList';
import { Store } from '../../../types/store';

interface Props {
  stores: Store[];
}

const RecentlyOpenStore = ({ stores }: Props) => {
  const currentDate = new Date();
  const sortedStores = stores.slice().sort(function (a, b) {
    let dateA = new Date(a.start_date);
    let dateB = new Date(b.start_date);

    let diffA = Math.abs(currentDate.getTime() - dateA.getTime());
    let diffB = Math.abs(currentDate.getTime() - dateB.getTime());

    return diffA - diffB;
  });

  return (
    <Container>
      <CarouselSlideList text={'최근 오픈한 팝업스토어😳'} stores={sortedStores} />
    </Container>
  );
};

const Container = styled.div``;

export default RecentlyOpenStore;
