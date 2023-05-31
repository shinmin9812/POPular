import styled from 'styled-components';
import filterIconImg from '../../../public/imges/filter.png';

const FilterIconImg = styled.img`
  src: ${filterIconImg};
`;

const FilterInfoItem = styled.div`
  color: var(--color-sub);
`;

const FilterInfo = styled.div``;

const FilterInfoItemWrap = () => {
  return (
    <FilterInfo>
      <FilterIconImg />
      <FilterInfoItem>카테고리</FilterInfoItem>
    </FilterInfo>
  );
};

export default FilterInfoItemWrap;
