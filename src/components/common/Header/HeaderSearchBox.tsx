import styled from 'styled-components';
import SearchIcon from '../Icons/SearchIcon';

const Container = styled.div`
  position: relative;

  input {
    width: 40px;
    height: 30px;

    padding: 0 30px 0 10px;

    border-radius: 20px;
    border: 1px solid var(--color-sub);

    transition: width 0.5s, transform 0.5s;
    transform-origin: right center;

    &:focus {
      width: 200px;

      outline: none;
      border: 1px solid var(--color-main);

      transform: scale(1.2);
    }
  }

  svg {
    position: absolute;
    right: 4px;
    top: 1px;
    transform: scale(0.6);
    fill: var(--color-gray);

    &:hover {
      cursor: pointer;
    }
  }
`;

const HeaderSearchBox = () => {
  return (
    <Container>
      <input type="text" placeholder="팝업 스토어 "></input>
      <SearchIcon />
    </Container>
  );
};

export default HeaderSearchBox;
