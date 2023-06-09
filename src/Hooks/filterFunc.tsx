import { Store } from '../types/store';

const filterFunc = (
  arr: Store[],
  address: {
    value: string;
    use: boolean;
  },
  category: {
    value: string;
    use: boolean;
  },
  targetStartDate: string,
  targetEndDate: string,
  DateFilterUse: boolean,
  choiceStoreId?: string,
) => {
  if (choiceStoreId && choiceStoreId.length > 0) {
    return arr.filter((store) => store._id === choiceStoreId);
  }
  return arr.filter(
    (store) =>
      (address.use ? store.postcode.sido === address.value : store) &&
      (category.use ? store.category === category.value : store) &&
      (DateFilterUse
        ? new Date(store.start_date) <= new Date(targetEndDate) && new Date(targetStartDate) <= new Date(store.end_date)
        : store),
  );
};

export default filterFunc;
