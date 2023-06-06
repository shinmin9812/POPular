import { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import MemberMenu from '../components/UserMenu/components/MemberMenu';
import NonMemberMenu from '../components/UserMenu/components/NonMemberMenu';

const UserMenuPage = () => {
  const [isMember, setIsMember] = useState(false);

  const checkUser = async () => {
    try {
      const response = await fetch('http://34.22.81.36:3000/auth/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.ok) {
        setIsMember(true);
      } else setIsMember(false);
    } catch (err: any) {
      const errorMessage = err as Error;
      console.log(errorMessage);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return <Container>{isMember ? <MemberMenu /> : <NonMemberMenu />}</Container>;
};

export default UserMenuPage;

const Container = styled.div`
  width: 350px;
  margin: 0 auto;
`;
