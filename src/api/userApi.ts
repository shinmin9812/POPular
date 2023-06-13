import { useQuery } from '@tanstack/react-query';
import { User } from '../types/user';
import { API_PATH } from '../constants/path';

export const getAllUsers = async () => {
  const response = await (await fetch(API_PATH.USER.GET.ALL)).json();
  return response;
};

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

export const useGetAllUsers = () => {
  return useQuery<User[]>(['allUsers'], getAllUsers);
};

export const useGetLoginuser = () => {
  return useQuery<User>(['user'], getLoginUser, {
    onError: (error) => {
      console.log('로그인 정보를 가져오는 동안 오류가 발생했습니다:', error);
    },
  });
};
