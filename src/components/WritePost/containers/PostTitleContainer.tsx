import PostTitle from '../components/PostTitle';
import { useAppSelector, useAppDispatch } from '../../../Hooks/useSelectorHooks';
import { WritePostSliceActions } from '../WritePostSlice';
const PostTitleContainer = () => {
  const postTitle = useAppSelector((state) => state.WritePostSlice.postTitle);
  const dispatch = useAppDispatch();
  const setPostTitle = (title: string) => {
    return dispatch(WritePostSliceActions.setPostTitle(title));
  };
  return <PostTitle value={postTitle} onChange={setPostTitle} />;
};

export default PostTitleContainer;
