import { useState, ChangeEvent } from 'react';
import styled, { css } from 'styled-components';
import FormInput from './FormInput';
import ProfileButton from './ProfileButton';
import CheckboxInput from './CheckboxInput';
import { User } from '../../../types/user';
import autoHyphen from '../../../utils/autoHyphen';

interface Props {
  user: User;
}

interface Category {
  value: string;
  name: string;
}

const preferCategory: Category[] = [
  { value: '의류', name: 'cloth' },
  { value: '주류', name: 'alcohol' },
  { value: '캐릭터', name: 'character' },
];

const ProfileUpdateForm = ({ user }: Props) => {
  const [inputs, setInputs] = useState({
    introduce: user.introduce,
    nickname: user.nickname,
    phone_number: user.phone_number,
    notifications: user.notifications,
    notice: user.allow_notification,
  });

  const { introduce, nickname, phone_number, notifications, notice } = inputs;
  const [checkNickname, setCheckNickname] = useState(false);
  const [errors, setErrors] = useState({
    nickname: '',
    phone_number: '',
  });

  // 닉네임 중복 체크
  const checkingNickname = async (nickname: string) => {
    try {
      const response = await fetch('http://34.22.81.36:3000/users/checknickname', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nickname: nickname,
        }),
      });
      const data = await response.json();
      setCheckNickname(!data.isExists);
    } catch (err: any) {
      const errorMessage = (err as Error).message;
      console.log(errorMessage);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = e.target;
    switch (name) {
      case 'notice':
        setInputs({
          ...inputs,
          notice: (e.target as HTMLInputElement).checked,
        });
        break;
      case 'notifications':
        let newNotifications: any;
        if ((e.target as HTMLInputElement).checked) {
          newNotifications = [...inputs.notifications, value];
        } else {
          newNotifications = inputs.notifications.filter((item) => item !== (value as any));
        }
        setInputs({
          ...inputs,
          notifications: newNotifications,
        });
        break;
      case 'nickname':
        setInputs({
          ...inputs,
          [name]: value,
        });
        validateName(value);
        checkingNickname(value);
        break;
      case 'phone_number':
        setInputs({
          ...inputs,
          [name]: value,
        });
        validatePhone(value);
        break;
      default:
        setInputs({
          ...inputs,
          [name]: value,
        });
        break;
    }
  };

  // 닉네임 유효성 검사
  const validateName = (value: string) => {
    let error = '';
    if (value.trim().length < 2 && value.length > 0) {
      error = '2글자 이상 입력하세요.';
    }
    setErrors((prevState) => ({ ...prevState, nickname: error }));
  };

  // 전화번호 유효성 검사
  const validatePhone = (value: string) => {
    const isPhoneValid = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/;
    let error = '';
    if (!isPhoneValid.test(value) && value.length > 0) {
      error = '전화번호 형식이 올바르지 않습니다.';
    }
    setErrors((prevState) => ({ ...prevState, phone_number: error }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userId = '';
    fetch(`http://34.22.81.36:3000/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <Container>
      <FormContainer onSubmit={handleSubmit}>
        <p className="update-title">회원정보</p>
        <p className="update-description">회원정보를 변경할 수 있습니다.</p>
        <FormInner>
          <FormInput type={'introduce'} height value={introduce} onChange={handleChange} />
          <FormInput type={'nickname'} value={nickname} onChange={handleChange} />
          {!checkNickname && nickname.trim().length > 0 && (
            <NicknameMessage color={'red'}>중복된 닉네임입니다.</NicknameMessage>
          )}
          {errors.nickname && nickname.trim().length !== 0 && <ErrorNotice>{errors.nickname}</ErrorNotice>}

          <FormInput type={'phone_number'} value={autoHyphen(phone_number)} onChange={handleChange} />
          {errors.phone_number && <ErrorNotice>{errors.phone_number}</ErrorNotice>}
          <CheckboxInput
            type={'notifications'}
            value={notifications as any}
            defaultData={preferCategory}
            onChange={handleChange}
          />
          <CheckboxInput type={'notice'} value={notice} onChange={handleChange} />
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

const NicknameMessage = styled.div`
  text-align: right;
  font-size: var(--font-micro);
  color: ${(props) =>
    props.color === 'red' &&
    css`
      red;
    `};
`;

const ErrorNotice = styled.div`
  text-align: right;
  font-size: var(--font-micro);
`;
const FormButton = styled.div`
  margin-top: 30px;

  .button {
    width: 100%;
    padding: 10px 20px;
  }
`;

export default ProfileUpdateForm;
