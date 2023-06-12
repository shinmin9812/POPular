import styled from 'styled-components';

const Select = styled.select<{ width: number }>`
  ${(props) => `width: ${props.width}%;`}
  height: 39px;
  background-color: var(--color-gray);
  color: var(--color-white);
  border: none;
  border-radius: 8px;
  font-size: 14px;
  padding: 10px 0px 10px 10px;
  margin-top: 10px;

  + select {
    margin-left: 9px;
  }
  + button {
    margin-left: 9px;
  }
`;

const Filter = ({
  onChange,
  value,
  Options,
  width,
}: {
  value: string | number;
  Options: string[] | number[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  width: number;
}) => {
  return (
    <Select value={value} onChange={onChange} width={width}>
      {Options.map((option, index) => (
        <option key={index} value={option} disabled={typeof value === 'string' && index === 0}>
          {option}
        </option>
      ))}
    </Select>
  );
};
export default Filter;
