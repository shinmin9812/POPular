import { useQuery } from '@tanstack/react-query';
import { User } from '../types/user';

export const getLoginUser = async () => {
  const response = await fetch('http://34.22.81.36:3000/auth/profile', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.json();
};

export const useGetLoginuser = () => {
  return useQuery<User>(['user'], getLoginUser);
};
