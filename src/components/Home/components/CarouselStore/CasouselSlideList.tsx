import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { Store } from '../../../../types/store';

const CasouselSlideList = () => {
  const fetchStoreData = async () => {
    const response = await fetch(`http://34.22.81.36:3000/stores`);
    if (!response.ok) {
      throw new Error('데이터를 가져오는데 실패했습니다.');
    }
    const data = await response.json();
    return data;
  };

  const { data: storeData, isLoading, isError, error } = useQuery(['stores'], fetchStoreData);

  console.log(storeData);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {(error as Error).message}</div>;
  }

  return (
    <CasouselContainer>
      <h2>추천 팝업스토어😍</h2>
      <div>
        <div>
          {storeData.map((store: Store) => (
            <div key={store._id}>{store._id}</div>
          ))}
        </div>
      </div>
    </CasouselContainer>
  );
};

const CasouselContainer = styled.div``;

export default CasouselSlideList;
