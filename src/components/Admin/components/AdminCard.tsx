import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  height: 100px;

  padding: 20px;
  margin-bottom: 20px;

  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  box-shadow: 0px 0px 22px -6px rgba(0, 0, 0, 0.8);

  img {
    height: 100%;
    aspect-ratio: 1/1;

    border-radius: 50%;
    background-color: #fff;
    margin-right: 10px;

    object-fit: cover;
  }

  .admin-info {
    color: #fff;

    p {
      margin-bottom: 6px;
      font-size: 12px;
    }

    strong {
      font-size: 20px;
    }
  }
`;

const AdminCard = () => {
  return (
    <Container>
      <img src="https://t3.ftcdn.net/jpg/03/62/56/24/360_F_362562495_Gau0POzcwR8JCfQuikVUTqzMFTo78vkF.jpg" alt="" />
      <div className="admin-info">
        <p>관리자</p>
        <strong>홍길동</strong>
      </div>
    </Container>
  );
};

export default AdminCard;
