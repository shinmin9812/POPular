import styled from 'styled-components';
import PenIcon from '../../common/Icons/PenIcon';

const PenIconWrap = styled.span`
  margin-left: 5px;
`;

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 23%;
  height: 39px;
  margin-left: 10px;
  background-color: var(--color-sub);
  color: var(--color-white);
  border: none;
  border-radius: 8px;
  font-size: 14px;
  padding: 10px;
  margin-top: 10px;

  + span {
    margin-left: 10px;
  }
`;

const WriteButton = () => {
  return (
    <>
      <Button>
        글쓰기
        <PenIconWrap>
          <PenIcon />
        </PenIconWrap>
      </Button>
    </>
  );
};

export default WriteButton;
