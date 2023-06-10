import UpdateAndDelete from '../components/UpdateAndDeleteButtons';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAppDispatch } from '../../../Hooks/useSelectorHooks';
import { WritePostSliceActions, isUpdate } from '../../WritePost/WritePostSlice';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import { Post } from '../../../types/post';

const UpdateAndDeleteContainer = () => {
  const navigate: NavigateFunction = useNavigate();

  const [isMember, setIsMember] = useState();
  const [postInfo, setPostInfo] = useState<Post>();
  useEffect(() => {
    getUserInfo();
    getPostInfo();
  }, []);

  const dispatch = useAppDispatch();
  const setTab = (tab: string) => dispatch(WritePostSliceActions.setTab(tab));
  const setPostContent = (content: string) => {
    return dispatch(WritePostSliceActions.setPostContent(content));
  };
  const setPostTitle = (title: string) => {
    return dispatch(WritePostSliceActions.setPostTitle(title));
  };
  const setChoiceStoreId = (id: string) => {
    return dispatch(WritePostSliceActions.setChoiceStoreId(id));
  };
  const setIsUpdate = (isUpdate: isUpdate) => {
    return dispatch(WritePostSliceActions.setIsUpdate(isUpdate));
  };

  const postId = useParams().postId;

  const getUserInfo = async () => {
    try {
      const response = await fetch('http://34.22.81.36:3000/auth/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      setIsMember(data._id);
    } catch (err: any) {
      throw new Error(err);
      return null;
    }
  };

  const getPostInfo = async () => {
    const response = await fetch(`http://34.22.81.36:3000/feeds/${postId}`);
    const result = await response.json();
    setPostInfo(result);
  };

  async function DeleteFetchData() {
    const response = await fetch(`http://34.22.81.36:3000/feeds/${postId}`, {
      method: 'DELETE',
    });
    const result = await response.json();
    alert(result.message);
    navigate('/community/board/all');
  }

  const deletePost = () => {
    if (postInfo && isMember === postInfo.author._id) {
      DeleteFetchData();
    } else {
      alert('작성자가 아닙니다');
    }
  };

  const updatePost = () => {
    if (postInfo && isMember === postInfo.author._id) {
      const currTab = postInfo.board === 'free' ? '자유게시판' : postInfo.board === 'review' ? '후기게시판' : 'gather';
      setTab(currTab);
      setPostContent(postInfo.content);
      setPostTitle(postInfo.title);
      postInfo.store_id && setChoiceStoreId(postInfo.store_id._id);
      setIsUpdate({ use: true, id: postInfo._id });
      navigate('/community/write');
    } else {
      alert('작성자가 아닙니다');
    }
  };
  return <UpdateAndDelete deletePost={deletePost} updatePost={updatePost}></UpdateAndDelete>;
};

export default UpdateAndDeleteContainer;
