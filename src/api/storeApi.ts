import { API_PATH } from '../constants/path';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Store, PostedStore } from '../types/store';

interface CoordProps {
  x: number;
  y: number;
  distance: number;
}

export const getAllStores = async () => {
  const response = await (await fetch(API_PATH.STORE.GET.ALL)).json();
  return response;
};

export const getStoreByCoord = async ({ x, y, distance }: CoordProps) => {
  const response = await (await fetch(`${API_PATH.STORE.GET.BY_COORD}x=${x}&y=${y}&distance=${distance}`)).json();
  return response;
};

export const postStore = async (storeData: PostedStore): Promise<Store> => {
  try {
    const request = await fetch(API_PATH.STORE.POST, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(storeData),
    });
    const result = await request.json();
    return result;
  } catch (err) {
    throw new Error('포스트 전송에 실패하였습니다!');
  }
};

export const useGetAllStores = () => {
  return useQuery<Store[]>(['allStores'], getAllStores);
};

export const usePostStore = () => {
  return useMutation(postStore);
};
