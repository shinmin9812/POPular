import styled from 'styled-components';

const Button = styled.button`
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
`;

const WriteButton = () => {
  return <Button>글쓰기</Button>;
};

export default WriteButton;
