import { useEffect, useState } from 'react';
import styled from 'styled-components';
import SliderTop from '../components/Home/SliderTop/SliderTop';
import SlideStoreList from '../components/Home/SlideStore/SlideStoreList';
import VerticalStoreList from '../components/Home/VerticalStore/VerticalStoreList';
import Line from '../components/Home/Line';
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
      <SlideStoreList text={'추천 팝업스토어😍'} stores={stores}></SlideStoreList>
      <SlideStoreList text={'추천 팝업스토어😍'} stores={stores}></SlideStoreList>
    </Container>
  );
};

export default HomePage;
