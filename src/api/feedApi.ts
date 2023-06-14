import { API_PATH } from '../constants/path';
import { useQuery } from '@tanstack/react-query';
import { Post } from '../types/post';

const fetchData = async (postCategory = '') => {
  try {
    let result;
    switch (postCategory) {
      case '':
        result = await getAllFeeds();
        break;
      case 'free':
        result = await getAllFreeFeeds();
        break;
      case 'gather':
        result = await getAllGatherFeeds();
        break;
      case 'review':
        result = await getAllReviewFeeds();
        break;
      default:
        result = [];
    }
    return result;
  } catch (err) {
    alert(err);
  }
};

export const getAllFeeds = async () => {
  const response = await (await fetch(API_PATH.POST.GET.ALL)).json();
  return response;
};

export const getAllFreeFeeds = async () => {
  const response = await (await fetch(API_PATH.POST.GET.ALL_FREE_FEEDS)).json();
  return response;
};

export const getAllReviewFeeds = async () => {
  const response = await (await fetch(API_PATH.POST.GET.ALL_REVIEW_FEEDS)).json();
  return response;
};

export const getStoreReviewFeeds = async (storeId: string) => {
  const response = await (await fetch(`${API_PATH.POST.GET.ALL_REVIEW_FEEDS}/${storeId}`)).json();
  return response;
};

export const getAllGatherFeeds = async () => {
  const response = await (await fetch(API_PATH.POST.GET.ALL_GATHER_FEEDS)).json();
  return response;
};

export const useGetStoreReviewFeeds = (storeId: string, option?: object) => {
  return useQuery<Post[]>(['storeReviewFeeds', storeId], () => getStoreReviewFeeds(storeId), option);
};

export const useGetAllReviewFeeds = (option?: object) => {
  return useQuery<Post[]>(['reviewFeeds'], () => getAllReviewFeeds(), option);
};

export const useGetFeeds = (postCategory = '') => {
  return useQuery<Post[]>(['getPosts', postCategory], () => fetchData(postCategory));
};
