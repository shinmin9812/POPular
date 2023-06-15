import styled from 'styled-components';
import { Store } from '../../../types/store';

interface Props {
  storeData: Store;
  checked: boolean;
}

const AdNotificationItem = ({ storeData, checked }: Props) => {
  return <ItemContainer checked={checked}>{storeData.title} 오픈!</ItemContainer>;
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
  flex-direction: column;
  justify-content: center;
`;
