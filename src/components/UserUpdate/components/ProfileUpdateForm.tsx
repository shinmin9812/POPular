import { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import FormInput from './FormInput';
import ProfileButton from './ProfileButton';
import CheckboxInput from './CheckboxInput';

interface InputState {
  info: string;
  nickname: string;
  number: number;
  brand: string[];
  notice: boolean;
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

const ProfileUpdateForm = () => {
  const [inputs, setInputs] = useState<InputState>({
    info: '안녕하세요',
    nickname: '안녕',
    number: 32,
    brand: ['의류', '주류'],
    notice: true,
  });

  const { info, nickname, number, brand, notice } = inputs;

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name, type } = e.target;
    if (type === 'checkbox') {
      if (name === 'notice') {
        setInputs({
          ...inputs,
          notice: (e.target as HTMLInputElement).checked,
        });
      } else {
        let newBrand: string[];
        if ((e.target as HTMLInputElement).checked) {
          newBrand = [...brand, value];
        } else {
          newBrand = brand.filter((item) => item !== value);
        }
        setInputs({
          ...inputs,
          brand: newBrand,
        });
      }
    } else {
      setInputs({
        ...inputs,
        [name]: value,
      });
    }
  };

  return (
    <Container>
      <FormContainer>
        <p className="update-title">회원정보</p>
        <p className="update-description">회원정보를 변경할 수 있습니다.</p>
        <FormInner>
          <FormInput type={'info'} height value={info} onChange={handleChange} />
          <FormInput type={'nickname'} value={nickname} onChange={handleChange} />
          <FormInput type={'number'} value={number} onChange={handleChange} />
          <div>
            <CheckboxInput type={'brand'} value={brand} defaultData={preferCategory} onChange={handleChange} />
          </div>
          <CheckboxInput type={'notice'} value={notice} onChange={handleChange} />
        </FormInner>
        <FormButton>
          <ProfileButton className="button" text={'수정하기'} type={'submit'} />
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

export default ProfileUpdateForm;
