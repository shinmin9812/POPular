import { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import MemberMenu from '../components/UserMenu/components/MemberMenu';
import NonMemberMenu from '../components/UserMenu/components/NonMemberMenu';
import MetaTag from '../components/SEO/MetaTag';

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
      throw new Error(err);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getUserInfo();
    }
  }, []);

  return (
    <Container>
      <MetaTag title={`POPULAR | 마이페이지`} />
      {isMember ? <MemberMenu /> : <NonMemberMenu />}
    </Container>
  );
};

export default UserMenuPage;

const Container = styled.div`
  height: calc(100vh - 200px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
