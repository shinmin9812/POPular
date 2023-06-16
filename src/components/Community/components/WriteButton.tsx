import styled from 'styled-components';
import PenIcon from '../../common/Icons/PenIcon';
import { Link, useNavigate } from 'react-router-dom';
import { CLIENT_PATH } from '../../../constants/path';
import { useState } from 'react';
import LoginModal from '../../common/Modals/LoginModal';

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 28%;
  height: 39px;
  margin-left: 5px;
  background-color: var(--color-sub);
  border: none;
  border-radius: 8px;
  padding: 10px;
  margin-top: 10px;
  cursor: pointer;
  font-size: 14px;
  color: var(--color-white);

  @media (max-width: 768px) {
    width: fit-content;
  }

  span {
    margin-right: 10px;
    @media (max-width: 768px) {
      display: none;
    }
  }
`;

const WriteButton = () => {
  const token = localStorage.getItem('token');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => {
        if (!token) setIsModalOpen(true);
        else navigate(CLIENT_PATH.WRITE);
      }}
    >
      <span>글쓰기</span>
      <PenIcon />
      {isModalOpen && <LoginModal onClose={setIsModalOpen} />}
    </Button>
  );
};

export default WriteButton;
