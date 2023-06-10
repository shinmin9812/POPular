import styled from 'styled-components';
import StoreForm from '../../components/Admin/components/Forms/StoreForm';
import { useState } from 'react';

const Container = styled.div``;

const AdminStoreAddPage = () => {
  const [, setPreviewData] = useState();
  return (
    <Container>
      <StoreForm setPreviewData={setPreviewData} />
    </Container>
  );
};

export default AdminStoreAddPage;
