import styled from 'styled-components';

const Li = styled.li`
  display: flex;
  align-items: flex-end;
`;

const ChoiceButton = styled.button<{ choice: boolean }>`
  color: var(--color-white);
  background-color: ${(props) => (props.choice ? 'var(--color-gray)' : 'var(--color-sub)')};
  height: 30px;
  width: 60px;
  margin-bottom: 20px;
  margin-right: 20px;
  border-radius: 8px;
`;

const ChoiceStoreItem = ({
  children,
  onClick,
  choice,
}: {
  children: JSX.Element;
  onClick: () => void;
  choice: boolean;
}) => {
  return (
    <Li>
      {children}
      <ChoiceButton choice={choice} onClick={onClick}>
        {choice ? '취소' : '선택'}
      </ChoiceButton>
    </Li>
  );
};

export default ChoiceStoreItem;
