import styled from 'styled-components';

const Li = styled.li`
  width: 100%;
  position: relative;
  display: flex;
  align-items: flex-end;
  width: 100%;
`;

const ChoiceButton = styled.button<{ choice: boolean }>`
  position: absolute;
  right: 0;
  padding: 0 5px;
  color: var(--color-white);
  background-color: ${(props) => (props.choice ? 'var(--color-gray)' : 'var(--color-sub)')};
  height: 30px;
  font-size: 12px;
  width: fit-content;
  margin-bottom: 20px;
  margin-right: 20px;
  border-radius: 8px;
  cursor: pointer;
`;

const ChoiceStoreItem = ({
  storeId,
  children,
  onClick,
  choice,
}: {
  storeId: string;
  children: JSX.Element;
  onClick: () => void;
  choice: boolean;
}) => {
  return (
    <Li>
      <label htmlFor={storeId}>{children}</label>
      <ChoiceButton choice={choice} onClick={onClick} id={storeId}>
        {choice ? '취소' : '선택'}
      </ChoiceButton>
    </Li>
  );
};

export default ChoiceStoreItem;
