import styled from 'styled-components';
import StoreForm from '../../components/Admin/components/Forms/StoreForm';
import { useState } from 'react';
import StoreInfo from '../../components/StoreDetail/container/StoreInfo';

const Container = styled.div``;

const AdminStoreAddPage = () => {
  const [previewData, setPreviewData] = useState();
  console.log(previewData);
  return (
    <Container>
      <StoreForm setPreviewData={setPreviewData} />
    </Container>
  );
};

export default AdminStoreAddPage;
