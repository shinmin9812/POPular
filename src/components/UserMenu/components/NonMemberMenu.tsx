import styled from 'styled-components';
import { CLIENT_PATH } from '../../../constants/path';
import LoginLink from './LoginLink';
import MenuItem from './MenuItem';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Modal from '../../common/Modal/Modal';
import AlertModal from '../../common/Modals/AlertModal';

const NonMemberMenu = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <LoginLink />
      <MenuList>
        <MenuItem link={CLIENT_PATH.USER_RECENT} title="최근 본 스토어" />
        <div onClick={handleClick}>위시리스트</div>
        <div onClick={handleClick}>내가 쓴 글</div>
        <div onClick={handleClick}>내가 쓴 댓글</div>
        <Link className="signup" to={CLIENT_PATH.SIGNUP}>
          회원가입
        </Link>
      </MenuList>
      {isModalOpen && (
        <Modal>
          <AlertModal onClose={setIsModalOpen} content="로그인을 해주세요!"></AlertModal>
        </Modal>
      )}
    </>
  );
};

export default NonMemberMenu;

const MenuList = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  a,
  div {
    display: flex;
    align-items: center;
    width: 300px;
    height: 65px;
    font-size: var(--font-medium);
    border-bottom: 0.5px solid var(--color-gray);
    padding-left: 90px;
    margin: 0;
    cursor: pointer;

    :hover {
      transition: all 0.1s ease;
      color: var(--color-main);
      font-size: calc(var(--font-medium) + 2px);
    }
  }

  .signup {
    border-top: 1px solid gray;
  }

  @media screen and (max-width: 768px) {
    a,
    div,
    .signup {
      height: 55px;
      font-size: var(--font-regular);
      :hover {
        transition: all 0.1s ease;
        color: var(--color-main);
        font-size: calc(var(--font-regular) + 2px);
      }
    }
  }
`;
