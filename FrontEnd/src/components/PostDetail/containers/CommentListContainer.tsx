import CommentList from '../components/CommentsList';
import { useAppSelector } from '../../../Hooks/useSelectorHooks';

const CommentListContainer = () => {
  const comments = useAppSelector((state) => state.PostDetailSlice.comment);
  return <CommentList comments={comments} />;
};

export default CommentListContainer;
