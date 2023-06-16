import styled from 'styled-components';

const Container = styled.button`
  position: absolute;
  top: 50px;
  left: 50%;

  width: 130px;
  height: 35px;

  text-align: center;

  background-color: var(--color-main);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 10px;

  z-index: 400;
  color: var(--color-white);
  font-size: 14px;
  font-weight: 600;

  transform: translateX(-50%);

  transition: all 0.5s;

  &:hover {
    cursor: pointer;

    transform: translateX(-50%) scale(1.2);
  }

  @media all and (max-width: 767px) {
    top: 80px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

interface Props {
  onClick?: () => void;
}

const FindCurrentPositon = ({ onClick }: Props) => {
  return <Container onClick={onClick}>현 위치에서 검색</Container>;
};

export default FindCurrentPositon;
