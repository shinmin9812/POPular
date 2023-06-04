import styled from 'styled-components';

interface Option {
  value: string;
  name: string;
}

const Filter = ({ options }: { options: Option[] }) => {
  return (
    <Container>
      <select>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  position: relative;
  height: 20px;

  select {
    border: none;
    background-color: transparent;
    padding: 5px 15px;
    position: absolute;
    right: 10px;
    font-size: var(--font-micro);
  }
`;

export default Filter;
