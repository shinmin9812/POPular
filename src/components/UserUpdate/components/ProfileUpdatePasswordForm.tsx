import { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import FormInput from './FormInput';
import ProfileButton from './ProfileButton';

const ProfileUpdatePasswordForm = () => {
  const [userPassword, setUserPassword] = useState({
    password: '',
    passwordcheck: '',
  });

  const { password, passwordcheck } = userPassword;

  const passwordHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = e.target;
    setUserPassword({
      ...userPassword,
      [name]: value,
    });
  };

  return (
    <Container>
      <FormContainer>
        <p className="update-title">비밀번호</p>
        <p className="update-description">비밀번호를 변경할 수 있습니다.</p>
        <FormInner>
          <FormInput type={'password'} value={password} onChange={passwordHandler} />
          <FormInput type={'passwordcheck'} value={passwordcheck} onChange={passwordHandler} />
        </FormInner>
        <FormButton>
          <ProfileButton className="button" text={'수정하기'} theme={'submit'} />
        </FormButton>
      </FormContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 70%;
  margin: 0 auto;
  transition: all 0.3s;
  margin-top: 30px;

  .update-title {
    font-size: var(--font-small);
    font-weight: var(--weight-semi-bold);
  }

  .update-description {
    font-size: var(--font-micro);
    color: var(--color-light-black);
    margin-top: 7px;
  }

  @media all and (max-width: 767px) {
    width: 100%;
    margin: 0 auto;
  }
`;

const FormContainer = styled.form``;

const FormInner = styled.form`
  padding-top: 20px;
`;
const FormButton = styled.div`
  margin-top: 30px;

  .button {
    width: 100%;
    padding: 10px 20px;
  }
`;

export default ProfileUpdatePasswordForm;
