import styled from 'styled-components';
import FormInput from './FormInput';
import ProfileButton from './ProfileButton';

const ProfileUpdateForm = () => {
  return (
    <Container>
      <FormInner>
        <FormInput type={'info'} height />
        <FormInput type={'nickname'} />
        <FormInput type={'password'} />
        <FormInput type={'passwordcheck'} />
        <FormInput type={'number'} />
      </FormInner>
      <FormButton>
        <ProfileButton className="button-gap" text={'수정하기'} type={'submit'} />
        <ProfileButton className="button-gap" text={'취소하기'} type={'cancel'} />
      </FormButton>
    </Container>
  );
};

const Container = styled.div`
  width: 70%;
  margin: 0 auto;
  transition: all 0.3s;

  @media all and (max-width: 767px) {
    width: 100%;
    margin: 0 auto;
  }
`;

const FormInner = styled.div`
  padding-top: 20px;
`;
const FormButton = styled.div`
  margin-top: 30px;
  display: flex;
  gap: 5px;

  .button-gap {
    width: 50%;
    padding: 10px 20px;
  }
`;

export default ProfileUpdateForm;
