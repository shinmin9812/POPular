import { API_PATH } from '../constants/path';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Post } from '../types/post';
import { UnPopulatedPost } from '../components/StoreDetail/components/ReviewPost';

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
  const response = await (await fetch(`${API_PATH.POST.GET.REVIEW_BY_STORE.replace(':storeId', storeId)}`)).json();
  return response;
};

export const getAllGatherFeeds = async () => {
  const response = await (await fetch(API_PATH.POST.GET.ALL_GATHER_FEEDS)).json();
  return response;
};

export const getUserFeeds = async (userId: string) => {
  const response = await (await fetch(API_PATH.POST.GET.BY_USER.replace(':userId', userId))).json();
  return response;
};

export const deleteFeeds = async (feedIds: string[]): Promise<void> => {
  try {
    await fetch(API_PATH.POST.DELETE, {
      headers: { 'Content-Type': 'application/json', authorization: `Bearer ${localStorage.getItem('token')}` },
      method: 'DELETE',
      body: JSON.stringify({
        ids: feedIds,
      }),
    });
  } catch (err) {
    throw new Error('피드 삭제를 실패하였습니다!');
  }
};

export const useGetAllFeeds = (option?: object) => {
  return useQuery<Post[]>(['allFeeds'], () => getAllFeeds(), option);
};

export const useGetStoreReviewFeeds = (storeId: string, option?: object) => {
  return useQuery<UnPopulatedPost[]>(['storeReviewFeeds', storeId], () => getStoreReviewFeeds(storeId), option);
};

export const useGetAllReviewFeeds = (option?: object) => {
  return useQuery<Post[]>(['reviewFeeds'], () => getAllReviewFeeds(), option);
};

export const useGetFeeds = (postCategory = '') => {
  return useQuery<Post[]>(['getPosts', postCategory], () => fetchData(postCategory));
};

export const useGetFeedsByUserId = (userId: string, option?: object) => {
  return useQuery<{ totalDocs: number }>(['feeds', userId], () => getUserFeeds(userId), option);
};

export const useDeleteFeeds = (feedIds: string[], option?: object) => {
  return useMutation(() => deleteFeeds(feedIds), option);
};
