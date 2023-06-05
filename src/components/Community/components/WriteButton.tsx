import styled from 'styled-components';
import PenIcon from '../../common/Icons/PenIcon';
import { Link } from 'react-router-dom';

const PenIconWrap = styled.span`
  margin-left: 5px;
`;

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 22%;
  height: 39px;
  margin-left: 10px;
  background-color: var(--color-sub);
  border: none;
  border-radius: 8px;
  padding: 10px;
  margin-top: 10px;

  a {
    font-size: 14px;
    color: var(--color-white);
  }

  + span {
    margin-left: 10px;
  }
`;

const WriteButton = () => {
  return (
    <>
      <Button>
        <Link to="/community/write">글쓰기</Link>
        <PenIconWrap>
          <PenIcon />
        </PenIconWrap>
      </Button>
    </>
  );
};

export default WriteButton;
