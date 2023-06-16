import React, { Dispatch } from 'react';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

interface Props {
  onClose: Dispatch<React.SetStateAction<boolean>>;
}

const LoginModal = ({ onClose }: Props) => {
  const navigate = useNavigate();

  function closeHanlder() {
    navigate('/login');
    onClose(false);
  }

  return (
    <Modal onClose={closeHanlder}>
      <Container>
        <p>로그인을 해주세요!</p>
        <Button onClick={closeHanlder}>확인</Button>
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

export default LoginModal;
