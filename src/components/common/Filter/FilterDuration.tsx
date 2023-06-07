import styled from 'styled-components';
import FilterDateBox from './FilterDateBox';

const Duration = styled.button`
  width: 23%;
  height: 39px;
  background-color: var(--color-gray);
  color: var(--color-white);
  border: none;
  border-radius: 8px;
  font-size: 14px;
  padding: 10px;
  margin-top: 10px;
`;

//show에 따라 캘린더 표시 유무
const FilterDuration = ({
  show,
  setShow,
  setStartDate,
  setEndDate,
  startDateTarget,
  setStartDateTarget,
  endDateTarget,
  setEndDateTarget,
  setFilterDurationUse,
}: {
  show: boolean;
  setShow: () => void;
  setStartDate: (date: { year: number; month: number; day: number }) => void;
  setEndDate: (date: { year: number; month: number; day: number }) => void;
  startDateTarget: { year: number; month: number; day: number };
  setStartDateTarget: React.Dispatch<
    React.SetStateAction<{
      year: number;
      month: number;
      day: number;
    }>
  >;
  endDateTarget: { year: number; month: number; day: number };
  setEndDateTarget: React.Dispatch<
    React.SetStateAction<{
      year: number;
      month: number;
      day: number;
    }>
  >;
  setFilterDurationUse: (use: boolean) => void;
}) => {
  return (
    <>
      <Duration onClick={setShow}>스토어 기간</Duration>
      {show && (
        <FilterDateBox
          setShow={setShow}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          startDateTarget={startDateTarget}
          setStartDateTarget={setStartDateTarget}
          endDateTarget={endDateTarget}
          setEndDateTarget={setEndDateTarget}
          setFilterDurationUse={setFilterDurationUse}
        />
      )}
    </>
  );
};

export default FilterDuration;
