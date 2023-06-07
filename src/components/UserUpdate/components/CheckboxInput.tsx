import { ChangeEvent } from 'react';
import styled from 'styled-components';

interface Category {
  value: string;
  name: string;
}

interface Props {
  type: 'interested_category' | 'allow_notification';
  value: string[] | boolean;
  defaultData?: Category[];
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  btnName?: string;
}

const typeLabels = new Map<Props['type'], string>([
  ['interested_category', '선호 카테고리'],
  ['allow_notification', '알림 허용'],
]);

const CheckboxInput = ({ type, value, defaultData, onChange, btnName }: Props) => {
  return (
    <Container>
      <Label>{typeLabels.get(type)}</Label>
      <InputInner>
        {defaultData ? (
          defaultData.map((item, index) => (
            <div className="input-item-box" key={index}>
              <Input
                type="checkbox"
                value={item.value}
                name={type}
                onChange={onChange}
                id={item.name}
                checked={Array.isArray(value) && value.includes(item.value)}
              />
              <label htmlFor={item.name}>{item.value}</label>
            </div>
          ))
        ) : (
          <div className="input-item-box">
            <Input
              id={type}
              type="checkbox"
              name={type}
              value={value ? 'true' : 'false'}
              onChange={onChange}
              checked={Boolean(value)}
            />
            <label htmlFor={type}>{btnName}</label>
          </div>
        )}
      </InputInner>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 5px 0;
`;

const Label = styled.label`
  display: flex;
  align-items: top;
  margin-top: 5px;
  width: 200px;
  font-size: 12px;
`;

const InputInner = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;

  .input-item-box {
    height: 30px;

    label {
      display: block;
    }
  }
`;

const Input = styled.input`
  background: #eee;
  color: #999;
  display: inline-block;
  width: 90%;
  padding: 7px 0;
  text-align: center;
  box-sizing: border-box;
  vertical-align: middle;
  border-radius: var(--border-radius-input);
  border: 1px solid var(--color-sub);
  background-color: #f3f3f3;
  font-size: var(--font-micro);
  display: none;

  & ~ label {
    background: #eee;
    border-radius: var(--border-radius-input);
    width: 100%;
    padding: 7px 20px;
    text-align: center;
    font-size: var(--font-micro);
    box-sizing: border-box;
  }

  &:checked + label {
    background-color: var(--color-sub);
    color: #fff;
  }
`;

export default CheckboxInput;
