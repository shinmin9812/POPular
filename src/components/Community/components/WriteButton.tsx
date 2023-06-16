import styled from 'styled-components';
import PenIcon from '../../common/Icons/PenIcon';
import { Link } from 'react-router-dom';
import { CLIENT_PATH } from '../../../constants/path';

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

  @media (max-width: 768px) {
    width: fit-content;
  }
  a {
    font-size: 14px;
    color: var(--color-white);
    width: 100%;
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
  return (
    <Button>
      <Link to={token ? CLIENT_PATH.WRITE : CLIENT_PATH.LOGIN}>
        <span>글쓰기</span>
        <PenIcon />
      </Link>
    </Button>
  );
};

export default WriteButton;
