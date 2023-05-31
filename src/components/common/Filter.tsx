import styled from 'styled-components';

const Select = styled.select`
  width: 23%;
  height: 100%;
  background-color: var(--color-gray);
  color: var(--color-white);
  border: none;
  border-radius: 8px;
  font-size: 14px;
  padding: 10px 0px 10px 10px;
  margin-top: 10px;

  + select {
    margin-left: 10px;
  }
`;
const Option = styled.option``;

const Filter = ({
  onChange,
  value,
  Options,
}: {
  value: string;
  Options: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) => {
  return (
    <Select value={value} onChange={onChange}>
      {Options.map((option, index) => (
        <Option key={index} value={option}>
          {option}
        </Option>
      ))}
    </Select>
  );
};
export default Filter;
