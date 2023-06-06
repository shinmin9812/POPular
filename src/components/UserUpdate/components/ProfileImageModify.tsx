import { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import ProfileUploadButton from './ProfileUploadButton';
import ProfileButton from './ProfileButton';
import { User } from '../../../types/user';

interface Props {
  user: User;
}

const ProfileImageModify = ({ user }: Props) => {
  const [userProfile, setUserProfile] = useState(user.profile);
  const fileHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUserProfile(e.target.value);
  };

  const fileDelete = () => {
    const delConfirm = confirm('프로필 이미지를 기본으로 변경하시겠습니까?');
    if (delConfirm) {
      setUserProfile('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    if (userProfile) {
      formData.append('introduce', user.introduce);
      formData.append('nickname', user.nickname);
      formData.append('pw', user.pw);
      formData.append('phone_number', user.phone_number);
      formData.append('profile', userProfile);
    }
    fetch('API_PATH.USER', {
      method: 'PATCH',
      headers: { 'Content-Type': 'multipart/form-data' },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        alert('프로필 업로드가 완료되었습니다.');
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <Container>
      <FormContainer onSubmit={handleSubmit}>
        <h2 className="update-title">프로필 이미지</h2>
        <p className="update-description">프로필 이미지를 변경할 수 있습니다.</p>
        <ProfileContents>
          <ProfilImage>
            <div className="profile-frame">
              <img src={userProfile} alt={user.nickname} />
            </div>
          </ProfilImage>
          <ProfileButtonList>
            <ProfileUploadButton text={'프로필 선택'} name={'profile'} onChange={fileHandler} />
            <ProfileButton className="button-gap" text={'변경'} theme={'submit'} />
            <ProfileButton className="button-gap" text={'제거'} theme={'blank'} onClick={fileDelete} />
          </ProfileButtonList>
        </ProfileContents>
      </FormContainer>
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

  .update-title {
    font-size: var(--font-small);
    font-weight: var(--weight-semi-bold);
  }
  .update-description {
    font-size: var(--font-micro);
    color: var(--color-light-black);
    margin-top: 7px;
  }
`;

const FormContainer = styled.form``;

const ProfileContents = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;
const ProfilImage = styled.div`
  .profile-frame {
    width: 60px;
    height: 60px;
    background-color: #999;
    border-radius: 50%;
    overflow: hidden;

    img {
      width: 100%;
      display: flex;
    }
  }
`;
const ProfileButtonList = styled.div`
  .button-gap {
    margin-left: 3px;
  }
`;

export default ProfileImageModify;
