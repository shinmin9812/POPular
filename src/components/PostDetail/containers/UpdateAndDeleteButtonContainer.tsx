import UpdateAndDelete from '../components/UpdateAndDeleteButtons';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../Hooks/useSelectorHooks';
import { WritePostSliceActions, isUpdate } from '../../WritePost/WritePostSlice';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import { Post } from '../../../types/post';
import { API_PATH } from '../../../constants/path';
import callApi from '../../../utils/callApi';

const UpdateAndDeleteContainer = ({ post }: { post: Post }) => {
  const navigate: NavigateFunction = useNavigate();
  const UserData = useAppSelector((state) => state.UserSlice.user);
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

  async function DeleteFetchData() {
    const response = await callApi('DELETE', API_PATH.POST.DELETE, JSON.stringify([postId ? postId : '']));
    const result = await response.json();
    alert(result.message);
    navigate('/community/board');
  }

  const isAuthor = post && UserData?._id === post.author._id;

  const deletePost = () => {
    if (isAuthor) {
      DeleteFetchData();
    } else {
      alert('작성자가 아닙니다');
    }
  };

  const updatePost = () => {
    if (isAuthor) {
      const currTab = post.board === 'free' ? '자유게시판' : post.board === 'review' ? '후기게시판' : '모집게시판';

      setTab(currTab);
      setPostContent(post.content);
      setPostTitle(post.title);
      post.store_id && setChoiceStoreId(post.store_id._id);
      setIsUpdate({ use: true, id: post._id });
      navigate('/community/write');
    } else {
      alert('작성자가 아닙니다');
    }
  };
  return isAuthor ? <UpdateAndDelete deletePost={deletePost} updatePost={updatePost}></UpdateAndDelete> : <div></div>;
};

export default UpdateAndDeleteContainer;
