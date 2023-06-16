import { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import FormInput from './FormInput';
import ProfileButton from './ProfileButton';
import { useParams } from 'react-router-dom';
import { User } from '../../../types/user';
import { API_PATH } from '../../../constants/path';

interface Props {
  user: User;
}

const ProfileUpdatePasswordForm = ({ user }: Props) => {
  const { userId } = useParams();
  const token = localStorage.getItem('token');
  const [userPassword, setUserPassword] = useState({
    password: '',
    passwordcheck: '',
  });
  const { password, passwordcheck } = userPassword;
  const [errors, setErrors] = useState({
    password: '',
    passwordcheck: '',
  });

  // 비밀번호 유효성 검사
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState<boolean>(false);

  const passwordHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = e.target;
    switch (name) {
      case 'password':
        setUserPassword((prevUserPassword) => ({
          ...prevUserPassword,
          [name]: value,
        }));
        validatePassword(value);
        break;
      case 'passwordcheck':
        setUserPassword((prevUserPassword) => ({
          ...prevUserPassword,
          [name]: value,
        }));
        validateConfirmPassword(value);
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) {
      alert('비밀번호를 입력해주세요.');
      return;
    }

    try {
      if (!userId) return;
      const response = await fetch(API_PATH.USER.PATCH.replace(':userId', userId), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          pw: password,
        }),
      });

      if (response.ok) {
        alert('회원정보 수정이 완료되었습니다.');
        setUserPassword({ password: '', passwordcheck: '' });
        setIsPassword(false);
        setIsPasswordConfirm(false);
      } else {
        throw new Error('회원정보 수정에 실패했습니다.');
      }
    } catch (error: any) {
      throw new Error(error);
    }
  };

  // 비밀번호 유효성 검사
  const validatePassword = (value: string) => {
    const isPasswordValid = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
    let error = '';
    if (!isPasswordValid.test(value) && value.length > 0) {
      error = '8~15자, 특수문자, 문자, 숫자를 포함해야 합니다.';
      setErrors((prevState) => ({ ...prevState, password: error }));
      setIsPassword(false);
    } else {
      setErrors((prevState) => ({ ...prevState, password: '' }));
      setIsPassword(true);
    }
  };

  // 비밀번호 확인 유효성 검사
  const validateConfirmPassword = (value: string) => {
    let error = '';
    if (value !== password && value.length > 0) {
      error = '비밀번호가 일치하지 않습니다.';
      setErrors((prevState) => ({ ...prevState, passwordcheck: error }));
      setIsPasswordConfirm(false);
    } else {
      setErrors((prevState) => ({ ...prevState, passwordcheck: '' }));
      setIsPasswordConfirm(true);
    }
  };

  const isFormValid = isPassword && isPasswordConfirm;

  return (
    <Container>
      <FormContainer onSubmit={handleSubmit}>
        <p className="update-title">비밀번호</p>
        <p className="update-description">비밀번호를 변경할 수 있습니다.</p>
        <FormInner>
          <FormInput type={'password'} value={password} onChange={passwordHandler} />
          {errors.password && <ErrorNotice>{errors.password}</ErrorNotice>}
          <FormInput type={'passwordcheck'} value={passwordcheck} onChange={passwordHandler} />
          {errors.passwordcheck && <ErrorNotice>{errors.passwordcheck}</ErrorNotice>}
        </FormInner>
        <FormButton>
          <ProfileButton className="button" text={'수정하기'} theme={'submit'} disabled={isFormValid} />
        </FormButton>
      </FormContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 70%;
  margin: 0 auto;
  transition: all 0.3s;
  margin-top: 40px;

  .update-title {
    font-size: 17px;
    font-weight: var(--weight-semi-bold);
  }

  .update-description {
    font-size: var(--font-small);
    color: var(--color-light-black);
    margin-top: 7px;
  }

  @media all and (max-width: 767px) {
    width: 100%;
    margin: 0 auto;
  }
`;

const FormContainer = styled.form`
  width: 100%;
`;

const FormInner = styled.div`
  padding-top: 30px;
`;

const ErrorNotice = styled.div`
  text-align: right;
  font-size: var(--font-small);
`;

const FormButton = styled.div`
  margin-top: 30px;

  .button {
    width: 100%;
    padding: 10px 20px;
  }
`;

export default ProfileUpdatePasswordForm;
