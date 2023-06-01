import * as React from 'react';
import styled from 'styled-components';

interface Props {
  label: '이름' | '닉네임' | '이메일' | '비밀번호' | '비밀번호 확인' | '전화번호';
  name: 'name' | 'nickname' | 'email' | 'password' | 'passwordConfirm' | 'phoneNumber';
  type: 'text' | 'email' | 'password' | 'number';
}

const FormField = ({ label, name, type }: Props) => {
  return (
    <FieldContainer>
      <Label htmlFor={name}>{label}</Label>
      <Input
        type={type}
        name={name}
        id={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => console.log(e.target.value)}
      />
    </FieldContainer>
  );
};

export default FormField;

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 14px;
`;

const Label = styled.label`
  font-size: var(--font-small);
  width: 270px;
  padding-left: 8px;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 270px;
  height: 30px;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid var(--color-sub);
  border-radius: var(--border-radius-input);
  font-size: var(--font-small);
  color: var(--color-black);
`;
