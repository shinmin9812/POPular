import styled from 'styled-components';
import Filter from './Filter';

const DateWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 10px;
`;

const DateBox = styled.div`
  display: flex;
`;

const DateBoxWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const DateBoxContainer = styled.div`
  display: flex;
  position: absolute;
  top: 55px;
  background-color: white;
  border: 1px solid #987fc0;
  border-radius: 8px;
  padding: 10px;
  z-index: 10;
`;

const DateName = styled.span`
  margin: auto;
`;

const DateSelectCompleteButton = styled.button`
  background-color: var(--color-sub);
  color: var(--color-white);
  border: none;
  border-radius: 8px;
  height: 95px;
  width: 50px;
  margin-top: auto;
  margin-left: 10px;
`;

const year = [2018, 2019, 2020, 2021, 2022, 2023];

const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const day = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
];

const DateValidation = (
  startDate: { year: number; month: number; day: number },
  endDate: { year: number; month: number; day: number },
  setStartDate: (date: { year: number; month: number; day: number }) => void,
  setEndDate: (date: { year: number; month: number; day: number }) => void,
  durationFilterUse: (use: boolean) => void,
) => {
  const start = `${startDate.year}-${startDate.month}-${startDate.day}`;
  const end = `${endDate.year}-${endDate.month}-${endDate.day}`;
  if (new Date(start).getTime() <= new Date(end).getTime()) {
    // 전체 다 바꾸기
    setStartDate({ year: startDate.year, month: startDate.month, day: startDate.day });
    setEndDate({ year: endDate.year, month: endDate.month, day: endDate.day });
    durationFilterUse(true);
  } else alert('날짜를 확인해주세요');
};

const FilterDateBox = ({
  setShow,
  setStartDate,
  setEndDate,
  startDateTarget,
  setStartDateTarget,
  endDateTarget,
  setEndDateTarget,
  setFilterDurationUse,
}: {
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
    <DateBoxContainer>
      <DateBoxWrap>
        <DateBox>
          <DateName>Start</DateName>
          <DateWrap>
            <Filter
              value={startDateTarget.year}
              Options={year}
              width={100}
              onChange={(e) => {
                setStartDateTarget((prev) => ({ ...prev, year: Number(e.target.value) }));
              }}
            />
          </DateWrap>
          <DateWrap>
            <Filter
              value={startDateTarget.month}
              Options={month}
              width={100}
              onChange={(e) => {
                setStartDateTarget((prev) => ({ ...prev, month: Number(e.target.value) }));
              }}
            />
          </DateWrap>
          <DateWrap>
            <Filter
              value={startDateTarget.day}
              Options={day}
              width={100}
              onChange={(e) => {
                setStartDateTarget((prev) => ({ ...prev, day: Number(e.target.value) }));
              }}
            />
          </DateWrap>
        </DateBox>
        <DateBox>
          <DateName>End</DateName>
          <DateWrap>
            <Filter
              value={endDateTarget.year}
              Options={year}
              width={100}
              onChange={(e) => {
                setEndDateTarget((prev) => ({ ...prev, year: Number(e.target.value) }));
              }}
            />
          </DateWrap>
          <DateWrap>
            <Filter
              value={endDateTarget.month}
              Options={month}
              width={100}
              onChange={(e) => {
                setEndDateTarget((prev) => ({ ...prev, month: Number(e.target.value) }));
              }}
            />
          </DateWrap>
          <DateWrap>
            <Filter
              value={endDateTarget.day}
              Options={day}
              width={100}
              onChange={(e) => {
                setEndDateTarget((prev) => ({ ...prev, day: Number(e.target.value) }));
              }}
            />
          </DateWrap>
        </DateBox>
      </DateBoxWrap>
      <DateSelectCompleteButton
        onClick={() => {
          DateValidation(startDateTarget, endDateTarget, setStartDate, setEndDate, setFilterDurationUse);
          setShow();
        }}
      >
        완료
      </DateSelectCompleteButton>
    </DateBoxContainer>
  );
};

export default FilterDateBox;
