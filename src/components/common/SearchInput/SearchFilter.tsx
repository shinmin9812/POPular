import StoreList from '../Store/StoreList';
import { useState, useEffect } from 'react';
import { Store } from '../../../types/store';

type Props = {
  stores: Store[];
  value: string;
};

const SearchFilter = ({ stores, value }: Props) => {
  const [filteredStores, setFilteredStores] = useState<Store[]>(stores);

  useEffect(() => {
    const newStores = stores.filter((item) => item.title.toLowerCase().includes(value.toLowerCase()));
    setFilteredStores(newStores);
  }, [stores, value]);

  return <StoreList stores={filteredStores} />;
};

export default SearchFilter;
