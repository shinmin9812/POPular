import styled from 'styled-components';

const Input = styled.input`
  flex-grow: 1;
  border: none;
  border-bottom: 1px solid #987fc0;

  font-size: 20px;

  &:focus {
    outline: none;
    border-bottom: 2px solid #987fc0;
  }
`;

const TitleInputWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  padding: 0 20px;

  p {
    width: fit-content;
    font-size: 20px;
  }
`;

const PostTitle = ({ value, onChange }: { value: string; onChange: (title: string) => void }) => {
  return (
    <TitleInputWrap>
      <p>제목</p>
      <Input
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
    </TitleInputWrap>
  );
};

export default PostTitle;
