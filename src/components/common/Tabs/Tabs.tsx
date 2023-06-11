import styled, { css } from 'styled-components';

const Tab = styled.p<{ active: boolean }>`
  text-align: center;
  font-size: 18px;
  padding-bottom: 5px;
  margin-bottom: 20px;
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

const TabsWrap = ({ tabs, currTab, onClick }: { tabs: string[]; currTab: string; onClick: (tab: string) => void }) => {
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
