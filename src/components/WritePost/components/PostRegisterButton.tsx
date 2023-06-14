import styled from 'styled-components';

const PostRegisterButton = styled.button<{ isUpdate: boolean }>`
  background-color: ${(props) => (props.isUpdate ? 'var(--color-gray)' : 'var(--color-main)')};
  color: var(--color-white);
  height: fit-content;
  border-radius: 8px;
  padding: 15px;
  cursor: pointer;
  width: 100px;
  + button {
    margin-left: 10px;
  }
  @media (max-width: 500px) {
    width: 70px;
    font-size: var(--font-micro);
  }
`;

export default PostRegisterButton;
