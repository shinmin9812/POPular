import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styled from 'styled-components';
import autoHyphen from '../../../utils/autoHyphen';

const SignupForm = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: '',
    nickname: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });
  const { name, nickname, email, password, confirmPassword, phone } = inputs;

  const [allowNotifications, setAllowNotifications] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    nickname: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
    switch (name) {
      case 'name':
        validateName(value);
        break;
      case 'nickname':
        handleNicknameChange(e);
        break;
      case 'email':
        handleEmailChange(e);
        break;
      case 'password':
        validatePassword(value);
        break;
      case 'confirmPassword':
        validateConfirmPassword(value);
        break;
      case 'phone':
        validatePhone(value);
        break;
    }
  };

  // 알림 설정 체크박스 변경 이벤트 핸들러
  const handleAllowNotificationsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setAllowNotifications(checked);
  };

  // 중복 닉네임 체크
  const checkNicknameExists = async (nickname: string) => {
    try {
      const response = await fetch('http://34.22.81.36:3000/users/checknickname', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nickname: nickname,
        }),
      });
      const data = await response.json();
      if (data.isExists) {
        setErrors((prevState) => ({ ...prevState, nickname: '다른 유저가 사용중인 닉네임입니다.' }));
      }
    } catch (err: any) {
      throw new Error(err);
    }
  };

  // 중복 이메일 체크
  const checkEmailExists = async (email: string) => {
    try {
      const response = await fetch('http://34.22.81.36:3000/users/checkemail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
        }),
      });
      const data = await response.json();
      if (data.isExists) {
        setErrors((prevState) => ({ ...prevState, email: '이미 가입된 이메일입니다.' }));
      }
    } catch (err: any) {
      throw new Error(err);
    }
  };

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
    validateNickname(value);
    checkNicknameExists(value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
    validateEmail(value);
    checkEmailExists(value);
  };

  // 이름 유효성 검사
  const validateName = (value: string) => {
    let error = '';
    if (value.trim().length < 2 && value.length > 0) {
      error = '2글자 이상 입력하세요.';
    }
    setErrors((prevState) => ({ ...prevState, name: error }));
  };

  // 이메일 유효성 검사
  const validateEmail = (value: string) => {
    const isEmailValid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    let error = '';
    if (!isEmailValid.test(value) && value.length > 0) {
      error = '유효한 이메일 주소를 입력하세요.';
    }
    setErrors((prevState) => ({ ...prevState, email: error }));
  };

  // 닉네임 유효성 검사
  const validateNickname = (value: string) => {
    let error = '';
    if (value.trim().length < 2 && value.length > 0) {
      error = '2글자 이상 입력하세요.';
    }
    setErrors((prevState) => ({ ...prevState, nickname: error }));
  };

  // 비밀번호 유효성 검사
  const validatePassword = (value: string) => {
    const isPasswordValid = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
    if (value === confirmPassword) {
      setErrors((prevState) => ({ ...prevState, confirmPassword: '' }));
    } else setErrors((prevState) => ({ ...prevState, confirmPassword: '비밀번호가 일치하지 않습니다.' }));

    let error = '';
    if (!isPasswordValid.test(value) && value.length > 0) {
      error = '8~15자, 특수문자, 문자, 숫자를 포함해야 합니다.';
    }
    setErrors((prevState) => ({ ...prevState, password: error }));
  };
  // 비밀번호 확인 유효성 검사
  const validateConfirmPassword = (value: string) => {
    let error = '';
    if (value !== password && value.length > 0) {
      error = '비밀번호가 일치하지 않습니다.';
    }
    setErrors((prevState) => ({ ...prevState, confirmPassword: error }));
  };

  // 전화번호 유효성 검사
  const validatePhone = (value: string) => {
    const isPhoneValid = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/;
    let error = '';
    if (!isPhoneValid.test(value) && value.length > 0) {
      error = '전화번호 형식이 올바르지 않습니다.';
    }
    setErrors((prevState) => ({ ...prevState, phone: error }));
  };

  // 가입하기 버튼 클릭 이벤트 핸들러
  const handleSignup = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('http://34.22.81.36:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          pw: password,
          name: name,
          nickname: nickname,
          phone_number: phone,
          allow_notification: allowNotifications,
        }),
      });
      if (response.ok) {
        alert('환영합니다!');
        navigate('/login');
      }
    } catch (err: any) {
      throw new Error(err);
    }
  };

  const checkEveryInput = () => {
    return Object.values(errors).every((error) => error === '') && Object.values(inputs).every((input) => input !== '');
  };

  return (
    <FormContainer>
      <FieldContainer>
        <Label>
          이름
          {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
        </Label>
        <Input placeholder="2글자 이상" type="text" name="name" value={name} onChange={onChange} />
      </FieldContainer>
      <FieldContainer>
        <Label>
          이메일
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
        </Label>
        <Input placeholder="email@email.com" type="email" name="email" value={email} onChange={onChange} />
      </FieldContainer>
      <FieldContainer>
        <Label>
          닉네임
          {errors.nickname && <ErrorMessage>{errors.nickname}</ErrorMessage>}
        </Label>
        <Input placeholder="2글자 이상" type="text" name="nickname" value={nickname} onChange={onChange} />
      </FieldContainer>
      <FieldContainer>
        <Label>
          비밀번호
          {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
        </Label>
        <Input
          placeholder="특수문자, 문자, 숫자 포함 8~15자"
          type="password"
          name="password"
          value={password}
          onChange={onChange}
        />
      </FieldContainer>
      <FieldContainer>
        <Label>
          비밀번호 확인
          {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword}</ErrorMessage>}
        </Label>
        <Input
          placeholder="특수문자, 문자, 숫자 포함 8~15자"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={onChange}
        />
      </FieldContainer>
      <FieldContainer>
        <Label>
          전화번호
          {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
        </Label>
        <Input placeholder="01011112222" type="text" name="phone" value={autoHyphen(phone)} onChange={onChange} />
      </FieldContainer>
      <CheckboxContainer>
        <Checkbox type="checkbox" checked={allowNotifications} onChange={handleAllowNotificationsChange} />
        <Label>알림 설정</Label>
      </CheckboxContainer>
      <SignupButton onClick={handleSignup} disabled={!checkEveryInput()}>
        가입하기
      </SignupButton>
    </FormContainer>
  );
};

export default SignupForm;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
`;

const Label = styled.label`
  font-size: var(--font-small);
  padding-left: 8px;
  margin: 8px 0;
  display: flex;
  justify-content: space-between;
`;

const Input = styled.input`
  width: 270px;
  height: 30px;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid var(--color-sub);
  border-radius: var(--border-radius-input);
  font-size: var(--font-small);
  color: var(--color-black);
  :focus {
    border: 2px solid var(--color-main);
    outline: none;
  }

  ::placeholder {
    color: var(--color-gray);
    font-size: var(--font-small);
  }
`;

const ErrorMessage = styled.span`
  font-size: var(--font-micro);
  color: var(--color-red);
  display: flex;
  align-items: center;
`;

const CheckboxContainer = styled.div`
  width: 270px;
  display: flex;
`;

const Checkbox = styled.input`
  font-size: var(--font-small);
  accent-color: var(--color-main);
`;

const SignupButton = styled.button`
  width: 270px;
  height: 40px;
  color: var(--color-white);
  background-color: var(--color-main);
  border-radius: var(--border-radius-button);
  margin: 10px 0;
  cursor: pointer;

  :disabled {
    background-color: var(--color-gray);
    cursor: default;
  }
`;
