import styled, { css } from 'styled-components';

const FilterAndWriteButtonWrap = styled.div<{ isFreeTab: boolean }>`
  display: flex;
  justify-content: center;
  ${(props) =>
    props.isFreeTab &&
    css`
      justify-content: flex-end;
      padding-right: 20px;
    `};
`;

export default FilterAndWriteButtonWrap;
