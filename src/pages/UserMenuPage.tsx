import { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import MemberMenu from '../components/UserMenu/components/MemberMenu';
import NonMemberMenu from '../components/UserMenu/components/NonMemberMenu';

const UserMenuPage = () => {
  const [isMember, setIsMember] = useState(false);

  const getUserInfo = async () => {
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
        const data = await response.json();
        return data;
      } else {
        setIsMember(false);
        return null;
      }
    } catch (err: any) {
      const errorMessage = err as Error;
      console.log(errorMessage);
      return null;
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return <Container>{isMember ? <MemberMenu /> : <NonMemberMenu />}</Container>;
};

export default UserMenuPage;

const Container = styled.div`
  height: calc(100vh - 200px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
