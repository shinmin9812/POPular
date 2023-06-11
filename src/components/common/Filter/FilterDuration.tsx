import styled from 'styled-components';
import FilterDateBox from './FilterDateBox';
interface durationFilterValue {
  show: boolean;
  use: boolean;
  StartDate: string;
  endDate: string;
}

const Duration = styled.button`
  height: 39px;
  background: url('../../../../public/chevronDownIcon.png') no-repeat 95% 50%/13px auto;
  background-color: var(--color-gray);
  color: var(--color-white);
  border: none;
  border-radius: 8px;
  font-size: 14px;
  padding: 10px;
  @media (max-width: 520px) {
    font-size: var(--font-micro);
  }
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 33%;
  margin-top: 10px;
  margin-left: 10px;
  position: relative;
`;

//show에 따라 캘린더 표시 유무
const FilterDuration = ({
  setShow,
  setStartDate,
  setEndDate,
  startDateTarget,
  setStartDateTarget,
  endDateTarget,
  setEndDateTarget,
  setFilterDurationUse,
  durationFilterValue,
}: {
  setShow: () => void;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
  startDateTarget: string;
  setStartDateTarget: React.Dispatch<React.SetStateAction<string>>;
  endDateTarget: string;
  setEndDateTarget: React.Dispatch<React.SetStateAction<string>>;
  setFilterDurationUse: (use: boolean) => void;
  durationFilterValue: durationFilterValue;
}) => {
  return (
    <Wrap>
      <Duration onClick={setShow}>스토어 기간</Duration>
      {durationFilterValue.show && (
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
    </Wrap>
  );
};

export default FilterDuration;
