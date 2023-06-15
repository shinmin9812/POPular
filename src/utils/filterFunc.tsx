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
    startDate: string;
    endDate: string;
  },
  choiceStoreId?: string,
) => {
  if (choiceStoreId && choiceStoreId.length > 0) {
    return arr.filter((store) => store._id === choiceStoreId);
  }
  return arr.filter((store) => {
    // 지역필터링 했을 경우 비교, 사용하지 않을 경우 모두 통과
    const addressCondition = address.use ? store.postcode.sido === address.value : true;
    // 카테고리필터링 했을 경우 비교, 사용하지 않을 경우 모두 통과
    const categoryCondition = category.use ? store.category === category.value : true;
    // 기간필터링 했을 경우 비교, 사용하지 않을 경우 모두 통과
    const durationCondition = duration.use
      ? new Date(store.start_date) <= new Date(duration.endDate) &&
        new Date(duration.startDate) <= new Date(store.end_date)
      : true;

    return addressCondition && categoryCondition && durationCondition;
  });
};

export default filterFunc;
