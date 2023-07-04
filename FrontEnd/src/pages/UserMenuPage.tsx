import styled from 'styled-components';
import MemberMenu from '../components/UserMenu/components/MemberMenu';
import NonMemberMenu from '../components/UserMenu/components/NonMemberMenu';
import MetaTag from '../components/SEO/MetaTag';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const UserMenuPage = () => {
  const userData = useSelector((state: RootState) => state.UserSlice.user);

  return (
    <Container>
      <MetaTag title={`POPULAR | 마이페이지`} />
      {userData ? <MemberMenu /> : <NonMemberMenu />}
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
