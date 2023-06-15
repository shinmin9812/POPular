import { Store } from '../types/store';
const searchFilter = (stores: Store[], value: string) => {
  const newStores = stores.filter((item) => item.title.toLowerCase().includes(value.toLowerCase()));
  return newStores;
};

export default searchFilter;
