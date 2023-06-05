import styled, { css } from 'styled-components';

interface Props {
  text: string;
  type: 'blank' | 'submit' | 'cancel';
  className?: string;
  onClick?: any;
}
const ProfileButton = ({ text, type, className, onClick }: Props) => {
  return (
    <Button type={type} className={className} text={text} onClick={onClick}>
      <div>{text}</div>
    </Button>
  );
};

const Button = styled.div<Props>`
  text-align: center;
  padding: 6px 12px;
  border-radius: var(--border-radius-input);
  font-size: var(--font-micro);
  display: inline-block;
  cursor: pointer;

  ${(props) =>
    props.type === 'blank' &&
    css`
      background-color: transparent;
      border: 1px solid var(--color-main);
      color: var(--color-main);

      &:hover {
        background-color: var(--color-main);
        color: #fff;
      }
    `}

  ${(props) =>
    props.type === 'submit' &&
    css`
      background-color: var(--color-main);
      color: white;

      &:hover {
        background-color: var(--color-sub);
        color: #fff;
      }
    `}

  ${(props) =>
    props.type === 'cancel' &&
    css`
      background-color: var(--color-light-black);
      color: white;

      &:hover {
        background-color: var(--color-gray);
        color: #fff;
      }
    `}
`;

export default ProfileButton;
