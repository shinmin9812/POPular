interface date {
  year: number;
  month: number;
  day: number;
}

export type useDateValidationType = (
  startDate: date,
  endDate: date,
  setStartDate: (date: date) => void,
  setEndDate: (date: date) => void,
  durationFilterUse: (use: boolean) => void,
) => void;

const useDateValidation: useDateValidationType = (startDate, endDate, setStartDate, setEndDate, durationFilterUse) => {
  const start = `${startDate.year}-${startDate.month}-${startDate.day}`;
  const end = `${endDate.year}-${endDate.month}-${endDate.day}`;
  if (new Date(start).getTime() <= new Date(end).getTime()) {
    // 전체 다 바꾸기
    setStartDate({ year: startDate.year, month: startDate.month, day: startDate.day });
    setEndDate({ year: endDate.year, month: endDate.month, day: endDate.day });
    durationFilterUse(true);
  } else alert('날짜를 확인해주세요');
};

export default useDateValidation;
