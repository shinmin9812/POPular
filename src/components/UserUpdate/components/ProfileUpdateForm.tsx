import { useState, ChangeEvent } from 'react';
import styled, { css } from 'styled-components';
import FormInput from './FormInput';
import ProfileButton from './ProfileButton';
import CheckboxInput from './CheckboxInput';
import { User } from '../../../types/user';
import autoHyphen from '../../../utils/autoHyphen';
import { useParams } from 'react-router-dom';

interface Props {
  user: User;
}

interface CategoryType {
  value: string;
  name: string;
}

// 카테고리 목록 가져오기
const preferCategory: CategoryType[] = [
  { value: '식품', name: 'food' },
  { value: '캐릭터', name: 'character' },
  { value: '의류', name: 'clothes' },
  { value: '주류', name: 'drink' },
  { value: '연예', name: 'entertainment' },
  { value: '디자인', name: 'design' },
  { value: '전자기기', name: 'tech' },
  { value: '스포츠', name: 'sport' },
  { value: '금융', name: 'finance' },
  { value: '예술', name: 'art' },
  { value: '기타', name: 'other' },
];

const ProfileUpdateForm = ({ user }: Props) => {
  const [inputs, setInputs] = useState({
    profile: user.profile,
    pw: user.pw,
    introduce: user.introduce,
    nickname: user.nickname,
    phone_number: user.phone_number,
    interested_category: user.interested_category,
    allow_notification: user.allow_notification,
  });

  const { introduce, nickname, phone_number, interested_category, allow_notification } = inputs;
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
      case 'allow_notification':
        setInputs({
          ...inputs,
          allow_notification: (e.target as HTMLInputElement).checked,
        });
        break;
      case 'interested_category':
        let newCategory: any;
        if ((e.target as HTMLInputElement).checked) {
          newCategory = [...inputs.interested_category, value];
        } else {
          newCategory = inputs.interested_category.filter((item) => item !== (value as any));
        }
        setInputs({
          ...inputs,
          interested_category: newCategory,
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
    const { userId } = useParams();
    const token = localStorage.getItem('token');

    fetch(`http://34.22.81.36:3000/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(inputs),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert('회원정보 수정이 완료되었습니다.');
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
            type={'interested_category'}
            value={interested_category as any}
            defaultData={preferCategory}
            onChange={handleChange}
          />
          <CheckboxInput
            type={'allow_notification'}
            value={allow_notification}
            onChange={handleChange}
            btnName={'알림'}
          />
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
