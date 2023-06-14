import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import ModalContainer from './ModalContainer';
import Card from '../Card/Card';

interface Props {
  children: React.ReactNode;
}

const Modal = ({ children }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLDivElement;
    if (!target.classList.contains('modal-overlay')) return;
    modalRef.current?.classList.add('closing');
    setTimeout(() => {
      document.body.style.overflow = 'auto';
      modalRef.current?.classList.remove('closing');
      modalRef.current?.classList.add('closed');
    }, 300);
  };

  return (
    <ModalContainer>
      <Overlay onClick={handleClose} ref={modalRef} className="modal-overlay">
        <Card className="modal-wrapper">
          <div className="modal-content">{children}</div>
        </Card>
      </Overlay>
    </ModalContainer>
  );
};

const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 9999;
  animation: appear-modal-overlay 0.3s ease-out forwards;
  backdrop-filter: blur(5px);

  &.closing {
    animation: disappear-modal-overlay 0.3s forwards;

    .modal-wrapper {
      animation: disappear-modal 0.3s forwards;
    }
  }

  &.closed {
    display: none;
  }

  .modal-wrapper {
    position: absolute;
    width: 600px;
    height: fit-content;
    padding: 50px 30px;
    background-color: #fff;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -80%);
    animation: appear-modal 0.3s forwards;
  }

  @keyframes appear-modal {
    0% {
      opacity: 0;
      transform: translate(-50%, 500px);
    }
    100% {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
  }

  @keyframes disappear-modal {
    0% {
      opacity: 0;
      transform: translate(-50%, -50%);
    }
    100% {
      opacity: 1;
      transform: translate(-50%, 500px);
    }
  }

  @keyframes appear-modal-overlay {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes disappear-modal-overlay {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

export default Modal;
