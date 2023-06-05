import styled, { css } from 'styled-components';

interface Props {
  type: 'info' | 'nickname' | 'password' | 'passwordcheck' | 'number' | 'checkbox';
  height?: boolean;
  value: string | number | readonly string[] | undefined;
  checked?: boolean;
  onChange: any;
}

const typeLabels = new Map<Props['type'], string>([
  ['info', '한 줄 소개'],
  ['nickname', '닉네임'],
  ['password', '비밀번호'],
  ['passwordcheck', '비밀번호 확인'],
  ['number', '전화번호'],
  ['checkbox', '알림 허용'],
]);

const FormInput = ({ type, height, checked, value, onChange }: Props) => {
  const inputType =
    type === 'nickname'
      ? 'text'
      : type === 'number'
      ? 'number'
      : type === 'password' || type === 'passwordcheck'
      ? 'password'
      : 'checkbox';

  return (
    <Container>
      <Label>{typeLabels.get(type)}</Label>
      {height ? (
        <InputFrame>
          <textarea
            className="style-info"
            name={type}
            placeholder={value as string}
            value={value as string}
            onChange={onChange}
          ></textarea>
        </InputFrame>
      ) : (
        <InputFrame>
          <Input
            type={inputType}
            checked={checked}
            name={type}
            // value={value}
            onChange={onChange}
          />
        </InputFrame>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: start;
  padding: 5px 0;

  .style-info {
    width: 100%;
    height: 100px;
    padding: 8px;
    margin: 0;
    box-sizing: border-box;
    border: 1px solid var(--color-sub);
    border-radius: var(--border-radius-input);
    font-size: var(--font-micro);
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

const InputFrame = styled.div`
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  height: 30px;
  padding: 8px;
  margin: 0;
  box-sizing: border-box;
  border: 1px solid var(--color-sub);
  border-radius: var(--border-radius-input);
  font-size: var(--font-micro);
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

  ${(props) =>
    props.type === 'checkbox' &&
    css`
      width: initial;
    `}
`;

export default FormInput;
