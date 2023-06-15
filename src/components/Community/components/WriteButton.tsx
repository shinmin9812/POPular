import styled from 'styled-components';
import PenIcon from '../../common/Icons/PenIcon';
import { Link } from 'react-router-dom';
import { CLIENT_PATH } from '../../../constants/path';

const PenIconWrap = styled.span`
  margin-left: 5px;
`;

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 25%;
  height: 39px;
  margin-left: 10px;
  background-color: var(--color-sub);
  border: none;
  border-radius: 8px;
  padding: 10px;
  margin-top: 10px;
  cursor: pointer;

  a {
    font-size: 14px;
    color: var(--color-white);
    width: 100%;
  }

  + span {
    margin-left: 10px;
  }
`;

const WriteButton = () => {
  const token = localStorage.getItem('token');
  return (
    <Button>
      <Link to={token ? CLIENT_PATH.WRITE : CLIENT_PATH.LOGIN}>
        글쓰기
        <PenIconWrap>
          <PenIcon />
        </PenIconWrap>
      </Link>
    </Button>
  );
};

export default WriteButton;
