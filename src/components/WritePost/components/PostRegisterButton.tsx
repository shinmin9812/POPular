import styled from 'styled-components';

const PostRegisterButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  background-color: var(--color-main);
  color: var(--color-white);
  font-size: var(--font-medium);
  font-weight: var(--weight-regular);
  border-radius: 8px;
  padding: 15px;
`;

const PostRegisterButton = ({ children, onClick }: { children: string; onClick: () => void }) => {
  return (
    <PostRegisterButtonWrap>
      <Button onClick={onClick}>{children}</Button>
    </PostRegisterButtonWrap>
  );
};

export default PostRegisterButton;
