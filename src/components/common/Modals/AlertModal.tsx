import React, { Dispatch } from 'react';
import styled from 'styled-components';
import Button from '../Button/Button';

interface Props {
  onClose: Dispatch<React.SetStateAction<boolean>>;
  content: string;
}

const AlertModal = ({ content, onClose }: Props) => {
  return (
    <Container>
      <p>{content}</p>
      <Button onClick={() => onClose(false)}>확인</Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    font-size: 2rem;
    font-weight: 300;
    margin-bottom: 30px;
  }

  button {
    font-size: 20px;
  }
`;

export default AlertModal;
