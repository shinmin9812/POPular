import styled, { css } from 'styled-components';

interface Props {
  text: string;
  theme: 'blank' | 'submit' | 'cancel';
  className?: string;
  onClick?: any;
  disabled?: boolean;
}
const ProfileButton = ({ text, theme, className, onClick, disabled }: Props) => {
  return (
    <Button theme={theme} className={className} text={text} onClick={onClick} type="submit">
      <div>{text}</div>
    </Button>
  );
};

const Button = styled.button<Props>`
  text-align: center;
  padding: 6px 12px;
  border-radius: var(--border-radius-input);
  font-size: var(--font-micro);
  display: inline-block;
  cursor: pointer;

  ${(props) =>
    props.theme === 'blank' &&
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
    props.theme === 'submit' &&
    css`
      background-color: var(--color-main);
      color: white;

      &:hover {
        background-color: var(--color-sub);
        color: #fff;
      }
    `}

  ${(props) =>
    props.theme === 'cancel' &&
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
