import styled from 'styled-components';

const TitleNameWrap = styled.span`
  width: 5%;
  text-align: center;
  line-height: 33px;
  font-size: var(--font-medium);
`;

const Input = styled.input`
  width: 80%;
  border: 1px solid #987fc0;
  border-radius: 8px;
  padding: 10px;
`;

const TitleInputWrap = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  font-size: var(--font-medium);
  font-weight: var(--weight-semi-bold);
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
