import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../UserSlice';
import { RootState } from '../../../store';

interface Option {
  value: string;
  name: string;
}

const Filter = ({ options }: { options: Option[] }) => {
  const filter = useSelector((state: RootState) => state.UserSlice.filter);
  const dispatch = useDispatch();
  console.log(filter);

  return (
    <Container>
      <select value={filter} onChange={(e) => dispatch(setFilter(e.target.value))}>
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
