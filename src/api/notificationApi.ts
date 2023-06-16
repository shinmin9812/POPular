import { useMutation } from '@tanstack/react-query';
import { API_PATH } from '../constants/path';
import { NotificationType } from '../types/notification';

export const postOpenNotificationAllUser = async (storeId: string): Promise<void> => {
  try {
    const request = await fetch(API_PATH.NOTIFICATION.POST.OPEN_ALL_USER, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({
        type: NotificationType.Ad,
        content_store: storeId,
      }),
    });
    const result = await request.json();
    return result;
  } catch (err) {
    throw new Error('스토어 등록에 실패하였습니다!');
  }
};

export const usePostOpenNotificationAllUser = (storeId: string, option?: object) => {
  return useMutation(() => postOpenNotificationAllUser(storeId), option);
};
