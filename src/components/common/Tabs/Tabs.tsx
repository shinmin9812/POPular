import styled, { css } from 'styled-components';

const tabs: string[] = ['전체', '자유게시판', '후기게시판', '모집게시판'];
const Tab = styled.p<{ active: boolean }>`
  text-align: center;
  font-size: 18px;
  padding-bottom: 5px;
  border-bottom: 3px solid rgba(101, 44, 193, 0.2);
  width: 100%;
  + p {
    margin-left: 4px;
  }

  ${(props) =>
    props.active &&
    css`
      font-weight: var(--weight-bold);
      border-bottom: 3px solid rgba(101, 44, 193, 1);
    `}
`;

const BoardTabs = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const TabsWrap = ({ currTab, onClick }: { currTab: string; onClick: (tab: string) => void }) => {
  //console.log(tab);
  return (
    <BoardTabs>
      {tabs.map((tab, index) => (
        <Tab
          key={index}
          active={currTab === tab}
          onClick={() => {
            onClick(tab);
          }}
        >
          {tab}
        </Tab>
      ))}
    </BoardTabs>
  );
};

export default TabsWrap;
