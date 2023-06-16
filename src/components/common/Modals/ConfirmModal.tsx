import React, { Dispatch } from 'react';
import Modal from '../Modal/Modal';
import styled from 'styled-components';
import Button from '../Button/Button';

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
        <div className="btns">
          <Button
            className="confirm"
            onClick={() => {
              onConfirm();
              onClose(false);
            }}
          >
            예
          </Button>
          <Button className="decline" onClick={() => onClose(false)}>
            아니요
          </Button>
        </div>
      </Container>
    </Modal>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 2rem;

  p {
    text-align: center;
    margin-bottom: 20px;
    word-break: keep-all;
  }
  .btns {
    display: flex;
    gap: 20px;
  }
`;

export default ConfirmModal;
