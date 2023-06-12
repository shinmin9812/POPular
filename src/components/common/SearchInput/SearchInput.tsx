import styled from 'styled-components';
import SearchIcon from '../Icons/SearchIcon';

const SearchContainer = styled.div`
  width: 100%;
  position: relative;
  svg {
    width: 25px;
    fill: var(--color-gray);
    position: absolute;
    top: 16px;
    left: 10px;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  font-size: 16px;
  margin-top: 10px;
  padding: 11px 11px 11px 39px;
  border: 3px solid #987fc0;
  border-radius: 30px;
  box-sizing: border-box;
`;

const SearchContainerWrap = ({ placeholder }: { placeholder: string }) => {
  return (
    <SearchContainer>
      <SearchIcon />
      <SearchInput placeholder={placeholder} />
    </SearchContainer>
  );
};

export default SearchContainerWrap;
