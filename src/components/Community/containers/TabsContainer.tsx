import TabsWrap from '../../common/Tabs';
import { useAppSelector, useAppDispatch } from '../../../Hooks/useSelectorHooks';
import { communityActions } from '../CommunitySlice';

const TabsContainer = () => {
  const tab = useAppSelector((state) => state.CommunitySlice.tab);
  const dispatch = useAppDispatch();
  const setTab = (tab: string) => dispatch(communityActions.setTab(tab));

  return <TabsWrap currTab={tab} onClick={setTab} />;
};

export default TabsContainer;
