import { useMutation, useQuery } from '@tanstack/react-query';
import { User } from '../types/user';
import { API_PATH } from '../constants/path';

export const getAllUsers = async () => {
  const response = await (await fetch(API_PATH.USER.GET.ALL)).json();
  return response;
};

export const getUserById = async (userId: string) => {
  const response = await (await fetch(`${API_PATH.USER.GET.BY_ID.replace(':userId', userId)}`)).json();
  return response;
};

export const deleteUsers = async (userIds: string[]): Promise<void> => {
  try {
    await fetch(API_PATH.STORE.DELETE, {
      headers: { 'Content-Type': 'application/json' },
      method: 'DELETE',
      body: JSON.stringify(userIds),
    });
  } catch (err) {
    throw new Error('유저 삭제를 실패하였습니다!');
  }
};

export const getLoginUser = async () => {
  try {
    const response = await fetch('http://34.22.81.36:3000/auth/profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.json();
  } catch (err) {
    return;
  }
};

export const useGetAllUsers = () => {
  return useQuery<User[]>(['allUsers'], getAllUsers);
};

export const useGetUserById = (userId: string, option?: object) => {
  return useQuery<User>(['user', userId], () => getUserById(userId), option);
};

export const useGetLoginuser = (options?: object) => {
  return useQuery<User>(['user'], getLoginUser, options);
};

export const useDeleteUsers = (userIds: string[], option?: object) => {
  return useMutation(() => deleteUsers(userIds), option);
};
