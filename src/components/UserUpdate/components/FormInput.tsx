import styled, { css } from 'styled-components';

interface Props {
  type: 'info' | 'nickname' | 'password' | 'passwordcheck' | 'number';
  height?: boolean;
}

const typeLabels = new Map<Props['type'], string>([
  ['info', '한 줄 소개'],
  ['nickname', '닉네임'],
  ['password', '비밀번호'],
  ['passwordcheck', '비밀번호 확인'],
  ['number', '전화번호'],
]);

const Form = ({ type, height }: Props) => {
  const inputType = type === 'nickname' ? 'text' : type === 'number' ? 'number' : 'password';
  return (
    <Container>
      <Label>{typeLabels.get(type)}</Label>
      {height ? (
        <textarea className="style-info"></textarea>
      ) : (
        <Input type={inputType} onChange={(e: React.ChangeEvent<HTMLInputElement>) => console.log(e.target.value)} />
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 5px 0;

  .style-info {
    width: 100%;
    height: 100px;
    padding: 8px;
    margin: 0;
    box-sizing: border-box;
    border: 1px solid var(--color-sub);
    border-radius: var(--border-radius-input);
    font-size: var(--font-small);
    color: var(--color-black);
    resize: none;
  }
`;

const Label = styled.label`
  display: flex;
  align-items: top;
  margin-top: 5px;
  width: 200px;
  font-size: 12px;
`;

const Input = styled.input`
  width: 100%;
  height: 30px;
  padding: 8px;
  margin: 0;
  box-sizing: border-box;
  border: 1px solid var(--color-sub);
  border-radius: var(--border-radius-input);
  font-size: var(--font-small);
  color: var(--color-black);

  ${(props) =>
    props.type === 'number' &&
    css`
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    `}
`;

export default Form;
