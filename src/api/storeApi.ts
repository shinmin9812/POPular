import { API_PATH } from '../constants/path';
import { useQuery } from '@tanstack/react-query';
import { Store } from '../types/store';

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

export const useGetAllStores = () => {
  return useQuery<Store[]>(['allStores'], getAllStores);
};
