import { useAppSelector, useAppDispatch } from '../../../Hooks/useSelectorHooks';
import { communityActions } from '../CommunitySlice';
import Pagination from '../../common/Pagination/Pagination';
import { useEffect, useState } from 'react';

const PaginationContainer = () => {
  const tab = useAppSelector((state) => state.CommunitySlice.tab);
  const page = useAppSelector((state) => state.CommunitySlice.page);
  const dispatch = useAppDispatch();
  const setPage = (page: number) => dispatch(communityActions.setPage(page));
  const [totalPage, setTotalPage] = useState([1]);
  useEffect(() => {
    (async () => {
      const response = await fetch(`http://34.22.81.36:3000/feeds`);
      const result = await response.json();
      setTotalPage(Array.from({ length: Math.ceil(result.length / 10) }, (_, index) => index + 1));
    })();
  }, []);
  return <Pagination currPage={page} setPage={setPage} totalPage={totalPage} />;
};

export default PaginationContainer;
