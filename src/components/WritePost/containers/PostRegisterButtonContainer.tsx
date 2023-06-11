import PostRegisterButton from '../components/PostRegisterButton';
import { useAppSelector, useAppDispatch } from '../../../Hooks/useSelectorHooks';
import { WritePostSliceActions } from '../WritePostSlice';
import { useState, useEffect } from 'react';
import { useNavigate, NavigateFunction } from 'react-router-dom';

// 게시글 생성 스키마 확인
const PostRegisterButtonContainer = () => {
  const navigate: NavigateFunction = useNavigate();
  const tab = useAppSelector((state) => state.WritePostSlice.tab);
  const postTitle = useAppSelector((state) => state.WritePostSlice.postTitle);
  const postContent = useAppSelector((state) => state.WritePostSlice.postContent);
  const ratings = useAppSelector((state) => state.WritePostSlice.ratings);
  const choiceStoreId = useAppSelector((state) => state.WritePostSlice.choiceStoreId);
  const isUpdate = useAppSelector((state) => state.WritePostSlice.isUpdate);
  const dispatch = useAppDispatch();
  const setPostContent = (content: string) => {
    return dispatch(WritePostSliceActions.setPostContent(content));
  };
  const setPostTitle = (title: string) => {
    return dispatch(WritePostSliceActions.setPostTitle(title));
  };
  const setChoiceStoreId = (id: string) => {
    return dispatch(WritePostSliceActions.setChoiceStoreId(id));
  };
  const setIsUpdate = (isUpdate: { use: boolean; id: string }) => {
    return dispatch(WritePostSliceActions.setIsUpdate(isUpdate));
  };

  const [isMember, setIsMember] = useState();

  const currTab = tab === '자유게시판' ? 'free' : tab === '후기게시판' ? 'review' : 'gather';

  const register = async () => {
    const data = {
      title: postTitle,
      author: isMember,
      board: currTab,
      content: postContent,
      ...(currTab !== 'free' && { store_id: choiceStoreId }),
      ...(currTab === 'review' && { ratings: ratings }),
    };

    try {
      let response: Response;
      if (isUpdate.use) {
        response = await fetch(`http://34.22.81.36:3000/feeds/${isUpdate.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(data),
        });
      } else {
        response = await fetch('http://34.22.81.36:3000/feeds', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(data),
        });
      }
      if (response.ok) {
        setPostTitle('');
        setPostContent('');
        setChoiceStoreId('');
        setIsUpdate({ use: false, id: '' });
        navigate('/community/board/all');
      }
    } catch (err: any) {
      throw new Error(err);
    }
  };

  const getUserInfo = async () => {
    try {
      const response = await fetch('http://34.22.81.36:3000/auth/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setIsMember(data._id);
        return data;
      } else {
        return null;
      }
    } catch (err: any) {
      throw new Error(err);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <PostRegisterButton
      onClick={() => {
        register();
      }}
    >
      {isUpdate.use ? '수정하기' : '작성하기'}
    </PostRegisterButton>
  );
};

export default PostRegisterButtonContainer;
