import { useAppSelector, useAppDispatch } from '../../../Hooks/useSelectorHooks';
import { communityActions } from '../CommunitySlice';
import Pagination from '../../common/Pagination/Pagination';

const PaginationContainer = () => {
  const page = useAppSelector((state) => state.CommunitySlice.page);
  const dispatch = useAppDispatch();
  const setPage = (page: number) => dispatch(communityActions.setPage(page));
  return (
    <Pagination currPage={page.currPage} setPage={setPage} pageGroup={page.pageGroup} totalPage={page.totalPage} />
  );
};

export default PaginationContainer;
