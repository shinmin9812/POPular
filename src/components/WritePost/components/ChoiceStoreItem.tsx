import styled from 'styled-components';

const Li = styled.li`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

const ChoiceButton = styled.button<{ choice: boolean }>`
  color: var(--color-white);
  background-color: ${(props) => (props.choice ? 'var(--color-gray)' : 'var(--color-sub)')};
  height: 30px;
  width: 60px;
  margin-bottom: 20px;
  margin-right: 20px;
  border-radius: 8px;
  cursor: pointer;
  @media (max-width: 450px) {
    font-size: var(--font-micro);
    height: 30px;
    width: 40px;
  }
`;

const Label = styled.label`
  width: 80%;
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
      <Label htmlFor={storeId}>{children}</Label>
      <ChoiceButton choice={choice} onClick={onClick} id={storeId}>
        {choice ? '취소' : '선택'}
      </ChoiceButton>
    </Li>
  );
};

export default ChoiceStoreItem;
