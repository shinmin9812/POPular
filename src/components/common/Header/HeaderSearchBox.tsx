import styled from 'styled-components';
import SearchIcon from '../Icons/SearchIcon';
import { useNavigate } from 'react-router-dom';
import { KeyboardEvent, useState } from 'react';

const Container = styled.div`
  position: relative;

  input {
    width: 200px;
    // width: 40px;
    height: 30px;

    padding: 0 30px 0 10px;
    outline: none;

    border-radius: 20px;
    border: 1px solid var(--color-main);
    // border: 1px solid var(--color-sub);

    transition: width 0.5s, transform 0.5s;
    transform-origin: right center;
    transform: scale(1.2);

    // &:focus {
    //   width: 200px;
    //   outline: none;
    //   border: 1px solid var(--color-main);

    //   transform: scale(1.2);
    // }
  }

  svg {
    position: absolute;
    right: 2px;
    top: 0px;
    transform: scale(0.6);
    fill: var(--color-sub);

    &:hover {
      cursor: pointer;
    }
  }
`;

const HeaderSearchBox = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const movePage = useNavigate();

  const handleInputHeaderSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchValue) {
      movePage('/search', { state: { value: searchValue } });
      setSearchValue('');
      window.scrollTo(0, 0);
    }
  };

  const handleChangeHeaderSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleButtonHeaderSearch = () => {
    if (searchValue) {
      movePage('/search', { state: { value: searchValue } });
      setSearchValue('');
      window.scrollTo(0, 0);
    }
  };

  return (
    <Container>
      <input
        type="text"
        value={searchValue}
        onKeyPress={handleInputHeaderSearch}
        onChange={handleChangeHeaderSearch}
        placeholder="스토어를 검색해보세요."
      />
      <button onClick={handleButtonHeaderSearch}>
        <SearchIcon />
      </button>
    </Container>
  );
};

export default HeaderSearchBox;
