import React, { Dispatch } from 'react';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import styled from 'styled-components';

interface Props {
  onClose: Dispatch<React.SetStateAction<boolean>>;
  content: string;
}

const AlertModal = ({ content, onClose }: Props) => {
  return (
    <Modal onClose={onClose}>
      <Container>
        <p>{content}</p>
        <Button onClick={() => onClose(false)}>확인</Button>
      </Container>
    </Modal>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 32px;

  p {
    margin-bottom: 20px;
  }
`;

export default AlertModal;
