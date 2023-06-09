import { Store } from '../../../../types/store';
import styled from 'styled-components';

interface Props {
  store: Store;
}

const AdminStoreItem = ({ store }: Props) => {
  console.log(store);
  return (
    <Container>
      <></>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100px;

  border: 1px solid #000;
`;

export default AdminStoreItem;
