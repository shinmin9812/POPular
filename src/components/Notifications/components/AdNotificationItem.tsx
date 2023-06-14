import styled from 'styled-components';
import { Store } from '../../../types/store';
import StoreIconMini from '../../common/Icons/StoreIconMini';

interface Props {
  storeData: Store;
  checked: boolean;
}

const AdNotificationItem = ({ storeData, checked }: Props) => {
  return (
    <ItemContainer checked={checked}>
      <StoreIconMini />
      <Message>{storeData.title} 오픈!</Message>
    </ItemContainer>
  );
};

export default AdNotificationItem;

const ItemContainer = styled.div`
  width: 95%;
  height: 80px;
  padding: 0 20px;
  margin: 8px auto;
  border: 1px solid var(--color-light-gray);
  transition: all 0.3s ease 0s;
  box-shadow: rgb(238, 238, 238) 1px 1px 10px;
  border-radius: 8px;

  display: flex;
  align-items: center;
  color: ${(props) => props.checked && 'var(--color-light-black)'};
  opacity: ${(props) => (props.checked ? 0.3 : 1)};
`;

const Message = styled.p`
  margin: 0 20px;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
