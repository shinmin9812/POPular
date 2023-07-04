import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Store } from '../../../types/store';
import StoreIconMini from '../../common/Icons/StoreIconMini';

interface Props {
  id: string;
  storeData: Store;
  checked: boolean;
}

const handleChecked = async (checked: boolean, id: string) => {
  if (!checked) {
    fetch(`http://34.22.81.36:3000/notifications/${id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        checked: true,
      }),
    });
  }
};

const RemoveNotification = async (id: string) => {
  fetch(`http://34.22.81.36:3000/notifications/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  location.reload();
};

const AdNotificationItem = ({ id, storeData, checked }: Props) => {
  return (
    <Container data={storeData} checked={checked}>
      {storeData ? (
        <>
          <Link to={`/store/${storeData._id}`} onClick={() => handleChecked(checked, id)}>
            <ItemContainer>
              <StoreIconMini />
              <Message>{storeData.title} 오픈!</Message>
            </ItemContainer>
          </Link>
          <RemoveButton onClick={() => RemoveNotification(id)}>×</RemoveButton>
        </>
      ) : (
        <ErrorItem>
          <p>삭제된 항목입니다.</p>
          <ErrorRemoveButton onClick={() => RemoveNotification(id)}>×</ErrorRemoveButton>
        </ErrorItem>
      )}
    </Container>
  );
};

export default AdNotificationItem;

const Container = styled.div<{ data: Store; checked: boolean }>`
  width: 95%;
  height: 80px;
  margin: 8px auto;
  border: 1px solid var(--color-light-gray);

  transition: all 0.3s ease 0s;
  box-shadow: rgb(238, 238, 238) 1px 1px 10px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  opacity: ${(props) => (!props.data || props.checked ? 0.3 : 1)};

  a {
    color: ${(props) => props.checked && 'var(--color-light-black)'};
    flex: 1;
    height: 100%;
    padding-left: 20px;
  }
`;

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const Message = styled.p`
  margin: 0 20px;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 200px;
  height: 20px;
`;

const RemoveButton = styled.span`
  color: var(--color-light-black);
  padding: 10px;
  margin-right: 10px;
  cursor: pointer;

  :hover {
    transition: all 0.1s ease;
    opacity: 1;
    color: var(--color-red);
    transform: scale(1.5);
  }
  transition: all 0.2s ease;
`;

const ErrorItem = styled.div`
  color: var(--color-light-black);
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 0 20px;
`;

const ErrorRemoveButton = styled.div`
  cursor: pointer;
  position: relative;
  left: 100;
  z-index: 1;
  :hover {
    transition: all 0.1s ease;
    opacity: 1;
    color: var(--color-red);
    transform: scale(1.5);
  }
  transition: all 0.1s ease;
`;
