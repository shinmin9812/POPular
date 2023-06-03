import styled from 'styled-components';
import FilterIcon from '../Icons/FilterIcon';

const FilterIconWrap = styled(FilterIcon)`
  margin-right: 10px;
`;

const FilterInfoItem = styled.div`
  color: var(--color-sub);
  margin: 0 5px;
  font-weight: var(--weight-semi-bold);
  + div {
    border-left: 2px solid var(--color-sub);
    padding-left: 10px;
  }
`;

const FilterInfoItemWrap = styled.div`
  display: flex;
  margin-top: 10px;
`;

const FilterInfo = ({
  category,
  address,
  startDate,
  endDate,
}: {
  category: string;
  address: string;
  startDate: { year: number; month: number; day: number };
  endDate: { year: number; month: number; day: number };
}) => {
  const start = `${startDate.year}-${startDate.month}-${startDate.day}`;
  const end = `${endDate.year}-${endDate.month}-${endDate.day}`;
  const today = new Date().toLocaleDateString();
  const dateBoolean = today === new Date(start).toLocaleDateString() && today === new Date(end).toLocaleDateString();
  return (
    <FilterInfoItemWrap>
      <FilterIconWrap />
      {category !== '카테고리' && <FilterInfoItem>{category}</FilterInfoItem>}
      {address !== '지역' && <FilterInfoItem>{address}</FilterInfoItem>}
      {!dateBoolean && <FilterInfoItem>{`${start}~${end}`}</FilterInfoItem>}
    </FilterInfoItemWrap>
  );
};

export default FilterInfo;
