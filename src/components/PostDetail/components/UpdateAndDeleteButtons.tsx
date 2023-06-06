import styled from 'styled-components';

const Button = styled.button<{ update: boolean }>`
  color: var(--color-white);
  border-radius: 8px;
  width: 30px;
  font-size: var(--font-small);
  background-color: ${(props) => (props.update ? 'var(--color-main)' : 'var(--color-gray)')};
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const UpdateAndDelete = () => {
  return (
    <ButtonWrap>
      <Button update={true} />
      <Button update={false} />
    </ButtonWrap>
  );
};
