import Tab from '../../common/Tabs/Tabs';
import TabsWrap from '../../common/Tabs/TabsWrap';
import { useAppSelector, useAppDispatch } from '../../../Hooks/useSelectorHooks';
import { communityActions } from '../CommunitySlice';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CLIENT_PATH } from '../../../constants/path';

const TabsContainer = () => {
  const tab = useAppSelector((state) => state.CommunitySlice.tab);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const setTab = (tab: string) => dispatch(communityActions.setTab(tab));
  const postCategory = useParams().category;
  const setPage = (page: number) => dispatch(communityActions.setPage(page));

  let currTab: string;

  useEffect(() => {
    switch (postCategory) {
      case undefined:
        currTab = '전체게시판';
        break;
      case 'free':
        currTab = '자유게시판';
        break;
      case 'review':
        currTab = '후기게시판';
        break;
      case 'gather':
        currTab = '모집게시판';
    }
    if (currTab !== tab) {
      setPage(1);
    }

    currTab && setTab(currTab);
  }, [postCategory]);

  const tabs: string[] = ['전체게시판', '자유게시판', '후기게시판', '모집게시판'];
  return (
    <TabsWrap>
      {tabs.map((item, index) => (
        <Tab
          key={index}
          active={tab === item}
          onClick={() => {
            switch (item) {
              case '전체게시판':
                navigate(CLIENT_PATH.BOARD_ALL);
                break;
              case '자유게시판':
                navigate(CLIENT_PATH.BOARD.replace(':category', 'free'));
                break;
              case '후기게시판':
                navigate(CLIENT_PATH.BOARD.replace(':category', 'review'));
                break;
              case '모집게시판':
                navigate(CLIENT_PATH.BOARD.replace(':category', 'gather'));
            }
          }}
        >
          {item}
        </Tab>
      ))}
    </TabsWrap>
  );
};

export default TabsContainer;
