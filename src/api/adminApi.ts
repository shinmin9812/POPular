import { useQueries } from '@tanstack/react-query';
import { getAllUsers } from './userApi';
import { getAllStores } from './storeApi';
import { getAllFeeds } from './feedApi';

export const useGetAllData = () => {
  return useQueries({
    queries: [
      { queryKey: ['allStores'], queryFn: getAllStores },
      { queryKey: ['allUsers'], queryFn: getAllUsers },
      { queryKey: ['allFeeds'], queryFn: getAllFeeds },
    ],
  });
};
