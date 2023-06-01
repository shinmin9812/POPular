import * as React from 'react';
import styled from 'styled-components';

interface Props {
  label: '이름' | '이메일' | '비밀번호' | '비밀번호 확인' | '전화번호';
  type: 'name' | 'email' | 'password' | 'number';
}

const FormField = ({ label, type }: Props) => {
  return (
    <FieldContainer>
      <Label>{label}</Label>
      <Input type={type} onChange={(e: React.ChangeEvent<HTMLInputElement>) => console.log(e.target.value)} />
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
