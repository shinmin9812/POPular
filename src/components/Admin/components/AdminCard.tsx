import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../../store';
import { useGetLoginuser } from '../../../api/userApi';

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
  const { data } = useGetLoginuser();
  console.log(data);

  return (
    <Container>
      {data && (
        <>
          <img src={data.profile ? data.profile : '/defaultProfile.svg'} alt="admin-profile" />
          <div className="admin-info">
            <p>관리자</p>
            <strong>{data.nickname}</strong>
          </div>
        </>
      )}
    </Container>
  );
};

export default AdminCard;
