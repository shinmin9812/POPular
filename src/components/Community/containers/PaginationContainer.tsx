import { useAppSelector, useAppDispatch } from '../../../Hooks/useSelectorHooks';
import { communityActions } from '../CommunitySlice';
import Pagination from '../../common/Pagination/Pagination';
import { useEffect } from 'react';

const PaginationContainer = () => {
  const page = useAppSelector((state) => state.CommunitySlice.page);
  const dispatch = useAppDispatch();
  const setPage = (page: number) => dispatch(communityActions.setPage(page));
  const setTotalPage = (page: number[]) => dispatch(communityActions.setTotalPage(page));
  useEffect(() => {
    (async () => {
      const response = await fetch(`http://34.22.81.36:3000/feeds`);
      const result = await response.json();
      setTotalPage(Array.from({ length: Math.ceil(result.length / 7) }, (_, index) => index + 1));
    })();
  }, []);
  return <Pagination currPage={page.currPage} setPage={setPage} totalPage={page.totalPage} />;
};

export default PaginationContainer;
