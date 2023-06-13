import styled from 'styled-components';
import SliderTop from '../components/Home/components/SliderTop/SliderTop';
import SlideStoreList from '../components/Home/components/SlideStore/SlideStoreList';
import VerticalStoreList from '../components/Home/components/VerticalStore/VerticalStoreList';
import ReservationStoreList from '../components/Home/components/ReservationStore/ReservationStoreList';
import { Line } from '../components/Home/components/Line';
import CategoryBox from '../components/Home/components/PreferredCategory/CategoryBox';
import { useQuery } from '@tanstack/react-query';
import MetaTag from '../components/SEO/MetaTag';
// import CasouselSlideList from '../components/Home/components/CarouselStore/CasouselSlideList';

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

  if (isLoading) {
    return <div></div>;
  }

  return (
    <Container>
      <SliderTop></SliderTop>
      <SlideStoreList text={'추천 팝업스토어😍'} stores={store}></SlideStoreList>
      <Line></Line>
      <VerticalStoreList text={'주간 팝업스토어👀'} stores={store}></VerticalStoreList>
      <CategoryBox text={'엘리스님에게 추천하는 팝업스토어🐰'} stores={store} />
      <SlideStoreList text={'최근 오픈한 팝업스토어😳'} stores={store}></SlideStoreList>
      <SlideStoreList text={'종료 직전 팝업스토어🔥'} stores={store}></SlideStoreList>
      <Line></Line>
      <ReservationStoreList text={'예약 필수 팝업스토어💖'} stores={store}></ReservationStoreList>
    </Container>
  );
};

export default HomePage;
