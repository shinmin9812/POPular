import Tab from '../../common/Tabs/Tabs';
import TabsWrap from '../../common/Tabs/TabsWrap';
import { useAppSelector, useAppDispatch } from '../../../Hooks/useSelectorHooks';
import { WritePostSliceActions } from '../WritePostSlice';
import { useEffect, useCallback } from 'react';

const TabsContainer = () => {
  const tab = useAppSelector((state) => state.WritePostSlice.tab);
  const prevPageTab = useAppSelector((state) => state.CommunitySlice.tab);
  const isUpdate = useAppSelector((state) => state.WritePostSlice.isUpdate);
  const dispatch = useAppDispatch();
  const setTab = useCallback((tab: string) => dispatch(WritePostSliceActions.setTab(tab)), []);
  const tabs: string[] = ['자유게시판', '후기게시판', '모집게시판'];
  useEffect(() => {
    if (isUpdate.use) {
      return;
    } else if (prevPageTab === '후기게시판') {
      setTab('후기게시판');
    } else if (prevPageTab === '모집게시판') {
      setTab('모집게시판');
    } else {
      setTab('자유게시판');
    }
  }, [prevPageTab, setTab, isUpdate]);
  return (
    <TabsWrap>
      {tabs.map((item, index) => (
        <Tab
          key={index}
          active={tab === item}
          onClick={() => {
            setTab(item);
          }}
        >
          {item}
        </Tab>
      ))}
    </TabsWrap>
  );
};

export default TabsContainer;
