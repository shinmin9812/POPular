import TabsWrap from '../../common/Tabs/Tabs';
import { useAppSelector, useAppDispatch } from '../../../Hooks/useSelectorHooks';
import { WritePostSliceActions } from '../WritePostSlice';
const TabsContainer = () => {
  const tab = useAppSelector((state) => state.WritePostSlice.tab);
  const dispatch = useAppDispatch();
  const setTab = (tab: string) => dispatch(WritePostSliceActions.setTab(tab));
  const tabs: string[] = ['자유게시판', '후기게시판', '모집게시판'];

  return <TabsWrap currTab={tab} onClick={setTab} tabs={tabs} />;
};

export default TabsContainer;
