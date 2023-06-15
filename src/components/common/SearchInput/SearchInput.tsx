import styled from 'styled-components';
import SearchIcon from '../Icons/SearchIcon';

type Props = {
  placeholder: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onKeyPress?: React.KeyboardEventHandler<HTMLInputElement>;
};

const SearchContainer = styled.div`
  width: 100%;
  position: relative;
  svg {
    width: 25px;
    fill: var(--color-gray);
    position: absolute;
    top: 21px;
    left: 10px;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  font-size: 16px;
  margin-top: 15px;
  padding: 11px 11px 11px 39px;
  border: 3px solid #987fc0;
  border-radius: 30px;
  box-sizing: border-box;
`;

const SearchContainerWrap = ({ placeholder, value, onChange, onKeyPress }: Props) => {
  return (
    <SearchContainer>
      <SearchIcon />
      <SearchInput placeholder={placeholder} value={value} onChange={onChange} onKeyPress={onKeyPress} />
    </SearchContainer>
  );
};

export default SearchContainerWrap;
