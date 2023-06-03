import styled from 'styled-components';

interface Props {
  type: 'email' | 'password';
}

const FormField = ({ type }: Props) => {
  return (
    <FieldContainer>
      <Label>{type === 'email' ? '이메일' : '비밀번호'}</Label>
      <Input type={type} />
    </FieldContainer>
  );
};

const FieldContainer = styled.div`
  display: flex;
  width: 300px;
  justify-content: space-between;
  padding: 10px 0;
`;

const Label = styled.label`
  justify-content: center;
  display: flex;
  align-items: center;
  width: 70px;
`;

const Input = styled.input`
  width: 200px;
  height: 30px;
  padding: 8px;
  margin: 0;
  box-sizing: border-box;
  border: 1px solid var(--color-sub);
  border-radius: var(--border-radius-input);
  font-size: var(--font-small);
  color: var(--color-black);
`;

export default FormField;
