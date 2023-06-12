import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface Props {
  text: string;
  type: 'follow' | 'profileEdit';
  disabled?: boolean;
  link?: string | undefined;
  onClick?: () => void;
}

const ProfileButton = ({ text, type, disabled, link, onClick }: Props) => {
  const buttonClassName = `ButtonType_${type}`;
  return (
    <>
      {link ? (
        <Button className={buttonClassName}>
          <Link className="button-link" to={link}>
            {text}
          </Link>
        </Button>
      ) : (
        <Button className={buttonClassName} onClick={onClick}>
          {text}
        </Button>
      )}
    </>
  );
};

const Button = styled.button`
  border-radius: 4px;
  font-size: var(--font-micro);
  padding: 8px 18px;
  display: block;
  color: #fff;
  cursor: pointer;

  &.ButtonType_follow {
    background-color: var(--color-main);

    .button-link {
      color: var(--color-light-gray);
    }
  }

  &.ButtonType_profileEdit {
    background-color: transparent;
    border: 1px solid var(--color-main);

    .button-link {
      color: var(--color-main);
    }
  }
`;

export default ProfileButton;
