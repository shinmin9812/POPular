// import UserProfile from '../components/UserMenu/components/UserProfile';
import { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import MemberMenu from '../components/UserMenu/components/MemberMenu';
import NonMemberMenu from '../components/UserMenu/components/NonMemberMenu';
import { API_PATH } from '../constants/path';

const UserMenuPage = () => {
  const [isMember, setIsMember] = useState(false);

  useEffect(() => {
    fetch(API_PATH.USER.GET.ALL)
      .then((res) => res.json())
      .then((data) => data && setIsMember(true));
  }, []);

  return <Container>{isMember ? <MemberMenu /> : <NonMemberMenu />}</Container>;
};

export default UserMenuPage;

const Container = styled.div`
  width: 350px;
  margin: 0 auto;
`;
