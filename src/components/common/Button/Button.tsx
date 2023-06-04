import React from 'react';
import styled from 'styled-components';

const Container = styled.button`
  padding: 10px 14px;

  background-color: var(--color-main);
  border-radius: 8px;

  color: #fff;
  font-weight: 700;
  font-size: 12px;
`;

interface Props {
  children: React.ReactNode;
  onClick: () => void;
}

const Button = ({ children, onClick }: Props) => {
  return <Container onClick={onClick}>{children}</Container>;
};

export default Button;
