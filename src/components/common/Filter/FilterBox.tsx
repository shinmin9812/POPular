import styled from 'styled-components';

const FilterBox = styled.div<{ width: number }>`
  display: flex;
  justify-content: space-around;
  ${(props) => `width: ${props.width}%;`}
`;

export default FilterBox;
