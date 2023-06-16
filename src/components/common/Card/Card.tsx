import React from 'react';

import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  width: fit-content;
  height: fit-content;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  animation: appear-card 0.8s forwards;

  .title {
    margin-bottom: 20px;

    font-size: 24px;
    font-weight: 700;
  }

  @keyframes appear-card {
    0% {
      bottom: -10px;
      opacity: 0;
    }
    100% {
      bottom: 0;
      opacity: 1;
    }
  }
`;

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Card = ({ children, className }: Props) => {
  return <Container className={`card ${className ? className : ''}`}>{children}</Container>;
};

export default Card;
