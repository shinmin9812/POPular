import { API_PATH } from '../constants/path';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Post } from '../types/post';

export const getAllReviewFeeds = async () => {
  const response = await (await fetch(API_PATH.POST.GET.ALL_REVIEW_FEEDS)).json();
  return response;
};

export const useGetAllReviewFeeds = (option?: object) => {
  return useQuery<Post[]>(['reviewFeeds'], () => getAllReviewFeeds(), option);
};
