import styled from 'styled-components';
import LoginLink from './LoginLink';
import MenuItem from './MenuItem';

const NonMemberMenu = () => {
  return (
    <>
      <LoginLink />
      <MenuContainer>
        <MenuItem link="/user/123123" title="최근 본 스토어" />
      </MenuContainer>
    </>
  );
};

export default NonMemberMenu;

const MenuContainer = styled.div`
  width: 300px;
  margin: 40px 20px;
`;
