import React, { Dispatch } from 'react';
import styled from 'styled-components';
import Card from '../Card/Card';
import ModalPortal from './ModalPortal';

interface Props {
  onClose: Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

const Modal = ({ children, onClose }: Props) => {
  return (
    <ModalPortal>
      <Container>
        <div className="overlay" onClick={() => onClose(false)}></div>
        <Card className="modal-wrapper">{children}</Card>
      </Container>
    </ModalPortal>
  );
};

const Container = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  z-index: 9999999;

  .overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(5px);
  }

  .modal-wrapper {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: fit-content;
    height: fit-content;
    padding: 50px 30px;
    background-color: #fff;
    animation: appear-modal 0.3s forwards ease-out;
  }

  @keyframes appear-modal {
    0% {
      transform: translate(-50%, 50%);
    }
    100% {
      transform: translate(-50%, -50%);
    }
  }
`;

export default Modal;
