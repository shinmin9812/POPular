import PostContent from '../components/PostContent';
import { useAppSelector, useAppDispatch } from '../../../Hooks/useSelectorHooks';
import { WritePostSliceActions } from '../WritePostSlice';
const PostContentContainer = () => {
  const postContent = useAppSelector((state) => state.WritePostSlice.postContent);
  const dispatch = useAppDispatch();
  const setPostContent = (content: string) => {
    return dispatch(WritePostSliceActions.setPostContent(content));
  };
  console.log(postContent);
  return <PostContent postContent={postContent} setPostContent={setPostContent} />;
};

export default PostContentContainer;
