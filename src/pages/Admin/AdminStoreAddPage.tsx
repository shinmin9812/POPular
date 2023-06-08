import styled from 'styled-components';
import Card from '../../components/common/Card/Card';
import StoreForm from '../../components/Admin/StoreForm';

const Container = styled.div`
  .add-store {
    width: 600px;
    .title {
      margin-bottom: 20px;

      font-size: 24px;
      font-weight: 700;
    }
  }
`;

const AdminStoreAddPage = () => {
  return (
    <Container>
      <Card className="add-store">
        <p className="title">스토어 추가</p>
        <StoreForm />
      </Card>
    </Container>
  );
};

export default AdminStoreAddPage;
