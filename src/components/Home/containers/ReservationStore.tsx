import styled from 'styled-components';
import { Store } from '../../../types/store';
import ReservationStoreList from '../components/ReservationStore/ReservationStoreList';

interface Props {
  stores: Store[];
}

const ReservationStore = ({ stores }: Props) => {
  let newArray = [];
  const currentDate = new Date();
  for (let i = 0; i < stores.length; i++) {
    if (stores[i].reservation_required === true && new Date(stores[i].end_date) > currentDate) {
      newArray.push(stores[i]);
    }
  }

  return (
    <Container>
      <ReservationStoreList text={'예약 필수 팝업스토어💖'} stores={newArray} />
    </Container>
  );
};

const Container = styled.div``;

export default ReservationStore;
