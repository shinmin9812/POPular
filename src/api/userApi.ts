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
  return useQuery<User>(['user'], getLoginUser, {
    onError: (error) => {
      console.log('로그인 정보를 가져오는 동안 오류가 발생했습니다:', error);
    },
  });
};
