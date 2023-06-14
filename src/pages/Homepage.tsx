import styled from 'styled-components';
import SliderTop from '../components/Home/components/SliderTop/SliderTop';
import VerticalStoreList from '../components/Home/components/VerticalStore/VerticalStoreList';
import ReservationStoreList from '../components/Home/components/ReservationStore/ReservationStoreList';
import { Line } from '../components/Home/components/Line';
import CategoryBox from '../components/Home/components/PreferredCategory/CategoryBox';
import { useQuery } from '@tanstack/react-query';
import CarouselSlideList from '../components/Home/components/CarouselStore/CarouselSlideList';

const Container = styled.div`
  width: 100%;
  background-color: #fff;
`;

const HomePage = () => {
  const getStoreData = async () => {
    const response = await fetch('http://34.22.81.36:3000/stores');
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
      <CarouselSlideList text={'추천 팝업스토어😍'} stores={store} />
      <Line></Line>
      <VerticalStoreList text={'주간 팝업스토어👀'} stores={store} />
      <CategoryBox text={'엘리스님에게 추천하는 팝업스토어🐰'} stores={store} />
      <CarouselSlideList text={'최근 오픈한 팝업스토어😳'} stores={store} />
      <CarouselSlideList text={'종료 직전 팝업스토어🔥'} stores={store} />
      <Line></Line>
      <ReservationStoreList text={'예약 필수 팝업스토어💖'} stores={store} />
    </Container>
  );
};

export default HomePage;
