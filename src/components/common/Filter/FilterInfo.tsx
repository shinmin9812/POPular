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

const CancelFilter = styled.button`
  background: none;
  color: var(--color-red);
`;

const FilterInfo = ({
  category,
  address,
  startDate,
  endDate,
  durationFilterUse,
  setFilterAddressUse,
  setFilterCategoryUse,
  setFilterDurationUse,
  setFilterAddressValue,
  setFilterCategoryValue,
}: {
  category: { value: string; use: boolean };
  address: { value: string; use: boolean };
  durationFilterUse: boolean;
  startDate: { year: number; month: number; day: number };
  endDate: { year: number; month: number; day: number };
  setFilterAddressUse: (use: boolean) => void;
  setFilterCategoryUse: (use: boolean) => void;
  setFilterDurationUse: (category: boolean) => void;
  setFilterAddressValue: (address: string) => void;
  setFilterCategoryValue: (category: string) => void;
}) => {
  const start = `${startDate.year}-${startDate.month}-${startDate.day}`;
  const end = `${endDate.year}-${endDate.month}-${endDate.day}`;
  // const today = new Date().toLocaleDateString();

  return (
    <FilterInfoItemWrap>
      <FilterIconWrap />
      {category.use && (
        <FilterInfoItem>
          {category.value}{' '}
          <CancelFilter
            onClick={() => {
              setFilterCategoryValue('카테고리');
              setFilterCategoryUse(false);
            }}
          >
            X
          </CancelFilter>
        </FilterInfoItem>
      )}
      {address.use && (
        <FilterInfoItem>
          {address.value}{' '}
          <CancelFilter
            onClick={() => {
              setFilterAddressValue('지역');
              setFilterAddressUse(false);
            }}
          >
            X
          </CancelFilter>
        </FilterInfoItem>
      )}
      {durationFilterUse && (
        <FilterInfoItem>
          {`${start}~${end}`}{' '}
          <CancelFilter
            onClick={() => {
              setFilterDurationUse(false);
            }}
          >
            X
          </CancelFilter>
        </FilterInfoItem>
      )}
    </FilterInfoItemWrap>
  );
};

export default FilterInfo;
