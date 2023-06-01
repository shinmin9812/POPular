import styled from 'styled-components';
import FilterIcon from './Icons/FilterIcon';

const FilterIconWrap = styled(FilterIcon)`
  margin-right: 10px;
`;

const FilterInfoItem = styled.div`
  color: var(--color-sub);
  margin: 0 5px;
  font-weight: var(--weight-bold);
  + div {
    border-left: 2px solid var(--color-sub);
    padding-left: 10px;
  }
`;

const FilterInfoItemWrap = styled.div`
  display: flex;
  margin-top: 10px;
`;

const FilterInfo = ({ category, address }: { category: string; address: string }) => {
  return (
    <FilterInfoItemWrap>
      <FilterIconWrap />
      {category !== '카테고리' && <FilterInfoItem>{category}</FilterInfoItem>}
      {address !== '지역' && <FilterInfoItem>{address}</FilterInfoItem>}
    </FilterInfoItemWrap>
  );
};

export default FilterInfo;
