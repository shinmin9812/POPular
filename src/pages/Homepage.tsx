import styled from 'styled-components';
import SliderTop from '../components/Home/components/SliderTop/SliderTop';
import VerticalStoreList from '../components/Home/components/VerticalStore/VerticalStoreList';
import { Line } from '../components/Home/components/Line';
import CategoryBox from '../components/Home/components/PreferredCategory/CategoryBox';
import { useQuery } from '@tanstack/react-query';
import RecentlyOpenStore from '../components/Home/containers/RecentlyOpenStore';
import BeforeEndStore from '../components/Home/containers/BeforeEndStore';
import ReservationStore from '../components/Home/containers/ReservationStore';
import RecommendStore from '../components/Home/containers/RecommendStore';
import { API_PATH } from '../constants/path';

const HomePage = () => {
  const getStoreData = async () => {
    const response = await fetch(API_PATH.STORE.GET.ALL);
    if (!response.ok) {
      throw new Error('Error fetching data');
    }
    const data = await response.json();
    return data;
  };

  const { data: store, isLoading } = useQuery(['store'], getStoreData);
  if (isLoading) return <></>;

  return (
    <Container>
      <SliderTop />
      <RecommendStore stores={store} />
      <Line />
      <VerticalStoreList text={'주간 팝업스토어👀'} stores={store} />
      <CategoryBox text={'엘리스님에게 추천하는 팝업스토어🐰'} stores={store} />
      <RecentlyOpenStore stores={store} />
      <BeforeEndStore stores={store} />
      <Line />
      <ReservationStore stores={store} />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  background-color: #fff;
`;

export default HomePage;
