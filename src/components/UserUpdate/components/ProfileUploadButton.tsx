import styled from 'styled-components';

interface Props {
  text: string;
  name: string;
  onChange: any;
}

const ProfileUploadButton = ({ text, name, onChange }: Props) => {
  return (
    <Button>
      <label htmlFor="file">
        <div className="btn-upload">{text}</div>
      </label>
      <input type="file" name={name} id="file" onChange={onChange} />
    </Button>
  );
};

const Button = styled.div`
  display: inline-block;

  .btn-upload {
    text-align: center;
    padding: 6px 12px;
    background-color: var(--color-main);
    border-radius: var(--border-radius-input);
    color: #fff;
    font-size: var(--font-micro);
    cursor: pointer;

    &:hover {
      background-color: var(--color-sub);
      color: #fff;
    }
  }
  input {
    display: none;
  }
`;

export default ProfileUploadButton;
