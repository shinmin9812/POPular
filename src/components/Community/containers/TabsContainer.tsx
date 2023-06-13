import TabsWrap from '../../common/Tabs/Tabs';
import { useAppSelector, useAppDispatch } from '../../../Hooks/useSelectorHooks';
import { communityActions } from '../CommunitySlice';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const TabsContainer = () => {
  const tab = useAppSelector((state) => state.CommunitySlice.tab);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const setTab = (tab: string) => dispatch(communityActions.setTab(tab));
  useEffect(() => {
    let currTab;
    switch (tab) {
      case '전체게시판':
        currTab = 'all';
        break;
      case '자유게시판':
        currTab = 'free';
        break;
      case '후기게시판':
        currTab = 'review';
        break;
      case '모집게시판':
        currTab = 'gather';
    }
    navigate(`/community/board/${currTab}`);
  }, [tab]);
  const tabs: string[] = ['전체게시판', '자유게시판', '후기게시판', '모집게시판'];
  return <TabsWrap currTab={tab} onClick={setTab} tabs={tabs} />;
};

export default TabsContainer;
