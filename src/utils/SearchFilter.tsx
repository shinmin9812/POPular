import { Store } from '../types/store';
const searchFilter = (stores: Store[], value: string) => {
  const normalizedValue = value.normalize(); // 검색어 정규화
  const regex = new RegExp(normalizedValue, 'i');
  const newStores = stores.filter((store) => regex.test(store.title));
  return newStores;
};

export default searchFilter;
