import { useState, ChangeEvent } from 'react';
import styled, { css } from 'styled-components';
import FormInput from './FormInput';
import ProfileButton from './ProfileButton';
import CheckboxInput from './CheckboxInput';
import { User } from '../../../types/user';
import { useParams } from 'react-router-dom';
import { isEqual } from '../../../utils/correctArrayCheck';
import { API_PATH } from '../../../constants/path';
import autoHyphen from '../../../utils/autoHyphen';

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
  const { userId } = useParams();
  const token = localStorage.getItem('token');
  const [inputs, setInputs] = useState({
    introduce: user.introduce,
    nickname: '',
    phone_number: '',
    interested_category: user.interested_category,
    allow_notification: user.allow_notification,
  });

  const { introduce, nickname, phone_number, interested_category, allow_notification } = inputs;
  const [checkNickname, setCheckNickname] = useState(true);

  // 닉네임, 전화번호 유효성 검사
  const [isNickname, setIsNickname] = useState<boolean>(true);
  const [isPhoneNumber, setIsPhoneNumber] = useState<boolean>(true);

  const [errors, setErrors] = useState({
    nickname: '',
    phone_number: '',
  });

  // 닉네임 중복 체크
  const checkingNickname = async (nickname: string) => {
    try {
      const response = await fetch(API_PATH.USER.POST.CHECK_NICKNAME, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nickname: nickname,
        }),
      });
      const data = await response.json();
      if (nickname.length >= 0) {
        setCheckNickname(!data.isExists);
      } else {
        setCheckNickname(false);
      }
    } catch (err: any) {
      throw new Error(err);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = e.target;
    let newCategory: any;
    switch (name) {
      case 'allow_notification':
        setInputs({
          ...inputs,
          allow_notification: (e.target as HTMLInputElement).checked,
        });
        break;
      case 'interested_category':
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
    if (value.trim().length === 1) {
      error = '2글자 이상 입력하세요.';
      setErrors((prevState) => ({ ...prevState, nickname: error }));
      setIsNickname(false);
    } else {
      setErrors((prevState) => ({ ...prevState, nickname: '' }));
      setIsNickname(true);
    }
  };

  // 전화번호 유효성 검사
  const validatePhone = (value: string) => {
    const isPhoneValid = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/;
    let error = '';
    if (!isPhoneValid.test(value) && value.length > 0) {
      error = '전화번호 형식이 올바르지 않습니다.';
      setErrors((prevState) => ({ ...prevState, phone_number: error }));
      setIsPhoneNumber(false);
    } else {
      setErrors((prevState) => ({ ...prevState, phone_number: '' }));
      setIsPhoneNumber(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      alert('회원정보를 변경해주세요.');
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
          introduce: introduce,
          nickname: nickname || user.nickname,
          phone_number: phone_number || user.phone_number,
          interested_category: interested_category,
          allow_notification: allow_notification,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert('회원정보 수정이 완료되었습니다.');
        setInputs({
          introduce: data.introduce,
          nickname: '',
          phone_number: '',
          interested_category: data.interested_category,
          allow_notification: data.allow_notification,
        });
      } else {
        throw new Error('회원정보 수정에 실패했습니다.');
      }
    } catch (error: any) {
      throw new Error(error);
    }
  };

  const isModify =
    introduce !== user.introduce ||
    nickname !== '' ||
    phone_number !== '' ||
    allow_notification !== user.allow_notification ||
    !isEqual(interested_category, user.interested_category);
  const isFormValid = isNickname && isPhoneNumber && checkNickname && isModify;

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
          {/* <input type="checkbox" onChange={handleChange}/> */}
          <CheckboxInput
            type={'allow_notification'}
            value={allow_notification}
            onChange={handleChange}
            btnName={'알림'}
          />
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
    font-size: var(--font-reguler);
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

const FormContainer = styled.form``;

const FormInner = styled.div`
  padding-top: 30px;
`;

const NicknameMessage = styled.div`
  text-align: right;
  font-size: var(--font-small);
  color: ${(props) =>
    props.color === 'red' &&
    css`
      red;
    `};
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

export default ProfileUpdateForm;
