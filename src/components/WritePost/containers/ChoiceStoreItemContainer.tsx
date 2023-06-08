import ChoiceStoreItem from '../components/ChoiceStoreItem';
import { useState } from 'react';

const ChoiceStoreItemContainer = ({
  children,
  setChoiceStoreId,
  storeId,
}: {
  children: JSX.Element;
  setChoiceStoreId: (id: string) => void;
  storeId: string;
}) => {
  const [choice, setChoice] = useState(false);

  return (
    <ChoiceStoreItem
      choice={choice}
      onClick={() => {
        setChoice((prev) => !prev);
        if (!choice) {
          setChoiceStoreId(storeId);
        } else {
          setChoiceStoreId('');
        }
      }}
    >
      {children}
    </ChoiceStoreItem>
  );
};

export default ChoiceStoreItemContainer;
