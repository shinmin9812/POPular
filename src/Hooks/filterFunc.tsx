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
  duration: {
    show: boolean;
    use: boolean;
    StartDate: string;
    endDate: string;
  },
  choiceStoreId?: string,
) => {
  if (choiceStoreId && choiceStoreId.length > 0) {
    return arr.filter((store) => store._id === choiceStoreId);
  }
  return arr.filter(
    (store) =>
      (address.use ? store.postcode.sido === address.value : store) &&
      (category.use ? store.category === category.value : store) &&
      (duration.use
        ? new Date(store.start_date) <= new Date(duration.endDate) &&
          new Date(duration.StartDate) <= new Date(store.end_date)
        : store),
  );
};

export default filterFunc;
