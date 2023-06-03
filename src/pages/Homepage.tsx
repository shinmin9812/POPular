import { useEffect, useState } from 'react';
import styled from 'styled-components';
import SliderTop from '../components/Home/components/SliderTop/SliderTop';
import SlideStoreList from '../components/Home/components/SlideStore/SlideStoreList';
import VerticalStoreList from '../components/Home/components/VerticalStore/VerticalStoreList';
import ReservationStoreList from '../components/Home/components/ReservationStore/ReservationStoreList';
import Line from '../components/Home/components/Line';
import { Store } from '../types/store';

const Container = styled.div`
  width: 100%;
  background-color: #fff;
`;

const HomePage = () => {
  const [stores, setStores] = useState<Store[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await fetch('/store/all');
    const result: Store[] = await response.json();

    const response2 = await fetch('/store/recomended');
    const result2: Store = await response2.json();

    console.log(result);
    console.log(result2);

    setStores(result);
  }

  return (
    <Container>
      <SliderTop></SliderTop>
      <SlideStoreList text={'추천 팝업스토어😍'} stores={stores}></SlideStoreList>
      <Line></Line>
      <VerticalStoreList text={'주간 팝업스토어👀'} stores={stores}></VerticalStoreList>
      <Line></Line>
      <SlideStoreList text={'최근 오픈한 팝업스토어😳'} stores={stores}></SlideStoreList>
      <SlideStoreList text={'종료 직전 팝업스토어🔥'} stores={stores}></SlideStoreList>
      <Line></Line>
      <ReservationStoreList text={'예약 필수 팝업스토어💖'} stores={stores}></ReservationStoreList>
    </Container>
  );
};

export default HomePage;
