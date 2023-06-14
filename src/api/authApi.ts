import { useQuery } from '@tanstack/react-query';
import { API_PATH } from '../constants/path';
import { User } from '../types/user';

export const getValidToken = async () => {
  try {
    const response = await (
      await fetch(API_PATH.AUTH.GET.PROFILE, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
    ).json();
    return response;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const useGetValidToken = () => {
  return useQuery<User>(['user'], getValidToken, {
    retry: 0,
    cacheTime: 0,
  });
};
