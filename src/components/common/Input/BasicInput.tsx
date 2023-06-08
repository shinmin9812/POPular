import React from 'react';
import styled from 'styled-components';

const Container = styled.label`
  font-size: 20px;
  font-weight: 300;

  input {
    font-family: sans-serif;

    width: 300px;
    height: 30px;

    padding: 0 10px;
    margin-left: 10px;

    font-size: 20px;

    border: none;
    border-bottom: 1px solid #c2c2c2;

    transition: all 0.5s;

    &:focus {
      outline: none;
      border-bottom: 1px solid #b937e5;
      background-color: #f1f1f1;
    }
  }
`;

interface Props {
  label: string;
  type: string;
  validator?: RegExp;
  className?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: () => void;
}

const Input = ({ type, label, className, onChange, placeholder, required = false, ...props }: Props) => {
  return (
    <Container>
      {label}
      <input
        required={required}
        type={type}
        className={className}
        onChange={onChange}
        placeholder={placeholder}
        {...props}
      />
    </Container>
  );
};

const BasicInput = React.memo(Input);

export default BasicInput;
