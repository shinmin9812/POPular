import React from 'react';
import styled from 'styled-components';

const Container = styled.label`
  display: flex;
  flex-direction: column;

  font-size: 20px;
  font-weight: 300;

  textarea {
    width: 500px;
    height: 100px;

    margin-top: 10px;
    padding: 10px;

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
}

const BasicTextarea = ({ label, className }: Props) => {
  const changeHandler = () => {
    console.log('change');
  };
  return (
    <Container>
      {label}
      <textarea className={className} onChange={changeHandler} />
    </Container>
  );
};

export default BasicTextarea;
