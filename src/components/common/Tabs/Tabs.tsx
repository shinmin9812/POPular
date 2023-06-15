import styled, { css } from 'styled-components';

const Tab = styled.p<{ active: boolean }>`
  text-align: center;
  font-size: var(--font-regular);
  padding-bottom: 10px;
  width: 100%;
  cursor: pointer;

  + p {
    margin-left: 4px;
  }

  &:hover {
    color: var(--color-main);
  }

  ${(props) =>
    props.active &&
    css`
      color: var(--color-main);
      border-bottom: 3px solid var(--color-main);
      font-size: var(--font-medium);
      @media (max-width: 420px) {
        font-size: var(--font-regular);
      }
    `}
`;

export default Tab;
