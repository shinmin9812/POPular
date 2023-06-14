import { useQuery } from '@tanstack/react-query';
import { API_PATH } from '../constants/path';
import { User } from '../types/user';

export const getToken = async ({ email, pw }: { email: string; pw: string }) => {
  const response = await (
    await fetch('http://34.22.81.36:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        pw,
      }),
    })
  ).json();
  return response;
};

export const getTokenValid = async () => {
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

export const useGetToken = ({ email, pw }: { email: string; pw: string }, option?: object) => {
  return useQuery<string>(['token'], () => getToken({ email, pw }), option);
};

export const useGetTokenValid = () => {
  return useQuery<User>(['user'], getTokenValid, {
    retry: 0,
    cacheTime: 0,
  });
};
