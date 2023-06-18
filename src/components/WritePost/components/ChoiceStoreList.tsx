import styled from 'styled-components';

const ChoiceStoreList = styled.ul<{ choice: boolean }>`
  height: ${(props) => !props.choice && '500px'};
  overflow-y: auto;
  border: 1px solid var(--color-gray);
  border-radius: 8px;
  margin-top: 10px;
`;

export default ChoiceStoreList;
