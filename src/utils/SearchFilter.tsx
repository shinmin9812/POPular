import { Store } from '../types/store';
const searchFilter = (stores: Store[], value: string) => {
  const newStores = stores.filter((store) => store.title.includes(value));
  return newStores;
};

export default searchFilter;
