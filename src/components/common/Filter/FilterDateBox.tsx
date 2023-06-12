import styled from 'styled-components';
import Filter from './Filter';
import { year, month, day } from '../../../constants/filterOptions';

interface date {
  year: number;
  month: number;
  day: number;
}

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
  width: 230px;
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

const DateValidation = (
  startDate: date,
  endDate: date,
  setStartDate: (date: date) => void,
  setEndDate: (date: date) => void,
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
  setStartDate: (date: date) => void;
  setEndDate: (date: date) => void;
  startDateTarget: date;
  setStartDateTarget: React.Dispatch<
    React.SetStateAction<{
      year: number;
      month: number;
      day: number;
    }>
  >;
  endDateTarget: date;
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
