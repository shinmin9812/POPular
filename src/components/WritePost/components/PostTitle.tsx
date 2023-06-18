import styled from 'styled-components';

const TitleNameWrap = styled.span`
  width: fit-content;
  text-align: center;
  line-height: 33px;
  font-size: var(--font-medium);
  font-weight: var(--weight-semi-bold);
  @media (max-width: 420px) {
    font-size: var(--font-small);
  }
`;

const Input = styled.input`
  width: 80%;
  padding: 10px;
  flex-grow: 1;
  border: 1px solid #987fc0;
  border-radius: 8px;
  font-size: var(--font-regular);
  &:focus {
    outline: none;
    border-bottom: 2px solid #987fc0;
  }
`;

const TitleInputWrap = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  align-items: center;
  gap: 10px;
  padding: 0 20px;
`;

const PostTitle = ({ value, onChange }: { value: string; onChange: (title: string) => void }) => {
  return (
    <TitleInputWrap>
      <TitleNameWrap>제목</TitleNameWrap>
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
