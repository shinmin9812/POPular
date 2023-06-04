import styled from 'styled-components';

const Input = styled.input`
  width: 95%;
  border: 1px solid #987fc0;
  border-radius: 8px;
  padding: 10px;
  margin-top: 10px;
`;

const TitleInputWrap = styled.div`
  margin-top: 10px;
  font-size: var(--font-medium);
  font-weight: var(--weight-semi-bold);
`;

const TitleInput = () => {
  return (
    <TitleInputWrap>
      제목
      <Input />
    </TitleInputWrap>
  );
};

export default TitleInput;
