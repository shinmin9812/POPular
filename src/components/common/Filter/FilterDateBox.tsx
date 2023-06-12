import styled from 'styled-components';

const DateBoxContainer = styled.div`
  display: flex;
  background-color: white;
  border: 1px solid #987fc0;
  border-radius: 8px;
  padding: 10px;
  top: 50px;
  right: 0;
  position: absolute;
  @media (max-width: 620px) {
    right: -70%;
  }
`;

const DateBoxWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 220px;
`;

const DateBox = styled.div`
  display: flex;
`;

const DateName = styled.span`
  margin: auto;
`;

const DateSelectCompleteButton = styled.button`
  background-color: var(--color-sub);
  color: var(--color-white);
  border: none;
  border-radius: 8px;
  height: 55px;
  width: 50px;
  margin-top: auto;
  margin-left: 10px;
`;

const DateInput = styled.input`
  background: none;
  border: none;
  border-bottom: 1px solid var(--color-gray);
  font-size: var(--font-medium);
  font-weight: var(--weight-regular);
`;

const DateValidation = (
  startDate: string,
  endDate: string,
  setStartDate: (date: string) => void,
  setEndDate: (date: string) => void,
  durationFilterUse: (use: boolean) => void,
) => {
  if (new Date(startDate).getTime() <= new Date(endDate).getTime()) {
    // 전체 다 바꾸기
    setStartDate(startDate);
    setEndDate(endDate);
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
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
  startDateTarget: string;
  setStartDateTarget: React.Dispatch<React.SetStateAction<string>>;
  endDateTarget: string;
  setEndDateTarget: React.Dispatch<React.SetStateAction<string>>;
  setFilterDurationUse: (use: boolean) => void;
}) => {
  return (
    <DateBoxContainer>
      <DateBoxWrap>
        <DateBox>
          <DateName>Start</DateName>
          <DateInput type="date" onChange={(e) => setStartDateTarget(e.target.value)} value={startDateTarget} />
        </DateBox>
        <DateBox>
          <DateName>End</DateName>
          <DateInput type="date" onChange={(e) => setEndDateTarget(e.target.value)} value={endDateTarget} />
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
