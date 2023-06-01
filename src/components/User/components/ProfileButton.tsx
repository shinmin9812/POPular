import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface Props {
  text: string;
  type: 'follow' | 'profileEdit';
}

const ProfileButton = ({ text, type }: Props) => {
  const buttonClassName = `ButtonType_${type}`;
  return (
    <Button className={buttonClassName}>
      <Link className="button-link" to={''}>
        {text}
      </Link>
    </Button>
  );
};

const Button = styled.button`
  border-radius: 4px;

  .button-link {
    font-size: var(--font-micro);
    padding: 8px 18px;
    display: block;
  }

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
