import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Duration = styled.button`
  width: 23%;
  height: 100%;
  background-color: var(--color-gray);
  color: var(--color-white);
  border: none;
  border-radius: 8px;
  font-size: 14px;
  padding: 10px;
  margin-top: 10px;
`;

const CustomCalendar = styled(Calendar)`
  position: absolute;
  right: 10%;
`;

//show에 따라 캘린더 표시 유무
const FilterDuration = ({ show, setShow }: { show: boolean; setShow: () => void }) => {
  type ValuePiece = Date | null;
  type Value = ValuePiece | [ValuePiece, ValuePiece];
  const [value, onChange] = useState<Value>(new Date());
  const valueStr = value?.toLocaleString().substring(0, 10);
  const today = new Date().toLocaleDateString().substring(0, 10);

  // 오늘 날짜 이후 선택 시 에만 실행
  const isAfterToday = (valueStr: string | undefined): boolean => {
    if (valueStr === undefined) {
      return false;
    }
    const value = new Date(valueStr).toLocaleDateString().substring(0, 10);
    console.log('today:' + today, 'target:' + value);
    return today <= value;
  };
  return (
    <>
      <Duration onClick={setShow}>{valueStr === today ? '기간' : '~' + valueStr}</Duration>
      {show && (
        <CustomCalendar
          onChange={(value: Value) => {
            if (isAfterToday(value?.toString())) {
              onChange(value);
            }
            setShow();
          }}
          value={value}
          calendarType={'ISO 8601'}
        />
      )}
    </>
  );
};

export default FilterDuration;
