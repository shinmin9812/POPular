import React, { Dispatch } from 'react';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import styled from 'styled-components';

interface Props {
  onClose: Dispatch<React.SetStateAction<boolean>>;
  content: string;
  onConfirm: () => void;
}

const ConfirmModal = ({ content, onConfirm, onClose }: Props) => {
  return (
    <Modal onClose={onClose}>
      <Container>
        <p>{content}</p>
        <button className="confirm" onClick={() => onClose(false)}>
          예
        </button>
        <button className="decline" onClick={() => onClose(false)}>
          아니요
        </button>
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

  button {
  }
`;

export default ConfirmModal;
