import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function Sample() {
  const [value, onChange] = useState<Value>(new Date());
  return (
    <div className="Sample">
      <div className="Sample__container">
        <main className="Sample__container__content">
          <Calendar onChange={onChange} value={value} calendarType={'ISO 8601'} />
        </main>
      </div>
    </div>
  );
}
