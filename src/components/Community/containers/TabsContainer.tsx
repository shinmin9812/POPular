import TabsWrap from '../../common/Tabs/Tabs';
import { useAppSelector, useAppDispatch } from '../../../Hooks/useSelectorHooks';
import { communityActions } from '../CommunitySlice';

const TabsContainer = () => {
  const tab = useAppSelector((state) => state.CommunitySlice.tab);
  const dispatch = useAppDispatch();
  const setTab = (tab: string) => dispatch(communityActions.setTab(tab));
  const tabs: string[] = ['전체', '자유게시판', '후기게시판', '모집게시판'];

  return <TabsWrap currTab={tab} onClick={setTab} tabs={tabs} />;
};

export default TabsContainer;
