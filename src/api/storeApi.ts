import { API_PATH } from '../constants/path';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Store, PostedStore } from '../types/store';
import { Post } from '../types/post';

interface CoordProps {
  x: number;
  y: number;
  distance: number;
}

export const getAllStores = async () => {
  const response = await (await fetch(API_PATH.STORE.GET.ALL)).json();
  return response;
};

export const getStoreById = async (storeId: string) => {
  const response = await (await fetch(`${API_PATH.STORE.GET.BY_ID.replace(':storeId', storeId)}`)).json();
  return response;
};

export const getStoreByCoord = async ({ x, y, distance }: CoordProps) => {
  const response = await (await fetch(`${API_PATH.STORE.GET.BY_COORD}x=${x}&y=${y}&distance=${distance}`)).json();
  return response;
};

export const getAllReviewFeeds = async () => {
  const response = await (await fetch(API_PATH.POST.GET.ALL_REVIEW_FEEDS)).json();
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

export const editPost = async ({ storeData, storeId }: { storeData: PostedStore; storeId: string }): Promise<Store> => {
  try {
    const request = await fetch(API_PATH.STORE.PUT.replace(':storeId', storeId), {
      headers: { 'Content-Type': 'application/json' },
      method: 'PUT',
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

export const useGetStoreById = (storeId: string, option?: object) => {
  return useQuery<Store>(['store', storeId], () => getStoreById(storeId), option);
};

export const useGetAllReviewFeeds = (option?: object) => {
  return useQuery<Post[]>(['reviewFeeds'], () => getAllReviewFeeds(), option);
};

export const usePostStore = () => {
  return useMutation(postStore);
};

export const useEditStore = () => {
  return useMutation(editPost);
};
