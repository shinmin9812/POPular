import { Store } from '../../../../types/store';
import styled from 'styled-components';
import AdminStoreItem from './AdminStoreItem';

interface Props {
  stores: Store[];
}

const AdminStoreList = ({ stores }: Props) => {
  return (
    <Container>
      {stores.map((store) => (
        <li key={store._id}>
          <AdminStoreItem store={store} />
        </li>
      ))}
    </Container>
  );
};

const Container = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export default AdminStoreList;
